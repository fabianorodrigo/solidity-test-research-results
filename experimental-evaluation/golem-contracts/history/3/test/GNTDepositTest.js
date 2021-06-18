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
    contractGNTAllocation = await GNTAllocation.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[5],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[7],(await web3.eth.getBlockNumber())+570,(await web3.eth.getBlockNumber())+570+389,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[7],(await web3.eth.getBlockNumber())+570,(await web3.eth.getBlockNumber())+570+389,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[2],256,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[2],256,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[7],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[3],accounts[6],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[3],accounts[6],6,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[8],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[5],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[2], 17,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[1],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(21,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(21,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(0,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(0,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(159,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(159,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[5], 5, [237,22,45,0,176,133,115,241,61,186,107,214,80,223,33,18,175,167,178,120,253,108,153,254,127,62,23,56,143,138,108,148],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[6],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[1], 1336,{from: accounts[3]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[1], 1336,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[4], 20,{from: accounts[3]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[4], 20,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[7], 19, [223,75,33,158,224,105,68,32,134,202,217,16,31,48,54,28,46,252,110,239,168,198,255,10,159,127,86,50,88,23,173,234], 99, [1,4,200,33,210,225,20,248,209,137,15,58,190,7,238,212,120,74,248,17,187,46,192,14,95,106,221,220,199,122,55,83], [244,140,218,87,223,125,196,158,85,142,43,54,123,70,129,144,117,198,189,134,118,158,175,97,238,190,240,45,79,175,180,5], 0,{from: accounts[3]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[7], 19, [223,75,33,158,224,105,68,32,134,202,217,16,31,48,54,28,46,252,110,239,168,198,255,10,159,127,86,50,88,23,173,234], 99, [1,4,200,33,210,225,20,248,209,137,15,58,190,7,238,212,120,74,248,17,187,46,192,14,95,106,221,220,199,122,55,83], [244,140,218,87,223,125,196,158,85,142,43,54,123,70,129,144,117,198,189,134,118,158,175,97,238,190,240,45,79,175,180,5], 0,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[7], 19, [223,75,33,158,224,105,68,32,134,202,217,16,31,48,54,28,46,252,110,239,168,198,255,10,159,127,86,50,88,23,173,234], 99, [1,4,200,33,210,225,20,248,209,137,15,58,190,7,238,212,120,74,248,17,187,46,192,14,95,106,221,220,199,122,55,83], [244,140,218,87,223,125,196,158,85,142,43,54,123,70,129,144,117,198,189,134,118,158,175,97,238,190,240,45,79,175,180,5], 20,{from: accounts[3]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [15,9999,100], [[45,162,213,223,181,139,227,201,181,199,87,237,132,149,193,251,71,196,241,22,81,102,161,54,63,182,144,85,165,12,160,47],[211,245,236,69,69,70,110,184,141,52,123,168,41,157,52,209,151,20,190,55,8,156,228,18,145,41,32,19,131,9,43,78],[151,212,46,234,117,56,236,238,224,154,155,179,103,83,198,144,60,13,128,75,61,254,97,60,46,151,2,91,11,68,8,32]], [16,82,10], [[57,36,202,211,78,118,51,1,42,217,111,201,225,181,15,88,222,41,17,46,236,204,127,253,196,102,213,216,242,22,29,98],[69,76,253,2,246,137,106,205,96,38,231,116,175,178,142,183,139,91,255,135,65,141,218,46,27,137,148,253,181,242,121,166],[203,176,152,196,59,68,34,104,41,154,219,241,184,199,33,77,190,25,83,10,121,104,226,168,151,222,104,88,223,53,139,50]], [[108,105,89,19,230,161,114,134,255,20,112,64,13,232,141,59,162,20,212,81,58,41,210,43,129,229,171,96,211,135,167,32],[124,74,133,122,122,158,178,222,25,23,116,228,98,7,113,124,92,171,235,48,79,19,11,49,17,105,5,156,167,158,212,170],[134,245,147,220,231,243,172,186,241,216,200,162,24,82,207,51,205,45,147,17,124,106,152,138,169,118,79,190,243,153,160,49]], 17, 81,{from: accounts[3]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [15,9999,100], [[45,162,213,223,181,139,227,201,181,199,87,237,132,149,193,251,71,196,241,22,81,102,161,54,63,182,144,85,165,12,160,47],[211,245,236,69,69,70,110,184,141,52,123,168,41,157,52,209,151,20,190,55,8,156,228,18,145,41,32,19,131,9,43,78],[151,212,46,234,117,56,236,238,224,154,155,179,103,83,198,144,60,13,128,75,61,254,97,60,46,151,2,91,11,68,8,32]], [16,82,10], [[57,36,202,211,78,118,51,1,42,217,111,201,225,181,15,88,222,41,17,46,236,204,127,253,196,102,213,216,242,22,29,98],[69,76,253,2,246,137,106,205,96,38,231,116,175,178,142,183,139,91,255,135,65,141,218,46,27,137,148,253,181,242,121,166],[203,176,152,196,59,68,34,104,41,154,219,241,184,199,33,77,190,25,83,10,121,104,226,168,151,222,104,88,223,53,139,50]], [[108,105,89,19,230,161,114,134,255,20,112,64,13,232,141,59,162,20,212,81,58,41,210,43,129,229,171,96,211,135,167,32],[124,74,133,122,122,158,178,222,25,23,116,228,98,7,113,124,92,171,235,48,79,19,11,49,17,105,5,156,167,158,212,170],[134,245,147,220,231,243,172,186,241,216,200,162,24,82,207,51,205,45,147,17,124,106,152,138,169,118,79,190,243,153,160,49]], 17, 81,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [3,4,3,4], [[45,162,213,223,181,139,227,201,181,199,87,237,132,149,193,251,71,196,241,22,81,102,161,54,63,182,144,85,165,12,160,47],[211,245,236,69,69,70,110,184,141,52,123,168,41,157,52,209,151,20,190,55,8,156,228,18,145,41,32,19,131,9,43,78],[151,212,46,234,117,56,236,238,224,154,155,179,103,83,198,144,60,13,128,75,61,254,97,60,46,151,2,91,11,68,8,32]], [16,82,10], [[57,36,202,211,78,118,51,1,42,217,111,201,225,181,15,88,222,41,17,46,236,204,127,253,196,102,213,216,242,22,29,98],[69,76,253,2,246,137,106,205,96,38,231,116,175,178,142,183,139,91,255,135,65,141,218,46,27,137,148,253,181,242,121,166],[203,176,152,196,59,68,34,104,41,154,219,241,184,199,33,77,190,25,83,10,121,104,226,168,151,222,104,88,223,53,139,50]], [[108,105,89,19,230,161,114,134,255,20,112,64,13,232,141,59,162,20,212,81,58,41,210,43,129,229,171,96,211,135,167,32],[124,74,133,122,122,158,178,222,25,23,116,228,98,7,113,124,92,171,235,48,79,19,11,49,17,105,5,156,167,158,212,170],[134,245,147,220,231,243,172,186,241,216,200,162,24,82,207,51,205,45,147,17,124,106,152,138,169,118,79,190,243,153,160,49]], 17, 81,{from: accounts[3]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [160,159,9999,1336], [[45,162,213,223,181,139,227,201,181,199,87,237,132,149,193,251,71,196,241,22,81,102,161,54,63,182,144,85,165,12,160,47],[211,245,236,69,69,70,110,184,141,52,123,168,41,157,52,209,151,20,190,55,8,156,228,18,145,41,32,19,131,9,43,78],[151,212,46,234,117,56,236,238,224,154,155,179,103,83,198,144,60,13,128,75,61,254,97,60,46,151,2,91,11,68,8,32]], [16,82,10], [[57,36,202,211,78,118,51,1,42,217,111,201,225,181,15,88,222,41,17,46,236,204,127,253,196,102,213,216,242,22,29,98],[69,76,253,2,246,137,106,205,96,38,231,116,175,178,142,183,139,91,255,135,65,141,218,46,27,137,148,253,181,242,121,166],[203,176,152,196,59,68,34,104,41,154,219,241,184,199,33,77,190,25,83,10,121,104,226,168,151,222,104,88,223,53,139,50]], [[108,105,89,19,230,161,114,134,255,20,112,64,13,232,141,59,162,20,212,81,58,41,210,43,129,229,171,96,211,135,167,32],[124,74,133,122,122,158,178,222,25,23,116,228,98,7,113,124,92,171,235,48,79,19,11,49,17,105,5,156,167,158,212,170],[134,245,147,220,231,243,172,186,241,216,200,162,24,82,207,51,205,45,147,17,124,106,152,138,169,118,79,190,243,153,160,49]], 17, 81,{from: accounts[3]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [99,83,21,160], [[45,162,213,223,181,139,227,201,181,199,87,237,132,149,193,251,71,196,241,22,81,102,161,54,63,182,144,85,165,12,160,47],[211,245,236,69,69,70,110,184,141,52,123,168,41,157,52,209,151,20,190,55,8,156,228,18,145,41,32,19,131,9,43,78],[151,212,46,234,117,56,236,238,224,154,155,179,103,83,198,144,60,13,128,75,61,254,97,60,46,151,2,91,11,68,8,32]], [16,82,10], [[57,36,202,211,78,118,51,1,42,217,111,201,225,181,15,88,222,41,17,46,236,204,127,253,196,102,213,216,242,22,29,98],[69,76,253,2,246,137,106,205,96,38,231,116,175,178,142,183,139,91,255,135,65,141,218,46,27,137,148,253,181,242,121,166],[203,176,152,196,59,68,34,104,41,154,219,241,184,199,33,77,190,25,83,10,121,104,226,168,151,222,104,88,223,53,139,50]], [[108,105,89,19,230,161,114,134,255,20,112,64,13,232,141,59,162,20,212,81,58,41,210,43,129,229,171,96,211,135,167,32],[124,74,133,122,122,158,178,222,25,23,116,228,98,7,113,124,92,171,235,48,79,19,11,49,17,105,5,156,167,158,212,170],[134,245,147,220,231,243,172,186,241,216,200,162,24,82,207,51,205,45,147,17,124,106,152,138,169,118,79,190,243,153,160,49]], 17, 81,{from: accounts[3]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [1338,16,3,1337], [[45,162,213,223,181,139,227,201,181,199,87,237,132,149,193,251,71,196,241,22,81,102,161,54,63,182,144,85,165,12,160,47],[211,245,236,69,69,70,110,184,141,52,123,168,41,157,52,209,151,20,190,55,8,156,228,18,145,41,32,19,131,9,43,78],[151,212,46,234,117,56,236,238,224,154,155,179,103,83,198,144,60,13,128,75,61,254,97,60,46,151,2,91,11,68,8,32]], [16,82,10], [[57,36,202,211,78,118,51,1,42,217,111,201,225,181,15,88,222,41,17,46,236,204,127,253,196,102,213,216,242,22,29,98],[69,76,253,2,246,137,106,205,96,38,231,116,175,178,142,183,139,91,255,135,65,141,218,46,27,137,148,253,181,242,121,166],[203,176,152,196,59,68,34,104,41,154,219,241,184,199,33,77,190,25,83,10,121,104,226,168,151,222,104,88,223,53,139,50]], [[108,105,89,19,230,161,114,134,255,20,112,64,13,232,141,59,162,20,212,81,58,41,210,43,129,229,171,96,211,135,167,32],[124,74,133,122,122,158,178,222,25,23,116,228,98,7,113,124,92,171,235,48,79,19,11,49,17,105,5,156,167,158,212,170],[134,245,147,220,231,243,172,186,241,216,200,162,24,82,207,51,205,45,147,17,124,106,152,138,169,118,79,190,243,153,160,49]], 17, 81,{from: accounts[3]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 3, [212,50,229,139,73,213,44,171,18,69,109,242,79,177,103,111,164,99,52,28,174,125,222,12,18,205,29,125,77,16,126,250], 10, [32,22,153,137,95,203,27,255,102,166,129,148,220,131,210,78,163,247,252,208,69,45,237,181,56,2,63,14,249,154,34,229], [244,54,165,70,185,55,220,180,153,146,198,222,83,43,233,221,218,133,77,79,172,81,227,154,249,25,116,11,109,86,202,62], 1,{from: accounts[3]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 3, [212,50,229,139,73,213,44,171,18,69,109,242,79,177,103,111,164,99,52,28,174,125,222,12,18,205,29,125,77,16,126,250], 10, [32,22,153,137,95,203,27,255,102,166,129,148,220,131,210,78,163,247,252,208,69,45,237,181,56,2,63,14,249,154,34,229], [244,54,165,70,185,55,220,180,153,146,198,222,83,43,233,221,218,133,77,79,172,81,227,154,249,25,116,11,109,86,202,62], 1,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 3, [212,50,229,139,73,213,44,171,18,69,109,242,79,177,103,111,164,99,52,28,174,125,222,12,18,205,29,125,77,16,126,250], 10, [32,22,153,137,95,203,27,255,102,166,129,148,220,131,210,78,163,247,252,208,69,45,237,181,56,2,63,14,249,154,34,229], [244,54,165,70,185,55,220,180,153,146,198,222,83,43,233,221,218,133,77,79,172,81,227,154,249,25,116,11,109,86,202,62], 4,{from: accounts[3]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[2], 6,{from: accounts[3]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[2], 6,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[8], accounts[8], 0, [213,172,228,99,16,159,26,172,11,247,130,224,82,188,245,237,65,14,36,0,57,142,194,137,19,137,244,90,16,65,16,207], 4, [241,69,126,90,238,186,162,205,99,63,239,216,166,192,144,138,212,202,18,53,50,75,51,161,110,226,43,151,213,163,156,65], [81,170,2,145,52,148,102,192,154,149,203,31,158,246,199,44,213,88,40,120,71,213,80,158,93,249,62,232,245,14,213,232],{from: accounts[0]});
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
