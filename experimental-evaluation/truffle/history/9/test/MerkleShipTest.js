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
    let result = await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by unanswered challenge",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(181, [8,43,30,19,62,116,57,245,76,142,9,161,236,13,171,23,52,156,163,97,76,239,159,53,87,199,195,27,86,111,141,176],{from: accounts[0],value:181});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(181, [8,43,30,19,62,116,57,245,76,142,9,161,236,13,171,23,52,156,163,97,76,239,159,53,87,199,195,27,86,111,141,176],{from: accounts[0],value:181}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(182, [8,43,30,19,62,116,57,245,76,142,9,161,236,13,171,23,52,156,163,97,76,239,159,53,87,199,195,27,86,111,141,176],{from: accounts[0],value:181}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(99, [115,93,32,179,64,101,44,180,166,249,92,152,152,170,164,26,148,201,26,51,18,186,42,56,245,95,120,137,42,14,6,133],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(99, [115,93,32,179,64,101,44,180,166,249,92,152,152,170,164,26,148,201,26,51,18,186,42,56,245,95,120,137,42,14,6,133],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(181,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(181,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(3, [40,48], [[37,88,172,215,18,112,249,195,76,107,94,1,29,130,234,43,18,130,203,12,108,121,15,114,34,219,101,91,225,94,93,27],[90,70,22,165,177,138,178,112,199,246,29,33,243,0,100,251,162,144,182,50,111,195,162,173,173,153,14,84,116,112,45,101],[232,9,104,60,33,24,141,186,19,18,111,181,192,217,225,207,27,118,178,242,167,209,34,68,105,35,198,201,241,163,2,22],[101,175,167,144,138,54,180,186,89,31,15,119,56,197,235,196,244,58,43,250,36,96,10,70,80,89,58,59,109,7,18,239],[222,82,109,123,58,247,131,194,28,89,50,170,102,147,213,161,153,158,170,37,229,61,48,108,168,164,51,12,79,42,200,91],[218,201,42,155,155,69,120,69,100,217,179,249,79,62,6,70,97,209,115,3,102,131,6,192,178,229,237,44,246,67,243,55]], "victory by unanswered challenge", "victory by concession",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("mim0sn",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(3, [40,48], [[37,88,172,215,18,112,249,195,76,107,94,1,29,130,234,43,18,130,203,12,108,121,15,114,34,219,101,91,225,94,93,27],[90,70,22,165,177,138,178,112,199,246,29,33,243,0,100,251,162,144,182,50,111,195,162,173,173,153,14,84,116,112,45,101],[232,9,104,60,33,24,141,186,19,18,111,181,192,217,225,207,27,118,178,242,167,209,34,68,105,35,198,201,241,163,2,22],[101,175,167,144,138,54,180,186,89,31,15,119,56,197,235,196,244,58,43,250,36,96,10,70,80,89,58,59,109,7,18,239],[222,82,109,123,58,247,131,194,28,89,50,170,102,147,213,161,153,158,170,37,229,61,48,108,168,164,51,12,79,42,200,91],[218,201,42,155,155,69,120,69,100,217,179,249,79,62,6,70,97,209,115,3,102,131,6,192,178,229,237,44,246,67,243,55]], "victory by unanswered challenge", "victory by concession",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(99,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(99,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(180,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(180,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(0,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(0,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(48, ["victory by unchallenged hit count","victory by concession","hvq07n","victory by concession","verified victory by hit count","verified victory by hit count","game resolved in an emergency","game resolved in an emergency","victory by unchallenged hit count","victory by unanswered challenge","victory by abandonment","verified victory by hit count","game resolved in an emergency","hvq07n","verified victory by hit count","victory by abandonment","verified victory by hit count","victory by abandonment","victory by unanswered challenge","verified victory by hit count","victory by unchallenged hit count","f718af","game resolved in an emergency","verified victory by hit count","victory by unanswered challenge","mim0sn","mim0sn","i1olvrh","2u24yn","vqnhlh","f718af","mim0sn","2u24yn","f718af","1tsdk","f718af","victory by unanswered challenge","victory by unchallenged hit count","hvq07n","victory by unanswered challenge","1tsdk","hvq07n","hvq07n","mim0sn","victory by abandonment","victory by unchallenged hit count","victory by concession","hvq07n","vqnhlh","victory by unanswered challenge","1tsdk","f718af","1tsdk","i1olvrh","victory by unanswered challenge","1tsdk","i1olvrh","2z2ujr","2z2ujr","game resolved in an emergency","game resolved in an emergency","vqnhlh","2z2ujr","victory by unchallenged hit count"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("i1olvrh",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(48, ["victory by unchallenged hit count","victory by concession","hvq07n","victory by concession","verified victory by hit count","verified victory by hit count","game resolved in an emergency","game resolved in an emergency","victory by unchallenged hit count","victory by unanswered challenge","victory by abandonment","verified victory by hit count","game resolved in an emergency","hvq07n","verified victory by hit count","victory by abandonment","verified victory by hit count","victory by abandonment","victory by unanswered challenge","verified victory by hit count","victory by unchallenged hit count","f718af","game resolved in an emergency","verified victory by hit count","victory by unanswered challenge","mim0sn","mim0sn","i1olvrh","2u24yn","vqnhlh","f718af","mim0sn","2u24yn","f718af","1tsdk","f718af","victory by unanswered challenge","victory by unchallenged hit count","hvq07n","victory by unanswered challenge","1tsdk","hvq07n","hvq07n","mim0sn","victory by abandonment","victory by unchallenged hit count","victory by concession","hvq07n","vqnhlh","victory by unanswered challenge","1tsdk","f718af","1tsdk","i1olvrh","victory by unanswered challenge","1tsdk","i1olvrh","2z2ujr","2z2ujr","game resolved in an emergency","game resolved in an emergency","vqnhlh","2z2ujr","victory by unchallenged hit count"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(8,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("2z2ujr",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(8,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(100,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(100,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("luvrjp",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(11,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(11,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
