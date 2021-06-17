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
    let result = await contractSwaps.tokenFallback(accounts[1], 1, [152,149,107,254,16,116,233,64,133,199,153,74,134,176,223,134,111,154,171,15,189,88,133,48,213,180,0,2,198,238,163,170],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([149,121,163,246,90,70,245,89,235,146,118,209,201,78,133,134,81,130,209,116,35,84,191,223,166,119,236,134,242,157,237,150], accounts[5], accounts[0], 96, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+276, accounts[9], 0, 26, accounts[9], 254, 9999,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([149,121,163,246,90,70,245,89,235,146,118,209,201,78,133,134,81,130,209,116,35,84,191,223,166,119,236,134,242,157,237,150], accounts[0], accounts[0], 96, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+276, accounts[9], 0, 26, accounts[9], 254, 9999,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([149,121,163,246,90,70,245,89,235,146,118,209,201,78,133,134,81,130,209,116,35,84,191,223,166,119,236,134,242,157,237,150], accounts[5], accounts[0], 0, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+276, accounts[9], 0, 26, accounts[9], 254, 9999,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([149,121,163,246,90,70,245,89,235,146,118,209,201,78,133,134,81,130,209,116,35,84,191,223,166,119,236,134,242,157,237,150], accounts[5], accounts[0], 96, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+276, accounts[9], 0, 26, accounts[9], 254, 9999,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([149,121,163,246,90,70,245,89,235,146,118,209,201,78,133,134,81,130,209,116,35,84,191,223,166,119,236,134,242,157,237,150], accounts[5], accounts[0], 96, 1532892063, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 0, 26, accounts[9], 254, 9999,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([154,226,83,143,240,103,156,229,180,249,63,185,209,81,82,244,146,60,61,5,105,99,141,202,98,23,63,85,233,83,198,182], accounts[5], accounts[6], 1337, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+206, accounts[7], 0, 97, "0x0000000000000000000000000000000000000000", 1, 10,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([154,226,83,143,240,103,156,229,180,249,63,185,209,81,82,244,146,60,61,5,105,99,141,202,98,23,63,85,233,83,198,182], accounts[6], accounts[6], 1337, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+206, accounts[7], 0, 97, "0x0000000000000000000000000000000000000000", 1, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([154,226,83,143,240,103,156,229,180,249,63,185,209,81,82,244,146,60,61,5,105,99,141,202,98,23,63,85,233,83,198,182], accounts[5], accounts[6], 0, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+206, accounts[7], 0, 97, "0x0000000000000000000000000000000000000000", 1, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([154,226,83,143,240,103,156,229,180,249,63,185,209,81,82,244,146,60,61,5,105,99,141,202,98,23,63,85,233,83,198,182], accounts[5], accounts[6], 1337, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+206, accounts[7], 0, 97, "0x0000000000000000000000000000000000000000", 1, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([154,226,83,143,240,103,156,229,180,249,63,185,209,81,82,244,146,60,61,5,105,99,141,202,98,23,63,85,233,83,198,182], accounts[5], accounts[6], 1337, 6, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 0, 97, "0x0000000000000000000000000000000000000000", 1, 10,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await contractSwaps.createOrder([161,246,171,249,229,100,17,142,247,133,19,165,53,215,57,27,109,184,140,80,201,104,241,241,250,34,137,126,14,77,23,155], accounts[2], accounts[7], 1337, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+176, accounts[8], 1532892062, 9999, accounts[7], 1532892064, 3,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([161,246,171,249,229,100,17,142,247,133,19,165,53,215,57,27,109,184,140,80,201,104,241,241,250,34,137,126,14,77,23,155], accounts[7], accounts[7], 1337, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+176, accounts[8], 1532892062, 9999, accounts[7], 1532892064, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([161,246,171,249,229,100,17,142,247,133,19,165,53,215,57,27,109,184,140,80,201,104,241,241,250,34,137,126,14,77,23,155], accounts[2], accounts[7], 0, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+176, accounts[8], 1532892062, 9999, accounts[7], 1532892064, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([161,246,171,249,229,100,17,142,247,133,19,165,53,215,57,27,109,184,140,80,201,104,241,241,250,34,137,126,14,77,23,155], accounts[2], accounts[7], 1337, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+176, accounts[8], 1532892062, 9999, accounts[7], 1532892064, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([161,246,171,249,229,100,17,142,247,133,19,165,53,215,57,27,109,184,140,80,201,104,241,241,250,34,137,126,14,77,23,155], accounts[2], accounts[7], 1337, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 1532892062, 9999, accounts[7], 1532892064, 3,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([91,105,89,56,164,202,97,168,158,156,220,147,137,174,206,100,129,187,229,153,199,228,222,39,183,203,186,162,244,182,195,151], accounts[0], accounts[1], 10, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+259, accounts[0], 1532892062, 26, accounts[5], 9999, 2014223716,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([91,105,89,56,164,202,97,168,158,156,220,147,137,174,206,100,129,187,229,153,199,228,222,39,183,203,186,162,244,182,195,151], accounts[1], accounts[1], 10, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+259, accounts[0], 1532892062, 26, accounts[5], 9999, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([91,105,89,56,164,202,97,168,158,156,220,147,137,174,206,100,129,187,229,153,199,228,222,39,183,203,186,162,244,182,195,151], accounts[0], accounts[1], 0, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+259, accounts[0], 1532892062, 26, accounts[5], 9999, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([91,105,89,56,164,202,97,168,158,156,220,147,137,174,206,100,129,187,229,153,199,228,222,39,183,203,186,162,244,182,195,151], accounts[0], accounts[1], 10, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+259, accounts[0], 1532892062, 26, accounts[5], 9999, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([91,105,89,56,164,202,97,168,158,156,220,147,137,174,206,100,129,187,229,153,199,228,222,39,183,203,186,162,244,182,195,151], accounts[0], accounts[1], 10, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 1532892062, 26, accounts[5], 9999, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([140,204,91,155,139,54,229,220,172,159,197,254,243,203,139,16,244,229,169,255,8,133,83,22,20,143,28,186,239,191,17,161], "0x0000000000000000000000000000000000000000", 1,{from: accounts[0],value:1});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([140,204,91,155,139,54,229,220,172,159,197,254,243,203,139,16,244,229,169,255,8,133,83,22,20,143,28,186,239,191,17,161], "0x0000000000000000000000000000000000000000", 2,{from: accounts[0],value:1}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([95,193,245,12,97,246,162,236,205,227,20,132,254,6,22,103,235,171,154,186,5,159,171,212,103,25,12,161,11,220,161,163], accounts[6], 254,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([30,53,170,237,61,190,43,124,172,224,162,104,134,6,198,210,147,145,131,53,183,99,234,69,184,233,51,210,224,225,155,56],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([67,148,28,224,242,37,196,45,19,31,8,106,174,90,196,172,178,217,50,33,100,33,64,159,93,205,200,246,59,64,233,179], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([245,183,31,228,60,239,60,149,65,219,156,49,3,83,32,140,67,2,78,248,5,90,28,186,177,53,59,228,83,253,249,248], accounts[5],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([102,204,131,161,221,94,104,154,168,38,1,55,31,187,173,54,120,241,51,209,219,89,231,43,49,1,161,205,139,219,143,249], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([67,102,39,182,179,70,138,184,194,185,146,65,235,135,63,26,196,1,55,202,193,206,254,154,251,170,208,25,191,8,4,77], accounts[8],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(27, 26,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(27, 26,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(27, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[3],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[5],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([221,7,86,50,221,18,187,69,12,3,169,109,230,199,228,186,27,118,109,62,103,23,208,12,173,158,46,207,126,24,147,239],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([147,78,142,215,239,29,135,44,102,241,52,27,9,79,115,31,158,229,36,220,79,197,105,248,12,15,198,51,20,199,86,165],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([109,40,196,39,9,23,143,79,101,154,183,0,53,11,29,146,228,190,185,242,227,205,188,164,242,18,81,86,205,62,17,231],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([178,248,11,103,46,102,81,29,242,189,16,224,77,22,124,195,139,83,42,60,3,222,81,234,227,175,251,163,142,13,39,193],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([249,175,174,131,203,65,69,95,235,214,252,232,126,77,239,136,243,49,87,238,131,132,1,221,237,202,201,178,213,17,168,62],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([54,176,80,119,109,174,146,225,251,175,118,28,25,79,89,114,106,203,214,65,186,45,133,53,239,157,155,54,106,167,205,190],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([32,130,133,58,203,227,167,229,219,45,185,37,98,158,218,145,88,83,105,73,30,3,253,236,194,79,217,59,207,146,166,69],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([200,190,100,3,210,247,158,163,226,139,0,183,95,74,77,53,120,174,19,146,126,127,251,213,228,144,242,167,175,199,21,49],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([203,96,218,113,139,58,69,224,78,42,148,44,246,195,240,203,50,226,147,84,106,218,135,40,202,40,205,240,140,7,53,128],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([255,208,136,124,109,36,9,109,96,230,222,247,219,105,5,139,245,212,244,135,139,26,0,51,225,178,220,143,51,89,139,230],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([217,224,188,27,228,87,95,13,142,140,71,198,199,250,63,145,27,202,152,44,139,220,161,227,176,254,240,90,183,214,119,72], accounts[6],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([24,238,148,123,153,134,82,172,220,97,226,255,37,241,18,99,199,146,174,145,170,116,93,211,136,155,244,30,124,24,40,20], accounts[7],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([52,161,40,254,226,99,60,212,70,12,109,44,232,64,213,74,187,197,72,198,44,89,6,96,206,177,45,219,135,16,46,185],{from: accounts[0]});
  });
});
