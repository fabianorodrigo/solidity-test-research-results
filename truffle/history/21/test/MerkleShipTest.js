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
    let result = await contractMerkleShip.emergencyStop("lgxidp",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("lgxidp",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(40, [177,8,218,21,28,16,54,246,20,59,187,176,236,157,238,168,142,252,250,42,224,8,63,175,168,94,243,242,2,212,51,250],{from: accounts[0],value:40});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(40, [177,8,218,21,28,16,54,246,20,59,187,176,236,157,238,168,142,252,250,42,224,8,63,175,168,94,243,242,2,212,51,250],{from: accounts[0],value:40}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(41, [177,8,218,21,28,16,54,246,20,59,187,176,236,157,238,168,142,252,250,42,224,8,63,175,168,94,243,242,2,212,51,250],{from: accounts[0],value:40}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(8, [253,107,229,142,240,53,199,208,43,116,205,2,237,253,115,213,95,63,3,82,140,195,60,88,179,83,76,144,34,211,244,208],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(8, [253,107,229,142,240,53,199,208,43,116,205,2,237,253,115,213,95,63,3,82,140,195,60,88,179,83,76,144,34,211,244,208],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(11,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(11,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(100, [0,63], [[101,237,138,153,134,46,24,33,8,201,41,144,114,165,215,80,254,214,221,159,146,143,27,53,129,77,243,221,147,85,141,56],[178,52,74,157,18,130,143,151,34,88,28,17,158,26,186,146,88,133,15,31,21,76,45,216,245,219,30,203,55,26,132,148],[51,135,15,124,248,1,74,176,84,242,104,72,235,154,158,64,22,117,154,150,217,236,252,240,26,47,42,119,136,2,237,112],[93,6,194,37,184,26,164,207,146,136,173,151,210,206,2,67,117,15,228,186,66,58,47,111,185,17,40,31,55,21,112,172],[86,162,167,118,62,148,227,199,188,93,190,176,40,134,39,167,154,244,251,76,169,14,33,34,247,158,85,138,35,58,141,96],[124,71,190,187,61,237,241,112,70,28,247,51,57,87,47,37,169,165,154,175,168,202,118,62,122,214,53,228,62,66,134,45]], "victory by abandonment", "lgxidp",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(100, [0,63], [[101,237,138,153,134,46,24,33,8,201,41,144,114,165,215,80,254,214,221,159,146,143,27,53,129,77,243,221,147,85,141,56],[178,52,74,157,18,130,143,151,34,88,28,17,158,26,186,146,88,133,15,31,21,76,45,216,245,219,30,203,55,26,132,148],[51,135,15,124,248,1,74,176,84,242,104,72,235,154,158,64,22,117,154,150,217,236,252,240,26,47,42,119,136,2,237,112],[93,6,194,37,184,26,164,207,146,136,173,151,210,206,2,67,117,15,228,186,66,58,47,111,185,17,40,31,55,21,112,172],[86,162,167,118,62,148,227,199,188,93,190,176,40,134,39,167,154,244,251,76,169,14,33,34,247,158,85,138,35,58,141,96],[124,71,190,187,61,237,241,112,70,28,247,51,57,87,47,37,169,165,154,175,168,202,118,62,122,214,53,228,62,66,134,45]], "victory by abandonment", "lgxidp",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(48,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("idze4f3",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(48,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(12,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(12,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(8,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(8,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(8, ["victory by concession","verified victory by hit count","victory by unchallenged hit count","mwlwe","game resolved in an emergency","verified victory by hit count","victory by unanswered challenge","victory by concession","victory by unchallenged hit count","game resolved in an emergency","victory by concession","victory by concession","game resolved in an emergency","victory by concession","bv0s","verified victory by hit count","6hqnnb","bv0s","idze4f3","victory by abandonment","victory by unanswered challenge","mwlwe","victory by abandonment","bv0s","lgxidp","idze4f3","lgxidp","victory by unanswered challenge","victory by abandonment","victory by concession","victory by unanswered challenge","victory by concession","game resolved in an emergency","verified victory by hit count","victory by abandonment","verified victory by hit count","verified victory by hit count","mwlwe","nf4t06","victory by unchallenged hit count","idze4f3","lgxidp","6hqnnb","nf4t06","victory by abandonment","victory by unchallenged hit count","victory by unanswered challenge","bv0s","verified victory by hit count","verified victory by hit count","6hqnnb","victory by abandonment","verified victory by hit count","nf4t06","victory by unanswered challenge","victory by unanswered challenge","mwlwe","nf4t06","victory by concession","victory by unanswered challenge","6hqnnb","victory by abandonment","mwlwe","bv0s"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(8, ["victory by concession","verified victory by hit count","victory by unchallenged hit count","mwlwe","game resolved in an emergency","verified victory by hit count","victory by unanswered challenge","victory by concession","victory by unchallenged hit count","game resolved in an emergency","victory by concession","victory by concession","game resolved in an emergency","victory by concession","bv0s","verified victory by hit count","6hqnnb","bv0s","idze4f3","victory by abandonment","victory by unanswered challenge","mwlwe","victory by abandonment","bv0s","lgxidp","idze4f3","lgxidp","victory by unanswered challenge","victory by abandonment","victory by concession","victory by unanswered challenge","victory by concession","game resolved in an emergency","verified victory by hit count","victory by abandonment","verified victory by hit count","verified victory by hit count","mwlwe","nf4t06","victory by unchallenged hit count","idze4f3","lgxidp","6hqnnb","nf4t06","victory by abandonment","victory by unchallenged hit count","victory by unanswered challenge","bv0s","verified victory by hit count","verified victory by hit count","6hqnnb","victory by abandonment","verified victory by hit count","nf4t06","victory by unanswered challenge","victory by unanswered challenge","mwlwe","nf4t06","victory by concession","victory by unanswered challenge","6hqnnb","victory by abandonment","mwlwe","bv0s"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(1,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("mwlwe",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(1,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(41,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(41,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("idze4f3",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(8,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(8,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
