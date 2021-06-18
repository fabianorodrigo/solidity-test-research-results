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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[2],accounts[7],(await web3.eth.getBlockNumber())+90,(await web3.eth.getBlockNumber())+90+745,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[2],accounts[7],(await web3.eth.getBlockNumber())+90,(await web3.eth.getBlockNumber())+90+745,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],83,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],83,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[1],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[5],accounts[4],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[5],accounts[4],10000,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[7],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[8],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[3], 257,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[1],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(256,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(256,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(255,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(255,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(1338,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(1338,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[6], 3, [66,157,69,49,231,179,47,223,85,172,85,202,75,139,108,69,231,60,13,105,71,1,249,61,71,173,70,31,17,96,190,185],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[9],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[3], 1000,{from: accounts[5]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[3], 1000,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[9], 1,{from: accounts[5]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[9], 1,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[6], 1337, [208,242,153,167,83,71,14,52,230,97,109,96,48,191,126,108,140,153,198,8,77,193,171,156,190,35,201,225,114,185,101,32], 10, [79,74,67,159,46,116,185,249,19,111,202,136,186,10,240,207,93,177,114,3,217,103,114,155,117,151,108,190,39,110,157,96], [208,29,147,97,215,249,104,141,231,49,70,253,174,153,25,207,147,122,254,31,144,130,227,78,219,8,146,252,2,231,135,82], 1000,{from: accounts[5]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[6], 1337, [208,242,153,167,83,71,14,52,230,97,109,96,48,191,126,108,140,153,198,8,77,193,171,156,190,35,201,225,114,185,101,32], 10, [79,74,67,159,46,116,185,249,19,111,202,136,186,10,240,207,93,177,114,3,217,103,114,155,117,151,108,190,39,110,157,96], [208,29,147,97,215,249,104,141,231,49,70,253,174,153,25,207,147,122,254,31,144,130,227,78,219,8,146,252,2,231,135,82], 1000,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[6], 1337, [208,242,153,167,83,71,14,52,230,97,109,96,48,191,126,108,140,153,198,8,77,193,171,156,190,35,201,225,114,185,101,32], 10, [79,74,67,159,46,116,185,249,19,111,202,136,186,10,240,207,93,177,114,3,217,103,114,155,117,151,108,190,39,110,157,96], [208,29,147,97,215,249,104,141,231,49,70,253,174,153,25,207,147,122,254,31,144,130,227,78,219,8,146,252,2,231,135,82], 1338,{from: accounts[5]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[0], [1000,999], [[183,13,127,218,162,121,15,179,194,104,201,160,151,34,143,64,209,80,177,209,232,174,15,57,141,48,136,119,254,28,91,40],[9,68,180,120,124,224,32,187,62,156,253,164,105,32,197,0,18,114,68,175,133,239,227,200,43,216,50,94,74,195,16,240]], [16,81], [[106,235,220,170,83,18,178,164,118,86,29,176,118,106,244,173,215,89,203,19,198,5,24,188,130,13,93,88,127,30,26,91],[140,156,48,76,68,197,136,103,7,84,152,177,173,129,168,45,172,186,81,244,186,109,75,64,103,182,227,237,50,181,141,199]], [[231,164,211,66,233,32,165,144,84,223,115,26,180,1,31,169,71,26,57,65,178,214,92,50,17,13,114,207,252,11,70,65],[186,160,66,30,218,53,0,176,4,91,224,38,103,177,162,182,8,31,30,225,119,202,136,229,180,86,7,121,100,148,210,71]], 1338, 14,{from: accounts[5]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[0], [1000,999], [[183,13,127,218,162,121,15,179,194,104,201,160,151,34,143,64,209,80,177,209,232,174,15,57,141,48,136,119,254,28,91,40],[9,68,180,120,124,224,32,187,62,156,253,164,105,32,197,0,18,114,68,175,133,239,227,200,43,216,50,94,74,195,16,240]], [16,81], [[106,235,220,170,83,18,178,164,118,86,29,176,118,106,244,173,215,89,203,19,198,5,24,188,130,13,93,88,127,30,26,91],[140,156,48,76,68,197,136,103,7,84,152,177,173,129,168,45,172,186,81,244,186,109,75,64,103,182,227,237,50,181,141,199]], [[231,164,211,66,233,32,165,144,84,223,115,26,180,1,31,169,71,26,57,65,178,214,92,50,17,13,114,207,252,11,70,65],[186,160,66,30,218,53,0,176,4,91,224,38,103,177,162,182,8,31,30,225,119,202,136,229,180,86,7,121,100,148,210,71]], 1338, 14,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[0], [5,6,19], [[183,13,127,218,162,121,15,179,194,104,201,160,151,34,143,64,209,80,177,209,232,174,15,57,141,48,136,119,254,28,91,40],[9,68,180,120,124,224,32,187,62,156,253,164,105,32,197,0,18,114,68,175,133,239,227,200,43,216,50,94,74,195,16,240]], [16,81], [[106,235,220,170,83,18,178,164,118,86,29,176,118,106,244,173,215,89,203,19,198,5,24,188,130,13,93,88,127,30,26,91],[140,156,48,76,68,197,136,103,7,84,152,177,173,129,168,45,172,186,81,244,186,109,75,64,103,182,227,237,50,181,141,199]], [[231,164,211,66,233,32,165,144,84,223,115,26,180,1,31,169,71,26,57,65,178,214,92,50,17,13,114,207,252,11,70,65],[186,160,66,30,218,53,0,176,4,91,224,38,103,177,162,182,8,31,30,225,119,202,136,229,180,86,7,121,100,148,210,71]], 1338, 14,{from: accounts[5]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[0], [0,2,1001], [[183,13,127,218,162,121,15,179,194,104,201,160,151,34,143,64,209,80,177,209,232,174,15,57,141,48,136,119,254,28,91,40],[9,68,180,120,124,224,32,187,62,156,253,164,105,32,197,0,18,114,68,175,133,239,227,200,43,216,50,94,74,195,16,240]], [16,81], [[106,235,220,170,83,18,178,164,118,86,29,176,118,106,244,173,215,89,203,19,198,5,24,188,130,13,93,88,127,30,26,91],[140,156,48,76,68,197,136,103,7,84,152,177,173,129,168,45,172,186,81,244,186,109,75,64,103,182,227,237,50,181,141,199]], [[231,164,211,66,233,32,165,144,84,223,115,26,180,1,31,169,71,26,57,65,178,214,92,50,17,13,114,207,252,11,70,65],[186,160,66,30,218,53,0,176,4,91,224,38,103,177,162,182,8,31,30,225,119,202,136,229,180,86,7,121,100,148,210,71]], 1338, 14,{from: accounts[5]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[0], [14,159,100], [[183,13,127,218,162,121,15,179,194,104,201,160,151,34,143,64,209,80,177,209,232,174,15,57,141,48,136,119,254,28,91,40],[9,68,180,120,124,224,32,187,62,156,253,164,105,32,197,0,18,114,68,175,133,239,227,200,43,216,50,94,74,195,16,240]], [16,81], [[106,235,220,170,83,18,178,164,118,86,29,176,118,106,244,173,215,89,203,19,198,5,24,188,130,13,93,88,127,30,26,91],[140,156,48,76,68,197,136,103,7,84,152,177,173,129,168,45,172,186,81,244,186,109,75,64,103,182,227,237,50,181,141,199]], [[231,164,211,66,233,32,165,144,84,223,115,26,180,1,31,169,71,26,57,65,178,214,92,50,17,13,114,207,252,11,70,65],[186,160,66,30,218,53,0,176,4,91,224,38,103,177,162,182,8,31,30,225,119,202,136,229,180,86,7,121,100,148,210,71]], 1338, 14,{from: accounts[5]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[0], [161,21,20], [[183,13,127,218,162,121,15,179,194,104,201,160,151,34,143,64,209,80,177,209,232,174,15,57,141,48,136,119,254,28,91,40],[9,68,180,120,124,224,32,187,62,156,253,164,105,32,197,0,18,114,68,175,133,239,227,200,43,216,50,94,74,195,16,240]], [16,81], [[106,235,220,170,83,18,178,164,118,86,29,176,118,106,244,173,215,89,203,19,198,5,24,188,130,13,93,88,127,30,26,91],[140,156,48,76,68,197,136,103,7,84,152,177,173,129,168,45,172,186,81,244,186,109,75,64,103,182,227,237,50,181,141,199]], [[231,164,211,66,233,32,165,144,84,223,115,26,180,1,31,169,71,26,57,65,178,214,92,50,17,13,114,207,252,11,70,65],[186,160,66,30,218,53,0,176,4,91,224,38,103,177,162,182,8,31,30,225,119,202,136,229,180,86,7,121,100,148,210,71]], 1338, 14,{from: accounts[5]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 11, [147,253,91,106,161,61,6,147,177,32,122,104,190,52,0,87,220,122,221,31,146,159,106,165,133,164,117,214,197,231,80,115], 3, [102,63,131,240,74,222,46,54,91,140,218,130,108,114,176,15,93,9,133,67,66,97,145,110,161,31,2,173,188,128,126,165], [148,79,112,160,233,164,180,60,53,120,21,215,163,226,87,241,232,136,211,5,149,214,141,239,169,136,170,87,28,20,238,175], 1,{from: accounts[5]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 11, [147,253,91,106,161,61,6,147,177,32,122,104,190,52,0,87,220,122,221,31,146,159,106,165,133,164,117,214,197,231,80,115], 3, [102,63,131,240,74,222,46,54,91,140,218,130,108,114,176,15,93,9,133,67,66,97,145,110,161,31,2,173,188,128,126,165], [148,79,112,160,233,164,180,60,53,120,21,215,163,226,87,241,232,136,211,5,149,214,141,239,169,136,170,87,28,20,238,175], 1,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 11, [147,253,91,106,161,61,6,147,177,32,122,104,190,52,0,87,220,122,221,31,146,159,106,165,133,164,117,214,197,231,80,115], 3, [102,63,131,240,74,222,46,54,91,140,218,130,108,114,176,15,93,9,133,67,66,97,145,110,161,31,2,173,188,128,126,165], [148,79,112,160,233,164,180,60,53,120,21,215,163,226,87,241,232,136,211,5,149,214,141,239,169,136,170,87,28,20,238,175], 12,{from: accounts[5]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[2], 160,{from: accounts[5]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[2], 160,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[3], accounts[7], 1000, [14,129,204,45,210,252,210,57,165,152,203,190,54,255,52,247,240,47,21,230,66,218,52,36,51,200,211,58,17,126,31,45], 11, [157,171,173,202,252,245,160,175,184,247,117,63,54,237,74,139,109,102,111,184,57,73,2,233,222,192,84,192,125,253,83,35], [199,248,69,134,161,253,154,129,156,44,159,2,183,9,47,179,70,243,233,53,89,254,41,26,48,135,11,200,211,63,39,178],{from: accounts[0]});
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
