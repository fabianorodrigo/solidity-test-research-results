const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"ybepa",10,"zncj8",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"ybepa",10,"zncj8",{from:accounts[0]}');
    contractButton = await Button.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[0],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[2], 9,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[2], 9,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[8], 11,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[9], 3, 1,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[8], accounts[3],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[6], 1,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[1], accounts[0], 230,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[1], "0x0000000000000000000000000000000000000000", 230,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[6], 0, [122,241,221,58,198,227,153,169,145,28,225,112,141,222,235,13,87,181,151,198,6,100,28,42,217,101,195,245,184,22,138,164],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[7], 2, [130,95,56,127,215,49,203,205,56,13,226,252,207,184,27,49,105,212,222,177,44,85,154,221,205,4,128,26,171,183,211,22],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(10,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[0], 229,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[5], 1, [119,226,29,189,48,4,170,205,31,142,192,211,215,7,216,17,164,69,247,183,37,106,16,129,203,224,118,152,64,25,181,72], "zncj8",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 1, [119,226,29,189,48,4,170,205,31,142,192,211,215,7,216,17,164,69,247,183,37,106,16,129,203,224,118,152,64,25,181,72], "zncj8",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[6], 3, [8,240,190,191,74,245,226,33,253,218,253,202,14,56,214,145,145,172,212,198,87,149,236,40,212,144,117,62,165,240,113,46], "zncj8",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 3, [8,240,190,191,74,245,226,33,253,218,253,202,14,56,214,145,145,172,212,198,87,149,236,40,212,144,117,62,165,240,113,46], "zncj8",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[1], 231, [18,203,0,26,89,153,88,165,47,117,191,53,137,128,193,65,204,118,45,164,82,27,126,193,124,177,228,19,99,34,162,183],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 231, [18,203,0,26,89,153,88,165,47,117,191,53,137,128,193,65,204,118,45,164,82,27,126,193,124,177,228,19,99,34,162,183],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[4], 230, [26,35,3,188,123,158,86,196,212,181,138,25,100,137,91,140,61,58,68,207,16,114,206,22,97,60,168,18,236,13,243,7],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 230, [26,35,3,188,123,158,86,196,212,181,138,25,100,137,91,140,61,58,68,207,16,114,206,22,97,60,168,18,236,13,243,7],{from: accounts[0]}),'revert');
  });
});
