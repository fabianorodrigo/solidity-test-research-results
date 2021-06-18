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
    let result = await contractSwaps.tokenFallback(accounts[3], 26, [94,193,197,200,87,195,187,139,114,56,206,79,130,182,217,54,37,236,34,92,229,195,195,114,143,102,239,245,72,91,156,195],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([212,26,25,105,17,189,135,82,223,46,115,94,204,35,97,19,104,125,47,49,35,20,9,144,228,147,52,195,128,249,98,127], accounts[3], accounts[0], 28, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+46, accounts[0], 255, 1532892063, accounts[1], 257, 6,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([212,26,25,105,17,189,135,82,223,46,115,94,204,35,97,19,104,125,47,49,35,20,9,144,228,147,52,195,128,249,98,127], accounts[0], accounts[0], 28, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+46, accounts[0], 255, 1532892063, accounts[1], 257, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([212,26,25,105,17,189,135,82,223,46,115,94,204,35,97,19,104,125,47,49,35,20,9,144,228,147,52,195,128,249,98,127], accounts[3], accounts[0], 0, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+46, accounts[0], 255, 1532892063, accounts[1], 257, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([212,26,25,105,17,189,135,82,223,46,115,94,204,35,97,19,104,125,47,49,35,20,9,144,228,147,52,195,128,249,98,127], accounts[3], accounts[0], 28, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+46, accounts[0], 255, 1532892063, accounts[1], 257, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([212,26,25,105,17,189,135,82,223,46,115,94,204,35,97,19,104,125,47,49,35,20,9,144,228,147,52,195,128,249,98,127], accounts[3], accounts[0], 28, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 255, 1532892063, accounts[1], 257, 6,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([42,110,52,146,83,208,110,108,93,161,250,45,240,5,55,18,245,32,106,99,99,223,217,246,107,176,181,170,222,105,191,82], accounts[4], accounts[3], 6, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+373, accounts[6], 10001, 3, "0x0000000000000000000000000000000000000000", 1, 255,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([42,110,52,146,83,208,110,108,93,161,250,45,240,5,55,18,245,32,106,99,99,223,217,246,107,176,181,170,222,105,191,82], accounts[3], accounts[3], 6, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+373, accounts[6], 10001, 3, "0x0000000000000000000000000000000000000000", 1, 255,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([42,110,52,146,83,208,110,108,93,161,250,45,240,5,55,18,245,32,106,99,99,223,217,246,107,176,181,170,222,105,191,82], accounts[4], accounts[3], 0, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+373, accounts[6], 10001, 3, "0x0000000000000000000000000000000000000000", 1, 255,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([42,110,52,146,83,208,110,108,93,161,250,45,240,5,55,18,245,32,106,99,99,223,217,246,107,176,181,170,222,105,191,82], accounts[4], accounts[3], 6, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+373, accounts[6], 10001, 3, "0x0000000000000000000000000000000000000000", 1, 255,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([42,110,52,146,83,208,110,108,93,161,250,45,240,5,55,18,245,32,106,99,99,223,217,246,107,176,181,170,222,105,191,82], accounts[4], accounts[3], 6, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 10001, 3, "0x0000000000000000000000000000000000000000", 1, 255,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await contractSwaps.createOrder([42,42,163,91,246,156,227,171,183,80,168,199,24,87,86,91,207,188,14,59,28,23,96,135,71,166,217,73,96,144,6,85], accounts[6], accounts[0], 1336, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+579, accounts[0], 9, 2014223716, accounts[0], 97, 10,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([42,42,163,91,246,156,227,171,183,80,168,199,24,87,86,91,207,188,14,59,28,23,96,135,71,166,217,73,96,144,6,85], accounts[0], accounts[0], 1336, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+579, accounts[0], 9, 2014223716, accounts[0], 97, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([42,42,163,91,246,156,227,171,183,80,168,199,24,87,86,91,207,188,14,59,28,23,96,135,71,166,217,73,96,144,6,85], accounts[6], accounts[0], 0, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+579, accounts[0], 9, 2014223716, accounts[0], 97, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([42,42,163,91,246,156,227,171,183,80,168,199,24,87,86,91,207,188,14,59,28,23,96,135,71,166,217,73,96,144,6,85], accounts[6], accounts[0], 1336, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+579, accounts[0], 9, 2014223716, accounts[0], 97, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([42,42,163,91,246,156,227,171,183,80,168,199,24,87,86,91,207,188,14,59,28,23,96,135,71,166,217,73,96,144,6,85], accounts[6], accounts[0], 1336, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 9, 2014223716, accounts[0], 97, 10,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([9,57,148,115,250,159,9,185,87,66,190,106,71,197,92,183,97,49,199,220,79,30,244,232,237,66,153,154,53,53,109,109], accounts[5], accounts[0], 28, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+148, accounts[2], 255, 256, accounts[4], 66, 10,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([9,57,148,115,250,159,9,185,87,66,190,106,71,197,92,183,97,49,199,220,79,30,244,232,237,66,153,154,53,53,109,109], accounts[0], accounts[0], 28, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+148, accounts[2], 255, 256, accounts[4], 66, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([9,57,148,115,250,159,9,185,87,66,190,106,71,197,92,183,97,49,199,220,79,30,244,232,237,66,153,154,53,53,109,109], accounts[5], accounts[0], 0, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+148, accounts[2], 255, 256, accounts[4], 66, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([9,57,148,115,250,159,9,185,87,66,190,106,71,197,92,183,97,49,199,220,79,30,244,232,237,66,153,154,53,53,109,109], accounts[5], accounts[0], 28, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+148, accounts[2], 255, 256, accounts[4], 66, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([9,57,148,115,250,159,9,185,87,66,190,106,71,197,92,183,97,49,199,220,79,30,244,232,237,66,153,154,53,53,109,109], accounts[5], accounts[0], 28, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 255, 256, accounts[4], 66, 10,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([216,143,181,253,242,249,243,215,207,105,252,223,187,102,113,155,154,81,245,225,12,181,197,42,135,72,44,190,178,203,146,67], "0x0000000000000000000000000000000000000000", 29,{from: accounts[0],value:29});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([216,143,181,253,242,249,243,215,207,105,252,223,187,102,113,155,154,81,245,225,12,181,197,42,135,72,44,190,178,203,146,67], "0x0000000000000000000000000000000000000000", 30,{from: accounts[0],value:29}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([160,145,38,12,62,212,116,30,70,154,208,230,37,57,175,31,194,238,169,168,75,66,80,89,135,99,242,203,212,80,152,12], accounts[3], 65,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([89,67,248,186,5,255,97,246,189,173,8,30,66,81,86,25,183,160,111,150,182,222,4,104,121,45,217,239,191,242,58,215],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([168,52,67,120,101,146,23,250,115,76,179,179,245,11,182,63,214,166,250,183,212,9,44,168,66,106,136,114,11,183,3,170], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([234,127,61,89,120,233,114,13,211,92,232,74,120,90,64,18,93,254,136,64,255,199,180,170,115,69,163,247,136,102,38,178], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([206,14,148,25,37,164,116,110,222,91,133,227,172,60,22,84,128,64,142,142,12,126,173,218,93,117,121,143,176,29,85,211], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([245,228,158,222,81,227,181,87,51,116,228,104,78,34,127,50,239,129,206,190,52,53,87,183,207,86,103,64,1,149,110,142], accounts[7],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(0, 1338,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(0, 1338,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 1338,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(0, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[5],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[8],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([0,177,80,47,149,181,6,157,233,141,191,99,161,4,121,184,166,41,55,182,33,116,209,218,232,169,137,176,29,134,85,25],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([105,74,48,49,148,111,89,208,100,61,44,190,161,65,221,81,232,81,144,63,88,108,116,252,15,70,246,18,42,235,163,198],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([60,75,28,167,248,183,100,92,210,91,32,194,15,140,74,98,148,7,208,247,188,143,200,197,158,52,33,232,228,75,213,60],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([204,131,203,232,118,46,115,228,167,37,164,236,142,154,177,179,186,102,162,61,234,94,126,158,102,42,36,199,126,98,42,23],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([202,156,39,150,207,163,18,70,17,232,97,49,164,157,4,20,73,152,185,49,131,43,146,19,99,207,195,152,23,108,42,4],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([168,133,143,119,150,80,142,166,184,2,148,48,186,8,95,23,40,145,169,62,36,97,8,124,34,232,154,226,187,179,187,31],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([255,80,236,172,62,63,153,160,200,44,142,202,52,152,238,224,6,114,171,137,97,127,187,98,45,82,22,199,165,85,72,154],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([72,196,4,152,34,191,15,201,219,217,10,168,89,225,97,59,239,39,117,130,189,182,82,98,173,210,198,176,23,21,27,237],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([40,17,230,113,177,134,111,210,67,9,225,23,157,238,179,3,88,131,129,91,180,163,132,225,21,107,197,236,44,102,111,30],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([236,29,61,90,72,254,26,243,99,57,96,36,49,138,218,194,192,143,184,59,197,125,149,148,25,128,221,111,241,36,109,189],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([72,120,140,184,150,184,207,115,198,7,127,206,110,32,199,173,129,219,69,21,13,222,254,47,62,64,166,230,137,192,153,165], accounts[6],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([158,115,66,248,113,115,59,92,69,233,96,144,98,169,255,190,128,250,133,69,38,95,225,253,24,48,110,255,169,169,54,85], accounts[5],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([225,121,73,92,45,254,103,225,41,143,42,145,68,139,90,188,159,238,13,50,176,240,160,45,203,62,117,145,81,130,175,129],{from: accounts[0]});
  });
});
