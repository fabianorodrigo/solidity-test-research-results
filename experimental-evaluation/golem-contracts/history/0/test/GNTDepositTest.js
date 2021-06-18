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
  let contractGolemNetworkTokenBatching = null;
  let contractGate = null;
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
    contractGNTAllocation = await GNTAllocation.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[3],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[1],accounts[2],(await web3.eth.getBlockNumber())+23,(await web3.eth.getBlockNumber())+23+530,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[1],accounts[2],(await web3.eth.getBlockNumber())+23,(await web3.eth.getBlockNumber())+23+530,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[6],1338,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[6],1338,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractGolemNetworkTokenBatching.address,accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractGolemNetworkTokenBatching.address,accounts[7],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[5],18,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[5],18,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[4],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[5],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[4], 10001,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[2],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should fail transferConcent(address) when NOT comply with: _newConcent != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute transferColdwallet(address) WHEN msg.sender==_owner,_newColdwallet!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferColdwallet(accounts[6],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[6],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(82,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(82,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(3,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(3,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(18,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(18,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[4], 17, [142,148,104,219,51,94,122,66,40,38,21,12,205,151,127,14,243,216,155,47,165,164,80,73,91,241,217,225,227,134,142,16],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[7],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[4], 0,{from: accounts[0]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[4], 0,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[3], 18,{from: accounts[0]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[3], 18,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[5], 17, [132,68,134,119,123,190,105,131,67,75,244,118,98,6,10,5,179,223,179,170,145,174,102,233,65,3,93,173,194,172,189,249], 11, [98,28,115,230,208,166,16,113,170,216,155,6,114,70,12,55,220,57,6,38,138,84,13,214,120,244,11,197,104,250,192,92], [210,190,42,139,117,99,93,22,83,64,22,114,118,184,177,23,70,64,236,33,48,128,120,152,31,47,135,175,101,246,197,43], 5,{from: accounts[0]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[5], 17, [132,68,134,119,123,190,105,131,67,75,244,118,98,6,10,5,179,223,179,170,145,174,102,233,65,3,93,173,194,172,189,249], 11, [98,28,115,230,208,166,16,113,170,216,155,6,114,70,12,55,220,57,6,38,138,84,13,214,120,244,11,197,104,250,192,92], [210,190,42,139,117,99,93,22,83,64,22,114,118,184,177,23,70,64,236,33,48,128,120,152,31,47,135,175,101,246,197,43], 5,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[5], 17, [132,68,134,119,123,190,105,131,67,75,244,118,98,6,10,5,179,223,179,170,145,174,102,233,65,3,93,173,194,172,189,249], 11, [98,28,115,230,208,166,16,113,170,216,155,6,114,70,12,55,220,57,6,38,138,84,13,214,120,244,11,197,104,250,192,92], [210,190,42,139,117,99,93,22,83,64,22,114,118,184,177,23,70,64,236,33,48,128,120,152,31,47,135,175,101,246,197,43], 18,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[8], [1336,19], [[93,15,91,129,59,217,212,115,33,105,254,49,10,243,1,210,54,196,199,173,48,56,202,183,25,239,78,216,18,217,46,18],[150,176,1,58,63,16,35,240,201,75,65,130,132,46,222,131,148,42,128,55,237,129,141,126,126,101,223,100,43,235,6,131]], [15,16], [[5,120,75,112,3,111,31,94,175,171,50,41,61,195,185,2,74,105,205,247,172,181,145,151,211,94,140,34,175,78,95,203],[5,201,0,251,104,197,152,252,165,234,150,47,232,186,67,176,58,206,166,179,58,44,250,111,28,85,163,184,216,207,158,105]], [[252,128,206,241,75,96,91,141,64,1,72,226,28,180,177,76,108,193,213,60,14,74,125,49,164,122,234,196,193,214,153,180],[247,78,211,237,143,84,163,223,46,209,182,94,61,29,98,246,244,54,4,110,24,102,94,121,234,94,233,142,112,103,140,48]], 18, 160,{from: accounts[0]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[8], [1336,19], [[93,15,91,129,59,217,212,115,33,105,254,49,10,243,1,210,54,196,199,173,48,56,202,183,25,239,78,216,18,217,46,18],[150,176,1,58,63,16,35,240,201,75,65,130,132,46,222,131,148,42,128,55,237,129,141,126,126,101,223,100,43,235,6,131]], [15,16], [[5,120,75,112,3,111,31,94,175,171,50,41,61,195,185,2,74,105,205,247,172,181,145,151,211,94,140,34,175,78,95,203],[5,201,0,251,104,197,152,252,165,234,150,47,232,186,67,176,58,206,166,179,58,44,250,111,28,85,163,184,216,207,158,105]], [[252,128,206,241,75,96,91,141,64,1,72,226,28,180,177,76,108,193,213,60,14,74,125,49,164,122,234,196,193,214,153,180],[247,78,211,237,143,84,163,223,46,209,182,94,61,29,98,246,244,54,4,110,24,102,94,121,234,94,233,142,112,103,140,48]], 18, 160,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[8], [14,15,1001], [[93,15,91,129,59,217,212,115,33,105,254,49,10,243,1,210,54,196,199,173,48,56,202,183,25,239,78,216,18,217,46,18],[150,176,1,58,63,16,35,240,201,75,65,130,132,46,222,131,148,42,128,55,237,129,141,126,126,101,223,100,43,235,6,131]], [15,16], [[5,120,75,112,3,111,31,94,175,171,50,41,61,195,185,2,74,105,205,247,172,181,145,151,211,94,140,34,175,78,95,203],[5,201,0,251,104,197,152,252,165,234,150,47,232,186,67,176,58,206,166,179,58,44,250,111,28,85,163,184,216,207,158,105]], [[252,128,206,241,75,96,91,141,64,1,72,226,28,180,177,76,108,193,213,60,14,74,125,49,164,122,234,196,193,214,153,180],[247,78,211,237,143,84,163,223,46,209,182,94,61,29,98,246,244,54,4,110,24,102,94,121,234,94,233,142,112,103,140,48]], 18, 160,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[8], [100,161,1001], [[93,15,91,129,59,217,212,115,33,105,254,49,10,243,1,210,54,196,199,173,48,56,202,183,25,239,78,216,18,217,46,18],[150,176,1,58,63,16,35,240,201,75,65,130,132,46,222,131,148,42,128,55,237,129,141,126,126,101,223,100,43,235,6,131]], [15,16], [[5,120,75,112,3,111,31,94,175,171,50,41,61,195,185,2,74,105,205,247,172,181,145,151,211,94,140,34,175,78,95,203],[5,201,0,251,104,197,152,252,165,234,150,47,232,186,67,176,58,206,166,179,58,44,250,111,28,85,163,184,216,207,158,105]], [[252,128,206,241,75,96,91,141,64,1,72,226,28,180,177,76,108,193,213,60,14,74,125,49,164,122,234,196,193,214,153,180],[247,78,211,237,143,84,163,223,46,209,182,94,61,29,98,246,244,54,4,110,24,102,94,121,234,94,233,142,112,103,140,48]], 18, 160,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[8], [9,1001,1001], [[93,15,91,129,59,217,212,115,33,105,254,49,10,243,1,210,54,196,199,173,48,56,202,183,25,239,78,216,18,217,46,18],[150,176,1,58,63,16,35,240,201,75,65,130,132,46,222,131,148,42,128,55,237,129,141,126,126,101,223,100,43,235,6,131]], [15,16], [[5,120,75,112,3,111,31,94,175,171,50,41,61,195,185,2,74,105,205,247,172,181,145,151,211,94,140,34,175,78,95,203],[5,201,0,251,104,197,152,252,165,234,150,47,232,186,67,176,58,206,166,179,58,44,250,111,28,85,163,184,216,207,158,105]], [[252,128,206,241,75,96,91,141,64,1,72,226,28,180,177,76,108,193,213,60,14,74,125,49,164,122,234,196,193,214,153,180],[247,78,211,237,143,84,163,223,46,209,182,94,61,29,98,246,244,54,4,110,24,102,94,121,234,94,233,142,112,103,140,48]], 18, 160,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[8], [1,0,4], [[93,15,91,129,59,217,212,115,33,105,254,49,10,243,1,210,54,196,199,173,48,56,202,183,25,239,78,216,18,217,46,18],[150,176,1,58,63,16,35,240,201,75,65,130,132,46,222,131,148,42,128,55,237,129,141,126,126,101,223,100,43,235,6,131]], [15,16], [[5,120,75,112,3,111,31,94,175,171,50,41,61,195,185,2,74,105,205,247,172,181,145,151,211,94,140,34,175,78,95,203],[5,201,0,251,104,197,152,252,165,234,150,47,232,186,67,176,58,206,166,179,58,44,250,111,28,85,163,184,216,207,158,105]], [[252,128,206,241,75,96,91,141,64,1,72,226,28,180,177,76,108,193,213,60,14,74,125,49,164,122,234,196,193,214,153,180],[247,78,211,237,143,84,163,223,46,209,182,94,61,29,98,246,244,54,4,110,24,102,94,121,234,94,233,142,112,103,140,48]], 18, 160,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[0], 16, [46,86,206,101,70,178,26,243,14,141,13,184,196,83,164,182,220,97,250,139,189,230,34,21,77,194,140,138,7,41,123,229], 20, [151,187,53,155,142,197,233,124,78,33,72,146,99,71,45,193,225,102,96,91,233,225,76,39,243,187,210,46,6,149,209,199], [244,137,78,0,242,97,104,177,26,160,101,59,81,105,5,240,44,178,248,226,133,130,8,15,148,211,244,54,85,41,181,7], 16,{from: accounts[0]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[0], 16, [46,86,206,101,70,178,26,243,14,141,13,184,196,83,164,182,220,97,250,139,189,230,34,21,77,194,140,138,7,41,123,229], 20, [151,187,53,155,142,197,233,124,78,33,72,146,99,71,45,193,225,102,96,91,233,225,76,39,243,187,210,46,6,149,209,199], [244,137,78,0,242,97,104,177,26,160,101,59,81,105,5,240,44,178,248,226,133,130,8,15,148,211,244,54,85,41,181,7], 16,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[0], 16, [46,86,206,101,70,178,26,243,14,141,13,184,196,83,164,182,220,97,250,139,189,230,34,21,77,194,140,138,7,41,123,229], 20, [151,187,53,155,142,197,233,124,78,33,72,146,99,71,45,193,225,102,96,91,233,225,76,39,243,187,210,46,6,149,209,199], [244,137,78,0,242,97,104,177,26,160,101,59,81,105,5,240,44,178,248,226,133,130,8,15,148,211,244,54,85,41,181,7], 17,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[8], 161,{from: accounts[0]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[8], 161,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[0], accounts[9], 1, [121,79,150,55,209,185,251,126,239,56,197,94,186,198,70,120,100,126,195,110,125,136,86,125,4,178,244,111,198,135,198,116], 15, [196,27,211,195,1,169,126,196,173,195,7,186,206,57,62,81,203,16,200,10,139,226,203,157,125,143,211,200,65,96,106,116], [204,41,67,243,27,134,77,78,202,89,55,123,5,242,117,91,240,164,132,239,61,52,160,27,79,106,180,208,95,215,142,165],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[2],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
