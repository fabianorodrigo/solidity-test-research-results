pragma solidity ^0.4.25;

/// @title ERC-1xxx Action Standard
/// @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1xxx.md
///  Note: the ERC-165 identifier for this interface is 0x19ff1a63.

interface IAction {

    /// @notice executes the action
    /// @dev executes the action based on the result from `canExecute`
    function execute() external;

    /// @notice checks whether the action can be executed
    /// @dev perform checks and return an appropriate uint corresponding to the executable block
    /// @return the number corresponding to the executable block
    function canExecute() external view returns (uint);
}