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
    let result = await contractMetaTxProxy.getTransactionHashNonce([30,70,122,218,123,91,155,154,74,224,150,177,17,188,172,186,37,34,109,206,102,217,133,21,245,155,223,236,199,217,252,13],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[6], 27, [181,5,14,166,79,206,186,216,213,68,224,247,159,42,127,198,95,90,232,202,96,219,105,215,75,222,176,236,196,51,74,157], 26,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([155,55,62,7,202,236,220,79,243,216,131,132,167,126,195,135,224,0,151,95,144,211,40,228,173,89,215,134,167,204,31,131], [29,115,224,127,72,254,66,209,4,174,210,68,199,188,191,215,85,132,223,113,244,97,142,115,6,37,150,39,91,4,35,74],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[4], 2014223715, [189,154,201,16,224,78,145,66,197,11,213,54,251,121,121,145,143,58,177,201,180,85,2,71,45,61,176,209,131,12,85,192], 28, 2014223715, [101,127,17,165,226,80,119,230,242,69,105,151,70,123,104,160,212,139,176,228,191,42,166,3,109,61,53,166,233,236,134,47],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[6], 27, [119,122,220,116,80,36,84,195,209,100,65,45,164,159,22,228,252,14,150,98,17,94,211,68,172,177,113,2,59,26,190,160], 2, [203,180,249,130,147,238,193,140,194,187,213,201,226,51,129,53,105,47,19,9,44,98,31,100,172,209,222,165,219,168,99,149],{from: accounts[0]});
  });
});
