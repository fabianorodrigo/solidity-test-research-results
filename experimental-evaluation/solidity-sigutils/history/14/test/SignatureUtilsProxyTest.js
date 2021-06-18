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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([211,41,230,105,161,122,73,255,184,245,24,126,12,199,128,2,155,234,244,171,118,113,218,25,38,42,50,53,116,241,19,185],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([27,255,100,173,156,190,43,15,207,91,115,64,242,107,165,185,30,82,13,2,216,163,94,168,174,66,32,10,225,99,233,2],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(10,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([92,181,165,130,132,8,30,146,92,189,160,145,72,4,194,19,11,108,186,251,33,195,130,221,62,30,156,90,53,58,239,184], 9,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([173,23,215,237,167,107,150,177,32,169,183,131,201,175,119,43,108,189,140,111,170,222,54,128,153,180,10,36,176,56,219,66],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([144,169,252,65,243,155,139,56,48,80,64,19,254,209,125,176,34,226,224,222,103,249,134,22,46,123,183,242,200,36,97,203], [112,123,224,102,51,127,77,86,159,186,214,78,24,198,27,244,71,249,57,178,171,174,239,248,9,163,199,87,215,18,53,6], 4,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([240,38,73,148,13,233,158,99,221,120,152,49,51,252,178,77,7,234,129,30,110,0,197,69,56,113,47,215,200,178,130,140], [237,246,39,222,145,240,95,33,113,80,216,201,1,84,207,106,4,184,135,213,112,36,246,130,64,53,88,200,122,88,245,199],{from: accounts[0]});
  });
});
