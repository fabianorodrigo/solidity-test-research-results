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
    contractGNTAllocation = await GNTAllocation.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[6],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[1],accounts[1],(await web3.eth.getBlockNumber())+709,(await web3.eth.getBlockNumber())+709+166,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[1],accounts[1],(await web3.eth.getBlockNumber())+709,(await web3.eth.getBlockNumber())+709+166,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[9],5,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[9],5,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBurnableToken.address,accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBurnableToken.address,accounts[1],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[3],accounts[6],19,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[3],accounts[6],19,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[1],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[7],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[0], 14,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[5],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(9,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(9,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(9999,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(9999,{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.onTokenReceived(accounts[0], 16, [61,188,89,115,141,155,179,29,220,190,240,67,133,169,105,73,242,35,226,3,197,85,96,251,166,143,173,182,176,105,153,214],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[7],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[3], 15,{from: accounts[3]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[3], 15,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[5], 10001,{from: accounts[3]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[5], 10001,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[5], 3, [14,69,220,141,208,183,159,44,71,157,106,174,170,172,132,240,98,56,176,173,97,84,183,55,127,157,131,197,168,44,192,229], 9, [185,235,208,115,70,222,84,162,245,154,21,40,120,117,125,143,102,62,47,250,165,185,51,163,12,154,61,178,29,246,14,156], [226,228,22,95,3,57,6,195,165,141,39,75,40,248,53,149,12,133,194,48,188,120,61,95,110,160,71,244,248,22,215,232], 1,{from: accounts[3]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[5], 3, [14,69,220,141,208,183,159,44,71,157,106,174,170,172,132,240,98,56,176,173,97,84,183,55,127,157,131,197,168,44,192,229], 9, [185,235,208,115,70,222,84,162,245,154,21,40,120,117,125,143,102,62,47,250,165,185,51,163,12,154,61,178,29,246,14,156], [226,228,22,95,3,57,6,195,165,141,39,75,40,248,53,149,12,133,194,48,188,120,61,95,110,160,71,244,248,22,215,232], 1,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[5], 3, [14,69,220,141,208,183,159,44,71,157,106,174,170,172,132,240,98,56,176,173,97,84,183,55,127,157,131,197,168,44,192,229], 9, [185,235,208,115,70,222,84,162,245,154,21,40,120,117,125,143,102,62,47,250,165,185,51,163,12,154,61,178,29,246,14,156], [226,228,22,95,3,57,6,195,165,141,39,75,40,248,53,149,12,133,194,48,188,120,61,95,110,160,71,244,248,22,215,232], 4,{from: accounts[3]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [1337,159,0,3], [[159,7,47,36,159,146,171,0,84,240,4,17,31,54,103,36,188,154,93,52,107,211,55,190,45,161,100,51,51,68,121,185],[145,236,87,51,65,229,249,104,134,90,176,222,1,237,251,108,48,178,59,161,165,201,4,254,78,201,48,206,255,182,231,31],[100,166,183,58,39,245,74,3,120,26,230,17,160,5,219,79,222,111,188,15,132,18,101,107,2,223,158,109,31,155,179,89],[228,105,34,15,46,71,245,233,243,156,5,149,108,211,53,0,137,134,221,165,19,229,31,104,101,157,70,29,70,26,28,41]], [161,101,5,15], [[60,225,197,107,0,1,164,240,190,7,37,62,103,69,78,112,65,220,218,207,170,220,104,117,250,231,188,105,208,199,148,94],[16,103,112,142,217,169,222,163,187,223,236,185,44,8,27,153,87,36,146,22,188,29,228,37,109,188,13,56,222,161,51,147],[204,90,35,227,173,164,11,181,64,134,121,2,7,221,141,163,45,227,55,0,210,237,88,9,224,136,26,128,15,63,223,100],[70,111,10,106,15,119,183,236,205,49,246,69,59,205,189,86,22,70,67,179,158,240,183,33,31,55,4,119,82,180,82,253]], [[112,203,189,180,135,236,80,60,29,193,12,60,100,58,212,197,82,124,34,169,130,39,189,142,169,7,43,24,108,216,125,99],[108,54,200,128,32,90,110,143,61,72,166,110,21,207,74,139,165,254,142,204,182,193,186,156,70,28,61,158,100,67,169,81],[34,169,120,85,8,219,161,116,181,236,82,139,91,227,138,106,252,145,73,39,91,197,0,227,9,21,139,140,32,224,120,195],[96,219,224,62,197,247,115,69,106,123,40,204,61,73,187,198,121,125,155,169,20,68,15,198,33,255,37,122,14,168,6,91]], 6, 14,{from: accounts[3]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [1337,159,0,3], [[159,7,47,36,159,146,171,0,84,240,4,17,31,54,103,36,188,154,93,52,107,211,55,190,45,161,100,51,51,68,121,185],[145,236,87,51,65,229,249,104,134,90,176,222,1,237,251,108,48,178,59,161,165,201,4,254,78,201,48,206,255,182,231,31],[100,166,183,58,39,245,74,3,120,26,230,17,160,5,219,79,222,111,188,15,132,18,101,107,2,223,158,109,31,155,179,89],[228,105,34,15,46,71,245,233,243,156,5,149,108,211,53,0,137,134,221,165,19,229,31,104,101,157,70,29,70,26,28,41]], [161,101,5,15], [[60,225,197,107,0,1,164,240,190,7,37,62,103,69,78,112,65,220,218,207,170,220,104,117,250,231,188,105,208,199,148,94],[16,103,112,142,217,169,222,163,187,223,236,185,44,8,27,153,87,36,146,22,188,29,228,37,109,188,13,56,222,161,51,147],[204,90,35,227,173,164,11,181,64,134,121,2,7,221,141,163,45,227,55,0,210,237,88,9,224,136,26,128,15,63,223,100],[70,111,10,106,15,119,183,236,205,49,246,69,59,205,189,86,22,70,67,179,158,240,183,33,31,55,4,119,82,180,82,253]], [[112,203,189,180,135,236,80,60,29,193,12,60,100,58,212,197,82,124,34,169,130,39,189,142,169,7,43,24,108,216,125,99],[108,54,200,128,32,90,110,143,61,72,166,110,21,207,74,139,165,254,142,204,182,193,186,156,70,28,61,158,100,67,169,81],[34,169,120,85,8,219,161,116,181,236,82,139,91,227,138,106,252,145,73,39,91,197,0,227,9,21,139,140,32,224,120,195],[96,219,224,62,197,247,115,69,106,123,40,204,61,73,187,198,121,125,155,169,20,68,15,198,33,255,37,122,14,168,6,91]], 6, 14,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [14,0,256,21,99], [[159,7,47,36,159,146,171,0,84,240,4,17,31,54,103,36,188,154,93,52,107,211,55,190,45,161,100,51,51,68,121,185],[145,236,87,51,65,229,249,104,134,90,176,222,1,237,251,108,48,178,59,161,165,201,4,254,78,201,48,206,255,182,231,31],[100,166,183,58,39,245,74,3,120,26,230,17,160,5,219,79,222,111,188,15,132,18,101,107,2,223,158,109,31,155,179,89],[228,105,34,15,46,71,245,233,243,156,5,149,108,211,53,0,137,134,221,165,19,229,31,104,101,157,70,29,70,26,28,41]], [161,101,5,15], [[60,225,197,107,0,1,164,240,190,7,37,62,103,69,78,112,65,220,218,207,170,220,104,117,250,231,188,105,208,199,148,94],[16,103,112,142,217,169,222,163,187,223,236,185,44,8,27,153,87,36,146,22,188,29,228,37,109,188,13,56,222,161,51,147],[204,90,35,227,173,164,11,181,64,134,121,2,7,221,141,163,45,227,55,0,210,237,88,9,224,136,26,128,15,63,223,100],[70,111,10,106,15,119,183,236,205,49,246,69,59,205,189,86,22,70,67,179,158,240,183,33,31,55,4,119,82,180,82,253]], [[112,203,189,180,135,236,80,60,29,193,12,60,100,58,212,197,82,124,34,169,130,39,189,142,169,7,43,24,108,216,125,99],[108,54,200,128,32,90,110,143,61,72,166,110,21,207,74,139,165,254,142,204,182,193,186,156,70,28,61,158,100,67,169,81],[34,169,120,85,8,219,161,116,181,236,82,139,91,227,138,106,252,145,73,39,91,197,0,227,9,21,139,140,32,224,120,195],[96,219,224,62,197,247,115,69,106,123,40,204,61,73,187,198,121,125,155,169,20,68,15,198,33,255,37,122,14,168,6,91]], 6, 14,{from: accounts[3]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [4,1336,10000,1337,1001], [[159,7,47,36,159,146,171,0,84,240,4,17,31,54,103,36,188,154,93,52,107,211,55,190,45,161,100,51,51,68,121,185],[145,236,87,51,65,229,249,104,134,90,176,222,1,237,251,108,48,178,59,161,165,201,4,254,78,201,48,206,255,182,231,31],[100,166,183,58,39,245,74,3,120,26,230,17,160,5,219,79,222,111,188,15,132,18,101,107,2,223,158,109,31,155,179,89],[228,105,34,15,46,71,245,233,243,156,5,149,108,211,53,0,137,134,221,165,19,229,31,104,101,157,70,29,70,26,28,41]], [161,101,5,15], [[60,225,197,107,0,1,164,240,190,7,37,62,103,69,78,112,65,220,218,207,170,220,104,117,250,231,188,105,208,199,148,94],[16,103,112,142,217,169,222,163,187,223,236,185,44,8,27,153,87,36,146,22,188,29,228,37,109,188,13,56,222,161,51,147],[204,90,35,227,173,164,11,181,64,134,121,2,7,221,141,163,45,227,55,0,210,237,88,9,224,136,26,128,15,63,223,100],[70,111,10,106,15,119,183,236,205,49,246,69,59,205,189,86,22,70,67,179,158,240,183,33,31,55,4,119,82,180,82,253]], [[112,203,189,180,135,236,80,60,29,193,12,60,100,58,212,197,82,124,34,169,130,39,189,142,169,7,43,24,108,216,125,99],[108,54,200,128,32,90,110,143,61,72,166,110,21,207,74,139,165,254,142,204,182,193,186,156,70,28,61,158,100,67,169,81],[34,169,120,85,8,219,161,116,181,236,82,139,91,227,138,106,252,145,73,39,91,197,0,227,9,21,139,140,32,224,120,195],[96,219,224,62,197,247,115,69,106,123,40,204,61,73,187,198,121,125,155,169,20,68,15,198,33,255,37,122,14,168,6,91]], 6, 14,{from: accounts[3]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [18,100,17,255,0], [[159,7,47,36,159,146,171,0,84,240,4,17,31,54,103,36,188,154,93,52,107,211,55,190,45,161,100,51,51,68,121,185],[145,236,87,51,65,229,249,104,134,90,176,222,1,237,251,108,48,178,59,161,165,201,4,254,78,201,48,206,255,182,231,31],[100,166,183,58,39,245,74,3,120,26,230,17,160,5,219,79,222,111,188,15,132,18,101,107,2,223,158,109,31,155,179,89],[228,105,34,15,46,71,245,233,243,156,5,149,108,211,53,0,137,134,221,165,19,229,31,104,101,157,70,29,70,26,28,41]], [161,101,5,15], [[60,225,197,107,0,1,164,240,190,7,37,62,103,69,78,112,65,220,218,207,170,220,104,117,250,231,188,105,208,199,148,94],[16,103,112,142,217,169,222,163,187,223,236,185,44,8,27,153,87,36,146,22,188,29,228,37,109,188,13,56,222,161,51,147],[204,90,35,227,173,164,11,181,64,134,121,2,7,221,141,163,45,227,55,0,210,237,88,9,224,136,26,128,15,63,223,100],[70,111,10,106,15,119,183,236,205,49,246,69,59,205,189,86,22,70,67,179,158,240,183,33,31,55,4,119,82,180,82,253]], [[112,203,189,180,135,236,80,60,29,193,12,60,100,58,212,197,82,124,34,169,130,39,189,142,169,7,43,24,108,216,125,99],[108,54,200,128,32,90,110,143,61,72,166,110,21,207,74,139,165,254,142,204,182,193,186,156,70,28,61,158,100,67,169,81],[34,169,120,85,8,219,161,116,181,236,82,139,91,227,138,106,252,145,73,39,91,197,0,227,9,21,139,140,32,224,120,195],[96,219,224,62,197,247,115,69,106,123,40,204,61,73,187,198,121,125,155,169,20,68,15,198,33,255,37,122,14,168,6,91]], 6, 14,{from: accounts[3]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[4], accounts[3], [6,15,18,10001,4], [[159,7,47,36,159,146,171,0,84,240,4,17,31,54,103,36,188,154,93,52,107,211,55,190,45,161,100,51,51,68,121,185],[145,236,87,51,65,229,249,104,134,90,176,222,1,237,251,108,48,178,59,161,165,201,4,254,78,201,48,206,255,182,231,31],[100,166,183,58,39,245,74,3,120,26,230,17,160,5,219,79,222,111,188,15,132,18,101,107,2,223,158,109,31,155,179,89],[228,105,34,15,46,71,245,233,243,156,5,149,108,211,53,0,137,134,221,165,19,229,31,104,101,157,70,29,70,26,28,41]], [161,101,5,15], [[60,225,197,107,0,1,164,240,190,7,37,62,103,69,78,112,65,220,218,207,170,220,104,117,250,231,188,105,208,199,148,94],[16,103,112,142,217,169,222,163,187,223,236,185,44,8,27,153,87,36,146,22,188,29,228,37,109,188,13,56,222,161,51,147],[204,90,35,227,173,164,11,181,64,134,121,2,7,221,141,163,45,227,55,0,210,237,88,9,224,136,26,128,15,63,223,100],[70,111,10,106,15,119,183,236,205,49,246,69,59,205,189,86,22,70,67,179,158,240,183,33,31,55,4,119,82,180,82,253]], [[112,203,189,180,135,236,80,60,29,193,12,60,100,58,212,197,82,124,34,169,130,39,189,142,169,7,43,24,108,216,125,99],[108,54,200,128,32,90,110,143,61,72,166,110,21,207,74,139,165,254,142,204,182,193,186,156,70,28,61,158,100,67,169,81],[34,169,120,85,8,219,161,116,181,236,82,139,91,227,138,106,252,145,73,39,91,197,0,227,9,21,139,140,32,224,120,195],[96,219,224,62,197,247,115,69,106,123,40,204,61,73,187,198,121,125,155,169,20,68,15,198,33,255,37,122,14,168,6,91]], 6, 14,{from: accounts[3]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 159, [25,53,225,64,252,243,118,163,169,65,15,232,156,107,234,26,189,42,31,134,28,238,231,133,119,184,75,225,145,29,70,239], 20, [237,88,201,68,126,140,149,65,137,222,179,244,60,152,240,53,129,79,53,108,158,42,99,93,176,125,122,138,22,124,174,182], [254,158,76,108,165,116,70,240,78,220,34,87,117,54,224,47,68,36,249,183,22,204,40,45,189,217,74,131,222,106,23,203], 11,{from: accounts[3]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 159, [25,53,225,64,252,243,118,163,169,65,15,232,156,107,234,26,189,42,31,134,28,238,231,133,119,184,75,225,145,29,70,239], 20, [237,88,201,68,126,140,149,65,137,222,179,244,60,152,240,53,129,79,53,108,158,42,99,93,176,125,122,138,22,124,174,182], [254,158,76,108,165,116,70,240,78,220,34,87,117,54,224,47,68,36,249,183,22,204,40,45,189,217,74,131,222,106,23,203], 11,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 159, [25,53,225,64,252,243,118,163,169,65,15,232,156,107,234,26,189,42,31,134,28,238,231,133,119,184,75,225,145,29,70,239], 20, [237,88,201,68,126,140,149,65,137,222,179,244,60,152,240,53,129,79,53,108,158,42,99,93,176,125,122,138,22,124,174,182], [254,158,76,108,165,116,70,240,78,220,34,87,117,54,224,47,68,36,249,183,22,204,40,45,189,217,74,131,222,106,23,203], 160,{from: accounts[3]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[5], 82,{from: accounts[3]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[5], 82,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[9], accounts[4], 100, [83,241,107,41,164,230,228,163,92,148,233,245,224,57,130,19,95,184,246,44,182,163,140,214,96,84,122,141,15,36,80,242], 17, [223,35,59,112,9,89,132,168,7,204,29,134,240,71,130,21,52,149,255,53,52,50,214,255,40,128,81,243,128,106,39,91], [50,53,162,88,220,112,141,53,20,123,152,215,8,209,1,184,110,151,93,29,250,200,248,237,108,147,87,110,76,81,106,227],{from: accounts[0]});
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
