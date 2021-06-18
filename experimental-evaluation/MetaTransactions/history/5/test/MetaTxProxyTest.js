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
    let result = await contractMetaTxProxy.getTransactionHashNonce([165,229,199,253,4,6,45,163,141,43,242,73,141,0,242,61,28,68,218,125,239,199,70,118,32,247,186,143,109,32,100,84],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[7], 3, [14,14,16,232,218,114,228,92,130,80,241,70,97,199,3,72,31,224,107,238,202,96,213,103,32,146,12,190,197,182,186,58], 2,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([129,19,125,35,115,234,2,62,71,180,211,145,233,53,221,36,52,104,135,133,32,211,221,167,48,214,37,154,143,88,158,177], [239,128,167,174,159,110,5,38,114,170,204,136,241,208,83,183,31,20,36,199,231,13,188,238,132,197,5,124,247,192,8,179],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[6], 2014223714, [82,17,131,235,102,3,186,150,1,85,130,248,121,176,172,182,213,58,51,239,159,73,255,32,231,148,107,161,107,83,53,40], 5, 3, [109,227,39,23,218,216,166,190,180,11,145,202,232,18,60,127,254,66,181,11,211,93,107,95,30,36,180,77,123,169,198,179],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[1], 0, [235,182,206,215,46,163,4,64,40,155,172,54,102,172,107,91,239,181,120,121,150,191,226,74,31,242,30,142,126,126,226,165], 2, [95,254,148,116,52,215,47,1,136,135,61,39,119,125,116,246,20,66,234,86,182,94,3,208,173,79,82,154,34,58,218,140],{from: accounts[0]});
  });
});
