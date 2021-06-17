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
    let result = await contractSwaps.tokenFallback(accounts[7], 3, [60,214,193,244,226,220,221,54,247,254,249,73,64,175,212,217,45,18,186,5,90,205,236,126,176,108,251,140,228,168,82,50],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([45,94,158,92,222,151,119,177,99,115,242,52,189,217,117,30,29,198,192,56,52,180,234,110,144,61,158,185,103,225,46,37], accounts[9], accounts[7], 1532892063, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+149, accounts[1], 65, 256, accounts[5], 254, 4038714811,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([45,94,158,92,222,151,119,177,99,115,242,52,189,217,117,30,29,198,192,56,52,180,234,110,144,61,158,185,103,225,46,37], accounts[7], accounts[7], 1532892063, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+149, accounts[1], 65, 256, accounts[5], 254, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([45,94,158,92,222,151,119,177,99,115,242,52,189,217,117,30,29,198,192,56,52,180,234,110,144,61,158,185,103,225,46,37], accounts[9], accounts[7], 0, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+149, accounts[1], 65, 256, accounts[5], 254, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([45,94,158,92,222,151,119,177,99,115,242,52,189,217,117,30,29,198,192,56,52,180,234,110,144,61,158,185,103,225,46,37], accounts[9], accounts[7], 1532892063, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+149, accounts[1], 65, 256, accounts[5], 254, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([45,94,158,92,222,151,119,177,99,115,242,52,189,217,117,30,29,198,192,56,52,180,234,110,144,61,158,185,103,225,46,37], accounts[9], accounts[7], 1532892063, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 65, 256, accounts[5], 254, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([109,6,202,167,86,170,230,92,0,185,28,117,9,113,105,183,78,117,239,4,23,135,108,230,246,245,101,174,25,25,218,2], accounts[5], accounts[1], 9999, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+415, accounts[4], 1532892063, 66, "0x0000000000000000000000000000000000000000", 65, 256,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([109,6,202,167,86,170,230,92,0,185,28,117,9,113,105,183,78,117,239,4,23,135,108,230,246,245,101,174,25,25,218,2], accounts[1], accounts[1], 9999, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+415, accounts[4], 1532892063, 66, "0x0000000000000000000000000000000000000000", 65, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([109,6,202,167,86,170,230,92,0,185,28,117,9,113,105,183,78,117,239,4,23,135,108,230,246,245,101,174,25,25,218,2], accounts[5], accounts[1], 0, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+415, accounts[4], 1532892063, 66, "0x0000000000000000000000000000000000000000", 65, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([109,6,202,167,86,170,230,92,0,185,28,117,9,113,105,183,78,117,239,4,23,135,108,230,246,245,101,174,25,25,218,2], accounts[5], accounts[1], 9999, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+415, accounts[4], 1532892063, 66, "0x0000000000000000000000000000000000000000", 65, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([109,6,202,167,86,170,230,92,0,185,28,117,9,113,105,183,78,117,239,4,23,135,108,230,246,245,101,174,25,25,218,2], accounts[5], accounts[1], 9999, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[4], 1532892063, 66, "0x0000000000000000000000000000000000000000", 65, 256,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await contractSwaps.createOrder([96,29,86,99,159,253,83,234,28,12,242,201,22,96,189,32,167,108,143,203,206,194,166,167,106,167,36,38,11,201,130,214], accounts[7], accounts[4], 1337, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+255, accounts[7], 66, 29, accounts[4], 10000, 1337,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([96,29,86,99,159,253,83,234,28,12,242,201,22,96,189,32,167,108,143,203,206,194,166,167,106,167,36,38,11,201,130,214], accounts[4], accounts[4], 1337, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+255, accounts[7], 66, 29, accounts[4], 10000, 1337,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([96,29,86,99,159,253,83,234,28,12,242,201,22,96,189,32,167,108,143,203,206,194,166,167,106,167,36,38,11,201,130,214], accounts[7], accounts[4], 0, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+255, accounts[7], 66, 29, accounts[4], 10000, 1337,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([96,29,86,99,159,253,83,234,28,12,242,201,22,96,189,32,167,108,143,203,206,194,166,167,106,167,36,38,11,201,130,214], accounts[7], accounts[4], 1337, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+255, accounts[7], 66, 29, accounts[4], 10000, 1337,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([96,29,86,99,159,253,83,234,28,12,242,201,22,96,189,32,167,108,143,203,206,194,166,167,106,167,36,38,11,201,130,214], accounts[7], accounts[4], 1337, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 66, 29, accounts[4], 10000, 1337,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([111,97,33,9,212,161,193,153,138,187,234,92,104,122,49,83,43,21,233,216,95,89,82,205,17,78,201,3,60,18,111,220], accounts[9], accounts[0], 65, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+526, accounts[3], 0, 4038714811, accounts[1], 0, 66,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([111,97,33,9,212,161,193,153,138,187,234,92,104,122,49,83,43,21,233,216,95,89,82,205,17,78,201,3,60,18,111,220], accounts[0], accounts[0], 65, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+526, accounts[3], 0, 4038714811, accounts[1], 0, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([111,97,33,9,212,161,193,153,138,187,234,92,104,122,49,83,43,21,233,216,95,89,82,205,17,78,201,3,60,18,111,220], accounts[9], accounts[0], 0, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+526, accounts[3], 0, 4038714811, accounts[1], 0, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([111,97,33,9,212,161,193,153,138,187,234,92,104,122,49,83,43,21,233,216,95,89,82,205,17,78,201,3,60,18,111,220], accounts[9], accounts[0], 65, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+526, accounts[3], 0, 4038714811, accounts[1], 0, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([111,97,33,9,212,161,193,153,138,187,234,92,104,122,49,83,43,21,233,216,95,89,82,205,17,78,201,3,60,18,111,220], accounts[9], accounts[0], 65, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[3], 0, 4038714811, accounts[1], 0, 66,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([1,55,22,130,50,60,123,245,159,235,81,34,228,208,70,66,188,104,10,156,72,101,49,93,28,152,210,180,1,85,62,220], "0x0000000000000000000000000000000000000000", 10000,{from: accounts[0],value:10000});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([1,55,22,130,50,60,123,245,159,235,81,34,228,208,70,66,188,104,10,156,72,101,49,93,28,152,210,180,1,85,62,220], "0x0000000000000000000000000000000000000000", 10001,{from: accounts[0],value:10000}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([135,68,118,141,36,116,66,216,156,185,69,25,206,115,108,136,22,16,68,237,245,95,9,41,96,1,29,56,34,193,12,11], accounts[4], 11,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([166,161,152,94,159,17,99,155,145,142,167,146,244,190,195,40,60,164,15,186,116,156,232,74,161,234,194,33,20,76,221,60],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([178,2,77,44,231,96,108,195,200,19,43,226,62,42,214,30,19,203,60,116,181,123,60,138,150,137,193,131,11,10,29,173], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([14,216,241,134,182,142,212,155,225,98,192,68,252,151,115,85,113,55,71,184,154,100,114,119,65,156,170,65,13,191,181,114], accounts[3],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([111,10,88,96,6,173,242,70,141,215,208,55,161,210,161,82,135,38,97,154,191,164,119,179,52,197,248,64,188,179,159,66], accounts[5],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([70,120,228,83,211,226,11,96,85,217,203,15,63,172,17,240,156,153,82,132,230,72,90,193,243,28,37,164,172,146,205,7], accounts[0],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(254, 11,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(254, 11,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(254, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[7],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[7],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([141,138,200,85,224,110,81,154,87,148,226,184,184,208,77,83,71,166,180,183,178,90,229,240,231,242,28,56,23,116,115,131],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([236,97,146,23,222,97,41,55,74,27,219,162,13,105,251,61,104,39,239,164,145,22,238,98,113,111,214,221,129,252,11,78],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([119,33,193,174,249,208,72,81,212,201,143,243,196,152,150,163,179,228,79,68,33,212,133,200,134,47,144,218,221,120,29,32],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([26,144,29,242,221,14,164,173,119,116,48,166,232,79,6,87,246,61,44,109,196,1,150,223,39,198,64,121,136,250,176,18],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([247,214,252,206,94,29,166,251,18,147,199,234,67,152,134,84,52,100,31,242,27,191,154,220,212,74,211,149,47,203,174,125],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([10,164,90,22,160,252,62,141,251,109,20,14,212,22,69,145,32,226,161,160,11,159,165,213,194,54,169,166,18,112,109,28],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([109,80,215,122,146,182,214,160,99,169,179,179,77,166,147,208,225,72,238,22,247,79,191,141,77,101,69,90,249,109,38,226],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([53,186,46,152,93,151,117,25,50,67,57,111,249,140,143,72,18,141,91,145,110,87,74,35,48,75,27,222,24,218,123,127],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([101,106,64,118,252,6,190,224,233,216,179,227,31,51,145,184,131,102,210,50,104,56,96,153,165,161,220,35,226,185,157,6],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([105,31,79,244,103,141,132,123,192,74,20,79,241,242,14,1,149,131,233,18,45,160,248,163,237,63,243,0,85,19,35,37],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([225,95,192,161,139,36,58,216,122,44,200,190,184,224,82,220,81,92,42,54,111,144,17,250,245,115,32,179,154,55,30,80], accounts[4],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([215,29,61,41,2,130,136,18,5,170,119,134,17,140,188,9,105,110,194,2,98,200,51,182,144,153,22,174,178,243,244,247], accounts[0],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([190,217,108,95,86,237,90,76,0,245,242,252,162,33,196,29,0,195,212,88,74,221,24,48,61,230,178,178,149,4,126,143],{from: accounts[0]});
  });
});
