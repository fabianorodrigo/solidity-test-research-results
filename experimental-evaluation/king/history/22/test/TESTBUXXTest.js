const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(6,"zjcrx",4,"7s8hr",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(6,"zjcrx",4,"7s8hr",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[8], 757,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[8], 757,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[8], 757,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[6], 11, 759,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[0], accounts[5],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[4], 757,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 757,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[0], accounts[5], 758,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[0], "0x0000000000000000000000000000000000000000", 758,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[5], 6, [51,240,72,69,205,111,204,185,177,6,32,254,136,192,76,238,168,194,192,170,6,189,90,134,158,158,56,8,251,2,204,220],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[8], 10, [205,79,23,204,49,212,152,234,68,209,105,36,141,213,160,7,24,45,96,30,71,68,192,243,184,184,77,62,35,76,74,187],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(5,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[5], 758,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[1], 229, [237,27,86,66,47,249,214,41,43,91,198,224,6,91,192,6,109,57,107,34,87,25,35,119,9,185,3,144,13,15,85,104], "7s8hr",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 229, [237,27,86,66,47,249,214,41,43,91,198,224,6,91,192,6,109,57,107,34,87,25,35,119,9,185,3,144,13,15,85,104], "7s8hr",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[4], 759, [203,90,93,169,226,251,207,138,8,144,59,216,158,81,199,64,103,181,135,215,103,168,63,254,141,140,252,156,109,114,200,188], "pgd8z6",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 759, [203,90,93,169,226,251,207,138,8,144,59,216,158,81,199,64,103,181,135,215,103,168,63,254,141,140,252,156,109,114,200,188], "pgd8z6",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[8], 10, [67,44,73,105,221,90,241,100,246,129,253,134,159,174,86,186,134,179,108,73,65,104,242,39,61,19,187,215,106,117,172,180],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 10, [67,44,73,105,221,90,241,100,246,129,253,134,159,174,86,186,134,179,108,73,65,104,242,39,61,19,187,215,106,117,172,180],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[3], 231, [254,213,207,12,90,38,146,151,170,204,164,35,167,229,89,91,85,144,182,123,115,90,235,34,45,58,49,178,86,232,180,158],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 231, [254,213,207,12,90,38,146,151,170,204,164,35,167,229,89,91,85,144,182,123,115,90,235,34,45,58,49,178,86,232,180,158],{from: accounts[0]}),'revert');
  });
});
