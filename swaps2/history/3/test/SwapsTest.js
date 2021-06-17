const truffleAssert = require('truffle-assertions');
const Swaps = artifacts.require("Swaps");
const Vault = artifacts.require("Vault");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");

contract("Swaps",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractSwaps = null;
  let contractVault = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Swaps.link("SafeMath",contractSafeMath.address);
    contractSwaps = await Swaps.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Swaps.new({from: accounts[0]}');
    contractVault = await Vault.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Vault.new({from: accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint,bytes)', async () => {
    let result = await contractSwaps.tokenFallback(accounts[0], 1336, [12,225,15,182,250,20,136,129,98,248,47,207,5,100,116,226,162,175,182,73,194,113,18,227,79,11,148,29,12,85,126,49],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([165,204,92,126,3,7,123,225,194,106,31,56,75,80,123,129,226,166,29,190,245,40,238,15,165,216,91,207,67,169,8,239], accounts[8], accounts[7], 2014223714, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+723, accounts[2], 97, 0, accounts[9], 5, 1532892064,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([165,204,92,126,3,7,123,225,194,106,31,56,75,80,123,129,226,166,29,190,245,40,238,15,165,216,91,207,67,169,8,239], accounts[7], accounts[7], 2014223714, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+723, accounts[2], 97, 0, accounts[9], 5, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([165,204,92,126,3,7,123,225,194,106,31,56,75,80,123,129,226,166,29,190,245,40,238,15,165,216,91,207,67,169,8,239], accounts[8], accounts[7], 0, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+723, accounts[2], 97, 0, accounts[9], 5, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([165,204,92,126,3,7,123,225,194,106,31,56,75,80,123,129,226,166,29,190,245,40,238,15,165,216,91,207,67,169,8,239], accounts[8], accounts[7], 2014223714, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+723, accounts[2], 97, 0, accounts[9], 5, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([165,204,92,126,3,7,123,225,194,106,31,56,75,80,123,129,226,166,29,190,245,40,238,15,165,216,91,207,67,169,8,239], accounts[8], accounts[7], 2014223714, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 97, 0, accounts[9], 5, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([184,59,89,219,117,36,8,30,67,38,57,151,202,134,188,77,254,188,92,139,214,209,35,147,231,145,67,84,61,55,101,199], accounts[6], accounts[1], 1532892062, 4038714810, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+269, accounts[8], 1, 4038714809, "0x0000000000000000000000000000000000000000", 9999, 28,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([184,59,89,219,117,36,8,30,67,38,57,151,202,134,188,77,254,188,92,139,214,209,35,147,231,145,67,84,61,55,101,199], accounts[1], accounts[1], 1532892062, 4038714810, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+269, accounts[8], 1, 4038714809, "0x0000000000000000000000000000000000000000", 9999, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([184,59,89,219,117,36,8,30,67,38,57,151,202,134,188,77,254,188,92,139,214,209,35,147,231,145,67,84,61,55,101,199], accounts[6], accounts[1], 0, 4038714810, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+269, accounts[8], 1, 4038714809, "0x0000000000000000000000000000000000000000", 9999, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([184,59,89,219,117,36,8,30,67,38,57,151,202,134,188,77,254,188,92,139,214,209,35,147,231,145,67,84,61,55,101,199], accounts[6], accounts[1], 1532892062, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+269, accounts[8], 1, 4038714809, "0x0000000000000000000000000000000000000000", 9999, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([184,59,89,219,117,36,8,30,67,38,57,151,202,134,188,77,254,188,92,139,214,209,35,147,231,145,67,84,61,55,101,199], accounts[6], accounts[1], 1532892062, 4038714810, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 1, 4038714809, "0x0000000000000000000000000000000000000000", 9999, 28,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await contractSwaps.createOrder([163,67,111,43,163,87,114,52,206,63,177,253,72,17,234,40,103,141,7,19,192,164,225,204,128,110,210,168,88,101,253,242], accounts[4], accounts[3], 1336, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+368, accounts[8], 64, 9999, accounts[6], 1338, 10001,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([163,67,111,43,163,87,114,52,206,63,177,253,72,17,234,40,103,141,7,19,192,164,225,204,128,110,210,168,88,101,253,242], accounts[3], accounts[3], 1336, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+368, accounts[8], 64, 9999, accounts[6], 1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([163,67,111,43,163,87,114,52,206,63,177,253,72,17,234,40,103,141,7,19,192,164,225,204,128,110,210,168,88,101,253,242], accounts[4], accounts[3], 0, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+368, accounts[8], 64, 9999, accounts[6], 1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([163,67,111,43,163,87,114,52,206,63,177,253,72,17,234,40,103,141,7,19,192,164,225,204,128,110,210,168,88,101,253,242], accounts[4], accounts[3], 1336, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+368, accounts[8], 64, 9999, accounts[6], 1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([163,67,111,43,163,87,114,52,206,63,177,253,72,17,234,40,103,141,7,19,192,164,225,204,128,110,210,168,88,101,253,242], accounts[4], accounts[3], 1336, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 64, 9999, accounts[6], 1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([199,164,149,33,41,235,17,70,154,191,2,245,42,78,48,167,58,202,175,96,32,224,106,181,55,161,30,22,61,20,152,102], accounts[2], accounts[0], 1338, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+673, accounts[0], 66, 255, accounts[5], 26, 3,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([199,164,149,33,41,235,17,70,154,191,2,245,42,78,48,167,58,202,175,96,32,224,106,181,55,161,30,22,61,20,152,102], accounts[0], accounts[0], 1338, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+673, accounts[0], 66, 255, accounts[5], 26, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([199,164,149,33,41,235,17,70,154,191,2,245,42,78,48,167,58,202,175,96,32,224,106,181,55,161,30,22,61,20,152,102], accounts[2], accounts[0], 0, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+673, accounts[0], 66, 255, accounts[5], 26, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([199,164,149,33,41,235,17,70,154,191,2,245,42,78,48,167,58,202,175,96,32,224,106,181,55,161,30,22,61,20,152,102], accounts[2], accounts[0], 1338, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+673, accounts[0], 66, 255, accounts[5], 26, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([199,164,149,33,41,235,17,70,154,191,2,245,42,78,48,167,58,202,175,96,32,224,106,181,55,161,30,22,61,20,152,102], accounts[2], accounts[0], 1338, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 66, 255, accounts[5], 26, 3,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([215,37,149,106,231,17,48,93,102,117,56,136,230,67,233,49,38,247,161,232,123,35,41,252,27,84,55,239,163,139,143,27], "0x0000000000000000000000000000000000000000", 26,{from: accounts[0],value:26});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([215,37,149,106,231,17,48,93,102,117,56,136,230,67,233,49,38,247,161,232,123,35,41,252,27,84,55,239,163,139,143,27], "0x0000000000000000000000000000000000000000", 27,{from: accounts[0],value:26}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([229,162,47,154,90,174,10,21,41,60,235,179,234,204,19,77,94,14,92,160,48,105,116,209,144,54,164,197,153,82,22,48], accounts[8], 2014223715,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([143,180,149,143,233,240,96,127,107,187,80,206,221,139,9,240,92,32,4,157,213,79,108,197,25,72,217,143,14,59,71,126],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([144,112,52,143,63,204,201,108,134,145,2,20,45,70,189,158,108,88,220,193,216,45,163,166,88,175,221,121,187,214,156,42], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([52,155,37,141,194,105,98,60,149,99,226,200,145,92,37,91,129,182,200,69,46,129,207,174,50,101,213,238,233,246,8,13], accounts[9],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([77,207,144,244,76,134,46,239,160,124,75,192,173,225,199,212,208,11,84,209,198,52,4,78,67,42,88,126,28,222,200,20], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([220,198,55,39,30,167,225,48,196,170,207,67,135,135,52,68,103,111,2,132,52,156,246,246,158,103,144,196,166,31,44,90], accounts[3],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(9, 10,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(9, 10,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(9, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[1],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[5],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([199,1,208,29,57,40,226,193,57,232,29,219,172,122,60,109,253,58,240,164,106,37,54,53,111,7,241,179,92,45,127,173],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([175,169,90,129,50,54,223,168,199,50,95,9,0,20,224,72,241,197,134,177,20,229,26,121,249,112,146,216,35,77,20,96],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([99,45,54,222,164,57,165,240,89,69,32,38,21,224,158,94,98,158,66,32,8,162,58,45,171,136,193,230,231,107,76,200],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([76,203,148,158,216,19,138,45,164,124,255,25,8,245,242,0,59,55,200,184,137,113,188,74,89,235,140,232,88,137,30,132],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([167,171,180,72,71,169,244,13,240,163,116,214,207,147,84,212,150,150,116,103,30,132,134,107,202,171,230,56,228,175,231,49],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([25,136,22,50,183,223,112,216,11,247,222,190,94,25,243,139,3,176,142,89,177,134,124,60,255,148,81,83,4,188,254,175],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([198,195,170,181,144,2,161,83,245,219,23,195,217,188,100,26,106,150,128,143,73,56,10,73,157,90,239,24,72,54,51,70],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([41,148,38,199,14,207,48,151,89,173,152,253,111,229,168,183,63,248,238,102,164,14,77,93,158,107,212,13,205,225,83,170],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([222,189,229,1,227,48,196,193,29,158,234,125,236,59,91,167,129,135,122,67,64,108,12,204,162,142,116,227,42,126,131,174],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([74,226,25,225,140,133,43,89,108,154,42,99,17,251,129,38,205,33,215,243,45,161,169,190,140,36,21,13,10,8,128,229],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([89,203,162,210,246,40,239,232,4,138,11,176,68,30,80,139,17,28,203,90,22,119,50,166,225,40,91,64,176,69,188,28], accounts[6],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([224,65,252,136,222,98,216,112,165,203,5,144,2,12,217,245,107,224,123,93,89,93,171,122,73,60,139,119,248,227,32,202], accounts[8],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([33,219,135,32,94,174,41,134,67,221,228,230,12,185,1,243,191,56,127,198,163,9,123,255,114,182,157,11,114,58,79,203],{from: accounts[0]});
  });
});
