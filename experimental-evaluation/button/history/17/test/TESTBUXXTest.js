const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(2,"3q53dtm",11,"3q53dtm",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(2,"3q53dtm",11,"3q53dtm",{from:accounts[0]}');
    contractButton = await Button.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[3],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[9], 0,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[9], 0,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[4],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[4], 10,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[1], 229, 9,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[7], accounts[0],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[2], 231,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 231,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[2], accounts[6], 2,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[2], "0x0000000000000000000000000000000000000000", 2,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[1], 9, [104,92,157,83,184,86,46,71,219,35,40,202,82,3,80,125,4,147,59,45,111,98,38,112,202,216,207,150,111,241,174,211],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[4], 9, [54,253,184,229,214,183,93,118,115,153,229,144,97,20,47,218,168,82,107,8,134,194,81,194,134,135,5,81,63,39,229,237],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(2,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[8], 0,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[5], 9, [96,159,71,77,71,1,111,207,41,148,26,52,253,61,185,158,67,165,79,224,70,174,114,31,208,62,167,245,10,8,242,196], "3q53dtm",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 9, [96,159,71,77,71,1,111,207,41,148,26,52,253,61,185,158,67,165,79,224,70,174,114,31,208,62,167,245,10,8,242,196], "3q53dtm",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[8], 2, [151,37,153,161,105,206,144,249,209,35,85,212,77,162,230,184,59,79,176,166,63,107,13,133,116,20,123,219,102,112,134,137], "dfnw4e",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 2, [151,37,153,161,105,206,144,249,209,35,85,212,77,162,230,184,59,79,176,166,63,107,13,133,116,20,123,219,102,112,134,137], "dfnw4e",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[8], 2, [251,234,160,238,141,81,10,80,55,89,27,172,135,116,129,155,29,149,60,136,96,51,218,71,136,23,194,214,229,196,201,251],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 2, [251,234,160,238,141,81,10,80,55,89,27,172,135,116,129,155,29,149,60,136,96,51,218,71,136,23,194,214,229,196,201,251],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[6], 231, [119,126,26,227,253,97,196,70,237,83,13,14,173,122,142,102,69,181,64,34,157,248,182,139,112,134,201,86,58,177,137,175],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 231, [119,126,26,227,253,97,196,70,237,83,13,14,173,122,142,102,69,181,64,34,157,248,182,139,112,134,201,86,58,177,137,175],{from: accounts[0]}),'revert');
  });
});
