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
    let result = await contractSwaps.tokenFallback(accounts[8], 64, [239,36,94,160,175,34,116,202,175,23,63,82,38,237,46,191,147,97,98,154,197,50,202,29,164,36,21,37,91,63,252,212],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([201,102,221,138,25,72,4,227,138,37,242,168,81,181,165,229,194,128,143,204,199,71,174,72,51,211,128,56,34,34,30,233], accounts[8], accounts[3], 29, 27, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+275, accounts[8], 64, 5, accounts[8], 95, 5,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([201,102,221,138,25,72,4,227,138,37,242,168,81,181,165,229,194,128,143,204,199,71,174,72,51,211,128,56,34,34,30,233], accounts[3], accounts[3], 29, 27, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+275, accounts[8], 64, 5, accounts[8], 95, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([201,102,221,138,25,72,4,227,138,37,242,168,81,181,165,229,194,128,143,204,199,71,174,72,51,211,128,56,34,34,30,233], accounts[8], accounts[3], 0, 27, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+275, accounts[8], 64, 5, accounts[8], 95, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([201,102,221,138,25,72,4,227,138,37,242,168,81,181,165,229,194,128,143,204,199,71,174,72,51,211,128,56,34,34,30,233], accounts[8], accounts[3], 29, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+275, accounts[8], 64, 5, accounts[8], 95, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([201,102,221,138,25,72,4,227,138,37,242,168,81,181,165,229,194,128,143,204,199,71,174,72,51,211,128,56,34,34,30,233], accounts[8], accounts[3], 29, 27, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 64, 5, accounts[8], 95, 5,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([45,253,16,229,17,123,170,106,199,13,35,138,115,91,21,41,54,131,14,150,2,83,84,138,157,105,12,176,92,196,163,31], accounts[5], accounts[2], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+883, accounts[9], 10000, 10001, "0x0000000000000000000000000000000000000000", 10000, 11,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([45,253,16,229,17,123,170,106,199,13,35,138,115,91,21,41,54,131,14,150,2,83,84,138,157,105,12,176,92,196,163,31], accounts[2], accounts[2], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+883, accounts[9], 10000, 10001, "0x0000000000000000000000000000000000000000", 10000, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([45,253,16,229,17,123,170,106,199,13,35,138,115,91,21,41,54,131,14,150,2,83,84,138,157,105,12,176,92,196,163,31], accounts[5], accounts[2], 0, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+883, accounts[9], 10000, 10001, "0x0000000000000000000000000000000000000000", 10000, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([45,253,16,229,17,123,170,106,199,13,35,138,115,91,21,41,54,131,14,150,2,83,84,138,157,105,12,176,92,196,163,31], accounts[5], accounts[2], 1532892062, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+883, accounts[9], 10000, 10001, "0x0000000000000000000000000000000000000000", 10000, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([45,253,16,229,17,123,170,106,199,13,35,138,115,91,21,41,54,131,14,150,2,83,84,138,157,105,12,176,92,196,163,31], accounts[5], accounts[2], 1532892062, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 10000, 10001, "0x0000000000000000000000000000000000000000", 10000, 11,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await contractSwaps.createOrder([43,36,62,41,79,50,137,74,38,92,95,167,228,137,216,57,31,248,228,217,25,77,4,168,184,235,145,54,144,236,203,79], accounts[2], accounts[6], 5, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+759, accounts[7], 4038714811, 2014223714, accounts[2], 254, 6,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([43,36,62,41,79,50,137,74,38,92,95,167,228,137,216,57,31,248,228,217,25,77,4,168,184,235,145,54,144,236,203,79], accounts[6], accounts[6], 5, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+759, accounts[7], 4038714811, 2014223714, accounts[2], 254, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([43,36,62,41,79,50,137,74,38,92,95,167,228,137,216,57,31,248,228,217,25,77,4,168,184,235,145,54,144,236,203,79], accounts[2], accounts[6], 0, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+759, accounts[7], 4038714811, 2014223714, accounts[2], 254, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([43,36,62,41,79,50,137,74,38,92,95,167,228,137,216,57,31,248,228,217,25,77,4,168,184,235,145,54,144,236,203,79], accounts[2], accounts[6], 5, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+759, accounts[7], 4038714811, 2014223714, accounts[2], 254, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([43,36,62,41,79,50,137,74,38,92,95,167,228,137,216,57,31,248,228,217,25,77,4,168,184,235,145,54,144,236,203,79], accounts[2], accounts[6], 5, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 4038714811, 2014223714, accounts[2], 254, 6,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([50,199,36,115,31,215,197,131,189,118,232,54,253,172,7,235,92,215,24,99,55,238,73,215,40,252,30,176,254,135,214,253], accounts[6], accounts[5], 4038714811, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+548, accounts[9], 254, 26, accounts[4], 257, 11,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([50,199,36,115,31,215,197,131,189,118,232,54,253,172,7,235,92,215,24,99,55,238,73,215,40,252,30,176,254,135,214,253], accounts[5], accounts[5], 4038714811, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+548, accounts[9], 254, 26, accounts[4], 257, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([50,199,36,115,31,215,197,131,189,118,232,54,253,172,7,235,92,215,24,99,55,238,73,215,40,252,30,176,254,135,214,253], accounts[6], accounts[5], 0, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+548, accounts[9], 254, 26, accounts[4], 257, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([50,199,36,115,31,215,197,131,189,118,232,54,253,172,7,235,92,215,24,99,55,238,73,215,40,252,30,176,254,135,214,253], accounts[6], accounts[5], 4038714811, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+548, accounts[9], 254, 26, accounts[4], 257, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([50,199,36,115,31,215,197,131,189,118,232,54,253,172,7,235,92,215,24,99,55,238,73,215,40,252,30,176,254,135,214,253], accounts[6], accounts[5], 4038714811, 10, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 254, 26, accounts[4], 257, 11,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([9,217,107,193,139,2,59,97,142,187,215,170,211,89,136,117,99,1,56,99,201,228,40,96,56,237,85,177,164,220,107,238], "0x0000000000000000000000000000000000000000", 2014223716,{from: accounts[0],value:2014223716});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([9,217,107,193,139,2,59,97,142,187,215,170,211,89,136,117,99,1,56,99,201,228,40,96,56,237,85,177,164,220,107,238], "0x0000000000000000000000000000000000000000", 2014223717,{from: accounts[0],value:2014223716}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([158,193,160,236,198,138,159,46,120,133,141,51,14,207,75,49,240,195,154,189,67,45,213,188,20,190,40,155,146,111,166,218], accounts[7], 2014223716,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([186,142,208,255,214,81,189,147,48,84,208,64,118,91,163,98,70,8,22,177,190,234,230,190,97,32,252,125,192,30,194,211],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([47,249,151,101,249,128,22,223,37,2,166,16,21,224,229,22,206,238,246,244,166,78,32,168,74,224,4,108,65,229,50,7], accounts[4],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([153,121,50,52,43,15,154,138,42,247,31,201,83,4,240,144,178,232,96,141,172,213,169,50,111,1,69,98,228,17,14,230], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([121,142,255,157,18,105,106,233,120,232,60,37,134,204,167,124,218,250,13,117,62,91,73,216,222,89,63,153,230,166,208,131], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([211,51,238,30,23,255,120,160,117,144,47,239,158,92,238,105,246,245,167,204,166,92,198,79,18,168,124,26,223,49,218,47], accounts[8],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(66, 66,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(66, 66,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(66, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[4],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[4],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[1],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([42,164,205,192,190,221,238,127,0,219,96,116,53,206,233,243,240,27,177,31,53,183,6,139,138,185,28,150,184,44,103,86],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([31,7,131,69,57,25,164,55,226,126,111,226,217,80,246,233,117,216,210,122,197,238,234,27,200,149,118,204,20,212,90,43],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([81,248,50,80,77,154,82,178,121,249,0,216,125,108,145,210,18,215,25,16,19,211,102,220,226,75,7,249,227,133,209,85],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([132,246,64,16,157,123,190,113,161,167,185,105,190,178,152,165,167,200,33,240,75,86,171,188,120,130,157,170,193,18,119,249],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([146,55,106,188,127,181,78,85,27,62,250,57,24,122,129,133,131,13,240,137,191,5,25,52,55,221,149,185,94,67,48,87],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([182,195,231,66,83,239,235,169,7,234,89,34,97,43,43,77,109,249,220,195,227,88,102,168,120,76,44,122,150,59,239,111],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([40,144,21,71,224,179,199,209,24,62,249,113,117,162,140,21,203,73,32,34,233,105,79,212,112,255,179,253,99,68,54,167],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([32,92,143,76,180,11,107,229,35,215,244,85,94,152,253,140,242,121,132,105,100,211,177,243,23,2,174,74,233,49,123,207],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([48,68,63,53,11,52,119,182,210,213,2,243,131,182,53,213,160,129,135,204,147,3,77,127,192,4,81,10,42,116,152,96],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([179,62,112,167,49,70,84,95,198,103,17,31,212,190,16,70,131,234,4,68,76,127,28,220,25,227,103,98,224,77,226,73],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([25,72,107,109,77,24,139,131,231,166,149,3,141,221,195,203,231,82,230,161,6,95,79,151,113,248,60,128,16,167,255,221], accounts[6],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([140,1,46,163,207,2,183,218,89,6,12,117,226,11,126,113,68,101,57,20,8,120,42,229,236,135,5,134,106,116,42,144], accounts[0],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([116,127,252,223,196,111,45,8,11,147,121,251,130,8,224,237,111,21,203,208,15,112,246,161,97,236,252,128,209,187,79,86],{from: accounts[0]});
  });
});
