const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"6rbw6n",229,"3fdxlx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"6rbw6n",229,"3fdxlx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[5], 1,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[5], 1,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[6],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[8], 0,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[9], 230, 11,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[3], accounts[2],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[1], 3,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 3,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[5], accounts[8], 230,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[5], "0x0000000000000000000000000000000000000000", 230,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[3], 230, [49,201,54,227,120,132,83,14,20,237,61,85,188,246,79,94,143,206,214,236,119,198,191,36,123,225,145,96,237,51,209,247],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[2], 3, [157,82,56,8,75,26,169,33,5,148,80,106,139,180,243,120,90,195,182,139,112,117,213,67,51,149,67,207,238,71,32,16],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(231,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[4], 9,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[5], 2, [76,226,38,140,177,160,33,222,104,244,244,250,204,117,228,14,84,5,137,220,64,230,173,126,113,90,139,30,67,180,243,226], "bgvbqt",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 2, [76,226,38,140,177,160,33,222,104,244,244,250,204,117,228,14,84,5,137,220,64,230,173,126,113,90,139,30,67,180,243,226], "bgvbqt",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[8], 10, [69,72,80,212,244,29,194,150,55,81,88,59,245,84,248,51,159,194,144,206,109,166,207,25,81,231,103,198,157,46,190,77], "bgvbqt",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 10, [69,72,80,212,244,29,194,150,55,81,88,59,245,84,248,51,159,194,144,206,109,166,207,25,81,231,103,198,157,46,190,77], "bgvbqt",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[2], 0, [200,133,252,7,230,194,108,129,24,55,57,91,119,222,126,70,208,78,126,4,96,181,109,190,73,190,61,145,208,223,230,146],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 0, [200,133,252,7,230,194,108,129,24,55,57,91,119,222,126,70,208,78,126,4,96,181,109,190,73,190,61,145,208,223,230,146],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[8], 2, [61,247,184,213,156,179,51,36,123,254,101,121,110,229,33,78,115,14,158,216,245,72,66,15,46,56,139,117,225,252,251,111],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 2, [61,247,184,213,156,179,51,36,123,254,101,121,110,229,33,78,115,14,158,216,245,72,66,15,46,56,139,117,225,252,251,111],{from: accounts[0]}),'revert');
  });
});
