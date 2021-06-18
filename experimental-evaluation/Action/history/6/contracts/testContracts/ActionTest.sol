pragma solidity ^0.4.25;

import "../IAction.sol";
import "electusvoting/contracts/testContracts/TokenProportionalCappedTest.sol";
import "electusvoting/contracts/testContracts/TokenProportionalUncappedTest.sol";
import "electusvoting/contracts/protocol/Protocol.sol";

contract ActionTest is IAction {
    address[] public protocolAddresses;
    address public receiverAccount;

    event EtherReceived(address sender, uint amount);

    constructor(address[] _protocolAddresses, address _receiverAccount) public {
        protocolAddresses = _protocolAddresses;
        receiverAccount = _receiverAccount;
    }

    function() public payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    function execute() external {
        if (canExecute() == 1) {
            receiverAccount.transfer(1 ether);
        }
    }

    function canExecute() public view returns (uint) {
        TokenProportionalCappedTest contract1 = TokenProportionalCappedTest(protocolAddresses[0]);
        TokenProportionalUncappedTest contract2 = TokenProportionalUncappedTest(protocolAddresses[1]);
        if (contract1.getVoteTally(1) == contract2.getVoteTally(1)) {
            return 1;
        } else {
            return 0;
        }
    }
}
