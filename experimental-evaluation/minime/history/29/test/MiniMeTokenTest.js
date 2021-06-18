const truffleAssert = require('truffle-assertions');
const Controlled = artifacts.require("Controlled");
const MiniMeToken = artifacts.require("MiniMeToken");
const MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");

contract("MiniMeToken",(accounts)=>{
  let trace = false;
  let contractMiniMeTokenFactory = null;
  let contractControlled = null;
  let contractMiniMeToken = null;
  beforeEach(async () => {
    contractMiniMeTokenFactory = await MiniMeTokenFactory.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeTokenFactory.new({from: accounts[0]}');
    contractControlled = await Controlled.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Controlled.new({from:accounts[0]}');
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[5],66,"UsesExample",27,"RevertWithReason",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[5],66,"UsesExample",27,"RevertWithReason",false,{from:accounts[0]}');
  });
  
  it('Should execute transfer(address,uint256) WHEN transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,10000,"MMT_0.2",18,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]});
    let result = await localMiniMeToken.transfer(accounts[5], 2014223714,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,10000,"ERC1820_ACCEPT_MAGIC",97,"Example",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[5], 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail transfer(address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+184,"PayableExample",27,"MMT_0.2",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[5], 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender!=controller,transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,66,"PayableExample",255,"UsesExample",true,{from:accounts[6]});
    await contractMiniMeToken.changeController(accounts[1],{from:accounts[0]});
    let result = await localMiniMeToken.transferFrom(accounts[3], accounts[0], 3,{from: accounts[4]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,10000,"k7s8n",29,"MMT_0.2",false,{from:accounts[4]});
    await contractMiniMeToken.changeController(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[3], accounts[0], 3,{from: accounts[4]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+912,"UsesExample",66,"IsLibrary",false,{from:accounts[4]});
    await contractMiniMeToken.changeController(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[3], accounts[0], 3,{from: accounts[4]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender==controller,parentSnapShotBlock<block.number', async () => {
    let result = await contractMiniMeToken.transferFrom(accounts[7], accounts[4], 6,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+805,"Example",3,"IsLibrary",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[7], accounts[4], 6,{from: accounts[0]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractMiniMeToken.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall==true,transfersEnabled==true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,65,"8avwo",95,"RevertWithReason",true,{from:accounts[0]});
    let result = await localMiniMeToken.approve(accounts[1], 2014223715,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,27,"e12mb",97,"RevertWithReason",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[1], 2014223715,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall!=true,transfersEnabled==true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,9999,"MMT_0.2",65,"k7s8n",true,{from:accounts[0]});
    let result = await localMiniMeToken.approve(accounts[4], 4,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,29,"MMT_0.2",3,"Example",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[4], 4,{from: accounts[0]}),'revert');
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractMiniMeToken.allowance(accounts[8], accounts[0],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes)', async () => {
    let result = await contractMiniMeToken.approveAndCall(accounts[7], 257, [15,89,31,190,66,82,95,37,91,11,2,236,183,18,99,106,230,46,167,69,66,91,135,4,11,18,84,245,209,60,173,255],{from: accounts[0]});
  });
  it('Should execute totalSupply()', async () => {
    let result = await contractMiniMeToken.totalSupply({from: accounts[0]});
  });
  it('Should execute balanceOfAt(address,uint)', async () => {
    let result = await contractMiniMeToken.balanceOfAt(accounts[1], 66,{from: accounts[0]});
  });
  it('Should execute totalSupplyAt(uint)', async () => {
    let result = await contractMiniMeToken.totalSupplyAt(1,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock==0', async () => {
    let result = await contractMiniMeToken.createCloneToken("MMT_0.2", 29, "UsesExample", 0, false,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock!=0', async () => {
    let result = await contractMiniMeToken.createCloneToken("RevertWithReason", 6, "\x19Ethereum Signed Message:\n32", 10000, true,{from: accounts[0]});
  });
  it('Should execute generateTokens(address,uint) WHEN msg.sender==controller', async () => {
    let result = await contractMiniMeToken.generateTokens(accounts[4], 2014223716,{from: accounts[0]});
  });
  it('Should fail generateTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.generateTokens(accounts[4], 2014223716,{from: accounts[9]}),'revert');
  });
  it('Should execute destroyTokens(address,uint) WHEN msg.sender==controller,curTotalSupply>=_amount,previousBalanceFrom>=_amount', async () => {
    let result = await contractMiniMeToken.destroyTokens(accounts[9], 19,{from: accounts[0]});
  });
  it('Should fail destroyTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.destroyTokens(accounts[9], 19,{from: accounts[9]}),'revert');
  });
  it('Should execute enableTransfers(bool) WHEN msg.sender==controller', async () => {
    let result = await contractMiniMeToken.enableTransfers(true,{from: accounts[0]});
  });
  it('Should fail enableTransfers(bool) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.enableTransfers(true,{from: accounts[9]}),'revert');
  });
  it('Should execute fallback()', async () => {
    let result = await contractMiniMeToken.sendTransaction({from: accounts[0]});
  });
  it('Should execute claimTokens(address) WHEN _token==0x0000000000000000000000000000000000000000,msg.sender==controller', async () => {
    let result = await contractMiniMeToken.claimTokens("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should fail claimTokens(address) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.claimTokens("0x0000000000000000000000000000000000000000",{from: accounts[9]}),'revert');
  });
  it('Should execute claimTokens(address) WHEN _token!=0x0000000000000000000000000000000000000000,msg.sender==controller', async () => {
    let result = await contractMiniMeToken.claimTokens(accounts[7],{from: accounts[0]});
  });
  it('Should fail claimTokens(address) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.claimTokens(accounts[7],{from: accounts[9]}),'revert');
  });
});
