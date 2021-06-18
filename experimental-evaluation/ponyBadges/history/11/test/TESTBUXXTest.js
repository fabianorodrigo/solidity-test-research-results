const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(0,"bwnvle",11,"t7k7ik",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"bwnvle",11,"t7k7ik",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[5],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[4], 759,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[4], 759,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[7],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[4], 11,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[9], 1, 758,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[2], accounts[0],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[0], 758,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 758,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[9], accounts[1], 758,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[9], "0x0000000000000000000000000000000000000000", 758,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[9], 757, [152,104,74,167,32,155,118,184,159,97,197,178,54,188,155,242,73,194,233,159,173,184,194,44,80,142,87,56,222,219,48,152],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[7], 757, [3,41,113,31,124,118,139,169,95,111,153,151,162,189,31,126,47,48,151,137,243,37,153,197,230,231,87,147,116,19,211,149],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(9,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[8], 11,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[4], 758, [156,40,98,131,220,227,95,63,27,97,191,82,1,144,43,13,242,100,220,126,53,191,137,176,242,205,221,41,40,150,66,166], "t7k7ik",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 758, [156,40,98,131,220,227,95,63,27,97,191,82,1,144,43,13,242,100,220,126,53,191,137,176,242,205,221,41,40,150,66,166], "t7k7ik",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[5], 1, [164,134,241,231,76,196,246,168,107,97,170,208,184,21,81,150,166,185,242,19,33,84,221,242,187,200,121,72,179,197,61,144], "bwnvle",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 1, [164,134,241,231,76,196,246,168,107,97,170,208,184,21,81,150,166,185,242,19,33,84,221,242,187,200,121,72,179,197,61,144], "bwnvle",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[6], 9, [62,244,76,106,64,246,83,181,184,29,160,79,175,44,192,155,171,175,243,83,82,254,85,168,214,84,6,142,75,169,201,196],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 9, [62,244,76,106,64,246,83,181,184,29,160,79,175,44,192,155,171,175,243,83,82,254,85,168,214,84,6,142,75,169,201,196],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[7], 11, [14,135,21,67,190,229,115,198,137,195,133,229,176,225,126,86,242,29,247,31,154,42,174,2,99,60,127,63,45,61,167,199],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 11, [14,135,21,67,190,229,115,198,137,195,133,229,176,225,126,86,242,29,247,31,154,42,174,2,99,60,127,63,45,61,167,199],{from: accounts[0]}),'revert');
  });
});
