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
    let result = await contractSwaps.tokenFallback(accounts[2], 4, [58,236,86,102,192,14,151,13,15,79,173,172,129,202,48,100,120,131,99,172,80,86,109,141,252,28,65,237,92,46,33,64],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([163,115,10,97,229,11,27,84,42,230,123,149,30,243,102,163,47,12,229,0,228,125,229,60,81,159,185,158,29,198,111,39], accounts[5], accounts[9], 1338, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+859, accounts[7], 3, 27, accounts[6], 1532892062, 1532892063,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([163,115,10,97,229,11,27,84,42,230,123,149,30,243,102,163,47,12,229,0,228,125,229,60,81,159,185,158,29,198,111,39], accounts[9], accounts[9], 1338, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+859, accounts[7], 3, 27, accounts[6], 1532892062, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([163,115,10,97,229,11,27,84,42,230,123,149,30,243,102,163,47,12,229,0,228,125,229,60,81,159,185,158,29,198,111,39], accounts[5], accounts[9], 0, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+859, accounts[7], 3, 27, accounts[6], 1532892062, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([163,115,10,97,229,11,27,84,42,230,123,149,30,243,102,163,47,12,229,0,228,125,229,60,81,159,185,158,29,198,111,39], accounts[5], accounts[9], 1338, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+859, accounts[7], 3, 27, accounts[6], 1532892062, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([163,115,10,97,229,11,27,84,42,230,123,149,30,243,102,163,47,12,229,0,228,125,229,60,81,159,185,158,29,198,111,39], accounts[5], accounts[9], 1338, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 3, 27, accounts[6], 1532892062, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([142,142,191,244,60,252,71,82,174,137,63,39,105,205,157,65,248,151,87,156,208,16,249,46,210,147,31,254,9,183,247,187], accounts[5], accounts[7], 1336, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+739, accounts[9], 66, 2014223715, "0x0000000000000000000000000000000000000000", 96, 9,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([142,142,191,244,60,252,71,82,174,137,63,39,105,205,157,65,248,151,87,156,208,16,249,46,210,147,31,254,9,183,247,187], accounts[7], accounts[7], 1336, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+739, accounts[9], 66, 2014223715, "0x0000000000000000000000000000000000000000", 96, 9,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([142,142,191,244,60,252,71,82,174,137,63,39,105,205,157,65,248,151,87,156,208,16,249,46,210,147,31,254,9,183,247,187], accounts[5], accounts[7], 0, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+739, accounts[9], 66, 2014223715, "0x0000000000000000000000000000000000000000", 96, 9,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([142,142,191,244,60,252,71,82,174,137,63,39,105,205,157,65,248,151,87,156,208,16,249,46,210,147,31,254,9,183,247,187], accounts[5], accounts[7], 1336, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+739, accounts[9], 66, 2014223715, "0x0000000000000000000000000000000000000000", 96, 9,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([142,142,191,244,60,252,71,82,174,137,63,39,105,205,157,65,248,151,87,156,208,16,249,46,210,147,31,254,9,183,247,187], accounts[5], accounts[7], 1336, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 66, 2014223715, "0x0000000000000000000000000000000000000000", 96, 9,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await contractSwaps.createOrder([184,191,49,221,150,247,112,124,249,51,230,71,50,93,217,81,48,209,66,7,52,226,112,126,201,242,67,207,6,137,89,122], accounts[7], accounts[3], 2, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+127, accounts[7], 97, 5, accounts[4], 10001, 3,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([184,191,49,221,150,247,112,124,249,51,230,71,50,93,217,81,48,209,66,7,52,226,112,126,201,242,67,207,6,137,89,122], accounts[3], accounts[3], 2, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+127, accounts[7], 97, 5, accounts[4], 10001, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([184,191,49,221,150,247,112,124,249,51,230,71,50,93,217,81,48,209,66,7,52,226,112,126,201,242,67,207,6,137,89,122], accounts[7], accounts[3], 0, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+127, accounts[7], 97, 5, accounts[4], 10001, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([184,191,49,221,150,247,112,124,249,51,230,71,50,93,217,81,48,209,66,7,52,226,112,126,201,242,67,207,6,137,89,122], accounts[7], accounts[3], 2, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+127, accounts[7], 97, 5, accounts[4], 10001, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([184,191,49,221,150,247,112,124,249,51,230,71,50,93,217,81,48,209,66,7,52,226,112,126,201,242,67,207,6,137,89,122], accounts[7], accounts[3], 2, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 97, 5, accounts[4], 10001, 3,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([210,142,184,46,73,19,88,85,97,31,97,221,103,10,86,92,51,123,38,140,136,29,14,138,33,206,140,164,145,128,83,32], accounts[7], accounts[8], 29, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+327, accounts[7], 1, 4038714811, accounts[5], 1532892063, 1338,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([210,142,184,46,73,19,88,85,97,31,97,221,103,10,86,92,51,123,38,140,136,29,14,138,33,206,140,164,145,128,83,32], accounts[8], accounts[8], 29, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+327, accounts[7], 1, 4038714811, accounts[5], 1532892063, 1338,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([210,142,184,46,73,19,88,85,97,31,97,221,103,10,86,92,51,123,38,140,136,29,14,138,33,206,140,164,145,128,83,32], accounts[7], accounts[8], 0, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+327, accounts[7], 1, 4038714811, accounts[5], 1532892063, 1338,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([210,142,184,46,73,19,88,85,97,31,97,221,103,10,86,92,51,123,38,140,136,29,14,138,33,206,140,164,145,128,83,32], accounts[7], accounts[8], 29, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+327, accounts[7], 1, 4038714811, accounts[5], 1532892063, 1338,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([210,142,184,46,73,19,88,85,97,31,97,221,103,10,86,92,51,123,38,140,136,29,14,138,33,206,140,164,145,128,83,32], accounts[7], accounts[8], 29, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 1, 4038714811, accounts[5], 1532892063, 1338,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([16,162,27,249,58,98,143,0,22,4,181,98,153,223,222,185,184,42,182,19,171,91,113,236,77,104,196,71,172,151,127,8], "0x0000000000000000000000000000000000000000", 256,{from: accounts[0],value:256});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([16,162,27,249,58,98,143,0,22,4,181,98,153,223,222,185,184,42,182,19,171,91,113,236,77,104,196,71,172,151,127,8], "0x0000000000000000000000000000000000000000", 257,{from: accounts[0],value:256}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([115,85,142,31,151,133,42,167,154,140,199,147,99,41,91,180,179,68,114,222,203,100,222,62,108,254,196,81,51,104,209,9], accounts[6], 28,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([93,106,113,0,53,145,119,116,81,185,90,170,1,240,101,189,249,45,30,13,81,87,177,182,19,179,241,10,194,188,107,22],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([195,152,11,229,218,17,228,17,92,244,115,147,134,246,66,71,85,124,217,60,25,143,38,90,164,198,235,245,15,66,111,19], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([98,147,245,238,210,98,120,168,176,111,183,60,196,235,166,241,208,206,27,179,228,25,36,124,238,90,148,197,193,25,201,196], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([165,26,77,83,79,13,3,212,42,62,98,133,185,109,119,145,194,65,205,42,136,116,155,174,229,248,225,52,173,245,43,75], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([58,201,125,198,68,237,219,252,21,186,204,70,219,208,86,162,175,11,53,35,235,216,2,106,202,116,58,248,230,200,225,189], accounts[4],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(1336, 95,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1336, 95,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1336, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[2],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[1],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([54,162,10,84,231,16,242,191,157,103,84,64,241,44,166,227,148,101,237,172,211,145,161,241,14,142,141,28,94,33,107,234],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([15,209,219,222,131,239,209,151,28,72,99,129,194,46,159,120,119,89,139,159,5,196,171,99,74,144,209,202,148,109,132,48],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([249,0,10,17,114,130,101,171,17,139,136,45,66,209,251,128,20,248,85,179,167,157,90,44,194,96,72,168,77,75,90,250],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([198,225,54,12,91,133,223,0,32,253,223,229,131,12,181,96,94,90,56,41,180,89,157,2,14,184,125,215,101,65,103,78],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([150,149,174,158,66,53,115,196,206,160,75,190,104,23,229,25,120,41,227,18,156,193,163,51,26,249,246,20,91,218,168,6],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([105,109,51,175,148,87,160,227,14,209,193,232,170,82,20,88,159,138,107,64,195,33,50,91,241,229,65,104,35,90,234,87],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([78,88,192,63,6,251,115,244,127,78,24,41,14,178,97,116,140,216,112,71,235,70,0,83,137,82,234,80,44,204,130,202],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([78,202,122,133,21,230,255,248,105,46,197,73,71,221,247,47,38,57,173,114,29,178,236,225,173,247,211,17,38,219,204,176],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([226,247,23,206,199,42,230,36,60,218,240,35,252,245,147,64,54,152,15,7,2,27,199,88,27,188,164,183,114,65,63,30],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([183,122,3,54,151,107,202,108,126,247,40,133,92,234,105,15,241,23,100,25,159,90,170,104,147,38,197,211,68,133,213,114],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([148,135,237,10,59,239,37,80,255,134,180,141,158,58,90,209,149,221,2,231,150,208,178,30,224,54,143,220,23,53,248,108], accounts[1],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([244,83,51,81,217,248,239,133,33,143,96,62,239,18,2,1,63,42,112,86,238,27,189,168,88,136,206,138,10,139,47,14], accounts[5],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([247,192,206,74,91,187,65,145,249,1,127,82,171,122,147,222,135,77,248,0,111,123,148,174,74,50,53,81,14,130,155,137],{from: accounts[0]});
  });
});
