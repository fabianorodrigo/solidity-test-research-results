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
    contractGNTAllocation = await GNTAllocation.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[0],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[6],accounts[4],(await web3.eth.getBlockNumber())+427,(await web3.eth.getBlockNumber())+427+792,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[6],accounts[4],(await web3.eth.getBlockNumber())+427,(await web3.eth.getBlockNumber())+427+792,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[8],14,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[8],14,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractGolemNetworkTokenBatching.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractGolemNetworkTokenBatching.address,accounts[2],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[4],accounts[2],19,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[4],accounts[2],19,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[6],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[8],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[8],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[5],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[5], 10,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[3],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[3],{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.setMaximumDepositsTotal(160,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(160,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(10,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(10,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(2,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(2,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[9], 255, [175,70,67,163,241,84,42,87,219,118,219,232,210,248,27,121,23,119,136,125,199,35,71,37,108,36,170,54,241,132,119,47],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[7],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[9], 3,{from: accounts[4]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[9], 3,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[5], 11,{from: accounts[4]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[5], 11,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[5], 1336, [9,64,102,131,96,51,249,90,149,199,172,91,197,107,226,80,221,122,19,143,197,11,180,80,61,200,63,71,255,200,110,209], 81, [34,73,164,49,56,57,104,139,251,53,170,152,118,223,10,89,172,168,251,159,16,228,109,45,88,168,234,89,137,34,167,240], [31,131,90,220,226,255,244,48,185,253,39,108,67,245,97,85,166,28,33,84,232,62,18,89,73,169,91,240,234,131,134,94], 1001,{from: accounts[4]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[5], 1336, [9,64,102,131,96,51,249,90,149,199,172,91,197,107,226,80,221,122,19,143,197,11,180,80,61,200,63,71,255,200,110,209], 81, [34,73,164,49,56,57,104,139,251,53,170,152,118,223,10,89,172,168,251,159,16,228,109,45,88,168,234,89,137,34,167,240], [31,131,90,220,226,255,244,48,185,253,39,108,67,245,97,85,166,28,33,84,232,62,18,89,73,169,91,240,234,131,134,94], 1001,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[3], accounts[5], 1336, [9,64,102,131,96,51,249,90,149,199,172,91,197,107,226,80,221,122,19,143,197,11,180,80,61,200,63,71,255,200,110,209], 81, [34,73,164,49,56,57,104,139,251,53,170,152,118,223,10,89,172,168,251,159,16,228,109,45,88,168,234,89,137,34,167,240], [31,131,90,220,226,255,244,48,185,253,39,108,67,245,97,85,166,28,33,84,232,62,18,89,73,169,91,240,234,131,134,94], 1337,{from: accounts[4]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [82,1,257,2,82,257,100], [[150,237,181,143,210,30,122,11,68,131,248,150,142,119,82,3,121,81,238,47,244,177,4,21,89,93,195,53,213,123,152,168],[165,87,108,105,34,7,155,106,242,91,140,135,19,111,43,13,13,83,151,82,217,138,73,165,134,193,160,109,127,163,84,207],[142,63,248,25,254,37,24,31,233,250,233,166,241,233,68,29,237,247,36,232,173,176,158,107,30,185,79,110,85,211,91,114],[126,132,152,53,78,205,182,94,99,88,108,92,100,125,103,173,25,56,142,134,47,75,6,164,87,166,109,245,31,172,245,0],[150,86,11,43,200,158,10,234,105,50,126,176,123,87,25,240,58,108,187,79,49,175,240,132,187,124,232,112,178,104,28,63],[51,206,148,61,63,73,237,32,70,204,4,52,236,183,96,201,130,196,200,171,122,49,214,130,126,38,47,21,174,194,231,158],[152,31,31,94,33,215,251,70,189,116,12,138,204,121,47,40,243,211,95,88,29,241,219,7,96,220,118,84,130,244,79,173]], [6,3,160,161,81,6,19], [[144,112,35,85,68,140,77,246,40,227,190,116,44,87,133,180,199,169,102,215,9,24,195,122,108,28,204,203,183,227,28,112],[200,137,8,149,236,25,174,159,0,105,229,114,54,27,27,246,85,88,180,140,121,113,33,214,166,217,230,45,185,135,17,143],[255,244,180,7,14,84,205,186,11,115,136,195,19,181,17,79,123,160,68,240,197,243,182,245,131,87,74,190,252,65,21,2],[207,53,121,13,103,62,104,114,217,62,15,68,172,172,194,32,23,17,115,210,11,188,245,249,64,150,136,208,19,28,207,124],[105,237,102,58,80,169,24,194,238,74,50,253,218,7,78,39,119,89,130,71,40,223,108,21,154,87,38,218,19,98,203,231],[197,112,22,237,158,58,148,158,168,96,198,118,156,149,158,163,25,38,17,154,178,91,202,248,14,167,183,238,132,171,171,219],[121,244,251,99,162,111,40,228,36,3,160,234,134,62,64,0,250,200,109,168,104,239,54,195,48,130,216,149,219,27,143,117]], [[175,204,79,215,154,63,37,200,242,159,91,5,222,226,75,118,167,213,247,125,100,103,110,249,133,69,183,41,10,119,44,175],[251,176,241,221,69,50,37,122,18,245,133,140,63,182,114,154,3,97,107,245,14,78,4,182,209,1,167,100,145,89,198,13],[199,53,220,83,98,236,9,22,60,147,84,124,139,64,153,140,190,210,215,229,167,125,126,201,249,186,83,117,239,83,86,3],[3,54,42,106,81,211,139,253,96,90,26,71,50,232,134,27,87,66,3,21,84,171,228,254,154,85,71,135,50,164,160,0],[24,86,139,184,138,45,243,196,244,130,145,112,7,63,24,18,243,134,33,177,187,165,27,157,239,25,184,8,80,0,225,251],[20,194,105,45,0,15,231,195,68,187,148,10,227,175,33,254,191,130,126,178,40,238,61,91,47,104,21,10,252,8,229,122],[6,138,226,9,49,198,117,42,155,160,156,85,79,109,35,180,179,161,109,69,93,134,23,172,5,161,106,126,191,13,128,106]], 81, 159,{from: accounts[4]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [82,1,257,2,82,257,100], [[150,237,181,143,210,30,122,11,68,131,248,150,142,119,82,3,121,81,238,47,244,177,4,21,89,93,195,53,213,123,152,168],[165,87,108,105,34,7,155,106,242,91,140,135,19,111,43,13,13,83,151,82,217,138,73,165,134,193,160,109,127,163,84,207],[142,63,248,25,254,37,24,31,233,250,233,166,241,233,68,29,237,247,36,232,173,176,158,107,30,185,79,110,85,211,91,114],[126,132,152,53,78,205,182,94,99,88,108,92,100,125,103,173,25,56,142,134,47,75,6,164,87,166,109,245,31,172,245,0],[150,86,11,43,200,158,10,234,105,50,126,176,123,87,25,240,58,108,187,79,49,175,240,132,187,124,232,112,178,104,28,63],[51,206,148,61,63,73,237,32,70,204,4,52,236,183,96,201,130,196,200,171,122,49,214,130,126,38,47,21,174,194,231,158],[152,31,31,94,33,215,251,70,189,116,12,138,204,121,47,40,243,211,95,88,29,241,219,7,96,220,118,84,130,244,79,173]], [6,3,160,161,81,6,19], [[144,112,35,85,68,140,77,246,40,227,190,116,44,87,133,180,199,169,102,215,9,24,195,122,108,28,204,203,183,227,28,112],[200,137,8,149,236,25,174,159,0,105,229,114,54,27,27,246,85,88,180,140,121,113,33,214,166,217,230,45,185,135,17,143],[255,244,180,7,14,84,205,186,11,115,136,195,19,181,17,79,123,160,68,240,197,243,182,245,131,87,74,190,252,65,21,2],[207,53,121,13,103,62,104,114,217,62,15,68,172,172,194,32,23,17,115,210,11,188,245,249,64,150,136,208,19,28,207,124],[105,237,102,58,80,169,24,194,238,74,50,253,218,7,78,39,119,89,130,71,40,223,108,21,154,87,38,218,19,98,203,231],[197,112,22,237,158,58,148,158,168,96,198,118,156,149,158,163,25,38,17,154,178,91,202,248,14,167,183,238,132,171,171,219],[121,244,251,99,162,111,40,228,36,3,160,234,134,62,64,0,250,200,109,168,104,239,54,195,48,130,216,149,219,27,143,117]], [[175,204,79,215,154,63,37,200,242,159,91,5,222,226,75,118,167,213,247,125,100,103,110,249,133,69,183,41,10,119,44,175],[251,176,241,221,69,50,37,122,18,245,133,140,63,182,114,154,3,97,107,245,14,78,4,182,209,1,167,100,145,89,198,13],[199,53,220,83,98,236,9,22,60,147,84,124,139,64,153,140,190,210,215,229,167,125,126,201,249,186,83,117,239,83,86,3],[3,54,42,106,81,211,139,253,96,90,26,71,50,232,134,27,87,66,3,21,84,171,228,254,154,85,71,135,50,164,160,0],[24,86,139,184,138,45,243,196,244,130,145,112,7,63,24,18,243,134,33,177,187,165,27,157,239,25,184,8,80,0,225,251],[20,194,105,45,0,15,231,195,68,187,148,10,227,175,33,254,191,130,126,178,40,238,61,91,47,104,21,10,252,8,229,122],[6,138,226,9,49,198,117,42,155,160,156,85,79,109,35,180,179,161,109,69,93,134,23,172,5,161,106,126,191,13,128,106]], 81, 159,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [83,15,99,19,19,5,1338,99], [[150,237,181,143,210,30,122,11,68,131,248,150,142,119,82,3,121,81,238,47,244,177,4,21,89,93,195,53,213,123,152,168],[165,87,108,105,34,7,155,106,242,91,140,135,19,111,43,13,13,83,151,82,217,138,73,165,134,193,160,109,127,163,84,207],[142,63,248,25,254,37,24,31,233,250,233,166,241,233,68,29,237,247,36,232,173,176,158,107,30,185,79,110,85,211,91,114],[126,132,152,53,78,205,182,94,99,88,108,92,100,125,103,173,25,56,142,134,47,75,6,164,87,166,109,245,31,172,245,0],[150,86,11,43,200,158,10,234,105,50,126,176,123,87,25,240,58,108,187,79,49,175,240,132,187,124,232,112,178,104,28,63],[51,206,148,61,63,73,237,32,70,204,4,52,236,183,96,201,130,196,200,171,122,49,214,130,126,38,47,21,174,194,231,158],[152,31,31,94,33,215,251,70,189,116,12,138,204,121,47,40,243,211,95,88,29,241,219,7,96,220,118,84,130,244,79,173]], [6,3,160,161,81,6,19], [[144,112,35,85,68,140,77,246,40,227,190,116,44,87,133,180,199,169,102,215,9,24,195,122,108,28,204,203,183,227,28,112],[200,137,8,149,236,25,174,159,0,105,229,114,54,27,27,246,85,88,180,140,121,113,33,214,166,217,230,45,185,135,17,143],[255,244,180,7,14,84,205,186,11,115,136,195,19,181,17,79,123,160,68,240,197,243,182,245,131,87,74,190,252,65,21,2],[207,53,121,13,103,62,104,114,217,62,15,68,172,172,194,32,23,17,115,210,11,188,245,249,64,150,136,208,19,28,207,124],[105,237,102,58,80,169,24,194,238,74,50,253,218,7,78,39,119,89,130,71,40,223,108,21,154,87,38,218,19,98,203,231],[197,112,22,237,158,58,148,158,168,96,198,118,156,149,158,163,25,38,17,154,178,91,202,248,14,167,183,238,132,171,171,219],[121,244,251,99,162,111,40,228,36,3,160,234,134,62,64,0,250,200,109,168,104,239,54,195,48,130,216,149,219,27,143,117]], [[175,204,79,215,154,63,37,200,242,159,91,5,222,226,75,118,167,213,247,125,100,103,110,249,133,69,183,41,10,119,44,175],[251,176,241,221,69,50,37,122,18,245,133,140,63,182,114,154,3,97,107,245,14,78,4,182,209,1,167,100,145,89,198,13],[199,53,220,83,98,236,9,22,60,147,84,124,139,64,153,140,190,210,215,229,167,125,126,201,249,186,83,117,239,83,86,3],[3,54,42,106,81,211,139,253,96,90,26,71,50,232,134,27,87,66,3,21,84,171,228,254,154,85,71,135,50,164,160,0],[24,86,139,184,138,45,243,196,244,130,145,112,7,63,24,18,243,134,33,177,187,165,27,157,239,25,184,8,80,0,225,251],[20,194,105,45,0,15,231,195,68,187,148,10,227,175,33,254,191,130,126,178,40,238,61,91,47,104,21,10,252,8,229,122],[6,138,226,9,49,198,117,42,155,160,156,85,79,109,35,180,179,161,109,69,93,134,23,172,5,161,106,126,191,13,128,106]], 81, 159,{from: accounts[4]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [10,159,20,6,82,20,255,1000], [[150,237,181,143,210,30,122,11,68,131,248,150,142,119,82,3,121,81,238,47,244,177,4,21,89,93,195,53,213,123,152,168],[165,87,108,105,34,7,155,106,242,91,140,135,19,111,43,13,13,83,151,82,217,138,73,165,134,193,160,109,127,163,84,207],[142,63,248,25,254,37,24,31,233,250,233,166,241,233,68,29,237,247,36,232,173,176,158,107,30,185,79,110,85,211,91,114],[126,132,152,53,78,205,182,94,99,88,108,92,100,125,103,173,25,56,142,134,47,75,6,164,87,166,109,245,31,172,245,0],[150,86,11,43,200,158,10,234,105,50,126,176,123,87,25,240,58,108,187,79,49,175,240,132,187,124,232,112,178,104,28,63],[51,206,148,61,63,73,237,32,70,204,4,52,236,183,96,201,130,196,200,171,122,49,214,130,126,38,47,21,174,194,231,158],[152,31,31,94,33,215,251,70,189,116,12,138,204,121,47,40,243,211,95,88,29,241,219,7,96,220,118,84,130,244,79,173]], [6,3,160,161,81,6,19], [[144,112,35,85,68,140,77,246,40,227,190,116,44,87,133,180,199,169,102,215,9,24,195,122,108,28,204,203,183,227,28,112],[200,137,8,149,236,25,174,159,0,105,229,114,54,27,27,246,85,88,180,140,121,113,33,214,166,217,230,45,185,135,17,143],[255,244,180,7,14,84,205,186,11,115,136,195,19,181,17,79,123,160,68,240,197,243,182,245,131,87,74,190,252,65,21,2],[207,53,121,13,103,62,104,114,217,62,15,68,172,172,194,32,23,17,115,210,11,188,245,249,64,150,136,208,19,28,207,124],[105,237,102,58,80,169,24,194,238,74,50,253,218,7,78,39,119,89,130,71,40,223,108,21,154,87,38,218,19,98,203,231],[197,112,22,237,158,58,148,158,168,96,198,118,156,149,158,163,25,38,17,154,178,91,202,248,14,167,183,238,132,171,171,219],[121,244,251,99,162,111,40,228,36,3,160,234,134,62,64,0,250,200,109,168,104,239,54,195,48,130,216,149,219,27,143,117]], [[175,204,79,215,154,63,37,200,242,159,91,5,222,226,75,118,167,213,247,125,100,103,110,249,133,69,183,41,10,119,44,175],[251,176,241,221,69,50,37,122,18,245,133,140,63,182,114,154,3,97,107,245,14,78,4,182,209,1,167,100,145,89,198,13],[199,53,220,83,98,236,9,22,60,147,84,124,139,64,153,140,190,210,215,229,167,125,126,201,249,186,83,117,239,83,86,3],[3,54,42,106,81,211,139,253,96,90,26,71,50,232,134,27,87,66,3,21,84,171,228,254,154,85,71,135,50,164,160,0],[24,86,139,184,138,45,243,196,244,130,145,112,7,63,24,18,243,134,33,177,187,165,27,157,239,25,184,8,80,0,225,251],[20,194,105,45,0,15,231,195,68,187,148,10,227,175,33,254,191,130,126,178,40,238,61,91,47,104,21,10,252,8,229,122],[6,138,226,9,49,198,117,42,155,160,156,85,79,109,35,180,179,161,109,69,93,134,23,172,5,161,106,126,191,13,128,106]], 81, 159,{from: accounts[4]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [1337,15,159,0,161,6,16,1337], [[150,237,181,143,210,30,122,11,68,131,248,150,142,119,82,3,121,81,238,47,244,177,4,21,89,93,195,53,213,123,152,168],[165,87,108,105,34,7,155,106,242,91,140,135,19,111,43,13,13,83,151,82,217,138,73,165,134,193,160,109,127,163,84,207],[142,63,248,25,254,37,24,31,233,250,233,166,241,233,68,29,237,247,36,232,173,176,158,107,30,185,79,110,85,211,91,114],[126,132,152,53,78,205,182,94,99,88,108,92,100,125,103,173,25,56,142,134,47,75,6,164,87,166,109,245,31,172,245,0],[150,86,11,43,200,158,10,234,105,50,126,176,123,87,25,240,58,108,187,79,49,175,240,132,187,124,232,112,178,104,28,63],[51,206,148,61,63,73,237,32,70,204,4,52,236,183,96,201,130,196,200,171,122,49,214,130,126,38,47,21,174,194,231,158],[152,31,31,94,33,215,251,70,189,116,12,138,204,121,47,40,243,211,95,88,29,241,219,7,96,220,118,84,130,244,79,173]], [6,3,160,161,81,6,19], [[144,112,35,85,68,140,77,246,40,227,190,116,44,87,133,180,199,169,102,215,9,24,195,122,108,28,204,203,183,227,28,112],[200,137,8,149,236,25,174,159,0,105,229,114,54,27,27,246,85,88,180,140,121,113,33,214,166,217,230,45,185,135,17,143],[255,244,180,7,14,84,205,186,11,115,136,195,19,181,17,79,123,160,68,240,197,243,182,245,131,87,74,190,252,65,21,2],[207,53,121,13,103,62,104,114,217,62,15,68,172,172,194,32,23,17,115,210,11,188,245,249,64,150,136,208,19,28,207,124],[105,237,102,58,80,169,24,194,238,74,50,253,218,7,78,39,119,89,130,71,40,223,108,21,154,87,38,218,19,98,203,231],[197,112,22,237,158,58,148,158,168,96,198,118,156,149,158,163,25,38,17,154,178,91,202,248,14,167,183,238,132,171,171,219],[121,244,251,99,162,111,40,228,36,3,160,234,134,62,64,0,250,200,109,168,104,239,54,195,48,130,216,149,219,27,143,117]], [[175,204,79,215,154,63,37,200,242,159,91,5,222,226,75,118,167,213,247,125,100,103,110,249,133,69,183,41,10,119,44,175],[251,176,241,221,69,50,37,122,18,245,133,140,63,182,114,154,3,97,107,245,14,78,4,182,209,1,167,100,145,89,198,13],[199,53,220,83,98,236,9,22,60,147,84,124,139,64,153,140,190,210,215,229,167,125,126,201,249,186,83,117,239,83,86,3],[3,54,42,106,81,211,139,253,96,90,26,71,50,232,134,27,87,66,3,21,84,171,228,254,154,85,71,135,50,164,160,0],[24,86,139,184,138,45,243,196,244,130,145,112,7,63,24,18,243,134,33,177,187,165,27,157,239,25,184,8,80,0,225,251],[20,194,105,45,0,15,231,195,68,187,148,10,227,175,33,254,191,130,126,178,40,238,61,91,47,104,21,10,252,8,229,122],[6,138,226,9,49,198,117,42,155,160,156,85,79,109,35,180,179,161,109,69,93,134,23,172,5,161,106,126,191,13,128,106]], 81, 159,{from: accounts[4]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[3], accounts[1], [0,999,1337,159,10000,15,2,17], [[150,237,181,143,210,30,122,11,68,131,248,150,142,119,82,3,121,81,238,47,244,177,4,21,89,93,195,53,213,123,152,168],[165,87,108,105,34,7,155,106,242,91,140,135,19,111,43,13,13,83,151,82,217,138,73,165,134,193,160,109,127,163,84,207],[142,63,248,25,254,37,24,31,233,250,233,166,241,233,68,29,237,247,36,232,173,176,158,107,30,185,79,110,85,211,91,114],[126,132,152,53,78,205,182,94,99,88,108,92,100,125,103,173,25,56,142,134,47,75,6,164,87,166,109,245,31,172,245,0],[150,86,11,43,200,158,10,234,105,50,126,176,123,87,25,240,58,108,187,79,49,175,240,132,187,124,232,112,178,104,28,63],[51,206,148,61,63,73,237,32,70,204,4,52,236,183,96,201,130,196,200,171,122,49,214,130,126,38,47,21,174,194,231,158],[152,31,31,94,33,215,251,70,189,116,12,138,204,121,47,40,243,211,95,88,29,241,219,7,96,220,118,84,130,244,79,173]], [6,3,160,161,81,6,19], [[144,112,35,85,68,140,77,246,40,227,190,116,44,87,133,180,199,169,102,215,9,24,195,122,108,28,204,203,183,227,28,112],[200,137,8,149,236,25,174,159,0,105,229,114,54,27,27,246,85,88,180,140,121,113,33,214,166,217,230,45,185,135,17,143],[255,244,180,7,14,84,205,186,11,115,136,195,19,181,17,79,123,160,68,240,197,243,182,245,131,87,74,190,252,65,21,2],[207,53,121,13,103,62,104,114,217,62,15,68,172,172,194,32,23,17,115,210,11,188,245,249,64,150,136,208,19,28,207,124],[105,237,102,58,80,169,24,194,238,74,50,253,218,7,78,39,119,89,130,71,40,223,108,21,154,87,38,218,19,98,203,231],[197,112,22,237,158,58,148,158,168,96,198,118,156,149,158,163,25,38,17,154,178,91,202,248,14,167,183,238,132,171,171,219],[121,244,251,99,162,111,40,228,36,3,160,234,134,62,64,0,250,200,109,168,104,239,54,195,48,130,216,149,219,27,143,117]], [[175,204,79,215,154,63,37,200,242,159,91,5,222,226,75,118,167,213,247,125,100,103,110,249,133,69,183,41,10,119,44,175],[251,176,241,221,69,50,37,122,18,245,133,140,63,182,114,154,3,97,107,245,14,78,4,182,209,1,167,100,145,89,198,13],[199,53,220,83,98,236,9,22,60,147,84,124,139,64,153,140,190,210,215,229,167,125,126,201,249,186,83,117,239,83,86,3],[3,54,42,106,81,211,139,253,96,90,26,71,50,232,134,27,87,66,3,21,84,171,228,254,154,85,71,135,50,164,160,0],[24,86,139,184,138,45,243,196,244,130,145,112,7,63,24,18,243,134,33,177,187,165,27,157,239,25,184,8,80,0,225,251],[20,194,105,45,0,15,231,195,68,187,148,10,227,175,33,254,191,130,126,178,40,238,61,91,47,104,21,10,252,8,229,122],[6,138,226,9,49,198,117,42,155,160,156,85,79,109,35,180,179,161,109,69,93,134,23,172,5,161,106,126,191,13,128,106]], 81, 159,{from: accounts[4]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[0], 14, [43,114,70,18,241,41,188,196,144,185,247,231,51,14,80,247,7,110,110,224,195,209,226,55,103,162,34,252,41,3,246,216], 14, [213,146,12,114,218,7,81,138,70,64,87,110,102,175,105,249,69,219,200,245,241,102,35,216,8,82,45,156,67,18,74,174], [97,40,162,215,230,80,247,202,150,242,0,225,52,218,95,180,48,239,169,1,94,114,37,235,162,152,58,252,205,218,98,132], 2,{from: accounts[4]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[0], 14, [43,114,70,18,241,41,188,196,144,185,247,231,51,14,80,247,7,110,110,224,195,209,226,55,103,162,34,252,41,3,246,216], 14, [213,146,12,114,218,7,81,138,70,64,87,110,102,175,105,249,69,219,200,245,241,102,35,216,8,82,45,156,67,18,74,174], [97,40,162,215,230,80,247,202,150,242,0,225,52,218,95,180,48,239,169,1,94,114,37,235,162,152,58,252,205,218,98,132], 2,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[0], 14, [43,114,70,18,241,41,188,196,144,185,247,231,51,14,80,247,7,110,110,224,195,209,226,55,103,162,34,252,41,3,246,216], 14, [213,146,12,114,218,7,81,138,70,64,87,110,102,175,105,249,69,219,200,245,241,102,35,216,8,82,45,156,67,18,74,174], [97,40,162,215,230,80,247,202,150,242,0,225,52,218,95,180,48,239,169,1,94,114,37,235,162,152,58,252,205,218,98,132], 15,{from: accounts[4]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[3], 83,{from: accounts[4]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[3], 83,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[4], accounts[0], 15, [133,20,36,80,37,189,110,56,84,215,80,243,105,79,70,230,218,118,193,8,9,197,113,99,220,42,157,114,12,83,85,153], 14, [32,124,10,143,1,111,122,23,112,83,204,189,53,250,163,34,153,75,19,118,57,144,135,134,104,15,207,206,240,80,1,81], [143,158,149,112,34,83,141,75,156,70,209,144,40,129,21,182,113,12,45,179,246,2,240,170,166,169,29,75,241,14,149,146],{from: accounts[0]});
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
