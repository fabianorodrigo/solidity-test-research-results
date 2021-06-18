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
    let result = await contractSignatureVerifier.hashBid({"amount": 323,"bidder": {"userId": 99,"wallet": accounts[4]}},{from: accounts[0]});
  });
  it('Should execute verifyHardCoded()', async () => {
    let result = await contractSignatureVerifier.verifyHardCoded({from: accounts[0]});
  });
  it('Should execute verifySpecificWithPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithPrefix({"amount": 28,"bidder": {"userId": 64,"wallet": accounts[9]}}, [252,61,232,254,153,84,63,35,85,103,25,94,134,112,203,108,94,237,176,119,197,119,226,33,151,172,191,0,238,110,41,206],{from: accounts[0]});
  });
  it('Should execute verifySpecificWithoutPrefix(SignatureVerifier.Bid,bytes)', async () => {
    let result = await contractSignatureVerifier.verifySpecificWithoutPrefix({"amount": 26,"bidder": {"userId": 26,"wallet": accounts[0]}}, [217,166,251,234,53,94,113,67,41,214,208,227,225,98,90,154,249,3,247,234,211,63,39,39,163,207,176,45,125,45,207,79],{from: accounts[0]});
  });
});
