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
    let result = await contractMerkleShip.proposeGame(64, [69,130,169,70,184,150,25,140,47,216,191,16,53,19,118,178,31,223,138,84,219,118,62,175,231,51,4,26,45,146,29,42],{from: accounts[0],value:64});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(64, [69,130,169,70,184,150,25,140,47,216,191,16,53,19,118,178,31,223,138,84,219,118,62,175,231,51,4,26,45,146,29,42],{from: accounts[0],value:64}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(65, [69,130,169,70,184,150,25,140,47,216,191,16,53,19,118,178,31,223,138,84,219,118,62,175,231,51,4,26,45,146,29,42],{from: accounts[0],value:64}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(4, [216,230,186,201,7,179,152,255,74,252,192,152,240,224,41,67,174,40,117,202,185,28,96,87,169,2,238,173,125,179,189,147],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(4, [216,230,186,201,7,179,152,255,74,252,192,152,240,224,41,67,174,40,117,202,185,28,96,87,169,2,238,173,125,179,189,147],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(49,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(49,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(180, [181,179], [[200,198,15,109,5,177,159,244,160,247,62,6,166,27,43,146,151,173,8,43,146,242,25,221,20,83,50,87,254,204,214,231],[217,232,73,249,176,75,101,213,34,23,158,254,246,195,252,147,169,211,136,0,164,230,11,16,225,166,237,74,35,214,77,145],[183,110,143,87,116,8,82,44,18,131,174,193,225,98,72,115,220,190,193,122,162,21,37,140,58,232,121,56,110,211,241,96],[163,183,158,64,15,107,132,37,81,105,104,41,97,239,200,55,252,120,92,226,68,42,37,251,204,196,93,207,79,100,154,102],[31,15,27,85,61,63,155,20,71,6,104,106,87,45,151,243,176,239,43,62,236,77,200,199,111,201,88,146,208,51,124,20],[162,31,245,13,207,186,59,101,139,144,123,230,109,13,206,205,130,242,182,148,252,104,16,245,121,95,7,204,5,219,182,202]], "game resolved in an emergency", "verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(180, [181,179], [[200,198,15,109,5,177,159,244,160,247,62,6,166,27,43,146,151,173,8,43,146,242,25,221,20,83,50,87,254,204,214,231],[217,232,73,249,176,75,101,213,34,23,158,254,246,195,252,147,169,211,136,0,164,230,11,16,225,166,237,74,35,214,77,145],[183,110,143,87,116,8,82,44,18,131,174,193,225,98,72,115,220,190,193,122,162,21,37,140,58,232,121,56,110,211,241,96],[163,183,158,64,15,107,132,37,81,105,104,41,97,239,200,55,252,120,92,226,68,42,37,251,204,196,93,207,79,100,154,102],[31,15,27,85,61,63,155,20,71,6,104,106,87,45,151,243,176,239,43,62,236,77,200,199,111,201,88,146,208,51,124,20],[162,31,245,13,207,186,59,101,139,144,123,230,109,13,206,205,130,242,182,148,252,104,16,245,121,95,7,204,5,219,182,202]], "game resolved in an emergency", "verified victory by hit count",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(4,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(4,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(9,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(9,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(3,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(3,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(13, ["victory by abandonment","victory by abandonment","p831s","verified victory by hit count","game resolved in an emergency","p831s","i2k7t","victory by abandonment","game resolved in an emergency","game resolved in an emergency","i2k7t","victory by unanswered challenge","p831s","game resolved in an emergency","victory by unanswered challenge","i2k7t","verified victory by hit count","599a6o","p831s","victory by unchallenged hit count","verified victory by hit count","victory by unanswered challenge","12y3fw","victory by abandonment","verified victory by hit count","victory by unchallenged hit count","victory by concession","game resolved in an emergency","verified victory by hit count","game resolved in an emergency","599a6o","i2k7t","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","p831s","victory by abandonment","599a6o","vfntj","i2k7t","victory by unanswered challenge","victory by abandonment","victory by concession","p831s","victory by concession","game resolved in an emergency","victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","12y3fw","victory by unanswered challenge","game resolved in an emergency","599a6o","victory by unchallenged hit count","victory by unanswered challenge","victory by unchallenged hit count","verified victory by hit count","vfntj","p831s","599a6o","q1tl1l","game resolved in an emergency","verified victory by hit count","victory by unanswered challenge"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(13, ["victory by abandonment","victory by abandonment","p831s","verified victory by hit count","game resolved in an emergency","p831s","i2k7t","victory by abandonment","game resolved in an emergency","game resolved in an emergency","i2k7t","victory by unanswered challenge","p831s","game resolved in an emergency","victory by unanswered challenge","i2k7t","verified victory by hit count","599a6o","p831s","victory by unchallenged hit count","verified victory by hit count","victory by unanswered challenge","12y3fw","victory by abandonment","verified victory by hit count","victory by unchallenged hit count","victory by concession","game resolved in an emergency","verified victory by hit count","game resolved in an emergency","599a6o","i2k7t","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","p831s","victory by abandonment","599a6o","vfntj","i2k7t","victory by unanswered challenge","victory by abandonment","victory by concession","p831s","victory by concession","game resolved in an emergency","victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","12y3fw","victory by unanswered challenge","game resolved in an emergency","599a6o","victory by unchallenged hit count","victory by unanswered challenge","victory by unchallenged hit count","verified victory by hit count","vfntj","p831s","599a6o","q1tl1l","game resolved in an emergency","verified victory by hit count","victory by unanswered challenge"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(64,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("8b8vql",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(64,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(47,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(47,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(100,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(100,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
