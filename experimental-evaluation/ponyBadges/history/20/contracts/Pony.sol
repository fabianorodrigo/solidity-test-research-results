pragma solidity ^0.4.20;

interface TOKEN {
  function transfer(address to, uint256 value, bytes data) returns (bool success);
  function balanceOf( address owner ) public constant returns (uint);
}

contract Pony {

  uint256 public PLAY_COST = 758;

  TOKEN public flexbuxx;
  address public admin;

  uint256 public totalSupply;

  mapping(address => uint256) private _ponies;

  event NewPony(address friend, uint256 ponyId);
    
  function Pony (address _fb) public {
    flexbuxx = TOKEN(_fb);
    admin = msg.sender;
    totalSupply = 0;
  }

  function tokenFallback (address from, uint256 value, bytes _dc) public {
    require(value >= PLAY_COST);
    require(msg.sender == address(flexbuxx));

    totalSupply++;
    _ponies[from] = totalSupply;

    emit NewPony(from, _ponies[from]);
  }

  function withdraw () public {
    require(msg.sender == admin);
    bytes memory empty;
    require(flexbuxx.transfer(admin, flexbuxx.balanceOf(address(this)), empty));
  }

  function getPony(address friend) public view returns (uint256 ponyId) {
    return (_ponies[friend]);
  }
}