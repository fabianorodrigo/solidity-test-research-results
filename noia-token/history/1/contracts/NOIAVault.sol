pragma solidity 0.5.10;

import "./NOIAToken.sol";
import "./ITokenReceiver.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";


contract NOIAVault is ITokenReceiver {
    using SafeERC20 for IERC20;

    //address public constant NOIA_TOKEN_ADDRESS = 0xfc858154C0b2c4A3323046Fb505811F110EBdA57; // uncomment before deployment
    address public NOIA_TOKEN_ADDRESS; // remove before deployment

    address public beneficiary;
    uint256 public lockTill;

    modifier onlyOwner() {
        require(msg.sender == NOIAToken(NOIA_TOKEN_ADDRESS).owner(), "Caller is not NOIA Token owner");
        _;
    }

    //function initialize(address _beneficiary, uint256 _lockTill) public { // uncomment before deployment
    function initialize(address _beneficiary, uint256 _lockTill, address noiaTokenAddress) public { // remove before deployment
        require(beneficiary == address(0), "Vault is already initialized");
        require(_beneficiary != address(0), "Locking to the zero address");
        require(_lockTill > now, "Locking time must be in future");

        NOIA_TOKEN_ADDRESS = noiaTokenAddress; // remove before deployment

        beneficiary = _beneficiary;
        lockTill = _lockTill;
        NOIAToken(NOIA_TOKEN_ADDRESS).register();
    }

    function release() public {
        if (lockTill > now) return;

        NOIAToken token = NOIAToken(NOIA_TOKEN_ADDRESS);
        uint256 balance = token.balanceOf(address(this));
        token.transfer(beneficiary, balance);
    }

    function recoverTokens(IERC20 token, address to, uint256 amount) public onlyOwner {
        require(address(token) != NOIA_TOKEN_ADDRESS, "Cannot recover NOIA Token");
        uint256 balance = token.balanceOf(address(this));
        require(balance >= amount, "Given amount is larger than current balance");
        token.safeTransfer(to, amount);
    }

    function tokensReceived(
        address,
        address,
        uint256
    ) external {
        release();
    }
}