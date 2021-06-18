const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(6,"zjcrx",4,"7s8hr",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(6,"zjcrx",4,"7s8hr",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[2], 759, [152,189,14,187,191,33,123,240,12,69,139,67,159,132,214,27,160,70,117,191,176,104,23,82,195,219,188,120,182,164,157,220],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[2], 757, [152,189,14,187,191,33,123,240,12,69,139,67,159,132,214,27,160,70,117,191,176,104,23,82,195,219,188,120,182,164,157,220],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
