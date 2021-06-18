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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([4,235,83,162,103,34,107,204,250,9,105,31,188,47,44,125,239,80,103,105,1,37,130,128,232,255,42,156,72,16,24,175],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([193,111,77,82,100,112,97,98,14,111,41,154,200,114,191,253,55,156,19,99,173,184,151,137,126,22,201,44,71,202,127,59],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(5,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([10,206,15,181,144,149,134,13,18,11,100,66,66,110,214,82,168,169,46,125,107,96,140,120,117,142,204,200,238,159,206,2], 999,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([170,173,172,68,33,34,174,126,8,0,116,142,18,42,110,92,47,1,35,106,101,247,72,72,133,4,230,108,162,5,162,238],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([7,218,7,86,96,42,213,252,137,62,60,169,172,229,148,128,50,18,153,29,182,174,181,133,106,111,5,223,7,61,30,127], [112,3,167,32,114,117,173,186,38,218,148,159,137,211,219,156,77,78,205,141,10,87,235,214,0,106,60,219,64,82,224,100], 31,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([230,93,92,80,79,66,5,251,114,64,44,243,111,51,218,186,246,174,138,109,68,170,93,25,171,255,15,145,224,47,192,117], [206,175,23,59,216,148,227,182,230,49,158,199,52,73,36,140,144,249,136,21,196,78,112,17,92,77,226,119,139,123,125,60],{from: accounts[0]});
  });
});
