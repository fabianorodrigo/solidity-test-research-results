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
    let result = await contractMetaTxProxy.getTransactionHashNonce([124,179,1,230,166,218,132,141,213,121,74,19,86,167,61,184,250,186,249,183,72,239,100,186,133,81,117,61,55,107,208,221],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[7], 1532892064, [1,56,44,34,218,126,239,161,198,149,23,206,103,89,183,4,55,145,101,164,68,207,103,104,140,216,36,240,162,240,214,72], 65,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([139,178,161,9,16,221,119,140,116,197,156,102,149,97,69,220,178,84,64,96,176,189,117,25,17,107,247,12,41,42,39,24], [26,133,97,199,84,83,250,240,253,208,40,172,150,98,83,172,170,233,227,204,131,85,221,113,11,1,39,36,146,111,94,175],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[2], 97, [170,209,185,30,202,53,75,202,125,106,186,89,230,85,73,58,0,111,89,64,236,147,193,49,56,155,113,231,143,92,244,18], 65, 2, [241,232,85,36,240,18,112,53,158,188,253,6,63,106,118,183,126,38,231,235,104,66,171,218,254,101,31,187,52,232,118,163],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[7], 0, [200,38,177,71,62,32,42,138,234,56,156,132,90,157,114,28,235,18,118,60,45,246,108,73,23,39,162,146,191,239,220,194], 97, [244,105,251,85,134,191,12,110,218,58,250,183,177,234,76,226,142,32,45,204,143,163,63,137,7,6,87,123,230,69,67,33],{from: accounts[0]});
  });
});
