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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([144,161,133,244,102,65,144,120,126,5,227,8,52,18,103,104,25,140,102,150,4,63,143,124,228,156,254,47,146,80,149,238],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([50,145,85,89,73,189,85,123,153,118,32,32,14,59,29,255,181,109,94,91,174,250,206,43,62,30,45,239,148,185,228,167],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(66,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([53,250,176,4,63,230,168,215,187,90,182,35,217,51,168,137,65,127,223,26,16,21,228,232,194,187,9,134,45,20,68,180], 3,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([145,188,32,113,16,203,29,189,44,109,64,228,197,136,105,107,18,82,146,89,205,107,112,232,224,100,222,102,205,88,136,174],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([109,70,185,72,212,124,21,9,210,19,103,27,7,55,168,150,98,50,15,128,6,43,187,245,18,114,14,235,28,151,171,192], [59,227,145,212,207,38,237,186,62,110,86,120,154,218,50,55,16,77,1,68,155,175,49,81,98,12,87,219,117,11,120,140], 3,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([128,197,59,131,194,228,57,120,117,143,235,208,153,204,199,153,229,113,230,121,103,119,95,162,228,207,18,254,50,35,173,169], [175,228,199,140,232,70,57,101,22,61,251,203,192,204,238,206,229,233,175,188,40,40,205,66,122,106,235,27,238,94,230,175],{from: accounts[0]});
  });
});
