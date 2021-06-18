const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"yed4e",2,"yed4e",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"yed4e",2,"yed4e",{from:accounts[0]}');
    contractButton = await Button.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[9],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[1], 9,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[1], 9,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[3],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[7], 3,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[2], 11, 230,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[3], accounts[4],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[7], 2,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 2,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[6], accounts[1], 231,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[6], "0x0000000000000000000000000000000000000000", 231,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[3], 0, [54,178,116,64,194,2,125,246,5,239,138,52,85,251,73,134,230,250,168,160,190,97,48,70,39,62,146,228,192,26,225,94],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[1], 9, [131,187,90,50,103,240,208,30,113,114,213,66,45,155,76,45,184,17,99,255,222,30,91,236,112,213,238,179,163,66,138,17],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(1,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[5], 10,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[4], 10, [104,238,209,49,190,252,128,130,89,74,229,76,76,56,48,21,147,66,194,195,220,152,167,119,78,17,235,138,88,112,106,255], "yed4e",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 10, [104,238,209,49,190,252,128,130,89,74,229,76,76,56,48,21,147,66,194,195,220,152,167,119,78,17,235,138,88,112,106,255], "yed4e",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[7], 10, [21,225,100,21,219,34,61,108,62,15,39,6,54,71,58,18,155,197,115,204,199,223,34,15,52,130,130,99,173,129,0,37], "yed4e",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 10, [21,225,100,21,219,34,61,108,62,15,39,6,54,71,58,18,155,197,115,204,199,223,34,15,52,130,130,99,173,129,0,37], "yed4e",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[2], 3, [145,235,106,225,146,19,225,31,215,76,161,228,167,165,30,200,89,105,119,114,135,252,150,151,176,121,76,103,136,196,213,31],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 3, [145,235,106,225,146,19,225,31,215,76,161,228,167,165,30,200,89,105,119,114,135,252,150,151,176,121,76,103,136,196,213,31],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[4], 10, [152,213,104,247,27,185,148,113,13,56,115,32,45,90,25,179,80,208,240,139,252,125,122,19,170,41,121,21,230,198,32,30],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 10, [152,213,104,247,27,185,148,113,13,56,115,32,45,90,25,179,80,208,240,139,252,125,122,19,170,41,121,21,230,198,32,30],{from: accounts[0]}),'revert');
  });
});
