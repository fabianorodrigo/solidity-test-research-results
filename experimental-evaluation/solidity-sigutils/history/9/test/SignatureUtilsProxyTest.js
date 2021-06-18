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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([211,87,151,97,74,14,93,223,51,181,181,92,177,0,250,215,133,31,129,168,75,73,208,163,159,1,211,53,180,191,252,4],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([91,191,173,115,78,13,147,127,67,29,222,26,92,81,217,5,128,230,209,254,41,250,38,241,95,216,55,75,7,92,241,188],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(7,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([173,216,238,228,38,64,84,116,212,171,169,142,217,113,44,171,200,254,113,243,122,112,106,173,171,17,111,91,76,48,73,146], 10,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([242,139,218,44,246,105,116,242,245,11,208,17,1,106,219,210,158,40,115,69,206,104,225,127,126,101,223,9,16,211,110,173],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([96,32,194,107,244,136,198,73,240,177,222,36,0,177,44,58,99,168,226,79,35,173,82,173,132,93,227,93,5,17,240,1], [6,171,145,138,14,175,119,165,54,50,177,26,134,47,252,69,58,220,143,11,201,7,81,46,59,66,226,190,99,137,145,144], 26,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([101,5,89,196,143,245,32,38,111,59,85,180,147,225,168,69,172,187,232,31,191,147,187,104,107,138,138,100,15,149,137,208], [222,15,93,16,56,239,108,249,212,97,36,151,220,20,84,200,150,64,107,15,8,75,179,74,35,13,197,95,144,207,168,57],{from: accounts[0]});
  });
});
