const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(0,"6kv4gv",3,"6kv4gv",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"6kv4gv",3,"6kv4gv",{from:accounts[0]}');
    contractButton = await Button.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[4],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[8], 2,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[8], 2,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[4],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[9], 231,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[0], 9, 3,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[3], accounts[2],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[7], 1,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[5], accounts[4], 9,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[5], "0x0000000000000000000000000000000000000000", 9,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[4], 9, [33,195,57,175,235,204,48,177,54,148,227,198,222,165,48,180,129,208,136,139,188,2,254,192,91,67,159,225,105,21,171,196],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[7], 230, [93,247,255,103,214,245,3,167,101,64,57,29,142,70,177,248,159,168,191,252,165,94,182,126,86,169,231,120,73,26,123,51],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(9,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[2], 10,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[3], 10, [164,246,171,104,87,145,243,115,45,255,192,36,199,238,15,13,143,5,74,126,196,214,131,166,207,42,161,125,252,18,211,19], "6kv4gv",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 10, [164,246,171,104,87,145,243,115,45,255,192,36,199,238,15,13,143,5,74,126,196,214,131,166,207,42,161,125,252,18,211,19], "6kv4gv",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[3], 1, [209,170,51,68,69,112,67,77,60,14,30,73,171,39,31,45,80,129,209,64,144,81,209,240,206,245,66,29,165,255,30,225], "nxkwn",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 1, [209,170,51,68,69,112,67,77,60,14,30,73,171,39,31,45,80,129,209,64,144,81,209,240,206,245,66,29,165,255,30,225], "nxkwn",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[2], 3, [198,229,102,93,243,71,149,129,255,123,205,127,114,174,243,170,192,39,150,9,175,189,10,158,177,197,88,116,252,115,49,75],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 3, [198,229,102,93,243,71,149,129,255,123,205,127,114,174,243,170,192,39,150,9,175,189,10,158,177,197,88,116,252,115,49,75],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[2], 231, [201,83,136,210,231,89,151,228,187,9,6,26,3,241,1,213,103,77,50,196,46,176,168,135,32,183,200,139,27,19,47,197],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 231, [201,83,136,210,231,89,151,228,187,9,6,26,3,241,1,213,103,77,50,196,46,176,168,135,32,183,200,139,27,19,47,197],{from: accounts[0]}),'revert');
  });
});
