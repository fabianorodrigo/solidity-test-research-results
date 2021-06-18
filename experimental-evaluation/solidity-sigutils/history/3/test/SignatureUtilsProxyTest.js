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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([90,134,81,90,10,183,131,29,13,153,106,159,115,100,5,111,255,15,30,66,182,101,134,146,56,51,159,137,196,43,228,197],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([55,231,203,216,244,85,214,250,60,125,167,45,146,207,37,42,39,73,50,126,15,214,155,58,52,92,103,94,13,178,167,8],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(8,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([247,100,4,237,125,139,127,163,164,174,25,255,7,17,74,139,178,90,123,81,244,179,122,80,169,159,47,76,197,221,122,203], 8,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([189,130,100,39,66,6,69,104,9,54,228,35,73,254,231,57,122,47,96,206,0,230,23,81,23,99,249,184,160,73,46,177],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([91,241,16,42,199,35,212,200,132,42,56,49,229,148,255,9,109,193,240,193,147,168,129,158,223,221,245,80,77,189,172,23], [85,247,240,249,247,201,195,87,92,226,209,253,244,193,190,241,112,36,36,191,255,13,17,151,73,210,92,58,158,167,212,102], 3,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([215,84,143,158,83,130,179,187,203,65,4,169,38,79,17,195,214,114,129,191,219,98,55,115,100,160,147,204,105,41,95,243], [118,7,6,240,98,222,24,168,212,192,142,190,111,196,36,25,217,41,243,199,204,71,149,149,179,63,3,228,116,213,175,77],{from: accounts[0]});
  });
});
