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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([150,228,15,101,100,159,160,119,81,21,230,74,50,115,39,107,224,72,235,48,115,100,34,55,91,108,107,178,122,175,60,105],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([207,11,58,35,65,232,179,22,129,255,177,118,228,12,0,20,96,4,169,116,242,87,171,124,187,248,48,240,159,30,140,162],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(5,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([164,23,150,118,183,14,99,180,48,142,119,253,158,131,153,238,169,250,115,121,133,211,225,199,135,15,72,97,207,188,78,139], 27,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([101,200,166,246,164,186,190,42,217,244,91,6,151,196,66,178,140,22,204,196,179,93,245,218,199,42,74,116,130,199,205,128],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([243,162,34,241,22,250,136,91,188,50,42,45,230,71,46,236,163,200,231,80,26,113,174,29,159,97,150,54,197,188,229,228], [4,75,76,58,49,154,174,54,174,36,242,254,214,111,237,179,136,23,183,126,95,190,187,56,9,219,146,44,238,168,108,199], 32,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([96,215,117,171,172,8,208,47,195,62,0,242,176,135,21,225,164,204,17,81,197,66,111,110,66,244,226,218,135,22,135,0], [199,242,94,96,82,4,185,50,204,131,120,133,112,239,61,86,99,170,252,103,149,144,5,254,30,66,133,55,30,112,152,121],{from: accounts[0]});
  });
});
