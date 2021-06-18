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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[6],accounts[8],(await web3.eth.getBlockNumber())+519,(await web3.eth.getBlockNumber())+519+556,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[6],accounts[8],(await web3.eth.getBlockNumber())+519,(await web3.eth.getBlockNumber())+519+556,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[7],19,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[7],19,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[2],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[4],accounts[6],160,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[4],accounts[6],160,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[1],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[8],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[6],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[0],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[0], 1001,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[8],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should fail transferConcent(address) when NOT comply with: _newConcent != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute transferColdwallet(address) WHEN msg.sender==_owner,_newColdwallet!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferColdwallet(accounts[0],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[0],{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.setMaximumDepositAmount(11,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(11,{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.onTokenReceived(accounts[3], 11, [121,89,183,175,162,217,250,144,205,149,234,75,106,73,232,183,221,33,179,10,155,200,92,224,255,16,199,153,15,84,157,86],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[9],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[4], 6,{from: accounts[4]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[4], 6,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[7], 999,{from: accounts[4]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[7], 999,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[6], 1338, [139,164,137,165,33,23,71,109,248,137,27,62,124,192,218,182,37,213,172,38,200,7,170,239,200,115,143,77,191,95,88,165], 9, [150,194,45,100,184,100,118,111,122,22,166,74,233,90,233,141,110,199,160,81,174,191,157,80,168,254,182,66,14,106,125,99], [185,0,129,163,44,63,104,204,210,244,123,238,81,119,215,9,7,168,15,176,221,230,192,125,74,172,66,204,168,4,170,141], 3,{from: accounts[4]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[6], 1338, [139,164,137,165,33,23,71,109,248,137,27,62,124,192,218,182,37,213,172,38,200,7,170,239,200,115,143,77,191,95,88,165], 9, [150,194,45,100,184,100,118,111,122,22,166,74,233,90,233,141,110,199,160,81,174,191,157,80,168,254,182,66,14,106,125,99], [185,0,129,163,44,63,104,204,210,244,123,238,81,119,215,9,7,168,15,176,221,230,192,125,74,172,66,204,168,4,170,141], 3,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[6], 1338, [139,164,137,165,33,23,71,109,248,137,27,62,124,192,218,182,37,213,172,38,200,7,170,239,200,115,143,77,191,95,88,165], 9, [150,194,45,100,184,100,118,111,122,22,166,74,233,90,233,141,110,199,160,81,174,191,157,80,168,254,182,66,14,106,125,99], [185,0,129,163,44,63,104,204,210,244,123,238,81,119,215,9,7,168,15,176,221,230,192,125,74,172,66,204,168,4,170,141], 1339,{from: accounts[4]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [5,3,19,1338,99,256], [[191,126,101,148,127,235,157,74,193,129,48,90,81,25,110,8,77,56,52,231,43,196,156,0,88,49,229,227,38,184,21,68],[96,135,242,111,43,71,97,71,169,153,108,210,129,101,255,230,24,138,15,200,219,87,37,11,148,100,220,244,40,199,72,100],[202,129,18,243,1,196,73,188,11,107,166,255,223,99,44,156,99,246,117,245,91,53,214,24,128,224,244,118,126,69,182,139],[248,174,78,189,158,124,90,243,94,225,232,33,190,31,82,232,197,94,180,238,254,17,31,134,104,78,63,65,51,146,6,3],[48,103,151,42,209,25,161,133,65,153,20,163,112,123,188,253,116,167,170,159,171,155,53,82,68,205,54,115,202,160,220,7],[118,185,152,187,94,252,154,90,196,227,107,57,139,12,115,4,200,224,107,238,76,225,71,82,239,186,179,102,173,149,156,248]], [82,160,20,83,17,14], [[248,202,197,133,209,136,178,219,88,99,189,37,69,219,179,94,213,154,212,118,227,203,196,26,104,71,39,68,139,132,236,240],[0,123,238,22,119,138,17,12,179,180,109,131,164,99,90,87,10,146,91,172,144,159,240,79,197,234,139,183,150,8,164,150],[7,183,184,121,119,254,23,122,212,194,2,132,153,115,246,238,109,81,6,179,199,212,184,10,54,0,141,185,20,16,159,34],[218,183,47,89,177,83,202,180,196,226,92,140,37,51,58,12,5,96,211,223,149,216,90,62,43,64,187,141,13,114,44,88],[233,103,138,207,232,57,165,130,141,49,241,200,48,174,3,26,21,219,239,41,162,89,186,236,136,230,243,186,13,130,218,189],[194,130,149,42,229,92,99,125,152,248,171,26,87,96,10,180,59,214,112,231,44,128,187,80,103,11,66,56,228,30,66,235]], [[179,9,120,211,188,193,35,29,66,148,226,235,58,231,195,176,192,145,241,175,54,163,187,162,76,97,93,50,23,254,40,216],[123,163,172,160,217,71,207,69,173,9,132,1,110,71,225,35,48,9,228,122,68,172,57,75,124,233,58,35,112,45,96,86],[200,32,145,182,157,203,204,97,233,125,73,199,101,184,80,96,44,183,208,186,145,101,58,100,245,82,38,19,82,171,159,73],[92,213,166,96,198,33,20,159,250,121,13,248,221,106,216,55,219,20,10,110,128,178,185,132,173,230,68,148,27,87,178,93],[51,20,228,233,210,187,58,19,66,64,52,118,238,98,123,131,166,164,188,169,190,244,77,62,166,34,58,126,248,170,24,180],[246,197,253,207,93,185,79,189,138,193,244,171,95,93,194,245,16,16,239,69,138,62,3,46,91,152,215,254,6,225,243,128]], 2, 1,{from: accounts[4]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [5,3,19,1338,99,256], [[191,126,101,148,127,235,157,74,193,129,48,90,81,25,110,8,77,56,52,231,43,196,156,0,88,49,229,227,38,184,21,68],[96,135,242,111,43,71,97,71,169,153,108,210,129,101,255,230,24,138,15,200,219,87,37,11,148,100,220,244,40,199,72,100],[202,129,18,243,1,196,73,188,11,107,166,255,223,99,44,156,99,246,117,245,91,53,214,24,128,224,244,118,126,69,182,139],[248,174,78,189,158,124,90,243,94,225,232,33,190,31,82,232,197,94,180,238,254,17,31,134,104,78,63,65,51,146,6,3],[48,103,151,42,209,25,161,133,65,153,20,163,112,123,188,253,116,167,170,159,171,155,53,82,68,205,54,115,202,160,220,7],[118,185,152,187,94,252,154,90,196,227,107,57,139,12,115,4,200,224,107,238,76,225,71,82,239,186,179,102,173,149,156,248]], [82,160,20,83,17,14], [[248,202,197,133,209,136,178,219,88,99,189,37,69,219,179,94,213,154,212,118,227,203,196,26,104,71,39,68,139,132,236,240],[0,123,238,22,119,138,17,12,179,180,109,131,164,99,90,87,10,146,91,172,144,159,240,79,197,234,139,183,150,8,164,150],[7,183,184,121,119,254,23,122,212,194,2,132,153,115,246,238,109,81,6,179,199,212,184,10,54,0,141,185,20,16,159,34],[218,183,47,89,177,83,202,180,196,226,92,140,37,51,58,12,5,96,211,223,149,216,90,62,43,64,187,141,13,114,44,88],[233,103,138,207,232,57,165,130,141,49,241,200,48,174,3,26,21,219,239,41,162,89,186,236,136,230,243,186,13,130,218,189],[194,130,149,42,229,92,99,125,152,248,171,26,87,96,10,180,59,214,112,231,44,128,187,80,103,11,66,56,228,30,66,235]], [[179,9,120,211,188,193,35,29,66,148,226,235,58,231,195,176,192,145,241,175,54,163,187,162,76,97,93,50,23,254,40,216],[123,163,172,160,217,71,207,69,173,9,132,1,110,71,225,35,48,9,228,122,68,172,57,75,124,233,58,35,112,45,96,86],[200,32,145,182,157,203,204,97,233,125,73,199,101,184,80,96,44,183,208,186,145,101,58,100,245,82,38,19,82,171,159,73],[92,213,166,96,198,33,20,159,250,121,13,248,221,106,216,55,219,20,10,110,128,178,185,132,173,230,68,148,27,87,178,93],[51,20,228,233,210,187,58,19,66,64,52,118,238,98,123,131,166,164,188,169,190,244,77,62,166,34,58,126,248,170,24,180],[246,197,253,207,93,185,79,189,138,193,244,171,95,93,194,245,16,16,239,69,138,62,3,46,91,152,215,254,6,225,243,128]], 2, 1,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [1,255,1337,5,0,16,257], [[191,126,101,148,127,235,157,74,193,129,48,90,81,25,110,8,77,56,52,231,43,196,156,0,88,49,229,227,38,184,21,68],[96,135,242,111,43,71,97,71,169,153,108,210,129,101,255,230,24,138,15,200,219,87,37,11,148,100,220,244,40,199,72,100],[202,129,18,243,1,196,73,188,11,107,166,255,223,99,44,156,99,246,117,245,91,53,214,24,128,224,244,118,126,69,182,139],[248,174,78,189,158,124,90,243,94,225,232,33,190,31,82,232,197,94,180,238,254,17,31,134,104,78,63,65,51,146,6,3],[48,103,151,42,209,25,161,133,65,153,20,163,112,123,188,253,116,167,170,159,171,155,53,82,68,205,54,115,202,160,220,7],[118,185,152,187,94,252,154,90,196,227,107,57,139,12,115,4,200,224,107,238,76,225,71,82,239,186,179,102,173,149,156,248]], [82,160,20,83,17,14], [[248,202,197,133,209,136,178,219,88,99,189,37,69,219,179,94,213,154,212,118,227,203,196,26,104,71,39,68,139,132,236,240],[0,123,238,22,119,138,17,12,179,180,109,131,164,99,90,87,10,146,91,172,144,159,240,79,197,234,139,183,150,8,164,150],[7,183,184,121,119,254,23,122,212,194,2,132,153,115,246,238,109,81,6,179,199,212,184,10,54,0,141,185,20,16,159,34],[218,183,47,89,177,83,202,180,196,226,92,140,37,51,58,12,5,96,211,223,149,216,90,62,43,64,187,141,13,114,44,88],[233,103,138,207,232,57,165,130,141,49,241,200,48,174,3,26,21,219,239,41,162,89,186,236,136,230,243,186,13,130,218,189],[194,130,149,42,229,92,99,125,152,248,171,26,87,96,10,180,59,214,112,231,44,128,187,80,103,11,66,56,228,30,66,235]], [[179,9,120,211,188,193,35,29,66,148,226,235,58,231,195,176,192,145,241,175,54,163,187,162,76,97,93,50,23,254,40,216],[123,163,172,160,217,71,207,69,173,9,132,1,110,71,225,35,48,9,228,122,68,172,57,75,124,233,58,35,112,45,96,86],[200,32,145,182,157,203,204,97,233,125,73,199,101,184,80,96,44,183,208,186,145,101,58,100,245,82,38,19,82,171,159,73],[92,213,166,96,198,33,20,159,250,121,13,248,221,106,216,55,219,20,10,110,128,178,185,132,173,230,68,148,27,87,178,93],[51,20,228,233,210,187,58,19,66,64,52,118,238,98,123,131,166,164,188,169,190,244,77,62,166,34,58,126,248,170,24,180],[246,197,253,207,93,185,79,189,138,193,244,171,95,93,194,245,16,16,239,69,138,62,3,46,91,152,215,254,6,225,243,128]], 2, 1,{from: accounts[4]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [18,1001,4,1336,1,15,20], [[191,126,101,148,127,235,157,74,193,129,48,90,81,25,110,8,77,56,52,231,43,196,156,0,88,49,229,227,38,184,21,68],[96,135,242,111,43,71,97,71,169,153,108,210,129,101,255,230,24,138,15,200,219,87,37,11,148,100,220,244,40,199,72,100],[202,129,18,243,1,196,73,188,11,107,166,255,223,99,44,156,99,246,117,245,91,53,214,24,128,224,244,118,126,69,182,139],[248,174,78,189,158,124,90,243,94,225,232,33,190,31,82,232,197,94,180,238,254,17,31,134,104,78,63,65,51,146,6,3],[48,103,151,42,209,25,161,133,65,153,20,163,112,123,188,253,116,167,170,159,171,155,53,82,68,205,54,115,202,160,220,7],[118,185,152,187,94,252,154,90,196,227,107,57,139,12,115,4,200,224,107,238,76,225,71,82,239,186,179,102,173,149,156,248]], [82,160,20,83,17,14], [[248,202,197,133,209,136,178,219,88,99,189,37,69,219,179,94,213,154,212,118,227,203,196,26,104,71,39,68,139,132,236,240],[0,123,238,22,119,138,17,12,179,180,109,131,164,99,90,87,10,146,91,172,144,159,240,79,197,234,139,183,150,8,164,150],[7,183,184,121,119,254,23,122,212,194,2,132,153,115,246,238,109,81,6,179,199,212,184,10,54,0,141,185,20,16,159,34],[218,183,47,89,177,83,202,180,196,226,92,140,37,51,58,12,5,96,211,223,149,216,90,62,43,64,187,141,13,114,44,88],[233,103,138,207,232,57,165,130,141,49,241,200,48,174,3,26,21,219,239,41,162,89,186,236,136,230,243,186,13,130,218,189],[194,130,149,42,229,92,99,125,152,248,171,26,87,96,10,180,59,214,112,231,44,128,187,80,103,11,66,56,228,30,66,235]], [[179,9,120,211,188,193,35,29,66,148,226,235,58,231,195,176,192,145,241,175,54,163,187,162,76,97,93,50,23,254,40,216],[123,163,172,160,217,71,207,69,173,9,132,1,110,71,225,35,48,9,228,122,68,172,57,75,124,233,58,35,112,45,96,86],[200,32,145,182,157,203,204,97,233,125,73,199,101,184,80,96,44,183,208,186,145,101,58,100,245,82,38,19,82,171,159,73],[92,213,166,96,198,33,20,159,250,121,13,248,221,106,216,55,219,20,10,110,128,178,185,132,173,230,68,148,27,87,178,93],[51,20,228,233,210,187,58,19,66,64,52,118,238,98,123,131,166,164,188,169,190,244,77,62,166,34,58,126,248,170,24,180],[246,197,253,207,93,185,79,189,138,193,244,171,95,93,194,245,16,16,239,69,138,62,3,46,91,152,215,254,6,225,243,128]], 2, 1,{from: accounts[4]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [4,2,82,256,99,5,256], [[191,126,101,148,127,235,157,74,193,129,48,90,81,25,110,8,77,56,52,231,43,196,156,0,88,49,229,227,38,184,21,68],[96,135,242,111,43,71,97,71,169,153,108,210,129,101,255,230,24,138,15,200,219,87,37,11,148,100,220,244,40,199,72,100],[202,129,18,243,1,196,73,188,11,107,166,255,223,99,44,156,99,246,117,245,91,53,214,24,128,224,244,118,126,69,182,139],[248,174,78,189,158,124,90,243,94,225,232,33,190,31,82,232,197,94,180,238,254,17,31,134,104,78,63,65,51,146,6,3],[48,103,151,42,209,25,161,133,65,153,20,163,112,123,188,253,116,167,170,159,171,155,53,82,68,205,54,115,202,160,220,7],[118,185,152,187,94,252,154,90,196,227,107,57,139,12,115,4,200,224,107,238,76,225,71,82,239,186,179,102,173,149,156,248]], [82,160,20,83,17,14], [[248,202,197,133,209,136,178,219,88,99,189,37,69,219,179,94,213,154,212,118,227,203,196,26,104,71,39,68,139,132,236,240],[0,123,238,22,119,138,17,12,179,180,109,131,164,99,90,87,10,146,91,172,144,159,240,79,197,234,139,183,150,8,164,150],[7,183,184,121,119,254,23,122,212,194,2,132,153,115,246,238,109,81,6,179,199,212,184,10,54,0,141,185,20,16,159,34],[218,183,47,89,177,83,202,180,196,226,92,140,37,51,58,12,5,96,211,223,149,216,90,62,43,64,187,141,13,114,44,88],[233,103,138,207,232,57,165,130,141,49,241,200,48,174,3,26,21,219,239,41,162,89,186,236,136,230,243,186,13,130,218,189],[194,130,149,42,229,92,99,125,152,248,171,26,87,96,10,180,59,214,112,231,44,128,187,80,103,11,66,56,228,30,66,235]], [[179,9,120,211,188,193,35,29,66,148,226,235,58,231,195,176,192,145,241,175,54,163,187,162,76,97,93,50,23,254,40,216],[123,163,172,160,217,71,207,69,173,9,132,1,110,71,225,35,48,9,228,122,68,172,57,75,124,233,58,35,112,45,96,86],[200,32,145,182,157,203,204,97,233,125,73,199,101,184,80,96,44,183,208,186,145,101,58,100,245,82,38,19,82,171,159,73],[92,213,166,96,198,33,20,159,250,121,13,248,221,106,216,55,219,20,10,110,128,178,185,132,173,230,68,148,27,87,178,93],[51,20,228,233,210,187,58,19,66,64,52,118,238,98,123,131,166,164,188,169,190,244,77,62,166,34,58,126,248,170,24,180],[246,197,253,207,93,185,79,189,138,193,244,171,95,93,194,245,16,16,239,69,138,62,3,46,91,152,215,254,6,225,243,128]], 2, 1,{from: accounts[4]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[3], [83,9,2,1001,1336,159,5], [[191,126,101,148,127,235,157,74,193,129,48,90,81,25,110,8,77,56,52,231,43,196,156,0,88,49,229,227,38,184,21,68],[96,135,242,111,43,71,97,71,169,153,108,210,129,101,255,230,24,138,15,200,219,87,37,11,148,100,220,244,40,199,72,100],[202,129,18,243,1,196,73,188,11,107,166,255,223,99,44,156,99,246,117,245,91,53,214,24,128,224,244,118,126,69,182,139],[248,174,78,189,158,124,90,243,94,225,232,33,190,31,82,232,197,94,180,238,254,17,31,134,104,78,63,65,51,146,6,3],[48,103,151,42,209,25,161,133,65,153,20,163,112,123,188,253,116,167,170,159,171,155,53,82,68,205,54,115,202,160,220,7],[118,185,152,187,94,252,154,90,196,227,107,57,139,12,115,4,200,224,107,238,76,225,71,82,239,186,179,102,173,149,156,248]], [82,160,20,83,17,14], [[248,202,197,133,209,136,178,219,88,99,189,37,69,219,179,94,213,154,212,118,227,203,196,26,104,71,39,68,139,132,236,240],[0,123,238,22,119,138,17,12,179,180,109,131,164,99,90,87,10,146,91,172,144,159,240,79,197,234,139,183,150,8,164,150],[7,183,184,121,119,254,23,122,212,194,2,132,153,115,246,238,109,81,6,179,199,212,184,10,54,0,141,185,20,16,159,34],[218,183,47,89,177,83,202,180,196,226,92,140,37,51,58,12,5,96,211,223,149,216,90,62,43,64,187,141,13,114,44,88],[233,103,138,207,232,57,165,130,141,49,241,200,48,174,3,26,21,219,239,41,162,89,186,236,136,230,243,186,13,130,218,189],[194,130,149,42,229,92,99,125,152,248,171,26,87,96,10,180,59,214,112,231,44,128,187,80,103,11,66,56,228,30,66,235]], [[179,9,120,211,188,193,35,29,66,148,226,235,58,231,195,176,192,145,241,175,54,163,187,162,76,97,93,50,23,254,40,216],[123,163,172,160,217,71,207,69,173,9,132,1,110,71,225,35,48,9,228,122,68,172,57,75,124,233,58,35,112,45,96,86],[200,32,145,182,157,203,204,97,233,125,73,199,101,184,80,96,44,183,208,186,145,101,58,100,245,82,38,19,82,171,159,73],[92,213,166,96,198,33,20,159,250,121,13,248,221,106,216,55,219,20,10,110,128,178,185,132,173,230,68,148,27,87,178,93],[51,20,228,233,210,187,58,19,66,64,52,118,238,98,123,131,166,164,188,169,190,244,77,62,166,34,58,126,248,170,24,180],[246,197,253,207,93,185,79,189,138,193,244,171,95,93,194,245,16,16,239,69,138,62,3,46,91,152,215,254,6,225,243,128]], 2, 1,{from: accounts[4]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 255, [74,184,114,198,125,30,138,225,185,203,202,149,98,147,212,117,80,91,86,219,144,31,23,222,210,67,135,11,131,40,4,50], 9, [122,226,228,207,169,39,101,124,249,89,255,97,209,194,216,83,171,21,73,197,158,112,20,119,67,225,223,151,76,193,13,49], [184,87,50,231,70,193,123,237,245,255,153,144,202,93,245,197,239,14,232,229,163,198,200,29,176,56,205,142,200,163,145,73], 255,{from: accounts[4]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 255, [74,184,114,198,125,30,138,225,185,203,202,149,98,147,212,117,80,91,86,219,144,31,23,222,210,67,135,11,131,40,4,50], 9, [122,226,228,207,169,39,101,124,249,89,255,97,209,194,216,83,171,21,73,197,158,112,20,119,67,225,223,151,76,193,13,49], [184,87,50,231,70,193,123,237,245,255,153,144,202,93,245,197,239,14,232,229,163,198,200,29,176,56,205,142,200,163,145,73], 255,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 255, [74,184,114,198,125,30,138,225,185,203,202,149,98,147,212,117,80,91,86,219,144,31,23,222,210,67,135,11,131,40,4,50], 9, [122,226,228,207,169,39,101,124,249,89,255,97,209,194,216,83,171,21,73,197,158,112,20,119,67,225,223,151,76,193,13,49], [184,87,50,231,70,193,123,237,245,255,153,144,202,93,245,197,239,14,232,229,163,198,200,29,176,56,205,142,200,163,145,73], 256,{from: accounts[4]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[4], 14,{from: accounts[4]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[4], 14,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[9], accounts[1], 15, [190,98,8,244,172,77,108,242,18,215,228,103,158,81,113,93,68,145,239,26,135,175,111,171,236,176,64,65,129,174,184,243], 15, [145,198,129,37,112,183,3,244,33,147,164,59,193,209,48,158,74,25,221,81,216,92,30,57,21,28,51,164,219,111,29,21], [13,75,171,76,191,147,231,167,80,190,153,196,118,32,240,205,126,91,55,66,74,174,13,2,16,221,92,199,149,51,38,57],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[5],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
