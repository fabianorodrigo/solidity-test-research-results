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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([83,201,100,25,133,234,219,123,67,103,21,249,247,77,211,58,188,243,225,16,100,77,29,232,87,168,162,25,24,13,174,136],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([105,177,245,10,2,240,59,149,61,174,22,156,227,239,104,164,86,70,227,254,233,141,157,49,157,49,87,175,4,191,252,35],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(1,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([147,131,164,90,49,41,12,31,221,255,239,105,130,30,17,32,129,234,52,31,150,185,213,63,90,207,202,52,195,7,130,19], 48,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([127,183,163,188,164,196,254,28,69,78,9,243,36,226,39,107,215,235,34,230,99,30,41,19,210,19,51,143,207,104,9,157],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([151,6,72,116,50,191,151,91,63,44,71,253,105,92,96,157,249,87,117,91,75,100,51,113,92,232,149,157,246,214,100,188], [7,29,25,107,112,128,209,145,3,10,19,55,117,164,120,79,197,142,178,240,49,19,227,182,194,181,172,71,86,89,46,22], 47,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([171,240,208,92,122,146,9,11,13,216,100,107,227,199,59,128,14,137,160,101,11,166,235,68,35,252,98,247,60,49,227,225], [17,106,130,226,94,88,224,6,162,175,199,223,189,199,7,197,229,52,210,26,60,221,243,222,63,110,187,147,209,61,133,63],{from: accounts[0]});
  });
});
