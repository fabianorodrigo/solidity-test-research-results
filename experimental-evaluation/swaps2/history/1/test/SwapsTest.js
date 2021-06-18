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
    let result = await contractSwaps.tokenFallback(accounts[2], 1532892063, [125,174,87,149,190,231,203,154,141,167,163,24,68,89,223,137,75,197,53,91,180,222,208,10,17,156,7,226,82,167,123,65],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([26,212,250,194,164,235,231,214,61,115,41,129,187,60,94,135,201,29,156,83,175,238,38,88,191,147,100,15,255,71,168,118], accounts[8], accounts[4], 4038714811, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+242, accounts[8], 27, 4038714810, accounts[0], 65, 1532892063,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,212,250,194,164,235,231,214,61,115,41,129,187,60,94,135,201,29,156,83,175,238,38,88,191,147,100,15,255,71,168,118], accounts[4], accounts[4], 4038714811, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+242, accounts[8], 27, 4038714810, accounts[0], 65, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,212,250,194,164,235,231,214,61,115,41,129,187,60,94,135,201,29,156,83,175,238,38,88,191,147,100,15,255,71,168,118], accounts[8], accounts[4], 0, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+242, accounts[8], 27, 4038714810, accounts[0], 65, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,212,250,194,164,235,231,214,61,115,41,129,187,60,94,135,201,29,156,83,175,238,38,88,191,147,100,15,255,71,168,118], accounts[8], accounts[4], 4038714811, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+242, accounts[8], 27, 4038714810, accounts[0], 65, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,212,250,194,164,235,231,214,61,115,41,129,187,60,94,135,201,29,156,83,175,238,38,88,191,147,100,15,255,71,168,118], accounts[8], accounts[4], 4038714811, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 27, 4038714810, accounts[0], 65, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([172,129,136,124,63,91,167,157,20,166,47,156,144,235,119,188,69,145,46,181,66,202,108,226,157,53,60,126,211,237,239,229], accounts[0], accounts[1], 96, 96, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+632, accounts[5], 2014223714, 257, "0x0000000000000000000000000000000000000000", 4038714810, 4,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([172,129,136,124,63,91,167,157,20,166,47,156,144,235,119,188,69,145,46,181,66,202,108,226,157,53,60,126,211,237,239,229], accounts[1], accounts[1], 96, 96, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+632, accounts[5], 2014223714, 257, "0x0000000000000000000000000000000000000000", 4038714810, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([172,129,136,124,63,91,167,157,20,166,47,156,144,235,119,188,69,145,46,181,66,202,108,226,157,53,60,126,211,237,239,229], accounts[0], accounts[1], 0, 96, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+632, accounts[5], 2014223714, 257, "0x0000000000000000000000000000000000000000", 4038714810, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([172,129,136,124,63,91,167,157,20,166,47,156,144,235,119,188,69,145,46,181,66,202,108,226,157,53,60,126,211,237,239,229], accounts[0], accounts[1], 96, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+632, accounts[5], 2014223714, 257, "0x0000000000000000000000000000000000000000", 4038714810, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([172,129,136,124,63,91,167,157,20,166,47,156,144,235,119,188,69,145,46,181,66,202,108,226,157,53,60,126,211,237,239,229], accounts[0], accounts[1], 96, 96, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 2014223714, 257, "0x0000000000000000000000000000000000000000", 4038714810, 4,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await contractSwaps.createOrder([26,34,82,95,111,167,173,90,201,197,178,5,119,135,231,55,48,248,147,216,154,112,35,159,213,116,215,10,162,64,184,213], accounts[5], accounts[0], 2014223714, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+418, accounts[0], 65, 255, accounts[2], 65, 66,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,34,82,95,111,167,173,90,201,197,178,5,119,135,231,55,48,248,147,216,154,112,35,159,213,116,215,10,162,64,184,213], accounts[0], accounts[0], 2014223714, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+418, accounts[0], 65, 255, accounts[2], 65, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,34,82,95,111,167,173,90,201,197,178,5,119,135,231,55,48,248,147,216,154,112,35,159,213,116,215,10,162,64,184,213], accounts[5], accounts[0], 0, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+418, accounts[0], 65, 255, accounts[2], 65, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,34,82,95,111,167,173,90,201,197,178,5,119,135,231,55,48,248,147,216,154,112,35,159,213,116,215,10,162,64,184,213], accounts[5], accounts[0], 2014223714, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+418, accounts[0], 65, 255, accounts[2], 65, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,34,82,95,111,167,173,90,201,197,178,5,119,135,231,55,48,248,147,216,154,112,35,159,213,116,215,10,162,64,184,213], accounts[5], accounts[0], 2014223714, 4038714811, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 65, 255, accounts[2], 65, 66,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([54,254,77,169,202,73,38,130,116,8,104,4,102,106,15,133,61,26,112,74,145,45,220,76,150,29,129,225,29,217,121,98], accounts[7], accounts[9], 1338, 11, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+482, accounts[1], 9, 3, accounts[8], 4038714810, 27,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([54,254,77,169,202,73,38,130,116,8,104,4,102,106,15,133,61,26,112,74,145,45,220,76,150,29,129,225,29,217,121,98], accounts[9], accounts[9], 1338, 11, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+482, accounts[1], 9, 3, accounts[8], 4038714810, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([54,254,77,169,202,73,38,130,116,8,104,4,102,106,15,133,61,26,112,74,145,45,220,76,150,29,129,225,29,217,121,98], accounts[7], accounts[9], 0, 11, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+482, accounts[1], 9, 3, accounts[8], 4038714810, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([54,254,77,169,202,73,38,130,116,8,104,4,102,106,15,133,61,26,112,74,145,45,220,76,150,29,129,225,29,217,121,98], accounts[7], accounts[9], 1338, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+482, accounts[1], 9, 3, accounts[8], 4038714810, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([54,254,77,169,202,73,38,130,116,8,104,4,102,106,15,133,61,26,112,74,145,45,220,76,150,29,129,225,29,217,121,98], accounts[7], accounts[9], 1338, 11, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 9, 3, accounts[8], 4038714810, 27,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([138,187,69,137,108,221,211,220,170,180,85,111,235,220,31,154,132,165,164,52,23,131,116,246,128,245,54,34,229,25,94,195], "0x0000000000000000000000000000000000000000", 65,{from: accounts[0],value:65});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([138,187,69,137,108,221,211,220,170,180,85,111,235,220,31,154,132,165,164,52,23,131,116,246,128,245,54,34,229,25,94,195], "0x0000000000000000000000000000000000000000", 66,{from: accounts[0],value:65}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([204,91,18,85,1,58,188,230,138,202,165,102,147,104,139,87,175,170,243,239,237,167,169,167,233,69,59,76,209,169,88,93], accounts[2], 2,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([218,4,151,16,176,176,147,176,46,130,243,64,106,5,71,82,46,66,50,110,200,36,144,130,141,118,222,248,190,188,1,72],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([210,22,98,170,51,244,237,33,49,90,113,199,138,119,253,244,86,36,156,158,176,82,59,6,60,58,113,17,37,107,164,214], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([14,152,237,46,227,175,34,254,150,235,173,59,148,83,83,92,93,192,244,31,13,201,37,72,81,75,142,188,174,237,9,76], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([140,2,0,188,141,58,37,111,165,83,111,231,166,10,152,202,30,215,157,105,45,122,80,73,5,192,107,249,187,149,164,241], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([9,94,83,234,199,192,167,86,19,107,183,166,177,188,57,100,86,59,101,132,113,146,252,213,20,10,110,133,146,50,3,62], accounts[8],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(9999, 65,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(9999, 65,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(9999, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[8],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[7],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([185,205,203,196,213,70,131,156,196,148,18,246,236,255,186,96,133,151,219,11,254,10,225,250,19,163,229,171,116,65,138,88],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([146,77,143,200,139,108,1,158,52,72,11,168,151,81,185,59,14,236,190,101,208,244,139,115,65,221,156,185,0,163,234,35],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([62,27,191,3,48,180,214,148,6,108,131,249,117,199,48,57,233,113,249,186,97,179,29,248,155,50,136,34,99,77,69,208],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([32,130,150,103,14,199,124,133,87,8,203,25,138,226,75,27,115,5,188,239,51,249,163,232,148,121,36,110,88,12,194,53],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([175,100,92,247,204,192,107,136,110,210,149,22,25,184,226,231,247,195,219,48,166,96,232,34,46,52,175,113,60,46,191,237],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([164,116,148,74,103,106,203,184,234,64,103,185,228,154,107,77,142,24,0,89,27,29,181,46,107,33,165,73,9,228,16,133],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([64,35,142,47,134,48,46,167,115,114,110,158,252,177,109,253,125,157,164,170,27,126,192,163,159,199,250,100,217,28,166,81],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([73,218,212,50,100,171,117,247,199,146,165,26,116,133,148,86,39,40,253,126,141,104,167,240,205,163,12,236,62,41,237,174],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([30,173,101,252,237,109,99,200,169,161,41,112,115,244,89,31,43,9,69,205,114,38,157,81,204,87,99,33,54,4,254,127],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([93,0,202,103,39,118,235,254,67,24,198,19,233,14,119,68,220,100,37,93,236,38,124,126,146,71,85,63,118,87,161,29],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([61,24,109,196,123,223,113,206,111,78,22,21,4,21,148,255,100,27,68,208,240,232,231,131,159,69,163,97,131,209,122,206], accounts[3],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([114,184,102,2,153,201,52,199,117,27,153,144,21,1,238,177,184,154,184,139,119,140,200,126,253,55,86,117,183,247,79,69], accounts[5],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([229,243,66,71,131,64,244,16,112,255,241,33,107,221,141,209,75,84,248,61,154,34,43,29,1,232,121,180,140,179,214,65],{from: accounts[0]});
  });
});
