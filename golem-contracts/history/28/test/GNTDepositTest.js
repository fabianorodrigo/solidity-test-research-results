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
    contractGNTAllocation = await GNTAllocation.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[7],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[2],accounts[7],(await web3.eth.getBlockNumber())+476,(await web3.eth.getBlockNumber())+476+725,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[2],accounts[7],(await web3.eth.getBlockNumber())+476,(await web3.eth.getBlockNumber())+476+725,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[4],17,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[4],17,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractGolemNetworkTokenBatching.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractGolemNetworkTokenBatching.address,accounts[2],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[2],14,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[2],14,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[2],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[6],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[4],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[9], 160,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[2],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[2],{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.setMaximumDepositsTotal(1338,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(1338,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(6,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(6,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(1336,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(1336,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[1], 11, [113,143,96,127,139,84,214,200,165,66,148,57,164,213,243,22,75,194,59,5,139,207,22,155,6,203,133,95,157,124,99,253],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[8],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[1], 15,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[1], 15,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[4], 19,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[4], 19,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[4], 17, [238,54,103,109,87,69,68,156,146,109,157,236,156,44,253,43,106,17,77,174,165,191,100,160,99,168,153,164,81,93,16,139], 1, [211,162,211,100,128,188,6,145,185,36,225,148,95,221,142,177,254,188,65,88,7,9,184,200,182,132,141,101,202,202,10,167], [11,30,229,101,226,150,114,230,196,132,50,140,75,227,146,148,233,117,103,219,16,90,57,186,90,133,199,228,88,184,255,118], 2,{from: accounts[8]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[4], 17, [238,54,103,109,87,69,68,156,146,109,157,236,156,44,253,43,106,17,77,174,165,191,100,160,99,168,153,164,81,93,16,139], 1, [211,162,211,100,128,188,6,145,185,36,225,148,95,221,142,177,254,188,65,88,7,9,184,200,182,132,141,101,202,202,10,167], [11,30,229,101,226,150,114,230,196,132,50,140,75,227,146,148,233,117,103,219,16,90,57,186,90,133,199,228,88,184,255,118], 2,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[4], 17, [238,54,103,109,87,69,68,156,146,109,157,236,156,44,253,43,106,17,77,174,165,191,100,160,99,168,153,164,81,93,16,139], 1, [211,162,211,100,128,188,6,145,185,36,225,148,95,221,142,177,254,188,65,88,7,9,184,200,182,132,141,101,202,202,10,167], [11,30,229,101,226,150,114,230,196,132,50,140,75,227,146,148,233,117,103,219,16,90,57,186,90,133,199,228,88,184,255,118], 18,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[2], accounts[0], [81,255], [[91,208,80,114,119,200,172,173,213,193,242,180,42,87,224,226,193,221,35,110,33,238,215,143,39,23,195,111,122,72,142,25],[129,162,238,142,119,50,159,216,211,227,115,78,180,133,113,123,252,73,192,216,9,21,243,223,224,253,155,54,129,193,183,205]], [101,1], [[103,96,30,135,165,3,13,220,144,107,111,24,49,39,117,249,72,17,163,35,238,58,33,58,197,119,86,101,20,151,11,81],[107,107,188,170,132,121,153,126,129,131,91,103,246,174,31,49,153,91,139,123,23,244,231,166,39,232,84,42,185,112,125,9]], [[14,230,77,185,11,17,26,56,218,42,48,158,213,208,8,75,7,227,117,213,123,147,112,139,145,231,223,56,194,159,93,55],[8,124,33,24,209,224,103,59,108,45,202,195,15,147,229,7,107,20,240,95,210,217,179,178,117,197,160,252,177,241,136,47]], 255, 10001,{from: accounts[8]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[2], accounts[0], [81,255], [[91,208,80,114,119,200,172,173,213,193,242,180,42,87,224,226,193,221,35,110,33,238,215,143,39,23,195,111,122,72,142,25],[129,162,238,142,119,50,159,216,211,227,115,78,180,133,113,123,252,73,192,216,9,21,243,223,224,253,155,54,129,193,183,205]], [101,1], [[103,96,30,135,165,3,13,220,144,107,111,24,49,39,117,249,72,17,163,35,238,58,33,58,197,119,86,101,20,151,11,81],[107,107,188,170,132,121,153,126,129,131,91,103,246,174,31,49,153,91,139,123,23,244,231,166,39,232,84,42,185,112,125,9]], [[14,230,77,185,11,17,26,56,218,42,48,158,213,208,8,75,7,227,117,213,123,147,112,139,145,231,223,56,194,159,93,55],[8,124,33,24,209,224,103,59,108,45,202,195,15,147,229,7,107,20,240,95,210,217,179,178,117,197,160,252,177,241,136,47]], 255, 10001,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[2], accounts[0], [19,1336,2], [[91,208,80,114,119,200,172,173,213,193,242,180,42,87,224,226,193,221,35,110,33,238,215,143,39,23,195,111,122,72,142,25],[129,162,238,142,119,50,159,216,211,227,115,78,180,133,113,123,252,73,192,216,9,21,243,223,224,253,155,54,129,193,183,205]], [101,1], [[103,96,30,135,165,3,13,220,144,107,111,24,49,39,117,249,72,17,163,35,238,58,33,58,197,119,86,101,20,151,11,81],[107,107,188,170,132,121,153,126,129,131,91,103,246,174,31,49,153,91,139,123,23,244,231,166,39,232,84,42,185,112,125,9]], [[14,230,77,185,11,17,26,56,218,42,48,158,213,208,8,75,7,227,117,213,123,147,112,139,145,231,223,56,194,159,93,55],[8,124,33,24,209,224,103,59,108,45,202,195,15,147,229,7,107,20,240,95,210,217,179,178,117,197,160,252,177,241,136,47]], 255, 10001,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[2], accounts[0], [5,161,160], [[91,208,80,114,119,200,172,173,213,193,242,180,42,87,224,226,193,221,35,110,33,238,215,143,39,23,195,111,122,72,142,25],[129,162,238,142,119,50,159,216,211,227,115,78,180,133,113,123,252,73,192,216,9,21,243,223,224,253,155,54,129,193,183,205]], [101,1], [[103,96,30,135,165,3,13,220,144,107,111,24,49,39,117,249,72,17,163,35,238,58,33,58,197,119,86,101,20,151,11,81],[107,107,188,170,132,121,153,126,129,131,91,103,246,174,31,49,153,91,139,123,23,244,231,166,39,232,84,42,185,112,125,9]], [[14,230,77,185,11,17,26,56,218,42,48,158,213,208,8,75,7,227,117,213,123,147,112,139,145,231,223,56,194,159,93,55],[8,124,33,24,209,224,103,59,108,45,202,195,15,147,229,7,107,20,240,95,210,217,179,178,117,197,160,252,177,241,136,47]], 255, 10001,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[2], accounts[0], [14,19,14], [[91,208,80,114,119,200,172,173,213,193,242,180,42,87,224,226,193,221,35,110,33,238,215,143,39,23,195,111,122,72,142,25],[129,162,238,142,119,50,159,216,211,227,115,78,180,133,113,123,252,73,192,216,9,21,243,223,224,253,155,54,129,193,183,205]], [101,1], [[103,96,30,135,165,3,13,220,144,107,111,24,49,39,117,249,72,17,163,35,238,58,33,58,197,119,86,101,20,151,11,81],[107,107,188,170,132,121,153,126,129,131,91,103,246,174,31,49,153,91,139,123,23,244,231,166,39,232,84,42,185,112,125,9]], [[14,230,77,185,11,17,26,56,218,42,48,158,213,208,8,75,7,227,117,213,123,147,112,139,145,231,223,56,194,159,93,55],[8,124,33,24,209,224,103,59,108,45,202,195,15,147,229,7,107,20,240,95,210,217,179,178,117,197,160,252,177,241,136,47]], 255, 10001,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[2], accounts[0], [1000,1001,18], [[91,208,80,114,119,200,172,173,213,193,242,180,42,87,224,226,193,221,35,110,33,238,215,143,39,23,195,111,122,72,142,25],[129,162,238,142,119,50,159,216,211,227,115,78,180,133,113,123,252,73,192,216,9,21,243,223,224,253,155,54,129,193,183,205]], [101,1], [[103,96,30,135,165,3,13,220,144,107,111,24,49,39,117,249,72,17,163,35,238,58,33,58,197,119,86,101,20,151,11,81],[107,107,188,170,132,121,153,126,129,131,91,103,246,174,31,49,153,91,139,123,23,244,231,166,39,232,84,42,185,112,125,9]], [[14,230,77,185,11,17,26,56,218,42,48,158,213,208,8,75,7,227,117,213,123,147,112,139,145,231,223,56,194,159,93,55],[8,124,33,24,209,224,103,59,108,45,202,195,15,147,229,7,107,20,240,95,210,217,179,178,117,197,160,252,177,241,136,47]], 255, 10001,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 1336, [104,106,208,220,208,180,180,155,57,233,192,215,54,247,176,170,237,174,74,115,250,205,234,251,96,178,12,136,14,7,250,153], 14, [75,154,62,127,192,103,190,72,246,190,14,24,234,85,14,51,217,79,222,193,108,150,226,90,39,240,82,99,244,94,19,234], [32,4,144,112,241,255,73,170,74,145,166,106,239,136,154,157,162,95,141,81,212,142,13,115,44,73,73,77,160,195,246,169], 999,{from: accounts[8]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 1336, [104,106,208,220,208,180,180,155,57,233,192,215,54,247,176,170,237,174,74,115,250,205,234,251,96,178,12,136,14,7,250,153], 14, [75,154,62,127,192,103,190,72,246,190,14,24,234,85,14,51,217,79,222,193,108,150,226,90,39,240,82,99,244,94,19,234], [32,4,144,112,241,255,73,170,74,145,166,106,239,136,154,157,162,95,141,81,212,142,13,115,44,73,73,77,160,195,246,169], 999,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 1336, [104,106,208,220,208,180,180,155,57,233,192,215,54,247,176,170,237,174,74,115,250,205,234,251,96,178,12,136,14,7,250,153], 14, [75,154,62,127,192,103,190,72,246,190,14,24,234,85,14,51,217,79,222,193,108,150,226,90,39,240,82,99,244,94,19,234], [32,4,144,112,241,255,73,170,74,145,166,106,239,136,154,157,162,95,141,81,212,142,13,115,44,73,73,77,160,195,246,169], 1337,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[7], 17,{from: accounts[8]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[7], 17,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[9], accounts[8], 83, [4,244,63,30,142,24,160,9,30,24,177,233,114,232,106,76,69,82,117,50,128,146,236,115,255,95,100,229,159,247,63,148], 19, [234,178,172,61,3,151,164,123,255,126,148,89,141,141,117,177,23,249,113,3,94,205,53,81,89,250,70,2,133,193,52,210], [201,214,56,200,110,25,88,17,175,1,165,149,244,155,246,110,110,6,247,246,239,204,93,90,14,3,235,105,230,89,136,48],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[8],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
