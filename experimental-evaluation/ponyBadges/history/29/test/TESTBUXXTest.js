const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(9,"ykkfrs",1,"esf9ae",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"ykkfrs",1,"esf9ae",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[3], 11,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[3], 11,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[1],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[1], 11,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[3], 0, 759,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[1], accounts[4],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[4], 0,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 0,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[1], accounts[1], 758,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[1], "0x0000000000000000000000000000000000000000", 758,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[6], 10, [69,191,56,53,213,105,228,185,46,68,58,84,36,19,130,106,243,244,79,10,67,30,230,166,146,165,224,78,15,92,161,56],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[3], 9, [113,191,36,185,154,143,57,60,156,65,103,38,224,229,225,168,198,156,102,68,140,127,77,202,253,12,16,133,19,65,23,100],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(758,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[3], 11,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[0], 11, [31,24,11,181,29,148,103,162,74,52,241,249,67,146,122,78,70,231,101,26,234,115,60,142,101,252,57,98,27,51,103,103], "ykkfrs",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 11, [31,24,11,181,29,148,103,162,74,52,241,249,67,146,122,78,70,231,101,26,234,115,60,142,101,252,57,98,27,51,103,103], "ykkfrs",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[6], 0, [124,164,57,83,82,138,152,240,72,54,63,227,119,89,83,155,58,50,17,208,132,25,182,113,19,85,119,85,230,252,108,145], "hw1qeh",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 0, [124,164,57,83,82,138,152,240,72,54,63,227,119,89,83,155,58,50,17,208,132,25,182,113,19,85,119,85,230,252,108,145], "hw1qeh",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[2], 759, [212,221,147,121,191,138,101,79,123,50,11,155,54,4,46,236,6,104,122,60,27,3,241,36,197,50,150,177,65,3,177,9],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 759, [212,221,147,121,191,138,101,79,123,50,11,155,54,4,46,236,6,104,122,60,27,3,241,36,197,50,150,177,65,3,177,9],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[2], 1, [73,142,152,10,64,209,102,199,36,160,188,67,8,167,116,175,93,41,115,15,129,159,69,233,161,69,155,244,231,112,21,166],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 1, [73,142,152,10,64,209,102,199,36,160,188,67,8,167,116,175,93,41,115,15,129,159,69,233,161,69,155,244,231,112,21,166],{from: accounts[0]}),'revert');
  });
});
