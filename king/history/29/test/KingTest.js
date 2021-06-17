const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(759,"31ol0o",10,"31ol0o",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"31ol0o",10,"31ol0o",{from:accounts[0]}');
    contractKing = await King.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[9],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[1], 758, [143,159,49,170,42,20,96,84,110,83,165,26,11,95,181,43,170,49,0,183,9,174,4,211,89,173,72,242,165,164,141,72],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[1], 757, [143,159,49,170,42,20,96,84,110,83,165,26,11,95,181,43,170,49,0,183,9,174,4,211,89,173,72,242,165,164,141,72],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
