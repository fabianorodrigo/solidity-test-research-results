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
    let result = await contractMetaTxProxy.getTransactionHashNonce([93,46,38,159,23,44,90,92,240,48,95,18,171,255,69,46,180,222,166,151,56,246,87,39,122,175,190,210,1,40,104,253],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[7], 29, [201,202,74,253,156,8,176,119,221,10,236,111,224,64,50,161,228,195,204,107,60,238,96,144,196,187,130,5,168,122,248,104], 96,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([69,94,186,92,173,87,228,119,226,211,30,61,59,103,221,247,65,133,230,166,123,61,30,168,189,77,106,181,108,21,49,177], [58,134,103,45,82,167,10,233,117,46,86,169,190,52,177,96,113,169,26,226,140,55,107,15,164,12,65,43,85,194,252,87],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[9], 1532892062, [117,241,157,57,240,17,234,56,185,207,103,181,239,10,199,167,231,245,62,219,142,185,51,148,239,166,252,10,179,30,91,227], 96, 2014223714, [86,93,25,226,40,96,169,174,198,107,65,235,131,8,29,163,34,33,165,78,79,175,169,250,137,226,119,77,31,195,219,142],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[3], 3, [186,178,105,124,110,123,61,236,175,232,183,171,33,165,98,168,245,46,48,120,255,32,94,8,229,79,213,177,173,145,195,150], 1532892063, [254,115,142,99,133,102,11,32,194,149,50,48,188,224,94,184,95,172,27,71,42,44,190,106,142,163,206,59,132,211,124,128],{from: accounts[0]});
  });
});
