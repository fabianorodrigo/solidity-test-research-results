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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([173,133,140,183,220,109,135,230,239,135,110,115,221,173,150,226,182,23,207,74,189,219,144,203,33,116,96,151,178,36,139,149],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([240,6,125,169,52,208,122,62,244,131,207,52,197,233,132,34,179,54,157,101,53,250,42,181,123,65,190,132,72,238,74,61],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(7,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([124,82,145,231,54,113,179,24,251,45,196,228,160,118,197,220,6,224,166,64,5,116,64,228,194,18,61,14,7,255,177,100], 66,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([223,249,19,52,76,221,52,37,39,32,220,176,186,49,163,60,22,40,175,196,111,56,151,246,137,79,144,20,5,69,152,41],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([0,14,13,177,109,85,166,43,135,144,207,227,142,180,6,171,25,69,151,128,226,226,171,92,190,72,229,207,103,88,255,221], [215,87,160,195,226,112,3,102,95,102,198,96,92,228,69,63,48,120,216,0,154,134,255,89,206,94,71,197,239,73,129,195], 9999,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([166,242,156,148,19,230,85,2,69,215,61,132,101,178,244,187,67,189,178,13,95,160,90,18,48,110,97,76,1,150,172,53], [193,188,73,22,166,40,87,3,236,59,101,99,237,136,106,175,24,160,246,57,232,92,68,49,129,8,103,216,30,89,28,145],{from: accounts[0]});
  });
});
