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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([164,248,184,153,88,55,10,115,251,97,172,49,22,85,149,171,246,9,43,0,234,68,254,254,227,134,114,182,120,189,47,100],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([77,64,5,13,59,135,163,134,33,113,151,171,200,72,54,105,253,157,251,220,210,60,117,82,34,24,87,246,188,99,95,79],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(66,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([146,147,46,244,212,228,71,253,205,201,197,147,90,19,35,178,172,11,47,140,140,219,156,193,34,50,235,218,155,47,222,218], 9,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([152,2,208,187,2,104,199,87,152,10,53,120,242,100,232,112,59,122,118,17,52,4,147,80,97,132,87,63,185,87,161,34],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([191,21,124,52,129,198,215,57,232,139,87,154,223,105,208,228,14,66,161,185,144,171,15,69,51,144,196,179,52,94,31,7], [64,89,147,106,4,73,142,15,150,122,237,20,10,170,107,155,44,237,172,7,107,32,59,40,61,156,220,119,221,15,220,15], 48,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([29,79,66,10,150,149,239,18,64,243,159,163,36,137,159,8,217,42,3,167,154,192,50,39,233,144,161,39,176,27,103,80], [77,149,24,158,25,2,10,64,195,129,220,245,32,48,247,29,62,14,139,87,255,1,248,222,57,235,112,191,103,146,147,247],{from: accounts[0]});
  });
});
