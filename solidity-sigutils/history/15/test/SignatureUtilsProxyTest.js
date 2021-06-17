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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([71,17,184,16,146,7,92,121,213,6,143,30,134,188,20,26,17,124,14,115,82,149,80,182,161,171,38,229,127,185,21,119],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([173,248,1,9,154,126,89,109,168,164,140,159,179,17,42,40,245,168,27,34,156,128,127,79,99,26,207,100,1,223,166,59],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(48,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([63,244,134,143,134,148,3,167,179,90,56,207,98,18,46,134,141,232,186,178,35,242,117,186,60,216,201,26,18,55,114,83], 29,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([219,202,241,196,13,213,135,77,114,189,204,124,109,246,64,38,199,181,88,187,214,76,233,247,233,186,30,140,201,154,202,82],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([115,120,188,131,7,171,110,16,231,236,116,195,63,174,198,150,244,226,235,188,109,62,161,78,187,35,203,108,167,49,217,247], [41,11,82,145,214,191,132,30,134,45,49,18,238,95,26,67,141,8,233,86,255,49,223,192,231,170,238,170,116,203,123,234], 26,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([109,154,214,108,193,230,16,177,141,175,18,235,3,157,21,157,4,189,254,88,169,38,148,165,132,250,197,78,196,75,45,27], [66,93,172,90,44,74,68,192,60,188,178,36,28,32,231,204,125,228,99,199,245,220,120,77,118,12,46,170,3,27,76,100],{from: accounts[0]});
  });
});
