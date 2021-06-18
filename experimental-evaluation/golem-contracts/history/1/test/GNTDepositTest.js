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
    contractGNTAllocation = await GNTAllocation.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[7],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[8],accounts[8],(await web3.eth.getBlockNumber())+836,(await web3.eth.getBlockNumber())+836+897,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[8],accounts[8],(await web3.eth.getBlockNumber())+836,(await web3.eth.getBlockNumber())+836+897,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[4],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[4],6,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[0],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[9],accounts[3],4,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[9],accounts[3],4,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[1],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[2],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[8],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[8],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[1], 4,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[6],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[6],{from: accounts[9]}),'revert');
  });
  it('Should fail transferConcent(address) when NOT comply with: _newConcent != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute transferColdwallet(address) WHEN msg.sender==_owner,_newColdwallet!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferColdwallet(accounts[6],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[6],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(18,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(18,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(100,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(100,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(1,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(1,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[3], 159, [123,183,147,195,11,40,230,34,142,49,137,199,90,53,77,181,167,250,87,205,213,165,51,251,42,189,212,138,20,63,61,158],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[6],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[6], 6,{from: accounts[9]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[6], 6,{from: accounts[8]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[6], 21,{from: accounts[9]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[6], 21,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[1], 81, [155,78,7,15,29,177,59,40,11,120,187,80,227,90,56,10,109,181,152,26,160,191,114,22,12,145,83,246,165,123,72,70], 3, [255,123,239,146,210,53,18,189,66,228,68,88,221,101,179,15,54,165,125,68,235,155,220,112,152,191,92,71,159,31,63,87], [37,20,124,206,27,179,75,152,160,254,61,8,205,79,226,22,204,36,89,38,33,252,97,65,100,243,237,82,19,96,52,255], 11,{from: accounts[9]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[1], 81, [155,78,7,15,29,177,59,40,11,120,187,80,227,90,56,10,109,181,152,26,160,191,114,22,12,145,83,246,165,123,72,70], 3, [255,123,239,146,210,53,18,189,66,228,68,88,221,101,179,15,54,165,125,68,235,155,220,112,152,191,92,71,159,31,63,87], [37,20,124,206,27,179,75,152,160,254,61,8,205,79,226,22,204,36,89,38,33,252,97,65,100,243,237,82,19,96,52,255], 11,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[1], 81, [155,78,7,15,29,177,59,40,11,120,187,80,227,90,56,10,109,181,152,26,160,191,114,22,12,145,83,246,165,123,72,70], 3, [255,123,239,146,210,53,18,189,66,228,68,88,221,101,179,15,54,165,125,68,235,155,220,112,152,191,92,71,159,31,63,87], [37,20,124,206,27,179,75,152,160,254,61,8,205,79,226,22,204,36,89,38,33,252,97,65,100,243,237,82,19,96,52,255], 82,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[6], [81], [[71,11,241,172,52,242,166,110,71,44,223,77,168,246,94,7,223,44,132,219,159,19,185,82,91,138,188,157,225,136,81,55]], [14], [[101,9,8,82,176,151,157,103,84,84,180,137,40,90,95,205,75,7,74,155,107,178,52,15,255,133,125,200,151,159,73,88]], [[146,75,124,117,42,153,205,45,241,57,194,241,220,139,224,193,4,104,151,98,206,252,11,2,100,106,218,63,217,105,227,166]], 16, 1338,{from: accounts[9]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[6], [81], [[71,11,241,172,52,242,166,110,71,44,223,77,168,246,94,7,223,44,132,219,159,19,185,82,91,138,188,157,225,136,81,55]], [14], [[101,9,8,82,176,151,157,103,84,84,180,137,40,90,95,205,75,7,74,155,107,178,52,15,255,133,125,200,151,159,73,88]], [[146,75,124,117,42,153,205,45,241,57,194,241,220,139,224,193,4,104,151,98,206,252,11,2,100,106,218,63,217,105,227,166]], 16, 1338,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[6], [1,100], [[71,11,241,172,52,242,166,110,71,44,223,77,168,246,94,7,223,44,132,219,159,19,185,82,91,138,188,157,225,136,81,55]], [14], [[101,9,8,82,176,151,157,103,84,84,180,137,40,90,95,205,75,7,74,155,107,178,52,15,255,133,125,200,151,159,73,88]], [[146,75,124,117,42,153,205,45,241,57,194,241,220,139,224,193,4,104,151,98,206,252,11,2,100,106,218,63,217,105,227,166]], 16, 1338,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[6], [1336,159], [[71,11,241,172,52,242,166,110,71,44,223,77,168,246,94,7,223,44,132,219,159,19,185,82,91,138,188,157,225,136,81,55]], [14], [[101,9,8,82,176,151,157,103,84,84,180,137,40,90,95,205,75,7,74,155,107,178,52,15,255,133,125,200,151,159,73,88]], [[146,75,124,117,42,153,205,45,241,57,194,241,220,139,224,193,4,104,151,98,206,252,11,2,100,106,218,63,217,105,227,166]], 16, 1338,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[6], [255,1336], [[71,11,241,172,52,242,166,110,71,44,223,77,168,246,94,7,223,44,132,219,159,19,185,82,91,138,188,157,225,136,81,55]], [14], [[101,9,8,82,176,151,157,103,84,84,180,137,40,90,95,205,75,7,74,155,107,178,52,15,255,133,125,200,151,159,73,88]], [[146,75,124,117,42,153,205,45,241,57,194,241,220,139,224,193,4,104,151,98,206,252,11,2,100,106,218,63,217,105,227,166]], 16, 1338,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[6], [9,1336], [[71,11,241,172,52,242,166,110,71,44,223,77,168,246,94,7,223,44,132,219,159,19,185,82,91,138,188,157,225,136,81,55]], [14], [[101,9,8,82,176,151,157,103,84,84,180,137,40,90,95,205,75,7,74,155,107,178,52,15,255,133,125,200,151,159,73,88]], [[146,75,124,117,42,153,205,45,241,57,194,241,220,139,224,193,4,104,151,98,206,252,11,2,100,106,218,63,217,105,227,166]], 16, 1338,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[2], 3, [20,167,9,143,253,200,112,225,99,88,198,93,188,250,99,34,22,78,12,66,33,58,11,102,156,88,38,240,14,126,29,160], 15, [187,31,167,9,64,84,76,83,85,62,127,82,150,54,243,167,193,106,74,156,5,240,120,8,52,222,3,116,149,121,0,160], [198,113,65,170,197,211,9,118,215,6,23,3,200,71,166,241,154,118,135,42,160,88,189,165,236,245,124,223,37,57,41,51], 3,{from: accounts[9]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[2], 3, [20,167,9,143,253,200,112,225,99,88,198,93,188,250,99,34,22,78,12,66,33,58,11,102,156,88,38,240,14,126,29,160], 15, [187,31,167,9,64,84,76,83,85,62,127,82,150,54,243,167,193,106,74,156,5,240,120,8,52,222,3,116,149,121,0,160], [198,113,65,170,197,211,9,118,215,6,23,3,200,71,166,241,154,118,135,42,160,88,189,165,236,245,124,223,37,57,41,51], 3,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[2], 3, [20,167,9,143,253,200,112,225,99,88,198,93,188,250,99,34,22,78,12,66,33,58,11,102,156,88,38,240,14,126,29,160], 15, [187,31,167,9,64,84,76,83,85,62,127,82,150,54,243,167,193,106,74,156,5,240,120,8,52,222,3,116,149,121,0,160], [198,113,65,170,197,211,9,118,215,6,23,3,200,71,166,241,154,118,135,42,160,88,189,165,236,245,124,223,37,57,41,51], 4,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[2], 4,{from: accounts[9]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[2], 4,{from: accounts[8]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[7], accounts[1], 10000, [161,238,165,183,23,166,18,94,29,165,147,178,138,196,228,114,238,224,140,178,6,216,2,12,0,83,36,44,214,22,88,7], 20, [96,82,31,151,75,39,84,184,143,20,79,35,59,50,19,207,251,199,36,80,78,185,175,180,198,248,125,195,29,242,25,157], [250,149,144,75,72,192,21,183,157,96,140,156,98,1,20,138,189,81,9,57,95,13,41,156,123,182,224,20,172,188,103,65],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[3],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
