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
    let result = await contractMerkleShip.proposeGame(13, [215,110,72,81,61,236,163,71,2,180,239,199,158,46,147,237,213,104,250,242,109,23,255,34,156,28,224,150,61,102,173,130],{from: accounts[0],value:13});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(13, [215,110,72,81,61,236,163,71,2,180,239,199,158,46,147,237,213,104,250,242,109,23,255,34,156,28,224,150,61,102,173,130],{from: accounts[0],value:13}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(14, [215,110,72,81,61,236,163,71,2,180,239,199,158,46,147,237,213,104,250,242,109,23,255,34,156,28,224,150,61,102,173,130],{from: accounts[0],value:13}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(49, [8,146,213,182,160,41,155,204,22,134,104,162,51,236,90,86,205,50,6,171,240,45,8,186,9,56,247,96,241,211,52,227],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(49, [8,146,213,182,160,41,155,204,22,134,104,162,51,236,90,86,205,50,6,171,240,45,8,186,9,56,247,96,241,211,52,227],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(99,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(99,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(48, [0,0], [[111,115,236,151,148,24,154,166,209,0,163,222,48,174,16,199,124,165,193,140,145,96,241,205,100,157,30,142,211,152,210,51],[18,19,48,247,25,194,82,172,68,64,49,89,3,12,66,170,2,102,251,91,168,68,42,187,5,71,100,76,207,114,231,177],[69,218,79,205,248,115,114,52,177,173,2,18,196,9,247,159,43,185,54,195,151,158,47,158,161,33,153,135,5,203,22,112],[197,156,64,72,113,92,79,211,29,130,127,237,156,16,11,59,232,247,140,102,199,200,153,225,79,227,50,124,134,210,211,95],[205,176,159,38,150,121,10,162,246,127,77,208,17,184,230,196,185,98,25,124,188,195,64,251,220,199,237,103,133,25,43,144],[0,245,135,24,226,249,10,221,125,162,170,104,90,199,239,253,60,78,183,231,94,178,162,253,244,140,164,241,38,65,26,226]], "mcah", "victory by abandonment",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("mcah",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(48, [0,0], [[111,115,236,151,148,24,154,166,209,0,163,222,48,174,16,199,124,165,193,140,145,96,241,205,100,157,30,142,211,152,210,51],[18,19,48,247,25,194,82,172,68,64,49,89,3,12,66,170,2,102,251,91,168,68,42,187,5,71,100,76,207,114,231,177],[69,218,79,205,248,115,114,52,177,173,2,18,196,9,247,159,43,185,54,195,151,158,47,158,161,33,153,135,5,203,22,112],[197,156,64,72,113,92,79,211,29,130,127,237,156,16,11,59,232,247,140,102,199,200,153,225,79,227,50,124,134,210,211,95],[205,176,159,38,150,121,10,162,246,127,77,208,17,184,230,196,185,98,25,124,188,195,64,251,220,199,237,103,133,25,43,144],[0,245,135,24,226,249,10,221,125,162,170,104,90,199,239,253,60,78,183,231,94,178,162,253,244,140,164,241,38,65,26,226]], "mcah", "victory by abandonment",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(13,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(13,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(7,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("mcah",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(7,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(7,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(7,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(3, ["game resolved in an emergency","victory by concession","victory by abandonment","victory by unanswered challenge","victory by abandonment","victory by unanswered challenge","0w7lqb","mcah","victory by concession","victory by concession","victory by unchallenged hit count","0w7lqb","victory by unanswered challenge","victory by abandonment","0w7lqb","victory by unchallenged hit count","verified victory by hit count","victory by unchallenged hit count","victory by abandonment","verified victory by hit count","victory by concession","game resolved in an emergency","t257mwc","victory by concession","0w7lqb","t257mwc","0w7lqb","verified victory by hit count","game resolved in an emergency","victory by concession","t257mwc","mcah","victory by abandonment","game resolved in an emergency","victory by concession","victory by abandonment","victory by concession","t257mwc","victory by concession","victory by unchallenged hit count","0w7lqb","mcah","victory by unanswered challenge","n58va8","victory by unanswered challenge","victory by concession","victory by concession","verified victory by hit count","verified victory by hit count","n58va8","t257mwc","0w7lqb","ca4zlt","ca4zlt","t257mwc","0w7lqb","victory by abandonment","verified victory by hit count","0w7lqb","victory by concession","0w7lqb","victory by abandonment","game resolved in an emergency","game resolved in an emergency"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("ca4zlt",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(3, ["game resolved in an emergency","victory by concession","victory by abandonment","victory by unanswered challenge","victory by abandonment","victory by unanswered challenge","0w7lqb","mcah","victory by concession","victory by concession","victory by unchallenged hit count","0w7lqb","victory by unanswered challenge","victory by abandonment","0w7lqb","victory by unchallenged hit count","verified victory by hit count","victory by unchallenged hit count","victory by abandonment","verified victory by hit count","victory by concession","game resolved in an emergency","t257mwc","victory by concession","0w7lqb","t257mwc","0w7lqb","verified victory by hit count","game resolved in an emergency","victory by concession","t257mwc","mcah","victory by abandonment","game resolved in an emergency","victory by concession","victory by abandonment","victory by concession","t257mwc","victory by concession","victory by unchallenged hit count","0w7lqb","mcah","victory by unanswered challenge","n58va8","victory by unanswered challenge","victory by concession","victory by concession","verified victory by hit count","verified victory by hit count","n58va8","t257mwc","0w7lqb","ca4zlt","ca4zlt","t257mwc","0w7lqb","victory by abandonment","verified victory by hit count","0w7lqb","victory by concession","0w7lqb","victory by abandonment","game resolved in an emergency","game resolved in an emergency"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(3,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(3,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(1,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("ca4zlt",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(1,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("t257mwc",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(180,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(180,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
