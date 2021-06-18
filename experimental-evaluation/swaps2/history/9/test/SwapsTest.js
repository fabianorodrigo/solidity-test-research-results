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
    let result = await contractSwaps.tokenFallback(accounts[4], 254, [33,96,19,128,90,180,63,36,134,193,88,186,29,136,2,41,163,142,250,38,70,215,170,98,109,85,131,208,40,83,105,86],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([238,129,131,33,10,121,211,89,205,117,109,230,64,199,47,234,72,127,66,131,126,10,162,198,59,123,23,155,210,2,195,241], accounts[3], accounts[9], 1338, 257, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+951, accounts[4], 256, 5, accounts[0], 4, 4038714811,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([238,129,131,33,10,121,211,89,205,117,109,230,64,199,47,234,72,127,66,131,126,10,162,198,59,123,23,155,210,2,195,241], accounts[9], accounts[9], 1338, 257, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+951, accounts[4], 256, 5, accounts[0], 4, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([238,129,131,33,10,121,211,89,205,117,109,230,64,199,47,234,72,127,66,131,126,10,162,198,59,123,23,155,210,2,195,241], accounts[3], accounts[9], 0, 257, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+951, accounts[4], 256, 5, accounts[0], 4, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([238,129,131,33,10,121,211,89,205,117,109,230,64,199,47,234,72,127,66,131,126,10,162,198,59,123,23,155,210,2,195,241], accounts[3], accounts[9], 1338, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+951, accounts[4], 256, 5, accounts[0], 4, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([238,129,131,33,10,121,211,89,205,117,109,230,64,199,47,234,72,127,66,131,126,10,162,198,59,123,23,155,210,2,195,241], accounts[3], accounts[9], 1338, 257, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[4], 256, 5, accounts[0], 4, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([43,52,199,208,74,143,1,193,199,82,7,147,228,94,135,163,226,99,239,45,216,221,55,67,208,175,100,139,157,196,104,27], accounts[3], accounts[8], 1532892063, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+677, accounts[4], 10000, 1532892062, "0x0000000000000000000000000000000000000000", 1338, 10001,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([43,52,199,208,74,143,1,193,199,82,7,147,228,94,135,163,226,99,239,45,216,221,55,67,208,175,100,139,157,196,104,27], accounts[8], accounts[8], 1532892063, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+677, accounts[4], 10000, 1532892062, "0x0000000000000000000000000000000000000000", 1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([43,52,199,208,74,143,1,193,199,82,7,147,228,94,135,163,226,99,239,45,216,221,55,67,208,175,100,139,157,196,104,27], accounts[3], accounts[8], 0, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+677, accounts[4], 10000, 1532892062, "0x0000000000000000000000000000000000000000", 1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([43,52,199,208,74,143,1,193,199,82,7,147,228,94,135,163,226,99,239,45,216,221,55,67,208,175,100,139,157,196,104,27], accounts[3], accounts[8], 1532892063, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+677, accounts[4], 10000, 1532892062, "0x0000000000000000000000000000000000000000", 1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([43,52,199,208,74,143,1,193,199,82,7,147,228,94,135,163,226,99,239,45,216,221,55,67,208,175,100,139,157,196,104,27], accounts[3], accounts[8], 1532892063, 2, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[4], 10000, 1532892062, "0x0000000000000000000000000000000000000000", 1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await contractSwaps.createOrder([81,112,75,168,100,71,7,146,141,87,144,176,138,10,3,225,26,14,102,48,83,75,222,252,234,12,8,86,78,143,114,94], accounts[3], accounts[2], 11, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+11, accounts[9], 1, 1, accounts[9], 2, 254,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([81,112,75,168,100,71,7,146,141,87,144,176,138,10,3,225,26,14,102,48,83,75,222,252,234,12,8,86,78,143,114,94], accounts[2], accounts[2], 11, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+11, accounts[9], 1, 1, accounts[9], 2, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([81,112,75,168,100,71,7,146,141,87,144,176,138,10,3,225,26,14,102,48,83,75,222,252,234,12,8,86,78,143,114,94], accounts[3], accounts[2], 0, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+11, accounts[9], 1, 1, accounts[9], 2, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([81,112,75,168,100,71,7,146,141,87,144,176,138,10,3,225,26,14,102,48,83,75,222,252,234,12,8,86,78,143,114,94], accounts[3], accounts[2], 11, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+11, accounts[9], 1, 1, accounts[9], 2, 254,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([81,112,75,168,100,71,7,146,141,87,144,176,138,10,3,225,26,14,102,48,83,75,222,252,234,12,8,86,78,143,114,94], accounts[3], accounts[2], 11, 10000, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 1, 1, accounts[9], 2, 254,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([249,63,11,156,19,8,57,96,252,152,91,118,57,122,104,138,240,41,195,239,96,91,181,153,130,30,32,83,139,161,16,235], accounts[9], accounts[2], 10, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+383, accounts[5], 97, 1337, accounts[3], 4038714811, 4038714810,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([249,63,11,156,19,8,57,96,252,152,91,118,57,122,104,138,240,41,195,239,96,91,181,153,130,30,32,83,139,161,16,235], accounts[2], accounts[2], 10, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+383, accounts[5], 97, 1337, accounts[3], 4038714811, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([249,63,11,156,19,8,57,96,252,152,91,118,57,122,104,138,240,41,195,239,96,91,181,153,130,30,32,83,139,161,16,235], accounts[9], accounts[2], 0, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+383, accounts[5], 97, 1337, accounts[3], 4038714811, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([249,63,11,156,19,8,57,96,252,152,91,118,57,122,104,138,240,41,195,239,96,91,181,153,130,30,32,83,139,161,16,235], accounts[9], accounts[2], 10, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+383, accounts[5], 97, 1337, accounts[3], 4038714811, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([249,63,11,156,19,8,57,96,252,152,91,118,57,122,104,138,240,41,195,239,96,91,181,153,130,30,32,83,139,161,16,235], accounts[9], accounts[2], 10, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 97, 1337, accounts[3], 4038714811, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([112,43,59,28,240,24,206,77,72,200,172,102,136,236,133,242,242,178,31,250,231,150,13,98,223,11,208,171,144,146,236,88], "0x0000000000000000000000000000000000000000", 66,{from: accounts[0],value:66});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([112,43,59,28,240,24,206,77,72,200,172,102,136,236,133,242,242,178,31,250,231,150,13,98,223,11,208,171,144,146,236,88], "0x0000000000000000000000000000000000000000", 67,{from: accounts[0],value:66}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([131,5,202,222,192,134,238,78,124,240,155,185,6,239,60,51,104,44,102,11,247,168,220,155,138,237,80,134,51,21,24,151], accounts[4], 3,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([92,185,209,175,50,196,222,199,196,45,85,163,234,118,71,164,199,146,92,178,237,49,188,54,168,103,149,89,94,148,57,137],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([173,218,41,154,158,214,165,157,88,146,223,191,48,194,232,237,0,193,166,74,178,237,199,238,126,153,106,85,231,146,12,39], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([100,119,14,206,179,130,129,129,200,255,41,210,234,211,227,187,45,161,222,148,38,233,177,191,212,198,250,137,141,2,158,194], accounts[3],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([60,140,157,50,57,245,124,115,86,247,156,67,218,123,11,51,137,117,178,33,110,63,145,222,94,209,34,155,88,88,32,89], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([52,158,1,43,74,2,238,51,244,74,90,161,138,38,171,75,168,8,86,34,150,207,202,26,175,171,163,84,61,171,141,125], accounts[7],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(255, 66,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(255, 66,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(255, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[7],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[1],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([133,80,174,84,83,216,167,245,244,106,190,143,43,84,177,250,59,202,248,176,181,137,96,46,87,42,151,236,102,251,72,71],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([45,213,78,14,212,213,232,61,19,163,205,187,4,152,209,5,205,192,164,116,226,111,147,192,189,156,1,88,192,253,241,231],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([205,159,107,238,227,235,197,34,237,29,249,183,157,238,43,130,26,93,188,167,150,56,69,245,142,221,138,66,153,188,173,131],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([191,227,254,107,188,201,3,116,48,134,228,207,86,102,75,177,164,236,222,167,22,247,110,92,82,22,178,212,78,226,177,227],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([111,102,28,73,109,104,144,204,177,233,150,23,23,145,12,12,118,215,132,94,134,244,136,155,25,86,242,88,190,76,17,213],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([48,0,156,219,131,32,104,108,250,8,14,70,227,192,235,235,100,64,157,2,63,116,112,112,193,13,183,160,28,46,9,26],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([84,212,179,49,216,198,251,180,24,220,177,112,127,227,159,16,38,231,50,202,175,94,228,243,127,160,44,85,2,26,39,222],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([109,88,191,224,113,76,71,133,58,129,131,54,0,237,101,166,20,133,126,200,225,239,122,16,252,146,222,55,15,153,159,63],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([134,167,206,106,27,93,97,215,3,192,165,86,30,133,251,88,189,30,144,180,197,59,194,72,240,220,58,212,124,241,82,116],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([23,114,55,31,217,44,162,168,114,89,228,147,141,243,69,205,91,64,98,94,169,255,128,94,104,46,46,227,147,140,164,111],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([6,15,192,254,7,36,33,142,118,84,158,231,128,57,124,47,188,161,233,246,207,170,207,229,58,216,217,87,142,8,133,120], accounts[8],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([213,187,239,18,105,11,189,89,9,197,122,24,221,211,120,79,25,241,102,189,99,103,59,36,104,146,29,145,51,151,147,29], accounts[2],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([14,201,63,159,142,80,76,162,103,131,55,202,47,57,232,58,147,54,191,57,229,133,70,174,59,114,13,92,91,227,21,123],{from: accounts[0]});
  });
});
