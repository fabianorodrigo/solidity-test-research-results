const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");

contract("TESTBUXX",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"cljtg",11,"cljtg",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"cljtg",11,"cljtg",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractTESTBUXX.sendTransaction({from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==admin', async () => {
    let result = await contractTESTBUXX.mint(accounts[7], 1,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.mint(accounts[7], 1,{from: accounts[9]}),'revert');
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractTESTBUXX.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractTESTBUXX.approve(accounts[6], 231,{from: accounts[0]});
  });
  it('Should execute safeApprove(address,uint256,uint256)', async () => {
    let result = await contractTESTBUXX.safeApprove(accounts[5], 1, 0,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractTESTBUXX.allowance(accounts[7], accounts[6],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256)"](accounts[5], 6,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256)"]("0x0000000000000000000000000000000000000000", 6,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN to!=0x0', async () => {
    let result = await contractTESTBUXX.transferFrom(accounts[4], accounts[9], 5,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.transferFrom(accounts[4], "0x0000000000000000000000000000000000000000", 5,{from: accounts[0]}),'revert');
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[0], 230, [105,93,186,205,181,207,202,44,89,245,40,225,172,68,151,171,75,161,45,37,159,112,211,102,248,136,99,63,123,189,211,186],{from: accounts[0]});
  });
  it('Should execute approveAndCall(address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractTESTBUXX.approveAndCall(accounts[2], 10, [161,9,230,15,78,79,206,202,178,223,56,126,168,200,130,25,124,26,25,127,188,168,153,214,233,116,214,175,135,158,87,155],{from: accounts[0]});
  });
  it('Should execute burn(uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burn(10,{from: accounts[0]});
  });
  it('Should execute burnFrom(address,uint256) WHEN balances_>=value', async () => {
    let result = await contractTESTBUXX.burnFrom(accounts[6], 230,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[8], 5, [84,135,30,133,82,3,230,210,86,105,87,71,9,51,40,102,186,111,211,250,237,194,237,140,192,74,129,143,113,114,78,68], "tcb0ti",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 5, [84,135,30,133,82,3,230,210,86,105,87,71,9,51,40,102,186,111,211,250,237,194,237,140,192,74,129,143,113,114,78,68], "tcb0ti",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes,string) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"](accounts[3], 0, [33,61,237,152,18,195,115,248,50,254,108,182,47,234,100,78,208,60,196,190,8,131,52,35,166,58,103,160,206,38,222,139], "tcb0ti",{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes,string)"]("0x0000000000000000000000000000000000000000", 0, [33,61,237,152,18,195,115,248,50,254,108,182,47,234,100,78,208,60,196,190,8,131,52,35,166,58,103,160,206,38,222,139], "tcb0ti",{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall==true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[5], 757, [195,8,90,222,226,104,215,42,4,46,51,71,135,194,48,183,56,66,237,140,23,100,139,111,60,212,20,132,41,105,151,78],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 757, [195,8,90,222,226,104,215,42,4,46,51,71,135,194,48,183,56,66,237,140,23,100,139,111,60,212,20,132,41,105,151,78],{from: accounts[0]}),'revert');
  });
  it('Should execute transfer(address,uint,bytes) WHEN FunctionCall!=true,to!=0x0', async () => {
    let result = await contractTESTBUXX.methods["transfer(address,uint256,bytes)"](accounts[6], 759, [10,217,60,137,57,229,182,71,53,222,72,142,113,233,57,90,162,97,1,94,251,108,38,180,142,214,183,42,97,190,131,139],{from: accounts[0]});
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractTESTBUXX.methods["transfer(address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", 759, [10,217,60,137,57,229,182,71,53,222,72,142,113,233,57,90,162,97,1,94,251,108,38,180,142,214,183,42,97,190,131,139],{from: accounts[0]}),'revert');
  });
});
