const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(759,"i1t2s",4,"i1t2s",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"i1t2s",4,"i1t2s",{from:accounts[0]}');
    contractKing = await King.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[3],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[0], 758, [193,54,173,127,84,134,252,140,65,23,226,222,72,29,201,214,189,202,56,48,157,129,59,219,134,192,17,5,36,109,87,118],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[0], 757, [193,54,173,127,84,134,252,140,65,23,226,222,72,29,201,214,189,202,56,48,157,129,59,219,134,192,17,5,36,109,87,118],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
