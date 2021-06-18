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
    let result = await contractSwaps.tokenFallback(accounts[3], 257, [208,7,11,136,37,43,229,68,76,58,224,77,242,84,19,47,211,199,235,112,209,207,239,25,206,194,97,234,172,63,169,198],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([28,107,36,121,242,42,198,213,48,117,186,137,38,136,181,142,46,112,180,235,223,186,15,72,197,247,29,127,145,72,233,52], accounts[9], accounts[5], 66, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+972, accounts[0], 2014223716, 2014223714, accounts[2], 11, 97,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([28,107,36,121,242,42,198,213,48,117,186,137,38,136,181,142,46,112,180,235,223,186,15,72,197,247,29,127,145,72,233,52], accounts[5], accounts[5], 66, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+972, accounts[0], 2014223716, 2014223714, accounts[2], 11, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([28,107,36,121,242,42,198,213,48,117,186,137,38,136,181,142,46,112,180,235,223,186,15,72,197,247,29,127,145,72,233,52], accounts[9], accounts[5], 0, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+972, accounts[0], 2014223716, 2014223714, accounts[2], 11, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([28,107,36,121,242,42,198,213,48,117,186,137,38,136,181,142,46,112,180,235,223,186,15,72,197,247,29,127,145,72,233,52], accounts[9], accounts[5], 66, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+972, accounts[0], 2014223716, 2014223714, accounts[2], 11, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([28,107,36,121,242,42,198,213,48,117,186,137,38,136,181,142,46,112,180,235,223,186,15,72,197,247,29,127,145,72,233,52], accounts[9], accounts[5], 66, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 2014223716, 2014223714, accounts[2], 11, 97,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([61,13,1,123,98,120,48,66,166,84,211,187,189,100,3,40,33,151,252,39,80,33,146,33,92,105,84,84,226,111,195,64], accounts[1], accounts[9], 96, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648, accounts[5], 27, 28, "0x0000000000000000000000000000000000000000", 2014223715, 97,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([61,13,1,123,98,120,48,66,166,84,211,187,189,100,3,40,33,151,252,39,80,33,146,33,92,105,84,84,226,111,195,64], accounts[9], accounts[9], 96, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648, accounts[5], 27, 28, "0x0000000000000000000000000000000000000000", 2014223715, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([61,13,1,123,98,120,48,66,166,84,211,187,189,100,3,40,33,151,252,39,80,33,146,33,92,105,84,84,226,111,195,64], accounts[1], accounts[9], 0, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648, accounts[5], 27, 28, "0x0000000000000000000000000000000000000000", 2014223715, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([61,13,1,123,98,120,48,66,166,84,211,187,189,100,3,40,33,151,252,39,80,33,146,33,92,105,84,84,226,111,195,64], accounts[1], accounts[9], 96, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648, accounts[5], 27, 28, "0x0000000000000000000000000000000000000000", 2014223715, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([61,13,1,123,98,120,48,66,166,84,211,187,189,100,3,40,33,151,252,39,80,33,146,33,92,105,84,84,226,111,195,64], accounts[1], accounts[9], 96, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 27, 28, "0x0000000000000000000000000000000000000000", 2014223715, 97,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await contractSwaps.createOrder([79,120,112,21,66,78,240,228,203,67,123,5,87,231,225,74,105,96,110,9,156,209,214,105,204,147,15,24,92,193,9,57], accounts[6], accounts[4], 1532892064, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+809, accounts[9], 2014223715, 6, accounts[9], 0, 27,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([79,120,112,21,66,78,240,228,203,67,123,5,87,231,225,74,105,96,110,9,156,209,214,105,204,147,15,24,92,193,9,57], accounts[4], accounts[4], 1532892064, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+809, accounts[9], 2014223715, 6, accounts[9], 0, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([79,120,112,21,66,78,240,228,203,67,123,5,87,231,225,74,105,96,110,9,156,209,214,105,204,147,15,24,92,193,9,57], accounts[6], accounts[4], 0, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+809, accounts[9], 2014223715, 6, accounts[9], 0, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([79,120,112,21,66,78,240,228,203,67,123,5,87,231,225,74,105,96,110,9,156,209,214,105,204,147,15,24,92,193,9,57], accounts[6], accounts[4], 1532892064, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+809, accounts[9], 2014223715, 6, accounts[9], 0, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([79,120,112,21,66,78,240,228,203,67,123,5,87,231,225,74,105,96,110,9,156,209,214,105,204,147,15,24,92,193,9,57], accounts[6], accounts[4], 1532892064, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 2014223715, 6, accounts[9], 0, 27,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([235,115,151,185,144,113,88,10,84,247,245,141,126,24,108,180,92,156,81,179,94,95,165,125,199,187,113,117,49,241,22,249], accounts[5], accounts[4], 29, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+988, accounts[7], 4038714811, 97, accounts[6], 0, 26,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([235,115,151,185,144,113,88,10,84,247,245,141,126,24,108,180,92,156,81,179,94,95,165,125,199,187,113,117,49,241,22,249], accounts[4], accounts[4], 29, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+988, accounts[7], 4038714811, 97, accounts[6], 0, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([235,115,151,185,144,113,88,10,84,247,245,141,126,24,108,180,92,156,81,179,94,95,165,125,199,187,113,117,49,241,22,249], accounts[5], accounts[4], 0, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+988, accounts[7], 4038714811, 97, accounts[6], 0, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([235,115,151,185,144,113,88,10,84,247,245,141,126,24,108,180,92,156,81,179,94,95,165,125,199,187,113,117,49,241,22,249], accounts[5], accounts[4], 29, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+988, accounts[7], 4038714811, 97, accounts[6], 0, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([235,115,151,185,144,113,88,10,84,247,245,141,126,24,108,180,92,156,81,179,94,95,165,125,199,187,113,117,49,241,22,249], accounts[5], accounts[4], 29, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 4038714811, 97, accounts[6], 0, 26,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([4,245,194,12,20,132,222,176,27,38,4,207,222,140,19,7,181,26,215,68,174,60,19,65,43,27,78,225,212,208,211,47], "0x0000000000000000000000000000000000000000", 27,{from: accounts[0],value:27});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([4,245,194,12,20,132,222,176,27,38,4,207,222,140,19,7,181,26,215,68,174,60,19,65,43,27,78,225,212,208,211,47], "0x0000000000000000000000000000000000000000", 28,{from: accounts[0],value:27}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([231,185,4,128,245,38,234,117,69,80,217,68,0,195,142,156,252,28,99,82,227,165,191,203,229,65,195,223,6,231,231,187], accounts[7], 2,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([6,163,144,167,218,10,132,8,218,238,90,3,97,105,62,17,105,86,63,102,241,62,131,97,85,102,226,152,209,234,201,0],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([250,197,111,2,243,194,93,1,152,124,107,109,190,96,78,110,136,26,75,13,211,251,214,16,203,79,133,76,9,35,15,71], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([248,172,135,128,19,221,7,155,161,169,125,117,94,75,154,150,211,30,94,245,206,129,155,17,21,215,48,125,9,244,61,63], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([47,170,144,232,55,103,38,39,154,39,246,79,222,8,37,134,102,120,53,96,120,57,220,156,72,77,136,134,230,95,134,227], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([212,142,240,120,234,158,38,234,147,240,92,149,169,132,159,240,210,139,94,111,110,106,14,246,227,46,21,122,167,189,129,6], accounts[4],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(257, 2,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(257, 2,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(257, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[0],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[0],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[3],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([152,28,78,221,183,221,247,98,197,25,132,104,180,99,89,102,131,123,61,142,12,50,108,168,219,47,121,111,76,70,138,156],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([149,13,5,173,242,197,251,68,176,159,110,99,116,75,67,165,70,245,217,138,102,221,55,148,2,51,128,127,59,172,25,36],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([236,69,22,127,94,126,120,35,135,62,169,30,90,176,121,178,212,62,174,18,75,135,93,229,224,218,192,20,234,238,37,190],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([28,251,98,124,109,125,50,176,3,156,138,99,198,248,157,166,5,195,79,181,44,103,148,179,111,72,130,241,87,9,116,162],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([251,157,147,190,232,249,100,183,250,172,106,227,7,9,153,77,99,117,94,211,35,234,189,34,189,210,232,98,91,113,70,137],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([133,226,121,202,19,14,1,98,21,208,224,214,140,86,44,246,94,6,63,158,80,99,67,244,201,79,178,50,31,66,18,1],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([219,12,230,6,152,23,223,147,132,205,147,48,116,253,41,47,49,218,210,77,88,221,242,134,186,125,168,143,93,195,19,151],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([128,183,200,145,200,69,49,6,118,146,161,149,111,159,201,59,34,85,184,204,182,96,202,73,172,186,34,171,53,108,68,235],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([48,145,250,112,129,228,91,36,78,85,229,254,158,70,183,173,11,18,205,117,180,16,26,242,119,17,43,60,111,21,81,155],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([147,134,184,64,54,244,251,5,82,73,58,214,210,216,81,88,104,224,193,164,124,113,202,200,186,214,211,241,103,190,138,105],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([106,83,208,112,44,200,169,60,48,205,213,119,176,235,224,168,99,21,252,214,212,252,236,20,41,85,113,87,38,52,36,199], accounts[4],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([11,131,6,157,191,65,85,129,180,242,130,166,165,48,133,55,109,188,42,26,4,235,95,195,12,141,21,229,140,36,101,122], accounts[2],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([205,120,152,10,10,65,195,220,89,218,0,162,153,27,217,139,41,114,252,38,250,211,87,238,190,79,155,53,17,73,177,170],{from: accounts[0]});
  });
});
