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
    let result = await contractMerkleShip.proposeGame(49, [53,62,3,218,14,114,242,64,215,138,232,76,121,130,204,49,57,8,19,170,128,246,151,34,225,117,189,200,63,126,239,230],{from: accounts[0],value:49});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("yvshc",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(49, [53,62,3,218,14,114,242,64,215,138,232,76,121,130,204,49,57,8,19,170,128,246,151,34,225,117,189,200,63,126,239,230],{from: accounts[0],value:49}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(50, [53,62,3,218,14,114,242,64,215,138,232,76,121,130,204,49,57,8,19,170,128,246,151,34,225,117,189,200,63,126,239,230],{from: accounts[0],value:49}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(11, [107,11,77,85,119,21,157,214,14,137,251,186,134,214,96,47,166,99,224,63,255,196,191,230,64,223,138,223,222,66,241,151],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("yvshc",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(11, [107,11,77,85,119,21,157,214,14,137,251,186,134,214,96,47,166,99,224,63,255,196,191,230,64,223,138,223,222,66,241,151],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(65,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("b8teio",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(65,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(13, [3,49], [[202,149,237,144,129,46,85,217,135,223,163,143,147,87,46,206,210,155,167,159,0,218,83,35,108,129,170,125,98,174,209,96],[13,129,50,27,223,3,208,7,244,221,95,225,85,129,162,146,86,75,88,11,217,153,233,94,223,31,31,168,178,166,68,112],[136,182,128,129,100,14,84,162,143,161,22,38,56,61,209,14,67,100,41,206,200,58,37,54,180,179,89,200,22,198,114,126],[234,94,137,71,118,111,136,149,15,16,138,198,41,166,222,174,204,148,93,178,207,112,79,205,198,185,88,183,221,117,4,226],[93,131,35,212,49,222,187,224,12,97,146,32,182,187,251,17,166,146,21,146,229,246,223,252,214,198,23,229,204,203,3,146],[146,217,110,157,81,136,48,243,16,112,202,70,190,198,1,63,55,123,121,226,24,21,15,66,114,112,122,176,229,195,109,27]], "victory by unchallenged hit count", "verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(13, [3,49], [[202,149,237,144,129,46,85,217,135,223,163,143,147,87,46,206,210,155,167,159,0,218,83,35,108,129,170,125,98,174,209,96],[13,129,50,27,223,3,208,7,244,221,95,225,85,129,162,146,86,75,88,11,217,153,233,94,223,31,31,168,178,166,68,112],[136,182,128,129,100,14,84,162,143,161,22,38,56,61,209,14,67,100,41,206,200,58,37,54,180,179,89,200,22,198,114,126],[234,94,137,71,118,111,136,149,15,16,138,198,41,166,222,174,204,148,93,178,207,112,79,205,198,185,88,183,221,117,4,226],[93,131,35,212,49,222,187,224,12,97,146,32,182,187,251,17,166,146,21,146,229,246,223,252,214,198,23,229,204,203,3,146],[146,217,110,157,81,136,48,243,16,112,202,70,190,198,1,63,55,123,121,226,24,21,15,66,114,112,122,176,229,195,109,27]], "victory by unchallenged hit count", "verified victory by hit count",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(1,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("t778j8",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(1,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(63,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(63,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(41,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("4ng63c",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(41,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(65, ["b8teio","gxzws","yvshc","verified victory by hit count","4ng63c","4ng63c","gxzws","b8teio","game resolved in an emergency","gpfg99","victory by unchallenged hit count","gpfg99","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","victory by unchallenged hit count","t778j8","victory by concession","b8teio","verified victory by hit count","victory by unanswered challenge","gxzws","b8teio","uvitqe","verified victory by hit count","victory by concession","gxzws","game resolved in an emergency","4ng63c","game resolved in an emergency","4ng63c","uvitqe","1m5ho","verified victory by hit count","game resolved in an emergency","b8teio","victory by unchallenged hit count","t778j8","t778j8","victory by concession","gxzws","sfrbc","game resolved in an emergency","yvshc","b8teio","victory by unanswered challenge","n8avqe","4ng63c","verified victory by hit count","verified victory by hit count","gpfg99","uvitqe","yvshc","t778j8","t778j8","b8teio","verified victory by hit count","verified victory by hit count","b8teio","victory by unanswered challenge","n8avqe","victory by abandonment","1m5ho","uvitqe"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("n8avqe",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(65, ["b8teio","gxzws","yvshc","verified victory by hit count","4ng63c","4ng63c","gxzws","b8teio","game resolved in an emergency","gpfg99","victory by unchallenged hit count","gpfg99","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","victory by unchallenged hit count","t778j8","victory by concession","b8teio","verified victory by hit count","victory by unanswered challenge","gxzws","b8teio","uvitqe","verified victory by hit count","victory by concession","gxzws","game resolved in an emergency","4ng63c","game resolved in an emergency","4ng63c","uvitqe","1m5ho","verified victory by hit count","game resolved in an emergency","b8teio","victory by unchallenged hit count","t778j8","t778j8","victory by concession","gxzws","sfrbc","game resolved in an emergency","yvshc","b8teio","victory by unanswered challenge","n8avqe","4ng63c","verified victory by hit count","verified victory by hit count","gpfg99","uvitqe","yvshc","t778j8","t778j8","b8teio","verified victory by hit count","verified victory by hit count","b8teio","victory by unanswered challenge","n8avqe","victory by abandonment","1m5ho","uvitqe"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(11,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("sfrbc",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(11,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(100,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(100,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("yvshc",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(101,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(101,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
