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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],0,"ERC1820_ACCEPT_MAGIC",0,"IsLibrary",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],0,"ERC1820_ACCEPT_MAGIC",0,"IsLibrary",true,{from:accounts[0]}');
  });
  
  it('Should execute transfer(address,uint256) WHEN transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractMiniMeToken.transfer(accounts[1], 96,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,1532892062,"Example",18,"IsLibrary",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[1], 96,{from: accounts[0]}),'revert');
  });
  it('Should fail transfer(address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+249,"IsLibrary",26,"MMT_0.2",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[1], 96,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender!=controller,transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    await contractMiniMeToken.changeController(accounts[4],{from:accounts[0]});
    let result = await contractMiniMeToken.transferFrom(accounts[2], accounts[2], 1338,{from: accounts[1]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    await contractMiniMeToken.changeController(accounts[4],{from:accounts[0]});
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,5,"MMT_0.2",29,"ERC1820_ACCEPT_MAGIC",false,{from:accounts[1]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[2], accounts[2], 1338,{from: accounts[1]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    await contractMiniMeToken.changeController(accounts[4],{from:accounts[0]});
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+161,"\x19Ethereum Signed Message:\n32",27,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[1]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[2], accounts[2], 1338,{from: accounts[1]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender==controller,parentSnapShotBlock<block.number', async () => {
    let result = await contractMiniMeToken.transferFrom(accounts[8], accounts[3], 28,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+979,"Example",6,"MMT_0.2",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[8], accounts[3], 28,{from: accounts[0]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractMiniMeToken.balanceOf(accounts[7],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall==true,transfersEnabled==true', async () => {
    let result = await contractMiniMeToken.approve(accounts[6], 9999,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,27,"\x19Ethereum Signed Message:\n32",65,"RevertWithReason",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[6], 9999,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall!=true,transfersEnabled==true', async () => {
    let result = await contractMiniMeToken.approve(accounts[8], 254,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,10001,"RevertWithReason",19,"IsLibrary",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[8], 254,{from: accounts[0]}),'revert');
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractMiniMeToken.allowance(accounts[7], accounts[4],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes)', async () => {
    let result = await contractMiniMeToken.approveAndCall(accounts[2], 4, [145,128,137,16,111,161,209,102,127,59,147,95,65,129,208,50,123,172,134,158,98,12,211,208,242,70,78,242,109,35,198,185],{from: accounts[0]});
  });
  it('Should execute totalSupply()', async () => {
    let result = await contractMiniMeToken.totalSupply({from: accounts[0]});
  });
  it('Should execute balanceOfAt(address,uint)', async () => {
    let result = await contractMiniMeToken.balanceOfAt(accounts[7], 1,{from: accounts[0]});
  });
  it('Should execute totalSupplyAt(uint)', async () => {
    let result = await contractMiniMeToken.totalSupplyAt(4,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock==0', async () => {
    let result = await contractMiniMeToken.createCloneToken("PayableExample", 19, "PayableExample", 0, false,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock!=0', async () => {
    let result = await contractMiniMeToken.createCloneToken("IsLibrary", 96, "\x19Ethereum Signed Message:\n32", 97, true,{from: accounts[0]});
  });
  it('Should execute generateTokens(address,uint) WHEN msg.sender==controller', async () => {
    let result = await contractMiniMeToken.generateTokens(accounts[9], 255,{from: accounts[0]});
  });
  it('Should fail generateTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.generateTokens(accounts[9], 255,{from: accounts[9]}),'revert');
  });
  it('Should execute destroyTokens(address,uint) WHEN msg.sender==controller,curTotalSupply>=_amount,previousBalanceFrom>=_amount', async () => {
    let result = await contractMiniMeToken.destroyTokens(accounts[2], 2,{from: accounts[0]});
  });
  it('Should fail destroyTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.destroyTokens(accounts[2], 2,{from: accounts[9]}),'revert');
  });
  it('Should execute enableTransfers(bool) WHEN msg.sender==controller', async () => {
    let result = await contractMiniMeToken.enableTransfers(false,{from: accounts[0]});
  });
  it('Should fail enableTransfers(bool) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.enableTransfers(false,{from: accounts[9]}),'revert');
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
    let result = await contractMiniMeToken.claimTokens(accounts[6],{from: accounts[0]});
  });
  it('Should fail claimTokens(address) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.claimTokens(accounts[6],{from: accounts[9]}),'revert');
  });
});
