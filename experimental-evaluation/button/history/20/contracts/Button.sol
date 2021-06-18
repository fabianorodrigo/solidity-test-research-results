pragma solidity ^0.4.20;

interface TOKEN {
  function transfer(address to, uint256 value, bytes data) returns (bool success);
  function balanceOf( address owner ) public constant returns (uint);
}

contract Button {

  uint256 public PUSH_COST = 230;

  uint256 public pushes;

  TOKEN public flexbuxx;
  address public admin;

  event Pushed(address pushed, bool boom);
    
  function Button (address _fb) public {
     flexbuxx = TOKEN(_fb);
     admin = msg.sender;
     pushes = 0;
  }

  function tokenFallback (address from, uint256 value, bytes _dc) public {
    require(value >= PUSH_COST);
    require(msg.sender == address(flexbuxx));
    pushes++;
    emit Pushed(from, _random() == 1);
  }

  function withdraw () public {
    require(msg.sender == admin);
    bytes memory empty;
    require(flexbuxx.transfer(admin, flexbuxx.balanceOf(address(this)), empty));
  }

  function _random() private view returns (uint8) {
    return uint8(uint256(keccak256(block.timestamp, block.difficulty))%2);
  }

}