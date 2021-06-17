pragma solidity 0.5.0; 

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";

contract OnChainPayments is Ownable {
    using ECDSA for bytes32; 
    using SafeMath for uint256;

    // Each payment is in one and only one ChallengeState at a time
    enum ChallengeState { NotChallenged, Challenged, Resolved }

    struct Payment {
        // On-chain payment was made at this timestamp
        uint256 timestamp;
        // The number of payment tokens that were paid
        uint256 value;
        // Whether the payment has been challenged. This defaults to NotChallenged
        ChallengeState state;
    }

    // This event is used alongside the codes immediately following to specify the event type
    // Not all events require an updated payment value, NO_NEW_VALUE is used in these cases
    event PaymentEvent(
        address indexed _securityHolder,
        uint256 indexed _index,
        uint256 indexed _eventType,
        uint256 _value
    );
    
    // Event types for the Payment event
    uint256 public constant CREATED = 1;
    uint256 public constant CHALLENGED = 2;
    uint256 public constant RESOLVED_NO_CHANGE = 3;
    uint256 public constant RESOLVED_CHANGED = 4;

    // Constants used in events where no new value is needed
    uint256 public constant NO_NEW_VALUE = 0x0;  

    // Period within a payee must challenge their payment - customisable
    uint256 public constant CHALLENGE_PERIOD = 2 weeks;
    
    // Returned when a payment doesnt exist in a holder's array of payments
    int256 public constant DOESNT_EXIST = -1;   

    // The payments that each security holder has received
    mapping(address => Payment[]) public payments;

    // The address of the security token, required for checking the number each holder owns
    IERC20 public securityToken;
    
    // The address of the payment token
    IERC20 public paymentToken;

    // To verify the provided array index is not out of range
    modifier indexInRange(address _payee, uint256 _index) {
        require(payments[_payee].length > _index && _index >= 0, "Payment index not in range for message sender");
        _;
    }

    /**
	* @dev Constructor to initialize the contract.
	* @param _securityToken Address of the security token.
    * @param _paymentToken Address of payment token. 
    * @param _issuer The address of issuer (or whoever will be managing the contract). 
	*/
    constructor(IERC20 _securityToken, IERC20 _paymentToken, address _issuer) public {
        require(address(_securityToken) != address(0) && address(_paymentToken) != address(0), "Token addresses cannot be zero.");
        securityToken = _securityToken;
        paymentToken = _paymentToken;
        transferOwnership(_issuer);    
    }
    
    /**
	* @dev Allows issuer to make payments to a list of security holders.
	* @param _securityHolders Array of addresses - the security token holders. 
    * @param _paymentPerSecurity The amount to pay per security, used to calcuate total value owed. 
    * Issuer must approve this contract to transfer the payment tokens prior to this.
    */
    function makePayments(address[] memory _securityHolders, uint256 _paymentPerSecurity) 
        public 
        onlyOwner 
    {
        require(_securityHolders.length > 0, "Empty array of addresses cannot be submitted.");
        require(_paymentPerSecurity > 0, "No value of payment per security provided.");

        for (uint256 i = 0; i < _securityHolders.length; i++){
            uint256 securitiesOwned = securityToken.balanceOf(_securityHolders[i]);
            require(securitiesOwned > 0, "Holder does not own any securities.");
            uint256 paymentOwed = securitiesOwned.mul(_paymentPerSecurity);

            payments[_securityHolders[i]].push(Payment(now, paymentOwed, ChallengeState.NotChallenged));
            paymentToken.transferFrom(owner(), _securityHolders[i], paymentOwed);

            emit PaymentEvent(_securityHolders[i], payments[_securityHolders[i]].length-1, CREATED, paymentOwed);
        }
    }

    /**
	* @dev For use by a front end to locate a payment in the holder's array of payments.
    * @param _securityHolder The address of the holder the payment was made to.
    * @param _timestamp The timestamp of when the payment occurred. 
    * @param _value The value of the payment.
    * @return The index of the off-chain payment. This is -1 if the payment does not exist
    */
    function lookUpPaymentIndex(address _securityHolder, uint256 _timestamp, uint256 _value)
        public
        view
        returns(int256)
    {
        require(_timestamp != 0, "No timestamp provided.");
        require(_securityHolder != address(0), "No security holder address provided");

        Payment[] memory holderPayments = payments[_securityHolder];
        require (holderPayments.length > 0, "holder has no payment history");

        // Looks at each of the holder's payments to locate the correct record.
        for (uint256 i = holderPayments.length-1; i >= 0; i--){
            if (holderPayments[i].timestamp == _timestamp && holderPayments[i].value == _value)
            {
                return int256(i);
            } 
        }
        // This constant is -1. It is returned if the record in question doesnt exist.
        return DOESNT_EXIST;
    } 

    /**
	* @dev Allows a security holder to challenge a payment they have received. 
    * @param _index The index of the payment that they are challenging.
    * @param _suggestedValue The value that the holder suggests is correct. 
    */
    function challengePayment(uint256 _index, uint256 _suggestedValue)
        public
        indexInRange(msg.sender, _index)
    {        
        // Challenges cannot occur on payments already in a challenged state.
        // Payments in Resolved and NotChallenged are therefore those that can be challenged.
        require(
            payments[msg.sender][_index].state != ChallengeState.Challenged,
            "Payment already being challenged."
        );

        // Challenges to payments must occur within the challenge period.
        require(payments[msg.sender][_index].timestamp.add(CHALLENGE_PERIOD) <= now, "Challenge period is over.");

        payments[msg.sender][_index].state = ChallengeState.Challenged;
        emit PaymentEvent(msg.sender, _index, CHALLENGED, _suggestedValue);
    }

    /**
	* @dev Allows the issuer to resolve any payments that have been challenged.
    * @dev This function can also be called to update the value of an un-challenged payment.
	* @param _securityHolder Address of holder to whom the payment was made. 
    * @param _index The index of the payment within the holder's array of payments.
    * @param _newValue The value of the corrected payment. This is equal to the old payment if no change has been made.
    */
    function resolveChallenge(
        address _securityHolder, 
        uint256 _index,
        uint256 _newValue
    ) 
        public 
        onlyOwner
        indexInRange(_securityHolder, _index)
    {    
        uint256 currentValue = payments[_securityHolder][_index].value;
        // If the payment value hasnt been updated, no resolution is made.
        if (currentValue == _newValue) {
            emit PaymentEvent(_securityHolder, _index, RESOLVED_NO_CHANGE, NO_NEW_VALUE);

        } else if (_newValue > currentValue) {
            // If a new value is larger then more payment tokens are paid to the holder
            emit PaymentEvent(_securityHolder, _index, RESOLVED_CHANGED, _newValue);

            payments[_securityHolder][_index].value = _newValue;
            uint256 paymentOwed = _newValue.sub(currentValue);
            paymentToken.transferFrom(owner(), _securityHolder, paymentOwed);

        } else {
            // Otherwise the payment tokens must be transferred by the holder.
            emit PaymentEvent(_securityHolder, _index, RESOLVED_CHANGED, _newValue);

            payments[_securityHolder][_index].value = _newValue;
        }
        // The payment is marked as resolved.
        payments[_securityHolder][_index].state = ChallengeState.Resolved;
    }
 
}