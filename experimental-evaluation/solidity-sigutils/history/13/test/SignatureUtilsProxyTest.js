const truffleAssert = require('truffle-assertions');
const SignatureUtils = artifacts.require("SignatureUtils");
const ProxySignatureUtils = artifacts.require("ProxySignatureUtils");

contract("contractProxySignatureUtils",(accounts)=>{
    let contractProxySignatureUtils = null;
  let trace = false;
  let contractSignatureUtils = null;
  beforeEach(async () => {
    contractSignatureUtils = await SignatureUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SignatureUtils.new({from: accounts[0]}');
      ProxySignatureUtils.link('SignatureUtils', contractSignatureUtils.address);
    contractProxySignatureUtils = await ProxySignatureUtils.new({ from: accounts[0] });
});
  
  it('Should execute testtoEthBytes32SignedMessageHash(bytes32)', async () => {
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([244,104,29,149,146,76,3,218,91,56,178,233,180,189,22,212,217,33,187,162,74,153,38,156,104,205,216,102,119,11,85,153],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([109,226,188,153,151,123,83,238,144,155,74,159,170,52,75,110,68,64,111,179,19,65,114,232,40,43,196,29,255,203,251,61],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(29,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([35,84,89,141,96,26,64,178,241,204,158,235,69,42,36,20,10,228,7,100,111,245,50,108,139,66,91,196,102,16,138,47], 9999,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([190,199,204,221,204,112,232,71,93,40,153,105,42,38,218,9,101,96,156,2,85,135,115,232,63,251,208,12,197,170,62,170],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([44,184,65,208,161,122,87,60,115,161,114,219,200,149,46,147,129,76,119,123,92,185,213,232,230,210,116,81,244,37,102,204], [119,109,209,174,218,2,172,135,130,84,217,205,34,23,128,54,71,14,78,99,47,40,77,3,12,112,187,191,230,19,74,227], 9999,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([156,54,201,58,28,67,225,66,22,235,29,237,123,254,132,144,60,70,64,170,100,145,68,156,0,49,24,134,145,166,58,180], [58,37,13,204,241,15,240,110,222,60,126,127,152,34,131,8,118,57,16,210,171,169,213,151,221,191,243,95,160,237,27,22],{from: accounts[0]});
  });
});
