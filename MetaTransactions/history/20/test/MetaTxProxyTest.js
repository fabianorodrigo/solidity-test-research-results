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
    let result = await contractMetaTxProxy.getTransactionHashNonce([4,98,41,205,44,214,231,103,5,23,78,89,114,60,7,49,251,155,197,242,249,227,247,125,170,210,127,160,139,213,54,181],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[7], 97, [173,221,177,163,201,129,38,49,152,218,244,9,77,31,166,156,120,32,80,200,137,137,161,189,95,54,158,158,0,145,43,21], 65,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([93,226,166,24,142,180,45,240,171,72,221,61,107,191,211,3,87,202,241,54,215,92,80,235,22,160,52,201,38,90,18,106], [234,56,139,43,223,63,138,11,119,48,236,188,175,110,165,249,134,20,120,59,192,127,97,68,95,11,203,9,63,39,54,135],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[7], 1532892064, [151,122,60,82,245,216,119,147,41,142,156,124,56,243,166,141,86,212,25,102,125,133,161,140,128,228,220,251,44,121,187,251], 29, 28, [124,105,171,150,138,205,96,129,1,82,75,187,190,64,57,244,106,127,96,163,120,131,213,151,98,104,248,216,103,229,62,198],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[4], 95, [23,162,219,107,108,171,196,117,59,251,182,100,10,155,71,103,47,23,5,27,131,122,233,210,205,180,166,78,241,115,155,71], 29, [81,223,92,234,250,228,56,213,77,251,90,114,1,52,220,1,243,80,87,36,122,253,177,25,185,16,56,84,208,178,81,91],{from: accounts[0]});
  });
});
