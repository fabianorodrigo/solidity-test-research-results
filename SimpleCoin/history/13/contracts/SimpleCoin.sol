pragma solidity 0.4.21;


contract SimpleCoin {

    mapping(address => uint256) private balances;
    mapping (address => mapping (address => uint256)) private allowed;
    string public name;
    string public symbol;
    uint public totalSupply;
    address public owner;
    address public newOwner;

    event LogTransfer(address indexed _from, address indexed _to, uint256 _value);
    event LogApproval(address indexed _owner, address indexed _spender, uint256 _value);
    event LogOwnershipTransferred(address indexed _from, address indexed _to);
    event LogOwnershipDeclined(address indexed _to);

    function SimpleCoin() public {
        name = "Simple Coin";
        symbol = "XSC";
        totalSupply = 1000000;
        owner = msg.sender;
        balances[owner] = totalSupply;
        emit LogTransfer(address(0), owner, totalSupply);
    }

    // ensure the sender is the owner
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // getter for balance of specified owner
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    // getter for allowance of specified spender from specified owner
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    // getter for total supply, deduct any zero-account balance
    function totalSupply() public view returns (uint) {
        return totalSupply - balances[address(0)];
    }

    // transfer value from sender to specified address
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // ensure the sender has enough coins
        require(balances[msg.sender] >= _value);
        // reduce senders balance by value
        balances[msg.sender] -= _value;
        // increase receivers balance by value
        balances[_to] += _value;
        // log transfer of value
        emit LogTransfer(msg.sender, _to, _value);
        // success
        return true;
    }

    // transfer value from sender to specified address as a spender with given allowance
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // get amount spender is allowed to spend
        uint256 remaining = allowed[_from][msg.sender];
        // ensure from account has enough coins and amount allowed to spend is more than value
        require(balances[_from] >= _value && remaining >= _value);
        // increase receivers balance by value
        balances[_to] += _value;
        // decrease from accounts balance by value
        balances[_from] -= _value;
        // decrease allowance by value
        allowed[_from][msg.sender] -= _value;
        // log transfer of value
        emit LogTransfer(_from, _to, _value);
        // success
        return true;
    }

    // approve specified address to spend the specified value on behalf of sender
    function approve(address _spender, uint256 _value) public returns (bool success) {
        // set allowance value
        allowed[msg.sender][_spender] = _value;
        // log approval
        emit LogApproval(msg.sender, _spender, _value);
        // success
        return true;
    }

    // essentially send request to potential new owner for them to accept
    function transferOwnership(address _newOwner) public onlyOwner {
        // set potential new owner
        newOwner = _newOwner;
    }

    // as the new potential owner, accept ownership
    function acceptOwnership() public returns (bool success) {
        // ensure sender is potential new owner
        require(msg.sender == newOwner);
        // change owner to new owner
        owner = newOwner;
        // set next potential new owner to zero-account
        newOwner = address(0);
        // log ownership transfer
        emit LogOwnershipTransferred(owner, newOwner);
        // success
        return true;
    }

    // as the new potential owner, decline ownership
    function declineOwnership() public returns (bool success) {
        // ensure sender is potential new owner
        require(msg.sender == newOwner);
        // set potential new owner to zero-account
        newOwner = address(0);
        // log ownership decline
        emit LogOwnershipDeclined(newOwner);
        // success
        return true;
    }

}
