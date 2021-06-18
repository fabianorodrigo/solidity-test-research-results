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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([247,183,19,107,95,164,211,42,177,225,69,96,239,214,251,70,177,25,189,7,35,57,80,230,255,187,73,22,63,84,235,106],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([1,231,130,187,149,235,112,26,182,136,22,214,218,19,102,34,119,71,115,128,166,175,200,191,214,209,79,113,94,137,227,17],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(6,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([99,236,218,115,222,92,4,253,154,158,48,199,40,228,170,116,155,227,132,172,206,40,3,52,36,158,185,66,151,228,114,80], 1,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([49,222,57,113,247,135,64,121,110,22,160,179,54,12,21,229,151,255,37,88,172,59,217,235,105,106,44,93,117,225,80,242],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([153,235,115,97,37,62,69,136,101,229,189,58,106,121,70,78,130,38,227,219,223,129,78,189,191,159,1,243,147,50,128,128], [50,97,244,183,31,176,63,252,232,195,132,60,105,138,241,3,31,0,49,184,134,131,146,54,199,135,152,167,120,44,114,209], 5,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([25,193,14,216,154,212,135,38,89,98,165,210,205,175,127,156,246,106,232,67,125,36,74,132,223,61,129,8,254,60,110,96], [189,170,140,224,75,28,52,154,254,10,219,136,43,116,210,202,230,49,167,178,15,11,192,171,119,196,9,65,17,213,34,116],{from: accounts[0]});
  });
});
