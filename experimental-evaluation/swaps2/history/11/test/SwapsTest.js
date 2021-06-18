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
    let result = await contractSwaps.tokenFallback(accounts[7], 28, [12,44,212,109,227,47,235,242,159,160,209,48,69,142,21,132,72,0,68,226,166,59,233,108,143,139,41,154,137,93,250,70],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([95,14,189,108,164,166,239,136,83,52,93,117,137,35,246,167,44,124,236,184,253,184,133,34,210,10,73,108,202,61,225,232], accounts[6], accounts[4], 4038714809, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+362, accounts[2], 2014223714, 4, accounts[4], 10000, 4038714810,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([95,14,189,108,164,166,239,136,83,52,93,117,137,35,246,167,44,124,236,184,253,184,133,34,210,10,73,108,202,61,225,232], accounts[4], accounts[4], 4038714809, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+362, accounts[2], 2014223714, 4, accounts[4], 10000, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([95,14,189,108,164,166,239,136,83,52,93,117,137,35,246,167,44,124,236,184,253,184,133,34,210,10,73,108,202,61,225,232], accounts[6], accounts[4], 0, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+362, accounts[2], 2014223714, 4, accounts[4], 10000, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([95,14,189,108,164,166,239,136,83,52,93,117,137,35,246,167,44,124,236,184,253,184,133,34,210,10,73,108,202,61,225,232], accounts[6], accounts[4], 4038714809, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+362, accounts[2], 2014223714, 4, accounts[4], 10000, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([95,14,189,108,164,166,239,136,83,52,93,117,137,35,246,167,44,124,236,184,253,184,133,34,210,10,73,108,202,61,225,232], accounts[6], accounts[4], 4038714809, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 2014223714, 4, accounts[4], 10000, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([223,88,220,29,150,203,172,225,133,125,26,46,188,207,116,246,223,229,41,191,43,85,210,23,11,99,191,191,120,38,134,226], accounts[1], accounts[6], 66, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+123, accounts[4], 28, 6, "0x0000000000000000000000000000000000000000", 255, 0,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([223,88,220,29,150,203,172,225,133,125,26,46,188,207,116,246,223,229,41,191,43,85,210,23,11,99,191,191,120,38,134,226], accounts[6], accounts[6], 66, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+123, accounts[4], 28, 6, "0x0000000000000000000000000000000000000000", 255, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([223,88,220,29,150,203,172,225,133,125,26,46,188,207,116,246,223,229,41,191,43,85,210,23,11,99,191,191,120,38,134,226], accounts[1], accounts[6], 0, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+123, accounts[4], 28, 6, "0x0000000000000000000000000000000000000000", 255, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([223,88,220,29,150,203,172,225,133,125,26,46,188,207,116,246,223,229,41,191,43,85,210,23,11,99,191,191,120,38,134,226], accounts[1], accounts[6], 66, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+123, accounts[4], 28, 6, "0x0000000000000000000000000000000000000000", 255, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([223,88,220,29,150,203,172,225,133,125,26,46,188,207,116,246,223,229,41,191,43,85,210,23,11,99,191,191,120,38,134,226], accounts[1], accounts[6], 66, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[4], 28, 6, "0x0000000000000000000000000000000000000000", 255, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await contractSwaps.createOrder([232,185,230,70,42,212,226,46,159,209,142,154,132,245,169,64,50,86,176,34,168,49,16,208,87,116,76,47,248,202,214,219], accounts[6], accounts[9], 66, 65, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+68, accounts[0], 2014223715, 257, accounts[4], 10, 2014223714,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([232,185,230,70,42,212,226,46,159,209,142,154,132,245,169,64,50,86,176,34,168,49,16,208,87,116,76,47,248,202,214,219], accounts[9], accounts[9], 66, 65, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+68, accounts[0], 2014223715, 257, accounts[4], 10, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([232,185,230,70,42,212,226,46,159,209,142,154,132,245,169,64,50,86,176,34,168,49,16,208,87,116,76,47,248,202,214,219], accounts[6], accounts[9], 0, 65, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+68, accounts[0], 2014223715, 257, accounts[4], 10, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([232,185,230,70,42,212,226,46,159,209,142,154,132,245,169,64,50,86,176,34,168,49,16,208,87,116,76,47,248,202,214,219], accounts[6], accounts[9], 66, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+68, accounts[0], 2014223715, 257, accounts[4], 10, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([232,185,230,70,42,212,226,46,159,209,142,154,132,245,169,64,50,86,176,34,168,49,16,208,87,116,76,47,248,202,214,219], accounts[6], accounts[9], 66, 65, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 2014223715, 257, accounts[4], 10, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([75,198,48,132,77,101,72,57,45,39,73,75,239,94,224,194,249,84,146,239,121,242,130,100,44,43,28,230,199,76,206,100], accounts[8], accounts[2], 5, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+576, accounts[0], 256, 1532892064, accounts[5], 255, 1,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([75,198,48,132,77,101,72,57,45,39,73,75,239,94,224,194,249,84,146,239,121,242,130,100,44,43,28,230,199,76,206,100], accounts[2], accounts[2], 5, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+576, accounts[0], 256, 1532892064, accounts[5], 255, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([75,198,48,132,77,101,72,57,45,39,73,75,239,94,224,194,249,84,146,239,121,242,130,100,44,43,28,230,199,76,206,100], accounts[8], accounts[2], 0, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+576, accounts[0], 256, 1532892064, accounts[5], 255, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([75,198,48,132,77,101,72,57,45,39,73,75,239,94,224,194,249,84,146,239,121,242,130,100,44,43,28,230,199,76,206,100], accounts[8], accounts[2], 5, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+576, accounts[0], 256, 1532892064, accounts[5], 255, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([75,198,48,132,77,101,72,57,45,39,73,75,239,94,224,194,249,84,146,239,121,242,130,100,44,43,28,230,199,76,206,100], accounts[8], accounts[2], 5, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 256, 1532892064, accounts[5], 255, 1,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([164,128,244,86,215,60,229,30,151,193,153,67,212,97,159,128,31,172,103,189,129,5,114,76,0,236,22,148,210,136,31,126], "0x0000000000000000000000000000000000000000", 9,{from: accounts[0],value:9});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([164,128,244,86,215,60,229,30,151,193,153,67,212,97,159,128,31,172,103,189,129,5,114,76,0,236,22,148,210,136,31,126], "0x0000000000000000000000000000000000000000", 10,{from: accounts[0],value:9}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([49,148,156,222,42,196,58,47,111,254,188,124,152,60,196,232,136,220,51,33,137,176,119,32,108,74,105,223,23,105,240,87], accounts[7], 4,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([92,6,169,224,245,133,172,117,239,115,116,221,66,56,111,95,13,2,164,214,98,81,189,119,64,60,122,3,38,170,231,247],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([36,188,140,29,208,170,215,252,227,66,27,54,191,55,129,6,62,60,202,33,21,93,73,72,174,67,253,6,228,15,158,217], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([37,195,9,148,213,104,224,234,50,190,170,212,119,37,169,97,197,210,248,33,191,73,252,3,162,205,109,161,211,185,168,242], accounts[3],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([36,172,18,206,90,60,187,161,12,129,205,91,26,92,159,237,238,233,251,238,98,231,202,226,99,248,65,38,65,245,59,138], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([172,163,188,216,22,231,156,180,7,162,85,131,28,33,222,229,28,177,41,253,118,135,196,77,139,115,155,225,127,149,182,230], accounts[0],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(27, 10000,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(27, 10000,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 10000,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(27, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[7],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[5],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([11,232,165,82,113,45,234,243,247,44,114,63,219,173,97,34,190,124,185,182,238,68,222,65,241,60,64,30,247,210,239,220],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([118,177,69,66,33,26,1,206,141,219,128,91,217,22,124,32,167,240,23,188,20,211,254,243,172,203,153,247,221,195,250,73],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([92,38,35,194,253,223,153,215,5,241,253,44,60,222,36,248,47,170,99,73,190,95,217,161,120,231,1,18,247,5,9,199],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([178,86,173,46,66,161,107,226,235,43,75,160,233,170,243,87,187,224,125,97,174,247,254,31,26,78,187,124,46,145,156,204],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([41,123,19,253,217,130,28,84,110,85,240,122,23,247,34,49,33,140,47,25,59,193,250,73,66,53,189,57,234,236,219,19],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([3,191,197,171,114,159,53,165,246,231,133,104,252,117,233,119,208,111,33,118,166,130,250,97,78,90,130,118,113,28,117,115],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([220,64,239,227,62,158,153,251,152,79,201,180,34,16,109,133,36,19,133,92,246,163,77,44,168,198,125,92,161,136,246,137],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([145,153,221,163,157,145,222,112,190,144,222,33,113,132,15,239,199,107,92,210,87,57,247,111,8,191,24,85,145,43,47,5],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([209,13,249,136,45,38,12,97,3,133,206,1,240,111,100,71,145,166,41,46,62,203,171,128,40,184,249,209,28,160,98,64],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([247,184,29,75,24,29,91,86,224,99,125,36,85,5,33,21,97,128,148,110,77,21,111,244,197,131,255,58,116,92,68,102],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([181,206,128,208,27,147,112,189,234,124,29,85,60,90,58,1,79,33,16,58,117,61,72,50,252,172,252,12,195,97,119,99], accounts[6],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([199,226,111,83,48,34,228,60,121,87,110,215,235,178,110,58,76,197,151,147,132,2,153,235,236,105,137,231,189,173,52,191], accounts[5],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([251,87,238,37,126,146,184,22,103,93,238,162,64,1,60,57,173,203,73,70,43,66,121,92,240,226,216,193,231,98,61,240],{from: accounts[0]});
  });
});
