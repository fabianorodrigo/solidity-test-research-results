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
    let result = await contractSwaps.tokenFallback(accounts[3], 2014223714, [53,124,166,56,240,61,205,89,96,80,197,77,141,86,52,150,129,124,157,85,67,6,152,191,126,14,166,217,177,71,104,179],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([53,134,218,217,28,143,159,194,95,177,169,41,73,228,188,128,16,183,209,99,240,9,117,152,125,250,52,174,6,65,209,72], accounts[6], accounts[8], 10000, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+826, accounts[7], 1336, 26, accounts[6], 29, 9,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([53,134,218,217,28,143,159,194,95,177,169,41,73,228,188,128,16,183,209,99,240,9,117,152,125,250,52,174,6,65,209,72], accounts[8], accounts[8], 10000, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+826, accounts[7], 1336, 26, accounts[6], 29, 9,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([53,134,218,217,28,143,159,194,95,177,169,41,73,228,188,128,16,183,209,99,240,9,117,152,125,250,52,174,6,65,209,72], accounts[6], accounts[8], 0, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+826, accounts[7], 1336, 26, accounts[6], 29, 9,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([53,134,218,217,28,143,159,194,95,177,169,41,73,228,188,128,16,183,209,99,240,9,117,152,125,250,52,174,6,65,209,72], accounts[6], accounts[8], 10000, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+826, accounts[7], 1336, 26, accounts[6], 29, 9,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([53,134,218,217,28,143,159,194,95,177,169,41,73,228,188,128,16,183,209,99,240,9,117,152,125,250,52,174,6,65,209,72], accounts[6], accounts[8], 10000, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 1336, 26, accounts[6], 29, 9,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([63,51,103,19,93,98,8,243,198,247,154,176,164,98,147,140,204,92,222,237,190,129,237,60,242,47,126,6,69,165,156,101], accounts[8], accounts[1], 2014223715, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+556, accounts[7], 1338, 1, "0x0000000000000000000000000000000000000000", 64, 27,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([63,51,103,19,93,98,8,243,198,247,154,176,164,98,147,140,204,92,222,237,190,129,237,60,242,47,126,6,69,165,156,101], accounts[1], accounts[1], 2014223715, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+556, accounts[7], 1338, 1, "0x0000000000000000000000000000000000000000", 64, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([63,51,103,19,93,98,8,243,198,247,154,176,164,98,147,140,204,92,222,237,190,129,237,60,242,47,126,6,69,165,156,101], accounts[8], accounts[1], 0, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+556, accounts[7], 1338, 1, "0x0000000000000000000000000000000000000000", 64, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([63,51,103,19,93,98,8,243,198,247,154,176,164,98,147,140,204,92,222,237,190,129,237,60,242,47,126,6,69,165,156,101], accounts[8], accounts[1], 2014223715, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+556, accounts[7], 1338, 1, "0x0000000000000000000000000000000000000000", 64, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([63,51,103,19,93,98,8,243,198,247,154,176,164,98,147,140,204,92,222,237,190,129,237,60,242,47,126,6,69,165,156,101], accounts[8], accounts[1], 2014223715, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 1338, 1, "0x0000000000000000000000000000000000000000", 64, 27,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await contractSwaps.createOrder([228,238,29,141,255,78,188,154,131,171,241,109,70,184,109,187,133,41,21,214,251,104,129,49,166,71,196,236,123,29,6,15], accounts[5], accounts[3], 29, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+827, accounts[6], 4, 10001, accounts[5], 2014223714, 0,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([228,238,29,141,255,78,188,154,131,171,241,109,70,184,109,187,133,41,21,214,251,104,129,49,166,71,196,236,123,29,6,15], accounts[3], accounts[3], 29, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+827, accounts[6], 4, 10001, accounts[5], 2014223714, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([228,238,29,141,255,78,188,154,131,171,241,109,70,184,109,187,133,41,21,214,251,104,129,49,166,71,196,236,123,29,6,15], accounts[5], accounts[3], 0, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+827, accounts[6], 4, 10001, accounts[5], 2014223714, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([228,238,29,141,255,78,188,154,131,171,241,109,70,184,109,187,133,41,21,214,251,104,129,49,166,71,196,236,123,29,6,15], accounts[5], accounts[3], 29, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+827, accounts[6], 4, 10001, accounts[5], 2014223714, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([228,238,29,141,255,78,188,154,131,171,241,109,70,184,109,187,133,41,21,214,251,104,129,49,166,71,196,236,123,29,6,15], accounts[5], accounts[3], 29, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 4, 10001, accounts[5], 2014223714, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([103,110,239,54,32,181,158,34,20,175,204,9,180,125,169,135,239,6,193,187,4,202,41,128,103,91,55,246,32,83,157,241], accounts[4], accounts[7], 6, 29, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+298, accounts[8], 10000, 65, accounts[4], 2014223716, 1532892062,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([103,110,239,54,32,181,158,34,20,175,204,9,180,125,169,135,239,6,193,187,4,202,41,128,103,91,55,246,32,83,157,241], accounts[7], accounts[7], 6, 29, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+298, accounts[8], 10000, 65, accounts[4], 2014223716, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([103,110,239,54,32,181,158,34,20,175,204,9,180,125,169,135,239,6,193,187,4,202,41,128,103,91,55,246,32,83,157,241], accounts[4], accounts[7], 0, 29, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+298, accounts[8], 10000, 65, accounts[4], 2014223716, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([103,110,239,54,32,181,158,34,20,175,204,9,180,125,169,135,239,6,193,187,4,202,41,128,103,91,55,246,32,83,157,241], accounts[4], accounts[7], 6, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+298, accounts[8], 10000, 65, accounts[4], 2014223716, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([103,110,239,54,32,181,158,34,20,175,204,9,180,125,169,135,239,6,193,187,4,202,41,128,103,91,55,246,32,83,157,241], accounts[4], accounts[7], 6, 29, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 10000, 65, accounts[4], 2014223716, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([18,245,139,33,123,101,178,140,9,63,99,192,183,155,197,91,75,77,39,78,128,155,165,103,19,86,21,72,188,12,49,58], "0x0000000000000000000000000000000000000000", 10000,{from: accounts[0],value:10000});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([18,245,139,33,123,101,178,140,9,63,99,192,183,155,197,91,75,77,39,78,128,155,165,103,19,86,21,72,188,12,49,58], "0x0000000000000000000000000000000000000000", 10001,{from: accounts[0],value:10000}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([241,237,14,136,168,153,181,74,186,115,236,75,126,55,205,67,94,163,58,125,255,121,41,197,77,96,153,147,108,5,229,224], accounts[2], 27,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([45,189,23,83,105,65,122,5,157,176,177,239,77,178,120,166,24,57,44,230,123,141,97,25,79,179,184,124,132,186,160,22],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([66,236,7,216,178,196,195,170,48,55,77,102,247,135,226,108,24,151,126,191,92,54,100,61,105,236,133,149,238,54,241,200], accounts[5],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([4,31,162,91,199,86,225,144,76,188,103,118,222,191,219,26,7,153,145,228,73,117,197,44,89,35,104,216,28,70,141,208], accounts[4],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([242,220,104,247,24,154,125,213,197,39,143,166,233,141,9,230,101,145,56,66,10,61,179,24,100,64,15,219,95,152,231,250], accounts[3],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([243,190,195,222,42,14,206,76,232,40,36,195,45,141,159,93,88,223,4,149,239,57,175,127,74,185,204,139,159,28,180,69], accounts[0],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(1338, 1,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1338, 1,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1338, 10001,{from: accounts[0]}),'revert');
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
    let result = await contractSwaps.allBrokersBasePercent([137,210,97,174,57,201,170,79,213,74,34,0,1,108,199,120,148,101,146,176,122,169,25,139,187,240,94,75,154,76,224,184],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([126,191,7,1,254,132,22,237,192,147,179,97,59,29,4,11,122,6,190,146,143,210,213,250,135,207,28,51,59,230,87,42],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([197,117,84,121,51,81,236,35,46,10,39,241,165,81,52,190,215,186,229,53,15,209,91,192,92,94,106,114,203,133,35,107],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([245,17,152,199,14,146,63,232,199,163,80,96,74,185,69,62,90,179,88,130,50,254,142,204,192,104,152,140,185,104,174,53],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([157,59,180,232,155,200,239,136,18,66,42,189,78,101,200,8,221,12,21,133,222,211,204,109,135,32,117,30,82,227,51,194],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([66,80,138,17,215,43,232,127,172,94,125,169,185,207,100,83,70,22,231,167,16,177,159,223,202,108,60,57,184,182,192,37],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([162,168,166,82,8,83,59,157,60,248,149,238,255,113,208,209,146,236,241,238,88,174,94,24,33,151,198,17,51,64,149,145],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([220,212,109,86,12,208,23,96,167,229,84,202,236,110,85,11,34,137,90,187,115,92,176,139,2,115,208,136,54,191,239,47],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([175,149,0,9,177,200,182,83,34,138,112,248,185,119,218,67,24,42,161,44,91,253,82,239,250,252,99,48,174,79,31,154],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([186,247,165,182,139,132,86,235,190,205,164,16,206,152,250,192,10,101,77,73,243,123,125,161,59,52,132,170,66,15,245,186],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([21,59,241,33,154,93,148,142,116,86,65,186,140,78,90,235,24,146,107,92,157,93,86,66,226,170,118,198,182,60,18,57], accounts[6],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([96,158,22,234,117,68,242,68,90,74,188,116,72,120,250,160,68,131,149,23,234,38,199,59,246,85,79,236,221,246,113,57], accounts[8],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([23,98,53,77,126,171,184,36,153,231,134,225,159,223,111,143,49,122,209,80,127,82,100,155,114,79,252,251,230,108,72,20],{from: accounts[0]});
  });
});
