const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(758,"hcu0ym",231,"hcu0ym",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"hcu0ym",231,"hcu0ym",{from:accounts[0]}');
    contractKing = await King.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[2], 0,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[2], 0,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[3],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[9], 0,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[8], 11, 758,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[7], accounts[6],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[0], 5,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 5,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[8], accounts[9], 11,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[8], "0x0000000000000000000000000000000000000000", 11,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[5], 4, [61,54,73,40,238,71,166,232,104,41,103,129,32,108,90,18,252,49,168,86,113,211,69,177,204,249,59,209,55,107,149,233],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[9], 229, [15,194,100,73,103,235,163,109,154,245,225,79,5,141,251,9,145,130,12,117,37,42,56,55,4,15,78,150,223,195,105,119],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(1,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[2], 1,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[5], 9, [116,93,151,164,30,230,56,147,142,211,23,192,173,210,155,182,195,1,200,181,11,127,254,70,117,189,61,175,141,170,157,152], "vim3cv",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 9, [116,93,151,164,30,230,56,147,142,211,23,192,173,210,155,182,195,1,200,181,11,127,254,70,117,189,61,175,141,170,157,152], "vim3cv",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[9], 4, [143,143,129,51,57,218,45,65,224,36,43,150,21,89,132,193,125,37,239,107,67,202,44,111,68,70,11,239,31,100,186,227], "x2gnjk",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 4, [143,143,129,51,57,218,45,65,224,36,43,150,21,89,132,193,125,37,239,107,67,202,44,111,68,70,11,239,31,100,186,227], "x2gnjk",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[3], 10, [128,192,58,89,121,122,147,92,29,227,161,53,49,62,201,153,219,165,84,19,78,127,156,220,14,200,110,94,67,71,102,35],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 10, [128,192,58,89,121,122,147,92,29,227,161,53,49,62,201,153,219,165,84,19,78,127,156,220,14,200,110,94,67,71,102,35],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[7], 5, [56,142,7,230,170,139,161,50,9,226,148,59,146,128,65,221,133,78,38,224,220,106,220,159,91,66,14,133,224,239,63,252],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 5, [56,142,7,230,170,139,161,50,9,226,148,59,146,128,65,221,133,78,38,224,220,106,220,159,91,66,14,133,224,239,63,252],{from: accounts[0]}),'revert');
  });
});
