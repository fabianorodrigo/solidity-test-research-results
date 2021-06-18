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
    let result = await contractMerkleShip.emergencyStop("verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("verified victory by hit count",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(12, [204,137,38,24,54,139,77,251,186,217,209,14,254,7,67,66,143,207,76,1,89,254,31,82,211,239,202,114,123,71,61,191],{from: accounts[0],value:12});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("2r558",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(12, [204,137,38,24,54,139,77,251,186,217,209,14,254,7,67,66,143,207,76,1,89,254,31,82,211,239,202,114,123,71,61,191],{from: accounts[0],value:12}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(13, [204,137,38,24,54,139,77,251,186,217,209,14,254,7,67,66,143,207,76,1,89,254,31,82,211,239,202,114,123,71,61,191],{from: accounts[0],value:12}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(181, [114,96,168,71,192,84,76,118,195,91,175,40,192,117,60,208,71,186,190,197,32,230,141,2,150,255,204,235,59,125,115,38],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("itqo2k",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(181, [114,96,168,71,192,84,76,118,195,91,175,40,192,117,60,208,71,186,190,197,32,230,141,2,150,255,204,235,59,125,115,38],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(39,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(39,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(100, [0,180], [[127,210,129,141,109,2,66,119,45,191,71,83,202,254,229,117,151,146,249,77,104,221,20,144,254,207,60,113,115,51,190,184],[6,141,74,236,61,42,223,162,25,165,179,94,101,231,168,194,82,151,85,66,123,62,254,49,60,127,45,103,174,128,80,192],[223,31,228,177,49,203,188,143,19,42,211,51,5,15,101,218,29,8,6,153,149,6,52,217,65,73,3,187,105,37,243,4],[175,174,49,119,179,102,241,125,216,237,2,154,155,227,56,106,20,119,225,126,167,116,30,52,154,172,110,237,114,16,122,247],[111,120,139,242,205,195,106,54,33,244,150,24,114,66,223,136,207,172,195,150,55,162,166,76,73,235,149,132,212,95,16,233],[36,164,76,157,87,62,131,235,17,246,196,31,48,199,95,203,175,225,26,121,77,33,145,30,212,142,8,196,152,92,191,192]], "victory by unanswered challenge", "verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("itqo2k",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(100, [0,180], [[127,210,129,141,109,2,66,119,45,191,71,83,202,254,229,117,151,146,249,77,104,221,20,144,254,207,60,113,115,51,190,184],[6,141,74,236,61,42,223,162,25,165,179,94,101,231,168,194,82,151,85,66,123,62,254,49,60,127,45,103,174,128,80,192],[223,31,228,177,49,203,188,143,19,42,211,51,5,15,101,218,29,8,6,153,149,6,52,217,65,73,3,187,105,37,243,4],[175,174,49,119,179,102,241,125,216,237,2,154,155,227,56,106,20,119,225,126,167,116,30,52,154,172,110,237,114,16,122,247],[111,120,139,242,205,195,106,54,33,244,150,24,114,66,223,136,207,172,195,150,55,162,166,76,73,235,149,132,212,95,16,233],[36,164,76,157,87,62,131,235,17,246,196,31,48,199,95,203,175,225,26,121,77,33,145,30,212,142,8,196,152,92,191,192]], "victory by unanswered challenge", "verified victory by hit count",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(49,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("2r558",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(49,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(101,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(101,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(179,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(179,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(7, ["duozmh","verified victory by hit count","2r558","4vq65","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","verified victory by hit count","4vq65","victory by abandonment","victory by unanswered challenge","victory by abandonment","y2nrd3","verified victory by hit count","victory by abandonment","game resolved in an emergency","duozmh","game resolved in an emergency","duozmh","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","2r558","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","victory by abandonment","duozmh","lopuwh","game resolved in an emergency","y2nrd3","y2nrd3","victory by concession","victory by abandonment","itqo2k","2r558","victory by abandonment","victory by unanswered challenge","victory by concession","lopuwh","victory by unchallenged hit count","y2nrd3","victory by abandonment","game resolved in an emergency","verified victory by hit count","victory by abandonment","lc909","itqo2k","victory by concession","victory by unanswered challenge","g28od","lc909","y2nrd3","y2nrd3","victory by unanswered challenge","verified victory by hit count","victory by unanswered challenge","lopuwh","duozmh","duozmh","js0adm"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(7, ["duozmh","verified victory by hit count","2r558","4vq65","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","verified victory by hit count","4vq65","victory by abandonment","victory by unanswered challenge","victory by abandonment","y2nrd3","verified victory by hit count","victory by abandonment","game resolved in an emergency","duozmh","game resolved in an emergency","duozmh","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","2r558","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","victory by abandonment","duozmh","lopuwh","game resolved in an emergency","y2nrd3","y2nrd3","victory by concession","victory by abandonment","itqo2k","2r558","victory by abandonment","victory by unanswered challenge","victory by concession","lopuwh","victory by unchallenged hit count","y2nrd3","victory by abandonment","game resolved in an emergency","verified victory by hit count","victory by abandonment","lc909","itqo2k","victory by concession","victory by unanswered challenge","g28od","lc909","y2nrd3","y2nrd3","victory by unanswered challenge","verified victory by hit count","victory by unanswered challenge","lopuwh","duozmh","duozmh","js0adm"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(0,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("y2nrd3",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(0,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(65,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("itqo2k",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(65,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("lopuwh",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(7,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(7,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
