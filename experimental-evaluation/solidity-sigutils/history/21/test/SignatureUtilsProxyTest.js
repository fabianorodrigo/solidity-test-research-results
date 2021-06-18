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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([193,79,224,51,106,24,253,152,168,196,100,15,204,248,243,60,49,243,109,85,95,17,37,163,87,5,164,16,178,92,248,45],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([204,251,95,192,151,27,221,123,198,179,178,239,125,139,18,11,66,206,107,106,208,111,102,213,139,43,62,68,97,188,38,184],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(9999,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([55,148,108,34,203,47,51,5,191,50,224,249,181,79,109,129,114,245,202,46,173,47,211,56,172,95,65,84,166,166,242,89], 257,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([223,219,68,38,13,129,132,18,196,227,49,42,226,186,229,122,223,229,167,172,147,228,192,144,237,9,155,157,61,225,3,79],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([236,170,155,246,110,228,177,47,40,247,230,135,115,26,21,187,26,236,122,198,232,191,178,225,166,155,114,31,131,34,213,14], [233,9,18,51,3,197,241,118,113,162,221,58,57,61,226,106,187,69,66,41,198,72,129,21,46,151,42,20,102,191,164,146], 255,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([236,240,188,237,49,53,37,202,234,75,33,207,247,164,81,137,136,99,226,100,173,134,72,125,148,184,10,183,109,251,198,183], [121,237,129,249,107,72,195,198,7,230,119,102,98,3,78,246,83,6,230,134,182,46,68,30,209,144,208,176,221,244,57,185],{from: accounts[0]});
  });
});
