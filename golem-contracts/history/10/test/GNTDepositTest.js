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
    contractGNTAllocation = await GNTAllocation.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[9],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+623,(await web3.eth.getBlockNumber())+623+371,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+623,(await web3.eth.getBlockNumber())+623+371,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[6],1000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[6],1000,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[9],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[5],9,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[5],9,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[5],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[3], 1001,{from: accounts[0]});
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
    let result = await contractGNTDeposit.setMaximumDepositsTotal(2,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(2,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(82,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(82,{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.onTokenReceived(accounts[1], 11, [165,169,188,164,105,235,64,242,127,251,23,185,178,140,114,16,154,137,225,167,37,160,204,250,249,125,117,197,213,55,222,112],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[9],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[7], 100,{from: accounts[6]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[7], 100,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[5], 1,{from: accounts[6]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[5], 1,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[9], 100, [133,180,101,221,18,69,249,240,130,210,187,104,180,106,43,161,183,206,131,167,167,180,166,186,57,33,100,203,231,92,83,120], 83, [84,102,218,38,61,225,66,156,92,75,122,158,197,50,197,177,238,48,189,149,160,107,18,144,19,67,250,146,208,107,4,188], [139,214,46,114,0,106,37,32,1,90,56,179,18,16,142,88,244,35,160,201,95,48,114,207,135,229,1,15,205,137,152,104], 1,{from: accounts[6]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[9], 100, [133,180,101,221,18,69,249,240,130,210,187,104,180,106,43,161,183,206,131,167,167,180,166,186,57,33,100,203,231,92,83,120], 83, [84,102,218,38,61,225,66,156,92,75,122,158,197,50,197,177,238,48,189,149,160,107,18,144,19,67,250,146,208,107,4,188], [139,214,46,114,0,106,37,32,1,90,56,179,18,16,142,88,244,35,160,201,95,48,114,207,135,229,1,15,205,137,152,104], 1,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[9], 100, [133,180,101,221,18,69,249,240,130,210,187,104,180,106,43,161,183,206,131,167,167,180,166,186,57,33,100,203,231,92,83,120], 83, [84,102,218,38,61,225,66,156,92,75,122,158,197,50,197,177,238,48,189,149,160,107,18,144,19,67,250,146,208,107,4,188], [139,214,46,114,0,106,37,32,1,90,56,179,18,16,142,88,244,35,160,201,95,48,114,207,135,229,1,15,205,137,152,104], 101,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [10000,1337,82,10000,16,159,1000], [[46,193,231,140,215,131,127,141,198,138,150,153,192,193,220,102,140,132,173,139,211,181,91,17,193,32,190,174,20,50,111,247],[197,166,46,52,39,12,41,228,202,21,197,210,53,234,12,159,182,93,33,184,127,75,208,211,53,133,216,8,22,38,24,243],[186,42,57,155,46,184,117,77,224,10,197,53,128,181,202,147,89,148,28,236,233,105,89,13,142,123,91,173,33,202,80,2],[136,6,172,195,7,206,184,210,6,136,137,72,32,218,185,142,220,26,107,193,142,183,124,39,102,162,44,104,96,163,106,235],[202,77,18,164,170,255,46,36,8,198,69,220,89,94,175,84,8,188,97,201,210,16,175,112,143,26,47,128,2,71,97,162],[8,139,36,179,219,67,251,67,160,190,163,215,105,152,117,211,92,29,100,173,12,86,151,61,188,140,249,220,180,31,240,30],[207,252,132,107,4,159,74,88,73,208,205,121,66,28,149,55,108,36,236,91,34,94,40,185,9,218,158,226,61,5,188,110]], [159,10,17,3,20,4,6], [[49,186,126,112,37,17,15,111,96,107,69,40,228,148,179,33,22,179,187,40,201,19,30,58,217,190,205,128,254,32,61,27],[72,74,192,184,194,158,15,140,84,255,99,129,158,151,84,66,116,128,242,237,202,152,124,44,124,24,248,110,241,71,63,193],[13,90,24,59,186,152,119,247,30,59,106,147,231,196,101,31,241,105,129,100,52,53,65,208,133,116,240,30,48,223,27,58],[155,66,164,4,158,204,141,98,218,25,70,159,23,222,175,226,73,222,199,60,213,77,10,108,249,111,204,141,246,41,174,181],[72,252,153,145,134,255,59,240,223,218,23,151,46,71,93,107,242,28,67,92,35,166,216,155,84,125,200,90,145,185,136,194],[50,49,49,202,115,74,110,142,124,86,38,159,131,141,104,228,10,253,118,18,190,54,21,35,67,199,234,184,250,208,122,29],[199,85,52,87,103,117,174,16,80,149,205,95,181,211,40,17,245,195,216,231,40,228,123,185,138,216,121,27,65,232,196,50]], [[89,253,198,90,65,3,196,42,85,137,197,35,228,24,224,86,122,252,123,195,118,70,125,92,218,213,8,230,64,187,120,81],[230,122,23,39,50,154,222,19,126,54,149,18,77,161,222,76,120,216,53,250,33,238,233,72,73,183,156,79,139,48,168,198],[71,83,85,129,142,21,93,25,188,197,7,144,37,190,204,5,74,144,27,179,231,250,166,61,182,136,247,24,173,6,31,110],[78,160,89,76,252,106,145,119,93,169,215,20,135,202,1,151,216,154,70,146,83,73,244,157,3,70,25,123,176,106,13,49],[43,177,67,84,193,94,81,83,95,49,173,200,184,185,86,125,193,162,159,73,91,148,210,45,22,126,29,181,49,232,254,247],[141,193,87,131,68,175,103,70,123,28,131,32,21,12,7,242,125,190,100,128,70,201,130,158,238,86,171,46,2,121,93,57],[92,159,219,66,141,211,3,67,180,62,88,38,73,84,171,146,94,228,254,254,106,229,239,78,190,200,179,104,87,240,225,141]], 5, 83,{from: accounts[6]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [10000,1337,82,10000,16,159,1000], [[46,193,231,140,215,131,127,141,198,138,150,153,192,193,220,102,140,132,173,139,211,181,91,17,193,32,190,174,20,50,111,247],[197,166,46,52,39,12,41,228,202,21,197,210,53,234,12,159,182,93,33,184,127,75,208,211,53,133,216,8,22,38,24,243],[186,42,57,155,46,184,117,77,224,10,197,53,128,181,202,147,89,148,28,236,233,105,89,13,142,123,91,173,33,202,80,2],[136,6,172,195,7,206,184,210,6,136,137,72,32,218,185,142,220,26,107,193,142,183,124,39,102,162,44,104,96,163,106,235],[202,77,18,164,170,255,46,36,8,198,69,220,89,94,175,84,8,188,97,201,210,16,175,112,143,26,47,128,2,71,97,162],[8,139,36,179,219,67,251,67,160,190,163,215,105,152,117,211,92,29,100,173,12,86,151,61,188,140,249,220,180,31,240,30],[207,252,132,107,4,159,74,88,73,208,205,121,66,28,149,55,108,36,236,91,34,94,40,185,9,218,158,226,61,5,188,110]], [159,10,17,3,20,4,6], [[49,186,126,112,37,17,15,111,96,107,69,40,228,148,179,33,22,179,187,40,201,19,30,58,217,190,205,128,254,32,61,27],[72,74,192,184,194,158,15,140,84,255,99,129,158,151,84,66,116,128,242,237,202,152,124,44,124,24,248,110,241,71,63,193],[13,90,24,59,186,152,119,247,30,59,106,147,231,196,101,31,241,105,129,100,52,53,65,208,133,116,240,30,48,223,27,58],[155,66,164,4,158,204,141,98,218,25,70,159,23,222,175,226,73,222,199,60,213,77,10,108,249,111,204,141,246,41,174,181],[72,252,153,145,134,255,59,240,223,218,23,151,46,71,93,107,242,28,67,92,35,166,216,155,84,125,200,90,145,185,136,194],[50,49,49,202,115,74,110,142,124,86,38,159,131,141,104,228,10,253,118,18,190,54,21,35,67,199,234,184,250,208,122,29],[199,85,52,87,103,117,174,16,80,149,205,95,181,211,40,17,245,195,216,231,40,228,123,185,138,216,121,27,65,232,196,50]], [[89,253,198,90,65,3,196,42,85,137,197,35,228,24,224,86,122,252,123,195,118,70,125,92,218,213,8,230,64,187,120,81],[230,122,23,39,50,154,222,19,126,54,149,18,77,161,222,76,120,216,53,250,33,238,233,72,73,183,156,79,139,48,168,198],[71,83,85,129,142,21,93,25,188,197,7,144,37,190,204,5,74,144,27,179,231,250,166,61,182,136,247,24,173,6,31,110],[78,160,89,76,252,106,145,119,93,169,215,20,135,202,1,151,216,154,70,146,83,73,244,157,3,70,25,123,176,106,13,49],[43,177,67,84,193,94,81,83,95,49,173,200,184,185,86,125,193,162,159,73,91,148,210,45,22,126,29,181,49,232,254,247],[141,193,87,131,68,175,103,70,123,28,131,32,21,12,7,242,125,190,100,128,70,201,130,158,238,86,171,46,2,121,93,57],[92,159,219,66,141,211,3,67,180,62,88,38,73,84,171,146,94,228,254,254,106,229,239,78,190,200,179,104,87,240,225,141]], 5, 83,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [11,1001,18,5,1336,20,100,257], [[46,193,231,140,215,131,127,141,198,138,150,153,192,193,220,102,140,132,173,139,211,181,91,17,193,32,190,174,20,50,111,247],[197,166,46,52,39,12,41,228,202,21,197,210,53,234,12,159,182,93,33,184,127,75,208,211,53,133,216,8,22,38,24,243],[186,42,57,155,46,184,117,77,224,10,197,53,128,181,202,147,89,148,28,236,233,105,89,13,142,123,91,173,33,202,80,2],[136,6,172,195,7,206,184,210,6,136,137,72,32,218,185,142,220,26,107,193,142,183,124,39,102,162,44,104,96,163,106,235],[202,77,18,164,170,255,46,36,8,198,69,220,89,94,175,84,8,188,97,201,210,16,175,112,143,26,47,128,2,71,97,162],[8,139,36,179,219,67,251,67,160,190,163,215,105,152,117,211,92,29,100,173,12,86,151,61,188,140,249,220,180,31,240,30],[207,252,132,107,4,159,74,88,73,208,205,121,66,28,149,55,108,36,236,91,34,94,40,185,9,218,158,226,61,5,188,110]], [159,10,17,3,20,4,6], [[49,186,126,112,37,17,15,111,96,107,69,40,228,148,179,33,22,179,187,40,201,19,30,58,217,190,205,128,254,32,61,27],[72,74,192,184,194,158,15,140,84,255,99,129,158,151,84,66,116,128,242,237,202,152,124,44,124,24,248,110,241,71,63,193],[13,90,24,59,186,152,119,247,30,59,106,147,231,196,101,31,241,105,129,100,52,53,65,208,133,116,240,30,48,223,27,58],[155,66,164,4,158,204,141,98,218,25,70,159,23,222,175,226,73,222,199,60,213,77,10,108,249,111,204,141,246,41,174,181],[72,252,153,145,134,255,59,240,223,218,23,151,46,71,93,107,242,28,67,92,35,166,216,155,84,125,200,90,145,185,136,194],[50,49,49,202,115,74,110,142,124,86,38,159,131,141,104,228,10,253,118,18,190,54,21,35,67,199,234,184,250,208,122,29],[199,85,52,87,103,117,174,16,80,149,205,95,181,211,40,17,245,195,216,231,40,228,123,185,138,216,121,27,65,232,196,50]], [[89,253,198,90,65,3,196,42,85,137,197,35,228,24,224,86,122,252,123,195,118,70,125,92,218,213,8,230,64,187,120,81],[230,122,23,39,50,154,222,19,126,54,149,18,77,161,222,76,120,216,53,250,33,238,233,72,73,183,156,79,139,48,168,198],[71,83,85,129,142,21,93,25,188,197,7,144,37,190,204,5,74,144,27,179,231,250,166,61,182,136,247,24,173,6,31,110],[78,160,89,76,252,106,145,119,93,169,215,20,135,202,1,151,216,154,70,146,83,73,244,157,3,70,25,123,176,106,13,49],[43,177,67,84,193,94,81,83,95,49,173,200,184,185,86,125,193,162,159,73,91,148,210,45,22,126,29,181,49,232,254,247],[141,193,87,131,68,175,103,70,123,28,131,32,21,12,7,242,125,190,100,128,70,201,130,158,238,86,171,46,2,121,93,57],[92,159,219,66,141,211,3,67,180,62,88,38,73,84,171,146,94,228,254,254,106,229,239,78,190,200,179,104,87,240,225,141]], 5, 83,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [81,1337,160,20,10000,1338,10000,11], [[46,193,231,140,215,131,127,141,198,138,150,153,192,193,220,102,140,132,173,139,211,181,91,17,193,32,190,174,20,50,111,247],[197,166,46,52,39,12,41,228,202,21,197,210,53,234,12,159,182,93,33,184,127,75,208,211,53,133,216,8,22,38,24,243],[186,42,57,155,46,184,117,77,224,10,197,53,128,181,202,147,89,148,28,236,233,105,89,13,142,123,91,173,33,202,80,2],[136,6,172,195,7,206,184,210,6,136,137,72,32,218,185,142,220,26,107,193,142,183,124,39,102,162,44,104,96,163,106,235],[202,77,18,164,170,255,46,36,8,198,69,220,89,94,175,84,8,188,97,201,210,16,175,112,143,26,47,128,2,71,97,162],[8,139,36,179,219,67,251,67,160,190,163,215,105,152,117,211,92,29,100,173,12,86,151,61,188,140,249,220,180,31,240,30],[207,252,132,107,4,159,74,88,73,208,205,121,66,28,149,55,108,36,236,91,34,94,40,185,9,218,158,226,61,5,188,110]], [159,10,17,3,20,4,6], [[49,186,126,112,37,17,15,111,96,107,69,40,228,148,179,33,22,179,187,40,201,19,30,58,217,190,205,128,254,32,61,27],[72,74,192,184,194,158,15,140,84,255,99,129,158,151,84,66,116,128,242,237,202,152,124,44,124,24,248,110,241,71,63,193],[13,90,24,59,186,152,119,247,30,59,106,147,231,196,101,31,241,105,129,100,52,53,65,208,133,116,240,30,48,223,27,58],[155,66,164,4,158,204,141,98,218,25,70,159,23,222,175,226,73,222,199,60,213,77,10,108,249,111,204,141,246,41,174,181],[72,252,153,145,134,255,59,240,223,218,23,151,46,71,93,107,242,28,67,92,35,166,216,155,84,125,200,90,145,185,136,194],[50,49,49,202,115,74,110,142,124,86,38,159,131,141,104,228,10,253,118,18,190,54,21,35,67,199,234,184,250,208,122,29],[199,85,52,87,103,117,174,16,80,149,205,95,181,211,40,17,245,195,216,231,40,228,123,185,138,216,121,27,65,232,196,50]], [[89,253,198,90,65,3,196,42,85,137,197,35,228,24,224,86,122,252,123,195,118,70,125,92,218,213,8,230,64,187,120,81],[230,122,23,39,50,154,222,19,126,54,149,18,77,161,222,76,120,216,53,250,33,238,233,72,73,183,156,79,139,48,168,198],[71,83,85,129,142,21,93,25,188,197,7,144,37,190,204,5,74,144,27,179,231,250,166,61,182,136,247,24,173,6,31,110],[78,160,89,76,252,106,145,119,93,169,215,20,135,202,1,151,216,154,70,146,83,73,244,157,3,70,25,123,176,106,13,49],[43,177,67,84,193,94,81,83,95,49,173,200,184,185,86,125,193,162,159,73,91,148,210,45,22,126,29,181,49,232,254,247],[141,193,87,131,68,175,103,70,123,28,131,32,21,12,7,242,125,190,100,128,70,201,130,158,238,86,171,46,2,121,93,57],[92,159,219,66,141,211,3,67,180,62,88,38,73,84,171,146,94,228,254,254,106,229,239,78,190,200,179,104,87,240,225,141]], 5, 83,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [10000,256,99,1001,83,81,19,83], [[46,193,231,140,215,131,127,141,198,138,150,153,192,193,220,102,140,132,173,139,211,181,91,17,193,32,190,174,20,50,111,247],[197,166,46,52,39,12,41,228,202,21,197,210,53,234,12,159,182,93,33,184,127,75,208,211,53,133,216,8,22,38,24,243],[186,42,57,155,46,184,117,77,224,10,197,53,128,181,202,147,89,148,28,236,233,105,89,13,142,123,91,173,33,202,80,2],[136,6,172,195,7,206,184,210,6,136,137,72,32,218,185,142,220,26,107,193,142,183,124,39,102,162,44,104,96,163,106,235],[202,77,18,164,170,255,46,36,8,198,69,220,89,94,175,84,8,188,97,201,210,16,175,112,143,26,47,128,2,71,97,162],[8,139,36,179,219,67,251,67,160,190,163,215,105,152,117,211,92,29,100,173,12,86,151,61,188,140,249,220,180,31,240,30],[207,252,132,107,4,159,74,88,73,208,205,121,66,28,149,55,108,36,236,91,34,94,40,185,9,218,158,226,61,5,188,110]], [159,10,17,3,20,4,6], [[49,186,126,112,37,17,15,111,96,107,69,40,228,148,179,33,22,179,187,40,201,19,30,58,217,190,205,128,254,32,61,27],[72,74,192,184,194,158,15,140,84,255,99,129,158,151,84,66,116,128,242,237,202,152,124,44,124,24,248,110,241,71,63,193],[13,90,24,59,186,152,119,247,30,59,106,147,231,196,101,31,241,105,129,100,52,53,65,208,133,116,240,30,48,223,27,58],[155,66,164,4,158,204,141,98,218,25,70,159,23,222,175,226,73,222,199,60,213,77,10,108,249,111,204,141,246,41,174,181],[72,252,153,145,134,255,59,240,223,218,23,151,46,71,93,107,242,28,67,92,35,166,216,155,84,125,200,90,145,185,136,194],[50,49,49,202,115,74,110,142,124,86,38,159,131,141,104,228,10,253,118,18,190,54,21,35,67,199,234,184,250,208,122,29],[199,85,52,87,103,117,174,16,80,149,205,95,181,211,40,17,245,195,216,231,40,228,123,185,138,216,121,27,65,232,196,50]], [[89,253,198,90,65,3,196,42,85,137,197,35,228,24,224,86,122,252,123,195,118,70,125,92,218,213,8,230,64,187,120,81],[230,122,23,39,50,154,222,19,126,54,149,18,77,161,222,76,120,216,53,250,33,238,233,72,73,183,156,79,139,48,168,198],[71,83,85,129,142,21,93,25,188,197,7,144,37,190,204,5,74,144,27,179,231,250,166,61,182,136,247,24,173,6,31,110],[78,160,89,76,252,106,145,119,93,169,215,20,135,202,1,151,216,154,70,146,83,73,244,157,3,70,25,123,176,106,13,49],[43,177,67,84,193,94,81,83,95,49,173,200,184,185,86,125,193,162,159,73,91,148,210,45,22,126,29,181,49,232,254,247],[141,193,87,131,68,175,103,70,123,28,131,32,21,12,7,242,125,190,100,128,70,201,130,158,238,86,171,46,2,121,93,57],[92,159,219,66,141,211,3,67,180,62,88,38,73,84,171,146,94,228,254,254,106,229,239,78,190,200,179,104,87,240,225,141]], 5, 83,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [9999,256,2,83,82,0,83,160], [[46,193,231,140,215,131,127,141,198,138,150,153,192,193,220,102,140,132,173,139,211,181,91,17,193,32,190,174,20,50,111,247],[197,166,46,52,39,12,41,228,202,21,197,210,53,234,12,159,182,93,33,184,127,75,208,211,53,133,216,8,22,38,24,243],[186,42,57,155,46,184,117,77,224,10,197,53,128,181,202,147,89,148,28,236,233,105,89,13,142,123,91,173,33,202,80,2],[136,6,172,195,7,206,184,210,6,136,137,72,32,218,185,142,220,26,107,193,142,183,124,39,102,162,44,104,96,163,106,235],[202,77,18,164,170,255,46,36,8,198,69,220,89,94,175,84,8,188,97,201,210,16,175,112,143,26,47,128,2,71,97,162],[8,139,36,179,219,67,251,67,160,190,163,215,105,152,117,211,92,29,100,173,12,86,151,61,188,140,249,220,180,31,240,30],[207,252,132,107,4,159,74,88,73,208,205,121,66,28,149,55,108,36,236,91,34,94,40,185,9,218,158,226,61,5,188,110]], [159,10,17,3,20,4,6], [[49,186,126,112,37,17,15,111,96,107,69,40,228,148,179,33,22,179,187,40,201,19,30,58,217,190,205,128,254,32,61,27],[72,74,192,184,194,158,15,140,84,255,99,129,158,151,84,66,116,128,242,237,202,152,124,44,124,24,248,110,241,71,63,193],[13,90,24,59,186,152,119,247,30,59,106,147,231,196,101,31,241,105,129,100,52,53,65,208,133,116,240,30,48,223,27,58],[155,66,164,4,158,204,141,98,218,25,70,159,23,222,175,226,73,222,199,60,213,77,10,108,249,111,204,141,246,41,174,181],[72,252,153,145,134,255,59,240,223,218,23,151,46,71,93,107,242,28,67,92,35,166,216,155,84,125,200,90,145,185,136,194],[50,49,49,202,115,74,110,142,124,86,38,159,131,141,104,228,10,253,118,18,190,54,21,35,67,199,234,184,250,208,122,29],[199,85,52,87,103,117,174,16,80,149,205,95,181,211,40,17,245,195,216,231,40,228,123,185,138,216,121,27,65,232,196,50]], [[89,253,198,90,65,3,196,42,85,137,197,35,228,24,224,86,122,252,123,195,118,70,125,92,218,213,8,230,64,187,120,81],[230,122,23,39,50,154,222,19,126,54,149,18,77,161,222,76,120,216,53,250,33,238,233,72,73,183,156,79,139,48,168,198],[71,83,85,129,142,21,93,25,188,197,7,144,37,190,204,5,74,144,27,179,231,250,166,61,182,136,247,24,173,6,31,110],[78,160,89,76,252,106,145,119,93,169,215,20,135,202,1,151,216,154,70,146,83,73,244,157,3,70,25,123,176,106,13,49],[43,177,67,84,193,94,81,83,95,49,173,200,184,185,86,125,193,162,159,73,91,148,210,45,22,126,29,181,49,232,254,247],[141,193,87,131,68,175,103,70,123,28,131,32,21,12,7,242,125,190,100,128,70,201,130,158,238,86,171,46,2,121,93,57],[92,159,219,66,141,211,3,67,180,62,88,38,73,84,171,146,94,228,254,254,106,229,239,78,190,200,179,104,87,240,225,141]], 5, 83,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 10000, [130,231,104,19,81,73,44,247,125,82,143,66,180,178,127,239,215,199,231,83,24,203,88,118,10,108,80,106,255,26,106,7], 101, [166,124,123,206,12,238,122,211,65,105,220,242,198,134,247,177,252,252,251,46,167,23,81,81,163,229,107,125,59,152,38,246], [176,46,24,131,54,177,177,177,146,150,120,101,252,158,233,167,84,51,216,252,123,52,154,193,42,86,197,206,52,41,208,218], 2,{from: accounts[6]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 10000, [130,231,104,19,81,73,44,247,125,82,143,66,180,178,127,239,215,199,231,83,24,203,88,118,10,108,80,106,255,26,106,7], 101, [166,124,123,206,12,238,122,211,65,105,220,242,198,134,247,177,252,252,251,46,167,23,81,81,163,229,107,125,59,152,38,246], [176,46,24,131,54,177,177,177,146,150,120,101,252,158,233,167,84,51,216,252,123,52,154,193,42,86,197,206,52,41,208,218], 2,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[1], 10000, [130,231,104,19,81,73,44,247,125,82,143,66,180,178,127,239,215,199,231,83,24,203,88,118,10,108,80,106,255,26,106,7], 101, [166,124,123,206,12,238,122,211,65,105,220,242,198,134,247,177,252,252,251,46,167,23,81,81,163,229,107,125,59,152,38,246], [176,46,24,131,54,177,177,177,146,150,120,101,252,158,233,167,84,51,216,252,123,52,154,193,42,86,197,206,52,41,208,218], 10001,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[8], 1338,{from: accounts[6]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[8], 1338,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[2], accounts[8], 9999, [218,132,197,233,203,245,32,56,39,159,15,35,105,221,21,173,51,79,85,226,177,123,129,46,236,204,89,147,148,174,188,82], 100, [227,143,229,43,109,50,107,168,124,52,31,56,10,11,17,137,245,113,180,162,209,208,19,42,97,186,53,236,226,187,161,157], [249,49,137,201,156,4,227,250,130,232,253,187,44,229,107,95,85,205,218,236,240,36,245,172,250,183,23,149,66,69,231,181],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[4],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[4],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
