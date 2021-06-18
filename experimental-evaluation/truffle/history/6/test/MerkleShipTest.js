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
    let result = await contractMerkleShip.emergencyStop("victory by abandonment",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by abandonment",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(4, [233,52,158,93,133,247,141,249,49,70,55,96,176,178,230,195,194,50,64,239,77,208,125,160,158,192,135,231,184,117,99,18],{from: accounts[0],value:4});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(4, [233,52,158,93,133,247,141,249,49,70,55,96,176,178,230,195,194,50,64,239,77,208,125,160,158,192,135,231,184,117,99,18],{from: accounts[0],value:4}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(5, [233,52,158,93,133,247,141,249,49,70,55,96,176,178,230,195,194,50,64,239,77,208,125,160,158,192,135,231,184,117,99,18],{from: accounts[0],value:4}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(12, [112,205,171,239,22,61,22,135,225,59,133,100,23,247,119,107,148,193,145,136,217,153,95,124,207,18,231,11,184,151,32,250],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(12, [112,205,171,239,22,61,22,135,225,59,133,100,23,247,119,107,148,193,145,136,217,153,95,124,207,18,231,11,184,151,32,250],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(64,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(64,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(179, [2,48], [[165,194,61,253,150,218,69,124,208,238,203,60,20,47,222,31,136,186,114,105,98,198,21,115,176,220,217,220,226,113,60,25],[122,247,233,85,7,208,228,212,243,207,172,247,113,104,114,125,169,243,227,88,8,87,228,106,27,248,164,137,76,254,74,154],[105,151,204,73,52,38,103,71,95,191,223,9,216,3,147,187,86,54,96,14,84,237,227,121,0,81,221,58,17,231,15,52],[241,88,124,207,97,5,193,239,126,117,173,149,25,212,27,245,44,177,222,72,136,205,102,239,116,247,158,105,197,228,94,107],[202,182,207,233,45,17,39,210,237,30,130,202,115,14,213,165,137,85,92,150,163,220,47,99,67,145,46,35,21,29,209,75],[51,120,132,78,105,73,230,140,38,234,168,100,57,3,110,181,37,157,143,6,143,141,92,178,231,27,102,97,222,33,63,123]], "game resolved in an emergency", "verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(179, [2,48], [[165,194,61,253,150,218,69,124,208,238,203,60,20,47,222,31,136,186,114,105,98,198,21,115,176,220,217,220,226,113,60,25],[122,247,233,85,7,208,228,212,243,207,172,247,113,104,114,125,169,243,227,88,8,87,228,106,27,248,164,137,76,254,74,154],[105,151,204,73,52,38,103,71,95,191,223,9,216,3,147,187,86,54,96,14,84,237,227,121,0,81,221,58,17,231,15,52],[241,88,124,207,97,5,193,239,126,117,173,149,25,212,27,245,44,177,222,72,136,205,102,239,116,247,158,105,197,228,94,107],[202,182,207,233,45,17,39,210,237,30,130,202,115,14,213,165,137,85,92,150,163,220,47,99,67,145,46,35,21,29,209,75],[51,120,132,78,105,73,230,140,38,234,168,100,57,3,110,181,37,157,143,6,143,141,92,178,231,27,102,97,222,33,63,123]], "game resolved in an emergency", "verified victory by hit count",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(13,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(13,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(4,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("77cf3m",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(4,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(41,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("77cf3m",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(41,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(7, ["n890xk","victory by unanswered challenge","77cf3m","victory by unchallenged hit count","victory by unchallenged hit count","victory by abandonment","n890xk","victory by abandonment","victory by concession","bj00ja","victory by concession","game resolved in an emergency","77cf3m","game resolved in an emergency","bj00ja","victory by abandonment","77cf3m","xxq0s","n890xk","victory by abandonment","xxq0s","game resolved in an emergency","victory by unchallenged hit count","victory by unchallenged hit count","verified victory by hit count","verified victory by hit count","victory by unchallenged hit count","bj00ja","bj00ja","77cf3m","victory by unanswered challenge","victory by unanswered challenge","uzfxm8","victory by unanswered challenge","victory by concession","bj00ja","verified victory by hit count","bj00ja","game resolved in an emergency","victory by unanswered challenge","xxq0s","bj00ja","game resolved in an emergency","victory by abandonment","xxq0s","77cf3m","77cf3m","victory by abandonment","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","victory by concession","victory by unanswered challenge","verified victory by hit count","77cf3m","victory by unanswered challenge","victory by concession","game resolved in an emergency","game resolved in an emergency","uzfxm8","victory by unanswered challenge","victory by abandonment","victory by unanswered challenge","victory by abandonment"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("77cf3m",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(7, ["n890xk","victory by unanswered challenge","77cf3m","victory by unchallenged hit count","victory by unchallenged hit count","victory by abandonment","n890xk","victory by abandonment","victory by concession","bj00ja","victory by concession","game resolved in an emergency","77cf3m","game resolved in an emergency","bj00ja","victory by abandonment","77cf3m","xxq0s","n890xk","victory by abandonment","xxq0s","game resolved in an emergency","victory by unchallenged hit count","victory by unchallenged hit count","verified victory by hit count","verified victory by hit count","victory by unchallenged hit count","bj00ja","bj00ja","77cf3m","victory by unanswered challenge","victory by unanswered challenge","uzfxm8","victory by unanswered challenge","victory by concession","bj00ja","verified victory by hit count","bj00ja","game resolved in an emergency","victory by unanswered challenge","xxq0s","bj00ja","game resolved in an emergency","victory by abandonment","xxq0s","77cf3m","77cf3m","victory by abandonment","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","victory by concession","victory by unanswered challenge","verified victory by hit count","77cf3m","victory by unanswered challenge","victory by concession","game resolved in an emergency","game resolved in an emergency","uzfxm8","victory by unanswered challenge","victory by abandonment","victory by unanswered challenge","victory by abandonment"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(40,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("n890xk",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(40,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(8,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(8,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("77cf3m",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(12,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(12,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
