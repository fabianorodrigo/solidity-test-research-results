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
    let result = await contractSwaps.tokenFallback(accounts[6], 2014223716, [148,51,65,199,10,247,42,140,151,144,81,251,138,132,132,132,203,12,188,29,51,195,136,9,9,105,232,117,111,232,83,77],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([122,137,153,100,246,150,170,192,239,141,82,221,60,103,131,179,214,89,171,61,121,144,202,7,60,187,3,34,128,97,111,30], accounts[3], accounts[2], 4038714811, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+450, accounts[1], 96, 2014223716, accounts[3], 1336, 10000,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([122,137,153,100,246,150,170,192,239,141,82,221,60,103,131,179,214,89,171,61,121,144,202,7,60,187,3,34,128,97,111,30], accounts[2], accounts[2], 4038714811, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+450, accounts[1], 96, 2014223716, accounts[3], 1336, 10000,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([122,137,153,100,246,150,170,192,239,141,82,221,60,103,131,179,214,89,171,61,121,144,202,7,60,187,3,34,128,97,111,30], accounts[3], accounts[2], 0, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+450, accounts[1], 96, 2014223716, accounts[3], 1336, 10000,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([122,137,153,100,246,150,170,192,239,141,82,221,60,103,131,179,214,89,171,61,121,144,202,7,60,187,3,34,128,97,111,30], accounts[3], accounts[2], 4038714811, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+450, accounts[1], 96, 2014223716, accounts[3], 1336, 10000,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([122,137,153,100,246,150,170,192,239,141,82,221,60,103,131,179,214,89,171,61,121,144,202,7,60,187,3,34,128,97,111,30], accounts[3], accounts[2], 4038714811, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 96, 2014223716, accounts[3], 1336, 10000,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([7,190,204,156,31,77,38,255,221,85,50,29,198,9,225,59,150,44,255,27,82,48,124,238,97,211,214,85,242,78,108,195], accounts[2], accounts[6], 29, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+297, accounts[1], 11, 256, "0x0000000000000000000000000000000000000000", 96, 95,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([7,190,204,156,31,77,38,255,221,85,50,29,198,9,225,59,150,44,255,27,82,48,124,238,97,211,214,85,242,78,108,195], accounts[6], accounts[6], 29, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+297, accounts[1], 11, 256, "0x0000000000000000000000000000000000000000", 96, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([7,190,204,156,31,77,38,255,221,85,50,29,198,9,225,59,150,44,255,27,82,48,124,238,97,211,214,85,242,78,108,195], accounts[2], accounts[6], 0, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+297, accounts[1], 11, 256, "0x0000000000000000000000000000000000000000", 96, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([7,190,204,156,31,77,38,255,221,85,50,29,198,9,225,59,150,44,255,27,82,48,124,238,97,211,214,85,242,78,108,195], accounts[2], accounts[6], 29, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+297, accounts[1], 11, 256, "0x0000000000000000000000000000000000000000", 96, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([7,190,204,156,31,77,38,255,221,85,50,29,198,9,225,59,150,44,255,27,82,48,124,238,97,211,214,85,242,78,108,195], accounts[2], accounts[6], 29, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 11, 256, "0x0000000000000000000000000000000000000000", 96, 95,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await contractSwaps.createOrder([200,207,55,130,122,176,193,26,116,73,49,253,123,92,210,94,13,191,93,224,43,26,231,198,12,23,180,116,127,225,181,237], accounts[0], accounts[9], 4038714810, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+206, accounts[5], 97, 6, accounts[6], 6, 65,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([200,207,55,130,122,176,193,26,116,73,49,253,123,92,210,94,13,191,93,224,43,26,231,198,12,23,180,116,127,225,181,237], accounts[9], accounts[9], 4038714810, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+206, accounts[5], 97, 6, accounts[6], 6, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([200,207,55,130,122,176,193,26,116,73,49,253,123,92,210,94,13,191,93,224,43,26,231,198,12,23,180,116,127,225,181,237], accounts[0], accounts[9], 0, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+206, accounts[5], 97, 6, accounts[6], 6, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([200,207,55,130,122,176,193,26,116,73,49,253,123,92,210,94,13,191,93,224,43,26,231,198,12,23,180,116,127,225,181,237], accounts[0], accounts[9], 4038714810, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+206, accounts[5], 97, 6, accounts[6], 6, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([200,207,55,130,122,176,193,26,116,73,49,253,123,92,210,94,13,191,93,224,43,26,231,198,12,23,180,116,127,225,181,237], accounts[0], accounts[9], 4038714810, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 97, 6, accounts[6], 6, 65,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([121,201,107,111,249,133,138,130,124,253,227,111,54,207,215,70,7,218,173,42,26,177,179,85,130,29,50,128,89,111,182,138], accounts[7], accounts[2], 1338, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+473, accounts[9], 5, 27, accounts[7], 1532892063, 27,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([121,201,107,111,249,133,138,130,124,253,227,111,54,207,215,70,7,218,173,42,26,177,179,85,130,29,50,128,89,111,182,138], accounts[2], accounts[2], 1338, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+473, accounts[9], 5, 27, accounts[7], 1532892063, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([121,201,107,111,249,133,138,130,124,253,227,111,54,207,215,70,7,218,173,42,26,177,179,85,130,29,50,128,89,111,182,138], accounts[7], accounts[2], 0, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+473, accounts[9], 5, 27, accounts[7], 1532892063, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([121,201,107,111,249,133,138,130,124,253,227,111,54,207,215,70,7,218,173,42,26,177,179,85,130,29,50,128,89,111,182,138], accounts[7], accounts[2], 1338, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+473, accounts[9], 5, 27, accounts[7], 1532892063, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([121,201,107,111,249,133,138,130,124,253,227,111,54,207,215,70,7,218,173,42,26,177,179,85,130,29,50,128,89,111,182,138], accounts[7], accounts[2], 1338, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 5, 27, accounts[7], 1532892063, 27,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([99,154,221,169,123,154,255,37,120,72,124,242,233,212,4,88,231,196,126,208,90,151,177,171,226,254,42,112,148,249,159,170], "0x0000000000000000000000000000000000000000", 95,{from: accounts[0],value:95});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([99,154,221,169,123,154,255,37,120,72,124,242,233,212,4,88,231,196,126,208,90,151,177,171,226,254,42,112,148,249,159,170], "0x0000000000000000000000000000000000000000", 96,{from: accounts[0],value:95}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([63,78,101,49,130,29,129,96,46,166,239,216,33,192,81,22,181,208,131,133,35,162,65,189,21,250,84,88,198,86,147,56], accounts[7], 95,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([232,199,15,174,134,43,229,48,148,43,249,9,36,196,167,105,129,149,11,35,146,66,0,229,77,9,189,20,129,154,83,241],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([222,199,127,102,180,218,250,129,19,223,154,217,114,16,199,193,40,147,197,195,75,197,93,99,37,102,40,211,247,33,52,170], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([69,204,93,200,164,42,161,117,138,55,0,15,151,141,16,71,231,69,184,221,148,33,151,208,248,72,193,200,56,102,212,220], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([178,212,91,152,0,198,133,8,244,160,51,143,138,5,125,229,9,141,122,26,47,232,148,17,33,2,169,203,102,81,48,4], accounts[4],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([34,238,56,132,73,79,146,7,47,7,77,3,175,140,82,128,132,76,164,246,133,126,224,237,220,34,61,158,185,181,172,65], accounts[3],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(1336, 10,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1336, 10,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1336, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[5],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[5],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([28,129,161,175,109,235,40,225,103,79,66,8,31,22,226,33,204,244,247,105,247,151,175,254,182,199,150,63,153,91,34,184],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([182,245,125,242,212,24,160,0,56,78,120,206,209,110,41,120,37,182,209,156,110,235,95,137,16,11,103,229,142,117,173,111],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([210,209,162,78,51,185,111,177,218,165,95,202,127,94,8,29,109,194,100,118,224,173,177,101,21,152,252,69,191,99,189,25],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([193,61,225,15,63,199,26,85,89,100,85,64,41,81,55,150,189,67,8,109,216,216,225,143,149,211,49,140,172,113,137,234],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([245,76,237,80,193,28,156,130,252,86,28,234,194,42,243,52,132,182,136,45,102,63,120,15,184,141,77,108,168,36,248,40],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([213,84,115,19,166,95,168,179,105,132,42,191,66,95,51,195,128,150,45,13,13,90,124,247,14,243,224,130,232,58,230,16],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([140,194,157,50,106,129,60,108,19,94,230,95,223,151,13,15,204,137,34,53,123,17,209,162,245,250,35,25,28,235,169,236],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([66,82,204,77,192,29,167,190,196,41,97,170,28,154,24,190,141,230,14,33,229,215,240,248,141,153,227,164,4,173,248,147],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([9,142,247,39,136,247,116,181,75,35,129,235,107,23,89,110,148,158,205,171,35,248,216,185,141,80,121,20,238,61,81,219],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([1,195,146,68,238,229,57,199,220,31,41,44,154,222,38,203,145,72,233,29,31,171,87,181,25,203,52,139,152,177,137,151],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([213,242,91,137,112,124,46,176,39,217,50,149,207,226,127,17,84,7,225,63,181,84,32,52,243,64,173,100,167,152,143,53], accounts[0],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([56,148,229,110,190,251,78,75,140,45,72,126,78,22,142,254,22,99,225,187,240,179,4,93,223,133,138,75,208,120,52,187], accounts[0],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([166,25,145,254,98,215,172,206,96,20,11,163,226,91,40,180,146,6,129,161,214,192,81,211,145,200,82,10,199,88,92,43],{from: accounts[0]});
  });
});
