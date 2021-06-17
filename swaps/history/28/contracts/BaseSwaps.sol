pragma solidity ^0.5.6;

import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./IERC20.sol";

contract BaseSwaps is Ownable, ReentrancyGuard {
    using SafeMath for uint;

    uint public MAX_INVESTORS = 10;

    bool public isSwapped;
    bool public isCancelled;

    address public baseAddress;
    address public quoteAddress;

    uint public expirationTimestamp;

    mapping(address => uint) private limits;
    mapping(address => uint) private raised;
    mapping(address => address[]) private investors;
    mapping(address => mapping(address => uint)) private investments;

    event Cancel();
    event Deposit(address indexed token, address indexed user, uint amount, uint balance);
    event Refund(address indexed token, address indexed user, uint amount);
    event Swap(address indexed byUser);
    event SwapSend(address indexed token, address indexed user, uint amount);

    constructor(
        address _owner,
        address _baseAddress,
        address _quoteAddress,
        uint _baseLimit,
        uint _quoteLimit,
        uint _expirationTimestamp
    ) public {
        require(_baseAddress != _quoteAddress, "Exchanged tokens must be different");
        require(_baseLimit > 0, "Base limit must be positive");
        require(_quoteLimit > 0, "Quote limit must be positive");
        require(_expirationTimestamp > now, "Expiration time must be in future");

        baseAddress = _baseAddress;
        quoteAddress = _quoteAddress;
        limits[baseAddress] = _baseLimit;
        limits[quoteAddress] = _quoteLimit;
        expirationTimestamp = _expirationTimestamp;

        _transferOwnership(_owner);
    }

    modifier onlyInvestor(address _token) {
        require(_isInvestor(_token, msg.sender), "Allowed only for investors");
        _;
    }

    function()
        external
        payable
        nonReentrant
    {
        _depositEther(msg.value);
    }

    function depositBaseTokens(uint _value)
        external
        nonReentrant
    {
        _depositTokens(baseAddress, _value);
    }

    function depositQuoteTokens(uint _value)
        external
        nonReentrant
    {
        _depositTokens(quoteAddress, _value);
    }

    function cancel()
        external
        nonReentrant
        onlyOwner
    {
        require(!isCancelled, "Already cancelled");
        require(!isSwapped, "Already swapped");

        address[2] memory tokens = [baseAddress, quoteAddress];
        for (uint t = 0; t < tokens.length; t++) {
            address token = tokens[t];
            for (uint u = 0; u < investors[token].length; u++) {
                address user = investors[token][u];
                uint userInvestment = investments[token][user];
                _sendTokens(token, user, userInvestment);
            }
        }

        isCancelled = true;
        emit Cancel();
    }

    function refundBase()
        external
        onlyInvestor(baseAddress)
        nonReentrant
    {
        _refund(baseAddress);
    }

    function refundQuote()
        external
        onlyInvestor(quoteAddress)
        nonReentrant
    {
        _refund(quoteAddress);
    }

    function baseLimit() public view returns (uint) {
        return limits[baseAddress];
    }

    function quoteLimit() public view returns (uint) {
        return limits[quoteAddress];
    }

    function baseRaised() public view returns (uint) {
        return raised[baseAddress];
    }

    function quoteRaised() public view returns (uint) {
        return raised[quoteAddress];
    }

    function baseInvestors() public view returns (address[] memory) {
        return investors[baseAddress];
    }

    function quoteInvestors() public view returns (address[] memory) {
        return investors[quoteAddress];
    }

    function baseUserInvestment(address _user) public view returns (uint) {
        return investments[baseAddress][_user];
    }

    function quoteUserInvestment(address _user) public view returns (uint) {
        return investments[quoteAddress][_user];
    }

    function isBaseFilled() public view returns (bool) {
        return raised[baseAddress] == limits[baseAddress];
    }

    function isQuoteFilled() public view returns (bool) {
        return raised[quoteAddress] == limits[quoteAddress];
    }

    function _refund(address _token) internal {
        require(!isSwapped, "Already swapped");
        address user = msg.sender;
        uint investment = investments[_token][user];
        if (investment > 0) {
            delete investments[_token][user];
        }

        _removeInvestor(investors[_token], user);

        if (investment > 0) {
            raised[_token] = raised[_token].sub(investment);
            _sendTokens(_token, user, investment);
        }

        emit Refund(_token, user, investment);
    }

    function _swap() internal {
        require(!isSwapped, "Already swapped");
        require(!isCancelled, "Already cancelled");
        require(isBaseFilled(), "Base tokens not filled");
        require(isQuoteFilled(), "Quote tokens not filled");
        require(now <= expirationTimestamp, "Contract expired");

        _distribute(baseAddress, quoteAddress);
        _distribute(quoteAddress, baseAddress);

        isSwapped = true;
        emit Swap(msg.sender);
    }

    function _distribute(address _aSide, address _bSide) internal {
        uint remainder = raised[_bSide];
        for (uint i = 0; i < investors[_aSide].length; i++) {
            address user = investors[_aSide][i];
            uint toPay;
            // last
            if (i + 1 == investors[_aSide].length) {
                toPay = remainder;
            } else {
                uint aSideRaised = raised[_aSide];
                uint userInvestment = investments[_aSide][user];
                uint bSideRaised = raised[_bSide];
                toPay = userInvestment.mul(bSideRaised).div(aSideRaised);
                remainder = remainder.sub(toPay);
            }

            _sendTokens(_bSide, user, toPay);
            emit SwapSend(_bSide, user, toPay);
        }
    }

    function _sendTokens(address _token, address _to, uint _amount) internal {
        if (_token == address(0)) {
            address(uint160(_to)).transfer(_amount);
        } else {
            IERC20(_token).transfer(_to, _amount);
        }
    }

    function _removeInvestor(address[] storage _array, address _investor) internal {
        uint idx = _array.length - 1;
        for (uint i = 0; i < _array.length - 1; i++) {
            if (_array[i] == _investor) {
                idx = i;
                break;
            }
        }

        _array[idx] = _array[_array.length - 1];
        delete _array[_array.length - 1];
        _array.length--;
    }

    function _depositEther(uint _amount) internal {
        _deposit(address(0), msg.sender, _amount);
    }

    function _depositTokens(address _token, uint _amount) internal {
        uint allowance = IERC20(_token).allowance(msg.sender, address(this));
        require(_amount <= allowance, "Allowance should be not less than amount");
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        _deposit(_token, msg.sender, _amount);
    }

    function _deposit(
        address _token,
        address _from,
        uint _amount
    ) internal {
        uint amount = _amount;
        require(baseAddress == _token || quoteAddress == _token, "You can deposit only base or quote currency");
        require(amount > 0, "Currency amount must be positive");
        require(raised[_token] < limits[_token], "Limit already reached");
        require(now <= expirationTimestamp, "Contract expired");

        if (!_isInvestor(_token, _from)) {
            require(investors[_token].length < MAX_INVESTORS, "Too many investors");
            investors[_token].push(_from);
        }

        uint raisedWithOverflow = raised[_token].add(amount);
        if (raisedWithOverflow > limits[_token]) {
            uint overflow = raisedWithOverflow.sub(limits[_token]);
            _sendTokens(_token, _from, overflow);
            amount = amount.sub(overflow);
        }

        investments[_token][_from] = investments[_token][_from].add(amount);

        raised[_token] = raised[_token].add(amount);
        emit Deposit(
            _token,
            _from,
            amount,
            investments[_token][_from]
        );

        if (isBaseFilled() && isQuoteFilled()) {
            _swap();
        }
    }

    function _isInvestor(address _token, address _who) internal view returns (bool) {
        return investments[_token][_who] > 0;
    }
}
