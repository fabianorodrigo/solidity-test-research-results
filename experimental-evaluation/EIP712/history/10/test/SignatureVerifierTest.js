const truffleAssert = require('truffle-assertions');
const EcTools = artifacts.require("EcTools");
const SignatureVerifier = artifacts.require("SignatureVerifier");
const ProxyEcTools = artifacts.require("ProxyEcTools");

contract("SignatureVerifier",(accounts)=>{
  let trace = false;
  let contractEcTools = null;
  let contractSignatureVerifier = null;
  beforeEach(async () => {
    contractEcTools = await EcTools.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: EcTools.new({from: accounts[0]}');
    SignatureVerifier.link("EcTools",contractEcTools.address);
    contractSignatureVerifier = await SignatureVerifier.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SignatureVerifier.new({from: accounts[0]}');
  });
  
  it('Should execute hashBid(SignatureVerifier.Bid)', async () => {
    let result = await contractSignatureVerifier.hashBid({"amount": 26,"bidder": {"userId": 65,"wallet": accounts[9]}},{from: accounts[0]});
  });
  it('Should execute verifyHardCoded()', async () => {
    let result = await contractSignatureVerifier.verifyHardCoded({from: accounts[0]});
  });
  it('Should execute verifySpecificWithPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithPrefix({"amount": 28,"bidder": {"userId": 26,"wallet": accounts[4]}}, [36,26,16,44,227,100,49,42,183,221,34,209,24,16,119,239,187,182,107,46,152,88,251,99,221,201,253,209,48,149,113,8],{from: accounts[0]});
  });
  it('Should execute verifySpecificWithoutPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithoutPrefix({"amount": 66,"bidder": {"userId": 99,"wallet": accounts[8]}}, [106,166,62,229,189,164,191,186,120,47,238,131,124,80,37,142,103,142,32,120,53,117,86,236,238,122,128,208,121,82,18,152],{from: accounts[0]});
  });
});
