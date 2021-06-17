pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

//import "./Ownable.sol";

/**
 * @title A contract that can be destroyed by its owner after a delay elapses.
 * This contract allows an inheriting contract to be destroyed after
 * its owner indicates an intention and then waits for a period
 * without changing their mind. All ether contained in the contract
 * is forwarded to a nominated beneficiary upon destruction.
 * @author https://github.com/hav-noms/
 */
contract Mortal is Ownable {
    
    uint public initiationTime;
    bool public selfDestructInitiated;
    address payable public selfDestructBeneficiary;
    uint public constant SELFDESTRUCT_DELAY = 4 weeks;

    /**
     * @dev Constructor
     * @param _selfDestructBeneficiary The account which will recieve any funds in this contract when killed.
     */
    constructor(address payable _selfDestructBeneficiary)
        public
    {
        require(_selfDestructBeneficiary != address(0), "_selfDestructBeneficiary must not be the zero address");
        selfDestructBeneficiary = _selfDestructBeneficiary;
        emit SelfDestructBeneficiaryUpdated(selfDestructBeneficiary);
    }

    /**
     * @notice Set the beneficiary address of this contract.
     * @dev Only the contract owner may call this. The provided beneficiary must be non-null.
     * @param _beneficiary The address to pay any eth contained in this contract to upon self-destruction.
     */
    function setSelfDestructBeneficiary(address payable _beneficiary)
        external
        onlyOwner
    {
        require(_beneficiary != address(0), "Beneficiary must not be the zero address");
        selfDestructBeneficiary = _beneficiary;
        emit SelfDestructBeneficiaryUpdated(_beneficiary);
    }

    /**
     * @notice Begin the self-destruction counter of this contract.
     * Once the delay has elapsed, the contract may be self-destructed.
     * @dev Only the contract owner may call this.
     */
    function initiateSelfDestruct()
        external
        onlyOwner
    {
        initiationTime = now;
        selfDestructInitiated = true;
        emit SelfDestructInitiated(SELFDESTRUCT_DELAY);
    }

    /**
     * @notice Terminate and reset the self-destruction timer.
     * @dev Only the contract owner may call this.
     */
    function terminateSelfDestruct()
        external
        onlyOwner
    {
        initiationTime = 0;
        selfDestructInitiated = false;
        emit SelfDestructTerminated();
    }

    /**
     * @notice If the self-destruction delay has elapsed, destroy this contract and
     * remit any ether it owns to the beneficiary address.
     * @dev Only the contract owner may call this.
     */
    function selfDestruct()
        external
        onlyOwner
    {
        require(selfDestructInitiated, "Self destruct has not yet been initiated");
        require(initiationTime + SELFDESTRUCT_DELAY < now, "Self destruct delay has not yet elapsed");
        emit SelfDestructed(selfDestructBeneficiary);
        selfdestruct(selfDestructBeneficiary);
    }

    //-----------------------------------------------------------------
    // Events
    //-----------------------------------------------------------------
    
    event SelfDestructTerminated();
    event SelfDestructed(address beneficiary);
    event SelfDestructInitiated(uint selfDestructDelay);
    event SelfDestructBeneficiaryUpdated(address newBeneficiary);
}
