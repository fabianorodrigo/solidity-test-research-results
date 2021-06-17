const truffleAssert = require('truffle-assertions');
const Example = artifacts.require("Example");
const SafeMath = artifacts.require("SafeMath");
const Token = artifacts.require("Token");
const ProxySafeMath = artifacts.require("ProxySafeMath");
const ProxyToken = artifacts.require("ProxyToken");

contract("Example",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractToken = null;
  let contractExample = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Token.link("SafeMath",contractSafeMath.address);
    contractToken = await Token.new({from:accounts[3]});
    if(trace) console.log('SUCESSO: Token.new({from:accounts[3]}');
    contractExample = await Example.new(contractToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Example.new(contractToken.address,{from:accounts[0]}');
  });
  
  it('Should execute tryTransferFrom(address,address,uint256) WHEN success==true', async () => {
    let result = await contractExample.tryTransferFrom(accounts[9], accounts[1], 1,{from: accounts[0]});
  });
  it('Should execute tryTransferFrom(address,address,uint256) WHEN success!=true', async () => {
    let result = await contractExample.tryTransferFrom(accounts[7], accounts[6], 2,{from: accounts[0]});
  });
});
