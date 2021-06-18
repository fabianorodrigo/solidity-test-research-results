const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"nbvn4",1,"iay1fe",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"nbvn4",1,"iay1fe",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[4], 757,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[4], 757,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[3], 758,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[0], 0, 757,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[7], accounts[9],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[6], 758,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 758,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[9], accounts[8], 758,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[9], "0x0000000000000000000000000000000000000000", 758,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[1], 757, [200,201,32,129,28,159,92,254,95,61,130,174,39,148,106,251,118,54,13,187,144,125,1,228,200,120,22,15,97,250,211,142],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[2], 9, [243,81,246,157,39,48,180,39,143,102,198,235,43,121,237,177,65,141,137,203,2,115,65,53,8,36,122,178,19,100,236,51],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(0,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[7], 10,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[0], 757, [156,20,108,128,49,231,7,183,212,243,238,144,141,75,119,210,128,45,33,216,118,122,73,4,84,102,136,127,253,154,15,195], "e6k2dxs",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 757, [156,20,108,128,49,231,7,183,212,243,238,144,141,75,119,210,128,45,33,216,118,122,73,4,84,102,136,127,253,154,15,195], "e6k2dxs",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[3], 1, [133,226,83,207,95,124,73,182,85,18,39,156,210,243,126,246,84,166,167,42,8,50,20,44,151,47,231,35,170,225,14,67], "e6k2dxs",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 1, [133,226,83,207,95,124,73,182,85,18,39,156,210,243,126,246,84,166,167,42,8,50,20,44,151,47,231,35,170,225,14,67], "e6k2dxs",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[6], 759, [65,160,141,126,216,22,184,52,5,28,52,31,194,91,253,138,3,235,218,231,172,246,15,234,172,76,212,103,111,157,50,207],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 759, [65,160,141,126,216,22,184,52,5,28,52,31,194,91,253,138,3,235,218,231,172,246,15,234,172,76,212,103,111,157,50,207],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[6], 11, [153,59,79,140,103,134,120,248,90,186,127,97,189,108,142,31,204,142,38,30,59,175,169,192,161,30,11,116,172,105,89,57],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 11, [153,59,79,140,103,134,120,248,90,186,127,97,189,108,142,31,204,142,38,30,59,175,169,192,161,30,11,116,172,105,89,57],{from: accounts[0]}),'revert');
  });
});
