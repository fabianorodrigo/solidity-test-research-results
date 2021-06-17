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
  let contractGolemNetworkTokenBatching = null;
  let contractTokenProxy = null;
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
    contractGNTAllocation = await GNTAllocation.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[5],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[0],accounts[3],(await web3.eth.getBlockNumber())+428,(await web3.eth.getBlockNumber())+428+665,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[0],accounts[3],(await web3.eth.getBlockNumber())+428,(await web3.eth.getBlockNumber())+428+665,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[5],256,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[5],256,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[0],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[3],2,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[3],2,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[2],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[8],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[7],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[8], 6,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[2],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[2],{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.setMaximumDepositAmount(15,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(15,{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.onTokenReceived(accounts[7], 14, [216,196,240,106,32,21,213,232,230,129,177,216,252,33,213,238,175,69,232,232,170,136,91,209,67,194,109,163,223,30,43,109],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[0],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[4], 1338,{from: accounts[2]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[4], 1338,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[2], 9,{from: accounts[2]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[2], 9,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[8], 10000, [122,60,100,199,117,64,104,202,206,252,205,170,246,130,102,118,71,224,136,241,218,173,72,39,10,240,145,21,105,57,238,114], 5, [26,6,237,186,197,100,180,124,117,77,212,17,223,70,250,34,179,60,135,155,22,73,136,209,177,2,190,170,196,72,245,226], [177,53,143,205,227,161,162,124,98,155,16,219,241,95,1,10,221,155,13,78,148,193,235,228,29,101,36,32,29,163,210,83], 21,{from: accounts[2]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[8], 10000, [122,60,100,199,117,64,104,202,206,252,205,170,246,130,102,118,71,224,136,241,218,173,72,39,10,240,145,21,105,57,238,114], 5, [26,6,237,186,197,100,180,124,117,77,212,17,223,70,250,34,179,60,135,155,22,73,136,209,177,2,190,170,196,72,245,226], [177,53,143,205,227,161,162,124,98,155,16,219,241,95,1,10,221,155,13,78,148,193,235,228,29,101,36,32,29,163,210,83], 21,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[8], accounts[8], 10000, [122,60,100,199,117,64,104,202,206,252,205,170,246,130,102,118,71,224,136,241,218,173,72,39,10,240,145,21,105,57,238,114], 5, [26,6,237,186,197,100,180,124,117,77,212,17,223,70,250,34,179,60,135,155,22,73,136,209,177,2,190,170,196,72,245,226], [177,53,143,205,227,161,162,124,98,155,16,219,241,95,1,10,221,155,13,78,148,193,235,228,29,101,36,32,29,163,210,83], 10001,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [21,4,1000,83,82,1001], [[23,244,117,98,126,222,8,139,70,44,183,169,187,80,24,101,138,223,208,29,96,63,199,139,93,64,16,212,0,166,72,56],[230,103,148,88,58,83,237,192,170,70,119,191,247,221,41,102,251,228,26,229,119,46,101,205,56,103,181,65,44,161,152,141],[153,22,183,227,70,125,223,59,15,80,72,61,188,131,61,189,138,36,228,27,250,123,45,33,177,52,80,66,49,156,172,67],[4,212,123,216,53,113,248,103,175,60,194,28,44,247,43,31,250,63,91,45,187,55,0,249,171,73,72,230,201,232,215,112],[178,233,254,134,157,188,89,214,199,253,78,178,17,28,85,28,154,21,154,66,239,114,23,147,82,0,82,19,191,186,43,65],[111,255,84,241,212,129,133,44,67,18,49,164,71,65,244,62,94,101,105,49,191,94,45,62,235,131,99,218,77,169,110,130]], [11,81,101,160,21,5], [[8,19,240,67,249,30,98,78,164,88,191,78,104,37,66,236,29,249,238,133,215,175,78,166,110,137,177,57,248,235,1,124],[206,243,214,238,254,7,62,89,203,235,199,65,238,102,135,224,180,105,229,119,56,15,139,85,23,15,149,176,75,239,220,123],[197,69,189,252,18,136,67,142,70,131,234,19,103,61,123,1,226,68,107,254,37,240,95,108,100,244,206,13,116,172,25,104],[2,108,27,173,81,184,13,170,84,211,106,149,191,217,207,71,106,18,68,5,76,228,157,51,220,167,142,160,142,222,194,170],[198,133,118,220,66,55,21,20,66,165,210,207,206,16,150,27,202,124,1,59,25,36,103,174,241,228,190,20,129,48,142,117],[188,225,127,205,132,52,170,57,188,238,118,178,8,30,74,53,60,254,12,238,33,157,17,69,132,125,46,215,218,131,157,47]], [[191,208,211,141,225,210,21,14,246,191,214,16,230,219,113,213,189,3,126,165,190,186,228,172,49,113,250,210,127,73,130,189],[75,103,77,88,47,88,219,224,90,42,116,87,165,49,118,125,114,2,225,68,189,187,193,35,120,239,158,234,53,221,17,155],[52,32,230,174,105,78,255,115,141,87,15,46,56,221,225,92,43,71,23,252,217,112,93,40,109,125,211,50,141,162,142,17],[201,188,40,76,85,159,246,248,56,216,24,9,242,99,222,229,58,220,136,170,190,73,107,105,238,253,165,196,88,13,113,35],[90,94,25,230,4,120,44,198,246,232,85,228,218,249,116,237,131,40,175,9,85,42,58,78,127,52,68,122,215,27,58,128],[87,88,18,252,36,173,212,23,222,70,73,86,115,164,83,236,41,248,51,239,36,137,221,4,120,111,28,67,45,204,104,22]], 20, 100,{from: accounts[2]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [21,4,1000,83,82,1001], [[23,244,117,98,126,222,8,139,70,44,183,169,187,80,24,101,138,223,208,29,96,63,199,139,93,64,16,212,0,166,72,56],[230,103,148,88,58,83,237,192,170,70,119,191,247,221,41,102,251,228,26,229,119,46,101,205,56,103,181,65,44,161,152,141],[153,22,183,227,70,125,223,59,15,80,72,61,188,131,61,189,138,36,228,27,250,123,45,33,177,52,80,66,49,156,172,67],[4,212,123,216,53,113,248,103,175,60,194,28,44,247,43,31,250,63,91,45,187,55,0,249,171,73,72,230,201,232,215,112],[178,233,254,134,157,188,89,214,199,253,78,178,17,28,85,28,154,21,154,66,239,114,23,147,82,0,82,19,191,186,43,65],[111,255,84,241,212,129,133,44,67,18,49,164,71,65,244,62,94,101,105,49,191,94,45,62,235,131,99,218,77,169,110,130]], [11,81,101,160,21,5], [[8,19,240,67,249,30,98,78,164,88,191,78,104,37,66,236,29,249,238,133,215,175,78,166,110,137,177,57,248,235,1,124],[206,243,214,238,254,7,62,89,203,235,199,65,238,102,135,224,180,105,229,119,56,15,139,85,23,15,149,176,75,239,220,123],[197,69,189,252,18,136,67,142,70,131,234,19,103,61,123,1,226,68,107,254,37,240,95,108,100,244,206,13,116,172,25,104],[2,108,27,173,81,184,13,170,84,211,106,149,191,217,207,71,106,18,68,5,76,228,157,51,220,167,142,160,142,222,194,170],[198,133,118,220,66,55,21,20,66,165,210,207,206,16,150,27,202,124,1,59,25,36,103,174,241,228,190,20,129,48,142,117],[188,225,127,205,132,52,170,57,188,238,118,178,8,30,74,53,60,254,12,238,33,157,17,69,132,125,46,215,218,131,157,47]], [[191,208,211,141,225,210,21,14,246,191,214,16,230,219,113,213,189,3,126,165,190,186,228,172,49,113,250,210,127,73,130,189],[75,103,77,88,47,88,219,224,90,42,116,87,165,49,118,125,114,2,225,68,189,187,193,35,120,239,158,234,53,221,17,155],[52,32,230,174,105,78,255,115,141,87,15,46,56,221,225,92,43,71,23,252,217,112,93,40,109,125,211,50,141,162,142,17],[201,188,40,76,85,159,246,248,56,216,24,9,242,99,222,229,58,220,136,170,190,73,107,105,238,253,165,196,88,13,113,35],[90,94,25,230,4,120,44,198,246,232,85,228,218,249,116,237,131,40,175,9,85,42,58,78,127,52,68,122,215,27,58,128],[87,88,18,252,36,173,212,23,222,70,73,86,115,164,83,236,41,248,51,239,36,137,221,4,120,111,28,67,45,204,104,22]], 20, 100,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [2,10000,255,1000,255,255,100], [[23,244,117,98,126,222,8,139,70,44,183,169,187,80,24,101,138,223,208,29,96,63,199,139,93,64,16,212,0,166,72,56],[230,103,148,88,58,83,237,192,170,70,119,191,247,221,41,102,251,228,26,229,119,46,101,205,56,103,181,65,44,161,152,141],[153,22,183,227,70,125,223,59,15,80,72,61,188,131,61,189,138,36,228,27,250,123,45,33,177,52,80,66,49,156,172,67],[4,212,123,216,53,113,248,103,175,60,194,28,44,247,43,31,250,63,91,45,187,55,0,249,171,73,72,230,201,232,215,112],[178,233,254,134,157,188,89,214,199,253,78,178,17,28,85,28,154,21,154,66,239,114,23,147,82,0,82,19,191,186,43,65],[111,255,84,241,212,129,133,44,67,18,49,164,71,65,244,62,94,101,105,49,191,94,45,62,235,131,99,218,77,169,110,130]], [11,81,101,160,21,5], [[8,19,240,67,249,30,98,78,164,88,191,78,104,37,66,236,29,249,238,133,215,175,78,166,110,137,177,57,248,235,1,124],[206,243,214,238,254,7,62,89,203,235,199,65,238,102,135,224,180,105,229,119,56,15,139,85,23,15,149,176,75,239,220,123],[197,69,189,252,18,136,67,142,70,131,234,19,103,61,123,1,226,68,107,254,37,240,95,108,100,244,206,13,116,172,25,104],[2,108,27,173,81,184,13,170,84,211,106,149,191,217,207,71,106,18,68,5,76,228,157,51,220,167,142,160,142,222,194,170],[198,133,118,220,66,55,21,20,66,165,210,207,206,16,150,27,202,124,1,59,25,36,103,174,241,228,190,20,129,48,142,117],[188,225,127,205,132,52,170,57,188,238,118,178,8,30,74,53,60,254,12,238,33,157,17,69,132,125,46,215,218,131,157,47]], [[191,208,211,141,225,210,21,14,246,191,214,16,230,219,113,213,189,3,126,165,190,186,228,172,49,113,250,210,127,73,130,189],[75,103,77,88,47,88,219,224,90,42,116,87,165,49,118,125,114,2,225,68,189,187,193,35,120,239,158,234,53,221,17,155],[52,32,230,174,105,78,255,115,141,87,15,46,56,221,225,92,43,71,23,252,217,112,93,40,109,125,211,50,141,162,142,17],[201,188,40,76,85,159,246,248,56,216,24,9,242,99,222,229,58,220,136,170,190,73,107,105,238,253,165,196,88,13,113,35],[90,94,25,230,4,120,44,198,246,232,85,228,218,249,116,237,131,40,175,9,85,42,58,78,127,52,68,122,215,27,58,128],[87,88,18,252,36,173,212,23,222,70,73,86,115,164,83,236,41,248,51,239,36,137,221,4,120,111,28,67,45,204,104,22]], 20, 100,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [9999,21,18,14,1001,100,10000], [[23,244,117,98,126,222,8,139,70,44,183,169,187,80,24,101,138,223,208,29,96,63,199,139,93,64,16,212,0,166,72,56],[230,103,148,88,58,83,237,192,170,70,119,191,247,221,41,102,251,228,26,229,119,46,101,205,56,103,181,65,44,161,152,141],[153,22,183,227,70,125,223,59,15,80,72,61,188,131,61,189,138,36,228,27,250,123,45,33,177,52,80,66,49,156,172,67],[4,212,123,216,53,113,248,103,175,60,194,28,44,247,43,31,250,63,91,45,187,55,0,249,171,73,72,230,201,232,215,112],[178,233,254,134,157,188,89,214,199,253,78,178,17,28,85,28,154,21,154,66,239,114,23,147,82,0,82,19,191,186,43,65],[111,255,84,241,212,129,133,44,67,18,49,164,71,65,244,62,94,101,105,49,191,94,45,62,235,131,99,218,77,169,110,130]], [11,81,101,160,21,5], [[8,19,240,67,249,30,98,78,164,88,191,78,104,37,66,236,29,249,238,133,215,175,78,166,110,137,177,57,248,235,1,124],[206,243,214,238,254,7,62,89,203,235,199,65,238,102,135,224,180,105,229,119,56,15,139,85,23,15,149,176,75,239,220,123],[197,69,189,252,18,136,67,142,70,131,234,19,103,61,123,1,226,68,107,254,37,240,95,108,100,244,206,13,116,172,25,104],[2,108,27,173,81,184,13,170,84,211,106,149,191,217,207,71,106,18,68,5,76,228,157,51,220,167,142,160,142,222,194,170],[198,133,118,220,66,55,21,20,66,165,210,207,206,16,150,27,202,124,1,59,25,36,103,174,241,228,190,20,129,48,142,117],[188,225,127,205,132,52,170,57,188,238,118,178,8,30,74,53,60,254,12,238,33,157,17,69,132,125,46,215,218,131,157,47]], [[191,208,211,141,225,210,21,14,246,191,214,16,230,219,113,213,189,3,126,165,190,186,228,172,49,113,250,210,127,73,130,189],[75,103,77,88,47,88,219,224,90,42,116,87,165,49,118,125,114,2,225,68,189,187,193,35,120,239,158,234,53,221,17,155],[52,32,230,174,105,78,255,115,141,87,15,46,56,221,225,92,43,71,23,252,217,112,93,40,109,125,211,50,141,162,142,17],[201,188,40,76,85,159,246,248,56,216,24,9,242,99,222,229,58,220,136,170,190,73,107,105,238,253,165,196,88,13,113,35],[90,94,25,230,4,120,44,198,246,232,85,228,218,249,116,237,131,40,175,9,85,42,58,78,127,52,68,122,215,27,58,128],[87,88,18,252,36,173,212,23,222,70,73,86,115,164,83,236,41,248,51,239,36,137,221,4,120,111,28,67,45,204,104,22]], 20, 100,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [256,999,1336,1000,10000,999,19], [[23,244,117,98,126,222,8,139,70,44,183,169,187,80,24,101,138,223,208,29,96,63,199,139,93,64,16,212,0,166,72,56],[230,103,148,88,58,83,237,192,170,70,119,191,247,221,41,102,251,228,26,229,119,46,101,205,56,103,181,65,44,161,152,141],[153,22,183,227,70,125,223,59,15,80,72,61,188,131,61,189,138,36,228,27,250,123,45,33,177,52,80,66,49,156,172,67],[4,212,123,216,53,113,248,103,175,60,194,28,44,247,43,31,250,63,91,45,187,55,0,249,171,73,72,230,201,232,215,112],[178,233,254,134,157,188,89,214,199,253,78,178,17,28,85,28,154,21,154,66,239,114,23,147,82,0,82,19,191,186,43,65],[111,255,84,241,212,129,133,44,67,18,49,164,71,65,244,62,94,101,105,49,191,94,45,62,235,131,99,218,77,169,110,130]], [11,81,101,160,21,5], [[8,19,240,67,249,30,98,78,164,88,191,78,104,37,66,236,29,249,238,133,215,175,78,166,110,137,177,57,248,235,1,124],[206,243,214,238,254,7,62,89,203,235,199,65,238,102,135,224,180,105,229,119,56,15,139,85,23,15,149,176,75,239,220,123],[197,69,189,252,18,136,67,142,70,131,234,19,103,61,123,1,226,68,107,254,37,240,95,108,100,244,206,13,116,172,25,104],[2,108,27,173,81,184,13,170,84,211,106,149,191,217,207,71,106,18,68,5,76,228,157,51,220,167,142,160,142,222,194,170],[198,133,118,220,66,55,21,20,66,165,210,207,206,16,150,27,202,124,1,59,25,36,103,174,241,228,190,20,129,48,142,117],[188,225,127,205,132,52,170,57,188,238,118,178,8,30,74,53,60,254,12,238,33,157,17,69,132,125,46,215,218,131,157,47]], [[191,208,211,141,225,210,21,14,246,191,214,16,230,219,113,213,189,3,126,165,190,186,228,172,49,113,250,210,127,73,130,189],[75,103,77,88,47,88,219,224,90,42,116,87,165,49,118,125,114,2,225,68,189,187,193,35,120,239,158,234,53,221,17,155],[52,32,230,174,105,78,255,115,141,87,15,46,56,221,225,92,43,71,23,252,217,112,93,40,109,125,211,50,141,162,142,17],[201,188,40,76,85,159,246,248,56,216,24,9,242,99,222,229,58,220,136,170,190,73,107,105,238,253,165,196,88,13,113,35],[90,94,25,230,4,120,44,198,246,232,85,228,218,249,116,237,131,40,175,9,85,42,58,78,127,52,68,122,215,27,58,128],[87,88,18,252,36,173,212,23,222,70,73,86,115,164,83,236,41,248,51,239,36,137,221,4,120,111,28,67,45,204,104,22]], 20, 100,{from: accounts[2]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[7], accounts[7], [4,4,20,83,9,160,160], [[23,244,117,98,126,222,8,139,70,44,183,169,187,80,24,101,138,223,208,29,96,63,199,139,93,64,16,212,0,166,72,56],[230,103,148,88,58,83,237,192,170,70,119,191,247,221,41,102,251,228,26,229,119,46,101,205,56,103,181,65,44,161,152,141],[153,22,183,227,70,125,223,59,15,80,72,61,188,131,61,189,138,36,228,27,250,123,45,33,177,52,80,66,49,156,172,67],[4,212,123,216,53,113,248,103,175,60,194,28,44,247,43,31,250,63,91,45,187,55,0,249,171,73,72,230,201,232,215,112],[178,233,254,134,157,188,89,214,199,253,78,178,17,28,85,28,154,21,154,66,239,114,23,147,82,0,82,19,191,186,43,65],[111,255,84,241,212,129,133,44,67,18,49,164,71,65,244,62,94,101,105,49,191,94,45,62,235,131,99,218,77,169,110,130]], [11,81,101,160,21,5], [[8,19,240,67,249,30,98,78,164,88,191,78,104,37,66,236,29,249,238,133,215,175,78,166,110,137,177,57,248,235,1,124],[206,243,214,238,254,7,62,89,203,235,199,65,238,102,135,224,180,105,229,119,56,15,139,85,23,15,149,176,75,239,220,123],[197,69,189,252,18,136,67,142,70,131,234,19,103,61,123,1,226,68,107,254,37,240,95,108,100,244,206,13,116,172,25,104],[2,108,27,173,81,184,13,170,84,211,106,149,191,217,207,71,106,18,68,5,76,228,157,51,220,167,142,160,142,222,194,170],[198,133,118,220,66,55,21,20,66,165,210,207,206,16,150,27,202,124,1,59,25,36,103,174,241,228,190,20,129,48,142,117],[188,225,127,205,132,52,170,57,188,238,118,178,8,30,74,53,60,254,12,238,33,157,17,69,132,125,46,215,218,131,157,47]], [[191,208,211,141,225,210,21,14,246,191,214,16,230,219,113,213,189,3,126,165,190,186,228,172,49,113,250,210,127,73,130,189],[75,103,77,88,47,88,219,224,90,42,116,87,165,49,118,125,114,2,225,68,189,187,193,35,120,239,158,234,53,221,17,155],[52,32,230,174,105,78,255,115,141,87,15,46,56,221,225,92,43,71,23,252,217,112,93,40,109,125,211,50,141,162,142,17],[201,188,40,76,85,159,246,248,56,216,24,9,242,99,222,229,58,220,136,170,190,73,107,105,238,253,165,196,88,13,113,35],[90,94,25,230,4,120,44,198,246,232,85,228,218,249,116,237,131,40,175,9,85,42,58,78,127,52,68,122,215,27,58,128],[87,88,18,252,36,173,212,23,222,70,73,86,115,164,83,236,41,248,51,239,36,137,221,4,120,111,28,67,45,204,104,22]], 20, 100,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 256, [168,84,74,53,197,70,33,183,34,58,15,57,169,106,176,176,29,121,11,215,20,109,66,145,143,147,164,184,48,156,77,49], 83, [19,180,55,253,235,128,129,147,29,231,163,237,166,197,139,70,147,174,250,139,41,211,231,118,52,224,233,197,71,4,127,89], [233,123,24,124,163,62,221,61,48,3,114,228,249,137,228,195,235,236,177,169,133,180,109,216,73,173,247,93,248,32,84,192], 20,{from: accounts[2]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 256, [168,84,74,53,197,70,33,183,34,58,15,57,169,106,176,176,29,121,11,215,20,109,66,145,143,147,164,184,48,156,77,49], 83, [19,180,55,253,235,128,129,147,29,231,163,237,166,197,139,70,147,174,250,139,41,211,231,118,52,224,233,197,71,4,127,89], [233,123,24,124,163,62,221,61,48,3,114,228,249,137,228,195,235,236,177,169,133,180,109,216,73,173,247,93,248,32,84,192], 20,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[6], 256, [168,84,74,53,197,70,33,183,34,58,15,57,169,106,176,176,29,121,11,215,20,109,66,145,143,147,164,184,48,156,77,49], 83, [19,180,55,253,235,128,129,147,29,231,163,237,166,197,139,70,147,174,250,139,41,211,231,118,52,224,233,197,71,4,127,89], [233,123,24,124,163,62,221,61,48,3,114,228,249,137,228,195,235,236,177,169,133,180,109,216,73,173,247,93,248,32,84,192], 257,{from: accounts[2]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[0], 999,{from: accounts[2]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[0], 999,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[8], accounts[1], 10000, [166,148,179,238,207,184,24,72,147,207,255,157,25,43,102,233,193,83,237,75,0,209,161,79,80,70,166,115,201,16,221,73], 1, [145,2,209,233,25,73,252,110,2,112,204,123,69,58,143,114,134,17,136,12,146,120,233,145,243,79,67,47,197,57,136,149], [142,115,178,188,81,54,196,33,100,23,144,53,68,92,149,107,90,175,32,104,24,202,233,238,7,230,88,156,184,129,142,179],{from: accounts[0]});
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
