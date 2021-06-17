pragma solidity 0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/Math.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./RedeemableToken.sol";

contract FixedPriceTender is Ownable {
    using SafeMath for uint256;

    IERC20 paymentToken;
    IERC20 securityToken;

    bool public paymentReady = false;

    uint256 public paymentPerSecurity; // The number of payment tokens offered per security token.
    uint256 public totalToRepurchase; // The maximum number of securities the owner() will repurchase.
    uint256 public offerEndTime; // The time by which holders must have opted in.
    uint256 public overallTotalTendered; // The total number of tokens opted in by holders

    // The following 2 variables are only used after offerEndTime to ensure people are paid first-come first-served
    uint256 nextTenderToAssess; // The index of the orderedHolders array that the repurchase has got to
    uint256 totalRepurchased; // The number of tokens actually repurchased so far

    // One struct exists for each token holder who tenders some tokens.
    struct HolderTender {
        uint256[] tenderAmounts; // An array, in order, of every amount the holder has opted in
        uint256 holderTotalTendered; // The total number that a holder has opted in
        uint256 nextToProcess; // The index of the tenderAmounts array that next needs to be repurchased
    }

    mapping(address => HolderTender) tenders;
    address[] orderedHolders; // The addresses of all holders who opt in, stored in order, including duplicates

    modifier isBeforeEndTime {
        require(now < offerEndTime, "The tender offer has expired");
        _;
    }

    modifier isAfterEndTime {
        require(now >= offerEndTime, "The tender offer has not yet ended");
        _;
    }

    modifier paymentTokensConfirmed {
        require(paymentReady, "The payment tokens have not been confirmed");
        _;
    } 


    /**
	* @dev Constructor to initialize the contract.
    * @param _paymentPerSecurity Value to pay per security repurchased.
    * @param _paymentToken The token to be used as payment.
    * @param _securityToken The security token itself.
    * @param _issuer The address of issuer (or whoever will be managing the contract). 
    * @param _totalToRepurchase The maximum number of tokens to repurchase.
    * @param _offerEndTime The timestamp of the end of the offer.
    */
    constructor(
        uint256 _paymentPerSecurity,
        IERC20 _paymentToken,
        IERC20 _securityToken,
        address _issuer,
        uint256 _totalToRepurchase,
        uint256 _offerEndTime
    ) public {
        require(address(_paymentToken) != address(0), "Payment token contract required");
        require(address(_securityToken) != address(0), "Security token contract required");
        require(address(_issuer) != address(0), "Issuer address required");
        require(_paymentPerSecurity > 0, "No payment amount provided");

        // Make sure enough tokens exist to repurchase.
        require(_totalToRepurchase <= _securityToken.totalSupply(), "Total to repurchase is larger than total token supply");

        paymentPerSecurity = _paymentPerSecurity;
        paymentToken = _paymentToken;
        securityToken = _securityToken;
        totalToRepurchase = _totalToRepurchase;
        offerEndTime = _offerEndTime;
        transferOwnership(_issuer);
    }

    function paymentTokensReady() public {
        require(!paymentReady, "Payment has already been confirmed");
        // Check this contract has access to enough payment tokens.
        uint256 totalPaymentNeeded = totalToRepurchase * paymentPerSecurity;
        require(
            paymentToken.allowance(owner(), address(this)) >= totalPaymentNeeded,
            "Redemption contract does not have access to enough tokens"
        );
        paymentReady = true;
    }

    /**
	* @dev Function to allow the end time to be updated.
    * @param _newOfferEnd The new end time for the offer.
	*/
    function updateOfferEndTime(uint256 _newOfferEnd) external onlyOwner isBeforeEndTime {
        require(_newOfferEnd >= now, "New offer end time cannot be in the past");
        offerEndTime = _newOfferEnd;
    }

    /**
	* @dev Function to allow the payment per security to be updated.
    * @param _newPaymentPerSecurity The new rate of payment token per security token.
	*/
    function updatePaymentPerSecurity(uint256 _newPaymentPerSecurity) external onlyOwner isBeforeEndTime {
        require(_newPaymentPerSecurity > 0, "New payment per security cannot be 0");
        require(
            paymentToken.allowance(owner(), address(this)) >= totalToRepurchase * _newPaymentPerSecurity,
            "Redemption contract does not have access to enough tokens"
        );
        paymentPerSecurity = _newPaymentPerSecurity;
    }

    /**
	* @dev Function to allow the number of tokens to be repurchased to be updated.
    * @param _newTotalToRepurchase The new upper limit of tokens to repurchase.
	*/
    function updateTotalToRepurchase(uint256 _newTotalToRepurchase) external onlyOwner isBeforeEndTime {
        require(_newTotalToRepurchase >= 0, "New total number of tokens to repurchase cannot be negative");
        require(_newTotalToRepurchase <= securityToken.totalSupply(), "Total to repurchase is larger than total token supply");
        require(
            paymentToken.allowance(owner(), address(this)) >= _newTotalToRepurchase * paymentPerSecurity,
            "Redemption contract does not have access to enough tokens"
        );
        totalToRepurchase = _newTotalToRepurchase;
    }

    /**
	* @dev Function to allow a security holder to opt into the offering.
    * @param _numberToTender The number of securities the sender would like to tender.
	*/
    function optInToTender(uint256 _numberToTender) external isBeforeEndTime paymentTokensConfirmed {
        require(_numberToTender > 0, "Must provide a number of securities to opt in");
        // Create a storage reference so the changes update the mapping
        HolderTender storage holderTender = tenders[msg.sender];

        // Check that this contract can control the specified number of tokens
        // This will allow it to gain ownership of the tokens at the end of the function
        require(
            securityToken.allowance(msg.sender, address(this)) >= _numberToTender,
            "Holder has not approved contract to control securities"
        );

        // Update the holder's tender struct to reflect this addition
        holderTender.holderTotalTendered += _numberToTender;
        holderTender.tenderAmounts.push(_numberToTender);

        overallTotalTendered += _numberToTender;

        // Transfer these tokens from the holder to this contract
        securityToken.transferFrom(msg.sender, address(this), _numberToTender);
    }

    /**
	* @dev Function to allow a security holder to opt into the offering.
    * @param _numberToRemove The number of securities the sender would like opt out of the tender.
	*/
    function optOutOfTender(uint256 _numberToRemove) external isBeforeEndTime {
        require(_numberToRemove > 0, "Must provide a number of securities to opt out");

        // Create a storage reference so the changes update the mapping
        HolderTender storage holderTender = tenders[msg.sender];

        require(holderTender.holderTotalTendered >= _numberToRemove, "Sender has not tendered enough securities");

        // Update holder's tender to reflect this removal
        uint256 remainingToRemove = _numberToRemove;
        uint256 currentTender;
        uint256 currentIndex = holderTender.tenderAmounts.length-1;
        uint256 toRemove;

        // Loops through from the end of the holder's array of tenders
        // It removes tenders until all _numberToRemove have been removed
        while (remainingToRemove > 0) {
            // Get amount of final array element
            currentTender = holderTender.tenderAmounts[currentIndex];

            // Remove all of the final element, or as many are as needed
            toRemove = Math.min(currentTender, remainingToRemove);
            remainingToRemove -= toRemove;
            holderTender.tenderAmounts[currentIndex] -= toRemove;
            currentIndex -= 1;
        }

        // Update the relevant totals to show the removal
        holderTender.holderTotalTendered -= _numberToRemove;
        overallTotalTendered -= _numberToRemove;

        // Transfer these tokens from the holder to this contract
        securityToken.transfer(msg.sender, _numberToRemove);
    }

    /**
	* @dev Function to be called after the offer has ended to pay the tender and repurchase tokens.
    * @dev The tokens are repurchased in a first come first served basis, looking through the orderedHolders array.
    * @dev Any excess tokens tendered are returned to their holder.
    * @param _batchSize The number of elements of orderedHolders that should be processed in 1 Tx.
	*/
    function finaliseTender(uint256 _batchSize) external isAfterEndTime {
        // These requires are kind of redundant because of the while? @stu thoughts?
        require(nextTenderToAssess < orderedHolders.length, "Finalisation is complete");
        require(_batchSize > 0, "No batch size provided");

        // The number of elements of the orderedHolders array that have been processed in this Tx.
        uint256 tendersProcessed = 0;

        // Loop until the batch is complete, or the tenders have all been dealt with.
        while(tendersProcessed < _batchSize && nextTenderToAssess < orderedHolders.length) {
            // If not all repurchases have occured, repurchase this one.
            if(totalRepurchased < totalToRepurchase) {
                repurchaseTender();
            // Otherwise return their securities to them.
            } else {
                returnTender();
            }
            nextTenderToAssess++;
            tendersProcessed++;
        }
    }

    /**
	* @dev Function repurchases the next securities in the queue of holders who opted in.
    * @dev If it cannot repurchase all of the given securities it returns the rest to their owner.
	*/
    function repurchaseTender() internal {
        // Find the holder and the index of the next of their tenders to process.
        address holder = orderedHolders[nextTenderToAssess];
        HolderTender storage holderTender = tenders[msg.sender];
        uint256 nextToProcess = holderTender.nextToProcess;

        // Assert the nextToProcess isn't beyond the end of the array.
        assert(nextToProcess < holderTender.tenderAmounts.length);

        // Either repurchase all of the tender, or up to the tender offer's cap.
        uint256 toRepurchase = Math.min(holderTender.tenderAmounts[nextToProcess], totalToRepurchase - totalRepurchased);
        securityToken.transfer(owner(), toRepurchase);
        totalRepurchased += toRepurchase;
        
        // Transfer the relevant payment to the security token holder.
        paymentToken.transferFrom(owner(), holder, toRepurchase.mul(paymentPerSecurity));

        // If not all of them could be repurchased, the rest must be returned.
        if (toRepurchase < holderTender.tenderAmounts[nextToProcess]) {
            holderTender.tenderAmounts[nextToProcess] -= toRepurchase;
            securityToken.transfer(holder, holderTender.tenderAmounts[nextToProcess]-toRepurchase);
        }
        holderTender.nextToProcess++;
    }

    /**
	* @dev Function returns the next securities being considered to their owner as the offering has been fulfilled.
	*/
    function returnTender() internal {
        // Find the holder and the index of the next of their tenders to process.
        address holder = orderedHolders[nextTenderToAssess];
        HolderTender storage holderTender = tenders[msg.sender];
        uint256 nextToProcess = holderTender.nextToProcess;

        // Assert the nextToProcess isn't beyond the end of the array.
        assert(nextToProcess < holderTender.tenderAmounts.length);

        // Return the tokens to the security token holder.
        securityToken.transfer(holder, holderTender.tenderAmounts[nextToProcess]);
        holderTender.nextToProcess++;
    }

}