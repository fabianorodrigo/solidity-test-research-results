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
    let result = await contractMerkleShip.emergencyStop("game resolved in an emergency",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("game resolved in an emergency",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(180, [166,143,157,118,165,150,72,123,27,189,8,98,61,219,47,52,158,227,54,204,105,174,71,2,1,128,207,141,150,54,94,103],{from: accounts[0],value:180});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(180, [166,143,157,118,165,150,72,123,27,189,8,98,61,219,47,52,158,227,54,204,105,174,71,2,1,128,207,141,150,54,94,103],{from: accounts[0],value:180}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(181, [166,143,157,118,165,150,72,123,27,189,8,98,61,219,47,52,158,227,54,204,105,174,71,2,1,128,207,141,150,54,94,103],{from: accounts[0],value:180}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(101, [114,162,217,194,14,188,59,143,129,113,238,193,9,137,175,26,146,209,81,148,141,58,178,189,1,191,254,210,34,231,60,43],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(101, [114,162,217,194,14,188,59,143,129,113,238,193,9,137,175,26,146,209,81,148,141,58,178,189,1,191,254,210,34,231,60,43],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(48,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(48,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(13, [63,181], [[147,67,248,164,42,54,244,96,19,155,168,219,11,151,73,183,129,15,102,166,231,239,10,214,211,186,51,106,17,139,17,237],[2,184,10,152,134,100,126,207,22,213,170,107,62,113,24,180,60,212,2,193,186,77,100,111,30,240,252,217,126,222,177,240],[113,234,183,178,79,240,193,95,68,101,10,210,66,212,234,201,37,20,173,187,187,82,207,252,138,202,33,154,46,35,205,19],[164,167,42,239,169,191,200,174,61,48,192,51,36,179,18,68,251,186,122,16,233,192,122,115,216,156,243,41,241,42,171,2],[66,252,199,243,217,199,41,21,87,47,109,217,109,114,89,155,143,213,87,151,218,202,25,132,16,37,15,59,238,4,33,9],[119,252,66,114,249,242,73,113,138,8,54,119,178,15,253,201,51,103,191,113,187,64,179,22,158,131,147,103,117,106,166,112]], "verified victory by hit count", "victory by abandonment",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(13, [63,181], [[147,67,248,164,42,54,244,96,19,155,168,219,11,151,73,183,129,15,102,166,231,239,10,214,211,186,51,106,17,139,17,237],[2,184,10,152,134,100,126,207,22,213,170,107,62,113,24,180,60,212,2,193,186,77,100,111,30,240,252,217,126,222,177,240],[113,234,183,178,79,240,193,95,68,101,10,210,66,212,234,201,37,20,173,187,187,82,207,252,138,202,33,154,46,35,205,19],[164,167,42,239,169,191,200,174,61,48,192,51,36,179,18,68,251,186,122,16,233,192,122,115,216,156,243,41,241,42,171,2],[66,252,199,243,217,199,41,21,87,47,109,217,109,114,89,155,143,213,87,151,218,202,25,132,16,37,15,59,238,4,33,9],[119,252,66,114,249,242,73,113,138,8,54,119,178,15,253,201,51,103,191,113,187,64,179,22,158,131,147,103,117,106,166,112]], "verified victory by hit count", "victory by abandonment",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(63,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(63,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(63,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(63,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(12,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(12,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(101, ["victory by concession","victory by concession","game resolved in an emergency","victory by unanswered challenge","game resolved in an emergency","victory by unanswered challenge","verified victory by hit count","victory by abandonment","verified victory by hit count","game resolved in an emergency","victory by unanswered challenge","victory by unchallenged hit count","uu3tf","gjp77","victory by unchallenged hit count","victory by abandonment","uu3tf","uu3tf","victory by concession","uu3tf","victory by abandonment","victory by abandonment","verified victory by hit count","victory by unanswered challenge","74drzq","uu3tf","74drzq","victory by abandonment","74drzq","74drzq","lasrg","uu3tf","uu3tf","uu3tf","lasrg","lasrg","victory by unchallenged hit count","verified victory by hit count","74drzq","victory by abandonment","victory by unanswered challenge","victory by abandonment","gjp77","victory by abandonment","i3rk2k","74drzq","victory by concession","victory by abandonment","victory by unanswered challenge","verified victory by hit count","victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","victory by abandonment","victory by concession","victory by unanswered challenge","victory by unanswered challenge","game resolved in an emergency","74drzq","f16wx3","victory by unchallenged hit count","gjp77","gjp77","uu3tf"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("lasrg",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(101, ["victory by concession","victory by concession","game resolved in an emergency","victory by unanswered challenge","game resolved in an emergency","victory by unanswered challenge","verified victory by hit count","victory by abandonment","verified victory by hit count","game resolved in an emergency","victory by unanswered challenge","victory by unchallenged hit count","uu3tf","gjp77","victory by unchallenged hit count","victory by abandonment","uu3tf","uu3tf","victory by concession","uu3tf","victory by abandonment","victory by abandonment","verified victory by hit count","victory by unanswered challenge","74drzq","uu3tf","74drzq","victory by abandonment","74drzq","74drzq","lasrg","uu3tf","uu3tf","uu3tf","lasrg","lasrg","victory by unchallenged hit count","verified victory by hit count","74drzq","victory by abandonment","victory by unanswered challenge","victory by abandonment","gjp77","victory by abandonment","i3rk2k","74drzq","victory by concession","victory by abandonment","victory by unanswered challenge","verified victory by hit count","victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","victory by abandonment","victory by concession","victory by unanswered challenge","victory by unanswered challenge","game resolved in an emergency","74drzq","f16wx3","victory by unchallenged hit count","gjp77","gjp77","uu3tf"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(3,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(3,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(40,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(40,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(64,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(64,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
