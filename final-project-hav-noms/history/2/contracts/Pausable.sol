pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
//import "./Ownable.sol";

/**
 * @title A contract that can be paused by its owner
 * This contract allows an inheriting contract to be marked as
 * paused. It also defines a modifier which can be used by the
 * inheriting contract to prevent actions while paused.
 * @author https://github.com/hav-noms/
 */
contract Pausable is Ownable {
    
    uint public lastPauseTime;
    bool public paused;

    /**
     * @dev Constructor
     */
    constructor()
        public
    {
        // Paused will be false, and lastPauseTime will be 0 upon initialisation
    }

    /**
     * @notice Change the paused state of the contract
     * @dev Only the contract owner may call this.
     */
    function setPaused(bool _paused)
        external
        onlyOwner
    {
        // Ensure we're actually changing the state before we do anything
        if (_paused == paused) {
            return;
        }

        // Set our paused state.
        paused = _paused;
        
        // If applicable, set the last pause time.
        if (paused) {
            lastPauseTime = now;
        }

        // Let everyone know that our pause state has changed.
        emit PauseChanged(paused);
    }

    //-----------------------------------------------------------------
    // Modifiers
    //-----------------------------------------------------------------

    /**
     * @notice Checks this contract is not paused which would cause this function to fail.
     */
    modifier notPaused {
        require(!paused, "This action cannot be performed while the contract is paused");
        _;
    }

    //-----------------------------------------------------------------
    // Events
    //-----------------------------------------------------------------

    /**
     * @notice Tell the DApps we've paused or unpaused.
     */
    event PauseChanged(bool isPaused);
}
