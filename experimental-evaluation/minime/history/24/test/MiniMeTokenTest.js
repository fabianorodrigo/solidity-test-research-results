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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[2],19,"UsesExample",26,"RevertWithReason",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[2],19,"UsesExample",26,"RevertWithReason",true,{from:accounts[0]}');
  });
  
  it('Should execute transfer(address,uint256) WHEN transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractMiniMeToken.transfer(accounts[1], 255,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,3,"UsesExample",2,"IsLibrary",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[1], 255,{from: accounts[0]}),'revert');
  });
  it('Should fail transfer(address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+955,"PayableExample",1,"RevertWithReason",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[1], 255,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender!=controller,transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let result = await contractMiniMeToken.transferFrom(accounts[7], accounts[5], 19,{from: accounts[7]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,256,"IsLibrary",65,"ERC1820_ACCEPT_MAGIC",false,{from:accounts[7]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[7], accounts[5], 19,{from: accounts[7]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+442,"itp2s",17,"\x19Ethereum Signed Message:\n32",false,{from:accounts[7]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[7], accounts[5], 19,{from: accounts[7]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender==controller,parentSnapShotBlock<block.number', async () => {
    let result = await contractMiniMeToken.transferFrom(accounts[1], accounts[3], 2,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+217,"IsLibrary",18,"Example",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[1], accounts[3], 2,{from: accounts[0]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractMiniMeToken.balanceOf(accounts[2],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall==true,transfersEnabled==true', async () => {
    let result = await contractMiniMeToken.approve(accounts[9], 3,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,6,"RevertWithReason",2,"pdf099",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[9], 3,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall!=true,transfersEnabled==true', async () => {
    let result = await contractMiniMeToken.approve(accounts[4], 255,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,256,"ERC1820_ACCEPT_MAGIC",5,"Example",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[4], 255,{from: accounts[0]}),'revert');
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractMiniMeToken.allowance(accounts[7], accounts[6],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes)', async () => {
    let result = await contractMiniMeToken.approveAndCall(accounts[0], 28, [49,244,210,58,140,113,131,213,46,187,26,86,58,235,65,49,148,246,119,71,223,214,11,186,4,144,51,238,85,153,240,56],{from: accounts[0]});
  });
  it('Should execute totalSupply()', async () => {
    let result = await contractMiniMeToken.totalSupply({from: accounts[0]});
  });
  it('Should execute balanceOfAt(address,uint)', async () => {
    let result = await contractMiniMeToken.balanceOfAt(accounts[3], 1532892063,{from: accounts[0]});
  });
  it('Should execute totalSupplyAt(uint)', async () => {
    let result = await contractMiniMeToken.totalSupplyAt(257,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock==0', async () => {
    let result = await contractMiniMeToken.createCloneToken("itp2s", 28, "itp2s", 0, true,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock!=0', async () => {
    let result = await contractMiniMeToken.createCloneToken("UsesExample", 28, "MMT_0.2", 29, true,{from: accounts[0]});
  });
  it('Should execute generateTokens(address,uint) WHEN msg.sender==controller', async () => {
    let result = await contractMiniMeToken.generateTokens(accounts[1], 19,{from: accounts[0]});
  });
  it('Should fail generateTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.generateTokens(accounts[1], 19,{from: accounts[9]}),'revert');
  });
  it('Should execute destroyTokens(address,uint) WHEN msg.sender==controller,curTotalSupply>=_amount,previousBalanceFrom>=_amount', async () => {
    let result = await contractMiniMeToken.destroyTokens(accounts[2], 66,{from: accounts[0]});
  });
  it('Should fail destroyTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.destroyTokens(accounts[2], 66,{from: accounts[9]}),'revert');
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
    let result = await contractMiniMeToken.claimTokens(accounts[9],{from: accounts[0]});
  });
  it('Should fail claimTokens(address) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.claimTokens(accounts[9],{from: accounts[9]}),'revert');
  });
});
