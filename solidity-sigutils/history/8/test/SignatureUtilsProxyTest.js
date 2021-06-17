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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([200,172,204,255,57,197,132,61,40,244,243,10,233,144,235,8,214,97,177,30,8,162,56,198,189,189,30,163,3,144,235,64],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([47,158,71,229,99,72,239,177,192,205,225,137,106,172,15,255,62,109,32,244,210,62,197,17,72,83,14,30,204,171,23,46],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(1000,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([53,78,101,213,242,244,7,89,220,50,143,44,196,190,72,47,173,214,117,84,173,225,111,190,72,170,68,217,219,169,25,184], 1001,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([182,166,200,52,140,172,218,142,113,254,228,35,164,137,16,50,219,71,190,178,182,189,76,42,31,199,210,162,168,222,20,34],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([196,191,119,197,92,132,24,220,125,84,18,67,11,136,188,62,183,84,53,193,247,23,32,246,174,164,111,230,252,105,28,26], [28,24,252,134,248,9,206,42,183,83,53,252,186,245,187,188,105,13,77,179,163,227,163,51,86,35,79,32,78,237,234,198], 3,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([189,46,94,131,222,162,198,124,46,21,157,226,22,21,190,41,37,124,241,154,236,93,22,15,153,22,237,163,29,189,24,219], [5,239,31,173,108,39,229,111,68,163,220,135,173,154,82,209,244,144,120,166,95,42,74,122,41,230,231,83,93,166,189,206],{from: accounts[0]});
  });
});
