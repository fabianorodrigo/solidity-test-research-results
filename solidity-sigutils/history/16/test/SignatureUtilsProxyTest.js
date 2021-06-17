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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([5,25,187,119,165,161,187,114,82,218,243,69,105,144,32,185,46,195,156,239,247,215,179,40,128,195,228,94,47,196,131,13],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([115,45,130,192,106,245,79,45,134,124,66,207,62,9,15,198,179,29,179,125,218,208,235,203,142,139,61,227,31,254,215,231],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(3,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([23,133,121,143,168,101,226,167,124,156,83,217,25,86,188,64,94,126,60,74,122,118,135,122,254,132,212,18,68,176,163,228], 66,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([227,242,20,185,176,29,196,211,127,77,249,237,204,95,149,30,227,186,174,254,90,131,99,122,64,44,225,30,96,190,141,250],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([234,177,146,152,223,235,6,249,120,218,148,200,182,48,222,191,29,218,213,245,155,10,22,62,81,103,113,101,39,202,169,91], [6,87,248,50,249,115,83,110,18,55,124,233,209,20,77,61,170,229,133,50,43,131,27,57,4,136,250,163,2,105,167,243], 2,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([0,153,188,255,211,110,225,166,254,155,245,30,50,189,17,85,180,232,57,154,242,64,133,73,101,136,182,153,137,62,57,113], [48,193,33,195,220,196,182,49,205,251,22,244,60,3,21,157,143,166,44,35,217,104,219,118,250,52,253,73,144,82,82,137],{from: accounts[0]});
  });
});
