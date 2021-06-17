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
    let result = await contractSwaps.tokenFallback(accounts[8], 11, [219,224,59,9,18,241,244,118,80,203,211,86,16,34,120,71,141,110,100,221,244,172,27,189,96,42,189,182,201,111,158,34],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([118,72,92,242,40,242,27,70,136,92,203,167,212,64,169,130,246,148,27,112,133,99,86,254,211,45,161,212,18,14,187,78], accounts[9], accounts[7], 4038714811, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+833, accounts[0], 95, 1532892062, accounts[6], 254, 65,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([118,72,92,242,40,242,27,70,136,92,203,167,212,64,169,130,246,148,27,112,133,99,86,254,211,45,161,212,18,14,187,78], accounts[7], accounts[7], 4038714811, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+833, accounts[0], 95, 1532892062, accounts[6], 254, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([118,72,92,242,40,242,27,70,136,92,203,167,212,64,169,130,246,148,27,112,133,99,86,254,211,45,161,212,18,14,187,78], accounts[9], accounts[7], 0, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+833, accounts[0], 95, 1532892062, accounts[6], 254, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([118,72,92,242,40,242,27,70,136,92,203,167,212,64,169,130,246,148,27,112,133,99,86,254,211,45,161,212,18,14,187,78], accounts[9], accounts[7], 4038714811, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+833, accounts[0], 95, 1532892062, accounts[6], 254, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([118,72,92,242,40,242,27,70,136,92,203,167,212,64,169,130,246,148,27,112,133,99,86,254,211,45,161,212,18,14,187,78], accounts[9], accounts[7], 4038714811, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 95, 1532892062, accounts[6], 254, 65,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([34,4,155,227,166,193,201,115,74,24,53,106,195,68,128,34,87,185,246,21,175,208,227,73,177,105,179,198,245,176,36,209], accounts[0], accounts[7], 3, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+158, accounts[6], 254, 255, "0x0000000000000000000000000000000000000000", 5, 10,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([34,4,155,227,166,193,201,115,74,24,53,106,195,68,128,34,87,185,246,21,175,208,227,73,177,105,179,198,245,176,36,209], accounts[7], accounts[7], 3, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+158, accounts[6], 254, 255, "0x0000000000000000000000000000000000000000", 5, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([34,4,155,227,166,193,201,115,74,24,53,106,195,68,128,34,87,185,246,21,175,208,227,73,177,105,179,198,245,176,36,209], accounts[0], accounts[7], 0, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+158, accounts[6], 254, 255, "0x0000000000000000000000000000000000000000", 5, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([34,4,155,227,166,193,201,115,74,24,53,106,195,68,128,34,87,185,246,21,175,208,227,73,177,105,179,198,245,176,36,209], accounts[0], accounts[7], 3, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+158, accounts[6], 254, 255, "0x0000000000000000000000000000000000000000", 5, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([34,4,155,227,166,193,201,115,74,24,53,106,195,68,128,34,87,185,246,21,175,208,227,73,177,105,179,198,245,176,36,209], accounts[0], accounts[7], 3, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 254, 255, "0x0000000000000000000000000000000000000000", 5, 10,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await contractSwaps.createOrder([0,81,195,31,52,190,34,230,109,8,211,64,213,33,215,176,103,171,25,32,186,86,89,57,34,238,105,168,6,40,146,122], accounts[0], accounts[1], 2014223716, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+725, accounts[6], 97, 2014223715, accounts[0], 11, 1,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([0,81,195,31,52,190,34,230,109,8,211,64,213,33,215,176,103,171,25,32,186,86,89,57,34,238,105,168,6,40,146,122], accounts[1], accounts[1], 2014223716, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+725, accounts[6], 97, 2014223715, accounts[0], 11, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([0,81,195,31,52,190,34,230,109,8,211,64,213,33,215,176,103,171,25,32,186,86,89,57,34,238,105,168,6,40,146,122], accounts[0], accounts[1], 0, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+725, accounts[6], 97, 2014223715, accounts[0], 11, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([0,81,195,31,52,190,34,230,109,8,211,64,213,33,215,176,103,171,25,32,186,86,89,57,34,238,105,168,6,40,146,122], accounts[0], accounts[1], 2014223716, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+725, accounts[6], 97, 2014223715, accounts[0], 11, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([0,81,195,31,52,190,34,230,109,8,211,64,213,33,215,176,103,171,25,32,186,86,89,57,34,238,105,168,6,40,146,122], accounts[0], accounts[1], 2014223716, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 97, 2014223715, accounts[0], 11, 1,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([202,228,194,237,152,70,42,215,115,25,155,217,27,214,0,93,123,66,54,101,246,8,135,106,26,190,164,171,61,119,49,210], accounts[2], accounts[8], 1, 2014223716, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+50, accounts[7], 2014223716, 2, accounts[0], 64, 26,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([202,228,194,237,152,70,42,215,115,25,155,217,27,214,0,93,123,66,54,101,246,8,135,106,26,190,164,171,61,119,49,210], accounts[8], accounts[8], 1, 2014223716, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+50, accounts[7], 2014223716, 2, accounts[0], 64, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([202,228,194,237,152,70,42,215,115,25,155,217,27,214,0,93,123,66,54,101,246,8,135,106,26,190,164,171,61,119,49,210], accounts[2], accounts[8], 0, 2014223716, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+50, accounts[7], 2014223716, 2, accounts[0], 64, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([202,228,194,237,152,70,42,215,115,25,155,217,27,214,0,93,123,66,54,101,246,8,135,106,26,190,164,171,61,119,49,210], accounts[2], accounts[8], 1, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+50, accounts[7], 2014223716, 2, accounts[0], 64, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([202,228,194,237,152,70,42,215,115,25,155,217,27,214,0,93,123,66,54,101,246,8,135,106,26,190,164,171,61,119,49,210], accounts[2], accounts[8], 1, 2014223716, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 2014223716, 2, accounts[0], 64, 26,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([193,52,142,137,164,235,240,187,144,255,167,128,61,156,139,127,240,94,231,234,121,42,234,140,5,154,80,62,1,108,50,37], "0x0000000000000000000000000000000000000000", 257,{from: accounts[0],value:257});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([193,52,142,137,164,235,240,187,144,255,167,128,61,156,139,127,240,94,231,234,121,42,234,140,5,154,80,62,1,108,50,37], "0x0000000000000000000000000000000000000000", 258,{from: accounts[0],value:257}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([207,173,90,28,129,167,26,110,152,146,34,172,4,228,101,98,67,114,35,118,96,21,216,51,139,177,154,210,237,105,243,120], accounts[2], 255,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([190,30,204,92,209,62,7,23,140,197,197,185,232,42,177,183,20,106,40,85,72,29,197,145,61,87,179,94,21,158,10,7],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([102,79,179,129,53,175,171,206,252,224,188,8,203,177,203,206,139,196,209,1,254,170,157,30,54,121,173,116,227,189,77,218], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([141,219,251,215,241,19,166,91,148,82,145,153,155,104,132,115,97,168,174,33,50,185,155,169,101,91,161,225,204,106,111,117], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([201,63,39,201,18,170,228,208,243,140,97,29,244,205,245,198,118,36,141,143,174,155,251,11,114,236,163,187,97,188,21,32], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([183,234,143,238,51,57,18,226,110,188,109,35,141,84,158,248,63,182,37,1,7,87,46,157,52,179,231,56,76,137,51,16], accounts[4],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(1, 1,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1, 1,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[3],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[3],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([148,101,175,247,96,54,172,131,72,235,253,202,153,85,231,64,143,33,184,94,92,227,73,147,235,128,117,5,246,54,169,207],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([208,155,110,201,21,75,174,158,217,0,65,24,250,52,202,229,65,72,171,240,50,242,87,177,52,4,4,62,67,23,89,235],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([163,19,210,217,108,215,119,70,13,168,247,41,230,24,26,54,20,24,246,96,176,174,141,61,4,22,228,214,83,215,10,137],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([41,42,3,150,15,12,100,155,72,184,19,85,188,62,151,43,12,12,139,9,106,22,242,44,194,164,114,175,226,124,208,243],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([154,90,14,159,160,241,70,177,86,27,164,193,169,144,216,67,22,123,73,175,34,48,141,140,52,128,152,5,85,1,182,128],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([32,17,140,14,146,231,176,154,192,79,252,80,1,21,177,63,197,119,76,205,142,189,142,132,155,96,111,179,113,194,189,84],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([56,197,213,224,21,201,140,1,206,211,118,176,80,93,145,195,144,253,55,194,57,36,212,216,168,211,255,14,167,98,179,110],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([74,239,190,59,129,218,105,204,187,134,150,186,236,35,176,156,10,81,228,161,164,139,34,136,115,83,244,52,137,87,162,21],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([109,155,113,79,61,74,134,253,184,2,35,91,61,120,199,184,211,13,110,73,134,111,35,136,224,157,185,249,59,132,240,194],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([149,52,146,37,226,149,241,70,145,79,48,92,197,30,224,231,86,218,153,210,141,15,84,19,204,101,97,91,40,10,117,105],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([166,42,85,183,44,108,102,94,180,95,84,20,34,172,208,242,119,197,211,25,201,103,80,174,173,208,207,101,43,87,169,204], accounts[5],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([92,98,41,215,35,113,70,247,26,12,61,179,139,41,176,148,46,106,53,231,30,0,1,49,6,206,3,89,194,192,251,184], accounts[0],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([108,11,228,150,65,25,215,234,105,23,212,31,59,213,203,133,10,196,245,94,14,136,128,175,219,76,39,250,146,209,68,180],{from: accounts[0]});
  });
});
