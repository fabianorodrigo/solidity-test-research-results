const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(0,"4ymfcx",0,"hve8al",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"4ymfcx",0,"hve8al",{from:accounts[0]}');
    contractButton = await Button.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[5],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[4], 229,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[4], 229,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[7],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[1], 0,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[5], 231, 1,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[6], accounts[2],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[8], 10,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 10,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[7], accounts[5], 11,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[7], "0x0000000000000000000000000000000000000000", 11,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[9], 230, [203,81,207,214,134,66,215,101,155,74,131,119,227,81,52,195,146,29,102,50,206,7,244,86,238,54,245,170,128,242,113,198],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[0], 3, [216,157,102,166,133,38,41,43,67,35,197,165,79,122,30,196,23,147,157,35,148,66,150,68,224,232,192,15,228,88,157,246],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(231,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[3], 230,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[8], 230, [61,64,1,22,228,75,153,121,139,102,76,234,148,40,65,54,171,52,75,103,182,59,85,66,248,207,211,95,90,171,163,73], "hve8al",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 230, [61,64,1,22,228,75,153,121,139,102,76,234,148,40,65,54,171,52,75,103,182,59,85,66,248,207,211,95,90,171,163,73], "hve8al",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[7], 231, [237,25,34,34,42,186,151,62,54,24,252,90,1,145,155,248,235,7,200,59,47,207,107,229,36,178,85,39,157,118,125,229], "4ymfcx",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 231, [237,25,34,34,42,186,151,62,54,24,252,90,1,145,155,248,235,7,200,59,47,207,107,229,36,178,85,39,157,118,125,229], "4ymfcx",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[2], 1, [119,234,44,181,32,218,140,164,57,5,9,84,12,232,135,32,131,154,232,185,87,194,243,143,185,55,195,24,54,193,234,187],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 1, [119,234,44,181,32,218,140,164,57,5,9,84,12,232,135,32,131,154,232,185,87,194,243,143,185,55,195,24,54,193,234,187],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[1], 1, [157,129,27,209,144,74,30,231,87,15,84,225,139,79,75,121,3,65,183,171,115,247,187,50,198,80,174,208,95,181,229,162],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 1, [157,129,27,209,144,74,30,231,87,15,84,225,139,79,75,121,3,65,183,171,115,247,187,50,198,80,174,208,95,181,229,162],{from: accounts[0]}),'revert');
  });
});
