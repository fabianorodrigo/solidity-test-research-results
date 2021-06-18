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
    contractGNTAllocation = await GNTAllocation.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[0],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[6],accounts[3],(await web3.eth.getBlockNumber())+482,(await web3.eth.getBlockNumber())+482+448,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[6],accounts[3],(await web3.eth.getBlockNumber())+482,(await web3.eth.getBlockNumber())+482+448,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[9],20,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[9],20,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBurnableToken.address,accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBurnableToken.address,accounts[0],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[4],81,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[4],81,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[6],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[9],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[2], 160,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[0],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[0],{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.setMaximumDepositsTotal(1336,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(1336,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(17,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(17,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(257,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(257,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[9], 5, [159,240,32,45,127,146,54,216,102,147,134,193,220,58,52,185,40,225,65,85,228,161,126,96,201,1,0,102,50,141,17,87],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[8],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[3], 1337,{from: accounts[6]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[3], 1337,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[9], 3,{from: accounts[6]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[9], 3,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[3], 257, [12,213,43,207,164,208,109,46,11,53,247,101,148,96,77,134,84,106,121,194,83,219,127,42,74,120,90,30,216,252,7,156], 9, [121,145,207,236,54,173,166,146,97,64,32,151,66,135,165,235,234,119,96,42,221,251,227,200,159,203,155,219,26,147,81,114], [194,81,71,234,226,122,104,109,0,59,120,223,74,190,7,73,40,9,181,250,35,124,48,54,63,48,19,205,234,105,218,168], 14,{from: accounts[6]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[3], 257, [12,213,43,207,164,208,109,46,11,53,247,101,148,96,77,134,84,106,121,194,83,219,127,42,74,120,90,30,216,252,7,156], 9, [121,145,207,236,54,173,166,146,97,64,32,151,66,135,165,235,234,119,96,42,221,251,227,200,159,203,155,219,26,147,81,114], [194,81,71,234,226,122,104,109,0,59,120,223,74,190,7,73,40,9,181,250,35,124,48,54,63,48,19,205,234,105,218,168], 14,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[6], accounts[3], 257, [12,213,43,207,164,208,109,46,11,53,247,101,148,96,77,134,84,106,121,194,83,219,127,42,74,120,90,30,216,252,7,156], 9, [121,145,207,236,54,173,166,146,97,64,32,151,66,135,165,235,234,119,96,42,221,251,227,200,159,203,155,219,26,147,81,114], [194,81,71,234,226,122,104,109,0,59,120,223,74,190,7,73,40,9,181,250,35,124,48,54,63,48,19,205,234,105,218,168], 258,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [999,10000], [[4,82,80,175,34,211,119,146,136,5,243,226,225,172,87,202,69,194,47,244,82,244,82,236,119,60,33,18,83,146,105,171],[213,213,21,248,223,203,200,3,15,255,242,22,46,119,235,7,95,200,170,203,237,40,249,251,171,200,177,255,78,28,63,53]], [83,1], [[191,14,127,42,187,48,211,120,125,215,58,99,132,133,30,63,216,73,181,33,223,11,170,15,207,45,182,198,106,106,231,185],[189,30,157,92,77,62,203,215,155,200,26,223,214,110,164,108,203,166,145,106,12,255,239,104,125,183,24,21,20,77,20,234]], [[160,166,135,152,231,0,150,121,219,195,176,36,67,235,76,24,130,122,20,254,154,155,47,59,98,88,240,130,229,66,79,245],[201,84,171,107,18,28,74,6,5,135,117,83,67,48,186,186,156,235,161,74,65,98,167,39,251,87,23,169,195,46,102,201]], 10, 83,{from: accounts[6]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [999,10000], [[4,82,80,175,34,211,119,146,136,5,243,226,225,172,87,202,69,194,47,244,82,244,82,236,119,60,33,18,83,146,105,171],[213,213,21,248,223,203,200,3,15,255,242,22,46,119,235,7,95,200,170,203,237,40,249,251,171,200,177,255,78,28,63,53]], [83,1], [[191,14,127,42,187,48,211,120,125,215,58,99,132,133,30,63,216,73,181,33,223,11,170,15,207,45,182,198,106,106,231,185],[189,30,157,92,77,62,203,215,155,200,26,223,214,110,164,108,203,166,145,106,12,255,239,104,125,183,24,21,20,77,20,234]], [[160,166,135,152,231,0,150,121,219,195,176,36,67,235,76,24,130,122,20,254,154,155,47,59,98,88,240,130,229,66,79,245],[201,84,171,107,18,28,74,6,5,135,117,83,67,48,186,186,156,235,161,74,65,98,167,39,251,87,23,169,195,46,102,201]], 10, 83,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [9999,9999,9], [[4,82,80,175,34,211,119,146,136,5,243,226,225,172,87,202,69,194,47,244,82,244,82,236,119,60,33,18,83,146,105,171],[213,213,21,248,223,203,200,3,15,255,242,22,46,119,235,7,95,200,170,203,237,40,249,251,171,200,177,255,78,28,63,53]], [83,1], [[191,14,127,42,187,48,211,120,125,215,58,99,132,133,30,63,216,73,181,33,223,11,170,15,207,45,182,198,106,106,231,185],[189,30,157,92,77,62,203,215,155,200,26,223,214,110,164,108,203,166,145,106,12,255,239,104,125,183,24,21,20,77,20,234]], [[160,166,135,152,231,0,150,121,219,195,176,36,67,235,76,24,130,122,20,254,154,155,47,59,98,88,240,130,229,66,79,245],[201,84,171,107,18,28,74,6,5,135,117,83,67,48,186,186,156,235,161,74,65,98,167,39,251,87,23,169,195,46,102,201]], 10, 83,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [257,256,1], [[4,82,80,175,34,211,119,146,136,5,243,226,225,172,87,202,69,194,47,244,82,244,82,236,119,60,33,18,83,146,105,171],[213,213,21,248,223,203,200,3,15,255,242,22,46,119,235,7,95,200,170,203,237,40,249,251,171,200,177,255,78,28,63,53]], [83,1], [[191,14,127,42,187,48,211,120,125,215,58,99,132,133,30,63,216,73,181,33,223,11,170,15,207,45,182,198,106,106,231,185],[189,30,157,92,77,62,203,215,155,200,26,223,214,110,164,108,203,166,145,106,12,255,239,104,125,183,24,21,20,77,20,234]], [[160,166,135,152,231,0,150,121,219,195,176,36,67,235,76,24,130,122,20,254,154,155,47,59,98,88,240,130,229,66,79,245],[201,84,171,107,18,28,74,6,5,135,117,83,67,48,186,186,156,235,161,74,65,98,167,39,251,87,23,169,195,46,102,201]], 10, 83,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [82,5,9], [[4,82,80,175,34,211,119,146,136,5,243,226,225,172,87,202,69,194,47,244,82,244,82,236,119,60,33,18,83,146,105,171],[213,213,21,248,223,203,200,3,15,255,242,22,46,119,235,7,95,200,170,203,237,40,249,251,171,200,177,255,78,28,63,53]], [83,1], [[191,14,127,42,187,48,211,120,125,215,58,99,132,133,30,63,216,73,181,33,223,11,170,15,207,45,182,198,106,106,231,185],[189,30,157,92,77,62,203,215,155,200,26,223,214,110,164,108,203,166,145,106,12,255,239,104,125,183,24,21,20,77,20,234]], [[160,166,135,152,231,0,150,121,219,195,176,36,67,235,76,24,130,122,20,254,154,155,47,59,98,88,240,130,229,66,79,245],[201,84,171,107,18,28,74,6,5,135,117,83,67,48,186,186,156,235,161,74,65,98,167,39,251,87,23,169,195,46,102,201]], 10, 83,{from: accounts[6]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[0], accounts[4], [16,16,255], [[4,82,80,175,34,211,119,146,136,5,243,226,225,172,87,202,69,194,47,244,82,244,82,236,119,60,33,18,83,146,105,171],[213,213,21,248,223,203,200,3,15,255,242,22,46,119,235,7,95,200,170,203,237,40,249,251,171,200,177,255,78,28,63,53]], [83,1], [[191,14,127,42,187,48,211,120,125,215,58,99,132,133,30,63,216,73,181,33,223,11,170,15,207,45,182,198,106,106,231,185],[189,30,157,92,77,62,203,215,155,200,26,223,214,110,164,108,203,166,145,106,12,255,239,104,125,183,24,21,20,77,20,234]], [[160,166,135,152,231,0,150,121,219,195,176,36,67,235,76,24,130,122,20,254,154,155,47,59,98,88,240,130,229,66,79,245],[201,84,171,107,18,28,74,6,5,135,117,83,67,48,186,186,156,235,161,74,65,98,167,39,251,87,23,169,195,46,102,201]], 10, 83,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 101, [73,4,33,5,145,95,189,60,116,202,42,126,95,216,143,70,174,150,208,110,121,0,27,36,195,27,227,109,253,193,92,99], 2, [22,160,99,123,246,200,9,158,11,164,119,215,246,142,215,22,62,69,102,194,41,236,24,128,231,16,93,101,179,5,137,138], [234,232,136,198,36,119,2,192,127,157,210,231,48,99,54,228,91,166,166,168,155,236,58,61,226,169,180,64,37,178,104,117], 81,{from: accounts[6]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 101, [73,4,33,5,145,95,189,60,116,202,42,126,95,216,143,70,174,150,208,110,121,0,27,36,195,27,227,109,253,193,92,99], 2, [22,160,99,123,246,200,9,158,11,164,119,215,246,142,215,22,62,69,102,194,41,236,24,128,231,16,93,101,179,5,137,138], [234,232,136,198,36,119,2,192,127,157,210,231,48,99,54,228,91,166,166,168,155,236,58,61,226,169,180,64,37,178,104,117], 81,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 101, [73,4,33,5,145,95,189,60,116,202,42,126,95,216,143,70,174,150,208,110,121,0,27,36,195,27,227,109,253,193,92,99], 2, [22,160,99,123,246,200,9,158,11,164,119,215,246,142,215,22,62,69,102,194,41,236,24,128,231,16,93,101,179,5,137,138], [234,232,136,198,36,119,2,192,127,157,210,231,48,99,54,228,91,166,166,168,155,236,58,61,226,169,180,64,37,178,104,117], 102,{from: accounts[6]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[9], 0,{from: accounts[6]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[9], 0,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[6], accounts[5], 20, [124,87,203,196,15,105,128,194,4,110,159,162,76,53,138,248,141,178,79,92,80,13,48,153,176,197,12,139,190,83,47,106], 19, [249,53,115,166,215,39,63,41,239,43,194,166,141,31,44,119,116,159,123,111,55,121,134,44,200,177,66,194,134,176,244,222], [71,163,149,66,147,51,144,181,151,49,165,68,222,5,50,140,1,65,102,7,177,232,175,121,17,14,42,113,87,128,185,8],{from: accounts[0]});
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
