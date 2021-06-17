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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([211,79,185,170,8,187,217,72,9,16,200,32,198,234,47,31,105,64,150,23,108,99,243,217,21,167,197,255,239,137,200,164],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([199,37,27,92,237,241,157,44,63,194,175,197,28,29,1,201,123,166,137,217,26,239,84,38,191,154,232,110,194,122,142,208],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(255,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([148,162,11,253,61,12,160,76,161,91,163,233,63,90,85,165,29,152,82,91,47,131,6,104,47,180,11,133,146,162,244,32], 11,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([103,188,25,3,33,229,81,149,189,34,22,134,255,144,127,4,155,185,9,135,138,52,47,137,30,72,120,252,214,248,26,79],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([188,104,146,156,2,9,83,80,154,84,219,12,176,233,127,251,128,200,44,17,124,161,76,19,130,252,227,232,210,79,165,112], [17,47,81,78,187,202,90,130,159,112,220,139,240,157,189,150,101,9,182,122,71,195,249,173,59,164,184,112,210,45,107,26], 29,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([26,186,56,171,243,66,62,241,130,13,125,189,48,80,6,206,248,225,9,74,67,207,104,174,190,121,57,105,137,203,66,251], [92,149,33,107,132,166,53,242,98,6,205,129,196,21,65,117,231,186,177,181,136,61,158,237,8,188,195,158,149,85,92,144],{from: accounts[0]});
  });
});
