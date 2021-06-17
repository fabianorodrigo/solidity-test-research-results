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
    let result = await contractSwaps.tokenFallback(accounts[3], 65, [109,245,132,217,121,133,233,117,34,251,132,85,181,197,62,10,223,106,92,129,223,140,134,137,255,51,121,102,111,216,10,41],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([170,91,114,75,24,52,232,121,166,110,66,220,239,68,10,22,81,109,183,52,135,189,183,169,167,68,204,237,241,38,133,156], accounts[1], accounts[7], 2014223715, 2014223715, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+799, accounts[1], 96, 10001, accounts[8], 4038714810, 95,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([170,91,114,75,24,52,232,121,166,110,66,220,239,68,10,22,81,109,183,52,135,189,183,169,167,68,204,237,241,38,133,156], accounts[7], accounts[7], 2014223715, 2014223715, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+799, accounts[1], 96, 10001, accounts[8], 4038714810, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([170,91,114,75,24,52,232,121,166,110,66,220,239,68,10,22,81,109,183,52,135,189,183,169,167,68,204,237,241,38,133,156], accounts[1], accounts[7], 0, 2014223715, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+799, accounts[1], 96, 10001, accounts[8], 4038714810, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([170,91,114,75,24,52,232,121,166,110,66,220,239,68,10,22,81,109,183,52,135,189,183,169,167,68,204,237,241,38,133,156], accounts[1], accounts[7], 2014223715, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+799, accounts[1], 96, 10001, accounts[8], 4038714810, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([170,91,114,75,24,52,232,121,166,110,66,220,239,68,10,22,81,109,183,52,135,189,183,169,167,68,204,237,241,38,133,156], accounts[1], accounts[7], 2014223715, 2014223715, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 96, 10001, accounts[8], 4038714810, 95,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([201,51,3,171,178,254,174,127,191,7,27,118,204,135,175,66,216,72,41,26,187,239,138,32,31,176,38,189,50,197,192,113], accounts[7], accounts[3], 5, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+633, accounts[1], 2, 28, "0x0000000000000000000000000000000000000000", 1338, 1336,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([201,51,3,171,178,254,174,127,191,7,27,118,204,135,175,66,216,72,41,26,187,239,138,32,31,176,38,189,50,197,192,113], accounts[3], accounts[3], 5, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+633, accounts[1], 2, 28, "0x0000000000000000000000000000000000000000", 1338, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([201,51,3,171,178,254,174,127,191,7,27,118,204,135,175,66,216,72,41,26,187,239,138,32,31,176,38,189,50,197,192,113], accounts[7], accounts[3], 0, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+633, accounts[1], 2, 28, "0x0000000000000000000000000000000000000000", 1338, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([201,51,3,171,178,254,174,127,191,7,27,118,204,135,175,66,216,72,41,26,187,239,138,32,31,176,38,189,50,197,192,113], accounts[7], accounts[3], 5, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+633, accounts[1], 2, 28, "0x0000000000000000000000000000000000000000", 1338, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([201,51,3,171,178,254,174,127,191,7,27,118,204,135,175,66,216,72,41,26,187,239,138,32,31,176,38,189,50,197,192,113], accounts[7], accounts[3], 5, 26, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 2, 28, "0x0000000000000000000000000000000000000000", 1338, 1336,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await contractSwaps.createOrder([148,162,127,61,23,153,53,250,101,120,38,76,207,87,14,196,217,209,155,103,139,176,63,207,36,227,87,98,197,116,165,14], accounts[6], accounts[3], 4, 257, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+917, accounts[7], 255, 28, accounts[3], 97, 97,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([148,162,127,61,23,153,53,250,101,120,38,76,207,87,14,196,217,209,155,103,139,176,63,207,36,227,87,98,197,116,165,14], accounts[3], accounts[3], 4, 257, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+917, accounts[7], 255, 28, accounts[3], 97, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([148,162,127,61,23,153,53,250,101,120,38,76,207,87,14,196,217,209,155,103,139,176,63,207,36,227,87,98,197,116,165,14], accounts[6], accounts[3], 0, 257, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+917, accounts[7], 255, 28, accounts[3], 97, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([148,162,127,61,23,153,53,250,101,120,38,76,207,87,14,196,217,209,155,103,139,176,63,207,36,227,87,98,197,116,165,14], accounts[6], accounts[3], 4, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+917, accounts[7], 255, 28, accounts[3], 97, 97,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([148,162,127,61,23,153,53,250,101,120,38,76,207,87,14,196,217,209,155,103,139,176,63,207,36,227,87,98,197,116,165,14], accounts[6], accounts[3], 4, 257, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 255, 28, accounts[3], 97, 97,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([22,151,166,25,150,117,19,54,14,21,53,80,117,59,157,104,151,124,60,245,231,79,96,195,46,156,93,65,56,220,216,154], accounts[1], accounts[8], 65, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+997, accounts[4], 65, 1532892063, accounts[0], 10001, 1336,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,151,166,25,150,117,19,54,14,21,53,80,117,59,157,104,151,124,60,245,231,79,96,195,46,156,93,65,56,220,216,154], accounts[8], accounts[8], 65, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+997, accounts[4], 65, 1532892063, accounts[0], 10001, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,151,166,25,150,117,19,54,14,21,53,80,117,59,157,104,151,124,60,245,231,79,96,195,46,156,93,65,56,220,216,154], accounts[1], accounts[8], 0, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+997, accounts[4], 65, 1532892063, accounts[0], 10001, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,151,166,25,150,117,19,54,14,21,53,80,117,59,157,104,151,124,60,245,231,79,96,195,46,156,93,65,56,220,216,154], accounts[1], accounts[8], 65, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+997, accounts[4], 65, 1532892063, accounts[0], 10001, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,151,166,25,150,117,19,54,14,21,53,80,117,59,157,104,151,124,60,245,231,79,96,195,46,156,93,65,56,220,216,154], accounts[1], accounts[8], 65, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[4], 65, 1532892063, accounts[0], 10001, 1336,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([110,187,110,17,20,28,174,113,195,116,86,100,253,6,2,155,125,233,126,78,108,164,37,136,223,154,125,54,143,171,236,23], "0x0000000000000000000000000000000000000000", 1,{from: accounts[0],value:1});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([110,187,110,17,20,28,174,113,195,116,86,100,253,6,2,155,125,233,126,78,108,164,37,136,223,154,125,54,143,171,236,23], "0x0000000000000000000000000000000000000000", 2,{from: accounts[0],value:1}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([217,218,78,1,49,87,77,132,143,66,48,168,194,36,55,23,254,152,242,14,49,76,162,44,174,245,70,112,32,28,20,95], accounts[9], 10001,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([52,188,181,179,228,77,130,58,83,87,131,239,200,171,73,67,250,179,232,0,176,121,96,129,84,153,229,98,0,1,141,146],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([42,241,10,191,88,42,253,159,106,160,209,216,81,100,214,194,168,204,171,214,146,253,237,30,200,9,109,238,16,195,183,104], accounts[5],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([241,132,170,125,214,183,172,18,222,118,18,53,147,161,239,249,198,202,216,116,121,130,111,181,108,14,197,164,191,162,189,143], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([42,130,86,4,2,193,113,49,106,147,54,34,116,149,59,25,173,215,166,204,110,157,50,117,164,49,214,54,71,21,132,195], accounts[9],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([193,180,22,85,155,111,80,73,112,64,199,78,148,163,226,199,246,239,11,29,229,38,98,119,46,17,194,190,55,130,206,6], accounts[1],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(64, 1338,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(64, 1338,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 1338,{from: accounts[0]}),'revert');
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
    let result = await contractSwaps.createKey(accounts[8],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([129,102,84,90,194,14,34,54,73,154,226,162,93,68,110,89,233,199,233,9,16,41,74,19,41,251,78,186,195,103,53,206],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([214,85,136,21,34,99,242,240,131,35,162,116,67,46,4,236,179,99,220,127,11,194,82,5,27,202,161,131,184,196,244,37],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([97,200,22,70,198,184,82,123,182,74,56,179,218,135,9,119,107,84,62,232,103,100,78,1,96,51,141,26,70,18,124,173],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([178,18,173,137,49,246,253,47,77,49,106,24,4,149,44,48,74,43,69,194,101,21,33,112,246,223,180,63,88,26,30,111],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([82,224,46,116,154,113,81,210,43,116,233,96,23,202,131,82,178,164,145,159,82,42,49,134,73,143,79,211,20,155,224,47],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([49,128,89,116,6,136,46,104,84,108,155,253,234,224,101,248,195,10,187,21,161,87,227,189,198,50,12,91,225,19,103,246],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([104,235,143,204,17,106,5,248,186,221,223,204,167,245,91,117,122,93,92,10,201,139,202,87,106,132,122,75,41,225,114,229],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([47,37,247,154,126,4,51,38,86,235,191,46,113,61,27,33,228,193,208,28,82,153,252,214,14,182,6,205,17,101,56,6],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([208,178,205,181,47,14,129,132,92,1,170,70,209,208,175,190,125,226,4,32,194,252,188,68,127,246,70,246,83,37,238,21],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([170,251,114,172,109,250,73,94,47,185,155,112,112,140,87,64,220,98,182,78,96,14,74,105,90,119,83,137,254,180,14,89],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([166,55,139,135,108,63,232,116,112,19,127,6,174,82,43,52,133,101,17,156,206,18,48,28,160,106,137,20,56,184,250,245], accounts[8],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([111,37,57,213,237,39,229,93,250,172,219,230,61,31,208,229,31,61,80,216,23,227,213,196,207,21,73,142,137,102,107,183], accounts[9],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([60,125,189,52,81,75,93,28,236,220,128,245,83,68,149,140,167,211,70,122,155,208,51,84,218,190,112,89,178,253,194,52],{from: accounts[0]});
  });
});
