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
    let result = await contractSwaps.tokenFallback(accounts[8], 11, [143,175,165,21,97,39,106,231,44,36,162,248,231,98,242,212,35,178,19,117,59,22,86,250,2,59,6,58,158,55,106,161],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([51,201,76,177,177,182,237,244,220,187,25,254,58,31,13,85,118,68,92,86,19,79,95,255,230,181,90,223,237,142,62,54], accounts[2], accounts[9], 27, 2014223716, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+469, accounts[0], 1532892064, 26, accounts[7], 28, 4,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([51,201,76,177,177,182,237,244,220,187,25,254,58,31,13,85,118,68,92,86,19,79,95,255,230,181,90,223,237,142,62,54], accounts[9], accounts[9], 27, 2014223716, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+469, accounts[0], 1532892064, 26, accounts[7], 28, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([51,201,76,177,177,182,237,244,220,187,25,254,58,31,13,85,118,68,92,86,19,79,95,255,230,181,90,223,237,142,62,54], accounts[2], accounts[9], 0, 2014223716, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+469, accounts[0], 1532892064, 26, accounts[7], 28, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([51,201,76,177,177,182,237,244,220,187,25,254,58,31,13,85,118,68,92,86,19,79,95,255,230,181,90,223,237,142,62,54], accounts[2], accounts[9], 27, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+469, accounts[0], 1532892064, 26, accounts[7], 28, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([51,201,76,177,177,182,237,244,220,187,25,254,58,31,13,85,118,68,92,86,19,79,95,255,230,181,90,223,237,142,62,54], accounts[2], accounts[9], 27, 2014223716, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 1532892064, 26, accounts[7], 28, 4,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([90,3,74,83,87,246,210,251,246,57,150,89,164,66,153,193,134,161,150,88,103,31,212,75,2,94,169,150,135,223,46,62], accounts[6], accounts[1], 4, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+251, accounts[2], 2014223715, 66, "0x0000000000000000000000000000000000000000", 254, 1532892063,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([90,3,74,83,87,246,210,251,246,57,150,89,164,66,153,193,134,161,150,88,103,31,212,75,2,94,169,150,135,223,46,62], accounts[1], accounts[1], 4, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+251, accounts[2], 2014223715, 66, "0x0000000000000000000000000000000000000000", 254, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([90,3,74,83,87,246,210,251,246,57,150,89,164,66,153,193,134,161,150,88,103,31,212,75,2,94,169,150,135,223,46,62], accounts[6], accounts[1], 0, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+251, accounts[2], 2014223715, 66, "0x0000000000000000000000000000000000000000", 254, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([90,3,74,83,87,246,210,251,246,57,150,89,164,66,153,193,134,161,150,88,103,31,212,75,2,94,169,150,135,223,46,62], accounts[6], accounts[1], 4, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+251, accounts[2], 2014223715, 66, "0x0000000000000000000000000000000000000000", 254, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([90,3,74,83,87,246,210,251,246,57,150,89,164,66,153,193,134,161,150,88,103,31,212,75,2,94,169,150,135,223,46,62], accounts[6], accounts[1], 4, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 2014223715, 66, "0x0000000000000000000000000000000000000000", 254, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await contractSwaps.createOrder([49,10,220,54,230,251,51,125,146,11,227,180,108,168,199,160,34,176,99,124,202,105,3,183,249,105,47,120,115,6,71,72], accounts[8], accounts[9], 3, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+543, accounts[2], 255, 4038714810, accounts[0], 3, 254,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([49,10,220,54,230,251,51,125,146,11,227,180,108,168,199,160,34,176,99,124,202,105,3,183,249,105,47,120,115,6,71,72], accounts[9], accounts[9], 3, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+543, accounts[2], 255, 4038714810, accounts[0], 3, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([49,10,220,54,230,251,51,125,146,11,227,180,108,168,199,160,34,176,99,124,202,105,3,183,249,105,47,120,115,6,71,72], accounts[8], accounts[9], 0, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+543, accounts[2], 255, 4038714810, accounts[0], 3, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([49,10,220,54,230,251,51,125,146,11,227,180,108,168,199,160,34,176,99,124,202,105,3,183,249,105,47,120,115,6,71,72], accounts[8], accounts[9], 3, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+543, accounts[2], 255, 4038714810, accounts[0], 3, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([49,10,220,54,230,251,51,125,146,11,227,180,108,168,199,160,34,176,99,124,202,105,3,183,249,105,47,120,115,6,71,72], accounts[8], accounts[9], 3, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 255, 4038714810, accounts[0], 3, 254,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([187,253,185,31,119,73,194,251,56,134,195,11,105,19,207,197,82,5,75,203,40,180,27,105,148,69,37,212,87,140,47,114], accounts[5], accounts[4], 95, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+247, accounts[5], 10000, 10001, accounts[0], 4038714809, 257,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([187,253,185,31,119,73,194,251,56,134,195,11,105,19,207,197,82,5,75,203,40,180,27,105,148,69,37,212,87,140,47,114], accounts[4], accounts[4], 95, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+247, accounts[5], 10000, 10001, accounts[0], 4038714809, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([187,253,185,31,119,73,194,251,56,134,195,11,105,19,207,197,82,5,75,203,40,180,27,105,148,69,37,212,87,140,47,114], accounts[5], accounts[4], 0, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+247, accounts[5], 10000, 10001, accounts[0], 4038714809, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([187,253,185,31,119,73,194,251,56,134,195,11,105,19,207,197,82,5,75,203,40,180,27,105,148,69,37,212,87,140,47,114], accounts[5], accounts[4], 95, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+247, accounts[5], 10000, 10001, accounts[0], 4038714809, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([187,253,185,31,119,73,194,251,56,134,195,11,105,19,207,197,82,5,75,203,40,180,27,105,148,69,37,212,87,140,47,114], accounts[5], accounts[4], 95, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 10000, 10001, accounts[0], 4038714809, 257,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([28,169,97,3,96,150,221,177,207,55,114,33,16,138,33,111,162,190,24,108,249,1,129,17,69,134,245,169,153,196,46,86], "0x0000000000000000000000000000000000000000", 64,{from: accounts[0],value:64});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([28,169,97,3,96,150,221,177,207,55,114,33,16,138,33,111,162,190,24,108,249,1,129,17,69,134,245,169,153,196,46,86], "0x0000000000000000000000000000000000000000", 65,{from: accounts[0],value:64}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([17,71,202,74,22,235,85,97,188,133,16,231,161,47,239,158,10,114,52,223,182,2,148,54,143,255,128,116,229,3,3,181], accounts[3], 9999,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([52,135,121,239,32,81,50,29,103,208,217,197,9,40,163,134,200,241,143,84,184,229,135,254,88,159,223,60,222,55,165,61],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([204,228,2,153,35,21,251,29,188,14,111,172,178,86,242,225,34,214,131,125,116,100,2,254,20,243,104,180,64,9,11,155], accounts[5],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([177,150,144,10,187,233,190,97,84,89,166,229,115,199,213,201,31,111,186,149,127,160,64,97,111,147,127,113,21,43,122,171], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([136,53,238,189,40,244,71,70,191,220,42,225,149,1,102,233,19,206,240,198,228,15,129,9,77,121,22,32,215,34,66,22], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([136,7,92,45,91,75,12,89,250,213,176,58,182,159,81,36,23,137,139,153,83,20,185,88,193,15,247,44,143,33,163,64], accounts[4],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(64, 1,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(64, 1,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(64, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[2],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[9],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([251,37,207,62,127,195,169,198,68,254,252,139,234,180,210,114,123,189,23,251,149,107,209,184,126,192,27,241,12,184,21,29],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([45,93,63,237,125,111,52,146,201,28,151,255,31,143,224,0,155,136,230,161,161,96,3,244,223,131,196,36,48,190,254,84],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([55,206,3,53,250,66,115,134,143,216,171,108,112,57,152,222,158,41,20,218,208,181,191,99,208,162,116,107,19,147,74,252],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([84,150,153,60,244,3,15,16,45,38,197,148,191,55,159,104,192,96,123,94,99,81,28,150,76,191,77,85,99,89,193,203],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([114,205,137,136,9,27,187,116,66,150,154,237,129,158,154,72,76,145,215,218,37,136,39,3,83,252,140,209,179,202,232,205],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([134,6,175,73,107,85,98,88,116,60,253,95,89,220,50,70,118,213,98,43,200,96,148,126,145,235,4,145,194,170,33,111],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([7,162,170,230,98,44,46,228,119,140,11,227,152,185,82,34,201,176,41,15,50,219,171,176,34,138,221,206,149,162,22,68],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([86,126,60,107,100,160,73,50,12,34,217,54,133,223,219,248,178,141,123,167,208,132,207,224,220,220,157,189,31,67,200,143],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([242,86,236,138,112,203,92,44,140,225,211,200,145,93,132,30,21,203,142,99,119,177,148,166,201,42,51,159,159,136,224,56],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([86,40,15,201,216,228,225,25,124,166,12,5,75,239,150,89,60,156,30,5,131,8,58,48,82,247,241,228,198,110,173,135],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([182,32,131,135,249,231,60,202,15,110,136,236,84,116,202,48,17,230,19,190,109,36,67,255,195,191,215,100,244,69,100,47], accounts[2],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([128,118,203,169,49,115,65,49,229,106,10,149,109,98,207,73,36,40,119,170,116,251,137,254,155,118,217,0,16,236,30,164], accounts[5],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([78,132,236,250,152,15,204,192,110,237,98,110,208,52,212,113,25,28,104,37,62,74,4,244,196,26,124,189,164,11,161,162],{from: accounts[0]});
  });
});
