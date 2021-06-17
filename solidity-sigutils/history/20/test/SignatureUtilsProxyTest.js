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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([246,235,85,86,111,72,73,235,194,105,207,251,99,64,29,69,137,133,243,114,182,72,2,207,216,211,137,202,91,154,22,131],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([193,202,207,152,163,219,75,52,92,254,65,169,222,99,208,200,2,58,80,5,122,95,191,233,34,63,240,134,200,157,103,122],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(1001,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([232,135,134,90,228,130,222,17,97,115,46,19,87,49,117,20,50,76,145,210,195,23,119,186,47,197,89,74,255,187,213,194], 4,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([97,118,50,9,42,215,151,190,32,110,82,156,93,123,207,227,60,246,182,33,41,62,146,159,101,223,188,146,250,213,4,46],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([125,79,102,42,234,55,102,165,86,143,218,174,188,132,123,170,63,180,181,197,64,226,220,210,170,112,254,103,94,144,53,8], [214,104,68,59,102,198,128,201,8,215,173,69,246,84,245,98,176,208,76,217,72,169,74,38,185,109,44,187,126,3,121,84], 49,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([138,182,17,3,63,8,202,95,90,186,136,20,182,8,178,16,182,127,83,102,244,144,157,134,139,23,206,25,221,180,211,87], [3,219,29,159,215,32,228,132,247,255,162,35,220,178,241,162,252,9,27,224,134,243,216,26,71,177,210,103,47,28,1,92],{from: accounts[0]});
  });
});
