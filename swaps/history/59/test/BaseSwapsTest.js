const truffleAssert = require('truffle-assertions');
const BaseSwaps = artifacts.require("BaseSwaps");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");

contract("BaseSwaps",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractBaseSwaps = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    BaseSwaps.link("SafeMath",contractSafeMath.address);
    contractBaseSwaps = await BaseSwaps.new(accounts[5],accounts[7],accounts[2],65,10000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+401,{from:accounts[0]});
    if(trace) console.log('SUCESSO: BaseSwaps.new(accounts[5],accounts[7],accounts[2],65,10000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+401,{from:accounts[0]}');
  });
  
  it('Should execute fallback() WHEN quoteAddress==0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamp', async () => {
    let localBaseSwaps = await BaseSwaps.new(accounts[3],accounts[7],"0x0000000000000000000000000000000000000000",1532892064,10,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+361,{from:accounts[0]});
    let result = await localBaseSwaps.sendTransaction({from: accounts[0]});
  });
  it('Should fail fallback() when NOT comply with: quoteAddress == 0x0000000000000000000000000000000000000000', async () => {
    let localBaseSwaps = await BaseSwaps.new(accounts[1],accounts[9],accounts[1],254,10001,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+833,{from:accounts[0]});
    let result = await truffleAssert.fails(localBaseSwaps.sendTransaction({from: accounts[0]}),'revert');
  });
  it('Should execute depositBaseTokens(uint) WHEN _value<=allowance,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamp', async () => {
    let result = await contractBaseSwaps.depositBaseTokens(4,{from: accounts[0]});
  });
  it('Should execute depositQuoteTokens(uint) WHEN _value<=allowance,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamp', async () => {
    let result = await contractBaseSwaps.depositQuoteTokens(1532892063,{from: accounts[0]});
  });
  it('Should execute cancel() WHEN msg.sender==_owner,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractBaseSwaps.cancel({from: accounts[0]});
  });
  it('Should fail cancel() when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractBaseSwaps.cancel({from: accounts[9]}),'revert');
  });
  it('Should fail cancel() when NOT comply with: isSwapped != true', async () => {
    let localBaseSwaps = await BaseSwaps.new(accounts[3],accounts[9],"0x0000000000000000000000000000000000000000",96,2,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+483,{from:accounts[0]});
    await localBaseSwaps.sendTransaction({from:accounts[0]});
    let result = await truffleAssert.fails(localBaseSwaps.cancel({from: accounts[0]}),'revert');
  });
  it('Should execute refundBase() WHEN isSwapped!=true', async () => {
    let result = await contractBaseSwaps.refundBase({from: accounts[0]});
  });
  it('Should fail refundBase() when NOT comply with: isSwapped != true', async () => {
    let localBaseSwaps = await BaseSwaps.new(accounts[3],accounts[1],"0x0000000000000000000000000000000000000000",5,26,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+917,{from:accounts[0]});
    await localBaseSwaps.sendTransaction({from:accounts[0]});
    let result = await truffleAssert.fails(localBaseSwaps.refundBase({from: accounts[0]}),'revert');
  });
  it('Should execute refundQuote() WHEN isSwapped!=true', async () => {
    let result = await contractBaseSwaps.refundQuote({from: accounts[0]});
  });
  it('Should fail refundQuote() when NOT comply with: isSwapped != true', async () => {
    let localBaseSwaps = await BaseSwaps.new(accounts[6],"0x0000000000000000000000000000000000000000",accounts[0],29,1,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+908,{from:accounts[0]});
    await localBaseSwaps.sendTransaction({from:accounts[0]});
    let result = await truffleAssert.fails(localBaseSwaps.refundQuote({from: accounts[0]}),'revert');
  });
  it('Should execute baseLimit()', async () => {
    let result = await contractBaseSwaps.baseLimit({from: accounts[0]});
  });
  it('Should execute quoteLimit()', async () => {
    let result = await contractBaseSwaps.quoteLimit({from: accounts[0]});
  });
  it('Should execute baseRaised()', async () => {
    let result = await contractBaseSwaps.baseRaised({from: accounts[0]});
  });
  it('Should execute quoteRaised()', async () => {
    let result = await contractBaseSwaps.quoteRaised({from: accounts[0]});
  });
  it('Should execute baseInvestors()', async () => {
    let result = await contractBaseSwaps.baseInvestors({from: accounts[0]});
  });
  it('Should execute quoteInvestors()', async () => {
    let result = await contractBaseSwaps.quoteInvestors({from: accounts[0]});
  });
  it('Should execute baseUserInvestment(address)', async () => {
    let result = await contractBaseSwaps.baseUserInvestment(accounts[3],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(address)', async () => {
    let result = await contractBaseSwaps.quoteUserInvestment(accounts[2],{from: accounts[0]});
  });
  it('Should execute isBaseFilled()', async () => {
    let result = await contractBaseSwaps.isBaseFilled({from: accounts[0]});
  });
  it('Should execute isQuoteFilled()', async () => {
    let result = await contractBaseSwaps.isQuoteFilled({from: accounts[0]});
  });
});
