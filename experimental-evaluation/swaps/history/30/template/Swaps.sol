pragma solidity ^0.5.6;

import "./BaseSwaps.sol";

contract Swaps is BaseSwaps {
    constructor()
        public
        BaseSwaps(
            D_OWNER,
            D_BASE_ADDRESS,
            D_QUOTE_ADDRESS,
            D_BASE_LIMIT,
            D_QUOTE_LIMIT,
            D_EXPIRATION_TS
        )
    {}
}
