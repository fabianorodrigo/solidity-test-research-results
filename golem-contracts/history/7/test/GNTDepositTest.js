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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[9],(await web3.eth.getBlockNumber())+234,(await web3.eth.getBlockNumber())+234+313,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[9],(await web3.eth.getBlockNumber())+234,(await web3.eth.getBlockNumber())+234+313,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[5],11,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[5],11,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractTokenProxy.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractTokenProxy.address,accounts[2],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[4],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[4],6,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[1],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[6],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[2], 16,{from: accounts[0]});
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
    let result = await contractGNTDeposit.setMaximumDepositAmount(5,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(5,{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.onTokenReceived(accounts[5], 21, [114,252,130,77,253,88,56,147,251,115,59,154,82,87,188,82,61,141,44,14,197,106,97,67,127,152,150,105,249,71,90,116],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[3],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[0], 257,{from: accounts[7]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[0], 257,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[3], 101,{from: accounts[7]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[3], 101,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[7], accounts[7], 0, [144,133,67,133,81,255,144,147,137,5,218,16,85,204,230,129,160,222,119,110,255,20,36,49,177,251,174,244,22,123,196,253], 3, [137,207,71,144,9,208,4,33,147,244,190,41,169,224,228,117,8,118,194,37,15,201,79,125,99,163,104,121,174,157,157,81], [6,53,144,233,121,51,124,154,231,121,194,26,149,200,218,168,130,78,242,39,117,221,89,254,235,10,212,156,191,192,58,155], 0,{from: accounts[7]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[7], accounts[7], 0, [144,133,67,133,81,255,144,147,137,5,218,16,85,204,230,129,160,222,119,110,255,20,36,49,177,251,174,244,22,123,196,253], 3, [137,207,71,144,9,208,4,33,147,244,190,41,169,224,228,117,8,118,194,37,15,201,79,125,99,163,104,121,174,157,157,81], [6,53,144,233,121,51,124,154,231,121,194,26,149,200,218,168,130,78,242,39,117,221,89,254,235,10,212,156,191,192,58,155], 0,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[7], accounts[7], 0, [144,133,67,133,81,255,144,147,137,5,218,16,85,204,230,129,160,222,119,110,255,20,36,49,177,251,174,244,22,123,196,253], 3, [137,207,71,144,9,208,4,33,147,244,190,41,169,224,228,117,8,118,194,37,15,201,79,125,99,163,104,121,174,157,157,81], [6,53,144,233,121,51,124,154,231,121,194,26,149,200,218,168,130,78,242,39,117,221,89,254,235,10,212,156,191,192,58,155], 1,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[6], [11,999,9], [[215,91,168,32,72,220,87,99,250,247,67,136,50,21,106,172,70,32,1,163,154,209,179,209,208,55,163,64,116,228,17,115],[203,131,82,35,60,116,219,186,203,147,117,106,103,245,36,120,64,231,54,21,112,125,195,100,224,145,176,111,90,214,224,94],[157,93,245,235,81,143,35,117,216,192,161,5,223,134,195,4,24,245,200,17,143,174,102,229,137,78,79,251,166,29,245,12]], [9,18,19], [[224,148,180,66,32,161,129,44,192,44,163,254,187,46,44,216,141,177,108,232,76,127,7,20,86,155,21,121,238,117,71,245],[201,56,98,222,114,209,34,231,42,160,27,118,198,219,18,224,208,246,242,249,90,214,79,198,223,230,169,76,92,169,198,119],[188,199,210,19,214,231,50,107,147,158,44,63,126,243,232,7,133,0,48,135,59,68,80,114,215,214,200,51,209,43,7,82]], [[163,137,44,238,50,90,251,175,250,27,45,170,206,75,66,251,161,226,209,146,69,142,83,47,238,4,110,183,44,49,11,144],[62,184,206,201,10,30,146,250,142,5,239,120,123,3,131,9,65,224,112,77,204,179,156,196,35,109,66,56,103,87,126,97],[43,96,172,158,23,158,150,12,200,109,51,240,86,98,52,219,104,86,162,82,222,28,233,202,165,233,105,217,1,141,172,182]], 160, 10,{from: accounts[7]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[6], [11,999,9], [[215,91,168,32,72,220,87,99,250,247,67,136,50,21,106,172,70,32,1,163,154,209,179,209,208,55,163,64,116,228,17,115],[203,131,82,35,60,116,219,186,203,147,117,106,103,245,36,120,64,231,54,21,112,125,195,100,224,145,176,111,90,214,224,94],[157,93,245,235,81,143,35,117,216,192,161,5,223,134,195,4,24,245,200,17,143,174,102,229,137,78,79,251,166,29,245,12]], [9,18,19], [[224,148,180,66,32,161,129,44,192,44,163,254,187,46,44,216,141,177,108,232,76,127,7,20,86,155,21,121,238,117,71,245],[201,56,98,222,114,209,34,231,42,160,27,118,198,219,18,224,208,246,242,249,90,214,79,198,223,230,169,76,92,169,198,119],[188,199,210,19,214,231,50,107,147,158,44,63,126,243,232,7,133,0,48,135,59,68,80,114,215,214,200,51,209,43,7,82]], [[163,137,44,238,50,90,251,175,250,27,45,170,206,75,66,251,161,226,209,146,69,142,83,47,238,4,110,183,44,49,11,144],[62,184,206,201,10,30,146,250,142,5,239,120,123,3,131,9,65,224,112,77,204,179,156,196,35,109,66,56,103,87,126,97],[43,96,172,158,23,158,150,12,200,109,51,240,86,98,52,219,104,86,162,82,222,28,233,202,165,233,105,217,1,141,172,182]], 160, 10,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[6], [10,159,999,0], [[215,91,168,32,72,220,87,99,250,247,67,136,50,21,106,172,70,32,1,163,154,209,179,209,208,55,163,64,116,228,17,115],[203,131,82,35,60,116,219,186,203,147,117,106,103,245,36,120,64,231,54,21,112,125,195,100,224,145,176,111,90,214,224,94],[157,93,245,235,81,143,35,117,216,192,161,5,223,134,195,4,24,245,200,17,143,174,102,229,137,78,79,251,166,29,245,12]], [9,18,19], [[224,148,180,66,32,161,129,44,192,44,163,254,187,46,44,216,141,177,108,232,76,127,7,20,86,155,21,121,238,117,71,245],[201,56,98,222,114,209,34,231,42,160,27,118,198,219,18,224,208,246,242,249,90,214,79,198,223,230,169,76,92,169,198,119],[188,199,210,19,214,231,50,107,147,158,44,63,126,243,232,7,133,0,48,135,59,68,80,114,215,214,200,51,209,43,7,82]], [[163,137,44,238,50,90,251,175,250,27,45,170,206,75,66,251,161,226,209,146,69,142,83,47,238,4,110,183,44,49,11,144],[62,184,206,201,10,30,146,250,142,5,239,120,123,3,131,9,65,224,112,77,204,179,156,196,35,109,66,56,103,87,126,97],[43,96,172,158,23,158,150,12,200,109,51,240,86,98,52,219,104,86,162,82,222,28,233,202,165,233,105,217,1,141,172,182]], 160, 10,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[6], [6,20,2,82], [[215,91,168,32,72,220,87,99,250,247,67,136,50,21,106,172,70,32,1,163,154,209,179,209,208,55,163,64,116,228,17,115],[203,131,82,35,60,116,219,186,203,147,117,106,103,245,36,120,64,231,54,21,112,125,195,100,224,145,176,111,90,214,224,94],[157,93,245,235,81,143,35,117,216,192,161,5,223,134,195,4,24,245,200,17,143,174,102,229,137,78,79,251,166,29,245,12]], [9,18,19], [[224,148,180,66,32,161,129,44,192,44,163,254,187,46,44,216,141,177,108,232,76,127,7,20,86,155,21,121,238,117,71,245],[201,56,98,222,114,209,34,231,42,160,27,118,198,219,18,224,208,246,242,249,90,214,79,198,223,230,169,76,92,169,198,119],[188,199,210,19,214,231,50,107,147,158,44,63,126,243,232,7,133,0,48,135,59,68,80,114,215,214,200,51,209,43,7,82]], [[163,137,44,238,50,90,251,175,250,27,45,170,206,75,66,251,161,226,209,146,69,142,83,47,238,4,110,183,44,49,11,144],[62,184,206,201,10,30,146,250,142,5,239,120,123,3,131,9,65,224,112,77,204,179,156,196,35,109,66,56,103,87,126,97],[43,96,172,158,23,158,150,12,200,109,51,240,86,98,52,219,104,86,162,82,222,28,233,202,165,233,105,217,1,141,172,182]], 160, 10,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[6], [1001,6,9,1000], [[215,91,168,32,72,220,87,99,250,247,67,136,50,21,106,172,70,32,1,163,154,209,179,209,208,55,163,64,116,228,17,115],[203,131,82,35,60,116,219,186,203,147,117,106,103,245,36,120,64,231,54,21,112,125,195,100,224,145,176,111,90,214,224,94],[157,93,245,235,81,143,35,117,216,192,161,5,223,134,195,4,24,245,200,17,143,174,102,229,137,78,79,251,166,29,245,12]], [9,18,19], [[224,148,180,66,32,161,129,44,192,44,163,254,187,46,44,216,141,177,108,232,76,127,7,20,86,155,21,121,238,117,71,245],[201,56,98,222,114,209,34,231,42,160,27,118,198,219,18,224,208,246,242,249,90,214,79,198,223,230,169,76,92,169,198,119],[188,199,210,19,214,231,50,107,147,158,44,63,126,243,232,7,133,0,48,135,59,68,80,114,215,214,200,51,209,43,7,82]], [[163,137,44,238,50,90,251,175,250,27,45,170,206,75,66,251,161,226,209,146,69,142,83,47,238,4,110,183,44,49,11,144],[62,184,206,201,10,30,146,250,142,5,239,120,123,3,131,9,65,224,112,77,204,179,156,196,35,109,66,56,103,87,126,97],[43,96,172,158,23,158,150,12,200,109,51,240,86,98,52,219,104,86,162,82,222,28,233,202,165,233,105,217,1,141,172,182]], 160, 10,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[6], [256,10,1001,10], [[215,91,168,32,72,220,87,99,250,247,67,136,50,21,106,172,70,32,1,163,154,209,179,209,208,55,163,64,116,228,17,115],[203,131,82,35,60,116,219,186,203,147,117,106,103,245,36,120,64,231,54,21,112,125,195,100,224,145,176,111,90,214,224,94],[157,93,245,235,81,143,35,117,216,192,161,5,223,134,195,4,24,245,200,17,143,174,102,229,137,78,79,251,166,29,245,12]], [9,18,19], [[224,148,180,66,32,161,129,44,192,44,163,254,187,46,44,216,141,177,108,232,76,127,7,20,86,155,21,121,238,117,71,245],[201,56,98,222,114,209,34,231,42,160,27,118,198,219,18,224,208,246,242,249,90,214,79,198,223,230,169,76,92,169,198,119],[188,199,210,19,214,231,50,107,147,158,44,63,126,243,232,7,133,0,48,135,59,68,80,114,215,214,200,51,209,43,7,82]], [[163,137,44,238,50,90,251,175,250,27,45,170,206,75,66,251,161,226,209,146,69,142,83,47,238,4,110,183,44,49,11,144],[62,184,206,201,10,30,146,250,142,5,239,120,123,3,131,9,65,224,112,77,204,179,156,196,35,109,66,56,103,87,126,97],[43,96,172,158,23,158,150,12,200,109,51,240,86,98,52,219,104,86,162,82,222,28,233,202,165,233,105,217,1,141,172,182]], 160, 10,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 16, [75,201,213,150,130,151,101,232,165,27,55,56,134,93,72,59,126,11,161,36,237,60,80,191,129,245,110,107,200,172,67,119], 101, [156,195,77,54,7,242,35,213,26,77,27,104,129,75,149,212,40,160,138,36,12,169,64,228,212,62,181,238,75,82,112,192], [183,55,3,126,230,8,94,126,36,80,32,44,133,188,248,158,20,88,235,91,80,69,163,10,15,201,152,91,32,110,29,12], 14,{from: accounts[7]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 16, [75,201,213,150,130,151,101,232,165,27,55,56,134,93,72,59,126,11,161,36,237,60,80,191,129,245,110,107,200,172,67,119], 101, [156,195,77,54,7,242,35,213,26,77,27,104,129,75,149,212,40,160,138,36,12,169,64,228,212,62,181,238,75,82,112,192], [183,55,3,126,230,8,94,126,36,80,32,44,133,188,248,158,20,88,235,91,80,69,163,10,15,201,152,91,32,110,29,12], 14,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 16, [75,201,213,150,130,151,101,232,165,27,55,56,134,93,72,59,126,11,161,36,237,60,80,191,129,245,110,107,200,172,67,119], 101, [156,195,77,54,7,242,35,213,26,77,27,104,129,75,149,212,40,160,138,36,12,169,64,228,212,62,181,238,75,82,112,192], [183,55,3,126,230,8,94,126,36,80,32,44,133,188,248,158,20,88,235,91,80,69,163,10,15,201,152,91,32,110,29,12], 17,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[4], 101,{from: accounts[7]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[4], 101,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[3], accounts[7], 1000, [15,196,29,46,110,134,253,115,203,44,108,77,211,191,23,246,238,82,17,165,233,135,118,229,130,137,120,119,85,248,84,127], 1, [92,110,45,234,183,137,60,196,87,141,22,107,98,210,222,203,125,102,145,122,80,42,163,148,56,252,221,51,224,51,44,70], [80,238,209,46,112,145,118,13,250,217,204,254,1,214,20,116,15,91,112,36,0,135,182,91,42,36,88,124,73,9,24,156],{from: accounts[0]});
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
