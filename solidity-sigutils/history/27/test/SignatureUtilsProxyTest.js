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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([95,150,40,6,177,169,114,5,230,170,175,234,186,49,214,125,55,185,168,242,212,128,171,86,14,88,171,138,16,79,154,233],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([72,74,92,53,228,126,109,144,108,195,239,196,172,232,0,97,247,28,27,161,128,253,125,239,124,142,106,89,80,243,247,192],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(1000,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([151,139,143,103,12,189,182,180,151,6,198,23,24,77,77,24,175,75,31,209,100,230,247,218,181,168,223,114,186,211,250,26], 255,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([31,254,224,126,62,157,238,198,108,2,46,154,125,248,124,76,3,36,68,162,141,187,148,56,84,89,188,112,43,55,156,152],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([219,179,45,205,20,239,151,230,242,177,88,39,29,116,176,228,107,20,237,204,132,169,225,11,4,96,71,214,49,243,126,62], [63,174,207,59,54,34,20,99,202,255,158,175,238,72,228,136,173,86,179,125,189,229,234,3,137,139,154,255,76,16,10,221], 30,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([248,131,215,12,91,25,77,44,90,53,159,194,100,121,51,163,210,164,234,94,183,21,99,56,181,100,138,101,240,163,139,145], [102,10,31,87,53,202,170,94,21,213,143,154,119,38,21,153,224,177,81,220,156,232,115,149,96,2,174,237,180,204,5,42],{from: accounts[0]});
  });
});
