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
    contractGNTAllocation = await GNTAllocation.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[4],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+746,(await web3.eth.getBlockNumber())+746+543,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+746,(await web3.eth.getBlockNumber())+746+543,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],10000,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[4],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[7],1336,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[7],1336,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[6],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[1],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[1], 20,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[1],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[1],{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.setMaximumDepositsTotal(82,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(82,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(83,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(83,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(10001,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(10001,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[4], 101, [20,112,157,137,193,54,251,17,79,235,242,165,41,61,189,189,187,45,39,213,209,148,122,140,123,97,228,243,200,211,14,2],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[3],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[5], 9999,{from: accounts[6]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[5], 9999,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[7], 11,{from: accounts[6]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[7], 11,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[6], 101, [25,214,17,201,51,46,195,154,59,72,206,97,97,189,71,158,151,51,3,102,116,39,39,169,232,198,200,154,42,32,208,50], 4, [91,110,76,92,245,189,239,230,89,67,61,164,246,185,209,150,124,18,145,28,165,128,241,253,28,218,8,222,251,217,208,142], [58,15,133,94,89,227,214,44,25,225,224,207,52,10,175,242,164,193,241,204,153,241,172,40,237,161,213,85,68,67,171,227], 100,{from: accounts[6]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[6], 101, [25,214,17,201,51,46,195,154,59,72,206,97,97,189,71,158,151,51,3,102,116,39,39,169,232,198,200,154,42,32,208,50], 4, [91,110,76,92,245,189,239,230,89,67,61,164,246,185,209,150,124,18,145,28,165,128,241,253,28,218,8,222,251,217,208,142], [58,15,133,94,89,227,214,44,25,225,224,207,52,10,175,242,164,193,241,204,153,241,172,40,237,161,213,85,68,67,171,227], 100,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[9], accounts[6], 101, [25,214,17,201,51,46,195,154,59,72,206,97,97,189,71,158,151,51,3,102,116,39,39,169,232,198,200,154,42,32,208,50], 4, [91,110,76,92,245,189,239,230,89,67,61,164,246,185,209,150,124,18,145,28,165,128,241,253,28,218,8,222,251,217,208,142], [58,15,133,94,89,227,214,44,25,225,224,207,52,10,175,242,164,193,241,204,153,241,172,40,237,161,213,85,68,67,171,227], 102,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[5], [159,159,101,16,20,4,255,16], [[60,79,109,43,96,142,96,159,198,200,226,167,33,72,37,139,136,149,136,11,27,172,145,22,175,108,192,232,67,181,255,169],[131,126,116,157,10,149,150,67,111,199,99,30,241,221,253,232,249,124,101,163,151,80,217,227,124,54,86,179,60,201,30,217],[213,8,113,146,217,234,74,51,158,90,83,91,175,104,34,138,116,254,34,127,94,61,188,149,126,202,6,210,230,99,197,169],[250,36,238,168,142,244,129,229,43,1,83,182,55,9,159,94,105,135,163,203,150,217,216,222,84,87,163,16,38,27,20,239],[113,131,246,251,66,169,101,231,7,118,229,215,145,195,137,245,156,103,174,18,27,193,234,110,117,205,138,117,51,13,8,137],[40,69,253,116,217,33,154,175,72,39,79,142,28,116,164,220,212,177,52,43,152,69,119,238,12,4,234,164,174,56,225,237],[139,28,92,44,45,246,120,247,2,88,212,67,115,149,27,144,247,232,175,218,100,2,215,5,95,56,3,184,42,1,141,224],[46,20,17,65,101,209,243,198,171,134,66,240,222,94,95,94,143,66,29,172,107,92,252,44,193,203,75,168,63,49,11,18]], [100,159,82,101,160,16,161,160], [[242,52,60,87,55,175,201,81,225,172,114,136,247,145,131,74,192,138,18,48,84,38,44,131,151,219,237,206,83,243,190,123],[184,57,104,226,201,209,101,193,39,133,133,200,99,159,176,82,65,55,14,188,134,182,100,101,94,255,3,201,220,145,74,153],[87,170,28,54,50,67,208,85,58,162,190,78,95,231,228,156,76,125,53,163,115,57,132,86,216,203,59,51,244,197,140,24],[213,8,144,127,147,128,11,234,78,17,23,182,17,8,20,36,155,113,6,176,5,178,151,237,35,11,117,28,192,206,224,0],[63,36,114,109,244,87,241,50,96,228,167,13,163,19,53,224,226,173,46,153,40,164,209,220,137,233,235,207,198,2,2,215],[92,44,144,226,181,196,203,216,22,92,214,166,241,46,224,97,161,71,46,99,150,237,30,117,191,21,103,35,144,250,22,81],[135,195,210,160,93,175,57,23,32,204,176,66,4,179,159,168,162,192,80,148,152,75,78,50,237,153,89,185,173,79,56,80],[232,172,63,36,169,237,9,203,242,82,159,196,248,45,132,110,224,56,55,2,218,35,175,148,201,111,246,65,114,206,209,217]], [[23,212,219,152,76,217,26,148,144,40,253,180,45,116,209,205,45,125,99,72,57,207,42,122,15,194,1,96,84,138,19,65],[221,141,235,232,11,39,24,126,177,100,141,182,184,83,189,172,130,219,13,228,11,157,111,114,124,89,154,25,201,101,33,10],[199,151,164,137,18,210,141,230,135,239,250,115,219,124,144,214,225,209,141,227,240,204,50,181,154,222,237,116,91,160,252,51],[246,248,129,238,150,120,8,254,131,121,65,103,231,251,161,245,229,205,68,62,55,184,15,230,42,131,35,29,144,61,13,130],[71,119,116,211,65,191,97,214,68,131,121,46,124,187,49,116,136,111,55,226,161,165,50,23,90,78,239,65,105,105,4,254],[63,165,237,52,38,178,7,66,163,171,219,145,242,193,143,195,43,20,201,206,249,107,131,81,98,79,63,172,134,157,23,113],[160,239,7,68,30,20,79,208,157,212,17,232,106,64,208,18,33,171,6,29,223,59,219,241,12,175,255,235,15,70,80,144],[156,208,148,110,79,128,156,35,25,47,150,226,52,232,166,110,244,24,115,65,98,0,67,79,196,235,100,85,198,224,123,171]], 99, 6,{from: accounts[6]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[5], [159,159,101,16,20,4,255,16], [[60,79,109,43,96,142,96,159,198,200,226,167,33,72,37,139,136,149,136,11,27,172,145,22,175,108,192,232,67,181,255,169],[131,126,116,157,10,149,150,67,111,199,99,30,241,221,253,232,249,124,101,163,151,80,217,227,124,54,86,179,60,201,30,217],[213,8,113,146,217,234,74,51,158,90,83,91,175,104,34,138,116,254,34,127,94,61,188,149,126,202,6,210,230,99,197,169],[250,36,238,168,142,244,129,229,43,1,83,182,55,9,159,94,105,135,163,203,150,217,216,222,84,87,163,16,38,27,20,239],[113,131,246,251,66,169,101,231,7,118,229,215,145,195,137,245,156,103,174,18,27,193,234,110,117,205,138,117,51,13,8,137],[40,69,253,116,217,33,154,175,72,39,79,142,28,116,164,220,212,177,52,43,152,69,119,238,12,4,234,164,174,56,225,237],[139,28,92,44,45,246,120,247,2,88,212,67,115,149,27,144,247,232,175,218,100,2,215,5,95,56,3,184,42,1,141,224],[46,20,17,65,101,209,243,198,171,134,66,240,222,94,95,94,143,66,29,172,107,92,252,44,193,203,75,168,63,49,11,18]], [100,159,82,101,160,16,161,160], [[242,52,60,87,55,175,201,81,225,172,114,136,247,145,131,74,192,138,18,48,84,38,44,131,151,219,237,206,83,243,190,123],[184,57,104,226,201,209,101,193,39,133,133,200,99,159,176,82,65,55,14,188,134,182,100,101,94,255,3,201,220,145,74,153],[87,170,28,54,50,67,208,85,58,162,190,78,95,231,228,156,76,125,53,163,115,57,132,86,216,203,59,51,244,197,140,24],[213,8,144,127,147,128,11,234,78,17,23,182,17,8,20,36,155,113,6,176,5,178,151,237,35,11,117,28,192,206,224,0],[63,36,114,109,244,87,241,50,96,228,167,13,163,19,53,224,226,173,46,153,40,164,209,220,137,233,235,207,198,2,2,215],[92,44,144,226,181,196,203,216,22,92,214,166,241,46,224,97,161,71,46,99,150,237,30,117,191,21,103,35,144,250,22,81],[135,195,210,160,93,175,57,23,32,204,176,66,4,179,159,168,162,192,80,148,152,75,78,50,237,153,89,185,173,79,56,80],[232,172,63,36,169,237,9,203,242,82,159,196,248,45,132,110,224,56,55,2,218,35,175,148,201,111,246,65,114,206,209,217]], [[23,212,219,152,76,217,26,148,144,40,253,180,45,116,209,205,45,125,99,72,57,207,42,122,15,194,1,96,84,138,19,65],[221,141,235,232,11,39,24,126,177,100,141,182,184,83,189,172,130,219,13,228,11,157,111,114,124,89,154,25,201,101,33,10],[199,151,164,137,18,210,141,230,135,239,250,115,219,124,144,214,225,209,141,227,240,204,50,181,154,222,237,116,91,160,252,51],[246,248,129,238,150,120,8,254,131,121,65,103,231,251,161,245,229,205,68,62,55,184,15,230,42,131,35,29,144,61,13,130],[71,119,116,211,65,191,97,214,68,131,121,46,124,187,49,116,136,111,55,226,161,165,50,23,90,78,239,65,105,105,4,254],[63,165,237,52,38,178,7,66,163,171,219,145,242,193,143,195,43,20,201,206,249,107,131,81,98,79,63,172,134,157,23,113],[160,239,7,68,30,20,79,208,157,212,17,232,106,64,208,18,33,171,6,29,223,59,219,241,12,175,255,235,15,70,80,144],[156,208,148,110,79,128,156,35,25,47,150,226,52,232,166,110,244,24,115,65,98,0,67,79,196,235,100,85,198,224,123,171]], 99, 6,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[5], [82,18,6,1000,1001,999,18,1,15], [[60,79,109,43,96,142,96,159,198,200,226,167,33,72,37,139,136,149,136,11,27,172,145,22,175,108,192,232,67,181,255,169],[131,126,116,157,10,149,150,67,111,199,99,30,241,221,253,232,249,124,101,163,151,80,217,227,124,54,86,179,60,201,30,217],[213,8,113,146,217,234,74,51,158,90,83,91,175,104,34,138,116,254,34,127,94,61,188,149,126,202,6,210,230,99,197,169],[250,36,238,168,142,244,129,229,43,1,83,182,55,9,159,94,105,135,163,203,150,217,216,222,84,87,163,16,38,27,20,239],[113,131,246,251,66,169,101,231,7,118,229,215,145,195,137,245,156,103,174,18,27,193,234,110,117,205,138,117,51,13,8,137],[40,69,253,116,217,33,154,175,72,39,79,142,28,116,164,220,212,177,52,43,152,69,119,238,12,4,234,164,174,56,225,237],[139,28,92,44,45,246,120,247,2,88,212,67,115,149,27,144,247,232,175,218,100,2,215,5,95,56,3,184,42,1,141,224],[46,20,17,65,101,209,243,198,171,134,66,240,222,94,95,94,143,66,29,172,107,92,252,44,193,203,75,168,63,49,11,18]], [100,159,82,101,160,16,161,160], [[242,52,60,87,55,175,201,81,225,172,114,136,247,145,131,74,192,138,18,48,84,38,44,131,151,219,237,206,83,243,190,123],[184,57,104,226,201,209,101,193,39,133,133,200,99,159,176,82,65,55,14,188,134,182,100,101,94,255,3,201,220,145,74,153],[87,170,28,54,50,67,208,85,58,162,190,78,95,231,228,156,76,125,53,163,115,57,132,86,216,203,59,51,244,197,140,24],[213,8,144,127,147,128,11,234,78,17,23,182,17,8,20,36,155,113,6,176,5,178,151,237,35,11,117,28,192,206,224,0],[63,36,114,109,244,87,241,50,96,228,167,13,163,19,53,224,226,173,46,153,40,164,209,220,137,233,235,207,198,2,2,215],[92,44,144,226,181,196,203,216,22,92,214,166,241,46,224,97,161,71,46,99,150,237,30,117,191,21,103,35,144,250,22,81],[135,195,210,160,93,175,57,23,32,204,176,66,4,179,159,168,162,192,80,148,152,75,78,50,237,153,89,185,173,79,56,80],[232,172,63,36,169,237,9,203,242,82,159,196,248,45,132,110,224,56,55,2,218,35,175,148,201,111,246,65,114,206,209,217]], [[23,212,219,152,76,217,26,148,144,40,253,180,45,116,209,205,45,125,99,72,57,207,42,122,15,194,1,96,84,138,19,65],[221,141,235,232,11,39,24,126,177,100,141,182,184,83,189,172,130,219,13,228,11,157,111,114,124,89,154,25,201,101,33,10],[199,151,164,137,18,210,141,230,135,239,250,115,219,124,144,214,225,209,141,227,240,204,50,181,154,222,237,116,91,160,252,51],[246,248,129,238,150,120,8,254,131,121,65,103,231,251,161,245,229,205,68,62,55,184,15,230,42,131,35,29,144,61,13,130],[71,119,116,211,65,191,97,214,68,131,121,46,124,187,49,116,136,111,55,226,161,165,50,23,90,78,239,65,105,105,4,254],[63,165,237,52,38,178,7,66,163,171,219,145,242,193,143,195,43,20,201,206,249,107,131,81,98,79,63,172,134,157,23,113],[160,239,7,68,30,20,79,208,157,212,17,232,106,64,208,18,33,171,6,29,223,59,219,241,12,175,255,235,15,70,80,144],[156,208,148,110,79,128,156,35,25,47,150,226,52,232,166,110,244,24,115,65,98,0,67,79,196,235,100,85,198,224,123,171]], 99, 6,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[5], [2,19,101,999,18,15,9999,4,5], [[60,79,109,43,96,142,96,159,198,200,226,167,33,72,37,139,136,149,136,11,27,172,145,22,175,108,192,232,67,181,255,169],[131,126,116,157,10,149,150,67,111,199,99,30,241,221,253,232,249,124,101,163,151,80,217,227,124,54,86,179,60,201,30,217],[213,8,113,146,217,234,74,51,158,90,83,91,175,104,34,138,116,254,34,127,94,61,188,149,126,202,6,210,230,99,197,169],[250,36,238,168,142,244,129,229,43,1,83,182,55,9,159,94,105,135,163,203,150,217,216,222,84,87,163,16,38,27,20,239],[113,131,246,251,66,169,101,231,7,118,229,215,145,195,137,245,156,103,174,18,27,193,234,110,117,205,138,117,51,13,8,137],[40,69,253,116,217,33,154,175,72,39,79,142,28,116,164,220,212,177,52,43,152,69,119,238,12,4,234,164,174,56,225,237],[139,28,92,44,45,246,120,247,2,88,212,67,115,149,27,144,247,232,175,218,100,2,215,5,95,56,3,184,42,1,141,224],[46,20,17,65,101,209,243,198,171,134,66,240,222,94,95,94,143,66,29,172,107,92,252,44,193,203,75,168,63,49,11,18]], [100,159,82,101,160,16,161,160], [[242,52,60,87,55,175,201,81,225,172,114,136,247,145,131,74,192,138,18,48,84,38,44,131,151,219,237,206,83,243,190,123],[184,57,104,226,201,209,101,193,39,133,133,200,99,159,176,82,65,55,14,188,134,182,100,101,94,255,3,201,220,145,74,153],[87,170,28,54,50,67,208,85,58,162,190,78,95,231,228,156,76,125,53,163,115,57,132,86,216,203,59,51,244,197,140,24],[213,8,144,127,147,128,11,234,78,17,23,182,17,8,20,36,155,113,6,176,5,178,151,237,35,11,117,28,192,206,224,0],[63,36,114,109,244,87,241,50,96,228,167,13,163,19,53,224,226,173,46,153,40,164,209,220,137,233,235,207,198,2,2,215],[92,44,144,226,181,196,203,216,22,92,214,166,241,46,224,97,161,71,46,99,150,237,30,117,191,21,103,35,144,250,22,81],[135,195,210,160,93,175,57,23,32,204,176,66,4,179,159,168,162,192,80,148,152,75,78,50,237,153,89,185,173,79,56,80],[232,172,63,36,169,237,9,203,242,82,159,196,248,45,132,110,224,56,55,2,218,35,175,148,201,111,246,65,114,206,209,217]], [[23,212,219,152,76,217,26,148,144,40,253,180,45,116,209,205,45,125,99,72,57,207,42,122,15,194,1,96,84,138,19,65],[221,141,235,232,11,39,24,126,177,100,141,182,184,83,189,172,130,219,13,228,11,157,111,114,124,89,154,25,201,101,33,10],[199,151,164,137,18,210,141,230,135,239,250,115,219,124,144,214,225,209,141,227,240,204,50,181,154,222,237,116,91,160,252,51],[246,248,129,238,150,120,8,254,131,121,65,103,231,251,161,245,229,205,68,62,55,184,15,230,42,131,35,29,144,61,13,130],[71,119,116,211,65,191,97,214,68,131,121,46,124,187,49,116,136,111,55,226,161,165,50,23,90,78,239,65,105,105,4,254],[63,165,237,52,38,178,7,66,163,171,219,145,242,193,143,195,43,20,201,206,249,107,131,81,98,79,63,172,134,157,23,113],[160,239,7,68,30,20,79,208,157,212,17,232,106,64,208,18,33,171,6,29,223,59,219,241,12,175,255,235,15,70,80,144],[156,208,148,110,79,128,156,35,25,47,150,226,52,232,166,110,244,24,115,65,98,0,67,79,196,235,100,85,198,224,123,171]], 99, 6,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[5], [18,1,999,99,1,15,102,1,10], [[60,79,109,43,96,142,96,159,198,200,226,167,33,72,37,139,136,149,136,11,27,172,145,22,175,108,192,232,67,181,255,169],[131,126,116,157,10,149,150,67,111,199,99,30,241,221,253,232,249,124,101,163,151,80,217,227,124,54,86,179,60,201,30,217],[213,8,113,146,217,234,74,51,158,90,83,91,175,104,34,138,116,254,34,127,94,61,188,149,126,202,6,210,230,99,197,169],[250,36,238,168,142,244,129,229,43,1,83,182,55,9,159,94,105,135,163,203,150,217,216,222,84,87,163,16,38,27,20,239],[113,131,246,251,66,169,101,231,7,118,229,215,145,195,137,245,156,103,174,18,27,193,234,110,117,205,138,117,51,13,8,137],[40,69,253,116,217,33,154,175,72,39,79,142,28,116,164,220,212,177,52,43,152,69,119,238,12,4,234,164,174,56,225,237],[139,28,92,44,45,246,120,247,2,88,212,67,115,149,27,144,247,232,175,218,100,2,215,5,95,56,3,184,42,1,141,224],[46,20,17,65,101,209,243,198,171,134,66,240,222,94,95,94,143,66,29,172,107,92,252,44,193,203,75,168,63,49,11,18]], [100,159,82,101,160,16,161,160], [[242,52,60,87,55,175,201,81,225,172,114,136,247,145,131,74,192,138,18,48,84,38,44,131,151,219,237,206,83,243,190,123],[184,57,104,226,201,209,101,193,39,133,133,200,99,159,176,82,65,55,14,188,134,182,100,101,94,255,3,201,220,145,74,153],[87,170,28,54,50,67,208,85,58,162,190,78,95,231,228,156,76,125,53,163,115,57,132,86,216,203,59,51,244,197,140,24],[213,8,144,127,147,128,11,234,78,17,23,182,17,8,20,36,155,113,6,176,5,178,151,237,35,11,117,28,192,206,224,0],[63,36,114,109,244,87,241,50,96,228,167,13,163,19,53,224,226,173,46,153,40,164,209,220,137,233,235,207,198,2,2,215],[92,44,144,226,181,196,203,216,22,92,214,166,241,46,224,97,161,71,46,99,150,237,30,117,191,21,103,35,144,250,22,81],[135,195,210,160,93,175,57,23,32,204,176,66,4,179,159,168,162,192,80,148,152,75,78,50,237,153,89,185,173,79,56,80],[232,172,63,36,169,237,9,203,242,82,159,196,248,45,132,110,224,56,55,2,218,35,175,148,201,111,246,65,114,206,209,217]], [[23,212,219,152,76,217,26,148,144,40,253,180,45,116,209,205,45,125,99,72,57,207,42,122,15,194,1,96,84,138,19,65],[221,141,235,232,11,39,24,126,177,100,141,182,184,83,189,172,130,219,13,228,11,157,111,114,124,89,154,25,201,101,33,10],[199,151,164,137,18,210,141,230,135,239,250,115,219,124,144,214,225,209,141,227,240,204,50,181,154,222,237,116,91,160,252,51],[246,248,129,238,150,120,8,254,131,121,65,103,231,251,161,245,229,205,68,62,55,184,15,230,42,131,35,29,144,61,13,130],[71,119,116,211,65,191,97,214,68,131,121,46,124,187,49,116,136,111,55,226,161,165,50,23,90,78,239,65,105,105,4,254],[63,165,237,52,38,178,7,66,163,171,219,145,242,193,143,195,43,20,201,206,249,107,131,81,98,79,63,172,134,157,23,113],[160,239,7,68,30,20,79,208,157,212,17,232,106,64,208,18,33,171,6,29,223,59,219,241,12,175,255,235,15,70,80,144],[156,208,148,110,79,128,156,35,25,47,150,226,52,232,166,110,244,24,115,65,98,0,67,79,196,235,100,85,198,224,123,171]], 99, 6,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[1], accounts[5], [255,255,1338,99,100,10001,81,20,9999], [[60,79,109,43,96,142,96,159,198,200,226,167,33,72,37,139,136,149,136,11,27,172,145,22,175,108,192,232,67,181,255,169],[131,126,116,157,10,149,150,67,111,199,99,30,241,221,253,232,249,124,101,163,151,80,217,227,124,54,86,179,60,201,30,217],[213,8,113,146,217,234,74,51,158,90,83,91,175,104,34,138,116,254,34,127,94,61,188,149,126,202,6,210,230,99,197,169],[250,36,238,168,142,244,129,229,43,1,83,182,55,9,159,94,105,135,163,203,150,217,216,222,84,87,163,16,38,27,20,239],[113,131,246,251,66,169,101,231,7,118,229,215,145,195,137,245,156,103,174,18,27,193,234,110,117,205,138,117,51,13,8,137],[40,69,253,116,217,33,154,175,72,39,79,142,28,116,164,220,212,177,52,43,152,69,119,238,12,4,234,164,174,56,225,237],[139,28,92,44,45,246,120,247,2,88,212,67,115,149,27,144,247,232,175,218,100,2,215,5,95,56,3,184,42,1,141,224],[46,20,17,65,101,209,243,198,171,134,66,240,222,94,95,94,143,66,29,172,107,92,252,44,193,203,75,168,63,49,11,18]], [100,159,82,101,160,16,161,160], [[242,52,60,87,55,175,201,81,225,172,114,136,247,145,131,74,192,138,18,48,84,38,44,131,151,219,237,206,83,243,190,123],[184,57,104,226,201,209,101,193,39,133,133,200,99,159,176,82,65,55,14,188,134,182,100,101,94,255,3,201,220,145,74,153],[87,170,28,54,50,67,208,85,58,162,190,78,95,231,228,156,76,125,53,163,115,57,132,86,216,203,59,51,244,197,140,24],[213,8,144,127,147,128,11,234,78,17,23,182,17,8,20,36,155,113,6,176,5,178,151,237,35,11,117,28,192,206,224,0],[63,36,114,109,244,87,241,50,96,228,167,13,163,19,53,224,226,173,46,153,40,164,209,220,137,233,235,207,198,2,2,215],[92,44,144,226,181,196,203,216,22,92,214,166,241,46,224,97,161,71,46,99,150,237,30,117,191,21,103,35,144,250,22,81],[135,195,210,160,93,175,57,23,32,204,176,66,4,179,159,168,162,192,80,148,152,75,78,50,237,153,89,185,173,79,56,80],[232,172,63,36,169,237,9,203,242,82,159,196,248,45,132,110,224,56,55,2,218,35,175,148,201,111,246,65,114,206,209,217]], [[23,212,219,152,76,217,26,148,144,40,253,180,45,116,209,205,45,125,99,72,57,207,42,122,15,194,1,96,84,138,19,65],[221,141,235,232,11,39,24,126,177,100,141,182,184,83,189,172,130,219,13,228,11,157,111,114,124,89,154,25,201,101,33,10],[199,151,164,137,18,210,141,230,135,239,250,115,219,124,144,214,225,209,141,227,240,204,50,181,154,222,237,116,91,160,252,51],[246,248,129,238,150,120,8,254,131,121,65,103,231,251,161,245,229,205,68,62,55,184,15,230,42,131,35,29,144,61,13,130],[71,119,116,211,65,191,97,214,68,131,121,46,124,187,49,116,136,111,55,226,161,165,50,23,90,78,239,65,105,105,4,254],[63,165,237,52,38,178,7,66,163,171,219,145,242,193,143,195,43,20,201,206,249,107,131,81,98,79,63,172,134,157,23,113],[160,239,7,68,30,20,79,208,157,212,17,232,106,64,208,18,33,171,6,29,223,59,219,241,12,175,255,235,15,70,80,144],[156,208,148,110,79,128,156,35,25,47,150,226,52,232,166,110,244,24,115,65,98,0,67,79,196,235,100,85,198,224,123,171]], 99, 6,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 1, [19,39,123,76,143,188,242,135,56,119,135,134,25,248,131,251,83,101,75,240,75,26,249,170,222,190,33,153,113,72,54,236], 19, [40,172,1,159,13,43,121,110,66,94,84,206,61,17,180,124,139,111,86,97,218,226,88,175,119,244,219,139,0,8,20,202], [49,214,159,196,160,152,41,35,97,150,234,228,180,139,114,178,160,57,227,113,36,128,188,251,99,75,147,196,156,203,148,164], 0,{from: accounts[6]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 1, [19,39,123,76,143,188,242,135,56,119,135,134,25,248,131,251,83,101,75,240,75,26,249,170,222,190,33,153,113,72,54,236], 19, [40,172,1,159,13,43,121,110,66,94,84,206,61,17,180,124,139,111,86,97,218,226,88,175,119,244,219,139,0,8,20,202], [49,214,159,196,160,152,41,35,97,150,234,228,180,139,114,178,160,57,227,113,36,128,188,251,99,75,147,196,156,203,148,164], 0,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 1, [19,39,123,76,143,188,242,135,56,119,135,134,25,248,131,251,83,101,75,240,75,26,249,170,222,190,33,153,113,72,54,236], 19, [40,172,1,159,13,43,121,110,66,94,84,206,61,17,180,124,139,111,86,97,218,226,88,175,119,244,219,139,0,8,20,202], [49,214,159,196,160,152,41,35,97,150,234,228,180,139,114,178,160,57,227,113,36,128,188,251,99,75,147,196,156,203,148,164], 2,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[4], 20,{from: accounts[6]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[4], 20,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[1], accounts[4], 1001, [67,217,17,102,23,231,207,161,192,86,39,59,43,146,241,160,34,216,240,136,184,24,183,108,141,253,56,86,221,226,68,161], 18, [45,46,48,121,189,42,93,46,12,134,182,63,45,124,90,12,180,221,118,39,89,67,28,65,109,191,103,120,14,75,200,169], [215,91,152,23,59,121,33,177,136,72,64,173,117,53,18,84,229,215,192,83,6,84,229,165,200,102,170,97,233,138,245,94],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[9],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[9],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
