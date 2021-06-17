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
    let result = await contractSwaps.tokenFallback(accounts[3], 4038714810, [64,8,244,234,146,41,109,7,3,51,40,172,147,53,160,3,23,191,252,159,20,237,158,30,28,60,234,35,88,232,247,154],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([218,4,216,181,221,7,17,181,219,176,166,182,49,139,233,36,162,99,118,95,126,146,215,249,165,185,147,223,37,9,231,193], accounts[0], accounts[2], 9999, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+226, accounts[7], 10001, 11, accounts[1], 1337, 96,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([218,4,216,181,221,7,17,181,219,176,166,182,49,139,233,36,162,99,118,95,126,146,215,249,165,185,147,223,37,9,231,193], accounts[2], accounts[2], 9999, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+226, accounts[7], 10001, 11, accounts[1], 1337, 96,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([218,4,216,181,221,7,17,181,219,176,166,182,49,139,233,36,162,99,118,95,126,146,215,249,165,185,147,223,37,9,231,193], accounts[0], accounts[2], 0, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+226, accounts[7], 10001, 11, accounts[1], 1337, 96,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([218,4,216,181,221,7,17,181,219,176,166,182,49,139,233,36,162,99,118,95,126,146,215,249,165,185,147,223,37,9,231,193], accounts[0], accounts[2], 9999, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+226, accounts[7], 10001, 11, accounts[1], 1337, 96,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([218,4,216,181,221,7,17,181,219,176,166,182,49,139,233,36,162,99,118,95,126,146,215,249,165,185,147,223,37,9,231,193], accounts[0], accounts[2], 9999, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 10001, 11, accounts[1], 1337, 96,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([119,35,183,83,158,61,149,58,40,192,215,152,47,189,107,211,57,235,230,214,32,32,128,34,207,247,157,53,126,61,4,166], accounts[9], accounts[3], 1532892063, 95, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+78, accounts[7], 64, 1532892063, "0x0000000000000000000000000000000000000000", 28, 64,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([119,35,183,83,158,61,149,58,40,192,215,152,47,189,107,211,57,235,230,214,32,32,128,34,207,247,157,53,126,61,4,166], accounts[3], accounts[3], 1532892063, 95, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+78, accounts[7], 64, 1532892063, "0x0000000000000000000000000000000000000000", 28, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([119,35,183,83,158,61,149,58,40,192,215,152,47,189,107,211,57,235,230,214,32,32,128,34,207,247,157,53,126,61,4,166], accounts[9], accounts[3], 0, 95, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+78, accounts[7], 64, 1532892063, "0x0000000000000000000000000000000000000000", 28, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([119,35,183,83,158,61,149,58,40,192,215,152,47,189,107,211,57,235,230,214,32,32,128,34,207,247,157,53,126,61,4,166], accounts[9], accounts[3], 1532892063, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+78, accounts[7], 64, 1532892063, "0x0000000000000000000000000000000000000000", 28, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([119,35,183,83,158,61,149,58,40,192,215,152,47,189,107,211,57,235,230,214,32,32,128,34,207,247,157,53,126,61,4,166], accounts[9], accounts[3], 1532892063, 95, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 64, 1532892063, "0x0000000000000000000000000000000000000000", 28, 64,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await contractSwaps.createOrder([9,30,127,112,218,32,202,246,234,241,136,114,200,51,169,58,152,210,4,80,141,24,56,75,233,50,110,150,97,12,91,187], accounts[8], accounts[7], 6, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+847, accounts[2], 254, 2014223715, accounts[2], 255, 10,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([9,30,127,112,218,32,202,246,234,241,136,114,200,51,169,58,152,210,4,80,141,24,56,75,233,50,110,150,97,12,91,187], accounts[7], accounts[7], 6, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+847, accounts[2], 254, 2014223715, accounts[2], 255, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([9,30,127,112,218,32,202,246,234,241,136,114,200,51,169,58,152,210,4,80,141,24,56,75,233,50,110,150,97,12,91,187], accounts[8], accounts[7], 0, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+847, accounts[2], 254, 2014223715, accounts[2], 255, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([9,30,127,112,218,32,202,246,234,241,136,114,200,51,169,58,152,210,4,80,141,24,56,75,233,50,110,150,97,12,91,187], accounts[8], accounts[7], 6, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+847, accounts[2], 254, 2014223715, accounts[2], 255, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([9,30,127,112,218,32,202,246,234,241,136,114,200,51,169,58,152,210,4,80,141,24,56,75,233,50,110,150,97,12,91,187], accounts[8], accounts[7], 6, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 254, 2014223715, accounts[2], 255, 10,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([226,250,224,78,33,25,42,128,90,11,59,159,106,153,48,176,51,74,29,148,50,183,24,246,132,43,138,113,229,163,101,160], accounts[3], accounts[0], 97, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+778, accounts[2], 97, 28, accounts[6], 1338, 64,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([226,250,224,78,33,25,42,128,90,11,59,159,106,153,48,176,51,74,29,148,50,183,24,246,132,43,138,113,229,163,101,160], accounts[0], accounts[0], 97, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+778, accounts[2], 97, 28, accounts[6], 1338, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([226,250,224,78,33,25,42,128,90,11,59,159,106,153,48,176,51,74,29,148,50,183,24,246,132,43,138,113,229,163,101,160], accounts[3], accounts[0], 0, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+778, accounts[2], 97, 28, accounts[6], 1338, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([226,250,224,78,33,25,42,128,90,11,59,159,106,153,48,176,51,74,29,148,50,183,24,246,132,43,138,113,229,163,101,160], accounts[3], accounts[0], 97, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+778, accounts[2], 97, 28, accounts[6], 1338, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([226,250,224,78,33,25,42,128,90,11,59,159,106,153,48,176,51,74,29,148,50,183,24,246,132,43,138,113,229,163,101,160], accounts[3], accounts[0], 97, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 97, 28, accounts[6], 1338, 64,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([194,228,169,44,255,188,128,136,187,157,51,4,201,165,168,181,229,106,239,87,193,138,83,40,1,213,30,134,238,223,199,50], "0x0000000000000000000000000000000000000000", 1532892064,{from: accounts[0],value:1532892064});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([194,228,169,44,255,188,128,136,187,157,51,4,201,165,168,181,229,106,239,87,193,138,83,40,1,213,30,134,238,223,199,50], "0x0000000000000000000000000000000000000000", 1532892065,{from: accounts[0],value:1532892064}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([134,16,141,28,9,247,205,42,121,124,144,26,186,11,201,45,110,2,231,113,105,123,230,55,138,41,37,227,235,205,149,228], accounts[3], 2014223716,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([219,112,112,90,106,171,31,29,77,45,11,221,124,196,58,62,56,82,63,100,151,131,77,69,134,238,2,120,191,167,23,191],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([16,247,215,63,189,206,34,68,188,245,204,16,101,232,67,154,225,123,150,71,236,18,115,72,122,199,246,130,147,222,171,220], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([186,50,226,132,60,2,7,0,83,151,186,115,179,171,122,64,66,21,101,84,161,245,247,157,251,184,64,244,218,81,241,22], accounts[3],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([242,133,103,95,101,93,247,7,236,238,51,36,11,47,175,19,69,201,177,97,98,176,177,154,97,210,67,53,31,110,74,79], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([72,23,129,203,59,134,169,115,247,18,178,48,227,130,148,102,109,139,65,215,222,163,242,97,88,107,26,162,74,203,3,254], accounts[5],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(65, 6,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(65, 6,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(65, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[8],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[5],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([121,138,11,202,37,81,232,2,171,99,149,193,172,28,62,177,213,206,148,138,104,31,19,60,150,11,241,44,205,224,150,239],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([31,233,117,60,126,63,177,100,199,41,214,67,62,34,25,64,186,237,199,241,160,113,109,92,70,86,221,139,111,46,94,150],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([156,33,48,94,193,35,132,110,104,37,131,18,169,201,231,162,158,225,87,147,150,190,249,11,209,16,191,144,247,20,246,61],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([4,137,102,195,86,247,135,37,207,44,251,106,93,149,85,232,75,88,188,121,212,163,42,24,90,110,106,96,49,96,142,55],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([111,204,186,93,16,157,198,33,249,82,94,236,97,147,140,82,136,223,56,21,68,161,2,251,222,63,4,139,152,105,15,162],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([168,147,132,122,251,99,4,225,98,203,18,204,43,121,140,251,84,212,22,234,8,113,128,172,115,47,59,143,147,163,88,197],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([131,109,218,163,41,90,1,51,197,72,230,245,58,41,24,143,140,64,153,185,156,48,146,214,170,127,5,87,169,194,95,132],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([89,207,45,238,149,70,212,194,24,234,132,72,76,75,243,118,80,8,65,158,4,1,84,215,169,98,159,193,170,112,241,130],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([46,114,26,255,192,61,58,224,192,27,89,67,245,194,38,40,43,167,103,124,14,196,210,130,105,49,57,146,160,215,238,192],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([56,38,94,135,101,137,121,82,175,237,173,10,197,239,98,208,58,86,238,242,181,151,236,7,217,11,177,248,85,110,196,152],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([191,170,46,234,149,10,194,144,242,170,231,58,136,203,235,25,79,88,57,126,160,127,121,99,140,203,188,148,141,190,12,197], accounts[5],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([178,62,254,255,111,230,115,152,13,198,201,98,96,144,38,11,86,12,32,118,214,117,131,188,25,163,124,165,244,11,193,130], accounts[6],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([93,12,49,160,66,209,6,87,79,197,86,220,89,212,202,178,200,218,24,201,197,233,133,178,237,159,102,184,200,112,232,48],{from: accounts[0]});
  });
});
