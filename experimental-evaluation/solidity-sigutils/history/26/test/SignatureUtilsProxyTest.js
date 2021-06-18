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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([169,164,214,93,63,30,192,151,63,218,126,68,56,188,193,228,155,163,187,103,39,5,51,40,20,76,60,114,203,118,75,78],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([154,253,143,85,132,139,85,0,220,99,54,207,106,86,49,211,79,12,113,20,7,214,126,153,248,36,112,159,95,69,10,162],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(1001,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([133,167,23,226,22,130,177,16,123,117,212,250,179,180,207,55,230,157,167,22,106,27,177,35,73,45,198,62,190,65,237,55], 5,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([208,72,173,42,100,158,50,141,66,13,56,111,96,211,210,217,178,100,40,11,141,136,195,131,172,79,159,15,65,163,181,16],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([147,160,210,102,72,124,4,233,77,237,165,49,138,4,167,231,41,230,182,9,247,46,70,243,60,247,20,202,140,92,254,205], [148,13,158,55,10,120,251,35,129,96,151,216,94,217,124,33,231,72,192,95,209,155,105,233,166,232,203,9,86,114,51,82], 9999,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([55,8,157,218,252,42,119,127,12,218,28,56,68,88,137,187,92,201,70,94,2,112,120,134,205,159,137,47,248,52,54,234], [214,224,76,50,12,129,216,65,219,85,106,61,132,36,42,188,63,87,167,155,181,67,10,65,132,151,12,239,13,22,189,247],{from: accounts[0]});
  });
});
