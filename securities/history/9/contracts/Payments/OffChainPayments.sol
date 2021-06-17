pragma solidity 0.5.0; 

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";

contract OffChainPayments is Ownable {
    using ECDSA for bytes32; 
    using SafeMath for uint256;

    // Each payment is in one and only one ChallengeState at a time
    enum ChallengeState { NotChallenged, Challenged, Resolved }

    struct Payment {
        // Off-chain payment was made at this timestamp
        uint256 timestamp;
        // Value of the payment made
        uint256 value;
        // Hash of offchain wire-ID, value, receiver, sender, date
        bytes32 offchainPaymentHash; 
        // Whether the payment has been challenged. This defaults to NotChallenged
        ChallengeState state; 
    }

    // This event is used alongside the codes immediately following to specify the event type
    // Not all events require a value or payment hash, constants NO_HASH and NO_NEW_VALUE are used in these cases
    event PaymentEvent(
        address indexed _securityHolder,
        uint256 indexed _index,
        uint256 indexed _eventType,
        uint256 _value,
        bytes32 _offchainPaymentHash
    );
    
    // Event types for the Payment event
    uint256 public constant CREATED = 1;
    uint256 public constant CHALLENGED = 2;
    uint256 public constant RESOLVED_NO_CHANGE = 3;
    uint256 public constant RESOLVED_CHANGED = 4;

    // Constants used in events where no new hash or value is needed
    bytes32 public constant NO_HASH = 0x0;
    uint256 public constant NO_NEW_VALUE = 0;

    // Period within a payee must challenge their payment - customisable
    uint256 public constant CHALLENGE_PERIOD = 2 weeks;
    
    // Returned when a payment doesnt exist in a holder's array of payments
    int256 public constant DOESNT_EXIST = -1;   
    
    // The payments that each security holder has received
    mapping(address => Payment[]) public payments;

    // To verify the provided array index is not out of range
    modifier indexInRange(address _payee, uint256 _index) {
        require(payments[_payee].length > _index && _index >= 0, "Payment index not in range for message sender");
        _;
    }

    /**
	* @dev Constructor to initialize the contract.
    * @param _issuer The address of issuer (or whoever will be managing the contract). 
	*/
    constructor(address _issuer) public {
        transferOwnership(_issuer);
    }
    
    /**
	* @dev Allows issuer to record payments made to security holders on-chain.
	* @param _securityHolders Array of addresses - the security token holders. 
    * @param _paymentValues Array of values - each payment that was made off-chain. 
    * @param _paymentTimestamps Array of timestamps at which the payments were made at.    
	* @param _offchainPaymentHashes Array of hashes to identify the off-chain payment.
    */
    function recordPayments(
        address[] memory _securityHolders, 
        uint256[] memory _paymentValues, 
        uint256[] memory _paymentTimestamps,
        bytes32[] memory _offchainPaymentHashes
    ) 
        public 
        onlyOwner 
    {
        require(_securityHolders.length > 0, "Empty array cannot be submitted.");
        require(_securityHolders.length == _offchainPaymentHashes.length, "Arrays must all be the same length.");
        require(_securityHolders.length == _paymentTimestamps.length, "Arrays must all be the same length.");
        require(_securityHolders.length == _paymentValues.length, "Arrays must all be the same length.");

        // Records each provided payment to the relevant array one by one.
        for (uint256 i = 0; i < _securityHolders.length; i++) {
            payments[_securityHolders[i]].push(
                Payment(_paymentTimestamps[i], _paymentValues[i], _offchainPaymentHashes[i], ChallengeState.NotChallenged)
            );
            emit PaymentEvent(
                _securityHolders[i], payments[_securityHolders[i]].length-1, CREATED, _paymentValues[i], _offchainPaymentHashes[i]
            );
        }
    }

    /**
	* @dev For use by a front end to locate a payment in the holder's array of payments.
    * @param _securityHolder The address of the holder the payment was made to.
    * @param _offchainPaymentHash Hashed data of the off-chain payment. 
    * @return The index of the off-chain payment. This is -1 if the payment does not exist
    */
    function lookUpPaymentIndex(address _securityHolder, bytes32 _offchainPaymentHash)
        public
        view
        returns(int256)
    {
        require(_offchainPaymentHash != bytes32(0), "No off-chain payment hash was provided.");
        require(_securityHolder != address(0), "No security holder address was provided.");

        Payment[] memory holderPayments = payments[_securityHolder];
        require (holderPayments.length > 0, "The holder has no payment history.");

        // Looks at each of the holder's payments to locate the correct record.
        for (uint256 i = holderPayments.length-1; i >= 0; i--){
            if (holderPayments[i].offchainPaymentHash == _offchainPaymentHash)
            {
                return int256(i); 
            } 
        }
        // This constant is -1. It is returned if the record in question doesnt exist.
        return DOESNT_EXIST;
    }    

    /**
	* @dev Allows the holder to challenge their payment on-chain. 
    * @param _index The index of the payment that they are challenging.
    * @param _suggestedValue The value that the holder suggests is correct. 
    */
    function challengePayment(uint256 _index, uint256 _suggestedValue) public indexInRange(msg.sender, _index) {
        // Challenges cannot occur on payments already in a challenged state.
        // Payments in Resolved and NotChallenged are therefore those that can be challenged.
        require(
            payments[msg.sender][_index].state != ChallengeState.Challenged,
            "Payment already being challenged."
        );

        // Challenges to payments must occur within the challenge period.
        require(payments[msg.sender][_index].timestamp.add(CHALLENGE_PERIOD) <= now, "Challenge period is over.");

        payments[msg.sender][_index].state = ChallengeState.Challenged;
        emit PaymentEvent(msg.sender, _index, CHALLENGED, _suggestedValue, NO_HASH);
    }

    /**
	* @dev Allows the issuer to resolve any payments that have been challenged.
    * @dev This function can also be called to update the value of an un-challenged payment.
	* @param _securityHolder Address of holder to whom the payment was made. 
    * @param _index The index of the payment within the holder's array of payments.
    * @param _newPaymentHash The hash of any updated payment (wire#, value, receiver, sender, date).
    * @param _newValue The value of the corrected payment. This is equal to the old payment if no change has been made.
    */
    function resolveChallenge(
        address _securityHolder,
        uint256 _index, 
        bytes32 _newPaymentHash,
        uint256 _newValue
    ) 
        public 
        onlyOwner
        indexInRange(_securityHolder, _index)
    {
        uint256 currentValue = payments[_securityHolder][_index].value;
        // If the payment value hasnt been updated, no resolution is made.
        if (currentValue == _newValue) {
            emit PaymentEvent(
                _securityHolder,
                _index,
                RESOLVED_NO_CHANGE,
                NO_NEW_VALUE,
                NO_HASH
            );
        } else {
            // Otherwise the payment record is updated to reflect the new information.
            require(_newPaymentHash != bytes32(0), "No offchainPayment hash provided."); 
            
            emit PaymentEvent(
                _securityHolder,
                _index,
                RESOLVED_CHANGED,
                _newValue,
                _newPaymentHash
            );

            payments[_securityHolder][_index].value = _newValue;
            payments[_securityHolder][_index].offchainPaymentHash = _newPaymentHash; 

        }
        // The payment is marked as resolved.
        payments[_securityHolder][_index].state = ChallengeState.Resolved;
    }

}