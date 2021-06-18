const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(758,"zxvj1",0,"zxvj1",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"zxvj1",0,"zxvj1",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[2], 757,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[2], 757,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[6],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[2], 11,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[8], 9, 0,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[5], accounts[9],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[7], 9,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 9,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[8], accounts[4], 759,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[8], "0x0000000000000000000000000000000000000000", 759,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[1], 1, [224,247,143,89,39,254,189,250,99,167,225,161,105,39,67,193,168,72,155,24,135,239,48,79,188,210,167,105,42,226,212,94],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[6], 0, [154,133,250,77,203,18,92,207,107,170,47,59,19,204,226,64,11,197,87,152,37,243,112,31,95,49,51,239,116,122,1,28],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(759,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[1], 0,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[8], 758, [227,56,179,54,18,103,120,37,133,184,9,216,111,32,182,193,1,186,32,235,119,95,164,6,172,109,238,163,0,145,151,101], "zxvj1",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 758, [227,56,179,54,18,103,120,37,133,184,9,216,111,32,182,193,1,186,32,235,119,95,164,6,172,109,238,163,0,145,151,101], "zxvj1",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[3], 0, [172,70,75,107,80,92,165,88,121,109,86,128,176,61,58,183,101,134,248,222,78,17,221,253,196,163,34,242,247,124,57,232], "ejlqwo",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 0, [172,70,75,107,80,92,165,88,121,109,86,128,176,61,58,183,101,134,248,222,78,17,221,253,196,163,34,242,247,124,57,232], "ejlqwo",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[7], 10, [225,206,58,100,138,126,61,120,236,31,252,165,122,146,195,149,7,227,169,32,27,191,28,13,106,253,70,251,60,182,41,178],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 10, [225,206,58,100,138,126,61,120,236,31,252,165,122,146,195,149,7,227,169,32,27,191,28,13,106,253,70,251,60,182,41,178],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[5], 759, [17,47,158,248,225,24,152,3,155,183,190,135,118,43,151,113,58,36,178,174,119,218,38,101,79,68,70,181,173,193,29,163],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 759, [17,47,158,248,225,24,152,3,155,183,190,135,118,43,151,113,58,36,178,174,119,218,38,101,79,68,70,181,173,193,29,163],{from: accounts[0]}),'revert');
  });
});
