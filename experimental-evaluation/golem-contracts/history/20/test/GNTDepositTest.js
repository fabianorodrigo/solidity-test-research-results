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
    contractGNTAllocation = await GNTAllocation.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[6],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[2],accounts[1],(await web3.eth.getBlockNumber())+177,(await web3.eth.getBlockNumber())+177+94,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[2],accounts[1],(await web3.eth.getBlockNumber())+177,(await web3.eth.getBlockNumber())+177+94,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[1],21,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[1],21,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[5],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[3],5,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[3],5,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[6],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[6],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[3],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[7], 1,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[5],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(3,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(3,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(999,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(999,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(99,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(99,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[5], 1336, [192,194,194,134,251,125,212,114,49,83,36,151,88,71,77,178,120,70,247,23,199,235,30,176,176,227,127,82,254,42,53,57],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[5],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[5], 11,{from: accounts[0]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[5], 11,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[7], 159,{from: accounts[0]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[7], 159,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[6], 16, [72,172,207,139,120,122,9,241,105,68,46,243,86,19,213,17,95,178,137,10,221,233,250,72,50,94,18,18,24,201,223,173], 0, [91,147,48,124,12,173,190,162,94,221,34,207,105,78,180,54,119,27,170,161,22,186,110,180,140,235,114,128,46,5,149,195], [26,234,223,135,112,61,46,212,42,9,121,62,228,160,114,234,21,205,212,33,133,254,122,98,147,224,229,221,91,136,197,168], 1,{from: accounts[0]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[6], 16, [72,172,207,139,120,122,9,241,105,68,46,243,86,19,213,17,95,178,137,10,221,233,250,72,50,94,18,18,24,201,223,173], 0, [91,147,48,124,12,173,190,162,94,221,34,207,105,78,180,54,119,27,170,161,22,186,110,180,140,235,114,128,46,5,149,195], [26,234,223,135,112,61,46,212,42,9,121,62,228,160,114,234,21,205,212,33,133,254,122,98,147,224,229,221,91,136,197,168], 1,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[6], 16, [72,172,207,139,120,122,9,241,105,68,46,243,86,19,213,17,95,178,137,10,221,233,250,72,50,94,18,18,24,201,223,173], 0, [91,147,48,124,12,173,190,162,94,221,34,207,105,78,180,54,119,27,170,161,22,186,110,180,140,235,114,128,46,5,149,195], [26,234,223,135,112,61,46,212,42,9,121,62,228,160,114,234,21,205,212,33,133,254,122,98,147,224,229,221,91,136,197,168], 17,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [6,2,160,9999,83], [[20,218,228,241,38,122,100,188,34,96,16,187,76,230,147,204,97,13,194,34,29,186,218,204,199,72,39,209,161,16,228,192],[111,113,11,206,52,206,226,152,78,103,194,113,223,194,2,145,0,89,42,74,43,219,155,114,249,3,22,239,207,208,33,240],[127,190,115,94,20,12,140,238,44,8,47,125,100,229,233,131,199,170,118,102,208,107,70,61,158,140,233,187,136,245,209,68],[63,107,99,154,154,185,195,109,92,167,83,147,229,96,34,97,114,151,7,37,226,196,45,193,110,118,150,215,250,110,14,35],[66,212,219,13,21,64,245,73,146,41,34,193,179,121,31,128,42,96,49,152,79,71,146,77,160,134,106,238,49,75,132,246]], [1,9,255,9,4], [[119,88,28,43,243,25,109,58,20,241,181,58,156,30,67,218,240,193,175,110,181,214,90,233,146,33,221,155,233,33,179,64],[156,218,128,174,130,216,36,68,39,90,21,62,173,15,126,175,40,113,240,251,82,132,92,50,181,88,7,105,21,96,202,15],[191,162,173,206,6,5,49,130,28,255,167,126,230,236,75,10,65,51,207,52,249,3,230,20,75,116,203,107,138,16,72,7],[42,114,129,204,158,141,108,50,238,158,9,38,1,225,75,198,88,238,54,8,239,59,166,105,130,60,205,91,85,67,58,140],[121,19,219,122,33,158,2,64,208,123,72,134,193,35,1,253,6,238,104,84,25,216,186,145,161,173,47,111,149,213,38,89]], [[12,43,207,220,78,110,118,252,159,147,188,145,74,110,4,76,140,252,190,237,126,148,104,196,167,14,193,167,20,254,143,94],[102,189,53,156,221,134,135,78,214,196,182,80,89,164,189,193,120,3,253,180,18,72,165,35,31,214,158,201,78,41,246,105],[200,63,10,95,2,2,242,199,199,212,82,227,179,79,177,255,61,66,181,125,0,23,79,230,218,63,228,177,68,10,211,11],[126,194,153,73,2,50,196,178,29,20,210,3,76,186,47,176,125,52,119,223,137,64,255,48,102,40,193,235,197,125,45,152],[117,70,14,32,79,247,13,8,70,75,79,88,24,251,63,145,29,76,231,73,59,37,153,199,236,155,58,126,255,56,196,104]], 1001, 18,{from: accounts[0]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [6,2,160,9999,83], [[20,218,228,241,38,122,100,188,34,96,16,187,76,230,147,204,97,13,194,34,29,186,218,204,199,72,39,209,161,16,228,192],[111,113,11,206,52,206,226,152,78,103,194,113,223,194,2,145,0,89,42,74,43,219,155,114,249,3,22,239,207,208,33,240],[127,190,115,94,20,12,140,238,44,8,47,125,100,229,233,131,199,170,118,102,208,107,70,61,158,140,233,187,136,245,209,68],[63,107,99,154,154,185,195,109,92,167,83,147,229,96,34,97,114,151,7,37,226,196,45,193,110,118,150,215,250,110,14,35],[66,212,219,13,21,64,245,73,146,41,34,193,179,121,31,128,42,96,49,152,79,71,146,77,160,134,106,238,49,75,132,246]], [1,9,255,9,4], [[119,88,28,43,243,25,109,58,20,241,181,58,156,30,67,218,240,193,175,110,181,214,90,233,146,33,221,155,233,33,179,64],[156,218,128,174,130,216,36,68,39,90,21,62,173,15,126,175,40,113,240,251,82,132,92,50,181,88,7,105,21,96,202,15],[191,162,173,206,6,5,49,130,28,255,167,126,230,236,75,10,65,51,207,52,249,3,230,20,75,116,203,107,138,16,72,7],[42,114,129,204,158,141,108,50,238,158,9,38,1,225,75,198,88,238,54,8,239,59,166,105,130,60,205,91,85,67,58,140],[121,19,219,122,33,158,2,64,208,123,72,134,193,35,1,253,6,238,104,84,25,216,186,145,161,173,47,111,149,213,38,89]], [[12,43,207,220,78,110,118,252,159,147,188,145,74,110,4,76,140,252,190,237,126,148,104,196,167,14,193,167,20,254,143,94],[102,189,53,156,221,134,135,78,214,196,182,80,89,164,189,193,120,3,253,180,18,72,165,35,31,214,158,201,78,41,246,105],[200,63,10,95,2,2,242,199,199,212,82,227,179,79,177,255,61,66,181,125,0,23,79,230,218,63,228,177,68,10,211,11],[126,194,153,73,2,50,196,178,29,20,210,3,76,186,47,176,125,52,119,223,137,64,255,48,102,40,193,235,197,125,45,152],[117,70,14,32,79,247,13,8,70,75,79,88,24,251,63,145,29,76,231,73,59,37,153,199,236,155,58,126,255,56,196,104]], 1001, 18,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [256,16,9999,2,16,159], [[20,218,228,241,38,122,100,188,34,96,16,187,76,230,147,204,97,13,194,34,29,186,218,204,199,72,39,209,161,16,228,192],[111,113,11,206,52,206,226,152,78,103,194,113,223,194,2,145,0,89,42,74,43,219,155,114,249,3,22,239,207,208,33,240],[127,190,115,94,20,12,140,238,44,8,47,125,100,229,233,131,199,170,118,102,208,107,70,61,158,140,233,187,136,245,209,68],[63,107,99,154,154,185,195,109,92,167,83,147,229,96,34,97,114,151,7,37,226,196,45,193,110,118,150,215,250,110,14,35],[66,212,219,13,21,64,245,73,146,41,34,193,179,121,31,128,42,96,49,152,79,71,146,77,160,134,106,238,49,75,132,246]], [1,9,255,9,4], [[119,88,28,43,243,25,109,58,20,241,181,58,156,30,67,218,240,193,175,110,181,214,90,233,146,33,221,155,233,33,179,64],[156,218,128,174,130,216,36,68,39,90,21,62,173,15,126,175,40,113,240,251,82,132,92,50,181,88,7,105,21,96,202,15],[191,162,173,206,6,5,49,130,28,255,167,126,230,236,75,10,65,51,207,52,249,3,230,20,75,116,203,107,138,16,72,7],[42,114,129,204,158,141,108,50,238,158,9,38,1,225,75,198,88,238,54,8,239,59,166,105,130,60,205,91,85,67,58,140],[121,19,219,122,33,158,2,64,208,123,72,134,193,35,1,253,6,238,104,84,25,216,186,145,161,173,47,111,149,213,38,89]], [[12,43,207,220,78,110,118,252,159,147,188,145,74,110,4,76,140,252,190,237,126,148,104,196,167,14,193,167,20,254,143,94],[102,189,53,156,221,134,135,78,214,196,182,80,89,164,189,193,120,3,253,180,18,72,165,35,31,214,158,201,78,41,246,105],[200,63,10,95,2,2,242,199,199,212,82,227,179,79,177,255,61,66,181,125,0,23,79,230,218,63,228,177,68,10,211,11],[126,194,153,73,2,50,196,178,29,20,210,3,76,186,47,176,125,52,119,223,137,64,255,48,102,40,193,235,197,125,45,152],[117,70,14,32,79,247,13,8,70,75,79,88,24,251,63,145,29,76,231,73,59,37,153,199,236,155,58,126,255,56,196,104]], 1001, 18,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [9,101,82,1000,256,15], [[20,218,228,241,38,122,100,188,34,96,16,187,76,230,147,204,97,13,194,34,29,186,218,204,199,72,39,209,161,16,228,192],[111,113,11,206,52,206,226,152,78,103,194,113,223,194,2,145,0,89,42,74,43,219,155,114,249,3,22,239,207,208,33,240],[127,190,115,94,20,12,140,238,44,8,47,125,100,229,233,131,199,170,118,102,208,107,70,61,158,140,233,187,136,245,209,68],[63,107,99,154,154,185,195,109,92,167,83,147,229,96,34,97,114,151,7,37,226,196,45,193,110,118,150,215,250,110,14,35],[66,212,219,13,21,64,245,73,146,41,34,193,179,121,31,128,42,96,49,152,79,71,146,77,160,134,106,238,49,75,132,246]], [1,9,255,9,4], [[119,88,28,43,243,25,109,58,20,241,181,58,156,30,67,218,240,193,175,110,181,214,90,233,146,33,221,155,233,33,179,64],[156,218,128,174,130,216,36,68,39,90,21,62,173,15,126,175,40,113,240,251,82,132,92,50,181,88,7,105,21,96,202,15],[191,162,173,206,6,5,49,130,28,255,167,126,230,236,75,10,65,51,207,52,249,3,230,20,75,116,203,107,138,16,72,7],[42,114,129,204,158,141,108,50,238,158,9,38,1,225,75,198,88,238,54,8,239,59,166,105,130,60,205,91,85,67,58,140],[121,19,219,122,33,158,2,64,208,123,72,134,193,35,1,253,6,238,104,84,25,216,186,145,161,173,47,111,149,213,38,89]], [[12,43,207,220,78,110,118,252,159,147,188,145,74,110,4,76,140,252,190,237,126,148,104,196,167,14,193,167,20,254,143,94],[102,189,53,156,221,134,135,78,214,196,182,80,89,164,189,193,120,3,253,180,18,72,165,35,31,214,158,201,78,41,246,105],[200,63,10,95,2,2,242,199,199,212,82,227,179,79,177,255,61,66,181,125,0,23,79,230,218,63,228,177,68,10,211,11],[126,194,153,73,2,50,196,178,29,20,210,3,76,186,47,176,125,52,119,223,137,64,255,48,102,40,193,235,197,125,45,152],[117,70,14,32,79,247,13,8,70,75,79,88,24,251,63,145,29,76,231,73,59,37,153,199,236,155,58,126,255,56,196,104]], 1001, 18,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [1338,256,161,11,2,10], [[20,218,228,241,38,122,100,188,34,96,16,187,76,230,147,204,97,13,194,34,29,186,218,204,199,72,39,209,161,16,228,192],[111,113,11,206,52,206,226,152,78,103,194,113,223,194,2,145,0,89,42,74,43,219,155,114,249,3,22,239,207,208,33,240],[127,190,115,94,20,12,140,238,44,8,47,125,100,229,233,131,199,170,118,102,208,107,70,61,158,140,233,187,136,245,209,68],[63,107,99,154,154,185,195,109,92,167,83,147,229,96,34,97,114,151,7,37,226,196,45,193,110,118,150,215,250,110,14,35],[66,212,219,13,21,64,245,73,146,41,34,193,179,121,31,128,42,96,49,152,79,71,146,77,160,134,106,238,49,75,132,246]], [1,9,255,9,4], [[119,88,28,43,243,25,109,58,20,241,181,58,156,30,67,218,240,193,175,110,181,214,90,233,146,33,221,155,233,33,179,64],[156,218,128,174,130,216,36,68,39,90,21,62,173,15,126,175,40,113,240,251,82,132,92,50,181,88,7,105,21,96,202,15],[191,162,173,206,6,5,49,130,28,255,167,126,230,236,75,10,65,51,207,52,249,3,230,20,75,116,203,107,138,16,72,7],[42,114,129,204,158,141,108,50,238,158,9,38,1,225,75,198,88,238,54,8,239,59,166,105,130,60,205,91,85,67,58,140],[121,19,219,122,33,158,2,64,208,123,72,134,193,35,1,253,6,238,104,84,25,216,186,145,161,173,47,111,149,213,38,89]], [[12,43,207,220,78,110,118,252,159,147,188,145,74,110,4,76,140,252,190,237,126,148,104,196,167,14,193,167,20,254,143,94],[102,189,53,156,221,134,135,78,214,196,182,80,89,164,189,193,120,3,253,180,18,72,165,35,31,214,158,201,78,41,246,105],[200,63,10,95,2,2,242,199,199,212,82,227,179,79,177,255,61,66,181,125,0,23,79,230,218,63,228,177,68,10,211,11],[126,194,153,73,2,50,196,178,29,20,210,3,76,186,47,176,125,52,119,223,137,64,255,48,102,40,193,235,197,125,45,152],[117,70,14,32,79,247,13,8,70,75,79,88,24,251,63,145,29,76,231,73,59,37,153,199,236,155,58,126,255,56,196,104]], 1001, 18,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [255,6,9,1000,18,10], [[20,218,228,241,38,122,100,188,34,96,16,187,76,230,147,204,97,13,194,34,29,186,218,204,199,72,39,209,161,16,228,192],[111,113,11,206,52,206,226,152,78,103,194,113,223,194,2,145,0,89,42,74,43,219,155,114,249,3,22,239,207,208,33,240],[127,190,115,94,20,12,140,238,44,8,47,125,100,229,233,131,199,170,118,102,208,107,70,61,158,140,233,187,136,245,209,68],[63,107,99,154,154,185,195,109,92,167,83,147,229,96,34,97,114,151,7,37,226,196,45,193,110,118,150,215,250,110,14,35],[66,212,219,13,21,64,245,73,146,41,34,193,179,121,31,128,42,96,49,152,79,71,146,77,160,134,106,238,49,75,132,246]], [1,9,255,9,4], [[119,88,28,43,243,25,109,58,20,241,181,58,156,30,67,218,240,193,175,110,181,214,90,233,146,33,221,155,233,33,179,64],[156,218,128,174,130,216,36,68,39,90,21,62,173,15,126,175,40,113,240,251,82,132,92,50,181,88,7,105,21,96,202,15],[191,162,173,206,6,5,49,130,28,255,167,126,230,236,75,10,65,51,207,52,249,3,230,20,75,116,203,107,138,16,72,7],[42,114,129,204,158,141,108,50,238,158,9,38,1,225,75,198,88,238,54,8,239,59,166,105,130,60,205,91,85,67,58,140],[121,19,219,122,33,158,2,64,208,123,72,134,193,35,1,253,6,238,104,84,25,216,186,145,161,173,47,111,149,213,38,89]], [[12,43,207,220,78,110,118,252,159,147,188,145,74,110,4,76,140,252,190,237,126,148,104,196,167,14,193,167,20,254,143,94],[102,189,53,156,221,134,135,78,214,196,182,80,89,164,189,193,120,3,253,180,18,72,165,35,31,214,158,201,78,41,246,105],[200,63,10,95,2,2,242,199,199,212,82,227,179,79,177,255,61,66,181,125,0,23,79,230,218,63,228,177,68,10,211,11],[126,194,153,73,2,50,196,178,29,20,210,3,76,186,47,176,125,52,119,223,137,64,255,48,102,40,193,235,197,125,45,152],[117,70,14,32,79,247,13,8,70,75,79,88,24,251,63,145,29,76,231,73,59,37,153,199,236,155,58,126,255,56,196,104]], 1001, 18,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 16, [242,169,210,156,121,245,62,141,34,53,69,181,129,64,172,30,172,7,28,213,72,154,245,31,200,134,0,130,102,35,0,127], 81, [130,73,141,102,86,178,67,103,104,5,166,28,139,83,82,127,70,55,47,133,6,91,10,168,26,65,229,210,90,193,242,215], [159,23,151,243,90,252,102,220,251,78,189,153,239,152,204,29,197,73,201,185,54,158,90,42,185,129,176,136,61,173,196,115], 16,{from: accounts[0]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 16, [242,169,210,156,121,245,62,141,34,53,69,181,129,64,172,30,172,7,28,213,72,154,245,31,200,134,0,130,102,35,0,127], 81, [130,73,141,102,86,178,67,103,104,5,166,28,139,83,82,127,70,55,47,133,6,91,10,168,26,65,229,210,90,193,242,215], [159,23,151,243,90,252,102,220,251,78,189,153,239,152,204,29,197,73,201,185,54,158,90,42,185,129,176,136,61,173,196,115], 16,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 16, [242,169,210,156,121,245,62,141,34,53,69,181,129,64,172,30,172,7,28,213,72,154,245,31,200,134,0,130,102,35,0,127], 81, [130,73,141,102,86,178,67,103,104,5,166,28,139,83,82,127,70,55,47,133,6,91,10,168,26,65,229,210,90,193,242,215], [159,23,151,243,90,252,102,220,251,78,189,153,239,152,204,29,197,73,201,185,54,158,90,42,185,129,176,136,61,173,196,115], 17,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[1], 5,{from: accounts[0]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[1], 5,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[3], accounts[5], 5, [234,184,105,209,99,84,183,198,196,28,205,255,168,105,20,206,157,218,239,159,183,211,233,231,248,52,83,151,5,63,143,52], 9, [220,52,164,98,60,172,148,29,160,150,213,215,237,242,158,134,6,99,252,71,12,56,241,61,76,13,2,203,146,105,141,224], [100,241,178,222,60,36,32,81,136,168,59,223,255,49,213,31,206,132,22,83,56,182,222,178,207,16,52,167,68,21,226,192],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[6],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[6],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
