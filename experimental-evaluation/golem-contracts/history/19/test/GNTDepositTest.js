const truffleAssert = require('truffle-assertions');
const Faucet = artifacts.require("Faucet");
const GNTDeposit = artifacts.require("GNTDeposit");
const GNTPaymentChannels = artifacts.require("GNTPaymentChannels");
const GNTAllocation = artifacts.require("GNTAllocation");
const GolemNetworkToken = artifacts.require("GolemNetworkToken");
const GolemNetworkTokenBatching = artifacts.require("GolemNetworkTokenBatching");
const BasicToken = artifacts.require("BasicToken");
const BurnableToken = artifacts.require("BurnableToken");
const SafeMath = artifacts.require("SafeMath");
const StandardToken = artifacts.require("StandardToken");
const Gate = artifacts.require("Gate");
const TokenProxy = artifacts.require("TokenProxy");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("GNTDeposit",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractBasicToken = null;
  let contractStandardToken = null;
  let contractBurnableToken = null;
  let contractGNTAllocation = null;
  let contractGolemNetworkToken = null;
  let contractGNTPaymentChannels = null;
  let contractFaucet = null;
  let contractTokenProxy = null;
  let contractGate = null;
  let contractGolemNetworkTokenBatching = null;
  let contractGNTDeposit = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    BasicToken.link("SafeMath",contractSafeMath.address);
    contractBasicToken = await BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BasicToken.new({from: accounts[0]}');
    contractStandardToken = await StandardToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: StandardToken.new({from: accounts[0]}');
    contractBurnableToken = await BurnableToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BurnableToken.new({from: accounts[0]}');
    contractGNTAllocation = await GNTAllocation.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[4],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[0],accounts[4],(await web3.eth.getBlockNumber())+272,(await web3.eth.getBlockNumber())+272+53,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[0],accounts[4],(await web3.eth.getBlockNumber())+272,(await web3.eth.getBlockNumber())+272+53,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[2],1338,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[2],1338,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractTokenProxy.address,accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractTokenProxy.address,accounts[3],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[4],1000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[4],1000,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[8],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[2],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[3], 159,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[7],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should fail transferConcent(address) when NOT comply with: _newConcent != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute transferColdwallet(address) WHEN msg.sender==_owner,_newColdwallet!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferColdwallet(accounts[2],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(1000,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(1000,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(11,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(11,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(10000,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(10000,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[0], 99, [233,180,247,45,175,64,77,87,150,162,106,90,136,56,56,62,243,185,137,251,63,96,0,240,55,50,93,9,44,240,82,119],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[5],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[9], 159,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[9], 159,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[6], 21,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[6], 21,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[4], 18, [228,151,215,112,40,186,49,166,212,93,6,254,85,186,16,246,252,132,50,178,158,202,248,59,8,20,246,72,204,126,224,176], 82, [47,233,60,116,151,85,165,47,72,185,201,32,30,92,118,2,187,114,48,80,232,253,189,145,124,123,200,124,84,214,126,55], [129,211,213,148,107,90,211,250,160,99,65,224,171,219,49,245,150,65,157,203,100,162,58,72,221,170,41,252,245,164,221,37], 15,{from: accounts[8]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[4], 18, [228,151,215,112,40,186,49,166,212,93,6,254,85,186,16,246,252,132,50,178,158,202,248,59,8,20,246,72,204,126,224,176], 82, [47,233,60,116,151,85,165,47,72,185,201,32,30,92,118,2,187,114,48,80,232,253,189,145,124,123,200,124,84,214,126,55], [129,211,213,148,107,90,211,250,160,99,65,224,171,219,49,245,150,65,157,203,100,162,58,72,221,170,41,252,245,164,221,37], 15,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[4], 18, [228,151,215,112,40,186,49,166,212,93,6,254,85,186,16,246,252,132,50,178,158,202,248,59,8,20,246,72,204,126,224,176], 82, [47,233,60,116,151,85,165,47,72,185,201,32,30,92,118,2,187,114,48,80,232,253,189,145,124,123,200,124,84,214,126,55], [129,211,213,148,107,90,211,250,160,99,65,224,171,219,49,245,150,65,157,203,100,162,58,72,221,170,41,252,245,164,221,37], 19,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[5], [11], [[78,207,141,66,168,118,186,14,111,134,80,192,38,141,39,99,34,140,100,84,122,223,9,220,117,249,142,175,41,136,255,131]], [19], [[162,59,215,219,98,98,195,115,81,109,93,81,29,134,139,210,148,207,121,14,146,132,206,41,152,249,169,203,164,26,22,213]], [[90,117,212,162,230,123,192,236,91,196,211,217,251,29,102,47,34,208,148,192,77,130,251,126,214,109,151,152,5,194,188,223]], 2, 2,{from: accounts[8]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[5], [11], [[78,207,141,66,168,118,186,14,111,134,80,192,38,141,39,99,34,140,100,84,122,223,9,220,117,249,142,175,41,136,255,131]], [19], [[162,59,215,219,98,98,195,115,81,109,93,81,29,134,139,210,148,207,121,14,146,132,206,41,152,249,169,203,164,26,22,213]], [[90,117,212,162,230,123,192,236,91,196,211,217,251,29,102,47,34,208,148,192,77,130,251,126,214,109,151,152,5,194,188,223]], 2, 2,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[5], [83,21], [[78,207,141,66,168,118,186,14,111,134,80,192,38,141,39,99,34,140,100,84,122,223,9,220,117,249,142,175,41,136,255,131]], [19], [[162,59,215,219,98,98,195,115,81,109,93,81,29,134,139,210,148,207,121,14,146,132,206,41,152,249,169,203,164,26,22,213]], [[90,117,212,162,230,123,192,236,91,196,211,217,251,29,102,47,34,208,148,192,77,130,251,126,214,109,151,152,5,194,188,223]], 2, 2,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[5], [6,159], [[78,207,141,66,168,118,186,14,111,134,80,192,38,141,39,99,34,140,100,84,122,223,9,220,117,249,142,175,41,136,255,131]], [19], [[162,59,215,219,98,98,195,115,81,109,93,81,29,134,139,210,148,207,121,14,146,132,206,41,152,249,169,203,164,26,22,213]], [[90,117,212,162,230,123,192,236,91,196,211,217,251,29,102,47,34,208,148,192,77,130,251,126,214,109,151,152,5,194,188,223]], 2, 2,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[5], [256,83], [[78,207,141,66,168,118,186,14,111,134,80,192,38,141,39,99,34,140,100,84,122,223,9,220,117,249,142,175,41,136,255,131]], [19], [[162,59,215,219,98,98,195,115,81,109,93,81,29,134,139,210,148,207,121,14,146,132,206,41,152,249,169,203,164,26,22,213]], [[90,117,212,162,230,123,192,236,91,196,211,217,251,29,102,47,34,208,148,192,77,130,251,126,214,109,151,152,5,194,188,223]], 2, 2,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[5], [10,100], [[78,207,141,66,168,118,186,14,111,134,80,192,38,141,39,99,34,140,100,84,122,223,9,220,117,249,142,175,41,136,255,131]], [19], [[162,59,215,219,98,98,195,115,81,109,93,81,29,134,139,210,148,207,121,14,146,132,206,41,152,249,169,203,164,26,22,213]], [[90,117,212,162,230,123,192,236,91,196,211,217,251,29,102,47,34,208,148,192,77,130,251,126,214,109,151,152,5,194,188,223]], 2, 2,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 10001, [61,176,195,34,67,60,213,143,132,37,119,91,162,226,49,175,90,212,43,174,108,249,129,96,94,208,200,179,149,66,190,48], 81, [221,15,23,122,147,89,132,92,108,125,143,115,64,248,121,195,77,140,65,157,107,12,36,53,164,226,183,1,112,199,41,166], [132,93,15,147,112,113,223,40,26,54,20,76,104,209,236,232,166,204,138,164,161,54,201,207,63,4,53,152,231,217,231,191], 21,{from: accounts[8]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 10001, [61,176,195,34,67,60,213,143,132,37,119,91,162,226,49,175,90,212,43,174,108,249,129,96,94,208,200,179,149,66,190,48], 81, [221,15,23,122,147,89,132,92,108,125,143,115,64,248,121,195,77,140,65,157,107,12,36,53,164,226,183,1,112,199,41,166], [132,93,15,147,112,113,223,40,26,54,20,76,104,209,236,232,166,204,138,164,161,54,201,207,63,4,53,152,231,217,231,191], 21,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 10001, [61,176,195,34,67,60,213,143,132,37,119,91,162,226,49,175,90,212,43,174,108,249,129,96,94,208,200,179,149,66,190,48], 81, [221,15,23,122,147,89,132,92,108,125,143,115,64,248,121,195,77,140,65,157,107,12,36,53,164,226,183,1,112,199,41,166], [132,93,15,147,112,113,223,40,26,54,20,76,104,209,236,232,166,204,138,164,161,54,201,207,63,4,53,152,231,217,231,191], 10002,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[9], 11,{from: accounts[8]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[9], 11,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[9], accounts[8], 83, [232,18,63,249,241,165,170,51,219,84,203,9,84,68,192,236,50,31,61,225,16,122,117,147,220,36,44,58,139,113,118,192], 83, [55,117,28,208,31,24,45,161,122,76,205,137,106,41,243,183,34,191,80,39,178,186,4,196,89,167,115,122,148,41,145,152], [98,100,116,252,231,173,213,22,34,14,210,227,97,159,11,195,201,117,16,26,217,70,39,8,132,217,236,130,22,54,111,39],{from: accounts[0]});
  });
  it('Should execute owner()', async () => {
    let result = await contractGNTDeposit.owner({from: accounts[0]});
  });
  it('Should execute isOwner()', async () => {
    let result = await contractGNTDeposit.isOwner({from: accounts[0]});
  });
  it('Should execute renounceOwnership() WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.renounceOwnership({from: accounts[0]});
  });
  it('Should fail renounceOwnership() when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.renounceOwnership({from: accounts[9]}),'revert');
  });
  it('Should execute transferOwnership(address) WHEN msg.sender==_owner,newOwner!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferOwnership(accounts[8],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
