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
    let result = await contractSwaps.tokenFallback(accounts[8], 4, [120,220,143,189,163,115,145,207,190,210,253,152,154,13,218,147,238,82,166,239,161,139,180,231,233,134,134,36,214,80,210,44],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([69,248,148,136,82,142,65,118,139,51,19,173,155,177,81,65,33,95,7,113,28,73,181,232,136,88,223,227,66,65,74,71], accounts[0], accounts[6], 1338, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1, accounts[5], 256, 26, accounts[7], 10, 3,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([69,248,148,136,82,142,65,118,139,51,19,173,155,177,81,65,33,95,7,113,28,73,181,232,136,88,223,227,66,65,74,71], accounts[6], accounts[6], 1338, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1, accounts[5], 256, 26, accounts[7], 10, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([69,248,148,136,82,142,65,118,139,51,19,173,155,177,81,65,33,95,7,113,28,73,181,232,136,88,223,227,66,65,74,71], accounts[0], accounts[6], 0, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1, accounts[5], 256, 26, accounts[7], 10, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([69,248,148,136,82,142,65,118,139,51,19,173,155,177,81,65,33,95,7,113,28,73,181,232,136,88,223,227,66,65,74,71], accounts[0], accounts[6], 1338, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1, accounts[5], 256, 26, accounts[7], 10, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([69,248,148,136,82,142,65,118,139,51,19,173,155,177,81,65,33,95,7,113,28,73,181,232,136,88,223,227,66,65,74,71], accounts[0], accounts[6], 1338, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 256, 26, accounts[7], 10, 3,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([8,146,137,218,61,33,31,116,215,153,27,93,47,139,134,56,186,144,33,2,89,82,21,86,208,46,225,194,150,126,4,6], accounts[2], accounts[9], 97, 9999, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+746, accounts[1], 27, 28, "0x0000000000000000000000000000000000000000", 2014223714, 1532892062,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([8,146,137,218,61,33,31,116,215,153,27,93,47,139,134,56,186,144,33,2,89,82,21,86,208,46,225,194,150,126,4,6], accounts[9], accounts[9], 97, 9999, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+746, accounts[1], 27, 28, "0x0000000000000000000000000000000000000000", 2014223714, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([8,146,137,218,61,33,31,116,215,153,27,93,47,139,134,56,186,144,33,2,89,82,21,86,208,46,225,194,150,126,4,6], accounts[2], accounts[9], 0, 9999, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+746, accounts[1], 27, 28, "0x0000000000000000000000000000000000000000", 2014223714, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([8,146,137,218,61,33,31,116,215,153,27,93,47,139,134,56,186,144,33,2,89,82,21,86,208,46,225,194,150,126,4,6], accounts[2], accounts[9], 97, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+746, accounts[1], 27, 28, "0x0000000000000000000000000000000000000000", 2014223714, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([8,146,137,218,61,33,31,116,215,153,27,93,47,139,134,56,186,144,33,2,89,82,21,86,208,46,225,194,150,126,4,6], accounts[2], accounts[9], 97, 9999, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 27, 28, "0x0000000000000000000000000000000000000000", 2014223714, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await contractSwaps.createOrder([190,109,36,24,87,155,28,179,90,195,100,175,67,41,227,49,249,29,97,156,171,0,190,29,238,221,126,172,3,18,71,195], accounts[7], accounts[4], 4038714809, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+232, accounts[4], 10, 2014223715, accounts[0], 64, 2014223714,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([190,109,36,24,87,155,28,179,90,195,100,175,67,41,227,49,249,29,97,156,171,0,190,29,238,221,126,172,3,18,71,195], accounts[4], accounts[4], 4038714809, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+232, accounts[4], 10, 2014223715, accounts[0], 64, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([190,109,36,24,87,155,28,179,90,195,100,175,67,41,227,49,249,29,97,156,171,0,190,29,238,221,126,172,3,18,71,195], accounts[7], accounts[4], 0, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+232, accounts[4], 10, 2014223715, accounts[0], 64, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([190,109,36,24,87,155,28,179,90,195,100,175,67,41,227,49,249,29,97,156,171,0,190,29,238,221,126,172,3,18,71,195], accounts[7], accounts[4], 4038714809, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+232, accounts[4], 10, 2014223715, accounts[0], 64, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([190,109,36,24,87,155,28,179,90,195,100,175,67,41,227,49,249,29,97,156,171,0,190,29,238,221,126,172,3,18,71,195], accounts[7], accounts[4], 4038714809, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[4], 10, 2014223715, accounts[0], 64, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([54,65,122,187,182,255,17,237,132,176,59,122,237,242,48,140,219,140,139,99,1,198,183,84,115,199,128,14,80,183,245,67], accounts[8], accounts[5], 4038714810, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+996, accounts[0], 4038714809, 9999, accounts[4], 9, 65,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([54,65,122,187,182,255,17,237,132,176,59,122,237,242,48,140,219,140,139,99,1,198,183,84,115,199,128,14,80,183,245,67], accounts[5], accounts[5], 4038714810, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+996, accounts[0], 4038714809, 9999, accounts[4], 9, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([54,65,122,187,182,255,17,237,132,176,59,122,237,242,48,140,219,140,139,99,1,198,183,84,115,199,128,14,80,183,245,67], accounts[8], accounts[5], 0, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+996, accounts[0], 4038714809, 9999, accounts[4], 9, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([54,65,122,187,182,255,17,237,132,176,59,122,237,242,48,140,219,140,139,99,1,198,183,84,115,199,128,14,80,183,245,67], accounts[8], accounts[5], 4038714810, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+996, accounts[0], 4038714809, 9999, accounts[4], 9, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([54,65,122,187,182,255,17,237,132,176,59,122,237,242,48,140,219,140,139,99,1,198,183,84,115,199,128,14,80,183,245,67], accounts[8], accounts[5], 4038714810, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 4038714809, 9999, accounts[4], 9, 65,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([119,236,107,218,48,178,38,40,14,48,7,159,229,46,182,245,170,45,243,219,50,108,38,165,5,41,98,210,104,33,62,239], "0x0000000000000000000000000000000000000000", 4038714810,{from: accounts[0],value:4038714810});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([119,236,107,218,48,178,38,40,14,48,7,159,229,46,182,245,170,45,243,219,50,108,38,165,5,41,98,210,104,33,62,239], "0x0000000000000000000000000000000000000000", 4038714811,{from: accounts[0],value:4038714810}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([2,223,217,81,171,145,70,32,220,227,179,228,72,235,253,223,176,6,4,223,255,222,24,188,88,112,103,102,201,14,223,179], accounts[6], 10001,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([255,225,33,157,220,253,62,180,17,111,175,195,21,76,242,205,142,55,97,78,31,21,126,92,135,151,128,233,196,179,106,207],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([15,198,115,227,42,122,12,70,239,73,36,255,192,195,60,152,133,139,121,176,151,10,172,28,101,134,127,34,155,143,205,128], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([62,53,59,95,179,138,18,253,65,50,56,123,31,179,205,24,244,225,30,22,145,220,203,53,204,65,156,84,82,135,93,136], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([119,165,225,112,48,194,239,167,192,75,199,146,235,139,77,154,247,254,166,27,186,14,178,219,86,31,10,65,190,88,228,143], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([237,54,221,64,239,101,3,195,171,149,195,61,105,79,212,70,22,163,178,195,7,184,232,158,84,229,79,9,149,8,193,67], accounts[0],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(3, 64,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(3, 64,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(3, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[1],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[5],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([24,133,217,41,12,164,52,216,133,144,136,77,162,224,105,24,7,239,91,76,92,225,103,127,136,221,217,184,102,79,14,226],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([233,158,197,201,2,10,78,226,99,10,22,200,144,144,66,41,0,28,189,130,44,223,23,122,83,54,213,122,57,76,101,154],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([86,168,221,126,31,21,118,131,167,31,146,235,21,9,177,176,195,39,17,68,254,217,90,175,64,66,201,83,51,58,253,143],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([132,234,200,17,108,161,202,220,178,166,43,211,16,160,109,177,222,102,230,11,134,10,239,57,6,72,195,196,183,59,18,110],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([9,188,73,20,1,232,219,241,81,59,138,155,63,149,195,159,63,52,215,190,43,248,193,193,11,92,41,85,28,82,53,49],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([187,72,249,6,72,182,177,246,39,134,84,63,174,243,187,213,5,55,58,31,173,104,116,8,25,29,46,114,70,171,98,171],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([97,157,97,165,145,241,125,69,49,119,252,141,57,71,131,158,43,94,218,211,52,91,70,40,90,170,173,114,255,19,1,200],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([253,70,243,171,9,112,209,97,50,236,64,5,167,0,139,204,151,41,77,12,233,99,3,239,246,239,63,48,17,145,19,5],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([61,102,74,164,41,111,6,49,80,168,111,202,17,8,234,73,139,199,205,8,224,158,165,114,74,142,132,22,229,58,103,139],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([86,18,61,213,185,178,35,47,15,176,199,217,18,169,94,108,89,236,115,140,46,168,9,51,181,0,124,57,133,248,83,84],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([51,191,240,75,194,47,40,92,198,101,115,76,189,129,228,243,16,137,230,157,64,70,211,43,193,81,141,112,45,131,27,58], accounts[5],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([187,102,19,109,167,0,24,67,216,178,191,68,157,163,16,180,170,66,120,214,23,239,186,235,0,226,132,79,149,119,110,227], accounts[6],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([38,60,11,44,112,195,204,30,149,31,89,213,179,94,66,60,240,167,166,209,128,118,33,26,143,190,150,7,131,160,119,5],{from: accounts[0]});
  });
});
