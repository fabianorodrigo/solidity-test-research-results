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
    contractGNTAllocation = await GNTAllocation.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[4],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[7],(await web3.eth.getBlockNumber())+7,(await web3.eth.getBlockNumber())+7+876,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[7],(await web3.eth.getBlockNumber())+7,(await web3.eth.getBlockNumber())+7+876,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[1],1001,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[1],1001,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[4],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[3],82,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[3],82,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[1],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[7],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[6],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[3],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[1], 81,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[4],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[4],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(19,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(19,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(100,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(100,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(159,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(159,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[2], 1000, [184,110,56,19,176,153,232,1,115,54,230,19,79,112,21,29,140,21,65,93,139,7,132,255,105,206,34,58,126,187,20,53],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[7],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[6], 999,{from: accounts[6]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[6], 999,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[0], 17,{from: accounts[6]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[0], 17,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[0], 999, [133,204,7,19,214,0,198,37,110,147,247,6,151,84,94,192,163,213,152,116,122,168,214,205,171,220,98,94,155,142,205,95], 160, [116,229,169,66,186,57,248,105,165,142,34,176,84,174,159,229,159,67,81,191,211,173,162,100,20,51,229,249,226,43,2,190], [212,253,97,33,175,192,168,138,171,118,240,100,183,245,132,252,44,19,147,251,74,111,29,193,50,181,247,17,74,100,121,183], 160,{from: accounts[6]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[0], 999, [133,204,7,19,214,0,198,37,110,147,247,6,151,84,94,192,163,213,152,116,122,168,214,205,171,220,98,94,155,142,205,95], 160, [116,229,169,66,186,57,248,105,165,142,34,176,84,174,159,229,159,67,81,191,211,173,162,100,20,51,229,249,226,43,2,190], [212,253,97,33,175,192,168,138,171,118,240,100,183,245,132,252,44,19,147,251,74,111,29,193,50,181,247,17,74,100,121,183], 160,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[0], 999, [133,204,7,19,214,0,198,37,110,147,247,6,151,84,94,192,163,213,152,116,122,168,214,205,171,220,98,94,155,142,205,95], 160, [116,229,169,66,186,57,248,105,165,142,34,176,84,174,159,229,159,67,81,191,211,173,162,100,20,51,229,249,226,43,2,190], [212,253,97,33,175,192,168,138,171,118,240,100,183,245,132,252,44,19,147,251,74,111,29,193,50,181,247,17,74,100,121,183], 1000,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[5], [81,18,82], [[9,236,108,251,12,44,140,21,207,85,213,184,50,233,246,20,125,120,114,184,77,208,4,229,47,110,147,118,89,99,141,52],[47,30,202,101,165,144,24,49,83,24,229,239,131,148,156,210,245,170,0,77,217,191,158,47,248,14,100,126,103,236,37,156],[168,81,38,16,246,202,236,196,224,214,163,142,83,230,137,107,42,173,223,41,220,204,43,59,165,61,220,33,46,226,107,16]], [19,83,16], [[150,209,131,133,218,229,49,186,195,139,194,40,56,134,103,133,235,249,26,231,60,12,120,195,237,48,182,46,250,156,29,3],[135,180,78,130,121,35,95,3,84,70,233,65,117,56,100,106,7,31,86,126,40,57,89,58,190,40,9,155,150,174,10,227],[99,240,15,73,61,193,62,2,198,34,216,2,169,2,216,44,22,135,63,92,36,142,159,177,151,5,130,197,248,163,187,161]], [[246,136,19,254,144,78,182,246,219,214,121,72,20,68,41,45,49,53,25,124,250,16,93,10,182,54,210,80,235,94,255,172],[80,56,247,179,178,98,72,228,28,234,32,85,241,164,160,125,111,83,19,200,137,241,56,249,241,35,180,148,175,4,76,211],[182,213,142,48,104,152,221,217,91,139,92,228,92,68,222,166,169,197,36,216,140,26,7,223,101,235,198,104,216,118,6,60]], 161, 16,{from: accounts[6]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[5], [81,18,82], [[9,236,108,251,12,44,140,21,207,85,213,184,50,233,246,20,125,120,114,184,77,208,4,229,47,110,147,118,89,99,141,52],[47,30,202,101,165,144,24,49,83,24,229,239,131,148,156,210,245,170,0,77,217,191,158,47,248,14,100,126,103,236,37,156],[168,81,38,16,246,202,236,196,224,214,163,142,83,230,137,107,42,173,223,41,220,204,43,59,165,61,220,33,46,226,107,16]], [19,83,16], [[150,209,131,133,218,229,49,186,195,139,194,40,56,134,103,133,235,249,26,231,60,12,120,195,237,48,182,46,250,156,29,3],[135,180,78,130,121,35,95,3,84,70,233,65,117,56,100,106,7,31,86,126,40,57,89,58,190,40,9,155,150,174,10,227],[99,240,15,73,61,193,62,2,198,34,216,2,169,2,216,44,22,135,63,92,36,142,159,177,151,5,130,197,248,163,187,161]], [[246,136,19,254,144,78,182,246,219,214,121,72,20,68,41,45,49,53,25,124,250,16,93,10,182,54,210,80,235,94,255,172],[80,56,247,179,178,98,72,228,28,234,32,85,241,164,160,125,111,83,19,200,137,241,56,249,241,35,180,148,175,4,76,211],[182,213,142,48,104,152,221,217,91,139,92,228,92,68,222,166,169,197,36,216,140,26,7,223,101,235,198,104,216,118,6,60]], 161, 16,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[5], [3,10000,257,21], [[9,236,108,251,12,44,140,21,207,85,213,184,50,233,246,20,125,120,114,184,77,208,4,229,47,110,147,118,89,99,141,52],[47,30,202,101,165,144,24,49,83,24,229,239,131,148,156,210,245,170,0,77,217,191,158,47,248,14,100,126,103,236,37,156],[168,81,38,16,246,202,236,196,224,214,163,142,83,230,137,107,42,173,223,41,220,204,43,59,165,61,220,33,46,226,107,16]], [19,83,16], [[150,209,131,133,218,229,49,186,195,139,194,40,56,134,103,133,235,249,26,231,60,12,120,195,237,48,182,46,250,156,29,3],[135,180,78,130,121,35,95,3,84,70,233,65,117,56,100,106,7,31,86,126,40,57,89,58,190,40,9,155,150,174,10,227],[99,240,15,73,61,193,62,2,198,34,216,2,169,2,216,44,22,135,63,92,36,142,159,177,151,5,130,197,248,163,187,161]], [[246,136,19,254,144,78,182,246,219,214,121,72,20,68,41,45,49,53,25,124,250,16,93,10,182,54,210,80,235,94,255,172],[80,56,247,179,178,98,72,228,28,234,32,85,241,164,160,125,111,83,19,200,137,241,56,249,241,35,180,148,175,4,76,211],[182,213,142,48,104,152,221,217,91,139,92,228,92,68,222,166,169,197,36,216,140,26,7,223,101,235,198,104,216,118,6,60]], 161, 16,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[5], [19,6,161,2], [[9,236,108,251,12,44,140,21,207,85,213,184,50,233,246,20,125,120,114,184,77,208,4,229,47,110,147,118,89,99,141,52],[47,30,202,101,165,144,24,49,83,24,229,239,131,148,156,210,245,170,0,77,217,191,158,47,248,14,100,126,103,236,37,156],[168,81,38,16,246,202,236,196,224,214,163,142,83,230,137,107,42,173,223,41,220,204,43,59,165,61,220,33,46,226,107,16]], [19,83,16], [[150,209,131,133,218,229,49,186,195,139,194,40,56,134,103,133,235,249,26,231,60,12,120,195,237,48,182,46,250,156,29,3],[135,180,78,130,121,35,95,3,84,70,233,65,117,56,100,106,7,31,86,126,40,57,89,58,190,40,9,155,150,174,10,227],[99,240,15,73,61,193,62,2,198,34,216,2,169,2,216,44,22,135,63,92,36,142,159,177,151,5,130,197,248,163,187,161]], [[246,136,19,254,144,78,182,246,219,214,121,72,20,68,41,45,49,53,25,124,250,16,93,10,182,54,210,80,235,94,255,172],[80,56,247,179,178,98,72,228,28,234,32,85,241,164,160,125,111,83,19,200,137,241,56,249,241,35,180,148,175,4,76,211],[182,213,142,48,104,152,221,217,91,139,92,228,92,68,222,166,169,197,36,216,140,26,7,223,101,235,198,104,216,118,6,60]], 161, 16,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[5], [1337,9999,257,11], [[9,236,108,251,12,44,140,21,207,85,213,184,50,233,246,20,125,120,114,184,77,208,4,229,47,110,147,118,89,99,141,52],[47,30,202,101,165,144,24,49,83,24,229,239,131,148,156,210,245,170,0,77,217,191,158,47,248,14,100,126,103,236,37,156],[168,81,38,16,246,202,236,196,224,214,163,142,83,230,137,107,42,173,223,41,220,204,43,59,165,61,220,33,46,226,107,16]], [19,83,16], [[150,209,131,133,218,229,49,186,195,139,194,40,56,134,103,133,235,249,26,231,60,12,120,195,237,48,182,46,250,156,29,3],[135,180,78,130,121,35,95,3,84,70,233,65,117,56,100,106,7,31,86,126,40,57,89,58,190,40,9,155,150,174,10,227],[99,240,15,73,61,193,62,2,198,34,216,2,169,2,216,44,22,135,63,92,36,142,159,177,151,5,130,197,248,163,187,161]], [[246,136,19,254,144,78,182,246,219,214,121,72,20,68,41,45,49,53,25,124,250,16,93,10,182,54,210,80,235,94,255,172],[80,56,247,179,178,98,72,228,28,234,32,85,241,164,160,125,111,83,19,200,137,241,56,249,241,35,180,148,175,4,76,211],[182,213,142,48,104,152,221,217,91,139,92,228,92,68,222,166,169,197,36,216,140,26,7,223,101,235,198,104,216,118,6,60]], 161, 16,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[5], [6,82,255,0], [[9,236,108,251,12,44,140,21,207,85,213,184,50,233,246,20,125,120,114,184,77,208,4,229,47,110,147,118,89,99,141,52],[47,30,202,101,165,144,24,49,83,24,229,239,131,148,156,210,245,170,0,77,217,191,158,47,248,14,100,126,103,236,37,156],[168,81,38,16,246,202,236,196,224,214,163,142,83,230,137,107,42,173,223,41,220,204,43,59,165,61,220,33,46,226,107,16]], [19,83,16], [[150,209,131,133,218,229,49,186,195,139,194,40,56,134,103,133,235,249,26,231,60,12,120,195,237,48,182,46,250,156,29,3],[135,180,78,130,121,35,95,3,84,70,233,65,117,56,100,106,7,31,86,126,40,57,89,58,190,40,9,155,150,174,10,227],[99,240,15,73,61,193,62,2,198,34,216,2,169,2,216,44,22,135,63,92,36,142,159,177,151,5,130,197,248,163,187,161]], [[246,136,19,254,144,78,182,246,219,214,121,72,20,68,41,45,49,53,25,124,250,16,93,10,182,54,210,80,235,94,255,172],[80,56,247,179,178,98,72,228,28,234,32,85,241,164,160,125,111,83,19,200,137,241,56,249,241,35,180,148,175,4,76,211],[182,213,142,48,104,152,221,217,91,139,92,228,92,68,222,166,169,197,36,216,140,26,7,223,101,235,198,104,216,118,6,60]], 161, 16,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 10001, [110,218,80,48,183,199,251,198,210,112,50,43,100,247,202,130,26,147,18,132,169,38,67,211,247,187,21,200,23,52,234,149], 2, [194,75,127,255,124,99,104,114,232,66,68,86,209,214,254,89,193,174,192,19,187,8,169,154,130,151,203,210,120,229,253,244], [150,217,60,84,212,151,93,92,143,10,137,101,22,33,45,79,75,80,170,122,197,65,102,124,83,243,219,139,17,15,187,187], 15,{from: accounts[6]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 10001, [110,218,80,48,183,199,251,198,210,112,50,43,100,247,202,130,26,147,18,132,169,38,67,211,247,187,21,200,23,52,234,149], 2, [194,75,127,255,124,99,104,114,232,66,68,86,209,214,254,89,193,174,192,19,187,8,169,154,130,151,203,210,120,229,253,244], [150,217,60,84,212,151,93,92,143,10,137,101,22,33,45,79,75,80,170,122,197,65,102,124,83,243,219,139,17,15,187,187], 15,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 10001, [110,218,80,48,183,199,251,198,210,112,50,43,100,247,202,130,26,147,18,132,169,38,67,211,247,187,21,200,23,52,234,149], 2, [194,75,127,255,124,99,104,114,232,66,68,86,209,214,254,89,193,174,192,19,187,8,169,154,130,151,203,210,120,229,253,244], [150,217,60,84,212,151,93,92,143,10,137,101,22,33,45,79,75,80,170,122,197,65,102,124,83,243,219,139,17,15,187,187], 10002,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[3], 18,{from: accounts[6]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[3], 18,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[2], accounts[9], 10001, [28,146,199,253,100,129,1,77,83,45,39,84,12,249,1,98,116,74,172,66,133,119,229,193,131,225,170,128,98,58,239,244], 0, [97,74,50,207,21,107,35,213,28,48,13,101,117,22,160,150,199,210,212,196,221,6,138,105,220,119,158,86,81,13,77,127], [235,247,54,113,160,119,54,53,250,64,249,236,202,111,82,219,27,110,35,55,0,228,35,18,147,198,85,77,230,14,123,72],{from: accounts[0]});
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
