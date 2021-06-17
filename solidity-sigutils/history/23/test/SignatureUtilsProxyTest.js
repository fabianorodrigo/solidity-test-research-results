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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([114,148,247,60,5,13,215,237,56,14,156,158,234,226,234,19,185,236,17,105,223,241,224,70,39,14,242,91,112,83,93,214],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([250,124,125,244,91,128,202,226,185,203,220,78,221,44,133,189,82,87,200,64,124,58,48,99,42,255,11,174,215,95,86,176],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(257,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([92,3,55,205,43,208,74,196,94,163,82,18,156,101,209,119,229,38,226,57,130,151,12,53,101,99,13,224,211,233,54,204], 48,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([15,254,20,179,160,117,156,177,0,68,241,253,143,64,50,62,114,213,124,203,234,109,49,123,42,72,94,7,99,166,165,197],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([214,16,187,179,195,243,135,5,128,54,40,221,168,148,18,32,68,228,113,35,112,248,0,117,76,210,29,237,104,215,0,104], [54,140,64,8,83,54,108,65,220,193,75,210,150,160,239,37,219,74,10,34,242,156,125,166,68,123,232,199,86,228,195,253], 10000,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([9,86,218,252,155,57,76,32,251,39,108,12,136,126,222,82,5,154,136,213,177,208,201,35,75,195,108,254,16,85,237,188], [88,186,35,139,144,171,133,145,30,6,197,224,195,214,85,236,23,213,192,120,54,245,40,140,196,178,223,240,202,149,133,12],{from: accounts[0]});
  });
});
