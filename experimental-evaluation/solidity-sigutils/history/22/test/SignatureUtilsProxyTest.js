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
    let result = await contractProxySignatureUtils.testtoEthBytes32SignedMessageHash([187,13,221,205,201,128,153,14,83,209,142,0,224,159,38,30,213,192,12,20,163,186,241,242,179,26,83,15,209,254,245,120],{from: accounts[0]});
  });
  it('Should execute testtoEthPersonalSignedMessageHash(bytes)', async () => {
    let result = await contractProxySignatureUtils.testtoEthPersonalSignedMessageHash([1,125,181,76,70,241,118,45,105,224,185,64,141,4,14,84,37,102,101,55,23,128,32,205,213,135,59,31,20,226,241,145],{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v==0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(0,{from: accounts[0]});
  });
  it('Should execute testuintToString(uint) WHEN v!=0', async () => {
    let result = await contractProxySignatureUtils.testuintToString(32,{from: accounts[0]});
  });
  it('Should execute testparseSignature(bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testparseSignature([19,129,121,94,34,211,158,229,208,14,241,147,82,216,52,101,131,126,85,41,207,46,118,90,86,237,111,56,23,241,242,96], 5,{from: accounts[0]});
  });
  it('Should execute testcountSignatures(bytes)', async () => {
    let result = await contractProxySignatureUtils.testcountSignatures([183,170,226,50,12,112,219,106,164,115,221,206,77,238,135,213,240,201,246,189,40,237,27,84,191,137,233,2,61,177,147,131],{from: accounts[0]});
  });
  it('Should execute testrecoverAddress(bytes32,bytes,uint)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddress([158,252,115,100,126,164,40,159,0,188,193,96,66,13,225,187,217,130,185,47,89,231,51,250,208,110,147,49,203,180,30,180], [151,174,207,253,241,215,160,163,240,39,145,31,49,9,180,158,187,254,86,30,19,192,248,160,229,71,51,39,229,176,97,180], 255,{from: accounts[0]});
  });
  it('Should execute testrecoverAddresses(bytes32,bytes)', async () => {
    let result = await contractProxySignatureUtils.testrecoverAddresses([255,29,127,0,128,130,105,75,192,17,254,148,93,244,57,59,125,244,107,131,137,120,109,8,70,226,183,172,106,236,219,179], [165,51,129,100,191,74,75,103,246,120,33,197,18,73,33,168,120,47,225,130,112,119,0,174,183,185,80,46,213,226,71,208],{from: accounts[0]});
  });
});
