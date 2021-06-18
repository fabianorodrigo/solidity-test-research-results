const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(2,"3q53dtm",11,"3q53dtm",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(2,"3q53dtm",11,"3q53dtm",{from:accounts[0]}');
    contractButton = await Button.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(2,"3q53dtm",11,"3q53dtm",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[8], 0, [40,147,238,97,240,54,202,77,93,116,123,213,121,1,150,57,69,53,50,184,137,82,146,92,43,202,199,140,242,65,142,23],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 0, [40,147,238,97,240,54,202,77,93,116,123,213,121,1,150,57,69,53,50,184,137,82,146,92,43,202,199,140,242,65,142,23],{from: accounts[0]}),'revert');
  });
});
