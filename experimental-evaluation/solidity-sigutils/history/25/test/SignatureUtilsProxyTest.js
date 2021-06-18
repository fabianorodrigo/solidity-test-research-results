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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([155,2,7,210,243,171,26,53,118,18,20,14,83,223,151,3,178,53,174,135,236,167,99,228,138,199,35,112,154,207,206,25],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([186,58,196,135,164,88,26,141,135,232,51,195,133,150,141,221,26,69,83,56,71,69,137,187,158,9,167,37,199,4,64,106],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(3,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([24,13,26,191,167,225,122,236,86,0,245,154,230,165,62,102,42,53,26,166,135,21,169,110,225,13,49,32,104,154,150,114], 48,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([9,244,130,161,74,220,165,244,254,137,40,189,76,179,15,183,151,158,17,59,19,129,205,144,105,122,55,200,238,65,134,17],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([107,4,126,135,209,216,119,4,250,21,152,157,217,151,26,6,44,116,54,52,38,185,145,96,147,14,221,53,92,95,142,194], [91,92,82,28,18,186,146,170,94,173,149,181,165,141,60,48,15,219,136,66,93,162,212,159,216,225,71,52,141,124,248,24], 1,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([69,194,54,169,252,140,180,199,77,16,111,74,251,191,245,86,95,232,90,119,169,128,186,155,130,70,177,108,108,166,165,236], [155,165,216,151,217,89,161,15,172,172,47,85,17,252,137,38,49,38,127,6,13,162,192,181,137,58,140,216,65,251,157,252],{from: accounts[0]});
  });
});
