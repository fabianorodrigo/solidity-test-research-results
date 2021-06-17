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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([180,177,59,119,221,41,175,124,48,59,93,34,126,235,69,111,128,250,101,86,204,145,3,151,48,143,29,221,248,40,18,134],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([74,69,86,215,36,233,108,139,48,194,76,8,177,146,229,12,169,207,109,70,67,64,196,129,140,77,39,152,142,247,140,54],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(11,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([29,144,189,145,154,162,21,150,77,236,175,224,174,121,129,160,251,58,36,5,41,92,175,149,38,223,164,148,243,68,128,203], 26,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([47,131,29,157,31,109,6,141,185,184,163,30,28,118,200,156,176,34,108,252,29,170,239,243,194,184,62,130,220,76,191,130],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([235,173,12,156,151,234,212,49,168,131,113,150,42,46,250,62,255,85,51,205,249,45,89,196,198,190,96,194,228,144,124,172], [173,158,90,169,60,235,167,229,255,39,195,31,173,24,212,83,214,59,127,123,165,81,205,156,162,71,140,171,183,201,87,207], 10,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([54,151,17,126,17,2,25,62,100,254,127,135,131,36,16,27,232,102,190,74,239,14,93,223,4,231,179,55,172,251,219,98], [166,173,204,183,232,206,42,219,56,53,166,67,189,75,186,70,216,177,127,24,24,3,223,239,233,22,110,142,161,217,35,254],{from: accounts[0]});
  });
});
