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
    let result = await contractMerkleShip.proposeGame(8, [191,229,50,15,232,220,127,164,237,7,96,34,43,13,120,70,246,52,171,96,100,108,130,126,67,13,60,70,186,132,58,124],{from: accounts[0],value:8});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(8, [191,229,50,15,232,220,127,164,237,7,96,34,43,13,120,70,246,52,171,96,100,108,130,126,67,13,60,70,186,132,58,124],{from: accounts[0],value:8}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(9, [191,229,50,15,232,220,127,164,237,7,96,34,43,13,120,70,246,52,171,96,100,108,130,126,67,13,60,70,186,132,58,124],{from: accounts[0],value:8}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(2, [219,250,15,57,92,246,22,181,234,154,153,92,221,108,104,30,155,230,20,116,16,239,223,178,225,205,133,182,42,200,79,228],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(2, [219,250,15,57,92,246,22,181,234,154,153,92,221,108,104,30,155,230,20,116,16,239,223,178,225,205,133,182,42,200,79,228],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(65,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(65,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(47, [39,2], [[184,126,33,244,112,237,32,63,173,178,14,111,236,68,61,255,61,238,236,66,214,55,21,91,123,80,153,56,121,113,60,59],[69,227,231,48,1,201,219,49,142,65,180,62,7,120,90,72,125,123,77,233,3,219,159,14,175,243,55,190,71,60,19,3],[37,226,143,127,3,114,136,209,57,157,41,16,22,240,54,67,128,180,68,183,218,112,154,27,162,81,104,20,237,244,9,121],[122,113,226,241,97,47,114,109,189,26,8,184,2,170,177,91,58,119,215,193,34,139,165,156,219,65,117,69,45,160,76,64],[167,215,116,96,247,52,7,107,225,238,4,167,75,47,54,147,108,217,250,199,6,232,168,249,7,225,155,220,224,22,65,245],[85,104,103,215,87,238,253,90,230,200,177,92,146,184,177,94,72,209,164,210,53,64,81,50,31,33,225,88,166,155,251,163]], "victory by unchallenged hit count", "victory by abandonment",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("vcvyzx",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(47, [39,2], [[184,126,33,244,112,237,32,63,173,178,14,111,236,68,61,255,61,238,236,66,214,55,21,91,123,80,153,56,121,113,60,59],[69,227,231,48,1,201,219,49,142,65,180,62,7,120,90,72,125,123,77,233,3,219,159,14,175,243,55,190,71,60,19,3],[37,226,143,127,3,114,136,209,57,157,41,16,22,240,54,67,128,180,68,183,218,112,154,27,162,81,104,20,237,244,9,121],[122,113,226,241,97,47,114,109,189,26,8,184,2,170,177,91,58,119,215,193,34,139,165,156,219,65,117,69,45,160,76,64],[167,215,116,96,247,52,7,107,225,238,4,167,75,47,54,147,108,217,250,199,6,232,168,249,7,225,155,220,224,22,65,245],[85,104,103,215,87,238,253,90,230,200,177,92,146,184,177,94,72,209,164,210,53,64,81,50,31,33,225,88,166,155,251,163]], "victory by unchallenged hit count", "victory by abandonment",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(2,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(2,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(1,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(1,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(1,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("e5iudc",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(1,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(65, ["vcvyzx","victory by unchallenged hit count","victory by unanswered challenge","game resolved in an emergency","vcvyzx","victory by unanswered challenge","victory by abandonment","victory by abandonment","verified victory by hit count","verified victory by hit count","victory by unchallenged hit count","victory by unchallenged hit count","victory by concession","verified victory by hit count","victory by unanswered challenge","gdumbz","gdumbz","game resolved in an emergency","verified victory by hit count","gdumbz","victory by abandonment","vcvyzx","4vhvs","gdumbz","zjux0q","vcvyzx","e5iudc","victory by unanswered challenge","gdumbz","victory by concession","victory by concession","game resolved in an emergency","e5iudc","game resolved in an emergency","gdumbz","verified victory by hit count","verified victory by hit count","verified victory by hit count","gdumbz","game resolved in an emergency","victory by abandonment","zjux0q","zjux0q","g32jsn","game resolved in an emergency","zjux0q","4vhvs","game resolved in an emergency","game resolved in an emergency","victory by unanswered challenge","g32jsn","vcvyzx","e5iudc","gdumbz","victory by unanswered challenge","victory by unchallenged hit count","g32jsn","gdumbz","game resolved in an emergency","verified victory by hit count","victory by unanswered challenge","victory by abandonment","victory by unchallenged hit count","4vhvs"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(65, ["vcvyzx","victory by unchallenged hit count","victory by unanswered challenge","game resolved in an emergency","vcvyzx","victory by unanswered challenge","victory by abandonment","victory by abandonment","verified victory by hit count","verified victory by hit count","victory by unchallenged hit count","victory by unchallenged hit count","victory by concession","verified victory by hit count","victory by unanswered challenge","gdumbz","gdumbz","game resolved in an emergency","verified victory by hit count","gdumbz","victory by abandonment","vcvyzx","4vhvs","gdumbz","zjux0q","vcvyzx","e5iudc","victory by unanswered challenge","gdumbz","victory by concession","victory by concession","game resolved in an emergency","e5iudc","game resolved in an emergency","gdumbz","verified victory by hit count","verified victory by hit count","verified victory by hit count","gdumbz","game resolved in an emergency","victory by abandonment","zjux0q","zjux0q","g32jsn","game resolved in an emergency","zjux0q","4vhvs","game resolved in an emergency","game resolved in an emergency","victory by unanswered challenge","g32jsn","vcvyzx","e5iudc","gdumbz","victory by unanswered challenge","victory by unchallenged hit count","g32jsn","gdumbz","game resolved in an emergency","verified victory by hit count","victory by unanswered challenge","victory by abandonment","victory by unchallenged hit count","4vhvs"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(49,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(49,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(13,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("e5iudc",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(13,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(101,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(101,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
