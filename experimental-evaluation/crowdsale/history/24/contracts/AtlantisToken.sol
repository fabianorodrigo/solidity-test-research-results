pragma solidity ^0.5.4;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";


contract AtlantisToken is ERC20, ERC20Detailed {
    constructor()
        public
        ERC20Detailed("Atlantis Gold", "ANG", 18)
    {
        uint256 totalAmount = 500e6 * (10**uint(decimals()));
        _mint(msg.sender, totalAmount);
    }
}
