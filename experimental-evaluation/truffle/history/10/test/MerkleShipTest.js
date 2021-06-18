const truffleAssert = require('truffle-assertions');
const MerkleShip = artifacts.require("MerkleShip");
const SafeMath = artifacts.require("SafeMath");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("MerkleShip",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractMerkleShip = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    MerkleShip.link("SafeMath",contractSafeMath.address);
    contractMerkleShip = await MerkleShip.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MerkleShip.new({from:accounts[0]}');
  });
  
  it('Should execute emergencyStop(string) WHEN msg.sender==admin,isStopped==false', async () => {
    let result = await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(7, [143,111,114,24,53,252,77,238,57,198,114,82,159,113,204,236,208,56,9,159,195,79,171,152,85,3,202,88,148,91,191,180],{from: accounts[0],value:7});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(7, [143,111,114,24,53,252,77,238,57,198,114,82,159,113,204,236,208,56,9,159,195,79,171,152,85,3,202,88,148,91,191,180],{from: accounts[0],value:7}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(8, [143,111,114,24,53,252,77,238,57,198,114,82,159,113,204,236,208,56,9,159,195,79,171,152,85,3,202,88,148,91,191,180],{from: accounts[0],value:7}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(64, [91,75,214,134,75,164,211,104,223,128,168,20,63,74,34,206,239,244,45,120,147,236,166,163,80,122,104,137,56,235,39,65],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("sdpep",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(64, [91,75,214,134,75,164,211,104,223,128,168,20,63,74,34,206,239,244,45,120,147,236,166,163,80,122,104,137,56,235,39,65],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(2,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(2,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(65, [48,64], [[53,124,90,197,145,183,139,184,31,165,137,99,187,82,56,188,254,141,136,41,248,214,58,140,152,10,16,81,104,249,18,190],[235,105,175,87,158,217,241,39,199,172,72,173,192,196,66,41,58,72,197,141,66,165,227,110,56,121,225,2,63,168,87,99],[153,213,239,148,112,73,194,77,99,56,101,0,253,25,211,201,199,186,119,235,223,33,115,192,21,152,91,134,233,82,219,82],[127,225,72,93,112,109,28,164,241,0,78,8,226,28,49,91,145,118,107,50,84,40,97,234,169,65,48,230,251,233,100,186],[132,223,118,136,42,84,63,182,162,145,194,89,136,152,161,109,216,19,223,129,85,150,140,24,209,43,233,109,247,254,249,166],[81,237,90,230,6,156,142,116,193,19,83,209,7,155,239,29,188,145,248,206,75,144,7,11,36,203,224,75,197,255,240,237]], "victory by abandonment", "2ajlvd",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("2ajlvd",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(65, [48,64], [[53,124,90,197,145,183,139,184,31,165,137,99,187,82,56,188,254,141,136,41,248,214,58,140,152,10,16,81,104,249,18,190],[235,105,175,87,158,217,241,39,199,172,72,173,192,196,66,41,58,72,197,141,66,165,227,110,56,121,225,2,63,168,87,99],[153,213,239,148,112,73,194,77,99,56,101,0,253,25,211,201,199,186,119,235,223,33,115,192,21,152,91,134,233,82,219,82],[127,225,72,93,112,109,28,164,241,0,78,8,226,28,49,91,145,118,107,50,84,40,97,234,169,65,48,230,251,233,100,186],[132,223,118,136,42,84,63,182,162,145,194,89,136,152,161,109,216,19,223,129,85,150,140,24,209,43,233,109,247,254,249,166],[81,237,90,230,6,156,142,116,193,19,83,209,7,155,239,29,188,145,248,206,75,144,7,11,36,203,224,75,197,255,240,237]], "victory by abandonment", "2ajlvd",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(7,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("sdpep",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(7,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(63,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(63,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(180,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(180,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(7, ["sdpep","pfidxl","sdpep","victory by unchallenged hit count","y1zdxh","game resolved in an emergency","victory by abandonment","victory by unanswered challenge","victory by unchallenged hit count","2ajlvd","oxpehh","2ajlvd","k1xwuu","2ajlvd","y1zdxh","victory by abandonment","game resolved in an emergency","pfidxl","victory by concession","70cqob","sdpep","victory by abandonment","verified victory by hit count","clokhe","verified victory by hit count","sdpep","y1zdxh","game resolved in an emergency","2ajlvd","2ajlvd","2ajlvd","victory by abandonment","game resolved in an emergency","2ajlvd","y1zdxh","victory by unanswered challenge","nfkser","70cqob","game resolved in an emergency","verified victory by hit count","nfkser","y1zdxh","victory by unchallenged hit count","o0h5j9","pfidxl","742drb","2ajlvd","742drb","game resolved in an emergency","game resolved in an emergency","sdpep","k1xwuu","victory by abandonment","victory by abandonment","2ajlvd","sdpep","game resolved in an emergency","o0h5j9","sdpep","nfkser","nfkser","oxpehh","k1xwuu","pfidxl"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("2ajlvd",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(7, ["sdpep","pfidxl","sdpep","victory by unchallenged hit count","y1zdxh","game resolved in an emergency","victory by abandonment","victory by unanswered challenge","victory by unchallenged hit count","2ajlvd","oxpehh","2ajlvd","k1xwuu","2ajlvd","y1zdxh","victory by abandonment","game resolved in an emergency","pfidxl","victory by concession","70cqob","sdpep","victory by abandonment","verified victory by hit count","clokhe","verified victory by hit count","sdpep","y1zdxh","game resolved in an emergency","2ajlvd","2ajlvd","2ajlvd","victory by abandonment","game resolved in an emergency","2ajlvd","y1zdxh","victory by unanswered challenge","nfkser","70cqob","game resolved in an emergency","verified victory by hit count","nfkser","y1zdxh","victory by unchallenged hit count","o0h5j9","pfidxl","742drb","2ajlvd","742drb","game resolved in an emergency","game resolved in an emergency","sdpep","k1xwuu","victory by abandonment","victory by abandonment","2ajlvd","sdpep","game resolved in an emergency","o0h5j9","sdpep","nfkser","nfkser","oxpehh","k1xwuu","pfidxl"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(2,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(2,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(39,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("pfidxl",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(39,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("o0h5j9",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(9,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(9,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
