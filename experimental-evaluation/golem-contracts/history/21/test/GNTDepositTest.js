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
    contractGNTAllocation = await GNTAllocation.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[1],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[1],(await web3.eth.getBlockNumber())+531,(await web3.eth.getBlockNumber())+531+594,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[1],(await web3.eth.getBlockNumber())+531,(await web3.eth.getBlockNumber())+531+594,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[9],257,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[9],257,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[5],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[8],1000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[8],1000,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[4],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[7],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[4], 2,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[3],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should fail transferConcent(address) when NOT comply with: _newConcent != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute transferColdwallet(address) WHEN msg.sender==_owner,_newColdwallet!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferColdwallet(accounts[1],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(14,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(14,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(21,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(21,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(5,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(5,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[1], 255, [73,93,181,145,93,134,104,13,189,23,102,186,131,156,21,172,64,187,197,142,5,57,115,40,8,128,107,99,202,248,37,205],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[4],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[0], 255,{from: accounts[2]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[0], 255,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[7], 83,{from: accounts[2]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[7], 83,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[7], 1, [255,47,215,139,204,119,18,234,126,21,231,216,212,82,104,68,231,127,100,179,47,193,194,57,241,70,233,157,47,1,115,56], 10, [0,16,46,12,255,109,176,237,219,207,224,201,117,255,114,157,38,119,40,55,232,143,34,89,249,156,243,60,117,203,126,52], [108,147,142,190,30,200,145,185,247,184,254,161,116,70,199,185,49,142,214,240,120,40,102,207,56,73,70,171,106,154,220,167], 0,{from: accounts[2]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[7], 1, [255,47,215,139,204,119,18,234,126,21,231,216,212,82,104,68,231,127,100,179,47,193,194,57,241,70,233,157,47,1,115,56], 10, [0,16,46,12,255,109,176,237,219,207,224,201,117,255,114,157,38,119,40,55,232,143,34,89,249,156,243,60,117,203,126,52], [108,147,142,190,30,200,145,185,247,184,254,161,116,70,199,185,49,142,214,240,120,40,102,207,56,73,70,171,106,154,220,167], 0,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[7], 1, [255,47,215,139,204,119,18,234,126,21,231,216,212,82,104,68,231,127,100,179,47,193,194,57,241,70,233,157,47,1,115,56], 10, [0,16,46,12,255,109,176,237,219,207,224,201,117,255,114,157,38,119,40,55,232,143,34,89,249,156,243,60,117,203,126,52], [108,147,142,190,30,200,145,185,247,184,254,161,116,70,199,185,49,142,214,240,120,40,102,207,56,73,70,171,106,154,220,167], 2,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[4], [0,999], [[251,32,75,97,53,25,91,23,240,74,91,80,14,99,239,129,240,157,56,99,228,12,193,48,133,70,221,233,209,91,66,133],[119,133,108,63,243,176,188,44,32,138,35,112,89,80,210,247,71,140,215,88,236,64,183,193,68,1,40,237,153,229,20,250]], [3,18], [[130,3,138,176,192,225,215,211,71,5,71,187,179,91,34,167,63,39,40,227,147,37,153,155,88,132,100,234,246,172,54,250],[113,54,68,23,140,42,169,170,180,252,193,229,150,116,228,19,38,66,34,153,13,156,149,68,235,64,95,199,96,159,160,91]], [[240,216,189,213,242,50,89,54,151,154,109,68,224,114,64,153,223,22,186,208,68,203,147,1,114,84,161,111,232,246,24,200],[75,144,90,153,185,165,179,4,83,163,89,134,16,221,42,148,102,32,123,50,179,49,245,57,88,203,19,82,72,107,81,176]], 161, 83,{from: accounts[2]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[4], [0,999], [[251,32,75,97,53,25,91,23,240,74,91,80,14,99,239,129,240,157,56,99,228,12,193,48,133,70,221,233,209,91,66,133],[119,133,108,63,243,176,188,44,32,138,35,112,89,80,210,247,71,140,215,88,236,64,183,193,68,1,40,237,153,229,20,250]], [3,18], [[130,3,138,176,192,225,215,211,71,5,71,187,179,91,34,167,63,39,40,227,147,37,153,155,88,132,100,234,246,172,54,250],[113,54,68,23,140,42,169,170,180,252,193,229,150,116,228,19,38,66,34,153,13,156,149,68,235,64,95,199,96,159,160,91]], [[240,216,189,213,242,50,89,54,151,154,109,68,224,114,64,153,223,22,186,208,68,203,147,1,114,84,161,111,232,246,24,200],[75,144,90,153,185,165,179,4,83,163,89,134,16,221,42,148,102,32,123,50,179,49,245,57,88,203,19,82,72,107,81,176]], 161, 83,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[4], [15,82,100], [[251,32,75,97,53,25,91,23,240,74,91,80,14,99,239,129,240,157,56,99,228,12,193,48,133,70,221,233,209,91,66,133],[119,133,108,63,243,176,188,44,32,138,35,112,89,80,210,247,71,140,215,88,236,64,183,193,68,1,40,237,153,229,20,250]], [3,18], [[130,3,138,176,192,225,215,211,71,5,71,187,179,91,34,167,63,39,40,227,147,37,153,155,88,132,100,234,246,172,54,250],[113,54,68,23,140,42,169,170,180,252,193,229,150,116,228,19,38,66,34,153,13,156,149,68,235,64,95,199,96,159,160,91]], [[240,216,189,213,242,50,89,54,151,154,109,68,224,114,64,153,223,22,186,208,68,203,147,1,114,84,161,111,232,246,24,200],[75,144,90,153,185,165,179,4,83,163,89,134,16,221,42,148,102,32,123,50,179,49,245,57,88,203,19,82,72,107,81,176]], 161, 83,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[4], [5,21,16], [[251,32,75,97,53,25,91,23,240,74,91,80,14,99,239,129,240,157,56,99,228,12,193,48,133,70,221,233,209,91,66,133],[119,133,108,63,243,176,188,44,32,138,35,112,89,80,210,247,71,140,215,88,236,64,183,193,68,1,40,237,153,229,20,250]], [3,18], [[130,3,138,176,192,225,215,211,71,5,71,187,179,91,34,167,63,39,40,227,147,37,153,155,88,132,100,234,246,172,54,250],[113,54,68,23,140,42,169,170,180,252,193,229,150,116,228,19,38,66,34,153,13,156,149,68,235,64,95,199,96,159,160,91]], [[240,216,189,213,242,50,89,54,151,154,109,68,224,114,64,153,223,22,186,208,68,203,147,1,114,84,161,111,232,246,24,200],[75,144,90,153,185,165,179,4,83,163,89,134,16,221,42,148,102,32,123,50,179,49,245,57,88,203,19,82,72,107,81,176]], 161, 83,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[4], [18,0,1], [[251,32,75,97,53,25,91,23,240,74,91,80,14,99,239,129,240,157,56,99,228,12,193,48,133,70,221,233,209,91,66,133],[119,133,108,63,243,176,188,44,32,138,35,112,89,80,210,247,71,140,215,88,236,64,183,193,68,1,40,237,153,229,20,250]], [3,18], [[130,3,138,176,192,225,215,211,71,5,71,187,179,91,34,167,63,39,40,227,147,37,153,155,88,132,100,234,246,172,54,250],[113,54,68,23,140,42,169,170,180,252,193,229,150,116,228,19,38,66,34,153,13,156,149,68,235,64,95,199,96,159,160,91]], [[240,216,189,213,242,50,89,54,151,154,109,68,224,114,64,153,223,22,186,208,68,203,147,1,114,84,161,111,232,246,24,200],[75,144,90,153,185,165,179,4,83,163,89,134,16,221,42,148,102,32,123,50,179,49,245,57,88,203,19,82,72,107,81,176]], 161, 83,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[4], [9999,81,11], [[251,32,75,97,53,25,91,23,240,74,91,80,14,99,239,129,240,157,56,99,228,12,193,48,133,70,221,233,209,91,66,133],[119,133,108,63,243,176,188,44,32,138,35,112,89,80,210,247,71,140,215,88,236,64,183,193,68,1,40,237,153,229,20,250]], [3,18], [[130,3,138,176,192,225,215,211,71,5,71,187,179,91,34,167,63,39,40,227,147,37,153,155,88,132,100,234,246,172,54,250],[113,54,68,23,140,42,169,170,180,252,193,229,150,116,228,19,38,66,34,153,13,156,149,68,235,64,95,199,96,159,160,91]], [[240,216,189,213,242,50,89,54,151,154,109,68,224,114,64,153,223,22,186,208,68,203,147,1,114,84,161,111,232,246,24,200],[75,144,90,153,185,165,179,4,83,163,89,134,16,221,42,148,102,32,123,50,179,49,245,57,88,203,19,82,72,107,81,176]], 161, 83,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 4, [51,44,83,167,156,151,57,241,121,8,110,31,189,6,89,36,136,122,31,51,61,244,218,201,62,145,134,6,218,154,2,225], 100, [242,253,189,164,59,145,168,255,31,255,242,157,215,173,52,53,2,43,53,176,1,133,49,78,193,255,88,57,155,208,154,150], [140,152,234,102,124,213,83,118,79,125,134,108,251,19,126,19,128,250,180,196,22,205,33,41,162,247,7,59,250,208,27,74], 2,{from: accounts[2]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 4, [51,44,83,167,156,151,57,241,121,8,110,31,189,6,89,36,136,122,31,51,61,244,218,201,62,145,134,6,218,154,2,225], 100, [242,253,189,164,59,145,168,255,31,255,242,157,215,173,52,53,2,43,53,176,1,133,49,78,193,255,88,57,155,208,154,150], [140,152,234,102,124,213,83,118,79,125,134,108,251,19,126,19,128,250,180,196,22,205,33,41,162,247,7,59,250,208,27,74], 2,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 4, [51,44,83,167,156,151,57,241,121,8,110,31,189,6,89,36,136,122,31,51,61,244,218,201,62,145,134,6,218,154,2,225], 100, [242,253,189,164,59,145,168,255,31,255,242,157,215,173,52,53,2,43,53,176,1,133,49,78,193,255,88,57,155,208,154,150], [140,152,234,102,124,213,83,118,79,125,134,108,251,19,126,19,128,250,180,196,22,205,33,41,162,247,7,59,250,208,27,74], 5,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[0], 10000,{from: accounts[2]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[0], 10000,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[6], accounts[1], 2, [68,217,225,194,52,134,77,217,212,97,122,196,29,251,4,145,103,107,150,48,88,25,178,128,189,132,245,2,169,133,237,71], 1, [205,166,251,185,84,250,40,194,15,145,75,175,218,21,175,210,152,143,71,170,7,191,156,215,211,29,193,131,61,172,0,144], [66,251,64,68,92,117,60,198,40,153,217,77,248,158,196,107,130,15,91,110,11,175,130,130,192,85,48,156,100,150,145,237],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[3],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
