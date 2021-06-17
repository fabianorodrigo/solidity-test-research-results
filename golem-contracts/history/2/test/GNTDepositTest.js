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
    contractGNTAllocation = await GNTAllocation.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[1],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[3],accounts[9],(await web3.eth.getBlockNumber())+98,(await web3.eth.getBlockNumber())+98+461,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[3],accounts[9],(await web3.eth.getBlockNumber())+98,(await web3.eth.getBlockNumber())+98+461,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[2],1001,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[2],1001,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractGolemNetworkTokenBatching.address,accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractGolemNetworkTokenBatching.address,accounts[4],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[7],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[7],1337,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[3],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[6],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[8],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[2], 83,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[8],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(16,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(16,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(1,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(1,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(10,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(10,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[0], 83, [59,23,152,69,142,219,214,31,216,160,242,190,103,159,115,186,123,192,17,16,230,238,52,107,223,8,185,136,150,232,132,117],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[9],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[4], 81,{from: accounts[0]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[4], 81,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[4], 1000,{from: accounts[0]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[4], 1000,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[5], accounts[8], 257, [169,242,181,78,58,173,129,150,168,69,238,237,67,49,185,26,86,235,164,19,221,156,187,55,123,109,130,246,104,221,195,209], 160, [126,164,233,169,252,78,145,168,235,74,24,247,211,117,43,189,217,79,21,69,178,254,112,97,173,187,245,209,161,70,249,255], [233,233,224,43,69,154,218,78,27,230,16,104,12,147,142,55,173,175,74,27,149,17,89,194,222,55,216,67,61,107,12,224], 15,{from: accounts[0]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[5], accounts[8], 257, [169,242,181,78,58,173,129,150,168,69,238,237,67,49,185,26,86,235,164,19,221,156,187,55,123,109,130,246,104,221,195,209], 160, [126,164,233,169,252,78,145,168,235,74,24,247,211,117,43,189,217,79,21,69,178,254,112,97,173,187,245,209,161,70,249,255], [233,233,224,43,69,154,218,78,27,230,16,104,12,147,142,55,173,175,74,27,149,17,89,194,222,55,216,67,61,107,12,224], 15,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[5], accounts[8], 257, [169,242,181,78,58,173,129,150,168,69,238,237,67,49,185,26,86,235,164,19,221,156,187,55,123,109,130,246,104,221,195,209], 160, [126,164,233,169,252,78,145,168,235,74,24,247,211,117,43,189,217,79,21,69,178,254,112,97,173,187,245,209,161,70,249,255], [233,233,224,43,69,154,218,78,27,230,16,104,12,147,142,55,173,175,74,27,149,17,89,194,222,55,216,67,61,107,12,224], 258,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [3], [[157,98,240,58,97,125,49,1,17,245,174,148,176,2,238,1,176,98,148,108,62,72,53,75,229,146,22,177,106,102,187,140]], [2], [[230,131,143,139,105,186,181,26,152,174,238,124,141,167,206,76,128,49,92,2,193,252,191,168,133,57,93,213,45,46,86,208]], [[217,132,201,106,145,144,242,182,186,200,203,24,122,181,132,42,112,219,147,45,234,245,19,163,62,150,196,225,177,34,185,27]], 101, 21,{from: accounts[0]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [3], [[157,98,240,58,97,125,49,1,17,245,174,148,176,2,238,1,176,98,148,108,62,72,53,75,229,146,22,177,106,102,187,140]], [2], [[230,131,143,139,105,186,181,26,152,174,238,124,141,167,206,76,128,49,92,2,193,252,191,168,133,57,93,213,45,46,86,208]], [[217,132,201,106,145,144,242,182,186,200,203,24,122,181,132,42,112,219,147,45,234,245,19,163,62,150,196,225,177,34,185,27]], 101, 21,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [83,1337], [[157,98,240,58,97,125,49,1,17,245,174,148,176,2,238,1,176,98,148,108,62,72,53,75,229,146,22,177,106,102,187,140]], [2], [[230,131,143,139,105,186,181,26,152,174,238,124,141,167,206,76,128,49,92,2,193,252,191,168,133,57,93,213,45,46,86,208]], [[217,132,201,106,145,144,242,182,186,200,203,24,122,181,132,42,112,219,147,45,234,245,19,163,62,150,196,225,177,34,185,27]], 101, 21,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [999,1000], [[157,98,240,58,97,125,49,1,17,245,174,148,176,2,238,1,176,98,148,108,62,72,53,75,229,146,22,177,106,102,187,140]], [2], [[230,131,143,139,105,186,181,26,152,174,238,124,141,167,206,76,128,49,92,2,193,252,191,168,133,57,93,213,45,46,86,208]], [[217,132,201,106,145,144,242,182,186,200,203,24,122,181,132,42,112,219,147,45,234,245,19,163,62,150,196,225,177,34,185,27]], 101, 21,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [14,5], [[157,98,240,58,97,125,49,1,17,245,174,148,176,2,238,1,176,98,148,108,62,72,53,75,229,146,22,177,106,102,187,140]], [2], [[230,131,143,139,105,186,181,26,152,174,238,124,141,167,206,76,128,49,92,2,193,252,191,168,133,57,93,213,45,46,86,208]], [[217,132,201,106,145,144,242,182,186,200,203,24,122,181,132,42,112,219,147,45,234,245,19,163,62,150,196,225,177,34,185,27]], 101, 21,{from: accounts[0]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [5,1000], [[157,98,240,58,97,125,49,1,17,245,174,148,176,2,238,1,176,98,148,108,62,72,53,75,229,146,22,177,106,102,187,140]], [2], [[230,131,143,139,105,186,181,26,152,174,238,124,141,167,206,76,128,49,92,2,193,252,191,168,133,57,93,213,45,46,86,208]], [[217,132,201,106,145,144,242,182,186,200,203,24,122,181,132,42,112,219,147,45,234,245,19,163,62,150,196,225,177,34,185,27]], 101, 21,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 160, [70,213,250,62,106,167,132,76,23,34,189,129,202,152,104,149,115,64,248,123,215,59,39,108,153,255,159,39,87,3,124,224], 159, [138,144,115,210,19,90,233,188,183,150,154,110,160,126,73,42,34,208,204,197,171,180,228,176,78,39,203,72,144,30,59,202], [234,42,239,151,7,145,247,251,76,83,93,93,117,122,75,107,144,153,85,102,46,44,4,48,207,151,82,59,226,156,110,199], 0,{from: accounts[0]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 160, [70,213,250,62,106,167,132,76,23,34,189,129,202,152,104,149,115,64,248,123,215,59,39,108,153,255,159,39,87,3,124,224], 159, [138,144,115,210,19,90,233,188,183,150,154,110,160,126,73,42,34,208,204,197,171,180,228,176,78,39,203,72,144,30,59,202], [234,42,239,151,7,145,247,251,76,83,93,93,117,122,75,107,144,153,85,102,46,44,4,48,207,151,82,59,226,156,110,199], 0,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 160, [70,213,250,62,106,167,132,76,23,34,189,129,202,152,104,149,115,64,248,123,215,59,39,108,153,255,159,39,87,3,124,224], 159, [138,144,115,210,19,90,233,188,183,150,154,110,160,126,73,42,34,208,204,197,171,180,228,176,78,39,203,72,144,30,59,202], [234,42,239,151,7,145,247,251,76,83,93,93,117,122,75,107,144,153,85,102,46,44,4,48,207,151,82,59,226,156,110,199], 161,{from: accounts[0]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[5], 100,{from: accounts[0]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[5], 100,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[6], accounts[3], 6, [56,211,95,117,223,206,234,71,236,72,195,48,60,212,6,97,160,100,108,31,124,144,93,52,209,74,45,86,5,126,136,103], 15, [177,154,7,47,46,227,174,119,76,37,108,213,22,129,30,69,37,195,216,236,235,247,68,114,120,145,58,11,228,203,167,160], [246,229,234,121,182,114,5,116,158,204,125,232,230,65,85,193,2,141,54,201,131,114,148,47,59,168,180,22,17,170,244,164],{from: accounts[0]});
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
