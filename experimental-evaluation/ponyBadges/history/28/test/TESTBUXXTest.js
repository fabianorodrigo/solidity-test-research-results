const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"ovt8b",0,"ovt8b",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"ovt8b",0,"ovt8b",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[0], 759,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[0], 759,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[4],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[4], 9,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[1], 0, 0,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[3], accounts[1],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[2], 759,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 759,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[7], accounts[8], 9,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[7], "0x0000000000000000000000000000000000000000", 9,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[8], 11, [81,167,213,101,154,151,3,0,96,240,250,249,8,247,80,172,206,44,1,48,2,193,105,150,225,177,37,181,159,220,181,162],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[3], 0, [157,148,104,126,26,138,130,201,2,149,174,134,191,215,99,93,144,103,39,103,186,122,106,54,25,214,122,188,39,122,57,151],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(10,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[7], 1,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[9], 10, [115,79,1,117,96,175,211,129,188,113,206,60,80,175,239,178,46,65,247,203,183,0,61,70,159,22,34,82,114,198,239,216], "ovt8b",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 10, [115,79,1,117,96,175,211,129,188,113,206,60,80,175,239,178,46,65,247,203,183,0,61,70,159,22,34,82,114,198,239,216], "ovt8b",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[1], 9, [35,178,188,88,252,169,143,183,249,207,101,225,133,181,73,139,41,232,156,2,232,239,192,158,120,38,192,245,86,250,149,249], "5j17b4",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 9, [35,178,188,88,252,169,143,183,249,207,101,225,133,181,73,139,41,232,156,2,232,239,192,158,120,38,192,245,86,250,149,249], "5j17b4",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[3], 757, [92,151,181,92,237,156,236,37,174,204,254,6,244,164,148,71,20,200,95,101,187,202,69,113,122,142,109,243,250,192,34,97],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 757, [92,151,181,92,237,156,236,37,174,204,254,6,244,164,148,71,20,200,95,101,187,202,69,113,122,142,109,243,250,192,34,97],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[0], 758, [38,197,102,89,103,60,125,182,58,173,166,218,178,128,14,217,116,42,210,173,34,235,166,61,226,72,174,100,85,189,196,110],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 758, [38,197,102,89,103,60,125,182,58,173,166,218,178,128,14,217,116,42,210,173,34,235,166,61,226,72,174,100,85,189,196,110],{from: accounts[0]}),'revert');
  });
});
