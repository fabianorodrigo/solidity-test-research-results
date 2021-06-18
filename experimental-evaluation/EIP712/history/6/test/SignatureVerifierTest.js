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
    let result = await contractSignatureVerifier.hashBid({"amount": 324,"bidder": {"userId": 65,"wallet": accounts[6]}},{from: accounts[0]});
  });
  it('Should execute verifyHardCoded()', async () => {
    let result = await contractSignatureVerifier.verifyHardCoded({from: accounts[0]});
  });
  it('Should execute verifySpecificWithPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithPrefix({"amount": 100,"bidder": {"userId": 100,"wallet": accounts[9]}}, [175,175,123,53,0,184,95,214,9,108,224,82,210,130,35,252,216,4,218,59,165,132,252,188,10,143,97,55,240,235,147,121],{from: accounts[0]});
  });
  it('Should execute verifySpecificWithoutPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithoutPrefix({"amount": 99,"bidder": {"userId": 0,"wallet": accounts[2]}}, [157,31,204,77,210,195,26,17,86,0,40,20,21,148,214,241,191,132,58,135,75,45,162,217,226,136,149,103,47,83,215,180],{from: accounts[0]});
  });
});
