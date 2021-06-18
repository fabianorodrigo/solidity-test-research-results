pragma solidity ^0.4.24;

import './zeppelin/StandardToken.sol';

contract Token is StandardToken {
    address public owner;

    string public constant name = 'TestToken';
    string public constant symbol = 'TOKEN';

    // SUPPLY
    uint8 public constant decimals = 0;
    uint256 public constant initialSupply = 10000;

    // all balance
    uint256 public totalSupply;


    // modifier
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // constructor function
    constructor() public {
        // set _owner
        owner = msg.sender;
        // total supply
        totalSupply = initialSupply;
        // owner of token contract has all tokens
        balances[msg.sender] = initialSupply;
    }
    /**
    * @dev Transfer token for a specified address when not paused
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        // transfer fund first if sender is not frozen
        require(super.transfer(_to, _value));
        return true;
    }

    /**
    * @dev Transfer tokens from one address to another when not paused
    * @param _from address The address which you want to send tokens from
    * @param _to address The address which you want to transfer to
    * @param _value uint256 the amount of tokens to be transferred
    */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        // transfer fund
        require(super.transferFrom(_from, _to, _value));
        return true;
    }

    /**
    * @dev Aprove the passed address to spend the specified amount of tokens on behalf of msg.sender when not paused.
    * @param _spender The address which will spend the funds.
    * @param _value The amount of tokens to be spent.
    */
    function approve(address _spender, uint256 _value) public returns (bool) {
        return super.approve(_spender, _value);
    }

    function allowance(address _owner, address _spender) public constant returns (uint256) {// solium-disable-line no-constant
        return super.allowance(_owner, _spender);
    }

}
