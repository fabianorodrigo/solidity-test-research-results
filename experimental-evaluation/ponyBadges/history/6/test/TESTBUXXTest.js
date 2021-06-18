const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"vv4w3r",9,"vv4w3r",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"vv4w3r",9,"vv4w3r",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[9],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[3], 759,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[3], 759,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[1], 757,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[9], 758, 0,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[4], accounts[6],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[8], 1,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[4], accounts[7], 0,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[4], "0x0000000000000000000000000000000000000000", 0,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[8], 757, [140,26,11,189,174,84,211,91,60,255,70,129,24,80,245,205,207,84,76,106,29,74,160,61,98,19,116,239,73,202,180,84],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[5], 9, [135,23,205,149,97,204,236,184,117,238,29,204,153,253,41,18,224,67,88,9,118,18,112,205,23,213,50,70,177,83,146,138],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(759,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[7], 757,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[7], 759, [24,1,203,130,180,1,115,64,92,149,236,165,40,119,32,93,94,62,155,222,197,52,187,9,28,223,128,118,78,86,104,61], "euytgf",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 759, [24,1,203,130,180,1,115,64,92,149,236,165,40,119,32,93,94,62,155,222,197,52,187,9,28,223,128,118,78,86,104,61], "euytgf",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[0], 759, [128,218,177,27,172,239,126,43,200,37,209,164,160,21,141,117,82,226,166,213,188,205,171,31,22,132,65,4,65,63,100,45], "iiby2r",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 759, [128,218,177,27,172,239,126,43,200,37,209,164,160,21,141,117,82,226,166,213,188,205,171,31,22,132,65,4,65,63,100,45], "iiby2r",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[2], 759, [89,82,183,9,148,134,102,201,206,191,191,80,112,169,90,92,232,3,200,251,84,154,253,93,217,4,34,224,189,149,87,222],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 759, [89,82,183,9,148,134,102,201,206,191,191,80,112,169,90,92,232,3,200,251,84,154,253,93,217,4,34,224,189,149,87,222],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[9], 758, [218,151,165,59,26,206,93,114,81,139,83,20,33,221,246,80,135,107,239,168,52,133,94,64,111,57,224,44,16,253,202,72],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 758, [218,151,165,59,26,206,93,114,81,139,83,20,33,221,246,80,135,107,239,168,52,133,94,64,111,57,224,44,16,253,202,72],{from: accounts[0]}),'revert');
  });
});
