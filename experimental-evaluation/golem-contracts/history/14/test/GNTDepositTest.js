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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[6],accounts[9],(await web3.eth.getBlockNumber())+442,(await web3.eth.getBlockNumber())+442+408,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[6],accounts[9],(await web3.eth.getBlockNumber())+442,(await web3.eth.getBlockNumber())+442+408,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[8],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[8],1337,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[9],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[0],5,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[0],5,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[2],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[2],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[7],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[0],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[1], 21,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[6],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[6],{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.setMaximumDepositAmount(159,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(159,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(256,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(256,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[5], 17, [145,220,21,64,164,49,42,96,130,53,239,188,71,173,81,220,23,90,75,101,133,114,205,149,238,109,4,133,192,75,239,72],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[3],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[8], 17,{from: accounts[7]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[8], 17,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[6], 9999,{from: accounts[7]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[6], 9999,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[4], 9999, [120,167,9,196,120,226,170,167,233,201,105,185,12,20,8,117,242,13,101,3,166,88,69,40,12,107,0,98,175,105,85,178], 161, [105,157,43,235,125,123,144,178,37,44,118,125,21,155,84,187,22,232,122,218,111,52,193,61,147,172,255,231,117,131,66,237], [65,169,178,202,146,14,243,122,52,208,225,228,148,165,46,187,122,237,128,109,130,114,101,232,103,207,237,84,219,208,92,99], 161,{from: accounts[7]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[4], 9999, [120,167,9,196,120,226,170,167,233,201,105,185,12,20,8,117,242,13,101,3,166,88,69,40,12,107,0,98,175,105,85,178], 161, [105,157,43,235,125,123,144,178,37,44,118,125,21,155,84,187,22,232,122,218,111,52,193,61,147,172,255,231,117,131,66,237], [65,169,178,202,146,14,243,122,52,208,225,228,148,165,46,187,122,237,128,109,130,114,101,232,103,207,237,84,219,208,92,99], 161,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[4], 9999, [120,167,9,196,120,226,170,167,233,201,105,185,12,20,8,117,242,13,101,3,166,88,69,40,12,107,0,98,175,105,85,178], 161, [105,157,43,235,125,123,144,178,37,44,118,125,21,155,84,187,22,232,122,218,111,52,193,61,147,172,255,231,117,131,66,237], [65,169,178,202,146,14,243,122,52,208,225,228,148,165,46,187,122,237,128,109,130,114,101,232,103,207,237,84,219,208,92,99], 10000,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [257], [[77,140,105,222,141,150,40,183,230,136,5,83,45,156,70,73,159,99,221,238,128,169,167,76,216,20,138,74,84,103,26,167]], [0], [[219,40,116,184,170,195,90,231,193,170,237,229,223,60,70,82,69,74,131,70,251,115,76,220,41,31,236,100,18,135,171,33]], [[212,206,227,175,217,122,62,231,8,131,131,130,77,71,165,220,38,206,195,77,162,216,24,192,12,212,183,129,224,203,173,57]], 15, 1338,{from: accounts[7]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [257], [[77,140,105,222,141,150,40,183,230,136,5,83,45,156,70,73,159,99,221,238,128,169,167,76,216,20,138,74,84,103,26,167]], [0], [[219,40,116,184,170,195,90,231,193,170,237,229,223,60,70,82,69,74,131,70,251,115,76,220,41,31,236,100,18,135,171,33]], [[212,206,227,175,217,122,62,231,8,131,131,130,77,71,165,220,38,206,195,77,162,216,24,192,12,212,183,129,224,203,173,57]], 15, 1338,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [99,1], [[77,140,105,222,141,150,40,183,230,136,5,83,45,156,70,73,159,99,221,238,128,169,167,76,216,20,138,74,84,103,26,167]], [0], [[219,40,116,184,170,195,90,231,193,170,237,229,223,60,70,82,69,74,131,70,251,115,76,220,41,31,236,100,18,135,171,33]], [[212,206,227,175,217,122,62,231,8,131,131,130,77,71,165,220,38,206,195,77,162,216,24,192,12,212,183,129,224,203,173,57]], 15, 1338,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [101,100], [[77,140,105,222,141,150,40,183,230,136,5,83,45,156,70,73,159,99,221,238,128,169,167,76,216,20,138,74,84,103,26,167]], [0], [[219,40,116,184,170,195,90,231,193,170,237,229,223,60,70,82,69,74,131,70,251,115,76,220,41,31,236,100,18,135,171,33]], [[212,206,227,175,217,122,62,231,8,131,131,130,77,71,165,220,38,206,195,77,162,216,24,192,12,212,183,129,224,203,173,57]], 15, 1338,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [1000,4], [[77,140,105,222,141,150,40,183,230,136,5,83,45,156,70,73,159,99,221,238,128,169,167,76,216,20,138,74,84,103,26,167]], [0], [[219,40,116,184,170,195,90,231,193,170,237,229,223,60,70,82,69,74,131,70,251,115,76,220,41,31,236,100,18,135,171,33]], [[212,206,227,175,217,122,62,231,8,131,131,130,77,71,165,220,38,206,195,77,162,216,24,192,12,212,183,129,224,203,173,57]], 15, 1338,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [255,16], [[77,140,105,222,141,150,40,183,230,136,5,83,45,156,70,73,159,99,221,238,128,169,167,76,216,20,138,74,84,103,26,167]], [0], [[219,40,116,184,170,195,90,231,193,170,237,229,223,60,70,82,69,74,131,70,251,115,76,220,41,31,236,100,18,135,171,33]], [[212,206,227,175,217,122,62,231,8,131,131,130,77,71,165,220,38,206,195,77,162,216,24,192,12,212,183,129,224,203,173,57]], 15, 1338,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 0, [70,208,187,16,171,200,46,85,66,99,6,173,189,86,49,170,110,155,148,191,131,17,128,209,5,10,121,65,156,94,246,84], 16, [69,100,94,108,86,255,69,175,7,95,112,188,172,24,88,64,185,130,199,243,187,135,92,25,48,80,148,8,203,183,231,73], [40,151,225,43,100,147,246,63,205,2,58,168,57,128,93,92,119,235,91,175,232,185,150,28,207,133,112,4,179,120,199,181], 0,{from: accounts[7]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 0, [70,208,187,16,171,200,46,85,66,99,6,173,189,86,49,170,110,155,148,191,131,17,128,209,5,10,121,65,156,94,246,84], 16, [69,100,94,108,86,255,69,175,7,95,112,188,172,24,88,64,185,130,199,243,187,135,92,25,48,80,148,8,203,183,231,73], [40,151,225,43,100,147,246,63,205,2,58,168,57,128,93,92,119,235,91,175,232,185,150,28,207,133,112,4,179,120,199,181], 0,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[7], 0, [70,208,187,16,171,200,46,85,66,99,6,173,189,86,49,170,110,155,148,191,131,17,128,209,5,10,121,65,156,94,246,84], 16, [69,100,94,108,86,255,69,175,7,95,112,188,172,24,88,64,185,130,199,243,187,135,92,25,48,80,148,8,203,183,231,73], [40,151,225,43,100,147,246,63,205,2,58,168,57,128,93,92,119,235,91,175,232,185,150,28,207,133,112,4,179,120,199,181], 1,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[5], 161,{from: accounts[7]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[5], 161,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[9], accounts[0], 19, [52,39,188,81,45,6,184,187,144,58,196,35,80,196,166,241,50,7,80,81,32,190,108,95,96,137,49,197,176,77,87,18], 255, [202,89,130,84,7,121,147,116,34,186,115,210,229,5,238,22,121,205,190,73,147,189,88,18,182,63,172,7,166,26,119,140], [81,14,177,69,187,195,198,204,161,166,109,239,90,129,117,80,193,71,169,239,175,230,154,186,112,150,245,150,49,36,48,224],{from: accounts[0]});
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
