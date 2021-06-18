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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([50,196,147,144,44,92,174,227,116,212,22,206,185,222,149,172,133,73,48,193,248,224,234,87,79,205,206,178,224,0,50,122],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([13,204,90,244,238,30,129,121,9,10,107,212,27,239,60,233,154,103,154,89,139,149,117,193,186,162,97,183,64,244,228,197],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(5,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([58,114,197,93,90,59,84,192,4,143,112,196,208,33,163,79,218,8,68,191,171,150,169,25,90,214,146,214,217,191,11,149], 64,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([158,197,40,119,26,178,21,86,47,206,188,55,217,196,138,181,56,234,25,42,169,196,222,61,87,253,249,19,155,117,220,33],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([114,103,176,160,44,68,37,131,134,162,251,140,85,168,196,151,212,30,3,46,138,215,219,135,2,238,70,245,186,196,29,34], [224,251,30,70,178,130,213,103,184,242,226,206,129,140,39,124,66,163,90,132,184,189,8,122,102,42,0,48,196,138,16,138], 9999,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([227,122,119,78,17,212,2,238,18,91,15,167,130,98,23,51,27,243,165,221,42,94,173,164,128,170,248,153,13,227,76,39], [111,231,203,1,61,244,110,90,0,51,14,203,80,43,147,233,157,232,21,189,8,208,207,48,223,96,197,149,69,193,45,124],{from: accounts[0]});
  });
});
