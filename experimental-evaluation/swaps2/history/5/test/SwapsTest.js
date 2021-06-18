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
    let result = await contractSwaps.tokenFallback(accounts[6], 1532892062, [55,184,21,23,50,180,198,163,22,110,94,39,221,198,252,19,61,46,233,159,236,194,72,54,249,32,80,165,113,160,200,43],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([240,79,8,45,98,21,41,40,243,255,141,33,142,11,253,182,96,186,50,12,213,84,219,143,88,22,62,113,188,73,18,200], accounts[8], accounts[5], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+835, accounts[8], 9, 64, accounts[8], 255, 2014223716,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([240,79,8,45,98,21,41,40,243,255,141,33,142,11,253,182,96,186,50,12,213,84,219,143,88,22,62,113,188,73,18,200], accounts[5], accounts[5], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+835, accounts[8], 9, 64, accounts[8], 255, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([240,79,8,45,98,21,41,40,243,255,141,33,142,11,253,182,96,186,50,12,213,84,219,143,88,22,62,113,188,73,18,200], accounts[8], accounts[5], 0, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+835, accounts[8], 9, 64, accounts[8], 255, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([240,79,8,45,98,21,41,40,243,255,141,33,142,11,253,182,96,186,50,12,213,84,219,143,88,22,62,113,188,73,18,200], accounts[8], accounts[5], 1532892062, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+835, accounts[8], 9, 64, accounts[8], 255, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([240,79,8,45,98,21,41,40,243,255,141,33,142,11,253,182,96,186,50,12,213,84,219,143,88,22,62,113,188,73,18,200], accounts[8], accounts[5], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 9, 64, accounts[8], 255, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([227,108,153,252,83,139,216,165,72,190,147,240,75,172,210,6,59,207,7,92,35,175,86,198,127,113,75,163,18,230,216,120], accounts[7], accounts[0], 2014223716, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+364, accounts[3], 1532892064, 0, "0x0000000000000000000000000000000000000000", 27, 1532892062,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([227,108,153,252,83,139,216,165,72,190,147,240,75,172,210,6,59,207,7,92,35,175,86,198,127,113,75,163,18,230,216,120], accounts[0], accounts[0], 2014223716, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+364, accounts[3], 1532892064, 0, "0x0000000000000000000000000000000000000000", 27, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([227,108,153,252,83,139,216,165,72,190,147,240,75,172,210,6,59,207,7,92,35,175,86,198,127,113,75,163,18,230,216,120], accounts[7], accounts[0], 0, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+364, accounts[3], 1532892064, 0, "0x0000000000000000000000000000000000000000", 27, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([227,108,153,252,83,139,216,165,72,190,147,240,75,172,210,6,59,207,7,92,35,175,86,198,127,113,75,163,18,230,216,120], accounts[7], accounts[0], 2014223716, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+364, accounts[3], 1532892064, 0, "0x0000000000000000000000000000000000000000", 27, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([227,108,153,252,83,139,216,165,72,190,147,240,75,172,210,6,59,207,7,92,35,175,86,198,127,113,75,163,18,230,216,120], accounts[7], accounts[0], 2014223716, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[3], 1532892064, 0, "0x0000000000000000000000000000000000000000", 27, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await contractSwaps.createOrder([236,76,139,86,251,3,206,61,29,100,187,84,163,252,208,119,203,144,59,84,85,213,197,33,175,53,200,238,227,121,52,144], accounts[5], accounts[8], 95, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+436, accounts[7], 29, 96, accounts[9], 2014223715, 1532892063,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([236,76,139,86,251,3,206,61,29,100,187,84,163,252,208,119,203,144,59,84,85,213,197,33,175,53,200,238,227,121,52,144], accounts[8], accounts[8], 95, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+436, accounts[7], 29, 96, accounts[9], 2014223715, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([236,76,139,86,251,3,206,61,29,100,187,84,163,252,208,119,203,144,59,84,85,213,197,33,175,53,200,238,227,121,52,144], accounts[5], accounts[8], 0, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+436, accounts[7], 29, 96, accounts[9], 2014223715, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([236,76,139,86,251,3,206,61,29,100,187,84,163,252,208,119,203,144,59,84,85,213,197,33,175,53,200,238,227,121,52,144], accounts[5], accounts[8], 95, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+436, accounts[7], 29, 96, accounts[9], 2014223715, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([236,76,139,86,251,3,206,61,29,100,187,84,163,252,208,119,203,144,59,84,85,213,197,33,175,53,200,238,227,121,52,144], accounts[5], accounts[8], 95, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 29, 96, accounts[9], 2014223715, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([41,136,192,3,66,126,61,38,97,201,201,120,21,71,185,205,33,165,240,58,124,16,168,166,22,127,64,149,65,189,197,179], accounts[1], accounts[7], 28, 4038714810, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+109, accounts[7], 1532892064, 11, accounts[3], 29, 257,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([41,136,192,3,66,126,61,38,97,201,201,120,21,71,185,205,33,165,240,58,124,16,168,166,22,127,64,149,65,189,197,179], accounts[7], accounts[7], 28, 4038714810, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+109, accounts[7], 1532892064, 11, accounts[3], 29, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([41,136,192,3,66,126,61,38,97,201,201,120,21,71,185,205,33,165,240,58,124,16,168,166,22,127,64,149,65,189,197,179], accounts[1], accounts[7], 0, 4038714810, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+109, accounts[7], 1532892064, 11, accounts[3], 29, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([41,136,192,3,66,126,61,38,97,201,201,120,21,71,185,205,33,165,240,58,124,16,168,166,22,127,64,149,65,189,197,179], accounts[1], accounts[7], 28, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+109, accounts[7], 1532892064, 11, accounts[3], 29, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([41,136,192,3,66,126,61,38,97,201,201,120,21,71,185,205,33,165,240,58,124,16,168,166,22,127,64,149,65,189,197,179], accounts[1], accounts[7], 28, 4038714810, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 1532892064, 11, accounts[3], 29, 257,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([107,227,25,12,163,134,116,110,66,168,154,2,76,32,128,245,25,86,11,119,215,119,83,16,115,166,146,201,4,179,221,149], "0x0000000000000000000000000000000000000000", 2014223714,{from: accounts[0],value:2014223714});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([107,227,25,12,163,134,116,110,66,168,154,2,76,32,128,245,25,86,11,119,215,119,83,16,115,166,146,201,4,179,221,149], "0x0000000000000000000000000000000000000000", 2014223715,{from: accounts[0],value:2014223714}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([22,63,70,138,165,186,156,193,30,194,37,211,139,211,192,152,153,66,102,222,6,234,99,77,186,26,169,110,229,182,74,247], accounts[0], 97,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([253,241,186,235,57,166,19,166,140,124,216,206,47,234,139,112,37,88,248,50,109,100,213,62,91,52,230,180,55,88,86,173],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([76,117,127,18,19,4,243,35,3,188,165,204,178,200,235,78,178,91,52,67,127,180,153,68,52,106,104,138,7,209,59,166], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([45,57,150,168,182,71,26,114,67,49,43,67,182,219,189,10,228,71,52,206,109,220,150,244,211,66,219,143,15,6,69,18], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([3,99,238,174,22,31,6,149,164,194,231,11,92,238,220,185,233,213,22,59,251,62,183,172,11,214,241,3,207,60,138,118], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([66,87,233,36,241,119,209,83,105,24,96,103,44,153,252,157,212,34,239,139,71,25,130,72,168,146,184,175,9,214,110,150], accounts[6],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(11, 95,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(11, 95,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(11, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[1],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[1],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([91,5,106,153,244,140,107,241,209,204,3,22,57,86,131,201,209,9,245,24,142,239,127,252,199,186,138,203,39,119,180,97],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([229,57,178,203,88,234,151,127,238,37,45,38,31,77,67,221,228,48,177,40,165,72,158,143,59,50,254,211,127,111,152,215],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([173,105,114,6,176,200,36,183,164,94,184,184,112,129,138,80,220,203,74,180,44,78,255,186,134,71,171,34,242,115,67,202],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([53,24,7,155,214,30,78,139,97,122,81,209,113,48,39,174,166,116,57,72,235,33,187,42,83,200,193,36,40,148,126,124],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([57,209,176,41,220,242,187,145,145,63,99,8,35,73,80,82,225,178,138,23,142,217,142,41,18,101,201,251,160,183,60,251],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([0,151,206,48,54,20,75,0,134,132,193,117,14,52,186,69,198,70,123,153,217,240,62,113,162,51,193,118,196,62,80,167],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([65,225,237,168,96,51,170,162,227,38,32,80,125,78,186,19,161,58,197,52,246,251,249,3,94,103,47,215,28,40,80,56],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([6,112,236,189,180,96,12,172,25,194,156,127,3,74,97,207,112,149,5,210,5,17,81,126,238,44,188,16,83,26,253,240],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([69,189,249,106,15,206,228,49,174,73,15,64,151,251,32,109,164,61,135,68,78,48,195,15,16,22,2,130,65,71,64,131],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([207,57,107,197,211,109,214,253,99,27,228,171,66,131,220,192,12,17,144,42,0,38,96,46,212,222,71,13,94,119,27,237],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([115,86,245,44,185,170,246,83,238,115,208,67,130,89,170,87,143,124,219,163,205,217,66,195,183,223,244,93,77,124,84,185], accounts[4],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([30,39,169,113,52,112,181,54,131,16,248,194,151,99,230,38,214,87,194,49,55,216,74,242,18,88,184,153,4,241,128,209], accounts[1],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([190,167,115,43,126,226,4,155,231,243,230,71,128,137,166,161,124,39,228,170,174,112,222,241,170,253,21,1,236,148,64,98],{from: accounts[0]});
  });
});
