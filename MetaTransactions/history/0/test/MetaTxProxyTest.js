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
    let result = await contractMetaTxProxy.getTransactionHashNonce([224,112,18,106,38,114,16,46,31,12,41,156,40,164,49,227,206,194,42,129,219,9,245,115,132,157,111,205,198,67,76,50],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[8], 95, [116,45,192,46,75,39,246,167,4,111,234,97,238,208,238,178,220,140,11,173,252,194,114,110,140,172,14,29,71,66,59,140], 1,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([65,21,122,183,91,159,37,41,70,63,221,160,147,4,201,46,24,72,20,85,88,169,198,255,254,3,2,189,167,127,175,4], [96,175,92,80,138,23,119,183,40,221,6,143,134,188,47,6,145,133,195,202,43,174,86,249,205,137,225,168,59,104,60,119],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[1], 1532892064, [47,186,177,59,201,52,160,220,22,210,108,99,60,187,244,77,34,177,158,116,13,91,132,200,124,88,0,230,40,223,10,207], 26, 27, [233,228,8,124,132,193,64,246,42,53,233,105,45,224,242,40,91,231,142,89,222,45,27,152,135,192,198,50,239,251,88,244],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[6], 96, [17,226,50,222,230,203,71,219,140,228,13,68,22,186,190,202,192,242,44,172,203,83,102,133,110,25,199,80,196,105,198,246], 65, [110,69,203,100,155,97,59,98,178,139,125,76,176,199,29,138,82,143,5,195,42,65,132,204,126,156,197,218,104,7,238,19],{from: accounts[0]});
  });
});
