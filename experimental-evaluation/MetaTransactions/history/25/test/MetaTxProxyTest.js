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
    let result = await contractMetaTxProxy.getTransactionHashNonce([222,95,132,99,16,32,195,134,73,146,247,178,89,191,25,103,146,31,40,36,165,102,177,140,209,1,148,34,119,240,79,241],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[0], 1532892063, [48,244,235,223,189,82,84,69,144,90,1,17,43,34,203,107,156,76,69,87,204,148,142,0,3,58,44,19,134,53,181,218], 1532892062,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([68,87,164,98,210,23,125,0,182,22,10,124,209,112,150,48,150,205,190,92,88,189,146,170,68,69,75,161,17,144,131,193], [220,146,29,25,188,59,242,178,183,70,186,28,61,205,98,202,215,85,117,218,73,76,164,54,188,143,240,182,199,20,238,40],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[8], 66, [75,145,158,160,223,136,125,188,211,101,162,164,9,4,143,203,99,217,107,72,16,227,135,127,252,74,118,217,0,106,66,253], 64, 4, [166,120,9,85,229,91,52,200,190,145,132,141,103,110,135,214,110,42,130,82,138,245,133,138,82,65,110,45,171,2,149,170],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[7], 1532892063, [72,188,127,8,105,104,221,189,237,178,177,177,154,172,247,194,18,129,237,61,13,9,105,189,255,194,89,233,226,205,89,72], 2014223715, [13,177,205,9,117,219,224,51,182,30,66,159,27,112,103,83,237,152,29,124,8,54,175,158,92,185,66,193,175,33,164,54],{from: accounts[0]});
  });
});
