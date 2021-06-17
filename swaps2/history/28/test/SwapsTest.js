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
    let result = await contractSwaps.tokenFallback(accounts[1], 97, [77,102,98,108,71,66,111,120,244,43,233,11,172,2,155,177,44,184,7,159,64,231,87,161,229,39,225,211,145,130,242,188],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([147,4,29,145,64,100,218,197,175,189,150,196,64,101,25,95,66,157,1,129,156,162,131,77,117,236,158,140,116,54,50,125], accounts[0], accounts[5], 1532892062, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+238, accounts[1], 2014223715, 4038714810, accounts[3], 257, 5,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([147,4,29,145,64,100,218,197,175,189,150,196,64,101,25,95,66,157,1,129,156,162,131,77,117,236,158,140,116,54,50,125], accounts[5], accounts[5], 1532892062, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+238, accounts[1], 2014223715, 4038714810, accounts[3], 257, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([147,4,29,145,64,100,218,197,175,189,150,196,64,101,25,95,66,157,1,129,156,162,131,77,117,236,158,140,116,54,50,125], accounts[0], accounts[5], 0, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+238, accounts[1], 2014223715, 4038714810, accounts[3], 257, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([147,4,29,145,64,100,218,197,175,189,150,196,64,101,25,95,66,157,1,129,156,162,131,77,117,236,158,140,116,54,50,125], accounts[0], accounts[5], 1532892062, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+238, accounts[1], 2014223715, 4038714810, accounts[3], 257, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([147,4,29,145,64,100,218,197,175,189,150,196,64,101,25,95,66,157,1,129,156,162,131,77,117,236,158,140,116,54,50,125], accounts[0], accounts[5], 1532892062, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 2014223715, 4038714810, accounts[3], 257, 5,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([36,140,10,27,66,131,231,58,78,67,35,98,69,35,23,27,122,157,193,190,248,37,70,157,123,112,179,47,71,37,49,43], accounts[2], accounts[5], 1338, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+142, accounts[5], 28, 256, "0x0000000000000000000000000000000000000000", 4038714810, 27,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([36,140,10,27,66,131,231,58,78,67,35,98,69,35,23,27,122,157,193,190,248,37,70,157,123,112,179,47,71,37,49,43], accounts[5], accounts[5], 1338, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+142, accounts[5], 28, 256, "0x0000000000000000000000000000000000000000", 4038714810, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([36,140,10,27,66,131,231,58,78,67,35,98,69,35,23,27,122,157,193,190,248,37,70,157,123,112,179,47,71,37,49,43], accounts[2], accounts[5], 0, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+142, accounts[5], 28, 256, "0x0000000000000000000000000000000000000000", 4038714810, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([36,140,10,27,66,131,231,58,78,67,35,98,69,35,23,27,122,157,193,190,248,37,70,157,123,112,179,47,71,37,49,43], accounts[2], accounts[5], 1338, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+142, accounts[5], 28, 256, "0x0000000000000000000000000000000000000000", 4038714810, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([36,140,10,27,66,131,231,58,78,67,35,98,69,35,23,27,122,157,193,190,248,37,70,157,123,112,179,47,71,37,49,43], accounts[2], accounts[5], 1338, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 28, 256, "0x0000000000000000000000000000000000000000", 4038714810, 27,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await contractSwaps.createOrder([124,8,160,151,171,219,58,182,93,142,23,248,34,149,76,112,20,51,88,175,84,217,197,65,45,178,195,96,15,118,200,220], accounts[7], accounts[2], 1336, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+786, accounts[5], 1532892064, 4038714810, accounts[4], 1337, 9999,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([124,8,160,151,171,219,58,182,93,142,23,248,34,149,76,112,20,51,88,175,84,217,197,65,45,178,195,96,15,118,200,220], accounts[2], accounts[2], 1336, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+786, accounts[5], 1532892064, 4038714810, accounts[4], 1337, 9999,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([124,8,160,151,171,219,58,182,93,142,23,248,34,149,76,112,20,51,88,175,84,217,197,65,45,178,195,96,15,118,200,220], accounts[7], accounts[2], 0, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+786, accounts[5], 1532892064, 4038714810, accounts[4], 1337, 9999,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([124,8,160,151,171,219,58,182,93,142,23,248,34,149,76,112,20,51,88,175,84,217,197,65,45,178,195,96,15,118,200,220], accounts[7], accounts[2], 1336, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+786, accounts[5], 1532892064, 4038714810, accounts[4], 1337, 9999,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([124,8,160,151,171,219,58,182,93,142,23,248,34,149,76,112,20,51,88,175,84,217,197,65,45,178,195,96,15,118,200,220], accounts[7], accounts[2], 1336, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 1532892064, 4038714810, accounts[4], 1337, 9999,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([226,86,16,192,255,174,254,91,5,157,78,76,176,122,220,87,154,116,252,65,10,136,27,110,29,37,67,175,29,37,106,10], accounts[6], accounts[5], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+922, accounts[6], 1532892064, 1532892063, accounts[5], 1532892064, 10001,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([226,86,16,192,255,174,254,91,5,157,78,76,176,122,220,87,154,116,252,65,10,136,27,110,29,37,67,175,29,37,106,10], accounts[5], accounts[5], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+922, accounts[6], 1532892064, 1532892063, accounts[5], 1532892064, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([226,86,16,192,255,174,254,91,5,157,78,76,176,122,220,87,154,116,252,65,10,136,27,110,29,37,67,175,29,37,106,10], accounts[6], accounts[5], 0, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+922, accounts[6], 1532892064, 1532892063, accounts[5], 1532892064, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([226,86,16,192,255,174,254,91,5,157,78,76,176,122,220,87,154,116,252,65,10,136,27,110,29,37,67,175,29,37,106,10], accounts[6], accounts[5], 1532892062, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+922, accounts[6], 1532892064, 1532892063, accounts[5], 1532892064, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([226,86,16,192,255,174,254,91,5,157,78,76,176,122,220,87,154,116,252,65,10,136,27,110,29,37,67,175,29,37,106,10], accounts[6], accounts[5], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 1532892064, 1532892063, accounts[5], 1532892064, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([50,40,130,101,150,167,49,178,70,65,211,10,196,176,223,186,208,202,49,183,245,22,15,37,161,217,34,195,45,173,110,211], "0x0000000000000000000000000000000000000000", 1336,{from: accounts[0],value:1336});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([50,40,130,101,150,167,49,178,70,65,211,10,196,176,223,186,208,202,49,183,245,22,15,37,161,217,34,195,45,173,110,211], "0x0000000000000000000000000000000000000000", 1337,{from: accounts[0],value:1336}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([74,59,165,230,154,65,126,192,150,150,155,161,203,153,164,54,162,21,171,222,58,246,93,51,72,22,160,92,121,243,139,22], accounts[9], 28,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([67,138,203,237,95,242,197,64,60,14,139,160,9,192,96,158,21,150,34,189,171,130,143,215,160,175,166,88,140,231,111,165],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([146,67,118,229,179,203,240,120,23,230,147,70,131,123,160,54,165,226,252,176,147,89,86,87,16,44,244,204,178,205,185,94], accounts[5],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([81,41,21,199,48,216,225,1,135,83,49,65,118,194,128,22,195,109,68,17,68,166,93,164,66,189,137,48,188,75,12,195], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([4,251,86,43,103,213,22,75,231,49,177,210,13,31,82,136,134,47,238,10,224,148,254,121,78,68,167,102,194,55,201,216], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([14,56,166,63,53,89,113,40,59,49,65,28,53,216,21,242,209,160,226,80,227,100,188,160,182,127,106,130,154,241,156,108], accounts[8],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(3, 254,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(3, 254,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(3, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[7],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[2],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([19,168,231,86,191,44,63,114,16,81,31,248,25,124,9,250,117,193,247,22,190,170,103,153,163,36,52,76,96,168,173,124],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([187,189,6,6,205,2,196,82,54,253,68,128,208,136,124,70,124,252,27,61,92,116,49,82,87,112,217,226,206,206,92,67],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([176,38,52,78,112,13,1,94,88,94,50,14,33,227,150,53,188,54,52,115,139,195,234,77,154,124,204,114,73,225,31,189],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([127,123,211,254,23,59,54,168,209,128,154,15,250,185,133,43,135,164,50,116,240,240,201,10,48,158,213,124,54,140,88,3],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([175,212,108,237,242,237,222,56,99,242,72,81,46,73,172,198,244,226,164,157,1,72,241,6,248,238,126,38,113,138,1,60],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([135,78,228,152,185,139,227,127,200,218,7,53,135,101,3,215,5,187,2,166,15,85,101,99,172,199,253,114,176,138,153,6],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([238,239,231,57,156,166,128,157,201,53,221,116,198,235,159,122,203,166,83,191,20,17,36,97,78,210,28,183,252,173,34,42],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([157,146,88,16,76,221,158,185,234,76,201,128,210,18,219,156,198,29,43,146,220,59,37,54,28,5,138,175,81,92,13,154],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([60,106,220,234,55,39,172,241,28,195,116,44,181,86,180,0,157,86,12,239,94,60,170,214,219,95,69,196,142,194,247,19],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([207,34,82,49,146,234,49,129,244,16,178,231,104,183,61,240,62,144,113,46,130,218,134,215,9,23,147,81,156,143,104,60],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([46,246,180,144,73,135,4,19,148,239,119,164,14,212,241,178,82,124,103,118,236,170,74,107,218,34,30,157,13,68,38,142], accounts[5],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([149,74,60,191,224,1,24,71,89,251,113,20,28,252,46,161,95,43,237,70,47,60,114,240,4,22,186,8,13,142,114,3], accounts[8],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([144,153,178,179,185,150,38,88,210,102,194,53,162,214,163,36,209,16,100,45,152,142,186,186,171,176,4,223,197,68,34,142],{from: accounts[0]});
  });
});
