const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(759,"jltrxn",230,"wzxpvq",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"jltrxn",230,"wzxpvq",{from:accounts[0]}');
    contractKing = await King.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[0],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[7], 11,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[7], 11,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[6], 6,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[8], 6, 0,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[7], accounts[3],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[6], 0,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 0,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[9], accounts[2], 10,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[9], "0x0000000000000000000000000000000000000000", 10,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[3], 757, [77,101,227,10,34,69,101,1,65,70,80,30,65,26,252,57,69,107,130,188,244,131,153,61,58,42,9,235,171,231,3,72],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[4], 9, [121,112,78,79,22,216,111,30,125,212,243,41,249,76,99,144,214,248,216,7,84,108,140,112,233,221,187,225,198,116,238,205],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(10,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[0], 6,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[9], 0, [21,234,195,85,120,88,120,113,77,112,203,182,85,82,129,218,32,19,113,41,69,154,109,116,150,109,72,216,191,235,192,177], "wzxpvq",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 0, [21,234,195,85,120,88,120,113,77,112,203,182,85,82,129,218,32,19,113,41,69,154,109,116,150,109,72,216,191,235,192,177], "wzxpvq",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[5], 229, [206,81,98,36,125,25,42,180,222,47,158,173,139,232,111,155,65,235,246,48,10,246,151,174,32,187,246,211,77,107,9,106], "jltrxn",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 229, [206,81,98,36,125,25,42,180,222,47,158,173,139,232,111,155,65,235,246,48,10,246,151,174,32,187,246,211,77,107,9,106], "jltrxn",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[4], 230, [118,162,67,191,4,141,216,181,209,251,144,51,108,253,148,153,233,87,96,161,54,73,88,61,9,32,170,138,237,113,53,30],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 230, [118,162,67,191,4,141,216,181,209,251,144,51,108,253,148,153,233,87,96,161,54,73,88,61,9,32,170,138,237,113,53,30],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[5], 757, [218,207,91,154,88,113,119,201,230,33,238,197,101,70,2,137,79,225,222,4,133,209,229,173,12,24,186,244,158,50,111,214],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 757, [218,207,91,154,88,113,119,201,230,33,238,197,101,70,2,137,79,225,222,4,133,209,229,173,12,24,186,244,158,50,111,214],{from: accounts[0]}),'revert');
  });
});
