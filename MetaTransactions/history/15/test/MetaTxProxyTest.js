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
    let result = await contractMetaTxProxy.getTransactionHashNonce([151,42,52,85,194,68,120,72,102,194,82,86,158,112,99,125,26,176,155,197,2,79,90,5,234,3,205,50,56,231,121,10],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[2], 66, [26,137,187,237,205,249,14,41,193,127,255,43,113,204,131,233,23,68,4,164,127,157,131,146,46,142,87,71,210,131,190,99], 3,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([135,104,84,8,141,208,201,192,223,22,55,195,113,62,12,198,70,117,248,103,139,18,102,7,9,201,181,29,134,161,92,253], [223,50,118,208,106,217,170,14,244,218,52,78,108,165,161,100,118,124,209,110,0,159,213,182,137,23,120,202,141,158,86,87],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[5], 26, [111,193,96,48,122,179,65,209,35,113,72,25,44,41,9,73,95,24,133,99,197,16,88,252,122,116,204,191,64,86,59,95], 2, 2014223716, [200,54,196,79,239,83,216,143,0,214,192,243,86,7,125,179,11,133,154,92,247,243,207,193,210,50,19,50,43,159,234,228],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[7], 2014223715, [90,242,20,129,250,74,122,102,40,86,133,121,232,75,72,105,157,191,81,222,3,74,133,111,97,126,56,172,135,167,199,211], 2014223715, [19,91,218,213,47,21,33,28,177,173,206,204,190,145,166,18,156,84,22,133,198,106,9,109,1,151,254,47,8,194,6,164],{from: accounts[0]});
  });
});
