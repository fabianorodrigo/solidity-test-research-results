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
    let result = await contractMetaTxProxy.getTransactionHashNonce([245,46,238,29,185,120,62,220,174,138,153,247,104,68,85,127,255,136,170,12,166,228,150,247,200,139,254,247,203,25,234,178],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[2], 66, [15,57,172,200,213,11,53,190,187,20,47,73,4,26,197,149,43,95,195,12,225,187,58,233,186,97,131,209,171,82,230,87], 1,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([94,77,31,243,75,234,127,49,4,165,243,198,181,13,119,206,125,131,211,14,133,36,247,180,41,114,115,90,44,176,142,251], [55,152,87,153,6,37,103,123,197,250,171,24,127,27,130,0,49,217,107,37,187,177,60,9,107,110,0,240,196,228,2,196],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[2], 2014223716, [17,7,120,177,111,254,245,68,236,59,180,116,217,63,101,4,22,232,141,208,186,217,171,10,90,130,188,199,144,253,31,226], 95, 0, [127,142,142,73,83,2,140,150,237,148,245,70,233,151,50,69,89,197,208,189,131,72,16,21,107,205,64,193,51,5,87,78],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[0], 1, [96,117,103,140,110,93,23,210,24,22,115,25,116,168,114,157,52,129,69,189,72,140,140,68,237,179,135,219,245,80,61,102], 29, [65,18,236,198,209,17,11,206,188,73,84,217,172,94,74,159,49,202,82,180,187,243,109,21,96,234,193,165,163,4,153,137],{from: accounts[0]});
  });
});
