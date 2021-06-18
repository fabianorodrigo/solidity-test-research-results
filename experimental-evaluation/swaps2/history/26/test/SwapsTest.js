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
    let result = await contractSwaps.tokenFallback(accounts[9], 1532892064, [108,105,248,216,89,221,4,121,27,48,28,87,5,182,172,143,72,119,163,145,120,72,66,216,179,207,168,137,151,252,233,2],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([214,244,79,59,31,31,116,21,207,44,126,177,199,221,123,242,95,47,155,111,240,192,248,112,48,25,145,109,237,44,134,34], accounts[3], accounts[8], 1, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+695, accounts[6], 1532892062, 97, accounts[9], 64, 95,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([214,244,79,59,31,31,116,21,207,44,126,177,199,221,123,242,95,47,155,111,240,192,248,112,48,25,145,109,237,44,134,34], accounts[8], accounts[8], 1, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+695, accounts[6], 1532892062, 97, accounts[9], 64, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([214,244,79,59,31,31,116,21,207,44,126,177,199,221,123,242,95,47,155,111,240,192,248,112,48,25,145,109,237,44,134,34], accounts[3], accounts[8], 0, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+695, accounts[6], 1532892062, 97, accounts[9], 64, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([214,244,79,59,31,31,116,21,207,44,126,177,199,221,123,242,95,47,155,111,240,192,248,112,48,25,145,109,237,44,134,34], accounts[3], accounts[8], 1, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+695, accounts[6], 1532892062, 97, accounts[9], 64, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([214,244,79,59,31,31,116,21,207,44,126,177,199,221,123,242,95,47,155,111,240,192,248,112,48,25,145,109,237,44,134,34], accounts[3], accounts[8], 1, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 1532892062, 97, accounts[9], 64, 95,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([161,162,36,134,203,169,196,14,142,178,100,78,40,59,42,242,229,107,252,54,127,118,242,145,9,94,83,181,186,67,138,16], accounts[9], accounts[4], 1532892063, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+858, accounts[9], 1532892064, 66, "0x0000000000000000000000000000000000000000", 10, 1532892063,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([161,162,36,134,203,169,196,14,142,178,100,78,40,59,42,242,229,107,252,54,127,118,242,145,9,94,83,181,186,67,138,16], accounts[4], accounts[4], 1532892063, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+858, accounts[9], 1532892064, 66, "0x0000000000000000000000000000000000000000", 10, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([161,162,36,134,203,169,196,14,142,178,100,78,40,59,42,242,229,107,252,54,127,118,242,145,9,94,83,181,186,67,138,16], accounts[9], accounts[4], 0, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+858, accounts[9], 1532892064, 66, "0x0000000000000000000000000000000000000000", 10, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([161,162,36,134,203,169,196,14,142,178,100,78,40,59,42,242,229,107,252,54,127,118,242,145,9,94,83,181,186,67,138,16], accounts[9], accounts[4], 1532892063, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+858, accounts[9], 1532892064, 66, "0x0000000000000000000000000000000000000000", 10, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([161,162,36,134,203,169,196,14,142,178,100,78,40,59,42,242,229,107,252,54,127,118,242,145,9,94,83,181,186,67,138,16], accounts[9], accounts[4], 1532892063, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 1532892064, 66, "0x0000000000000000000000000000000000000000", 10, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await contractSwaps.createOrder([215,208,222,129,139,53,164,9,12,38,129,129,126,138,119,219,251,199,230,234,238,178,75,34,153,108,29,244,108,36,37,176], accounts[1], accounts[0], 66, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+431, accounts[7], 97, 6, accounts[3], 4038714811, 4038714811,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([215,208,222,129,139,53,164,9,12,38,129,129,126,138,119,219,251,199,230,234,238,178,75,34,153,108,29,244,108,36,37,176], accounts[0], accounts[0], 66, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+431, accounts[7], 97, 6, accounts[3], 4038714811, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([215,208,222,129,139,53,164,9,12,38,129,129,126,138,119,219,251,199,230,234,238,178,75,34,153,108,29,244,108,36,37,176], accounts[1], accounts[0], 0, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+431, accounts[7], 97, 6, accounts[3], 4038714811, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([215,208,222,129,139,53,164,9,12,38,129,129,126,138,119,219,251,199,230,234,238,178,75,34,153,108,29,244,108,36,37,176], accounts[1], accounts[0], 66, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+431, accounts[7], 97, 6, accounts[3], 4038714811, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([215,208,222,129,139,53,164,9,12,38,129,129,126,138,119,219,251,199,230,234,238,178,75,34,153,108,29,244,108,36,37,176], accounts[1], accounts[0], 66, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 97, 6, accounts[3], 4038714811, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([160,154,192,9,192,97,118,72,39,202,93,51,153,142,169,74,34,17,20,166,15,229,55,135,130,25,249,88,203,123,119,153], accounts[2], accounts[6], 2014223714, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+339, accounts[6], 65, 257, accounts[9], 96, 1336,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([160,154,192,9,192,97,118,72,39,202,93,51,153,142,169,74,34,17,20,166,15,229,55,135,130,25,249,88,203,123,119,153], accounts[6], accounts[6], 2014223714, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+339, accounts[6], 65, 257, accounts[9], 96, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([160,154,192,9,192,97,118,72,39,202,93,51,153,142,169,74,34,17,20,166,15,229,55,135,130,25,249,88,203,123,119,153], accounts[2], accounts[6], 0, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+339, accounts[6], 65, 257, accounts[9], 96, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([160,154,192,9,192,97,118,72,39,202,93,51,153,142,169,74,34,17,20,166,15,229,55,135,130,25,249,88,203,123,119,153], accounts[2], accounts[6], 2014223714, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+339, accounts[6], 65, 257, accounts[9], 96, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([160,154,192,9,192,97,118,72,39,202,93,51,153,142,169,74,34,17,20,166,15,229,55,135,130,25,249,88,203,123,119,153], accounts[2], accounts[6], 2014223714, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 65, 257, accounts[9], 96, 1336,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([186,195,76,33,76,155,184,197,183,143,135,182,204,233,129,243,66,135,149,17,151,166,216,166,224,41,72,188,21,242,46,213], "0x0000000000000000000000000000000000000000", 1,{from: accounts[0],value:1});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([186,195,76,33,76,155,184,197,183,143,135,182,204,233,129,243,66,135,149,17,151,166,216,166,224,41,72,188,21,242,46,213], "0x0000000000000000000000000000000000000000", 2,{from: accounts[0],value:1}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([148,134,25,119,231,152,49,54,220,78,184,163,173,1,52,115,60,233,210,158,83,139,11,250,175,176,199,231,106,58,91,1], accounts[0], 10,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([220,71,200,189,255,104,126,8,104,74,83,25,96,245,242,141,73,107,9,18,184,102,157,227,133,132,62,15,100,104,252,130],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([68,254,32,172,10,231,115,12,120,153,188,129,124,184,60,123,134,25,68,89,249,116,52,70,230,119,35,153,73,161,29,23], accounts[4],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([2,119,53,57,94,10,163,251,64,193,173,123,23,152,156,76,166,148,10,147,44,40,77,224,219,147,230,167,84,204,3,169], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([89,2,245,201,172,226,41,13,71,48,137,64,199,230,166,151,217,58,203,67,164,34,66,210,32,83,214,30,184,163,14,236], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([207,136,40,230,102,2,16,55,101,25,131,109,179,0,246,115,224,177,141,174,115,101,6,199,58,31,100,152,97,189,166,164], accounts[4],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(1338, 1336,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1338, 1336,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[2],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[7],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([246,41,54,182,131,38,98,147,153,129,25,77,189,104,73,215,109,160,221,210,145,208,154,141,45,202,3,24,187,70,4,26],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([137,113,33,231,141,230,219,192,169,242,30,37,16,7,226,255,168,206,43,63,20,90,121,12,177,174,90,172,223,193,209,26],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([147,23,151,220,216,165,165,73,97,11,107,16,53,117,127,210,10,45,11,242,129,6,107,63,212,204,99,45,202,57,101,59],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([212,136,118,89,102,214,27,163,133,47,21,229,112,128,222,29,17,46,33,136,19,50,178,184,254,116,205,62,200,71,242,254],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([134,28,232,118,118,91,10,111,148,185,197,250,1,99,221,67,62,182,253,149,192,18,7,184,235,214,35,206,183,11,46,189],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([140,20,208,241,143,33,136,238,168,95,8,129,115,206,88,90,3,97,252,201,221,75,82,67,127,124,65,140,149,134,188,144],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([80,95,118,184,70,91,166,251,131,223,175,78,134,17,107,31,183,6,157,145,116,60,95,232,194,100,6,195,242,83,114,48],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([157,228,133,248,10,158,178,122,147,222,150,166,124,14,52,82,152,161,15,154,21,148,114,161,192,101,83,186,20,85,159,28],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([206,243,236,45,5,254,125,151,74,156,151,143,176,127,24,248,86,37,4,182,173,9,48,92,80,168,233,72,15,159,189,92],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([249,33,201,16,89,192,237,206,208,113,148,167,248,174,243,70,47,226,191,51,159,218,81,202,71,167,212,98,188,194,205,194],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([233,175,17,179,37,198,200,122,51,17,42,123,234,77,91,127,109,28,205,86,229,90,209,237,80,4,174,163,255,9,56,76], accounts[5],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([178,83,219,48,92,143,213,104,206,107,26,244,10,202,229,2,90,35,167,165,182,136,11,127,110,73,19,199,196,53,162,7], accounts[2],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([85,197,186,212,6,75,189,249,133,100,106,85,217,43,39,115,153,64,50,90,32,39,173,234,139,11,204,119,138,83,98,243],{from: accounts[0]});
  });
});
