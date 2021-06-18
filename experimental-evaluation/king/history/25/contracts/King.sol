pragma solidity ^0.4.20;

interface TOKEN {
  function transfer(address to, uint256 value, bytes data) returns (bool success);
  function balanceOf( address owner ) public constant returns (uint);
}

contract King {

  uint256 public PLAY_COST = 758;
  uint256 public FEE_COST = 230;

  TOKEN public flexbuxx;
  address public admin;

  address public king;
  uint public prize;
  uint public fees;
  uint public coronation;

  event NewKing(address newKing);
    
  function King (address _fb) public {
     flexbuxx = TOKEN(_fb);
     admin = msg.sender;
     king = msg.sender;
     coronation = now;
  }

  function tokenFallback (address from, uint256 value, bytes _dc) public {
    require(value >= PLAY_COST);
    require(msg.sender == address(flexbuxx));

    address oldKing = king;
    uint oldCoronation = coronation;

    king = from;
    coronation = now;
    fees += FEE_COST;

    if (now >= oldCoronation + 5 minutes) {
      bytes memory empty;
      prize = PLAY_COST - FEE_COST;
      flexbuxx.transfer(oldKing, prize, empty);
    } else {
      prize += PLAY_COST - FEE_COST;
    }

    emit NewKing(from);
  }

  function withdraw () public {
    require(msg.sender == admin);
    bytes memory empty;
    require(flexbuxx.transfer(admin, fees, empty));
    fees = 0;
  }
}