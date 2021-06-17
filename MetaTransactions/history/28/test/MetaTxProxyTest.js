const truffleAssert = require('truffle-assertions');
const EcTools = artifacts.require("EcTools");
const ExternalContract = artifacts.require("ExternalContract");
const MetaTxProxy = artifacts.require("MetaTxProxy");
const ProxyEcTools = artifacts.require("ProxyEcTools");

contract("MetaTxProxy",(accounts)=>{
  let trace = false;
  let contractEcTools = null;
  let contractExternalContract = null;
  let contractMetaTxProxy = null;
  beforeEach(async () => {
    contractEcTools = await EcTools.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: EcTools.new({from: accounts[0]}');
    contractExternalContract = await ExternalContract.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ExternalContract.new({from: accounts[0]}');
    MetaTxProxy.link("EcTools",contractEcTools.address);
    contractMetaTxProxy = await MetaTxProxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MetaTxProxy.new({from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractMetaTxProxy.sendTransaction({from: accounts[0]});
  });
  it('Should execute getTransactionHashNonce(bytes32)', async () => {
    let result = await contractMetaTxProxy.getTransactionHashNonce([143,71,102,142,115,129,241,30,181,91,5,210,154,212,105,31,60,128,172,212,233,72,8,167,71,229,158,177,99,23,71,46],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[6], 2014223716, [205,171,225,120,69,53,239,176,93,186,182,128,160,96,15,110,187,239,87,227,118,223,128,78,130,102,156,245,16,113,131,0], 2014223716,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([110,180,244,46,211,103,62,228,212,149,150,112,27,224,242,216,137,33,221,29,163,99,9,36,182,115,50,94,48,110,204,162], [180,91,115,126,179,214,151,245,99,228,152,178,152,9,171,243,202,247,67,80,206,195,175,117,34,56,207,47,187,165,164,41],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[3], 2014223716, [189,13,11,41,79,34,218,116,48,201,191,102,212,13,223,77,96,236,251,108,151,200,88,25,66,144,53,241,101,181,192,14], 2014223715, 3, [104,199,60,176,30,233,178,2,37,89,11,153,189,184,104,106,185,13,153,145,185,158,102,140,150,126,24,90,239,108,6,124],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[2], 4, [56,56,12,85,170,152,7,148,32,26,232,171,88,111,168,78,202,13,56,97,83,239,46,217,238,82,83,214,51,154,31,73], 26, [191,85,244,187,226,153,212,148,101,227,117,196,146,203,122,39,125,74,67,247,202,249,206,192,176,233,213,75,126,236,76,57],{from: accounts[0]});
  });
});
