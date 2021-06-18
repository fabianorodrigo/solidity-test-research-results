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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[4],accounts[1],(await web3.eth.getBlockNumber())+542,(await web3.eth.getBlockNumber())+542+535,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[4],accounts[1],(await web3.eth.getBlockNumber())+542,(await web3.eth.getBlockNumber())+542+535,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[1],19,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[1],19,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[5],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[2],160,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[2],160,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[8],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[7],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[4],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[3],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[3], 18,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[4],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[4],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(10,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(10,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(18,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(18,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(15,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(15,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[3], 101, [47,188,22,0,108,68,90,201,37,41,67,123,212,1,55,213,200,90,226,53,160,163,156,233,41,72,177,10,123,215,6,142],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[7],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[5], 9999,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[5], 9999,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[9], 2,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[9], 2,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[3], 1338, [181,138,134,13,59,142,187,238,232,56,196,68,60,149,200,37,11,251,67,62,40,96,126,193,236,13,211,52,133,123,231,235], 83, [58,141,134,51,10,174,51,68,129,212,151,60,246,13,35,69,180,51,123,108,245,75,223,38,74,96,17,115,214,166,210,169], [141,44,197,106,98,59,145,55,128,60,250,104,60,43,142,252,160,76,12,15,96,239,60,109,187,25,99,35,75,214,41,157], 256,{from: accounts[8]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[3], 1338, [181,138,134,13,59,142,187,238,232,56,196,68,60,149,200,37,11,251,67,62,40,96,126,193,236,13,211,52,133,123,231,235], 83, [58,141,134,51,10,174,51,68,129,212,151,60,246,13,35,69,180,51,123,108,245,75,223,38,74,96,17,115,214,166,210,169], [141,44,197,106,98,59,145,55,128,60,250,104,60,43,142,252,160,76,12,15,96,239,60,109,187,25,99,35,75,214,41,157], 256,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[3], 1338, [181,138,134,13,59,142,187,238,232,56,196,68,60,149,200,37,11,251,67,62,40,96,126,193,236,13,211,52,133,123,231,235], 83, [58,141,134,51,10,174,51,68,129,212,151,60,246,13,35,69,180,51,123,108,245,75,223,38,74,96,17,115,214,166,210,169], [141,44,197,106,98,59,145,55,128,60,250,104,60,43,142,252,160,76,12,15,96,239,60,109,187,25,99,35,75,214,41,157], 1339,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [100,1338,2,0,101,3,999,255], [[245,120,254,169,58,52,19,201,191,52,208,129,19,159,246,101,99,174,27,97,228,204,160,44,78,11,85,66,98,195,28,130],[163,101,244,21,250,85,188,161,112,136,30,84,81,179,159,13,204,188,88,22,116,197,160,217,8,254,29,15,183,73,84,214],[254,183,161,190,18,191,253,181,248,79,132,226,27,168,1,147,51,255,6,91,24,199,46,81,34,42,129,156,50,122,233,143],[236,106,142,206,171,36,215,67,254,115,12,70,114,108,102,230,211,102,109,240,160,229,158,54,62,161,184,101,59,191,115,64],[198,117,29,86,222,56,81,100,6,101,13,121,102,208,251,102,60,55,192,57,171,44,7,91,62,203,40,116,175,136,212,63],[42,48,48,59,124,249,229,29,255,130,225,47,224,210,112,161,188,38,200,83,120,176,77,121,189,246,166,247,249,11,31,0],[235,100,1,208,2,85,219,11,237,195,213,11,69,87,101,35,211,217,17,244,153,179,235,78,182,65,254,107,115,97,239,112],[205,93,3,47,129,28,106,89,12,133,20,73,107,188,69,60,26,222,221,3,68,87,66,83,236,130,188,173,220,197,94,149]], [161,15,100,18,6,1,10,82], [[121,147,192,139,112,71,65,174,227,25,20,120,39,180,0,75,5,163,75,4,174,251,153,89,227,228,142,148,3,195,163,103],[187,104,246,57,148,254,19,48,185,55,247,148,130,61,202,225,3,84,239,77,28,249,52,27,250,96,220,19,64,9,100,102],[117,158,111,205,218,213,61,42,76,103,244,151,98,12,109,115,41,55,61,23,7,143,32,61,255,163,174,62,71,53,221,135],[120,190,188,80,197,13,119,99,81,214,1,222,166,148,54,144,186,70,207,51,184,78,231,93,155,5,201,246,0,246,38,251],[227,161,29,66,20,11,182,103,61,19,62,192,125,228,58,86,41,98,143,182,36,176,100,13,148,64,16,13,76,11,165,42],[97,46,183,14,87,50,200,238,32,193,41,154,226,130,209,120,34,115,16,170,116,176,221,63,4,51,21,52,230,247,151,44],[133,190,25,181,191,165,251,143,18,122,156,161,191,124,31,89,58,131,199,60,59,9,52,97,166,14,226,220,5,28,21,157],[112,97,241,85,25,19,158,223,210,221,101,97,248,154,234,223,141,125,86,134,87,239,238,173,83,203,172,46,80,157,4,200]], [[57,18,196,206,50,150,56,222,103,247,39,150,37,154,136,156,87,168,178,84,12,2,213,43,153,213,149,61,176,56,157,188],[247,122,146,82,99,175,197,233,58,145,41,189,80,64,82,222,71,154,190,251,31,109,124,209,200,189,7,185,101,166,227,218],[168,204,198,201,66,188,76,149,106,222,96,51,127,207,252,59,45,193,135,68,69,122,174,191,216,249,152,145,49,162,48,191],[237,49,80,115,201,62,56,74,8,246,46,238,149,69,148,193,50,86,90,64,204,124,99,154,163,183,203,32,60,22,178,109],[76,78,87,167,24,71,76,57,171,169,250,198,208,117,219,63,227,243,121,52,206,18,238,207,3,219,117,228,95,202,20,75],[130,237,158,245,232,143,221,85,156,80,77,155,113,80,243,198,88,31,214,21,17,72,184,217,255,104,59,198,161,225,16,225],[205,173,181,190,111,119,81,178,148,169,166,197,228,224,43,12,125,40,142,179,189,124,199,25,116,141,54,190,44,147,226,181],[68,100,1,141,129,100,145,162,125,75,134,12,0,174,77,252,126,118,143,165,235,143,205,162,112,29,66,144,241,144,39,153]], 20, 9,{from: accounts[8]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [100,1338,2,0,101,3,999,255], [[245,120,254,169,58,52,19,201,191,52,208,129,19,159,246,101,99,174,27,97,228,204,160,44,78,11,85,66,98,195,28,130],[163,101,244,21,250,85,188,161,112,136,30,84,81,179,159,13,204,188,88,22,116,197,160,217,8,254,29,15,183,73,84,214],[254,183,161,190,18,191,253,181,248,79,132,226,27,168,1,147,51,255,6,91,24,199,46,81,34,42,129,156,50,122,233,143],[236,106,142,206,171,36,215,67,254,115,12,70,114,108,102,230,211,102,109,240,160,229,158,54,62,161,184,101,59,191,115,64],[198,117,29,86,222,56,81,100,6,101,13,121,102,208,251,102,60,55,192,57,171,44,7,91,62,203,40,116,175,136,212,63],[42,48,48,59,124,249,229,29,255,130,225,47,224,210,112,161,188,38,200,83,120,176,77,121,189,246,166,247,249,11,31,0],[235,100,1,208,2,85,219,11,237,195,213,11,69,87,101,35,211,217,17,244,153,179,235,78,182,65,254,107,115,97,239,112],[205,93,3,47,129,28,106,89,12,133,20,73,107,188,69,60,26,222,221,3,68,87,66,83,236,130,188,173,220,197,94,149]], [161,15,100,18,6,1,10,82], [[121,147,192,139,112,71,65,174,227,25,20,120,39,180,0,75,5,163,75,4,174,251,153,89,227,228,142,148,3,195,163,103],[187,104,246,57,148,254,19,48,185,55,247,148,130,61,202,225,3,84,239,77,28,249,52,27,250,96,220,19,64,9,100,102],[117,158,111,205,218,213,61,42,76,103,244,151,98,12,109,115,41,55,61,23,7,143,32,61,255,163,174,62,71,53,221,135],[120,190,188,80,197,13,119,99,81,214,1,222,166,148,54,144,186,70,207,51,184,78,231,93,155,5,201,246,0,246,38,251],[227,161,29,66,20,11,182,103,61,19,62,192,125,228,58,86,41,98,143,182,36,176,100,13,148,64,16,13,76,11,165,42],[97,46,183,14,87,50,200,238,32,193,41,154,226,130,209,120,34,115,16,170,116,176,221,63,4,51,21,52,230,247,151,44],[133,190,25,181,191,165,251,143,18,122,156,161,191,124,31,89,58,131,199,60,59,9,52,97,166,14,226,220,5,28,21,157],[112,97,241,85,25,19,158,223,210,221,101,97,248,154,234,223,141,125,86,134,87,239,238,173,83,203,172,46,80,157,4,200]], [[57,18,196,206,50,150,56,222,103,247,39,150,37,154,136,156,87,168,178,84,12,2,213,43,153,213,149,61,176,56,157,188],[247,122,146,82,99,175,197,233,58,145,41,189,80,64,82,222,71,154,190,251,31,109,124,209,200,189,7,185,101,166,227,218],[168,204,198,201,66,188,76,149,106,222,96,51,127,207,252,59,45,193,135,68,69,122,174,191,216,249,152,145,49,162,48,191],[237,49,80,115,201,62,56,74,8,246,46,238,149,69,148,193,50,86,90,64,204,124,99,154,163,183,203,32,60,22,178,109],[76,78,87,167,24,71,76,57,171,169,250,198,208,117,219,63,227,243,121,52,206,18,238,207,3,219,117,228,95,202,20,75],[130,237,158,245,232,143,221,85,156,80,77,155,113,80,243,198,88,31,214,21,17,72,184,217,255,104,59,198,161,225,16,225],[205,173,181,190,111,119,81,178,148,169,166,197,228,224,43,12,125,40,142,179,189,124,199,25,116,141,54,190,44,147,226,181],[68,100,1,141,129,100,145,162,125,75,134,12,0,174,77,252,126,118,143,165,235,143,205,162,112,29,66,144,241,144,39,153]], 20, 9,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [4,5,1336,17,99,10,257,161,999], [[245,120,254,169,58,52,19,201,191,52,208,129,19,159,246,101,99,174,27,97,228,204,160,44,78,11,85,66,98,195,28,130],[163,101,244,21,250,85,188,161,112,136,30,84,81,179,159,13,204,188,88,22,116,197,160,217,8,254,29,15,183,73,84,214],[254,183,161,190,18,191,253,181,248,79,132,226,27,168,1,147,51,255,6,91,24,199,46,81,34,42,129,156,50,122,233,143],[236,106,142,206,171,36,215,67,254,115,12,70,114,108,102,230,211,102,109,240,160,229,158,54,62,161,184,101,59,191,115,64],[198,117,29,86,222,56,81,100,6,101,13,121,102,208,251,102,60,55,192,57,171,44,7,91,62,203,40,116,175,136,212,63],[42,48,48,59,124,249,229,29,255,130,225,47,224,210,112,161,188,38,200,83,120,176,77,121,189,246,166,247,249,11,31,0],[235,100,1,208,2,85,219,11,237,195,213,11,69,87,101,35,211,217,17,244,153,179,235,78,182,65,254,107,115,97,239,112],[205,93,3,47,129,28,106,89,12,133,20,73,107,188,69,60,26,222,221,3,68,87,66,83,236,130,188,173,220,197,94,149]], [161,15,100,18,6,1,10,82], [[121,147,192,139,112,71,65,174,227,25,20,120,39,180,0,75,5,163,75,4,174,251,153,89,227,228,142,148,3,195,163,103],[187,104,246,57,148,254,19,48,185,55,247,148,130,61,202,225,3,84,239,77,28,249,52,27,250,96,220,19,64,9,100,102],[117,158,111,205,218,213,61,42,76,103,244,151,98,12,109,115,41,55,61,23,7,143,32,61,255,163,174,62,71,53,221,135],[120,190,188,80,197,13,119,99,81,214,1,222,166,148,54,144,186,70,207,51,184,78,231,93,155,5,201,246,0,246,38,251],[227,161,29,66,20,11,182,103,61,19,62,192,125,228,58,86,41,98,143,182,36,176,100,13,148,64,16,13,76,11,165,42],[97,46,183,14,87,50,200,238,32,193,41,154,226,130,209,120,34,115,16,170,116,176,221,63,4,51,21,52,230,247,151,44],[133,190,25,181,191,165,251,143,18,122,156,161,191,124,31,89,58,131,199,60,59,9,52,97,166,14,226,220,5,28,21,157],[112,97,241,85,25,19,158,223,210,221,101,97,248,154,234,223,141,125,86,134,87,239,238,173,83,203,172,46,80,157,4,200]], [[57,18,196,206,50,150,56,222,103,247,39,150,37,154,136,156,87,168,178,84,12,2,213,43,153,213,149,61,176,56,157,188],[247,122,146,82,99,175,197,233,58,145,41,189,80,64,82,222,71,154,190,251,31,109,124,209,200,189,7,185,101,166,227,218],[168,204,198,201,66,188,76,149,106,222,96,51,127,207,252,59,45,193,135,68,69,122,174,191,216,249,152,145,49,162,48,191],[237,49,80,115,201,62,56,74,8,246,46,238,149,69,148,193,50,86,90,64,204,124,99,154,163,183,203,32,60,22,178,109],[76,78,87,167,24,71,76,57,171,169,250,198,208,117,219,63,227,243,121,52,206,18,238,207,3,219,117,228,95,202,20,75],[130,237,158,245,232,143,221,85,156,80,77,155,113,80,243,198,88,31,214,21,17,72,184,217,255,104,59,198,161,225,16,225],[205,173,181,190,111,119,81,178,148,169,166,197,228,224,43,12,125,40,142,179,189,124,199,25,116,141,54,190,44,147,226,181],[68,100,1,141,129,100,145,162,125,75,134,12,0,174,77,252,126,118,143,165,235,143,205,162,112,29,66,144,241,144,39,153]], 20, 9,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [10000,6,83,1001,255,101,10,3,1338], [[245,120,254,169,58,52,19,201,191,52,208,129,19,159,246,101,99,174,27,97,228,204,160,44,78,11,85,66,98,195,28,130],[163,101,244,21,250,85,188,161,112,136,30,84,81,179,159,13,204,188,88,22,116,197,160,217,8,254,29,15,183,73,84,214],[254,183,161,190,18,191,253,181,248,79,132,226,27,168,1,147,51,255,6,91,24,199,46,81,34,42,129,156,50,122,233,143],[236,106,142,206,171,36,215,67,254,115,12,70,114,108,102,230,211,102,109,240,160,229,158,54,62,161,184,101,59,191,115,64],[198,117,29,86,222,56,81,100,6,101,13,121,102,208,251,102,60,55,192,57,171,44,7,91,62,203,40,116,175,136,212,63],[42,48,48,59,124,249,229,29,255,130,225,47,224,210,112,161,188,38,200,83,120,176,77,121,189,246,166,247,249,11,31,0],[235,100,1,208,2,85,219,11,237,195,213,11,69,87,101,35,211,217,17,244,153,179,235,78,182,65,254,107,115,97,239,112],[205,93,3,47,129,28,106,89,12,133,20,73,107,188,69,60,26,222,221,3,68,87,66,83,236,130,188,173,220,197,94,149]], [161,15,100,18,6,1,10,82], [[121,147,192,139,112,71,65,174,227,25,20,120,39,180,0,75,5,163,75,4,174,251,153,89,227,228,142,148,3,195,163,103],[187,104,246,57,148,254,19,48,185,55,247,148,130,61,202,225,3,84,239,77,28,249,52,27,250,96,220,19,64,9,100,102],[117,158,111,205,218,213,61,42,76,103,244,151,98,12,109,115,41,55,61,23,7,143,32,61,255,163,174,62,71,53,221,135],[120,190,188,80,197,13,119,99,81,214,1,222,166,148,54,144,186,70,207,51,184,78,231,93,155,5,201,246,0,246,38,251],[227,161,29,66,20,11,182,103,61,19,62,192,125,228,58,86,41,98,143,182,36,176,100,13,148,64,16,13,76,11,165,42],[97,46,183,14,87,50,200,238,32,193,41,154,226,130,209,120,34,115,16,170,116,176,221,63,4,51,21,52,230,247,151,44],[133,190,25,181,191,165,251,143,18,122,156,161,191,124,31,89,58,131,199,60,59,9,52,97,166,14,226,220,5,28,21,157],[112,97,241,85,25,19,158,223,210,221,101,97,248,154,234,223,141,125,86,134,87,239,238,173,83,203,172,46,80,157,4,200]], [[57,18,196,206,50,150,56,222,103,247,39,150,37,154,136,156,87,168,178,84,12,2,213,43,153,213,149,61,176,56,157,188],[247,122,146,82,99,175,197,233,58,145,41,189,80,64,82,222,71,154,190,251,31,109,124,209,200,189,7,185,101,166,227,218],[168,204,198,201,66,188,76,149,106,222,96,51,127,207,252,59,45,193,135,68,69,122,174,191,216,249,152,145,49,162,48,191],[237,49,80,115,201,62,56,74,8,246,46,238,149,69,148,193,50,86,90,64,204,124,99,154,163,183,203,32,60,22,178,109],[76,78,87,167,24,71,76,57,171,169,250,198,208,117,219,63,227,243,121,52,206,18,238,207,3,219,117,228,95,202,20,75],[130,237,158,245,232,143,221,85,156,80,77,155,113,80,243,198,88,31,214,21,17,72,184,217,255,104,59,198,161,225,16,225],[205,173,181,190,111,119,81,178,148,169,166,197,228,224,43,12,125,40,142,179,189,124,199,25,116,141,54,190,44,147,226,181],[68,100,1,141,129,100,145,162,125,75,134,12,0,174,77,252,126,118,143,165,235,143,205,162,112,29,66,144,241,144,39,153]], 20, 9,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [19,256,14,20,5,14,101,100,255], [[245,120,254,169,58,52,19,201,191,52,208,129,19,159,246,101,99,174,27,97,228,204,160,44,78,11,85,66,98,195,28,130],[163,101,244,21,250,85,188,161,112,136,30,84,81,179,159,13,204,188,88,22,116,197,160,217,8,254,29,15,183,73,84,214],[254,183,161,190,18,191,253,181,248,79,132,226,27,168,1,147,51,255,6,91,24,199,46,81,34,42,129,156,50,122,233,143],[236,106,142,206,171,36,215,67,254,115,12,70,114,108,102,230,211,102,109,240,160,229,158,54,62,161,184,101,59,191,115,64],[198,117,29,86,222,56,81,100,6,101,13,121,102,208,251,102,60,55,192,57,171,44,7,91,62,203,40,116,175,136,212,63],[42,48,48,59,124,249,229,29,255,130,225,47,224,210,112,161,188,38,200,83,120,176,77,121,189,246,166,247,249,11,31,0],[235,100,1,208,2,85,219,11,237,195,213,11,69,87,101,35,211,217,17,244,153,179,235,78,182,65,254,107,115,97,239,112],[205,93,3,47,129,28,106,89,12,133,20,73,107,188,69,60,26,222,221,3,68,87,66,83,236,130,188,173,220,197,94,149]], [161,15,100,18,6,1,10,82], [[121,147,192,139,112,71,65,174,227,25,20,120,39,180,0,75,5,163,75,4,174,251,153,89,227,228,142,148,3,195,163,103],[187,104,246,57,148,254,19,48,185,55,247,148,130,61,202,225,3,84,239,77,28,249,52,27,250,96,220,19,64,9,100,102],[117,158,111,205,218,213,61,42,76,103,244,151,98,12,109,115,41,55,61,23,7,143,32,61,255,163,174,62,71,53,221,135],[120,190,188,80,197,13,119,99,81,214,1,222,166,148,54,144,186,70,207,51,184,78,231,93,155,5,201,246,0,246,38,251],[227,161,29,66,20,11,182,103,61,19,62,192,125,228,58,86,41,98,143,182,36,176,100,13,148,64,16,13,76,11,165,42],[97,46,183,14,87,50,200,238,32,193,41,154,226,130,209,120,34,115,16,170,116,176,221,63,4,51,21,52,230,247,151,44],[133,190,25,181,191,165,251,143,18,122,156,161,191,124,31,89,58,131,199,60,59,9,52,97,166,14,226,220,5,28,21,157],[112,97,241,85,25,19,158,223,210,221,101,97,248,154,234,223,141,125,86,134,87,239,238,173,83,203,172,46,80,157,4,200]], [[57,18,196,206,50,150,56,222,103,247,39,150,37,154,136,156,87,168,178,84,12,2,213,43,153,213,149,61,176,56,157,188],[247,122,146,82,99,175,197,233,58,145,41,189,80,64,82,222,71,154,190,251,31,109,124,209,200,189,7,185,101,166,227,218],[168,204,198,201,66,188,76,149,106,222,96,51,127,207,252,59,45,193,135,68,69,122,174,191,216,249,152,145,49,162,48,191],[237,49,80,115,201,62,56,74,8,246,46,238,149,69,148,193,50,86,90,64,204,124,99,154,163,183,203,32,60,22,178,109],[76,78,87,167,24,71,76,57,171,169,250,198,208,117,219,63,227,243,121,52,206,18,238,207,3,219,117,228,95,202,20,75],[130,237,158,245,232,143,221,85,156,80,77,155,113,80,243,198,88,31,214,21,17,72,184,217,255,104,59,198,161,225,16,225],[205,173,181,190,111,119,81,178,148,169,166,197,228,224,43,12,125,40,142,179,189,124,199,25,116,141,54,190,44,147,226,181],[68,100,1,141,129,100,145,162,125,75,134,12,0,174,77,252,126,118,143,165,235,143,205,162,112,29,66,144,241,144,39,153]], 20, 9,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[9], accounts[5], [10001,10000,1337,17,82,4,1000,10000,255], [[245,120,254,169,58,52,19,201,191,52,208,129,19,159,246,101,99,174,27,97,228,204,160,44,78,11,85,66,98,195,28,130],[163,101,244,21,250,85,188,161,112,136,30,84,81,179,159,13,204,188,88,22,116,197,160,217,8,254,29,15,183,73,84,214],[254,183,161,190,18,191,253,181,248,79,132,226,27,168,1,147,51,255,6,91,24,199,46,81,34,42,129,156,50,122,233,143],[236,106,142,206,171,36,215,67,254,115,12,70,114,108,102,230,211,102,109,240,160,229,158,54,62,161,184,101,59,191,115,64],[198,117,29,86,222,56,81,100,6,101,13,121,102,208,251,102,60,55,192,57,171,44,7,91,62,203,40,116,175,136,212,63],[42,48,48,59,124,249,229,29,255,130,225,47,224,210,112,161,188,38,200,83,120,176,77,121,189,246,166,247,249,11,31,0],[235,100,1,208,2,85,219,11,237,195,213,11,69,87,101,35,211,217,17,244,153,179,235,78,182,65,254,107,115,97,239,112],[205,93,3,47,129,28,106,89,12,133,20,73,107,188,69,60,26,222,221,3,68,87,66,83,236,130,188,173,220,197,94,149]], [161,15,100,18,6,1,10,82], [[121,147,192,139,112,71,65,174,227,25,20,120,39,180,0,75,5,163,75,4,174,251,153,89,227,228,142,148,3,195,163,103],[187,104,246,57,148,254,19,48,185,55,247,148,130,61,202,225,3,84,239,77,28,249,52,27,250,96,220,19,64,9,100,102],[117,158,111,205,218,213,61,42,76,103,244,151,98,12,109,115,41,55,61,23,7,143,32,61,255,163,174,62,71,53,221,135],[120,190,188,80,197,13,119,99,81,214,1,222,166,148,54,144,186,70,207,51,184,78,231,93,155,5,201,246,0,246,38,251],[227,161,29,66,20,11,182,103,61,19,62,192,125,228,58,86,41,98,143,182,36,176,100,13,148,64,16,13,76,11,165,42],[97,46,183,14,87,50,200,238,32,193,41,154,226,130,209,120,34,115,16,170,116,176,221,63,4,51,21,52,230,247,151,44],[133,190,25,181,191,165,251,143,18,122,156,161,191,124,31,89,58,131,199,60,59,9,52,97,166,14,226,220,5,28,21,157],[112,97,241,85,25,19,158,223,210,221,101,97,248,154,234,223,141,125,86,134,87,239,238,173,83,203,172,46,80,157,4,200]], [[57,18,196,206,50,150,56,222,103,247,39,150,37,154,136,156,87,168,178,84,12,2,213,43,153,213,149,61,176,56,157,188],[247,122,146,82,99,175,197,233,58,145,41,189,80,64,82,222,71,154,190,251,31,109,124,209,200,189,7,185,101,166,227,218],[168,204,198,201,66,188,76,149,106,222,96,51,127,207,252,59,45,193,135,68,69,122,174,191,216,249,152,145,49,162,48,191],[237,49,80,115,201,62,56,74,8,246,46,238,149,69,148,193,50,86,90,64,204,124,99,154,163,183,203,32,60,22,178,109],[76,78,87,167,24,71,76,57,171,169,250,198,208,117,219,63,227,243,121,52,206,18,238,207,3,219,117,228,95,202,20,75],[130,237,158,245,232,143,221,85,156,80,77,155,113,80,243,198,88,31,214,21,17,72,184,217,255,104,59,198,161,225,16,225],[205,173,181,190,111,119,81,178,148,169,166,197,228,224,43,12,125,40,142,179,189,124,199,25,116,141,54,190,44,147,226,181],[68,100,1,141,129,100,145,162,125,75,134,12,0,174,77,252,126,118,143,165,235,143,205,162,112,29,66,144,241,144,39,153]], 20, 9,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 18, [43,170,220,200,244,247,201,147,167,115,146,48,87,190,46,39,77,214,201,212,101,225,105,43,57,216,57,74,35,28,151,64], 1, [219,183,179,46,29,77,16,180,11,236,94,201,237,99,220,141,103,205,136,143,2,45,126,75,168,163,97,217,206,214,160,7], [228,235,5,59,87,74,4,70,234,126,92,32,228,38,122,65,219,138,191,175,74,23,64,193,188,245,25,66,200,51,243,165], 3,{from: accounts[8]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 18, [43,170,220,200,244,247,201,147,167,115,146,48,87,190,46,39,77,214,201,212,101,225,105,43,57,216,57,74,35,28,151,64], 1, [219,183,179,46,29,77,16,180,11,236,94,201,237,99,220,141,103,205,136,143,2,45,126,75,168,163,97,217,206,214,160,7], [228,235,5,59,87,74,4,70,234,126,92,32,228,38,122,65,219,138,191,175,74,23,64,193,188,245,25,66,200,51,243,165], 3,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 18, [43,170,220,200,244,247,201,147,167,115,146,48,87,190,46,39,77,214,201,212,101,225,105,43,57,216,57,74,35,28,151,64], 1, [219,183,179,46,29,77,16,180,11,236,94,201,237,99,220,141,103,205,136,143,2,45,126,75,168,163,97,217,206,214,160,7], [228,235,5,59,87,74,4,70,234,126,92,32,228,38,122,65,219,138,191,175,74,23,64,193,188,245,25,66,200,51,243,165], 19,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[9], 999,{from: accounts[8]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[9], 999,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[9], accounts[3], 1337, [244,162,137,230,5,100,35,18,216,80,165,139,88,47,167,141,124,155,1,193,165,13,47,140,196,102,74,239,177,144,171,233], 100, [247,106,35,88,39,28,195,44,211,234,168,17,60,226,15,165,52,92,142,84,147,105,77,152,124,95,220,147,171,246,58,66], [125,187,167,46,231,135,89,81,94,122,242,206,143,78,24,193,35,219,105,103,50,53,41,240,200,51,178,191,3,60,11,217],{from: accounts[0]});
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
