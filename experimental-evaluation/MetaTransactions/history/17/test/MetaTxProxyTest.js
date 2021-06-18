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
    let result = await contractMetaTxProxy.getTransactionHashNonce([187,143,95,161,142,183,29,90,71,57,239,129,128,55,166,172,0,8,166,133,55,206,213,75,157,69,224,208,106,218,199,140],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[0], 1532892063, [26,80,228,125,13,172,52,141,109,227,90,42,252,23,13,151,33,209,149,35,152,96,100,28,124,205,34,243,116,205,32,189], 64,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([196,100,243,167,101,15,20,116,196,79,182,250,221,238,140,197,221,96,48,50,42,117,138,189,48,112,101,173,46,140,106,52], [74,221,147,92,161,88,178,81,58,173,230,213,143,119,83,79,120,72,91,33,116,153,7,36,218,46,163,179,143,87,234,218],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[7], 1532892062, [249,93,234,157,40,59,70,66,99,223,146,78,165,230,4,34,225,204,192,101,220,64,29,101,78,204,59,200,89,209,155,20], 2, 1532892064, [178,138,37,237,118,121,35,174,224,124,57,245,101,81,186,165,101,212,79,69,173,67,50,164,237,251,10,188,187,122,113,77],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[3], 65, [203,185,154,183,99,194,236,198,116,235,41,220,132,228,191,170,209,232,74,3,142,143,140,127,224,80,10,33,83,214,194,189], 4, [203,13,88,96,66,244,224,142,146,108,16,250,54,9,31,149,219,7,29,240,147,221,54,97,183,72,228,105,137,221,125,3],{from: accounts[0]});
  });
});
