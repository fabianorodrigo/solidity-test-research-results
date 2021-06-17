const truffleAssert = require('truffle-assertions');
const Controlled = artifacts.require("Controlled");
const MiniMeToken = artifacts.require("MiniMeToken");
const MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");

contract("MiniMeTokenFactory",(accounts)=>{
  let trace = false;
  let contractMiniMeTokenFactory = null;
  let contractControlled = null;
  let contractMiniMeToken = null;
  beforeEach(async () => {
    contractMiniMeTokenFactory = await MiniMeTokenFactory.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeTokenFactory.new({from: accounts[0]}');
    contractControlled = await Controlled.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Controlled.new({from:accounts[0]}');
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[3],66,"ERC1820_ACCEPT_MAGIC",64,"RevertWithReason",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[3],66,"ERC1820_ACCEPT_MAGIC",64,"RevertWithReason",true,{from:accounts[0]}');
  });
  
  it('Should execute createCloneToken(address,uint,string,uint8,string,bool)', async () => {
    let result = await contractMiniMeTokenFactory.createCloneToken(accounts[7], 1, "PayableExample", 66, "PayableExample", false,{from: accounts[0]});
  });
});
