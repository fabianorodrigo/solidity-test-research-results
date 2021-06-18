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
    let result = await contractMetaTxProxy.getTransactionHashNonce([112,187,61,114,140,34,52,61,57,83,128,148,27,212,209,204,182,46,125,117,88,69,217,162,17,227,58,49,144,230,92,23],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[1], 64, [3,216,85,46,138,80,30,23,30,219,98,110,179,147,44,70,133,70,101,163,159,53,193,96,234,236,48,30,88,10,10,40], 5,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([111,128,12,191,232,164,63,55,113,207,138,4,196,13,99,82,126,92,102,51,251,75,153,38,223,241,21,112,246,132,166,181], [105,41,137,226,44,96,212,234,92,10,210,153,40,36,251,130,163,193,195,134,210,147,41,173,114,83,186,187,197,170,35,249],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[5], 2014223716, [35,227,36,77,119,50,60,201,163,14,100,207,164,148,7,244,227,27,128,141,66,92,68,54,229,206,175,83,174,8,20,43], 1532892064, 29, [170,134,85,214,51,156,124,26,168,210,224,146,128,38,167,140,242,43,188,88,208,6,11,63,179,23,138,121,224,2,88,148],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[6], 2014223715, [203,42,109,80,67,230,202,226,179,6,240,11,15,44,107,23,127,218,13,179,140,14,158,126,105,253,147,82,149,33,78,30], 28, [25,123,91,142,117,67,66,62,126,43,109,43,24,93,109,23,11,86,213,238,7,236,254,164,118,115,85,165,42,192,200,153],{from: accounts[0]});
  });
});
