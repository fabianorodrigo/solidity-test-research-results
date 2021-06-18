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
    let result = await contractSwaps.tokenFallback(accounts[0], 0, [43,190,195,110,126,248,32,187,31,155,163,118,45,10,233,18,121,79,124,83,211,224,203,126,247,223,236,74,61,127,190,94],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([239,169,171,40,183,176,38,50,188,128,213,107,1,220,82,135,153,162,151,177,66,154,40,181,180,149,44,92,41,0,224,165], accounts[1], accounts[2], 4038714809, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+415, accounts[0], 2, 1337, accounts[3], 28, 254,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([239,169,171,40,183,176,38,50,188,128,213,107,1,220,82,135,153,162,151,177,66,154,40,181,180,149,44,92,41,0,224,165], accounts[2], accounts[2], 4038714809, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+415, accounts[0], 2, 1337, accounts[3], 28, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([239,169,171,40,183,176,38,50,188,128,213,107,1,220,82,135,153,162,151,177,66,154,40,181,180,149,44,92,41,0,224,165], accounts[1], accounts[2], 0, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+415, accounts[0], 2, 1337, accounts[3], 28, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([239,169,171,40,183,176,38,50,188,128,213,107,1,220,82,135,153,162,151,177,66,154,40,181,180,149,44,92,41,0,224,165], accounts[1], accounts[2], 4038714809, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+415, accounts[0], 2, 1337, accounts[3], 28, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([239,169,171,40,183,176,38,50,188,128,213,107,1,220,82,135,153,162,151,177,66,154,40,181,180,149,44,92,41,0,224,165], accounts[1], accounts[2], 4038714809, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 2, 1337, accounts[3], 28, 254,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([227,143,228,30,247,36,108,217,247,203,219,11,80,43,70,100,139,172,46,86,217,107,78,19,251,226,210,125,77,108,28,46], accounts[2], accounts[4], 26, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+969, accounts[3], 4038714810, 1338, "0x0000000000000000000000000000000000000000", 256, 28,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([227,143,228,30,247,36,108,217,247,203,219,11,80,43,70,100,139,172,46,86,217,107,78,19,251,226,210,125,77,108,28,46], accounts[4], accounts[4], 26, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+969, accounts[3], 4038714810, 1338, "0x0000000000000000000000000000000000000000", 256, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([227,143,228,30,247,36,108,217,247,203,219,11,80,43,70,100,139,172,46,86,217,107,78,19,251,226,210,125,77,108,28,46], accounts[2], accounts[4], 0, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+969, accounts[3], 4038714810, 1338, "0x0000000000000000000000000000000000000000", 256, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([227,143,228,30,247,36,108,217,247,203,219,11,80,43,70,100,139,172,46,86,217,107,78,19,251,226,210,125,77,108,28,46], accounts[2], accounts[4], 26, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+969, accounts[3], 4038714810, 1338, "0x0000000000000000000000000000000000000000", 256, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([227,143,228,30,247,36,108,217,247,203,219,11,80,43,70,100,139,172,46,86,217,107,78,19,251,226,210,125,77,108,28,46], accounts[2], accounts[4], 26, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[3], 4038714810, 1338, "0x0000000000000000000000000000000000000000", 256, 28,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await contractSwaps.createOrder([122,112,106,115,34,142,240,197,21,156,157,184,139,174,88,161,185,180,84,243,195,158,199,15,15,148,30,17,203,9,254,217], accounts[9], accounts[1], 96, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+615, accounts[4], 1336, 1336, accounts[3], 1532892063, 257,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([122,112,106,115,34,142,240,197,21,156,157,184,139,174,88,161,185,180,84,243,195,158,199,15,15,148,30,17,203,9,254,217], accounts[1], accounts[1], 96, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+615, accounts[4], 1336, 1336, accounts[3], 1532892063, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([122,112,106,115,34,142,240,197,21,156,157,184,139,174,88,161,185,180,84,243,195,158,199,15,15,148,30,17,203,9,254,217], accounts[9], accounts[1], 0, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+615, accounts[4], 1336, 1336, accounts[3], 1532892063, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([122,112,106,115,34,142,240,197,21,156,157,184,139,174,88,161,185,180,84,243,195,158,199,15,15,148,30,17,203,9,254,217], accounts[9], accounts[1], 96, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+615, accounts[4], 1336, 1336, accounts[3], 1532892063, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([122,112,106,115,34,142,240,197,21,156,157,184,139,174,88,161,185,180,84,243,195,158,199,15,15,148,30,17,203,9,254,217], accounts[9], accounts[1], 96, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[4], 1336, 1336, accounts[3], 1532892063, 257,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([57,149,223,29,196,61,223,188,236,98,113,106,185,199,136,156,133,222,92,8,120,163,201,146,240,96,102,50,225,100,188,227], accounts[3], accounts[1], 2, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+664, accounts[8], 6, 97, accounts[2], 28, 6,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([57,149,223,29,196,61,223,188,236,98,113,106,185,199,136,156,133,222,92,8,120,163,201,146,240,96,102,50,225,100,188,227], accounts[1], accounts[1], 2, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+664, accounts[8], 6, 97, accounts[2], 28, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([57,149,223,29,196,61,223,188,236,98,113,106,185,199,136,156,133,222,92,8,120,163,201,146,240,96,102,50,225,100,188,227], accounts[3], accounts[1], 0, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+664, accounts[8], 6, 97, accounts[2], 28, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([57,149,223,29,196,61,223,188,236,98,113,106,185,199,136,156,133,222,92,8,120,163,201,146,240,96,102,50,225,100,188,227], accounts[3], accounts[1], 2, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+664, accounts[8], 6, 97, accounts[2], 28, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([57,149,223,29,196,61,223,188,236,98,113,106,185,199,136,156,133,222,92,8,120,163,201,146,240,96,102,50,225,100,188,227], accounts[3], accounts[1], 2, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 6, 97, accounts[2], 28, 6,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([134,26,182,244,135,165,100,103,233,171,91,195,172,87,217,123,89,5,40,87,180,227,99,245,237,58,19,115,198,162,224,220], "0x0000000000000000000000000000000000000000", 256,{from: accounts[0],value:256});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([134,26,182,244,135,165,100,103,233,171,91,195,172,87,217,123,89,5,40,87,180,227,99,245,237,58,19,115,198,162,224,220], "0x0000000000000000000000000000000000000000", 257,{from: accounts[0],value:256}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([4,15,215,7,242,208,118,65,196,29,148,115,179,92,112,40,145,138,104,187,114,234,78,67,112,115,11,26,207,140,122,68], accounts[0], 4038714810,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([53,47,89,64,21,60,253,31,18,198,12,111,177,122,219,159,234,205,80,174,29,85,146,181,126,163,164,23,156,175,99,154],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([213,18,181,129,58,72,191,241,84,171,45,27,38,146,27,58,206,70,24,16,179,156,141,229,58,91,231,38,211,183,207,213], accounts[5],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([193,78,217,175,169,197,92,177,230,239,99,224,33,242,40,160,246,168,114,46,98,7,76,157,152,24,246,131,56,206,217,141], accounts[5],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([247,20,95,67,88,113,161,252,158,141,189,166,12,248,14,163,26,206,62,230,76,194,41,101,154,67,5,24,79,101,39,234], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([47,73,170,204,120,217,26,118,169,184,210,131,177,108,126,106,30,228,101,191,31,73,113,3,235,21,93,89,2,241,14,16], accounts[7],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(11, 256,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(11, 256,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(11, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[5],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[4],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([46,148,150,32,195,120,238,121,161,69,22,214,93,89,137,140,220,222,72,209,161,216,229,191,65,131,19,42,208,5,48,134],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([195,43,180,242,62,226,182,33,105,42,162,149,183,176,153,233,35,59,28,96,71,138,138,223,111,128,96,170,148,155,209,249],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([233,48,253,254,249,91,207,20,15,100,188,102,13,29,62,14,209,154,181,38,66,74,93,108,98,226,180,83,4,195,238,244],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([48,127,234,40,32,103,85,179,54,145,54,61,111,22,138,181,178,232,133,63,50,157,114,251,178,137,131,152,129,213,49,9],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([253,153,47,252,206,159,234,24,112,23,245,1,33,82,10,253,208,193,247,219,167,226,185,136,130,198,204,62,192,99,184,53],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([82,208,186,98,228,185,8,172,30,13,10,125,191,65,220,246,16,38,147,78,226,127,13,82,30,107,47,32,185,215,164,78],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([42,11,46,230,5,176,133,30,79,74,88,33,121,76,129,234,134,104,213,178,167,44,99,1,98,73,214,198,76,151,0,74],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([181,165,180,165,11,210,125,234,26,94,80,81,107,241,123,92,192,85,177,111,110,135,140,125,124,204,97,85,95,70,28,192],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([77,165,50,219,114,224,119,142,205,77,169,15,202,186,170,88,166,124,218,92,35,56,69,255,52,102,124,15,57,184,183,229],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([21,205,169,92,62,90,164,226,51,195,173,153,152,44,172,252,15,53,201,7,65,145,141,139,201,180,230,26,38,204,102,79],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([11,196,86,20,136,85,250,233,9,218,141,78,205,3,107,186,58,9,65,180,69,251,236,148,232,234,62,127,45,139,213,76], accounts[0],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([198,104,193,22,215,237,60,47,48,107,80,108,209,7,194,217,52,149,116,180,38,152,213,191,179,152,235,20,148,128,169,146], accounts[6],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([146,107,121,55,241,15,212,213,76,194,193,179,58,61,125,5,33,114,147,34,220,124,191,19,101,128,150,95,243,245,120,0],{from: accounts[0]});
  });
});
