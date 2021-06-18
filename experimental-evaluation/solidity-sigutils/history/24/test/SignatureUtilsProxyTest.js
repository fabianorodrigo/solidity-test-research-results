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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([22,240,180,59,63,154,115,234,130,120,223,154,5,165,205,188,206,92,79,72,209,65,191,20,255,238,192,167,93,32,14,89],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([49,81,247,112,16,51,85,38,8,182,42,121,53,115,99,159,106,145,142,176,70,192,45,173,143,3,43,91,141,174,47,136],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(8,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([48,102,57,172,133,187,244,132,170,42,207,3,216,105,231,31,54,219,252,124,154,61,50,108,153,148,0,210,178,197,88,253], 29,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([111,26,104,226,57,39,39,255,10,232,207,99,174,66,94,207,5,233,8,220,163,239,229,234,188,80,4,67,215,182,117,220],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([235,230,58,33,55,208,43,27,100,24,59,190,70,80,230,212,92,11,19,172,11,186,213,71,76,115,74,102,171,49,64,166], [174,218,74,207,182,122,207,11,34,64,171,144,219,243,239,244,133,252,104,201,97,8,239,25,73,210,141,5,18,39,88,249], 3,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([194,178,163,239,224,157,160,68,163,84,150,241,255,113,142,190,168,57,143,251,167,98,157,86,123,78,174,50,197,93,125,133], [98,180,146,49,230,206,71,42,221,3,180,73,89,34,73,229,153,58,128,98,95,13,18,243,9,136,27,215,43,174,4,211],{from: accounts[0]});
  });
});
