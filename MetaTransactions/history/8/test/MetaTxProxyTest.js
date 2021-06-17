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
    let result = await contractMetaTxProxy.getTransactionHashNonce([177,164,247,18,10,235,166,38,189,190,57,110,63,18,72,113,9,31,32,249,41,57,86,27,70,209,94,132,251,228,14,36],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[8], 3, [187,62,235,212,249,72,241,29,176,34,101,144,83,76,19,40,158,236,144,218,196,48,126,177,231,200,234,12,249,101,55,51], 2,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([115,57,130,26,148,227,98,10,130,220,238,232,238,210,83,138,67,64,101,253,76,73,199,50,156,43,219,28,41,27,42,121], [164,188,147,2,27,67,170,154,75,18,15,34,72,62,181,199,122,212,229,141,12,151,249,8,183,238,16,240,37,198,116,23],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[9], 96, [78,162,250,167,146,165,237,211,146,158,139,241,144,141,238,200,233,254,160,7,53,233,12,194,117,138,48,87,225,89,242,3], 0, 65, [81,55,117,195,47,120,246,23,218,32,16,129,58,22,69,240,24,128,41,54,89,230,212,199,234,87,192,181,43,201,251,137],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[4], 65, [252,254,91,248,50,195,42,155,25,129,246,18,56,99,108,35,147,214,172,32,208,109,44,218,246,38,38,21,128,90,123,79], 66, [29,249,42,7,5,99,197,53,237,4,90,217,169,183,47,120,189,122,178,163,93,112,211,12,111,125,73,187,114,237,246,97],{from: accounts[0]});
  });
});
