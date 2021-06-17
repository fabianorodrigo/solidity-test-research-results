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
    contractGNTAllocation = await GNTAllocation.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[0],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[8],accounts[6],(await web3.eth.getBlockNumber())+34,(await web3.eth.getBlockNumber())+34+505,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[8],accounts[6],(await web3.eth.getBlockNumber())+34,(await web3.eth.getBlockNumber())+34+505,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[4],20,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[4],20,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBurnableToken.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBurnableToken.address,accounts[2],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[1],accounts[8],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[1],accounts[8],1337,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[1],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[7], 14,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[7],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(5,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(5,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(10,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(10,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(255,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(255,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[7], 82, [196,52,86,187,139,204,33,112,189,198,117,106,59,123,133,249,175,127,92,113,122,180,14,146,15,177,136,203,28,243,105,240],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[8],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[1], 1337,{from: accounts[1]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[1], 1337,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[8], 255,{from: accounts[1]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[8], 255,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[7], accounts[5], 10000, [26,9,106,39,99,64,62,52,194,120,231,116,212,210,239,114,189,167,183,233,18,131,137,82,85,48,170,193,106,9,121,129], 255, [43,202,221,32,196,29,62,167,241,142,167,97,221,29,88,13,131,54,205,107,181,42,72,191,117,151,51,193,233,167,207,145], [255,47,214,51,35,138,23,42,255,38,171,49,205,76,5,110,216,11,114,252,63,249,172,93,177,162,240,96,156,107,211,220], 82,{from: accounts[1]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[7], accounts[5], 10000, [26,9,106,39,99,64,62,52,194,120,231,116,212,210,239,114,189,167,183,233,18,131,137,82,85,48,170,193,106,9,121,129], 255, [43,202,221,32,196,29,62,167,241,142,167,97,221,29,88,13,131,54,205,107,181,42,72,191,117,151,51,193,233,167,207,145], [255,47,214,51,35,138,23,42,255,38,171,49,205,76,5,110,216,11,114,252,63,249,172,93,177,162,240,96,156,107,211,220], 82,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[7], accounts[5], 10000, [26,9,106,39,99,64,62,52,194,120,231,116,212,210,239,114,189,167,183,233,18,131,137,82,85,48,170,193,106,9,121,129], 255, [43,202,221,32,196,29,62,167,241,142,167,97,221,29,88,13,131,54,205,107,181,42,72,191,117,151,51,193,233,167,207,145], [255,47,214,51,35,138,23,42,255,38,171,49,205,76,5,110,216,11,114,252,63,249,172,93,177,162,240,96,156,107,211,220], 10001,{from: accounts[1]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[2], [4,1,83,21,255,99,5], [[40,155,45,200,234,21,163,31,16,224,141,63,164,254,206,242,128,16,181,202,157,44,6,85,117,153,45,222,129,15,88,215],[88,50,225,175,73,225,197,157,15,95,38,106,188,179,235,129,28,89,4,191,221,45,67,244,217,220,234,2,21,102,70,120],[119,171,28,192,73,16,169,67,223,189,239,220,54,191,61,27,213,212,189,5,53,121,229,206,181,42,184,207,143,55,188,226],[252,93,255,255,205,197,68,222,74,166,190,208,209,85,12,69,36,225,198,100,163,215,47,208,247,206,215,47,184,147,239,161],[68,88,133,2,152,9,8,111,47,94,213,190,115,163,85,23,64,116,19,142,112,243,59,85,55,250,243,240,70,90,8,185],[33,255,224,124,248,132,36,224,20,163,75,121,114,125,17,115,31,67,29,133,24,139,82,157,133,237,126,144,105,176,82,250],[9,157,85,125,9,135,243,238,106,114,61,205,97,145,249,137,82,5,145,181,34,58,238,124,173,151,221,177,126,104,143,36]], [3,83,160,83,100,99,2], [[17,44,80,97,62,210,216,153,238,239,252,8,209,189,106,231,126,128,143,93,157,239,46,160,85,24,59,195,64,169,226,46],[171,133,107,25,201,163,49,89,154,25,156,91,30,143,97,151,103,76,176,80,184,203,9,248,206,247,91,148,213,30,164,204],[45,158,85,175,8,132,198,96,147,165,240,53,10,154,126,122,44,44,114,254,227,195,126,108,12,116,232,20,56,67,242,99],[173,140,61,56,66,190,113,36,25,227,160,160,36,71,10,34,173,52,78,25,136,64,44,36,194,198,244,223,75,85,14,231],[220,158,61,31,24,71,251,120,218,34,154,150,135,120,119,82,24,230,177,95,58,180,188,86,47,79,73,205,188,73,65,249],[59,172,40,11,252,25,173,155,53,68,244,232,157,156,9,165,2,35,129,72,99,247,26,69,215,132,237,61,214,27,51,195],[41,64,64,118,140,17,175,251,72,242,196,204,90,65,208,127,31,43,83,60,23,115,206,194,37,8,97,135,176,68,114,78]], [[219,123,106,151,73,161,208,156,23,165,233,43,155,217,207,80,134,56,137,147,119,229,196,194,31,200,170,234,210,29,122,50],[137,134,34,239,112,1,167,191,163,243,219,213,218,110,60,240,250,139,124,113,103,58,73,137,123,84,229,150,21,91,122,5],[118,230,51,172,228,61,82,114,11,233,160,113,234,237,13,84,182,133,80,49,247,194,146,228,233,109,95,42,255,196,74,41],[170,74,60,6,253,95,167,46,209,33,235,23,81,61,50,144,196,62,137,212,206,170,183,202,157,85,3,199,126,14,69,179],[130,110,14,120,83,188,208,87,187,187,58,106,140,26,49,100,252,187,148,25,136,43,28,21,8,145,169,126,155,211,36,128],[41,63,215,136,128,160,31,118,184,113,178,133,10,198,124,96,83,217,190,182,219,234,255,171,182,185,246,232,81,76,123,92],[186,46,152,91,18,182,18,239,32,131,49,219,144,213,55,42,112,159,252,9,23,106,20,113,164,149,88,77,75,11,52,185]], 10000, 1,{from: accounts[1]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[2], [4,1,83,21,255,99,5], [[40,155,45,200,234,21,163,31,16,224,141,63,164,254,206,242,128,16,181,202,157,44,6,85,117,153,45,222,129,15,88,215],[88,50,225,175,73,225,197,157,15,95,38,106,188,179,235,129,28,89,4,191,221,45,67,244,217,220,234,2,21,102,70,120],[119,171,28,192,73,16,169,67,223,189,239,220,54,191,61,27,213,212,189,5,53,121,229,206,181,42,184,207,143,55,188,226],[252,93,255,255,205,197,68,222,74,166,190,208,209,85,12,69,36,225,198,100,163,215,47,208,247,206,215,47,184,147,239,161],[68,88,133,2,152,9,8,111,47,94,213,190,115,163,85,23,64,116,19,142,112,243,59,85,55,250,243,240,70,90,8,185],[33,255,224,124,248,132,36,224,20,163,75,121,114,125,17,115,31,67,29,133,24,139,82,157,133,237,126,144,105,176,82,250],[9,157,85,125,9,135,243,238,106,114,61,205,97,145,249,137,82,5,145,181,34,58,238,124,173,151,221,177,126,104,143,36]], [3,83,160,83,100,99,2], [[17,44,80,97,62,210,216,153,238,239,252,8,209,189,106,231,126,128,143,93,157,239,46,160,85,24,59,195,64,169,226,46],[171,133,107,25,201,163,49,89,154,25,156,91,30,143,97,151,103,76,176,80,184,203,9,248,206,247,91,148,213,30,164,204],[45,158,85,175,8,132,198,96,147,165,240,53,10,154,126,122,44,44,114,254,227,195,126,108,12,116,232,20,56,67,242,99],[173,140,61,56,66,190,113,36,25,227,160,160,36,71,10,34,173,52,78,25,136,64,44,36,194,198,244,223,75,85,14,231],[220,158,61,31,24,71,251,120,218,34,154,150,135,120,119,82,24,230,177,95,58,180,188,86,47,79,73,205,188,73,65,249],[59,172,40,11,252,25,173,155,53,68,244,232,157,156,9,165,2,35,129,72,99,247,26,69,215,132,237,61,214,27,51,195],[41,64,64,118,140,17,175,251,72,242,196,204,90,65,208,127,31,43,83,60,23,115,206,194,37,8,97,135,176,68,114,78]], [[219,123,106,151,73,161,208,156,23,165,233,43,155,217,207,80,134,56,137,147,119,229,196,194,31,200,170,234,210,29,122,50],[137,134,34,239,112,1,167,191,163,243,219,213,218,110,60,240,250,139,124,113,103,58,73,137,123,84,229,150,21,91,122,5],[118,230,51,172,228,61,82,114,11,233,160,113,234,237,13,84,182,133,80,49,247,194,146,228,233,109,95,42,255,196,74,41],[170,74,60,6,253,95,167,46,209,33,235,23,81,61,50,144,196,62,137,212,206,170,183,202,157,85,3,199,126,14,69,179],[130,110,14,120,83,188,208,87,187,187,58,106,140,26,49,100,252,187,148,25,136,43,28,21,8,145,169,126,155,211,36,128],[41,63,215,136,128,160,31,118,184,113,178,133,10,198,124,96,83,217,190,182,219,234,255,171,182,185,246,232,81,76,123,92],[186,46,152,91,18,182,18,239,32,131,49,219,144,213,55,42,112,159,252,9,23,106,20,113,164,149,88,77,75,11,52,185]], 10000, 1,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[2], [18,10001,3,160,15,21,81,159], [[40,155,45,200,234,21,163,31,16,224,141,63,164,254,206,242,128,16,181,202,157,44,6,85,117,153,45,222,129,15,88,215],[88,50,225,175,73,225,197,157,15,95,38,106,188,179,235,129,28,89,4,191,221,45,67,244,217,220,234,2,21,102,70,120],[119,171,28,192,73,16,169,67,223,189,239,220,54,191,61,27,213,212,189,5,53,121,229,206,181,42,184,207,143,55,188,226],[252,93,255,255,205,197,68,222,74,166,190,208,209,85,12,69,36,225,198,100,163,215,47,208,247,206,215,47,184,147,239,161],[68,88,133,2,152,9,8,111,47,94,213,190,115,163,85,23,64,116,19,142,112,243,59,85,55,250,243,240,70,90,8,185],[33,255,224,124,248,132,36,224,20,163,75,121,114,125,17,115,31,67,29,133,24,139,82,157,133,237,126,144,105,176,82,250],[9,157,85,125,9,135,243,238,106,114,61,205,97,145,249,137,82,5,145,181,34,58,238,124,173,151,221,177,126,104,143,36]], [3,83,160,83,100,99,2], [[17,44,80,97,62,210,216,153,238,239,252,8,209,189,106,231,126,128,143,93,157,239,46,160,85,24,59,195,64,169,226,46],[171,133,107,25,201,163,49,89,154,25,156,91,30,143,97,151,103,76,176,80,184,203,9,248,206,247,91,148,213,30,164,204],[45,158,85,175,8,132,198,96,147,165,240,53,10,154,126,122,44,44,114,254,227,195,126,108,12,116,232,20,56,67,242,99],[173,140,61,56,66,190,113,36,25,227,160,160,36,71,10,34,173,52,78,25,136,64,44,36,194,198,244,223,75,85,14,231],[220,158,61,31,24,71,251,120,218,34,154,150,135,120,119,82,24,230,177,95,58,180,188,86,47,79,73,205,188,73,65,249],[59,172,40,11,252,25,173,155,53,68,244,232,157,156,9,165,2,35,129,72,99,247,26,69,215,132,237,61,214,27,51,195],[41,64,64,118,140,17,175,251,72,242,196,204,90,65,208,127,31,43,83,60,23,115,206,194,37,8,97,135,176,68,114,78]], [[219,123,106,151,73,161,208,156,23,165,233,43,155,217,207,80,134,56,137,147,119,229,196,194,31,200,170,234,210,29,122,50],[137,134,34,239,112,1,167,191,163,243,219,213,218,110,60,240,250,139,124,113,103,58,73,137,123,84,229,150,21,91,122,5],[118,230,51,172,228,61,82,114,11,233,160,113,234,237,13,84,182,133,80,49,247,194,146,228,233,109,95,42,255,196,74,41],[170,74,60,6,253,95,167,46,209,33,235,23,81,61,50,144,196,62,137,212,206,170,183,202,157,85,3,199,126,14,69,179],[130,110,14,120,83,188,208,87,187,187,58,106,140,26,49,100,252,187,148,25,136,43,28,21,8,145,169,126,155,211,36,128],[41,63,215,136,128,160,31,118,184,113,178,133,10,198,124,96,83,217,190,182,219,234,255,171,182,185,246,232,81,76,123,92],[186,46,152,91,18,182,18,239,32,131,49,219,144,213,55,42,112,159,252,9,23,106,20,113,164,149,88,77,75,11,52,185]], 10000, 1,{from: accounts[1]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[2], [83,1,100,257,9,159,11,159], [[40,155,45,200,234,21,163,31,16,224,141,63,164,254,206,242,128,16,181,202,157,44,6,85,117,153,45,222,129,15,88,215],[88,50,225,175,73,225,197,157,15,95,38,106,188,179,235,129,28,89,4,191,221,45,67,244,217,220,234,2,21,102,70,120],[119,171,28,192,73,16,169,67,223,189,239,220,54,191,61,27,213,212,189,5,53,121,229,206,181,42,184,207,143,55,188,226],[252,93,255,255,205,197,68,222,74,166,190,208,209,85,12,69,36,225,198,100,163,215,47,208,247,206,215,47,184,147,239,161],[68,88,133,2,152,9,8,111,47,94,213,190,115,163,85,23,64,116,19,142,112,243,59,85,55,250,243,240,70,90,8,185],[33,255,224,124,248,132,36,224,20,163,75,121,114,125,17,115,31,67,29,133,24,139,82,157,133,237,126,144,105,176,82,250],[9,157,85,125,9,135,243,238,106,114,61,205,97,145,249,137,82,5,145,181,34,58,238,124,173,151,221,177,126,104,143,36]], [3,83,160,83,100,99,2], [[17,44,80,97,62,210,216,153,238,239,252,8,209,189,106,231,126,128,143,93,157,239,46,160,85,24,59,195,64,169,226,46],[171,133,107,25,201,163,49,89,154,25,156,91,30,143,97,151,103,76,176,80,184,203,9,248,206,247,91,148,213,30,164,204],[45,158,85,175,8,132,198,96,147,165,240,53,10,154,126,122,44,44,114,254,227,195,126,108,12,116,232,20,56,67,242,99],[173,140,61,56,66,190,113,36,25,227,160,160,36,71,10,34,173,52,78,25,136,64,44,36,194,198,244,223,75,85,14,231],[220,158,61,31,24,71,251,120,218,34,154,150,135,120,119,82,24,230,177,95,58,180,188,86,47,79,73,205,188,73,65,249],[59,172,40,11,252,25,173,155,53,68,244,232,157,156,9,165,2,35,129,72,99,247,26,69,215,132,237,61,214,27,51,195],[41,64,64,118,140,17,175,251,72,242,196,204,90,65,208,127,31,43,83,60,23,115,206,194,37,8,97,135,176,68,114,78]], [[219,123,106,151,73,161,208,156,23,165,233,43,155,217,207,80,134,56,137,147,119,229,196,194,31,200,170,234,210,29,122,50],[137,134,34,239,112,1,167,191,163,243,219,213,218,110,60,240,250,139,124,113,103,58,73,137,123,84,229,150,21,91,122,5],[118,230,51,172,228,61,82,114,11,233,160,113,234,237,13,84,182,133,80,49,247,194,146,228,233,109,95,42,255,196,74,41],[170,74,60,6,253,95,167,46,209,33,235,23,81,61,50,144,196,62,137,212,206,170,183,202,157,85,3,199,126,14,69,179],[130,110,14,120,83,188,208,87,187,187,58,106,140,26,49,100,252,187,148,25,136,43,28,21,8,145,169,126,155,211,36,128],[41,63,215,136,128,160,31,118,184,113,178,133,10,198,124,96,83,217,190,182,219,234,255,171,182,185,246,232,81,76,123,92],[186,46,152,91,18,182,18,239,32,131,49,219,144,213,55,42,112,159,252,9,23,106,20,113,164,149,88,77,75,11,52,185]], 10000, 1,{from: accounts[1]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[2], [10,5,159,1338,2,10,3,1338], [[40,155,45,200,234,21,163,31,16,224,141,63,164,254,206,242,128,16,181,202,157,44,6,85,117,153,45,222,129,15,88,215],[88,50,225,175,73,225,197,157,15,95,38,106,188,179,235,129,28,89,4,191,221,45,67,244,217,220,234,2,21,102,70,120],[119,171,28,192,73,16,169,67,223,189,239,220,54,191,61,27,213,212,189,5,53,121,229,206,181,42,184,207,143,55,188,226],[252,93,255,255,205,197,68,222,74,166,190,208,209,85,12,69,36,225,198,100,163,215,47,208,247,206,215,47,184,147,239,161],[68,88,133,2,152,9,8,111,47,94,213,190,115,163,85,23,64,116,19,142,112,243,59,85,55,250,243,240,70,90,8,185],[33,255,224,124,248,132,36,224,20,163,75,121,114,125,17,115,31,67,29,133,24,139,82,157,133,237,126,144,105,176,82,250],[9,157,85,125,9,135,243,238,106,114,61,205,97,145,249,137,82,5,145,181,34,58,238,124,173,151,221,177,126,104,143,36]], [3,83,160,83,100,99,2], [[17,44,80,97,62,210,216,153,238,239,252,8,209,189,106,231,126,128,143,93,157,239,46,160,85,24,59,195,64,169,226,46],[171,133,107,25,201,163,49,89,154,25,156,91,30,143,97,151,103,76,176,80,184,203,9,248,206,247,91,148,213,30,164,204],[45,158,85,175,8,132,198,96,147,165,240,53,10,154,126,122,44,44,114,254,227,195,126,108,12,116,232,20,56,67,242,99],[173,140,61,56,66,190,113,36,25,227,160,160,36,71,10,34,173,52,78,25,136,64,44,36,194,198,244,223,75,85,14,231],[220,158,61,31,24,71,251,120,218,34,154,150,135,120,119,82,24,230,177,95,58,180,188,86,47,79,73,205,188,73,65,249],[59,172,40,11,252,25,173,155,53,68,244,232,157,156,9,165,2,35,129,72,99,247,26,69,215,132,237,61,214,27,51,195],[41,64,64,118,140,17,175,251,72,242,196,204,90,65,208,127,31,43,83,60,23,115,206,194,37,8,97,135,176,68,114,78]], [[219,123,106,151,73,161,208,156,23,165,233,43,155,217,207,80,134,56,137,147,119,229,196,194,31,200,170,234,210,29,122,50],[137,134,34,239,112,1,167,191,163,243,219,213,218,110,60,240,250,139,124,113,103,58,73,137,123,84,229,150,21,91,122,5],[118,230,51,172,228,61,82,114,11,233,160,113,234,237,13,84,182,133,80,49,247,194,146,228,233,109,95,42,255,196,74,41],[170,74,60,6,253,95,167,46,209,33,235,23,81,61,50,144,196,62,137,212,206,170,183,202,157,85,3,199,126,14,69,179],[130,110,14,120,83,188,208,87,187,187,58,106,140,26,49,100,252,187,148,25,136,43,28,21,8,145,169,126,155,211,36,128],[41,63,215,136,128,160,31,118,184,113,178,133,10,198,124,96,83,217,190,182,219,234,255,171,182,185,246,232,81,76,123,92],[186,46,152,91,18,182,18,239,32,131,49,219,144,213,55,42,112,159,252,9,23,106,20,113,164,149,88,77,75,11,52,185]], 10000, 1,{from: accounts[1]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[2], [5,16,21,1,255,255,2,161], [[40,155,45,200,234,21,163,31,16,224,141,63,164,254,206,242,128,16,181,202,157,44,6,85,117,153,45,222,129,15,88,215],[88,50,225,175,73,225,197,157,15,95,38,106,188,179,235,129,28,89,4,191,221,45,67,244,217,220,234,2,21,102,70,120],[119,171,28,192,73,16,169,67,223,189,239,220,54,191,61,27,213,212,189,5,53,121,229,206,181,42,184,207,143,55,188,226],[252,93,255,255,205,197,68,222,74,166,190,208,209,85,12,69,36,225,198,100,163,215,47,208,247,206,215,47,184,147,239,161],[68,88,133,2,152,9,8,111,47,94,213,190,115,163,85,23,64,116,19,142,112,243,59,85,55,250,243,240,70,90,8,185],[33,255,224,124,248,132,36,224,20,163,75,121,114,125,17,115,31,67,29,133,24,139,82,157,133,237,126,144,105,176,82,250],[9,157,85,125,9,135,243,238,106,114,61,205,97,145,249,137,82,5,145,181,34,58,238,124,173,151,221,177,126,104,143,36]], [3,83,160,83,100,99,2], [[17,44,80,97,62,210,216,153,238,239,252,8,209,189,106,231,126,128,143,93,157,239,46,160,85,24,59,195,64,169,226,46],[171,133,107,25,201,163,49,89,154,25,156,91,30,143,97,151,103,76,176,80,184,203,9,248,206,247,91,148,213,30,164,204],[45,158,85,175,8,132,198,96,147,165,240,53,10,154,126,122,44,44,114,254,227,195,126,108,12,116,232,20,56,67,242,99],[173,140,61,56,66,190,113,36,25,227,160,160,36,71,10,34,173,52,78,25,136,64,44,36,194,198,244,223,75,85,14,231],[220,158,61,31,24,71,251,120,218,34,154,150,135,120,119,82,24,230,177,95,58,180,188,86,47,79,73,205,188,73,65,249],[59,172,40,11,252,25,173,155,53,68,244,232,157,156,9,165,2,35,129,72,99,247,26,69,215,132,237,61,214,27,51,195],[41,64,64,118,140,17,175,251,72,242,196,204,90,65,208,127,31,43,83,60,23,115,206,194,37,8,97,135,176,68,114,78]], [[219,123,106,151,73,161,208,156,23,165,233,43,155,217,207,80,134,56,137,147,119,229,196,194,31,200,170,234,210,29,122,50],[137,134,34,239,112,1,167,191,163,243,219,213,218,110,60,240,250,139,124,113,103,58,73,137,123,84,229,150,21,91,122,5],[118,230,51,172,228,61,82,114,11,233,160,113,234,237,13,84,182,133,80,49,247,194,146,228,233,109,95,42,255,196,74,41],[170,74,60,6,253,95,167,46,209,33,235,23,81,61,50,144,196,62,137,212,206,170,183,202,157,85,3,199,126,14,69,179],[130,110,14,120,83,188,208,87,187,187,58,106,140,26,49,100,252,187,148,25,136,43,28,21,8,145,169,126,155,211,36,128],[41,63,215,136,128,160,31,118,184,113,178,133,10,198,124,96,83,217,190,182,219,234,255,171,182,185,246,232,81,76,123,92],[186,46,152,91,18,182,18,239,32,131,49,219,144,213,55,42,112,159,252,9,23,106,20,113,164,149,88,77,75,11,52,185]], 10000, 1,{from: accounts[1]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 255, [95,93,138,37,11,2,36,143,161,64,91,51,70,166,113,1,143,249,36,11,165,9,220,138,21,250,140,106,21,201,228,251], 3, [126,43,191,226,114,142,5,88,23,199,233,21,37,194,248,3,210,222,14,63,47,201,28,10,84,220,136,1,159,185,183,71], [230,233,19,126,150,7,235,251,160,199,123,130,3,74,77,227,210,238,88,110,43,195,135,211,52,237,45,229,94,50,23,0], 161,{from: accounts[1]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 255, [95,93,138,37,11,2,36,143,161,64,91,51,70,166,113,1,143,249,36,11,165,9,220,138,21,250,140,106,21,201,228,251], 3, [126,43,191,226,114,142,5,88,23,199,233,21,37,194,248,3,210,222,14,63,47,201,28,10,84,220,136,1,159,185,183,71], [230,233,19,126,150,7,235,251,160,199,123,130,3,74,77,227,210,238,88,110,43,195,135,211,52,237,45,229,94,50,23,0], 161,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 255, [95,93,138,37,11,2,36,143,161,64,91,51,70,166,113,1,143,249,36,11,165,9,220,138,21,250,140,106,21,201,228,251], 3, [126,43,191,226,114,142,5,88,23,199,233,21,37,194,248,3,210,222,14,63,47,201,28,10,84,220,136,1,159,185,183,71], [230,233,19,126,150,7,235,251,160,199,123,130,3,74,77,227,210,238,88,110,43,195,135,211,52,237,45,229,94,50,23,0], 256,{from: accounts[1]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[4], 5,{from: accounts[1]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[4], 5,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[4], accounts[0], 161, [106,198,198,131,138,168,102,124,39,159,191,211,230,62,19,246,44,99,236,6,255,69,2,138,158,125,16,134,174,180,103,161], 1, [45,241,92,242,61,223,238,75,38,79,215,116,144,149,30,48,214,255,78,123,233,33,227,114,61,154,186,35,3,30,65,133], [119,254,24,190,133,117,89,235,177,82,236,211,142,179,182,63,159,26,31,194,162,153,102,151,90,159,129,224,101,114,203,179],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[1],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
