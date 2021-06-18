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
    let result = await contractMerkleShip.emergencyStop("fhmwe9",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("fhmwe9",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(12, [35,101,194,244,114,91,171,128,215,123,95,43,67,77,95,227,131,11,13,132,132,112,58,179,196,113,214,87,228,43,90,174],{from: accounts[0],value:12});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(12, [35,101,194,244,114,91,171,128,215,123,95,43,67,77,95,227,131,11,13,132,132,112,58,179,196,113,214,87,228,43,90,174],{from: accounts[0],value:12}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(13, [35,101,194,244,114,91,171,128,215,123,95,43,67,77,95,227,131,11,13,132,132,112,58,179,196,113,214,87,228,43,90,174],{from: accounts[0],value:12}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(180, [236,209,195,252,74,226,121,51,116,115,248,8,221,74,21,124,158,197,2,76,131,250,122,205,5,245,199,144,7,78,160,146],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(180, [236,209,195,252,74,226,121,51,116,115,248,8,221,74,21,124,158,197,2,76,131,250,122,205,5,245,199,144,7,78,160,146],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(12,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(12,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(179, [9,4], [[115,224,45,107,36,131,54,23,206,123,182,203,79,224,1,27,5,75,252,103,36,32,170,25,128,45,76,151,79,215,190,244],[150,127,187,158,230,0,76,175,37,95,231,23,118,129,122,73,178,19,230,194,27,9,235,167,226,65,101,17,134,178,158,76],[145,140,19,143,242,110,140,32,152,90,23,186,90,225,255,216,241,145,150,133,24,133,28,118,102,220,165,30,238,162,109,209],[161,94,234,192,231,96,197,55,202,202,232,47,113,158,156,119,25,224,36,15,75,105,204,243,229,85,76,140,235,137,74,97],[132,249,58,102,120,59,148,218,120,232,244,217,4,30,181,58,48,151,61,132,226,204,236,78,234,219,44,213,183,142,109,204],[71,130,244,208,173,61,83,19,203,153,159,247,21,215,120,164,254,112,80,16,174,167,111,128,243,74,161,238,141,175,19,55]], "verified victory by hit count", "victory by concession",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(179, [9,4], [[115,224,45,107,36,131,54,23,206,123,182,203,79,224,1,27,5,75,252,103,36,32,170,25,128,45,76,151,79,215,190,244],[150,127,187,158,230,0,76,175,37,95,231,23,118,129,122,73,178,19,230,194,27,9,235,167,226,65,101,17,134,178,158,76],[145,140,19,143,242,110,140,32,152,90,23,186,90,225,255,216,241,145,150,133,24,133,28,118,102,220,165,30,238,162,109,209],[161,94,234,192,231,96,197,55,202,202,232,47,113,158,156,119,25,224,36,15,75,105,204,243,229,85,76,140,235,137,74,97],[132,249,58,102,120,59,148,218,120,232,244,217,4,30,181,58,48,151,61,132,226,204,236,78,234,219,44,213,183,142,109,204],[71,130,244,208,173,61,83,19,203,153,159,247,21,215,120,164,254,112,80,16,174,167,111,128,243,74,161,238,141,175,19,55]], "verified victory by hit count", "victory by concession",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(64,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(64,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(180,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("fhmwe9",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(180,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(49,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(49,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(47, ["victory by concession","victory by concession","victory by abandonment","verified victory by hit count","v4842x","game resolved in an emergency","fhmwe9","victory by unchallenged hit count","victory by concession","victory by abandonment","v4842x","victory by abandonment","fhmwe9","game resolved in an emergency","v4842x","game resolved in an emergency","game resolved in an emergency","hk99wm","v4842x","victory by concession","game resolved in an emergency","victory by unanswered challenge","hk99wm","game resolved in an emergency","game resolved in an emergency","v4842x","victory by concession","game resolved in an emergency","victory by abandonment","fhmwe9","victory by concession","fhmwe9","victory by unchallenged hit count","victory by unchallenged hit count","8h4356","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","verified victory by hit count","v4842x","7rzrb","8qe5te","hk99wm","8qe5te","fhmwe9","8qe5te","verified victory by hit count","game resolved in an emergency","8qe5te","victory by unanswered challenge","victory by unanswered challenge","victory by unanswered challenge","hk99wm","i5tn1b","victory by unanswered challenge","fhmwe9","xy9m5","game resolved in an emergency","fhmwe9","victory by unanswered challenge","victory by abandonment","victory by abandonment","i5tn1b","victory by concession"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("qyl6cs",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(47, ["victory by concession","victory by concession","victory by abandonment","verified victory by hit count","v4842x","game resolved in an emergency","fhmwe9","victory by unchallenged hit count","victory by concession","victory by abandonment","v4842x","victory by abandonment","fhmwe9","game resolved in an emergency","v4842x","game resolved in an emergency","game resolved in an emergency","hk99wm","v4842x","victory by concession","game resolved in an emergency","victory by unanswered challenge","hk99wm","game resolved in an emergency","game resolved in an emergency","v4842x","victory by concession","game resolved in an emergency","victory by abandonment","fhmwe9","victory by concession","fhmwe9","victory by unchallenged hit count","victory by unchallenged hit count","8h4356","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","verified victory by hit count","v4842x","7rzrb","8qe5te","hk99wm","8qe5te","fhmwe9","8qe5te","verified victory by hit count","game resolved in an emergency","8qe5te","victory by unanswered challenge","victory by unanswered challenge","victory by unanswered challenge","hk99wm","i5tn1b","victory by unanswered challenge","fhmwe9","xy9m5","game resolved in an emergency","fhmwe9","victory by unanswered challenge","victory by abandonment","victory by abandonment","i5tn1b","victory by concession"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(47,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("qyl6cs",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(47,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(181,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("b66dnv",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(181,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("8h4356",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(0,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(0,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
