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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[7],accounts[7],(await web3.eth.getBlockNumber())+92,(await web3.eth.getBlockNumber())+92+507,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[7],accounts[7],(await web3.eth.getBlockNumber())+92,(await web3.eth.getBlockNumber())+92+507,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[9],1336,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[9],1336,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[8],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[6],159,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[6],159,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[4],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[4],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[5],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[7], 1000,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[5],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should fail transferConcent(address) when NOT comply with: _newConcent != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute transferColdwallet(address) WHEN msg.sender==_owner,_newColdwallet!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferColdwallet(accounts[4],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[4],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(10001,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(10001,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(1338,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(1338,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(161,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(161,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[0], 160, [238,86,208,93,94,204,241,15,134,146,95,83,244,55,101,37,130,7,162,12,159,166,103,161,75,96,158,155,249,82,143,16],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[1],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[6], 1338,{from: accounts[2]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[6], 1338,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[5], 16,{from: accounts[2]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[5], 16,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[9], 9999, [153,57,27,242,136,32,89,186,207,5,97,171,28,125,119,46,98,232,194,205,180,86,30,7,247,76,82,200,109,96,224,129], 17, [165,10,44,16,0,225,169,212,131,99,90,96,66,41,208,232,94,38,7,10,139,72,119,188,118,113,138,135,105,243,5,82], [78,157,59,52,228,169,213,195,49,84,232,16,37,89,226,158,179,161,125,9,10,226,158,237,28,173,140,246,238,113,162,227], 9,{from: accounts[2]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[9], 9999, [153,57,27,242,136,32,89,186,207,5,97,171,28,125,119,46,98,232,194,205,180,86,30,7,247,76,82,200,109,96,224,129], 17, [165,10,44,16,0,225,169,212,131,99,90,96,66,41,208,232,94,38,7,10,139,72,119,188,118,113,138,135,105,243,5,82], [78,157,59,52,228,169,213,195,49,84,232,16,37,89,226,158,179,161,125,9,10,226,158,237,28,173,140,246,238,113,162,227], 9,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[9], 9999, [153,57,27,242,136,32,89,186,207,5,97,171,28,125,119,46,98,232,194,205,180,86,30,7,247,76,82,200,109,96,224,129], 17, [165,10,44,16,0,225,169,212,131,99,90,96,66,41,208,232,94,38,7,10,139,72,119,188,118,113,138,135,105,243,5,82], [78,157,59,52,228,169,213,195,49,84,232,16,37,89,226,158,179,161,125,9,10,226,158,237,28,173,140,246,238,113,162,227], 10000,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[7], [999,9,256,0,999,256], [[82,47,69,97,119,222,34,249,54,16,1,65,145,146,155,127,58,214,229,198,16,204,122,152,119,47,13,8,181,228,42,22],[53,37,46,63,49,139,40,18,236,22,109,91,119,125,20,119,133,158,98,202,167,232,155,223,49,155,74,16,92,65,212,235],[31,6,59,214,236,60,251,249,11,236,13,211,33,0,250,15,12,7,166,59,6,151,13,149,44,192,49,29,157,168,247,38],[249,17,35,38,252,68,70,236,26,16,54,104,190,138,36,3,172,212,236,106,88,70,89,141,112,21,230,115,10,82,185,76],[179,193,104,31,160,124,146,94,7,250,202,221,138,133,138,115,195,84,254,116,6,95,235,198,51,24,196,248,86,162,0,144],[184,33,198,76,76,198,225,233,69,45,5,211,42,229,130,64,176,129,176,62,5,103,0,188,244,45,58,57,118,75,66,102]], [161,5,0,4,82,11], [[45,102,184,232,221,166,49,138,6,183,7,231,60,92,185,243,197,225,20,207,202,110,15,80,216,223,80,235,50,4,97,78],[154,140,224,40,25,19,39,208,93,115,24,254,19,154,163,102,203,65,26,139,124,5,165,160,145,195,205,80,253,23,77,153],[184,195,75,197,233,234,53,106,27,3,204,88,87,209,38,247,223,103,223,114,221,238,229,214,109,226,249,202,234,226,217,106],[145,182,238,126,163,101,47,154,240,113,87,217,82,163,185,54,159,61,128,54,74,238,125,243,174,198,80,108,101,130,158,7],[216,198,246,184,76,182,156,40,200,156,32,108,19,31,26,202,76,242,189,2,87,248,140,160,156,190,198,0,21,198,138,120],[194,116,124,174,132,138,100,163,248,228,91,114,75,245,178,90,1,224,36,118,254,125,86,216,114,68,198,237,91,9,12,106]], [[55,178,135,180,84,167,38,115,89,7,29,104,250,41,126,105,144,5,233,239,159,37,80,200,148,18,68,79,112,49,166,182],[168,114,98,84,182,161,87,57,107,124,37,171,253,129,145,32,192,150,37,180,154,74,133,162,193,9,113,209,184,103,192,176],[16,6,9,179,108,235,8,182,85,73,19,168,201,163,17,221,195,209,83,243,201,135,25,167,138,50,41,244,164,165,54,225],[41,242,244,241,59,113,148,117,71,116,167,21,148,188,7,47,31,5,124,125,173,48,74,216,142,184,221,115,225,1,171,138],[24,41,203,235,161,26,235,35,250,137,1,200,24,188,187,8,1,167,95,239,13,2,80,147,208,47,154,133,114,11,100,24],[41,126,60,110,54,244,225,31,197,20,140,107,117,130,33,237,30,145,191,217,122,65,176,64,182,85,112,108,145,126,49,248]], 9, 1001,{from: accounts[2]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[7], [999,9,256,0,999,256], [[82,47,69,97,119,222,34,249,54,16,1,65,145,146,155,127,58,214,229,198,16,204,122,152,119,47,13,8,181,228,42,22],[53,37,46,63,49,139,40,18,236,22,109,91,119,125,20,119,133,158,98,202,167,232,155,223,49,155,74,16,92,65,212,235],[31,6,59,214,236,60,251,249,11,236,13,211,33,0,250,15,12,7,166,59,6,151,13,149,44,192,49,29,157,168,247,38],[249,17,35,38,252,68,70,236,26,16,54,104,190,138,36,3,172,212,236,106,88,70,89,141,112,21,230,115,10,82,185,76],[179,193,104,31,160,124,146,94,7,250,202,221,138,133,138,115,195,84,254,116,6,95,235,198,51,24,196,248,86,162,0,144],[184,33,198,76,76,198,225,233,69,45,5,211,42,229,130,64,176,129,176,62,5,103,0,188,244,45,58,57,118,75,66,102]], [161,5,0,4,82,11], [[45,102,184,232,221,166,49,138,6,183,7,231,60,92,185,243,197,225,20,207,202,110,15,80,216,223,80,235,50,4,97,78],[154,140,224,40,25,19,39,208,93,115,24,254,19,154,163,102,203,65,26,139,124,5,165,160,145,195,205,80,253,23,77,153],[184,195,75,197,233,234,53,106,27,3,204,88,87,209,38,247,223,103,223,114,221,238,229,214,109,226,249,202,234,226,217,106],[145,182,238,126,163,101,47,154,240,113,87,217,82,163,185,54,159,61,128,54,74,238,125,243,174,198,80,108,101,130,158,7],[216,198,246,184,76,182,156,40,200,156,32,108,19,31,26,202,76,242,189,2,87,248,140,160,156,190,198,0,21,198,138,120],[194,116,124,174,132,138,100,163,248,228,91,114,75,245,178,90,1,224,36,118,254,125,86,216,114,68,198,237,91,9,12,106]], [[55,178,135,180,84,167,38,115,89,7,29,104,250,41,126,105,144,5,233,239,159,37,80,200,148,18,68,79,112,49,166,182],[168,114,98,84,182,161,87,57,107,124,37,171,253,129,145,32,192,150,37,180,154,74,133,162,193,9,113,209,184,103,192,176],[16,6,9,179,108,235,8,182,85,73,19,168,201,163,17,221,195,209,83,243,201,135,25,167,138,50,41,244,164,165,54,225],[41,242,244,241,59,113,148,117,71,116,167,21,148,188,7,47,31,5,124,125,173,48,74,216,142,184,221,115,225,1,171,138],[24,41,203,235,161,26,235,35,250,137,1,200,24,188,187,8,1,167,95,239,13,2,80,147,208,47,154,133,114,11,100,24],[41,126,60,110,54,244,225,31,197,20,140,107,117,130,33,237,30,145,191,217,122,65,176,64,182,85,112,108,145,126,49,248]], 9, 1001,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[7], [1000,0,999,256,160,14,20], [[82,47,69,97,119,222,34,249,54,16,1,65,145,146,155,127,58,214,229,198,16,204,122,152,119,47,13,8,181,228,42,22],[53,37,46,63,49,139,40,18,236,22,109,91,119,125,20,119,133,158,98,202,167,232,155,223,49,155,74,16,92,65,212,235],[31,6,59,214,236,60,251,249,11,236,13,211,33,0,250,15,12,7,166,59,6,151,13,149,44,192,49,29,157,168,247,38],[249,17,35,38,252,68,70,236,26,16,54,104,190,138,36,3,172,212,236,106,88,70,89,141,112,21,230,115,10,82,185,76],[179,193,104,31,160,124,146,94,7,250,202,221,138,133,138,115,195,84,254,116,6,95,235,198,51,24,196,248,86,162,0,144],[184,33,198,76,76,198,225,233,69,45,5,211,42,229,130,64,176,129,176,62,5,103,0,188,244,45,58,57,118,75,66,102]], [161,5,0,4,82,11], [[45,102,184,232,221,166,49,138,6,183,7,231,60,92,185,243,197,225,20,207,202,110,15,80,216,223,80,235,50,4,97,78],[154,140,224,40,25,19,39,208,93,115,24,254,19,154,163,102,203,65,26,139,124,5,165,160,145,195,205,80,253,23,77,153],[184,195,75,197,233,234,53,106,27,3,204,88,87,209,38,247,223,103,223,114,221,238,229,214,109,226,249,202,234,226,217,106],[145,182,238,126,163,101,47,154,240,113,87,217,82,163,185,54,159,61,128,54,74,238,125,243,174,198,80,108,101,130,158,7],[216,198,246,184,76,182,156,40,200,156,32,108,19,31,26,202,76,242,189,2,87,248,140,160,156,190,198,0,21,198,138,120],[194,116,124,174,132,138,100,163,248,228,91,114,75,245,178,90,1,224,36,118,254,125,86,216,114,68,198,237,91,9,12,106]], [[55,178,135,180,84,167,38,115,89,7,29,104,250,41,126,105,144,5,233,239,159,37,80,200,148,18,68,79,112,49,166,182],[168,114,98,84,182,161,87,57,107,124,37,171,253,129,145,32,192,150,37,180,154,74,133,162,193,9,113,209,184,103,192,176],[16,6,9,179,108,235,8,182,85,73,19,168,201,163,17,221,195,209,83,243,201,135,25,167,138,50,41,244,164,165,54,225],[41,242,244,241,59,113,148,117,71,116,167,21,148,188,7,47,31,5,124,125,173,48,74,216,142,184,221,115,225,1,171,138],[24,41,203,235,161,26,235,35,250,137,1,200,24,188,187,8,1,167,95,239,13,2,80,147,208,47,154,133,114,11,100,24],[41,126,60,110,54,244,225,31,197,20,140,107,117,130,33,237,30,145,191,217,122,65,176,64,182,85,112,108,145,126,49,248]], 9, 1001,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[7], [3,81,1,14,10001,5,4], [[82,47,69,97,119,222,34,249,54,16,1,65,145,146,155,127,58,214,229,198,16,204,122,152,119,47,13,8,181,228,42,22],[53,37,46,63,49,139,40,18,236,22,109,91,119,125,20,119,133,158,98,202,167,232,155,223,49,155,74,16,92,65,212,235],[31,6,59,214,236,60,251,249,11,236,13,211,33,0,250,15,12,7,166,59,6,151,13,149,44,192,49,29,157,168,247,38],[249,17,35,38,252,68,70,236,26,16,54,104,190,138,36,3,172,212,236,106,88,70,89,141,112,21,230,115,10,82,185,76],[179,193,104,31,160,124,146,94,7,250,202,221,138,133,138,115,195,84,254,116,6,95,235,198,51,24,196,248,86,162,0,144],[184,33,198,76,76,198,225,233,69,45,5,211,42,229,130,64,176,129,176,62,5,103,0,188,244,45,58,57,118,75,66,102]], [161,5,0,4,82,11], [[45,102,184,232,221,166,49,138,6,183,7,231,60,92,185,243,197,225,20,207,202,110,15,80,216,223,80,235,50,4,97,78],[154,140,224,40,25,19,39,208,93,115,24,254,19,154,163,102,203,65,26,139,124,5,165,160,145,195,205,80,253,23,77,153],[184,195,75,197,233,234,53,106,27,3,204,88,87,209,38,247,223,103,223,114,221,238,229,214,109,226,249,202,234,226,217,106],[145,182,238,126,163,101,47,154,240,113,87,217,82,163,185,54,159,61,128,54,74,238,125,243,174,198,80,108,101,130,158,7],[216,198,246,184,76,182,156,40,200,156,32,108,19,31,26,202,76,242,189,2,87,248,140,160,156,190,198,0,21,198,138,120],[194,116,124,174,132,138,100,163,248,228,91,114,75,245,178,90,1,224,36,118,254,125,86,216,114,68,198,237,91,9,12,106]], [[55,178,135,180,84,167,38,115,89,7,29,104,250,41,126,105,144,5,233,239,159,37,80,200,148,18,68,79,112,49,166,182],[168,114,98,84,182,161,87,57,107,124,37,171,253,129,145,32,192,150,37,180,154,74,133,162,193,9,113,209,184,103,192,176],[16,6,9,179,108,235,8,182,85,73,19,168,201,163,17,221,195,209,83,243,201,135,25,167,138,50,41,244,164,165,54,225],[41,242,244,241,59,113,148,117,71,116,167,21,148,188,7,47,31,5,124,125,173,48,74,216,142,184,221,115,225,1,171,138],[24,41,203,235,161,26,235,35,250,137,1,200,24,188,187,8,1,167,95,239,13,2,80,147,208,47,154,133,114,11,100,24],[41,126,60,110,54,244,225,31,197,20,140,107,117,130,33,237,30,145,191,217,122,65,176,64,182,85,112,108,145,126,49,248]], 9, 1001,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[7], [21,160,6,999,999,257,9], [[82,47,69,97,119,222,34,249,54,16,1,65,145,146,155,127,58,214,229,198,16,204,122,152,119,47,13,8,181,228,42,22],[53,37,46,63,49,139,40,18,236,22,109,91,119,125,20,119,133,158,98,202,167,232,155,223,49,155,74,16,92,65,212,235],[31,6,59,214,236,60,251,249,11,236,13,211,33,0,250,15,12,7,166,59,6,151,13,149,44,192,49,29,157,168,247,38],[249,17,35,38,252,68,70,236,26,16,54,104,190,138,36,3,172,212,236,106,88,70,89,141,112,21,230,115,10,82,185,76],[179,193,104,31,160,124,146,94,7,250,202,221,138,133,138,115,195,84,254,116,6,95,235,198,51,24,196,248,86,162,0,144],[184,33,198,76,76,198,225,233,69,45,5,211,42,229,130,64,176,129,176,62,5,103,0,188,244,45,58,57,118,75,66,102]], [161,5,0,4,82,11], [[45,102,184,232,221,166,49,138,6,183,7,231,60,92,185,243,197,225,20,207,202,110,15,80,216,223,80,235,50,4,97,78],[154,140,224,40,25,19,39,208,93,115,24,254,19,154,163,102,203,65,26,139,124,5,165,160,145,195,205,80,253,23,77,153],[184,195,75,197,233,234,53,106,27,3,204,88,87,209,38,247,223,103,223,114,221,238,229,214,109,226,249,202,234,226,217,106],[145,182,238,126,163,101,47,154,240,113,87,217,82,163,185,54,159,61,128,54,74,238,125,243,174,198,80,108,101,130,158,7],[216,198,246,184,76,182,156,40,200,156,32,108,19,31,26,202,76,242,189,2,87,248,140,160,156,190,198,0,21,198,138,120],[194,116,124,174,132,138,100,163,248,228,91,114,75,245,178,90,1,224,36,118,254,125,86,216,114,68,198,237,91,9,12,106]], [[55,178,135,180,84,167,38,115,89,7,29,104,250,41,126,105,144,5,233,239,159,37,80,200,148,18,68,79,112,49,166,182],[168,114,98,84,182,161,87,57,107,124,37,171,253,129,145,32,192,150,37,180,154,74,133,162,193,9,113,209,184,103,192,176],[16,6,9,179,108,235,8,182,85,73,19,168,201,163,17,221,195,209,83,243,201,135,25,167,138,50,41,244,164,165,54,225],[41,242,244,241,59,113,148,117,71,116,167,21,148,188,7,47,31,5,124,125,173,48,74,216,142,184,221,115,225,1,171,138],[24,41,203,235,161,26,235,35,250,137,1,200,24,188,187,8,1,167,95,239,13,2,80,147,208,47,154,133,114,11,100,24],[41,126,60,110,54,244,225,31,197,20,140,107,117,130,33,237,30,145,191,217,122,65,176,64,182,85,112,108,145,126,49,248]], 9, 1001,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[7], [10,14,1337,1,21,6,83], [[82,47,69,97,119,222,34,249,54,16,1,65,145,146,155,127,58,214,229,198,16,204,122,152,119,47,13,8,181,228,42,22],[53,37,46,63,49,139,40,18,236,22,109,91,119,125,20,119,133,158,98,202,167,232,155,223,49,155,74,16,92,65,212,235],[31,6,59,214,236,60,251,249,11,236,13,211,33,0,250,15,12,7,166,59,6,151,13,149,44,192,49,29,157,168,247,38],[249,17,35,38,252,68,70,236,26,16,54,104,190,138,36,3,172,212,236,106,88,70,89,141,112,21,230,115,10,82,185,76],[179,193,104,31,160,124,146,94,7,250,202,221,138,133,138,115,195,84,254,116,6,95,235,198,51,24,196,248,86,162,0,144],[184,33,198,76,76,198,225,233,69,45,5,211,42,229,130,64,176,129,176,62,5,103,0,188,244,45,58,57,118,75,66,102]], [161,5,0,4,82,11], [[45,102,184,232,221,166,49,138,6,183,7,231,60,92,185,243,197,225,20,207,202,110,15,80,216,223,80,235,50,4,97,78],[154,140,224,40,25,19,39,208,93,115,24,254,19,154,163,102,203,65,26,139,124,5,165,160,145,195,205,80,253,23,77,153],[184,195,75,197,233,234,53,106,27,3,204,88,87,209,38,247,223,103,223,114,221,238,229,214,109,226,249,202,234,226,217,106],[145,182,238,126,163,101,47,154,240,113,87,217,82,163,185,54,159,61,128,54,74,238,125,243,174,198,80,108,101,130,158,7],[216,198,246,184,76,182,156,40,200,156,32,108,19,31,26,202,76,242,189,2,87,248,140,160,156,190,198,0,21,198,138,120],[194,116,124,174,132,138,100,163,248,228,91,114,75,245,178,90,1,224,36,118,254,125,86,216,114,68,198,237,91,9,12,106]], [[55,178,135,180,84,167,38,115,89,7,29,104,250,41,126,105,144,5,233,239,159,37,80,200,148,18,68,79,112,49,166,182],[168,114,98,84,182,161,87,57,107,124,37,171,253,129,145,32,192,150,37,180,154,74,133,162,193,9,113,209,184,103,192,176],[16,6,9,179,108,235,8,182,85,73,19,168,201,163,17,221,195,209,83,243,201,135,25,167,138,50,41,244,164,165,54,225],[41,242,244,241,59,113,148,117,71,116,167,21,148,188,7,47,31,5,124,125,173,48,74,216,142,184,221,115,225,1,171,138],[24,41,203,235,161,26,235,35,250,137,1,200,24,188,187,8,1,167,95,239,13,2,80,147,208,47,154,133,114,11,100,24],[41,126,60,110,54,244,225,31,197,20,140,107,117,130,33,237,30,145,191,217,122,65,176,64,182,85,112,108,145,126,49,248]], 9, 1001,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 15, [30,114,24,105,28,35,235,138,126,246,76,51,9,7,173,165,105,51,112,90,140,2,112,216,115,23,139,86,78,242,118,27], 255, [45,132,72,13,26,40,138,100,179,240,109,26,228,142,73,19,56,25,65,143,181,27,25,88,12,54,170,156,235,133,251,26], [88,87,164,93,14,154,36,12,148,42,225,24,113,10,83,224,28,74,187,244,25,31,102,84,185,87,80,234,192,204,170,81], 11,{from: accounts[2]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 15, [30,114,24,105,28,35,235,138,126,246,76,51,9,7,173,165,105,51,112,90,140,2,112,216,115,23,139,86,78,242,118,27], 255, [45,132,72,13,26,40,138,100,179,240,109,26,228,142,73,19,56,25,65,143,181,27,25,88,12,54,170,156,235,133,251,26], [88,87,164,93,14,154,36,12,148,42,225,24,113,10,83,224,28,74,187,244,25,31,102,84,185,87,80,234,192,204,170,81], 11,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 15, [30,114,24,105,28,35,235,138,126,246,76,51,9,7,173,165,105,51,112,90,140,2,112,216,115,23,139,86,78,242,118,27], 255, [45,132,72,13,26,40,138,100,179,240,109,26,228,142,73,19,56,25,65,143,181,27,25,88,12,54,170,156,235,133,251,26], [88,87,164,93,14,154,36,12,148,42,225,24,113,10,83,224,28,74,187,244,25,31,102,84,185,87,80,234,192,204,170,81], 16,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[6], 81,{from: accounts[2]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[6], 81,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[9], accounts[4], 1337, [53,56,137,41,100,64,130,203,169,4,173,156,170,48,87,190,41,16,79,80,209,160,70,141,231,206,94,130,90,120,193,31], 161, [235,105,221,144,189,199,2,176,199,28,195,40,32,225,162,135,174,243,169,235,231,255,105,203,239,51,6,176,104,142,239,34], [56,142,165,244,118,184,141,85,111,94,85,240,249,26,117,96,13,61,219,19,124,162,82,81,201,106,154,240,193,70,85,254],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[7],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
