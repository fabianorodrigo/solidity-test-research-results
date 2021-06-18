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
    contractGNTAllocation = await GNTAllocation.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[2],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[4],accounts[3],(await web3.eth.getBlockNumber())+206,(await web3.eth.getBlockNumber())+206+328,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[4],accounts[3],(await web3.eth.getBlockNumber())+206,(await web3.eth.getBlockNumber())+206+328,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[2],15,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[2],15,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[3],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[1],99,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[1],99,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[3],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[4],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[0],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[7],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[8], 83,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[9],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[9],{from: accounts[9]}),'revert');
  });
  it('Should fail transferConcent(address) when NOT comply with: _newConcent != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute transferColdwallet(address) WHEN msg.sender==_owner,_newColdwallet!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferColdwallet(accounts[3],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(10000,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(10000,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(1000,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(1000,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(160,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(160,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[4], 10001, [168,133,29,234,125,253,115,144,181,73,210,3,143,231,187,147,187,233,124,251,191,174,70,128,240,118,155,224,118,200,121,126],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[4],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[2], 9999,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[2], 9999,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[8], 10000,{from: accounts[8]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[8], 10000,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[5], 4, [59,35,254,146,228,112,129,75,237,130,53,115,21,97,203,217,150,121,80,126,193,79,180,114,99,148,46,61,171,147,162,78], 14, [254,243,201,199,184,247,28,187,252,235,60,224,83,35,42,158,105,123,86,43,69,207,179,75,226,131,138,169,196,103,151,241], [68,189,20,25,56,147,27,127,21,47,124,75,207,190,60,81,70,84,236,61,56,163,21,83,45,11,67,14,34,10,58,219], 0,{from: accounts[8]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[5], 4, [59,35,254,146,228,112,129,75,237,130,53,115,21,97,203,217,150,121,80,126,193,79,180,114,99,148,46,61,171,147,162,78], 14, [254,243,201,199,184,247,28,187,252,235,60,224,83,35,42,158,105,123,86,43,69,207,179,75,226,131,138,169,196,103,151,241], [68,189,20,25,56,147,27,127,21,47,124,75,207,190,60,81,70,84,236,61,56,163,21,83,45,11,67,14,34,10,58,219], 0,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[2], accounts[5], 4, [59,35,254,146,228,112,129,75,237,130,53,115,21,97,203,217,150,121,80,126,193,79,180,114,99,148,46,61,171,147,162,78], 14, [254,243,201,199,184,247,28,187,252,235,60,224,83,35,42,158,105,123,86,43,69,207,179,75,226,131,138,169,196,103,151,241], [68,189,20,25,56,147,27,127,21,47,124,75,207,190,60,81,70,84,236,61,56,163,21,83,45,11,67,14,34,10,58,219], 5,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[9], [9,83,15], [[252,114,153,2,37,178,102,69,109,215,93,163,206,166,118,26,187,168,172,237,201,191,171,47,157,145,245,2,92,12,76,98],[137,203,146,252,178,37,235,173,26,121,246,193,149,63,215,223,60,147,238,42,246,242,135,2,122,185,208,115,71,182,60,160],[25,127,173,16,153,84,222,166,49,168,22,67,24,71,136,221,171,186,130,8,8,56,178,49,148,122,60,42,207,21,190,155]], [21,160,4], [[97,102,105,135,81,18,130,152,246,224,90,208,242,213,240,199,178,48,254,206,1,160,2,212,217,216,117,179,20,30,46,50],[190,225,121,84,6,228,141,238,233,54,2,139,245,226,214,176,49,237,35,189,238,218,193,219,9,252,118,131,22,215,159,54],[194,142,28,134,5,134,150,162,139,216,231,154,61,34,215,93,174,10,118,64,20,39,6,177,52,35,50,90,213,88,152,115]], [[0,193,119,102,40,67,234,130,124,199,216,102,170,81,148,205,138,64,110,255,214,207,115,135,32,77,48,64,166,36,234,139],[70,6,242,110,130,45,28,150,25,91,47,122,133,121,168,134,26,120,23,172,58,227,54,35,89,157,47,253,91,132,130,137],[254,177,253,176,123,194,80,96,153,28,3,177,226,245,104,4,240,224,18,159,141,48,238,159,198,215,106,215,88,102,80,222]], 4, 10000,{from: accounts[8]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[9], [9,83,15], [[252,114,153,2,37,178,102,69,109,215,93,163,206,166,118,26,187,168,172,237,201,191,171,47,157,145,245,2,92,12,76,98],[137,203,146,252,178,37,235,173,26,121,246,193,149,63,215,223,60,147,238,42,246,242,135,2,122,185,208,115,71,182,60,160],[25,127,173,16,153,84,222,166,49,168,22,67,24,71,136,221,171,186,130,8,8,56,178,49,148,122,60,42,207,21,190,155]], [21,160,4], [[97,102,105,135,81,18,130,152,246,224,90,208,242,213,240,199,178,48,254,206,1,160,2,212,217,216,117,179,20,30,46,50],[190,225,121,84,6,228,141,238,233,54,2,139,245,226,214,176,49,237,35,189,238,218,193,219,9,252,118,131,22,215,159,54],[194,142,28,134,5,134,150,162,139,216,231,154,61,34,215,93,174,10,118,64,20,39,6,177,52,35,50,90,213,88,152,115]], [[0,193,119,102,40,67,234,130,124,199,216,102,170,81,148,205,138,64,110,255,214,207,115,135,32,77,48,64,166,36,234,139],[70,6,242,110,130,45,28,150,25,91,47,122,133,121,168,134,26,120,23,172,58,227,54,35,89,157,47,253,91,132,130,137],[254,177,253,176,123,194,80,96,153,28,3,177,226,245,104,4,240,224,18,159,141,48,238,159,198,215,106,215,88,102,80,222]], 4, 10000,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[9], [256,2,101,159], [[252,114,153,2,37,178,102,69,109,215,93,163,206,166,118,26,187,168,172,237,201,191,171,47,157,145,245,2,92,12,76,98],[137,203,146,252,178,37,235,173,26,121,246,193,149,63,215,223,60,147,238,42,246,242,135,2,122,185,208,115,71,182,60,160],[25,127,173,16,153,84,222,166,49,168,22,67,24,71,136,221,171,186,130,8,8,56,178,49,148,122,60,42,207,21,190,155]], [21,160,4], [[97,102,105,135,81,18,130,152,246,224,90,208,242,213,240,199,178,48,254,206,1,160,2,212,217,216,117,179,20,30,46,50],[190,225,121,84,6,228,141,238,233,54,2,139,245,226,214,176,49,237,35,189,238,218,193,219,9,252,118,131,22,215,159,54],[194,142,28,134,5,134,150,162,139,216,231,154,61,34,215,93,174,10,118,64,20,39,6,177,52,35,50,90,213,88,152,115]], [[0,193,119,102,40,67,234,130,124,199,216,102,170,81,148,205,138,64,110,255,214,207,115,135,32,77,48,64,166,36,234,139],[70,6,242,110,130,45,28,150,25,91,47,122,133,121,168,134,26,120,23,172,58,227,54,35,89,157,47,253,91,132,130,137],[254,177,253,176,123,194,80,96,153,28,3,177,226,245,104,4,240,224,18,159,141,48,238,159,198,215,106,215,88,102,80,222]], 4, 10000,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[9], [83,15,160,1000], [[252,114,153,2,37,178,102,69,109,215,93,163,206,166,118,26,187,168,172,237,201,191,171,47,157,145,245,2,92,12,76,98],[137,203,146,252,178,37,235,173,26,121,246,193,149,63,215,223,60,147,238,42,246,242,135,2,122,185,208,115,71,182,60,160],[25,127,173,16,153,84,222,166,49,168,22,67,24,71,136,221,171,186,130,8,8,56,178,49,148,122,60,42,207,21,190,155]], [21,160,4], [[97,102,105,135,81,18,130,152,246,224,90,208,242,213,240,199,178,48,254,206,1,160,2,212,217,216,117,179,20,30,46,50],[190,225,121,84,6,228,141,238,233,54,2,139,245,226,214,176,49,237,35,189,238,218,193,219,9,252,118,131,22,215,159,54],[194,142,28,134,5,134,150,162,139,216,231,154,61,34,215,93,174,10,118,64,20,39,6,177,52,35,50,90,213,88,152,115]], [[0,193,119,102,40,67,234,130,124,199,216,102,170,81,148,205,138,64,110,255,214,207,115,135,32,77,48,64,166,36,234,139],[70,6,242,110,130,45,28,150,25,91,47,122,133,121,168,134,26,120,23,172,58,227,54,35,89,157,47,253,91,132,130,137],[254,177,253,176,123,194,80,96,153,28,3,177,226,245,104,4,240,224,18,159,141,48,238,159,198,215,106,215,88,102,80,222]], 4, 10000,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[9], [159,1,160,10], [[252,114,153,2,37,178,102,69,109,215,93,163,206,166,118,26,187,168,172,237,201,191,171,47,157,145,245,2,92,12,76,98],[137,203,146,252,178,37,235,173,26,121,246,193,149,63,215,223,60,147,238,42,246,242,135,2,122,185,208,115,71,182,60,160],[25,127,173,16,153,84,222,166,49,168,22,67,24,71,136,221,171,186,130,8,8,56,178,49,148,122,60,42,207,21,190,155]], [21,160,4], [[97,102,105,135,81,18,130,152,246,224,90,208,242,213,240,199,178,48,254,206,1,160,2,212,217,216,117,179,20,30,46,50],[190,225,121,84,6,228,141,238,233,54,2,139,245,226,214,176,49,237,35,189,238,218,193,219,9,252,118,131,22,215,159,54],[194,142,28,134,5,134,150,162,139,216,231,154,61,34,215,93,174,10,118,64,20,39,6,177,52,35,50,90,213,88,152,115]], [[0,193,119,102,40,67,234,130,124,199,216,102,170,81,148,205,138,64,110,255,214,207,115,135,32,77,48,64,166,36,234,139],[70,6,242,110,130,45,28,150,25,91,47,122,133,121,168,134,26,120,23,172,58,227,54,35,89,157,47,253,91,132,130,137],[254,177,253,176,123,194,80,96,153,28,3,177,226,245,104,4,240,224,18,159,141,48,238,159,198,215,106,215,88,102,80,222]], 4, 10000,{from: accounts[8]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[5], accounts[9], [4,81,160,160], [[252,114,153,2,37,178,102,69,109,215,93,163,206,166,118,26,187,168,172,237,201,191,171,47,157,145,245,2,92,12,76,98],[137,203,146,252,178,37,235,173,26,121,246,193,149,63,215,223,60,147,238,42,246,242,135,2,122,185,208,115,71,182,60,160],[25,127,173,16,153,84,222,166,49,168,22,67,24,71,136,221,171,186,130,8,8,56,178,49,148,122,60,42,207,21,190,155]], [21,160,4], [[97,102,105,135,81,18,130,152,246,224,90,208,242,213,240,199,178,48,254,206,1,160,2,212,217,216,117,179,20,30,46,50],[190,225,121,84,6,228,141,238,233,54,2,139,245,226,214,176,49,237,35,189,238,218,193,219,9,252,118,131,22,215,159,54],[194,142,28,134,5,134,150,162,139,216,231,154,61,34,215,93,174,10,118,64,20,39,6,177,52,35,50,90,213,88,152,115]], [[0,193,119,102,40,67,234,130,124,199,216,102,170,81,148,205,138,64,110,255,214,207,115,135,32,77,48,64,166,36,234,139],[70,6,242,110,130,45,28,150,25,91,47,122,133,121,168,134,26,120,23,172,58,227,54,35,89,157,47,253,91,132,130,137],[254,177,253,176,123,194,80,96,153,28,3,177,226,245,104,4,240,224,18,159,141,48,238,159,198,215,106,215,88,102,80,222]], 4, 10000,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 4, [238,43,4,109,120,232,1,174,42,136,198,239,151,73,97,55,220,156,79,204,91,178,238,16,128,80,155,53,217,199,146,216], 5, [68,1,21,92,72,81,169,166,222,78,92,241,100,40,17,12,240,95,100,132,7,231,171,61,125,218,78,227,29,171,239,129], [224,251,173,162,20,118,99,16,146,226,166,121,26,254,236,139,193,186,159,231,216,242,36,169,184,34,136,52,81,40,229,47], 3,{from: accounts[8]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 4, [238,43,4,109,120,232,1,174,42,136,198,239,151,73,97,55,220,156,79,204,91,178,238,16,128,80,155,53,217,199,146,216], 5, [68,1,21,92,72,81,169,166,222,78,92,241,100,40,17,12,240,95,100,132,7,231,171,61,125,218,78,227,29,171,239,129], [224,251,173,162,20,118,99,16,146,226,166,121,26,254,236,139,193,186,159,231,216,242,36,169,184,34,136,52,81,40,229,47], 3,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[5], 4, [238,43,4,109,120,232,1,174,42,136,198,239,151,73,97,55,220,156,79,204,91,178,238,16,128,80,155,53,217,199,146,216], 5, [68,1,21,92,72,81,169,166,222,78,92,241,100,40,17,12,240,95,100,132,7,231,171,61,125,218,78,227,29,171,239,129], [224,251,173,162,20,118,99,16,146,226,166,121,26,254,236,139,193,186,159,231,216,242,36,169,184,34,136,52,81,40,229,47], 5,{from: accounts[8]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[0], 20,{from: accounts[8]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[0], 20,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[4], accounts[3], 10001, [30,105,202,247,222,112,108,124,3,229,75,31,10,72,42,188,231,113,124,145,103,184,185,108,94,55,196,234,98,122,30,64], 0, [56,140,120,254,168,1,32,39,122,226,239,162,223,141,95,99,70,109,230,44,206,177,190,143,200,73,103,208,253,109,253,226], [36,156,188,216,156,192,110,105,230,233,51,176,44,16,184,14,146,128,158,197,26,190,91,58,70,84,249,81,199,104,41,9],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[0],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[0],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
