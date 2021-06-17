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
    contractGNTAllocation = await GNTAllocation.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[7],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[4],accounts[8],(await web3.eth.getBlockNumber())+622,(await web3.eth.getBlockNumber())+622+8,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[4],accounts[8],(await web3.eth.getBlockNumber())+622,(await web3.eth.getBlockNumber())+622+8,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],11,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],11,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[5],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[9],83,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[9],83,{from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGNTDeposit.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute isLocked(address)', async () => {
    let result = await contractGNTDeposit.isLocked(accounts[5],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address)', async () => {
    let result = await contractGNTDeposit.isTimeLocked(accounts[2],{from: accounts[0]});
  });
  it('Should execute isUnlocked(address)', async () => {
    let result = await contractGNTDeposit.isUnlocked(accounts[9],{from: accounts[0]});
  });
  it('Should execute getTimelock(address)', async () => {
    let result = await contractGNTDeposit.getTimelock(accounts[0],{from: accounts[0]});
  });
  it('Should execute isDepositPossible(address,uint256)', async () => {
    let result = await contractGNTDeposit.isDepositPossible(accounts[1], 159,{from: accounts[0]});
  });
  it('Should execute transferConcent(address) WHEN msg.sender==_owner,_newConcent!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGNTDeposit.transferConcent(accounts[5],{from: accounts[0]});
  });
  it('Should fail transferConcent(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferConcent(accounts[5],{from: accounts[9]}),'revert');
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
    let result = await contractGNTDeposit.setMaximumDepositsTotal(1,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositsTotal(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositsTotal(1,{from: accounts[9]}),'revert');
  });
  it('Should execute setMaximumDepositAmount(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setMaximumDepositAmount(2,{from: accounts[0]});
  });
  it('Should fail setMaximumDepositAmount(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setMaximumDepositAmount(2,{from: accounts[9]}),'revert');
  });
  it('Should execute setDailyReimbursementLimit(uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractGNTDeposit.setDailyReimbursementLimit(21,{from: accounts[0]});
  });
  it('Should fail setDailyReimbursementLimit(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.setDailyReimbursementLimit(21,{from: accounts[9]}),'revert');
  });
  it('Should execute unlock()', async () => {
    let result = await contractGNTDeposit.unlock({from: accounts[0]});
  });
  it('Should execute lock()', async () => {
    let result = await contractGNTDeposit.lock({from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractGNTDeposit.onTokenReceived(accounts[1], 81, [124,59,134,75,65,207,19,12,14,142,47,17,198,99,223,153,242,87,237,140,242,216,137,100,192,122,41,111,25,153,227,133],{from: accounts[0]});
  });
  it('Should execute withdraw(address)', async () => {
    let result = await contractGNTDeposit.withdraw(accounts[7],{from: accounts[0]});
  });
  it('Should execute burn(address,uint256) WHEN balances==0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[8], 10001,{from: accounts[7]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[8], 10001,{from: accounts[9]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN balances!=0,msg.sender==concent,balances>=_amount', async () => {
    let result = await contractGNTDeposit.burn(accounts[2], 1338,{from: accounts[7]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.burn(accounts[2], 1338,{from: accounts[9]}),'revert');
  });
  it('Should execute reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[1], 21, [120,152,11,173,59,112,190,38,173,91,148,148,161,92,97,238,153,241,41,43,6,19,247,235,205,105,50,238,96,119,233,125], 19, [189,179,12,125,27,219,147,159,168,63,83,198,198,59,245,78,90,80,206,103,246,66,212,1,232,51,152,72,37,74,107,77], [116,215,50,159,183,93,180,122,73,103,158,129,55,166,13,183,90,216,132,229,17,48,175,90,195,124,171,53,125,136,139,179], 5,{from: accounts[7]});
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[1], 21, [120,152,11,173,59,112,190,38,173,91,148,148,161,92,97,238,153,241,41,43,6,19,247,235,205,105,50,238,96,119,233,125], 19, [189,179,12,125,27,219,147,159,168,63,83,198,198,59,245,78,90,80,206,103,246,66,212,1,232,51,152,72,37,74,107,77], [116,215,50,159,183,93,180,122,73,103,158,129,55,166,13,183,90,216,132,229,17,48,175,90,195,124,171,53,125,136,139,179], 5,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForSubtask(address,address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForSubtask(accounts[4], accounts[1], 21, [120,152,11,173,59,112,190,38,173,91,148,148,161,92,97,238,153,241,41,43,6,19,247,235,205,105,50,238,96,119,233,125], 19, [189,179,12,125,27,219,147,159,168,63,83,198,198,59,245,78,90,80,206,103,246,66,212,1,232,51,152,72,37,74,107,77], [116,215,50,159,183,93,180,122,73,103,158,129,55,166,13,183,90,216,132,229,17,48,175,90,195,124,171,53,125,136,139,179], 22,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) WHEN msg.sender==concent,_amount.length==_subtask_id.length,_amount.length==_v.length,_amount.length==_r.length,_amount.length==_s.length,_reimburse_amount<=total_amount', async () => {
    let result = await contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[4], [9,10,1337], [[157,133,245,189,70,47,66,229,222,87,251,172,224,9,34,62,156,147,115,105,12,121,107,239,187,34,144,93,51,95,145,195],[47,200,94,24,51,221,95,132,144,63,18,226,228,28,30,70,99,23,7,157,132,143,159,182,95,70,159,247,208,171,209,28],[1,188,213,169,197,81,245,197,87,159,114,85,193,231,187,194,59,144,49,154,125,255,89,192,101,12,46,198,184,136,69,88]], [20,99,161], [[247,132,125,145,151,144,164,55,174,21,12,41,227,182,9,165,255,158,201,69,215,254,50,104,126,91,40,200,239,29,18,236],[205,108,227,81,222,143,209,81,244,170,5,163,47,135,218,216,57,23,42,85,224,166,16,37,95,117,85,190,65,184,61,102],[128,238,184,220,35,167,120,78,126,228,28,250,1,62,138,79,29,224,139,114,132,219,163,86,239,105,0,234,48,134,72,141]], [[79,75,221,126,182,141,99,187,53,171,43,187,6,236,196,243,66,212,229,191,253,6,255,138,241,121,204,11,117,180,10,180],[4,189,235,227,106,147,182,148,194,18,237,164,252,98,5,176,3,237,129,239,235,10,26,17,185,111,206,102,7,55,143,15],[177,175,200,248,153,210,134,20,223,29,44,199,65,103,134,161,173,238,143,170,43,68,137,203,62,57,19,233,216,128,174,105]], 19, 101,{from: accounts[7]});
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[4], [9,10,1337], [[157,133,245,189,70,47,66,229,222,87,251,172,224,9,34,62,156,147,115,105,12,121,107,239,187,34,144,93,51,95,145,195],[47,200,94,24,51,221,95,132,144,63,18,226,228,28,30,70,99,23,7,157,132,143,159,182,95,70,159,247,208,171,209,28],[1,188,213,169,197,81,245,197,87,159,114,85,193,231,187,194,59,144,49,154,125,255,89,192,101,12,46,198,184,136,69,88]], [20,99,161], [[247,132,125,145,151,144,164,55,174,21,12,41,227,182,9,165,255,158,201,69,215,254,50,104,126,91,40,200,239,29,18,236],[205,108,227,81,222,143,209,81,244,170,5,163,47,135,218,216,57,23,42,85,224,166,16,37,95,117,85,190,65,184,61,102],[128,238,184,220,35,167,120,78,126,228,28,250,1,62,138,79,29,224,139,114,132,219,163,86,239,105,0,234,48,134,72,141]], [[79,75,221,126,182,141,99,187,53,171,43,187,6,236,196,243,66,212,229,191,253,6,255,138,241,121,204,11,117,180,10,180],[4,189,235,227,106,147,182,148,194,18,237,164,252,98,5,176,3,237,129,239,235,10,26,17,185,111,206,102,7,55,143,15],[177,175,200,248,153,210,134,20,223,29,44,199,65,103,134,161,173,238,143,170,43,68,137,203,62,57,19,233,216,128,174,105]], 19, 101,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _subtask_id.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[4], [14,14,18,83], [[157,133,245,189,70,47,66,229,222,87,251,172,224,9,34,62,156,147,115,105,12,121,107,239,187,34,144,93,51,95,145,195],[47,200,94,24,51,221,95,132,144,63,18,226,228,28,30,70,99,23,7,157,132,143,159,182,95,70,159,247,208,171,209,28],[1,188,213,169,197,81,245,197,87,159,114,85,193,231,187,194,59,144,49,154,125,255,89,192,101,12,46,198,184,136,69,88]], [20,99,161], [[247,132,125,145,151,144,164,55,174,21,12,41,227,182,9,165,255,158,201,69,215,254,50,104,126,91,40,200,239,29,18,236],[205,108,227,81,222,143,209,81,244,170,5,163,47,135,218,216,57,23,42,85,224,166,16,37,95,117,85,190,65,184,61,102],[128,238,184,220,35,167,120,78,126,228,28,250,1,62,138,79,29,224,139,114,132,219,163,86,239,105,0,234,48,134,72,141]], [[79,75,221,126,182,141,99,187,53,171,43,187,6,236,196,243,66,212,229,191,253,6,255,138,241,121,204,11,117,180,10,180],[4,189,235,227,106,147,182,148,194,18,237,164,252,98,5,176,3,237,129,239,235,10,26,17,185,111,206,102,7,55,143,15],[177,175,200,248,153,210,134,20,223,29,44,199,65,103,134,161,173,238,143,170,43,68,137,203,62,57,19,233,216,128,174,105]], 19, 101,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _v.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[4], [21,15,15,1001], [[157,133,245,189,70,47,66,229,222,87,251,172,224,9,34,62,156,147,115,105,12,121,107,239,187,34,144,93,51,95,145,195],[47,200,94,24,51,221,95,132,144,63,18,226,228,28,30,70,99,23,7,157,132,143,159,182,95,70,159,247,208,171,209,28],[1,188,213,169,197,81,245,197,87,159,114,85,193,231,187,194,59,144,49,154,125,255,89,192,101,12,46,198,184,136,69,88]], [20,99,161], [[247,132,125,145,151,144,164,55,174,21,12,41,227,182,9,165,255,158,201,69,215,254,50,104,126,91,40,200,239,29,18,236],[205,108,227,81,222,143,209,81,244,170,5,163,47,135,218,216,57,23,42,85,224,166,16,37,95,117,85,190,65,184,61,102],[128,238,184,220,35,167,120,78,126,228,28,250,1,62,138,79,29,224,139,114,132,219,163,86,239,105,0,234,48,134,72,141]], [[79,75,221,126,182,141,99,187,53,171,43,187,6,236,196,243,66,212,229,191,253,6,255,138,241,121,204,11,117,180,10,180],[4,189,235,227,106,147,182,148,194,18,237,164,252,98,5,176,3,237,129,239,235,10,26,17,185,111,206,102,7,55,143,15],[177,175,200,248,153,210,134,20,223,29,44,199,65,103,134,161,173,238,143,170,43,68,137,203,62,57,19,233,216,128,174,105]], 19, 101,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _r.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[4], [4,101,100,101], [[157,133,245,189,70,47,66,229,222,87,251,172,224,9,34,62,156,147,115,105,12,121,107,239,187,34,144,93,51,95,145,195],[47,200,94,24,51,221,95,132,144,63,18,226,228,28,30,70,99,23,7,157,132,143,159,182,95,70,159,247,208,171,209,28],[1,188,213,169,197,81,245,197,87,159,114,85,193,231,187,194,59,144,49,154,125,255,89,192,101,12,46,198,184,136,69,88]], [20,99,161], [[247,132,125,145,151,144,164,55,174,21,12,41,227,182,9,165,255,158,201,69,215,254,50,104,126,91,40,200,239,29,18,236],[205,108,227,81,222,143,209,81,244,170,5,163,47,135,218,216,57,23,42,85,224,166,16,37,95,117,85,190,65,184,61,102],[128,238,184,220,35,167,120,78,126,228,28,250,1,62,138,79,29,224,139,114,132,219,163,86,239,105,0,234,48,134,72,141]], [[79,75,221,126,182,141,99,187,53,171,43,187,6,236,196,243,66,212,229,191,253,6,255,138,241,121,204,11,117,180,10,180],[4,189,235,227,106,147,182,148,194,18,237,164,252,98,5,176,3,237,129,239,235,10,26,17,185,111,206,102,7,55,143,15],[177,175,200,248,153,210,134,20,223,29,44,199,65,103,134,161,173,238,143,170,43,68,137,203,62,57,19,233,216,128,174,105]], 19, 101,{from: accounts[7]}),'revert');
  });
  it('Should fail reimburseForNoPayment(address,address,uint256[],bytes32[],uint8[],bytes32[],bytes32[],uint256,uint256) when NOT comply with: _amount.length == _s.length', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForNoPayment(accounts[6], accounts[4], [2,101,10,100], [[157,133,245,189,70,47,66,229,222,87,251,172,224,9,34,62,156,147,115,105,12,121,107,239,187,34,144,93,51,95,145,195],[47,200,94,24,51,221,95,132,144,63,18,226,228,28,30,70,99,23,7,157,132,143,159,182,95,70,159,247,208,171,209,28],[1,188,213,169,197,81,245,197,87,159,114,85,193,231,187,194,59,144,49,154,125,255,89,192,101,12,46,198,184,136,69,88]], [20,99,161], [[247,132,125,145,151,144,164,55,174,21,12,41,227,182,9,165,255,158,201,69,215,254,50,104,126,91,40,200,239,29,18,236],[205,108,227,81,222,143,209,81,244,170,5,163,47,135,218,216,57,23,42,85,224,166,16,37,95,117,85,190,65,184,61,102],[128,238,184,220,35,167,120,78,126,228,28,250,1,62,138,79,29,224,139,114,132,219,163,86,239,105,0,234,48,134,72,141]], [[79,75,221,126,182,141,99,187,53,171,43,187,6,236,196,243,66,212,229,191,253,6,255,138,241,121,204,11,117,180,10,180],[4,189,235,227,106,147,182,148,194,18,237,164,252,98,5,176,3,237,129,239,235,10,26,17,185,111,206,102,7,55,143,15],[177,175,200,248,153,210,134,20,223,29,44,199,65,103,134,161,173,238,143,170,43,68,137,203,62,57,19,233,216,128,174,105]], 19, 101,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) WHEN msg.sender==concent,_reimburse_amount<=_amount', async () => {
    let result = await contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 19, [164,82,232,54,216,23,109,97,154,177,14,68,162,173,106,155,197,1,157,49,20,31,245,208,241,105,150,223,77,225,61,143], 10, [39,132,148,197,56,108,164,172,232,192,104,105,99,179,103,252,230,151,155,84,3,175,60,27,38,250,179,126,142,1,75,122], [225,17,7,166,214,67,249,92,206,63,23,71,210,9,62,211,7,117,241,20,114,24,81,148,186,168,105,60,218,185,108,195], 2,{from: accounts[7]});
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 19, [164,82,232,54,216,23,109,97,154,177,14,68,162,173,106,155,197,1,157,49,20,31,245,208,241,105,150,223,77,225,61,143], 10, [39,132,148,197,56,108,164,172,232,192,104,105,99,179,103,252,230,151,155,84,3,175,60,27,38,250,179,126,142,1,75,122], [225,17,7,166,214,67,249,92,206,63,23,71,210,9,62,211,7,117,241,20,114,24,81,148,186,168,105,60,218,185,108,195], 2,{from: accounts[9]}),'revert');
  });
  it('Should fail reimburseForVerificationCosts(address,uint256,bytes32,uint8,bytes32,bytes32,uint256) when NOT comply with: _reimburse_amount <= _amount', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForVerificationCosts(accounts[9], 19, [164,82,232,54,216,23,109,97,154,177,14,68,162,173,106,155,197,1,157,49,20,31,245,208,241,105,150,223,77,225,61,143], 10, [39,132,148,197,56,108,164,172,232,192,104,105,99,179,103,252,230,151,155,84,3,175,60,27,38,250,179,126,142,1,75,122], [225,17,7,166,214,67,249,92,206,63,23,71,210,9,62,211,7,117,241,20,114,24,81,148,186,168,105,60,218,185,108,195], 20,{from: accounts[7]}),'revert');
  });
  it('Should execute reimburseForCommunication(address,uint256) WHEN msg.sender==concent', async () => {
    let result = await contractGNTDeposit.reimburseForCommunication(accounts[9], 1001,{from: accounts[7]});
  });
  it('Should fail reimburseForCommunication(address,uint256) when NOT comply with: msg.sender == concent', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.reimburseForCommunication(accounts[9], 1001,{from: accounts[9]}),'revert');
  });
  it('Should execute _isValidSignature(address,address,uint256,bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTDeposit._isValidSignature(accounts[6], accounts[0], 1338, [194,169,157,214,168,31,192,63,165,212,109,75,108,253,108,157,249,48,176,61,59,238,209,85,56,56,30,112,174,111,123,39], 160, [252,14,133,39,203,2,43,81,19,53,37,78,28,59,50,45,207,197,196,198,250,146,113,161,93,12,20,18,175,107,88,248], [33,48,88,53,74,23,176,130,73,250,16,170,150,246,221,243,127,76,71,57,54,103,113,29,209,113,197,14,230,180,74,68],{from: accounts[0]});
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
    let result = await contractGNTDeposit.transferOwnership(accounts[7],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGNTDeposit.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
