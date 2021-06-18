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
    let result = await contractSignatureVerifier.hashBid({"amount": 65,"bidder": {"userId": 322,"wallet": accounts[1]}},{from: accounts[0]});
  });
  it('Should execute verifyHardCoded()', async () => {
    let result = await contractSignatureVerifier.verifyHardCoded({from: accounts[0]});
  });
  it('Should execute verifySpecificWithPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithPrefix({"amount": 66,"bidder": {"userId": 26,"wallet": accounts[3]}}, [103,216,228,180,244,160,71,167,31,41,138,235,14,213,34,163,117,97,124,53,149,71,201,41,150,99,157,81,108,159,238,188],{from: accounts[0]});
  });
  it('Should execute verifySpecificWithoutPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithoutPrefix({"amount": 99,"bidder": {"userId": 323,"wallet": accounts[9]}}, [74,147,247,249,228,197,88,211,244,211,84,201,227,193,126,121,198,116,26,93,23,19,42,106,87,78,124,228,109,171,25,127],{from: accounts[0]});
  });
});
