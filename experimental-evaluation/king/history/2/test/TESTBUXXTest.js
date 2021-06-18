const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"nfs6ik",10,"nfs6ik",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"nfs6ik",10,"nfs6ik",{from:accounts[0]}');
    contractKing = await King.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[4], 758,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[4], 758,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[7], 231,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[0], 231, 6,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[5], accounts[5],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[3], 6,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 6,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[6], accounts[1], 758,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[6], "0x0000000000000000000000000000000000000000", 758,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[1], 1, [90,163,113,63,68,10,32,223,47,190,91,173,98,44,201,54,25,233,216,227,208,178,40,149,229,147,188,206,4,124,81,0],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[6], 4, [211,193,228,22,41,50,83,78,95,122,172,0,140,82,115,59,205,22,20,59,167,99,136,159,101,181,44,134,138,162,40,55],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(759,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[3], 758,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[6], 229, [226,72,158,197,142,166,106,177,215,202,183,127,135,24,164,248,59,214,57,37,107,113,0,214,150,199,44,177,174,118,24,218], "nfs6ik",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 229, [226,72,158,197,142,166,106,177,215,202,183,127,135,24,164,248,59,214,57,37,107,113,0,214,150,199,44,177,174,118,24,218], "nfs6ik",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[4], 11, [207,18,248,143,46,67,84,154,78,28,27,54,115,65,165,151,199,53,109,14,133,109,197,174,165,195,67,132,78,100,214,200], "eb9uyo",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 11, [207,18,248,143,46,67,84,154,78,28,27,54,115,65,165,151,199,53,109,14,133,109,197,174,165,195,67,132,78,100,214,200], "eb9uyo",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[3], 1, [97,162,89,251,75,101,165,207,246,171,80,241,31,39,196,216,86,18,131,105,10,116,231,109,137,168,145,208,186,122,238,129],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 1, [97,162,89,251,75,101,165,207,246,171,80,241,31,39,196,216,86,18,131,105,10,116,231,109,137,168,145,208,186,122,238,129],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[4], 4, [155,201,27,153,183,149,203,252,66,83,78,56,38,2,224,111,78,234,64,181,238,167,194,107,204,30,94,210,89,41,236,15],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 4, [155,201,27,153,183,149,203,252,66,83,78,56,38,2,224,111,78,234,64,181,238,167,194,107,204,30,94,210,89,41,236,15],{from: accounts[0]}),'revert');
  });
});
