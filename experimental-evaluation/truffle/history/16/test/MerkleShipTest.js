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
    let result = await contractMerkleShip.emergencyStop("victory by concession",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by concession",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(1, [65,231,153,89,85,1,68,3,131,174,8,93,75,194,130,19,87,40,234,177,156,192,198,223,50,0,90,140,209,220,124,138],{from: accounts[0],value:1});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(1, [65,231,153,89,85,1,68,3,131,174,8,93,75,194,130,19,87,40,234,177,156,192,198,223,50,0,90,140,209,220,124,138],{from: accounts[0],value:1}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(2, [65,231,153,89,85,1,68,3,131,174,8,93,75,194,130,19,87,40,234,177,156,192,198,223,50,0,90,140,209,220,124,138],{from: accounts[0],value:1}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(180, [213,151,141,224,47,166,61,135,97,24,252,0,73,95,200,90,31,65,123,57,101,243,14,160,174,223,120,67,49,229,32,133],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(180, [213,151,141,224,47,166,61,135,97,24,252,0,73,95,200,90,31,65,123,57,101,243,14,160,174,223,120,67,49,229,32,133],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(48,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(48,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(2, [11,2], [[143,219,113,89,4,147,2,108,184,6,175,160,219,254,220,195,102,153,183,89,110,157,154,141,172,46,156,214,168,2,156,77],[9,172,228,28,177,143,221,97,72,21,198,155,153,181,247,134,149,168,212,24,111,233,20,202,67,71,149,242,174,100,172,147],[42,158,13,149,224,141,32,122,83,224,235,125,22,117,248,185,22,26,209,250,137,237,37,103,163,47,187,58,231,136,210,186],[127,178,137,242,121,183,250,19,230,254,126,202,221,21,140,19,1,220,240,175,234,222,51,159,221,171,215,71,195,92,145,214],[88,254,174,135,110,62,157,184,212,131,16,54,212,206,85,125,83,141,221,190,11,11,220,135,5,229,77,127,169,74,43,3],[67,98,53,21,30,53,220,174,242,137,110,204,246,209,77,112,52,60,76,177,76,250,243,159,253,19,220,11,70,14,13,250]], "victory by unanswered challenge", "fbt7g",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(2, [11,2], [[143,219,113,89,4,147,2,108,184,6,175,160,219,254,220,195,102,153,183,89,110,157,154,141,172,46,156,214,168,2,156,77],[9,172,228,28,177,143,221,97,72,21,198,155,153,181,247,134,149,168,212,24,111,233,20,202,67,71,149,242,174,100,172,147],[42,158,13,149,224,141,32,122,83,224,235,125,22,117,248,185,22,26,209,250,137,237,37,103,163,47,187,58,231,136,210,186],[127,178,137,242,121,183,250,19,230,254,126,202,221,21,140,19,1,220,240,175,234,222,51,159,221,171,215,71,195,92,145,214],[88,254,174,135,110,62,157,184,212,131,16,54,212,206,85,125,83,141,221,190,11,11,220,135,5,229,77,127,169,74,43,3],[67,98,53,21,30,53,220,174,242,137,110,204,246,209,77,112,52,60,76,177,76,250,243,159,253,19,220,11,70,14,13,250]], "victory by unanswered challenge", "fbt7g",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(179,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(179,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(48,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("gew9zi",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(48,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(4,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(4,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(47, ["fbt7g","verified victory by hit count","victory by unanswered challenge","fbt7g","victory by abandonment","verified victory by hit count","victory by abandonment","game resolved in an emergency","victory by unanswered challenge","gew9zi","victory by concession","fbt7g","6xdvcl","zc50lc","zc50lc","victory by unchallenged hit count","victory by unanswered challenge","gew9zi","fbt7g","verified victory by hit count","game resolved in an emergency","fbt7g","fbt7g","victory by concession","mp2cu8","victory by concession","gew9zi","jk8jfr","game resolved in an emergency","victory by abandonment","victory by unanswered challenge","gew9zi","victory by abandonment","victory by unanswered challenge","mp2cu8","victory by unanswered challenge","6xdvcl","jk8jfr","jk8jfr","fbt7g","victory by unanswered challenge","87yy8","victory by unchallenged hit count","v37nks","uh5wfm","zc50lc","6xdvcl","victory by unchallenged hit count","victory by abandonment","game resolved in an emergency","fbt7g","6xdvcl","verified victory by hit count","victory by concession","game resolved in an emergency","game resolved in an emergency","victory by abandonment","victory by concession","game resolved in an emergency","victory by unchallenged hit count","victory by abandonment","zc50lc","victory by unchallenged hit count","87yy8"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(47, ["fbt7g","verified victory by hit count","victory by unanswered challenge","fbt7g","victory by abandonment","verified victory by hit count","victory by abandonment","game resolved in an emergency","victory by unanswered challenge","gew9zi","victory by concession","fbt7g","6xdvcl","zc50lc","zc50lc","victory by unchallenged hit count","victory by unanswered challenge","gew9zi","fbt7g","verified victory by hit count","game resolved in an emergency","fbt7g","fbt7g","victory by concession","mp2cu8","victory by concession","gew9zi","jk8jfr","game resolved in an emergency","victory by abandonment","victory by unanswered challenge","gew9zi","victory by abandonment","victory by unanswered challenge","mp2cu8","victory by unanswered challenge","6xdvcl","jk8jfr","jk8jfr","fbt7g","victory by unanswered challenge","87yy8","victory by unchallenged hit count","v37nks","uh5wfm","zc50lc","6xdvcl","victory by unchallenged hit count","victory by abandonment","game resolved in an emergency","fbt7g","6xdvcl","verified victory by hit count","victory by concession","game resolved in an emergency","game resolved in an emergency","victory by abandonment","victory by concession","game resolved in an emergency","victory by unchallenged hit count","victory by abandonment","zc50lc","victory by unchallenged hit count","87yy8"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(4,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(4,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(48,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(48,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("uh5wfm",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(179,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(179,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
