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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],29,"3z2tja",64,"PayableExample",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],29,"3z2tja",64,"PayableExample",false,{from:accounts[0]}');
  });
  
  it('Should execute transfer(address,uint256) WHEN transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,96,"jt44pe",97,"Example",true,{from:accounts[0]});
    let result = await localMiniMeToken.transfer(accounts[0], 10001,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,96,"\x19Ethereum Signed Message:\n32",3,"wcsxvq",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[0], 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail transfer(address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+141,"jt44pe",19,"Example",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[0], 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender!=controller,transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,29,"PayableExample",5,"UsesExample",true,{from:accounts[9]});
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let result = await localMiniMeToken.transferFrom(accounts[3], accounts[0], 5,{from: accounts[7]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,2,"ur5avl",27,"\x19Ethereum Signed Message:\n32",false,{from:accounts[7]});
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[3], accounts[0], 5,{from: accounts[7]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+482,"MMT_0.2",65,"wcsxvq",false,{from:accounts[7]});
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[3], accounts[0], 5,{from: accounts[7]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender==controller,parentSnapShotBlock<block.number', async () => {
    let result = await contractMiniMeToken.transferFrom(accounts[9], accounts[9], 257,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+755,"ur5avl",6,"\x19Ethereum Signed Message:\n32",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[9], accounts[9], 257,{from: accounts[0]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractMiniMeToken.balanceOf(accounts[2],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall==true,transfersEnabled==true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,2,"wcsxvq",96,"wcsxvq",true,{from:accounts[0]});
    let result = await localMiniMeToken.approve(accounts[3], 2014223714,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,27,"MMT_0.2",96,"RevertWithReason",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[3], 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall!=true,transfersEnabled==true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,4,"3z2tja",5,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]});
    let result = await localMiniMeToken.approve(accounts[7], 97,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,1532892064,"Example",26,"Example",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[7], 97,{from: accounts[0]}),'revert');
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractMiniMeToken.allowance(accounts[6], accounts[7],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes)', async () => {
    let result = await contractMiniMeToken.approveAndCall(accounts[0], 27, [225,199,22,183,165,123,169,90,166,255,109,26,224,221,132,213,35,75,80,20,162,248,102,138,32,96,228,142,91,154,134,178],{from: accounts[0]});
  });
  it('Should execute totalSupply()', async () => {
    let result = await contractMiniMeToken.totalSupply({from: accounts[0]});
  });
  it('Should execute balanceOfAt(address,uint)', async () => {
    let result = await contractMiniMeToken.balanceOfAt(accounts[8], 18,{from: accounts[0]});
  });
  it('Should execute totalSupplyAt(uint)', async () => {
    let result = await contractMiniMeToken.totalSupplyAt(254,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock==0', async () => {
    let result = await contractMiniMeToken.createCloneToken("RevertWithReason", 6, "MMT_0.2", 0, false,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock!=0', async () => {
    let result = await contractMiniMeToken.createCloneToken("PayableExample", 1, "ERC1820_ACCEPT_MAGIC", 10001, false,{from: accounts[0]});
  });
  it('Should execute generateTokens(address,uint) WHEN msg.sender==controller', async () => {
    let result = await contractMiniMeToken.generateTokens(accounts[0], 26,{from: accounts[0]});
  });
  it('Should fail generateTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.generateTokens(accounts[0], 26,{from: accounts[9]}),'revert');
  });
  it('Should execute destroyTokens(address,uint) WHEN msg.sender==controller,curTotalSupply>=_amount,previousBalanceFrom>=_amount', async () => {
    let result = await contractMiniMeToken.destroyTokens(accounts[6], 2014223716,{from: accounts[0]});
  });
  it('Should fail destroyTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.destroyTokens(accounts[6], 2014223716,{from: accounts[9]}),'revert');
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
    let result = await contractMiniMeToken.claimTokens(accounts[7],{from: accounts[0]});
  });
  it('Should fail claimTokens(address) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.claimTokens(accounts[7],{from: accounts[9]}),'revert');
  });
});
