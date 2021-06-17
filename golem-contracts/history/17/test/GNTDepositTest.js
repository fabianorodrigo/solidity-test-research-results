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
    contractGNTAllocation = await GNTAllocation.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[3],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[2],accounts[6],(await web3.eth.getBlockNumber())+143,(await web3.eth.getBlockNumber())+143+611,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[2],accounts[6],(await web3.eth.getBlockNumber())+143,(await web3.eth.getBlockNumber())+143+611,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],161,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],161,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[8],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[1],accounts[8],256,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[1],accounts[8],256,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[4],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[3],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[4],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[9],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[5], 14,{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferColdwallet(accounts[5],{from: accounts[0]});
  });
  it('Should fail transferColdwallet(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should fail transferColdwallet(address) when NOT comply with: _newColdwallet != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferColdwallet("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute setMaximumDepositsTotal(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositsTotal(81,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(81,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(5,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(5,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(15,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(15,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[8], 10, [212,181,91,235,113,138,21,10,60,131,218,130,30,200,245,77,22,167,144,85,226,68,67,92,117,99,110,79,80,129,17,228],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[7],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[7], 9999,{from: accounts[1]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[7], 9999,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[6], 99,{from: accounts[1]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[6], 99,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[1], accounts[3], 256, [14,38,5,106,133,179,127,1,106,254,65,76,217,138,148,39,78,227,193,54,12,35,0,74,182,191,249,142,201,15,4,199], 83, [39,186,54,70,198,56,96,248,159,142,55,65,193,145,191,152,252,208,166,127,138,91,167,175,196,7,219,46,252,112,200,67], [93,238,224,52,252,38,65,39,172,113,172,121,224,93,34,213,71,164,245,36,71,156,11,46,186,33,63,112,114,150,94,127], 160,{from: accounts[1]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[1], accounts[3], 256, [14,38,5,106,133,179,127,1,106,254,65,76,217,138,148,39,78,227,193,54,12,35,0,74,182,191,249,142,201,15,4,199], 83, [39,186,54,70,198,56,96,248,159,142,55,65,193,145,191,152,252,208,166,127,138,91,167,175,196,7,219,46,252,112,200,67], [93,238,224,52,252,38,65,39,172,113,172,121,224,93,34,213,71,164,245,36,71,156,11,46,186,33,63,112,114,150,94,127], 160,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[1], accounts[3], 256, [14,38,5,106,133,179,127,1,106,254,65,76,217,138,148,39,78,227,193,54,12,35,0,74,182,191,249,142,201,15,4,199], 83, [39,186,54,70,198,56,96,248,159,142,55,65,193,145,191,152,252,208,166,127,138,91,167,175,196,7,219,46,252,112,200,67], [93,238,224,52,252,38,65,39,172,113,172,121,224,93,34,213,71,164,245,36,71,156,11,46,186,33,63,112,114,150,94,127], 257,{from: accounts[1]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[6], [0,255], [[139,38,197,232,246,124,158,216,186,81,159,67,23,93,185,80,134,112,119,209,232,176,15,165,156,103,96,211,32,242,164,198],[119,135,189,62,19,96,223,240,57,144,18,86,178,244,227,191,241,171,234,98,210,169,240,8,193,138,59,46,15,89,123,80]], [10,3], [[224,65,207,64,104,71,65,1,237,193,57,68,223,135,164,122,60,61,53,20,243,227,175,82,50,217,242,217,122,70,109,162],[153,58,134,144,231,169,144,2,96,79,4,93,87,206,96,178,144,61,191,110,173,243,84,123,147,41,171,82,115,221,82,122]], [[170,12,186,133,202,188,189,48,155,182,58,165,50,27,239,217,236,214,39,189,59,180,251,244,107,151,33,127,70,38,108,49],[158,98,245,39,47,242,57,65,188,55,87,133,35,217,138,205,248,216,180,3,121,214,242,27,42,116,44,20,226,216,165,237]], 999, 1000,{from: accounts[1]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[6], [0,255], [[139,38,197,232,246,124,158,216,186,81,159,67,23,93,185,80,134,112,119,209,232,176,15,165,156,103,96,211,32,242,164,198],[119,135,189,62,19,96,223,240,57,144,18,86,178,244,227,191,241,171,234,98,210,169,240,8,193,138,59,46,15,89,123,80]], [10,3], [[224,65,207,64,104,71,65,1,237,193,57,68,223,135,164,122,60,61,53,20,243,227,175,82,50,217,242,217,122,70,109,162],[153,58,134,144,231,169,144,2,96,79,4,93,87,206,96,178,144,61,191,110,173,243,84,123,147,41,171,82,115,221,82,122]], [[170,12,186,133,202,188,189,48,155,182,58,165,50,27,239,217,236,214,39,189,59,180,251,244,107,151,33,127,70,38,108,49],[158,98,245,39,47,242,57,65,188,55,87,133,35,217,138,205,248,216,180,3,121,214,242,27,42,116,44,20,226,216,165,237]], 999, 1000,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[6], [1,161,21], [[139,38,197,232,246,124,158,216,186,81,159,67,23,93,185,80,134,112,119,209,232,176,15,165,156,103,96,211,32,242,164,198],[119,135,189,62,19,96,223,240,57,144,18,86,178,244,227,191,241,171,234,98,210,169,240,8,193,138,59,46,15,89,123,80]], [10,3], [[224,65,207,64,104,71,65,1,237,193,57,68,223,135,164,122,60,61,53,20,243,227,175,82,50,217,242,217,122,70,109,162],[153,58,134,144,231,169,144,2,96,79,4,93,87,206,96,178,144,61,191,110,173,243,84,123,147,41,171,82,115,221,82,122]], [[170,12,186,133,202,188,189,48,155,182,58,165,50,27,239,217,236,214,39,189,59,180,251,244,107,151,33,127,70,38,108,49],[158,98,245,39,47,242,57,65,188,55,87,133,35,217,138,205,248,216,180,3,121,214,242,27,42,116,44,20,226,216,165,237]], 999, 1000,{from: accounts[1]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[6], [11,9999,1000], [[139,38,197,232,246,124,158,216,186,81,159,67,23,93,185,80,134,112,119,209,232,176,15,165,156,103,96,211,32,242,164,198],[119,135,189,62,19,96,223,240,57,144,18,86,178,244,227,191,241,171,234,98,210,169,240,8,193,138,59,46,15,89,123,80]], [10,3], [[224,65,207,64,104,71,65,1,237,193,57,68,223,135,164,122,60,61,53,20,243,227,175,82,50,217,242,217,122,70,109,162],[153,58,134,144,231,169,144,2,96,79,4,93,87,206,96,178,144,61,191,110,173,243,84,123,147,41,171,82,115,221,82,122]], [[170,12,186,133,202,188,189,48,155,182,58,165,50,27,239,217,236,214,39,189,59,180,251,244,107,151,33,127,70,38,108,49],[158,98,245,39,47,242,57,65,188,55,87,133,35,217,138,205,248,216,180,3,121,214,242,27,42,116,44,20,226,216,165,237]], 999, 1000,{from: accounts[1]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[6], [999,5,161], [[139,38,197,232,246,124,158,216,186,81,159,67,23,93,185,80,134,112,119,209,232,176,15,165,156,103,96,211,32,242,164,198],[119,135,189,62,19,96,223,240,57,144,18,86,178,244,227,191,241,171,234,98,210,169,240,8,193,138,59,46,15,89,123,80]], [10,3], [[224,65,207,64,104,71,65,1,237,193,57,68,223,135,164,122,60,61,53,20,243,227,175,82,50,217,242,217,122,70,109,162],[153,58,134,144,231,169,144,2,96,79,4,93,87,206,96,178,144,61,191,110,173,243,84,123,147,41,171,82,115,221,82,122]], [[170,12,186,133,202,188,189,48,155,182,58,165,50,27,239,217,236,214,39,189,59,180,251,244,107,151,33,127,70,38,108,49],[158,98,245,39,47,242,57,65,188,55,87,133,35,217,138,205,248,216,180,3,121,214,242,27,42,116,44,20,226,216,165,237]], 999, 1000,{from: accounts[1]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[8], accounts[6], [1336,9,255], [[139,38,197,232,246,124,158,216,186,81,159,67,23,93,185,80,134,112,119,209,232,176,15,165,156,103,96,211,32,242,164,198],[119,135,189,62,19,96,223,240,57,144,18,86,178,244,227,191,241,171,234,98,210,169,240,8,193,138,59,46,15,89,123,80]], [10,3], [[224,65,207,64,104,71,65,1,237,193,57,68,223,135,164,122,60,61,53,20,243,227,175,82,50,217,242,217,122,70,109,162],[153,58,134,144,231,169,144,2,96,79,4,93,87,206,96,178,144,61,191,110,173,243,84,123,147,41,171,82,115,221,82,122]], [[170,12,186,133,202,188,189,48,155,182,58,165,50,27,239,217,236,214,39,189,59,180,251,244,107,151,33,127,70,38,108,49],[158,98,245,39,47,242,57,65,188,55,87,133,35,217,138,205,248,216,180,3,121,214,242,27,42,116,44,20,226,216,165,237]], 999, 1000,{from: accounts[1]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 5, [40,149,201,45,236,95,3,253,97,161,171,54,117,175,193,253,248,228,14,231,36,156,240,157,138,6,218,26,36,10,73,236], 3, [220,95,16,140,108,156,193,127,248,187,155,15,200,64,160,20,102,245,35,124,64,188,243,139,224,176,219,159,97,200,253,122], [173,58,221,160,254,53,193,158,10,106,172,117,152,209,30,235,21,102,255,214,26,55,166,9,98,177,213,9,191,208,134,214], 3,{from: accounts[1]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 5, [40,149,201,45,236,95,3,253,97,161,171,54,117,175,193,253,248,228,14,231,36,156,240,157,138,6,218,26,36,10,73,236], 3, [220,95,16,140,108,156,193,127,248,187,155,15,200,64,160,20,102,245,35,124,64,188,243,139,224,176,219,159,97,200,253,122], [173,58,221,160,254,53,193,158,10,106,172,117,152,209,30,235,21,102,255,214,26,55,166,9,98,177,213,9,191,208,134,214], 3,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[3], 5, [40,149,201,45,236,95,3,253,97,161,171,54,117,175,193,253,248,228,14,231,36,156,240,157,138,6,218,26,36,10,73,236], 3, [220,95,16,140,108,156,193,127,248,187,155,15,200,64,160,20,102,245,35,124,64,188,243,139,224,176,219,159,97,200,253,122], [173,58,221,160,254,53,193,158,10,106,172,117,152,209,30,235,21,102,255,214,26,55,166,9,98,177,213,9,191,208,134,214], 6,{from: accounts[1]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[2], 18,{from: accounts[1]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[2], 18,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[7], accounts[0], 83, [199,207,121,9,14,190,2,44,25,243,144,85,141,211,86,133,83,253,234,241,240,228,70,178,76,95,129,120,5,235,88,135], 19, [176,250,43,153,172,99,184,17,169,148,32,142,123,154,223,130,141,112,236,251,190,84,92,60,42,188,234,104,76,9,246,140], [227,193,205,71,164,54,63,136,221,244,152,248,49,182,148,114,65,181,212,159,235,55,183,122,176,153,237,87,59,45,98,129],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[4],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[4],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
