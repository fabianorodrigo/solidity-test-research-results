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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([191,157,54,63,221,128,197,58,151,33,61,199,37,222,58,85,218,136,207,23,1,253,170,243,216,14,11,77,6,66,245,180],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([177,229,172,11,178,22,79,12,79,188,55,9,169,144,102,89,159,182,111,88,255,81,77,225,64,128,196,216,25,63,223,129],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(9999,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([40,245,226,183,220,253,56,151,79,194,46,146,156,98,241,127,21,156,66,251,91,145,113,247,147,162,99,217,11,102,171,187], 10,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([11,2,44,140,246,13,128,22,70,220,178,134,91,187,17,249,209,103,139,115,168,149,95,230,123,225,1,78,41,150,50,170],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([198,77,171,125,136,16,84,80,164,61,185,197,204,148,20,201,14,242,6,38,236,54,202,126,8,99,86,40,104,15,39,61], [7,51,144,153,173,23,236,48,153,23,58,22,88,162,237,255,218,6,16,231,169,121,36,208,187,78,202,36,136,28,39,236], 6,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([191,255,2,6,246,191,241,74,243,247,68,138,83,187,32,126,42,58,71,36,237,67,154,218,20,41,174,32,21,232,40,120], [162,56,159,128,61,142,158,87,223,211,223,118,248,165,154,179,161,32,24,171,207,229,245,230,157,247,32,184,101,54,230,186],{from: accounts[0]});
  });
});
