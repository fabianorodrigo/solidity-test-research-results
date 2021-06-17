const truffleAssert = require('truffle-assertions');
const Controlled = artifacts.require("Controlled");
const MiniMeToken = artifacts.require("MiniMeToken");
const MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");

contract("Controlled",(accounts)=>{
  let trace = false;
  let contractMiniMeTokenFactory = null;
  let contractControlled = null;
  let contractMiniMeToken = null;
  beforeEach(async () => {
    contractMiniMeTokenFactory = await MiniMeTokenFactory.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeTokenFactory.new({from: accounts[0]}');
    contractControlled = await Controlled.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Controlled.new({from:accounts[0]}');
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],2014223714,"MMT_0.2",95,"MMT_0.2",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],2014223714,"MMT_0.2",95,"MMT_0.2",false,{from:accounts[0]}');
  });
  
  it('Should execute changeController(address) WHEN msg.sender==controller', async () => {
    let result = await contractControlled.changeController(accounts[0],{from: accounts[0]});
  });
  it('Should fail changeController(address) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractControlled.changeController(accounts[0],{from: accounts[9]}),'revert');
  });
});
