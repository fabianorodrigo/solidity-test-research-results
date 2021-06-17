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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([94,148,176,31,133,212,71,7,98,135,14,151,135,54,184,124,26,58,149,87,95,31,102,228,20,108,247,175,8,90,8,185],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([31,175,91,90,125,203,124,186,170,61,108,231,29,109,236,187,87,64,117,221,170,98,66,52,145,24,174,6,255,33,145,189],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(28,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([106,48,108,236,80,239,20,191,185,152,51,150,227,175,114,214,92,226,78,20,74,66,204,86,50,168,89,32,42,161,106,106], 9,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([152,122,30,97,154,52,138,33,178,7,156,183,102,95,255,43,119,105,185,121,220,210,151,27,9,205,143,117,151,82,190,44],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([240,12,185,143,181,159,134,140,143,123,234,222,79,144,162,241,129,155,133,237,105,79,216,104,220,186,187,251,210,199,185,165], [104,189,136,73,192,119,250,176,225,30,230,153,233,203,167,215,37,127,176,184,94,48,106,161,8,90,37,226,107,232,115,197], 49,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([240,142,218,144,195,239,182,201,88,66,198,104,70,239,92,89,135,134,134,9,96,125,217,99,103,210,125,30,61,46,178,45], [248,143,133,246,41,6,5,31,99,218,44,130,64,206,6,93,164,17,197,57,57,246,218,50,65,131,192,188,35,252,254,12],{from: accounts[0]});
  });
});
