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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([160,144,204,112,164,171,24,124,164,251,250,207,188,155,136,154,39,130,180,110,136,27,47,100,210,238,231,184,49,57,220,69],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([189,219,171,211,212,17,81,19,239,59,72,38,180,51,109,167,95,186,17,143,195,52,240,154,42,38,17,26,21,247,147,91],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(4,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([214,156,50,137,141,22,159,93,120,210,111,142,108,28,148,35,160,19,205,213,24,221,63,1,87,32,49,182,143,99,253,147], 47,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([42,188,62,136,4,180,208,115,176,235,132,67,10,13,25,233,46,54,83,140,252,56,130,2,62,21,94,169,174,166,112,12],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([169,145,241,158,0,1,128,160,206,12,235,82,196,53,246,75,126,7,61,14,38,46,171,113,58,163,6,83,143,128,173,32], [24,0,108,7,135,10,181,199,224,244,67,190,23,223,208,99,49,107,221,126,64,116,215,51,0,62,125,196,243,40,149,109], 31,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([41,71,44,2,130,226,139,178,121,47,124,247,112,215,144,5,239,28,27,40,30,139,125,26,231,36,34,50,136,75,240,72], [55,29,248,94,186,150,172,210,81,197,6,6,226,89,76,243,124,77,197,147,231,109,207,199,209,249,73,220,226,224,36,62],{from: accounts[0]});
  });
});
