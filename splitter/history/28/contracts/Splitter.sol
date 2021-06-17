pragma solidity >=0.4.21 <0.6.0;

import './SafeMath.sol';
import './Stoppable.sol';

/// @title Splitter - Split payments to two parties 50/50
/// @author hilmarx
/// @notice You can use this contract to split up payments equally among two pre-defined parties
/// @dev This is a test version, please don't use in production

contract Splitter is Stoppable  {

    using SafeMath for uint256;

    // State variables

    // balance of alice, bob & carol
    mapping (address => uint) public balanceOf;

    // mapping to find respective remainders for splitting pairs with their hashes
    mapping (bytes32 => uint) public remainderPair; 

    // Events
    // Show that the remainder was distributed to the two accounts
    event LogRemainderClaimed(uint indexed remainder, bool indexed claimable);

    // Show that alice sent some Ether to the split function
    event LogSplit(uint indexed amount);

    // Show that either bob or carol successfully withdrew their balance
    event LogBalanceWithdrawn(address indexed withdrawer, uint indexed amount);

    // Modifiers
    
    ///@dev Check if message sender (Bob or Carol) have any balance which can be withdrawn
    modifier sufficientBalance() {
        require(balanceOf[msg.sender] > 0, "Your balance is 0");
        _;
    }
    
    ///@dev Check that Alice is not sending a message with value 0 to a payable method
    modifier nonZero() {
        require(msg.value > 0, "You cannot send a transaction with value equal to 0");
        _;
    }
    
    //@dev Constructor setting addresses & balances of Alice, Bob & Carol, where alice is the owner
    constructor() public {
        // alice = owner();
    }

    // Setter Functions

    ///@dev Split ether sent by Alice into two equal pieces and add them to receiver1s & receiver2s balance, equally.
    ///@dev If ether amount cannot be divided by two, store remainder in the 'remainder' state variable which is mapped to each unqiue splitting pair
    ///@dev If the ether stored in the remainder state variable is again divisible by 2, emit an event
    function splitEther(address receiver1, address receiver2) 
        public
        onlyOwner
        nonZero
        onlyIfRunning
        payable
    {       
        // Require both address to not be 0;
        require( receiver1 != address(0) && receiver2 != address(0) );

        // Store balance uint of carol in memory
        uint receiver1NewBalance = balanceOf[receiver1];

        // Store balance uint of bob in memory
        uint receiver2NewBalance = balanceOf[receiver2];

        // Divide Ether sent by Alice into two equal payouts
        uint payout = msg.value.div(2);

        // Check if remainer exists, if yes update remainder
        if (msg.value > payout.mul(2)) {

            // Find pairHash of splitting Pair
            bytes32 pairHash = createPairHash(receiver1, receiver2);

            // Find remainder of splitting pair
            uint newRemainder = remainderPair[pairHash];

            // Update remainder
            newRemainder = newRemainder.add(msg.value - payout.mul(2));
            
            // If remainder is greater than 0 & divisible by two, trigger event and update carols and bobs balanceOf
            if (newRemainder > 0 && newRemainder.mod(2) == 0) 
            {
                // Split existing remainder in two
                uint evenPayout = newRemainder.div(2);

                // update carols and bobs balance
                receiver1NewBalance = receiver1NewBalance.add(evenPayout);
                receiver2NewBalance = receiver2NewBalance.add(evenPayout);

                emit LogRemainderClaimed(newRemainder, true);

                // Set remainder to 0;
                newRemainder = 0;
            }
            // SSTORE new remainder
            remainderPair[pairHash] = newRemainder;
        }
        // SSTORE updated balance of Carol
        balanceOf[receiver1] = receiver1NewBalance.add(payout);
        // SSTORE updated balance of bob
        balanceOf[receiver2] = receiver2NewBalance.add(payout);

        // Emit event that ether was succesfully splitted amoung bob & carol
        emit LogSplit(msg.value);
    }
    
    ///@dev Enable Bob & Carol to withdraw the value of their contracts balance
    function withdraw() 
        public
        sufficientBalance
        onlyIfRunning
        returns (bool success)
    {
        uint withdrawAmount = balanceOf[msg.sender];
        balanceOf[msg.sender] = 0;
        // emit event that either carol or bob successfully withdrew their balance
        emit LogBalanceWithdrawn(msg.sender, withdrawAmount);
        msg.sender.transfer(withdrawAmount);
        return true;
    }

    function createPairHash(address receiver1, address receiver2) 
        internal 
        pure 
        returns (bytes32 resultedPairHash) 
    {
        bytes32 pairHash;
        if (receiver1 > receiver2) {
            pairHash = keccak256(abi.encodePacked(receiver1, receiver2));
        } else {
            pairHash = keccak256(abi.encodePacked(receiver2, receiver1));
        }
        return pairHash;
    }
}