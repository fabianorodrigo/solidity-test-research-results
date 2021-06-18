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
    let result = await contractSignatureVerifier.hashBid({"amount": 65,"bidder": {"userId": 0,"wallet": accounts[1]}},{from: accounts[0]});
  });
  it('Should execute verifyHardCoded()', async () => {
    let result = await contractSignatureVerifier.verifyHardCoded({from: accounts[0]});
  });
  it('Should execute verifySpecificWithPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithPrefix({"amount": 322,"bidder": {"userId": 324,"wallet": accounts[1]}}, [217,5,8,98,136,172,127,12,49,154,70,24,9,158,242,138,213,133,148,73,24,120,21,25,82,98,253,131,105,58,117,95],{from: accounts[0]});
  });
  it('Should execute verifySpecificWithoutPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithoutPrefix({"amount": 2,"bidder": {"userId": 323,"wallet": accounts[9]}}, [235,181,21,243,95,247,12,213,167,232,102,205,188,199,31,157,156,22,57,244,96,173,152,133,61,53,122,59,167,14,162,208],{from: accounts[0]});
  });
});
