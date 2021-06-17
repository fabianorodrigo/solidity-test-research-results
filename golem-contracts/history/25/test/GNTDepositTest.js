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
  let contractGolemNetworkTokenBatching = null;
  let contractTokenProxy = null;
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
    contractGNTAllocation = await GNTAllocation.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[1],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[1],accounts[2],(await web3.eth.getBlockNumber())+761,(await web3.eth.getBlockNumber())+761+340,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[1],accounts[2],(await web3.eth.getBlockNumber())+761,(await web3.eth.getBlockNumber())+761+340,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],11,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],11,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[1],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[5],100,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[5],100,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[7],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[5], 5,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[0],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[0],{from: accounts[9]}),'revert');
  });
  it('Should fail transferConcent(address) when NOT comply with: _newConcent != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute transferColdwallet(address) WHEN msg.sender==_owner,_newColdwallet!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferColdwallet(accounts[3],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(11,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(11,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(10,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(10,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(9,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(9,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[1], 4, [95,23,71,63,127,149,61,217,218,119,193,41,205,119,41,148,147,99,59,117,196,209,188,195,239,36,71,217,252,150,149,225],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[5],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[3], 19,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[3], 19,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[4], 999,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[4], 999,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[6], 1338, [32,74,219,86,145,228,2,219,202,66,29,172,233,29,193,241,229,39,171,251,26,7,99,59,174,108,183,222,126,171,13,162], 20, [22,220,51,129,84,21,78,137,123,7,214,242,197,94,72,6,237,15,246,122,7,111,47,9,29,129,100,114,44,25,82,53], [69,223,102,61,154,50,62,173,191,49,216,180,193,143,180,233,133,148,27,217,144,190,32,34,82,138,141,124,145,137,203,141], 1337,{from: accounts[8]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[6], 1338, [32,74,219,86,145,228,2,219,202,66,29,172,233,29,193,241,229,39,171,251,26,7,99,59,174,108,183,222,126,171,13,162], 20, [22,220,51,129,84,21,78,137,123,7,214,242,197,94,72,6,237,15,246,122,7,111,47,9,29,129,100,114,44,25,82,53], [69,223,102,61,154,50,62,173,191,49,216,180,193,143,180,233,133,148,27,217,144,190,32,34,82,138,141,124,145,137,203,141], 1337,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[6], 1338, [32,74,219,86,145,228,2,219,202,66,29,172,233,29,193,241,229,39,171,251,26,7,99,59,174,108,183,222,126,171,13,162], 20, [22,220,51,129,84,21,78,137,123,7,214,242,197,94,72,6,237,15,246,122,7,111,47,9,29,129,100,114,44,25,82,53], [69,223,102,61,154,50,62,173,191,49,216,180,193,143,180,233,133,148,27,217,144,190,32,34,82,138,141,124,145,137,203,141], 1339,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [159,100,1001,16], [[71,78,48,227,188,111,237,96,102,96,70,129,61,99,36,164,188,104,151,30,123,115,109,39,114,13,250,47,9,87,162,13],[65,253,110,247,30,97,217,204,66,82,245,17,71,9,117,13,2,121,12,110,231,221,140,125,156,67,23,101,255,144,212,96],[167,127,139,214,253,87,231,205,179,109,60,228,57,112,236,105,178,46,92,183,113,113,45,187,117,143,95,143,15,184,116,88],[67,133,229,78,227,18,235,203,151,152,129,72,156,143,172,113,88,118,228,95,234,75,250,29,136,40,134,182,221,148,2,162]], [10,99,1,17], [[244,123,140,209,167,94,231,7,128,209,145,139,121,169,81,192,235,218,149,155,242,124,210,218,120,25,197,173,249,39,55,35],[235,126,241,218,202,96,148,152,60,138,64,203,30,205,214,61,224,88,254,107,12,226,223,71,136,15,98,113,76,177,52,55],[135,233,132,21,149,69,229,46,7,97,244,214,51,81,121,55,44,24,133,37,155,139,162,87,218,57,107,164,88,1,13,122],[127,232,126,109,21,239,222,215,63,166,168,102,173,214,190,79,29,55,39,214,94,20,69,119,101,170,190,27,246,51,25,76]], [[68,156,161,35,13,42,237,210,78,148,52,92,244,28,133,76,101,240,238,40,235,217,213,57,40,139,129,1,242,191,2,27],[26,16,160,157,22,232,254,171,112,231,121,106,157,128,205,55,230,128,247,60,69,9,95,178,19,51,45,180,56,207,237,138],[51,189,145,131,27,10,176,155,232,179,174,159,120,45,25,16,107,207,16,184,4,160,10,68,190,84,113,8,137,36,230,79],[163,77,207,211,57,48,87,132,103,215,6,100,11,236,45,88,33,199,135,130,255,204,73,200,51,121,44,191,86,207,247,209]], 81, 1001,{from: accounts[8]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [159,100,1001,16], [[71,78,48,227,188,111,237,96,102,96,70,129,61,99,36,164,188,104,151,30,123,115,109,39,114,13,250,47,9,87,162,13],[65,253,110,247,30,97,217,204,66,82,245,17,71,9,117,13,2,121,12,110,231,221,140,125,156,67,23,101,255,144,212,96],[167,127,139,214,253,87,231,205,179,109,60,228,57,112,236,105,178,46,92,183,113,113,45,187,117,143,95,143,15,184,116,88],[67,133,229,78,227,18,235,203,151,152,129,72,156,143,172,113,88,118,228,95,234,75,250,29,136,40,134,182,221,148,2,162]], [10,99,1,17], [[244,123,140,209,167,94,231,7,128,209,145,139,121,169,81,192,235,218,149,155,242,124,210,218,120,25,197,173,249,39,55,35],[235,126,241,218,202,96,148,152,60,138,64,203,30,205,214,61,224,88,254,107,12,226,223,71,136,15,98,113,76,177,52,55],[135,233,132,21,149,69,229,46,7,97,244,214,51,81,121,55,44,24,133,37,155,139,162,87,218,57,107,164,88,1,13,122],[127,232,126,109,21,239,222,215,63,166,168,102,173,214,190,79,29,55,39,214,94,20,69,119,101,170,190,27,246,51,25,76]], [[68,156,161,35,13,42,237,210,78,148,52,92,244,28,133,76,101,240,238,40,235,217,213,57,40,139,129,1,242,191,2,27],[26,16,160,157,22,232,254,171,112,231,121,106,157,128,205,55,230,128,247,60,69,9,95,178,19,51,45,180,56,207,237,138],[51,189,145,131,27,10,176,155,232,179,174,159,120,45,25,16,107,207,16,184,4,160,10,68,190,84,113,8,137,36,230,79],[163,77,207,211,57,48,87,132,103,215,6,100,11,236,45,88,33,199,135,130,255,204,73,200,51,121,44,191,86,207,247,209]], 81, 1001,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [160,100,14,1001,161], [[71,78,48,227,188,111,237,96,102,96,70,129,61,99,36,164,188,104,151,30,123,115,109,39,114,13,250,47,9,87,162,13],[65,253,110,247,30,97,217,204,66,82,245,17,71,9,117,13,2,121,12,110,231,221,140,125,156,67,23,101,255,144,212,96],[167,127,139,214,253,87,231,205,179,109,60,228,57,112,236,105,178,46,92,183,113,113,45,187,117,143,95,143,15,184,116,88],[67,133,229,78,227,18,235,203,151,152,129,72,156,143,172,113,88,118,228,95,234,75,250,29,136,40,134,182,221,148,2,162]], [10,99,1,17], [[244,123,140,209,167,94,231,7,128,209,145,139,121,169,81,192,235,218,149,155,242,124,210,218,120,25,197,173,249,39,55,35],[235,126,241,218,202,96,148,152,60,138,64,203,30,205,214,61,224,88,254,107,12,226,223,71,136,15,98,113,76,177,52,55],[135,233,132,21,149,69,229,46,7,97,244,214,51,81,121,55,44,24,133,37,155,139,162,87,218,57,107,164,88,1,13,122],[127,232,126,109,21,239,222,215,63,166,168,102,173,214,190,79,29,55,39,214,94,20,69,119,101,170,190,27,246,51,25,76]], [[68,156,161,35,13,42,237,210,78,148,52,92,244,28,133,76,101,240,238,40,235,217,213,57,40,139,129,1,242,191,2,27],[26,16,160,157,22,232,254,171,112,231,121,106,157,128,205,55,230,128,247,60,69,9,95,178,19,51,45,180,56,207,237,138],[51,189,145,131,27,10,176,155,232,179,174,159,120,45,25,16,107,207,16,184,4,160,10,68,190,84,113,8,137,36,230,79],[163,77,207,211,57,48,87,132,103,215,6,100,11,236,45,88,33,199,135,130,255,204,73,200,51,121,44,191,86,207,247,209]], 81, 1001,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [10,999,256,83,1338], [[71,78,48,227,188,111,237,96,102,96,70,129,61,99,36,164,188,104,151,30,123,115,109,39,114,13,250,47,9,87,162,13],[65,253,110,247,30,97,217,204,66,82,245,17,71,9,117,13,2,121,12,110,231,221,140,125,156,67,23,101,255,144,212,96],[167,127,139,214,253,87,231,205,179,109,60,228,57,112,236,105,178,46,92,183,113,113,45,187,117,143,95,143,15,184,116,88],[67,133,229,78,227,18,235,203,151,152,129,72,156,143,172,113,88,118,228,95,234,75,250,29,136,40,134,182,221,148,2,162]], [10,99,1,17], [[244,123,140,209,167,94,231,7,128,209,145,139,121,169,81,192,235,218,149,155,242,124,210,218,120,25,197,173,249,39,55,35],[235,126,241,218,202,96,148,152,60,138,64,203,30,205,214,61,224,88,254,107,12,226,223,71,136,15,98,113,76,177,52,55],[135,233,132,21,149,69,229,46,7,97,244,214,51,81,121,55,44,24,133,37,155,139,162,87,218,57,107,164,88,1,13,122],[127,232,126,109,21,239,222,215,63,166,168,102,173,214,190,79,29,55,39,214,94,20,69,119,101,170,190,27,246,51,25,76]], [[68,156,161,35,13,42,237,210,78,148,52,92,244,28,133,76,101,240,238,40,235,217,213,57,40,139,129,1,242,191,2,27],[26,16,160,157,22,232,254,171,112,231,121,106,157,128,205,55,230,128,247,60,69,9,95,178,19,51,45,180,56,207,237,138],[51,189,145,131,27,10,176,155,232,179,174,159,120,45,25,16,107,207,16,184,4,160,10,68,190,84,113,8,137,36,230,79],[163,77,207,211,57,48,87,132,103,215,6,100,11,236,45,88,33,199,135,130,255,204,73,200,51,121,44,191,86,207,247,209]], 81, 1001,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [16,21,16,21,256], [[71,78,48,227,188,111,237,96,102,96,70,129,61,99,36,164,188,104,151,30,123,115,109,39,114,13,250,47,9,87,162,13],[65,253,110,247,30,97,217,204,66,82,245,17,71,9,117,13,2,121,12,110,231,221,140,125,156,67,23,101,255,144,212,96],[167,127,139,214,253,87,231,205,179,109,60,228,57,112,236,105,178,46,92,183,113,113,45,187,117,143,95,143,15,184,116,88],[67,133,229,78,227,18,235,203,151,152,129,72,156,143,172,113,88,118,228,95,234,75,250,29,136,40,134,182,221,148,2,162]], [10,99,1,17], [[244,123,140,209,167,94,231,7,128,209,145,139,121,169,81,192,235,218,149,155,242,124,210,218,120,25,197,173,249,39,55,35],[235,126,241,218,202,96,148,152,60,138,64,203,30,205,214,61,224,88,254,107,12,226,223,71,136,15,98,113,76,177,52,55],[135,233,132,21,149,69,229,46,7,97,244,214,51,81,121,55,44,24,133,37,155,139,162,87,218,57,107,164,88,1,13,122],[127,232,126,109,21,239,222,215,63,166,168,102,173,214,190,79,29,55,39,214,94,20,69,119,101,170,190,27,246,51,25,76]], [[68,156,161,35,13,42,237,210,78,148,52,92,244,28,133,76,101,240,238,40,235,217,213,57,40,139,129,1,242,191,2,27],[26,16,160,157,22,232,254,171,112,231,121,106,157,128,205,55,230,128,247,60,69,9,95,178,19,51,45,180,56,207,237,138],[51,189,145,131,27,10,176,155,232,179,174,159,120,45,25,16,107,207,16,184,4,160,10,68,190,84,113,8,137,36,230,79],[163,77,207,211,57,48,87,132,103,215,6,100,11,236,45,88,33,199,135,130,255,204,73,200,51,121,44,191,86,207,247,209]], 81, 1001,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [11,15,5,1000,160], [[71,78,48,227,188,111,237,96,102,96,70,129,61,99,36,164,188,104,151,30,123,115,109,39,114,13,250,47,9,87,162,13],[65,253,110,247,30,97,217,204,66,82,245,17,71,9,117,13,2,121,12,110,231,221,140,125,156,67,23,101,255,144,212,96],[167,127,139,214,253,87,231,205,179,109,60,228,57,112,236,105,178,46,92,183,113,113,45,187,117,143,95,143,15,184,116,88],[67,133,229,78,227,18,235,203,151,152,129,72,156,143,172,113,88,118,228,95,234,75,250,29,136,40,134,182,221,148,2,162]], [10,99,1,17], [[244,123,140,209,167,94,231,7,128,209,145,139,121,169,81,192,235,218,149,155,242,124,210,218,120,25,197,173,249,39,55,35],[235,126,241,218,202,96,148,152,60,138,64,203,30,205,214,61,224,88,254,107,12,226,223,71,136,15,98,113,76,177,52,55],[135,233,132,21,149,69,229,46,7,97,244,214,51,81,121,55,44,24,133,37,155,139,162,87,218,57,107,164,88,1,13,122],[127,232,126,109,21,239,222,215,63,166,168,102,173,214,190,79,29,55,39,214,94,20,69,119,101,170,190,27,246,51,25,76]], [[68,156,161,35,13,42,237,210,78,148,52,92,244,28,133,76,101,240,238,40,235,217,213,57,40,139,129,1,242,191,2,27],[26,16,160,157,22,232,254,171,112,231,121,106,157,128,205,55,230,128,247,60,69,9,95,178,19,51,45,180,56,207,237,138],[51,189,145,131,27,10,176,155,232,179,174,159,120,45,25,16,107,207,16,184,4,160,10,68,190,84,113,8,137,36,230,79],[163,77,207,211,57,48,87,132,103,215,6,100,11,236,45,88,33,199,135,130,255,204,73,200,51,121,44,191,86,207,247,209]], 81, 1001,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 20, [66,203,218,142,229,122,86,108,235,95,147,78,158,147,16,96,113,58,181,187,72,237,222,229,123,193,206,34,103,41,53,156], 161, [93,202,130,251,59,242,16,69,215,239,86,79,159,192,15,210,211,253,86,194,236,249,237,54,84,141,107,4,235,190,146,188], [21,197,146,1,140,29,245,131,152,74,203,224,128,104,20,73,191,33,53,137,25,184,172,157,220,215,83,243,20,45,21,72], 14,{from: accounts[8]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 20, [66,203,218,142,229,122,86,108,235,95,147,78,158,147,16,96,113,58,181,187,72,237,222,229,123,193,206,34,103,41,53,156], 161, [93,202,130,251,59,242,16,69,215,239,86,79,159,192,15,210,211,253,86,194,236,249,237,54,84,141,107,4,235,190,146,188], [21,197,146,1,140,29,245,131,152,74,203,224,128,104,20,73,191,33,53,137,25,184,172,157,220,215,83,243,20,45,21,72], 14,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 20, [66,203,218,142,229,122,86,108,235,95,147,78,158,147,16,96,113,58,181,187,72,237,222,229,123,193,206,34,103,41,53,156], 161, [93,202,130,251,59,242,16,69,215,239,86,79,159,192,15,210,211,253,86,194,236,249,237,54,84,141,107,4,235,190,146,188], [21,197,146,1,140,29,245,131,152,74,203,224,128,104,20,73,191,33,53,137,25,184,172,157,220,215,83,243,20,45,21,72], 21,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[1], 11,{from: accounts[8]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[1], 11,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[5], accounts[6], 11, [58,235,99,104,113,131,166,100,15,3,206,238,120,125,6,136,118,76,88,123,137,33,248,223,170,84,69,0,147,78,17,71], 3, [80,228,135,249,207,8,237,46,82,146,163,246,170,110,16,188,31,181,20,142,116,177,67,101,242,211,146,254,140,57,194,116], [237,83,237,229,246,31,226,142,31,85,168,83,41,213,169,151,207,72,180,149,188,176,236,14,130,34,142,195,207,95,19,249],{from: accounts[0]});
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
