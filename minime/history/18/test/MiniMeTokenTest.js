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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[8],95,"ERC1820_ACCEPT_MAGIC",95,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[8],95,"ERC1820_ACCEPT_MAGIC",95,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]}');
  });
  
  it('Should execute transfer(address,uint256) WHEN transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractMiniMeToken.transfer(accounts[9], 2014223714,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,1532892063,"k5ik9l",4,"\x19Ethereum Signed Message:\n32",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[9], 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail transfer(address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+509,"UsesExample",5,"gn7x4d",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transfer(accounts[9], 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender!=controller,transfersEnabled==true,parentSnapShotBlock<block.number', async () => {
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let result = await contractMiniMeToken.transferFrom(accounts[1], accounts[5], 27,{from: accounts[3]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,254,"IsLibrary",4,"RevertWithReason",false,{from:accounts[3]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[1], accounts[5], 27,{from: accounts[3]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    await contractMiniMeToken.changeController(accounts[8],{from:accounts[0]});
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+207,"k5ik9l",18,"IsLibrary",false,{from:accounts[3]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[1], accounts[5], 27,{from: accounts[3]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN msg.sender==controller,parentSnapShotBlock<block.number', async () => {
    let result = await contractMiniMeToken.transferFrom(accounts[8], accounts[2], 97,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+38,"k5ik9l",27,"\x19Ethereum Signed Message:\n32",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.transferFrom(accounts[8], accounts[2], 97,{from: accounts[0]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractMiniMeToken.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall==true,transfersEnabled==true', async () => {
    let result = await contractMiniMeToken.approve(accounts[1], 257,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,27,"k5ik9l",27,"IsLibrary",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[1], 257,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256) WHEN FunctionCall!=true,transfersEnabled==true', async () => {
    let result = await contractMiniMeToken.approve(accounts[6], 2014223714,{from: accounts[0]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: transfersEnabled == true', async () => {
    let localMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,66,"ERC1820_ACCEPT_MAGIC",3,"\x19Ethereum Signed Message:\n32",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localMiniMeToken.approve(accounts[6], 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractMiniMeToken.allowance(accounts[3], accounts[4],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes)', async () => {
    let result = await contractMiniMeToken.approveAndCall(accounts[8], 5, [232,45,89,36,136,23,242,65,126,29,222,179,157,9,228,57,126,107,75,9,181,151,148,242,99,242,126,62,13,13,70,58],{from: accounts[0]});
  });
  it('Should execute totalSupply()', async () => {
    let result = await contractMiniMeToken.totalSupply({from: accounts[0]});
  });
  it('Should execute balanceOfAt(address,uint)', async () => {
    let result = await contractMiniMeToken.balanceOfAt(accounts[7], 9999,{from: accounts[0]});
  });
  it('Should execute totalSupplyAt(uint)', async () => {
    let result = await contractMiniMeToken.totalSupplyAt(1338,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock==0', async () => {
    let result = await contractMiniMeToken.createCloneToken("Example", 64, "IsLibrary", 0, false,{from: accounts[0]});
  });
  it('Should execute createCloneToken(string,uint8,string,uint,bool) WHEN _snapshotBlock!=0', async () => {
    let result = await contractMiniMeToken.createCloneToken("Example", 66, "\x19Ethereum Signed Message:\n32", 1336, false,{from: accounts[0]});
  });
  it('Should execute generateTokens(address,uint) WHEN msg.sender==controller', async () => {
    let result = await contractMiniMeToken.generateTokens(accounts[2], 10001,{from: accounts[0]});
  });
  it('Should fail generateTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.generateTokens(accounts[2], 10001,{from: accounts[9]}),'revert');
  });
  it('Should execute destroyTokens(address,uint) WHEN msg.sender==controller,curTotalSupply>=_amount,previousBalanceFrom>=_amount', async () => {
    let result = await contractMiniMeToken.destroyTokens(accounts[1], 3,{from: accounts[0]});
  });
  it('Should fail destroyTokens(address,uint) when NOT comply with: msg.sender == controller', async () => {
    let result = await truffleAssert.fails(contractMiniMeToken.destroyTokens(accounts[1], 3,{from: accounts[9]}),'revert');
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
