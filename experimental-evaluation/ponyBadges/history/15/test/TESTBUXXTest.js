const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(758,"0ttptk",0,"bsfhi5",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"0ttptk",0,"bsfhi5",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[2],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[5], 10,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[5], 10,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[8], 10,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[6], 1, 757,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[5], accounts[2],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[3], 0,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 0,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[0], accounts[7], 759,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[0], "0x0000000000000000000000000000000000000000", 759,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[8], 11, [211,247,163,214,76,78,40,64,83,194,245,194,222,60,23,108,14,36,249,180,108,85,22,110,186,38,196,206,226,159,227,129],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[9], 758, [152,103,132,112,178,240,135,178,165,197,90,116,159,22,231,118,148,176,202,82,112,207,242,154,7,169,176,126,103,75,183,193],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(11,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[7], 0,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[3], 1, [229,89,225,197,149,138,210,13,67,81,140,143,242,154,115,151,240,125,26,137,210,56,250,207,194,61,151,102,15,124,210,139], "yav0cn",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 1, [229,89,225,197,149,138,210,13,67,81,140,143,242,154,115,151,240,125,26,137,210,56,250,207,194,61,151,102,15,124,210,139], "yav0cn",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[0], 0, [194,137,220,61,77,66,57,77,50,195,225,135,0,97,242,140,248,13,46,114,55,2,218,68,155,202,240,75,213,175,163,150], "0ttptk",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 0, [194,137,220,61,77,66,57,77,50,195,225,135,0,97,242,140,248,13,46,114,55,2,218,68,155,202,240,75,213,175,163,150], "0ttptk",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[6], 10, [232,211,46,187,230,247,179,195,70,174,46,166,29,34,62,64,253,65,177,71,170,17,18,18,117,131,103,35,103,41,214,228],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 10, [232,211,46,187,230,247,179,195,70,174,46,166,29,34,62,64,253,65,177,71,170,17,18,18,117,131,103,35,103,41,214,228],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[7], 758, [102,58,30,168,121,114,23,179,148,122,171,88,220,24,58,131,235,102,95,86,17,144,124,204,190,2,200,193,49,207,87,103],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 758, [102,58,30,168,121,114,23,179,148,122,171,88,220,24,58,131,235,102,95,86,17,144,124,204,190,2,200,193,49,207,87,103],{from: accounts[0]}),'revert');
  });
});
