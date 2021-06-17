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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([177,219,166,161,49,198,210,82,63,191,231,172,43,3,111,40,148,198,116,29,45,66,134,114,143,10,254,97,148,163,242,137],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([210,150,46,46,94,128,65,92,70,220,154,101,180,103,188,145,233,154,249,9,75,63,40,46,27,40,20,43,136,7,49,251],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(33,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([109,156,96,229,78,66,67,219,129,249,57,179,206,217,14,115,241,133,62,252,116,92,194,234,115,165,154,248,232,92,83,56], 10000,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([75,181,224,164,163,113,241,29,126,125,96,160,34,55,11,164,157,44,141,77,198,31,44,42,22,26,209,119,90,59,7,236],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([110,7,43,139,158,146,165,116,143,233,205,172,177,111,28,21,172,211,148,136,218,169,230,161,91,16,150,97,232,187,249,255], [15,131,101,37,62,143,15,88,98,11,251,84,7,204,161,42,142,13,180,59,127,105,150,152,186,19,42,195,104,86,244,244], 27,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([99,77,53,230,251,215,90,190,79,215,24,210,136,114,213,69,122,249,4,203,236,235,240,252,42,234,155,61,180,174,230,219], [38,251,202,0,203,4,178,103,68,25,223,157,226,10,136,135,210,180,50,161,71,222,6,100,23,116,100,220,234,190,253,34],{from: accounts[0]});
  });
});
