pragma solidity 0.5.10;


interface ITokenReceiver {
    function tokensReceived(
        address from,
        address to,
        uint256 amount
    ) external;
}