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
    let result = await contractSwaps.tokenFallback(accounts[8], 2014223715, [219,85,13,132,144,215,141,144,231,255,79,145,106,108,145,220,62,115,25,79,206,38,200,77,151,209,239,106,46,78,34,116],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([52,177,44,50,39,186,168,186,90,113,145,222,98,41,167,231,59,197,220,84,68,119,10,242,128,67,77,246,115,124,46,110], accounts[1], accounts[3], 10, 29, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+808, accounts[6], 64, 1336, accounts[6], 1337, 4038714809,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([52,177,44,50,39,186,168,186,90,113,145,222,98,41,167,231,59,197,220,84,68,119,10,242,128,67,77,246,115,124,46,110], accounts[3], accounts[3], 10, 29, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+808, accounts[6], 64, 1336, accounts[6], 1337, 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([52,177,44,50,39,186,168,186,90,113,145,222,98,41,167,231,59,197,220,84,68,119,10,242,128,67,77,246,115,124,46,110], accounts[1], accounts[3], 0, 29, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+808, accounts[6], 64, 1336, accounts[6], 1337, 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([52,177,44,50,39,186,168,186,90,113,145,222,98,41,167,231,59,197,220,84,68,119,10,242,128,67,77,246,115,124,46,110], accounts[1], accounts[3], 10, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+808, accounts[6], 64, 1336, accounts[6], 1337, 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([52,177,44,50,39,186,168,186,90,113,145,222,98,41,167,231,59,197,220,84,68,119,10,242,128,67,77,246,115,124,46,110], accounts[1], accounts[3], 10, 29, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 64, 1336, accounts[6], 1337, 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([106,191,197,96,156,11,194,93,165,139,235,113,31,57,8,48,99,120,227,211,126,56,64,99,40,199,25,70,73,61,206,183], accounts[6], accounts[5], 5, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+246, accounts[7], 2014223714, 9, "0x0000000000000000000000000000000000000000", 64, 4038714810,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([106,191,197,96,156,11,194,93,165,139,235,113,31,57,8,48,99,120,227,211,126,56,64,99,40,199,25,70,73,61,206,183], accounts[5], accounts[5], 5, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+246, accounts[7], 2014223714, 9, "0x0000000000000000000000000000000000000000", 64, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([106,191,197,96,156,11,194,93,165,139,235,113,31,57,8,48,99,120,227,211,126,56,64,99,40,199,25,70,73,61,206,183], accounts[6], accounts[5], 0, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+246, accounts[7], 2014223714, 9, "0x0000000000000000000000000000000000000000", 64, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([106,191,197,96,156,11,194,93,165,139,235,113,31,57,8,48,99,120,227,211,126,56,64,99,40,199,25,70,73,61,206,183], accounts[6], accounts[5], 5, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+246, accounts[7], 2014223714, 9, "0x0000000000000000000000000000000000000000", 64, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([106,191,197,96,156,11,194,93,165,139,235,113,31,57,8,48,99,120,227,211,126,56,64,99,40,199,25,70,73,61,206,183], accounts[6], accounts[5], 5, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 2014223714, 9, "0x0000000000000000000000000000000000000000", 64, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await contractSwaps.createOrder([109,154,167,160,104,86,24,233,2,147,130,168,150,159,143,242,81,218,149,46,159,38,92,148,109,88,97,142,157,221,8,165], accounts[4], accounts[8], 1338, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+253, accounts[6], 97, 257, accounts[8], 95, 26,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([109,154,167,160,104,86,24,233,2,147,130,168,150,159,143,242,81,218,149,46,159,38,92,148,109,88,97,142,157,221,8,165], accounts[8], accounts[8], 1338, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+253, accounts[6], 97, 257, accounts[8], 95, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([109,154,167,160,104,86,24,233,2,147,130,168,150,159,143,242,81,218,149,46,159,38,92,148,109,88,97,142,157,221,8,165], accounts[4], accounts[8], 0, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+253, accounts[6], 97, 257, accounts[8], 95, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([109,154,167,160,104,86,24,233,2,147,130,168,150,159,143,242,81,218,149,46,159,38,92,148,109,88,97,142,157,221,8,165], accounts[4], accounts[8], 1338, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+253, accounts[6], 97, 257, accounts[8], 95, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([109,154,167,160,104,86,24,233,2,147,130,168,150,159,143,242,81,218,149,46,159,38,92,148,109,88,97,142,157,221,8,165], accounts[4], accounts[8], 1338, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 97, 257, accounts[8], 95, 26,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([60,132,169,22,232,123,75,171,126,246,147,187,181,160,83,147,173,94,120,211,65,94,231,37,95,232,100,29,193,192,31,166], accounts[8], accounts[9], 2014223714, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+933, accounts[1], 9999, 1338, accounts[1], 28, 96,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([60,132,169,22,232,123,75,171,126,246,147,187,181,160,83,147,173,94,120,211,65,94,231,37,95,232,100,29,193,192,31,166], accounts[9], accounts[9], 2014223714, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+933, accounts[1], 9999, 1338, accounts[1], 28, 96,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([60,132,169,22,232,123,75,171,126,246,147,187,181,160,83,147,173,94,120,211,65,94,231,37,95,232,100,29,193,192,31,166], accounts[8], accounts[9], 0, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+933, accounts[1], 9999, 1338, accounts[1], 28, 96,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([60,132,169,22,232,123,75,171,126,246,147,187,181,160,83,147,173,94,120,211,65,94,231,37,95,232,100,29,193,192,31,166], accounts[8], accounts[9], 2014223714, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+933, accounts[1], 9999, 1338, accounts[1], 28, 96,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([60,132,169,22,232,123,75,171,126,246,147,187,181,160,83,147,173,94,120,211,65,94,231,37,95,232,100,29,193,192,31,166], accounts[8], accounts[9], 2014223714, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 9999, 1338, accounts[1], 28, 96,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([149,185,191,211,233,99,140,34,20,95,148,251,123,55,186,107,85,53,164,21,176,53,103,207,156,56,217,93,78,27,18,190], "0x0000000000000000000000000000000000000000", 10000,{from: accounts[0],value:10000});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([149,185,191,211,233,99,140,34,20,95,148,251,123,55,186,107,85,53,164,21,176,53,103,207,156,56,217,93,78,27,18,190], "0x0000000000000000000000000000000000000000", 10001,{from: accounts[0],value:10000}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([142,120,38,85,136,231,201,73,38,46,32,242,153,184,205,103,197,225,4,56,188,65,23,164,230,187,209,53,141,104,200,19], accounts[6], 26,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([158,222,252,92,74,13,230,106,5,131,35,81,193,64,70,194,214,173,10,230,215,173,10,233,76,45,65,119,145,134,173,181],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([159,150,61,51,96,69,246,234,7,118,172,241,93,60,54,47,80,161,37,205,128,191,88,198,175,68,10,2,91,8,94,237], accounts[9],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([241,28,30,143,152,57,186,182,121,170,175,76,11,146,188,131,36,125,214,199,197,239,4,242,9,22,206,6,160,79,73,50], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([197,41,165,249,213,78,8,37,71,89,49,112,48,115,58,83,65,136,91,166,57,204,47,7,237,145,111,97,58,115,138,7], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([10,220,242,242,136,48,247,163,206,118,119,72,210,237,6,196,215,252,172,129,244,93,20,177,150,115,94,33,200,153,241,19], accounts[2],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(96, 2,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(96, 2,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(96, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[1],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[6],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([148,203,206,71,178,118,145,43,76,211,142,207,49,86,36,112,233,120,243,44,193,163,204,5,149,88,99,128,165,28,41,96],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([27,135,230,222,198,118,31,192,108,167,21,22,84,166,223,161,166,67,219,152,156,214,151,54,120,217,193,110,187,135,62,160],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([18,215,120,55,129,66,191,29,188,109,157,208,12,70,255,147,173,176,46,127,167,33,177,133,73,124,124,219,82,135,187,31],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([110,251,173,39,184,252,70,48,28,162,120,168,79,197,237,57,83,59,86,180,177,241,221,21,126,56,76,210,90,123,208,189],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([37,195,189,222,151,242,212,140,7,17,197,171,151,196,174,153,206,209,0,11,19,68,201,204,40,135,89,201,101,134,192,136],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([133,149,184,29,170,4,217,172,180,214,89,185,85,113,213,48,198,246,237,6,48,168,224,22,10,35,97,231,206,74,226,30],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([124,207,106,70,223,111,102,48,56,61,97,202,110,24,210,115,54,18,226,122,223,108,248,233,61,253,6,188,117,171,154,58],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([157,138,182,124,19,1,150,77,89,41,180,228,49,222,69,224,103,246,120,124,161,134,115,34,0,19,22,231,38,224,168,200],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([36,161,148,225,58,65,104,122,59,216,60,129,208,149,68,219,13,244,247,78,190,17,87,32,208,152,22,3,116,74,115,113],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([44,16,213,160,178,78,249,190,145,154,9,143,33,213,157,82,174,234,66,181,26,197,104,216,122,72,188,233,87,196,79,102],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([9,133,198,137,178,248,125,240,228,202,253,59,47,238,179,149,242,105,141,53,211,226,156,12,97,254,107,188,21,78,208,187], accounts[8],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([12,151,65,177,153,131,255,8,88,175,91,63,119,221,57,17,210,137,167,133,177,142,41,22,69,226,129,83,139,164,242,75], accounts[2],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([92,212,25,116,7,239,138,97,159,2,141,26,188,191,37,144,150,69,60,180,112,64,161,157,249,253,177,248,67,254,76,219],{from: accounts[0]});
  });
});
