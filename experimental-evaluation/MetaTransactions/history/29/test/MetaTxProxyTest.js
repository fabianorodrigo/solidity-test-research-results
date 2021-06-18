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
    let result = await contractMetaTxProxy.getTransactionHashNonce([53,206,9,32,254,75,33,179,109,245,180,52,213,187,150,234,61,170,211,183,13,200,252,179,24,46,82,51,196,11,127,49],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[3], 2014223716, [153,54,72,90,10,9,252,94,156,152,58,124,159,151,37,223,251,180,37,183,138,40,162,161,36,81,70,178,85,43,81,80], 0,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([132,62,7,162,106,90,238,83,85,64,231,240,99,137,112,149,157,229,56,201,255,8,197,233,180,43,142,222,173,138,151,24], [245,205,66,172,119,39,219,11,183,157,6,182,60,185,167,246,145,200,101,12,58,6,52,135,139,51,123,63,84,231,49,169],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[9], 4, [101,200,235,210,213,134,234,12,243,188,123,97,250,36,129,53,7,224,33,195,98,56,81,177,129,47,174,94,55,21,255,46], 2014223716, 96, [238,190,236,198,84,208,7,185,86,161,96,118,18,249,60,169,127,158,237,233,186,6,27,152,215,247,2,18,158,35,242,33],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[7], 27, [212,236,216,117,158,104,26,143,7,60,141,142,255,59,88,123,202,118,170,129,150,41,175,84,192,77,52,107,195,35,227,100], 1, [183,232,38,9,227,44,213,66,119,157,14,144,41,206,23,204,235,249,3,170,153,252,78,247,9,161,53,17,123,226,17,32],{from: accounts[0]});
  });
});
