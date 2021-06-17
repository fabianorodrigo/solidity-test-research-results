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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([100,189,236,206,199,112,153,4,229,135,210,149,107,24,171,172,18,178,211,151,157,25,65,13,129,160,210,176,215,254,60,112],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([145,110,175,83,230,213,253,19,180,54,95,144,131,205,26,35,211,150,42,110,177,76,248,176,164,137,37,163,76,181,190,185],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(257,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([161,53,119,72,149,154,102,228,219,180,160,5,55,146,41,132,117,99,96,122,251,114,162,135,117,241,139,139,205,52,224,225], 26,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([86,2,120,194,154,178,215,30,170,18,63,203,90,85,69,63,247,28,39,132,189,111,218,147,230,238,122,96,109,172,194,151],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([0,180,19,22,69,68,200,82,83,45,66,240,27,164,21,122,196,3,196,156,110,240,93,18,249,85,30,32,47,191,127,103], [237,252,11,65,118,82,197,134,69,255,217,39,228,251,172,168,20,52,22,177,62,20,11,244,165,173,223,244,118,9,91,239], 11,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([119,204,54,201,14,229,144,100,234,26,223,204,178,68,159,178,3,244,171,87,84,211,6,31,140,70,42,244,68,180,37,56], [45,98,101,134,25,238,33,99,59,155,153,145,21,41,62,86,2,199,98,60,44,49,254,79,63,159,133,168,197,178,73,116],{from: accounts[0]});
  });
});
