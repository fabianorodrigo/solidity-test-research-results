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
    let result = await contractMetaTxProxy.getTransactionHashNonce([93,206,146,246,61,75,33,102,224,100,5,195,229,102,67,0,74,167,52,156,9,208,181,234,42,253,100,163,138,224,34,57],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[0], 2014223716, [242,199,120,207,161,245,229,192,76,38,169,130,232,142,177,250,195,133,127,107,123,39,186,4,105,50,251,231,196,243,170,109], 96,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([173,18,77,187,162,159,205,144,124,66,156,79,184,211,17,12,109,101,74,49,144,197,209,80,150,80,230,59,196,191,229,75], [76,14,95,24,235,142,198,161,4,210,184,152,194,158,148,45,145,231,192,25,57,54,22,112,92,208,52,174,177,84,240,207],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[2], 4, [58,236,180,209,2,147,194,94,16,151,104,68,60,226,198,13,74,112,48,19,93,55,242,225,109,22,244,235,215,156,240,119], 29, 64, [17,75,195,112,187,127,105,205,225,228,205,57,172,151,226,192,189,151,183,87,165,76,255,214,89,116,70,96,209,92,200,188],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[4], 0, [245,43,98,244,152,89,235,16,37,219,188,189,205,124,194,165,116,165,119,46,0,75,75,172,117,101,111,197,89,207,130,214], 1532892062, [14,38,36,28,5,139,139,167,202,177,86,90,37,120,248,77,95,88,71,159,143,219,114,53,138,88,60,249,41,254,89,251],{from: accounts[0]});
  });
});
