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
    let result = await contractMerkleShip.proposeGame(47, [49,0,211,104,70,145,11,236,210,114,216,144,214,100,56,165,199,133,88,213,112,111,207,186,184,30,160,142,149,139,141,157],{from: accounts[0],value:47});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(47, [49,0,211,104,70,145,11,236,210,114,216,144,214,100,56,165,199,133,88,213,112,111,207,186,184,30,160,142,149,139,141,157],{from: accounts[0],value:47}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(48, [49,0,211,104,70,145,11,236,210,114,216,144,214,100,56,165,199,133,88,213,112,111,207,186,184,30,160,142,149,139,141,157],{from: accounts[0],value:47}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(99, [214,244,3,12,192,224,107,249,165,243,176,87,186,53,40,100,218,58,32,199,77,107,74,220,67,245,84,139,40,90,159,198],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(99, [214,244,3,12,192,224,107,249,165,243,176,87,186,53,40,100,218,58,32,199,77,107,74,220,67,245,84,139,40,90,159,198],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(47,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(47,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(41, [101,4], [[176,244,176,25,36,5,245,238,72,73,121,95,119,200,142,23,249,33,132,9,177,236,93,60,8,78,99,91,115,160,155,38],[181,187,75,183,79,179,136,13,35,50,215,195,13,47,111,155,118,226,39,138,235,175,214,249,105,214,37,163,217,39,138,32],[141,79,126,162,137,101,136,3,218,16,30,129,11,138,105,196,21,213,172,119,206,171,60,229,30,30,122,71,90,152,11,218],[196,199,99,251,90,82,69,203,199,19,251,62,118,211,44,195,91,122,48,25,82,167,253,91,117,129,115,157,120,228,207,251],[186,199,88,24,255,140,36,144,237,228,176,142,5,77,153,181,30,25,227,27,4,35,16,108,151,170,118,85,151,26,39,147],[175,233,108,217,254,168,85,44,170,110,46,3,253,243,16,33,42,55,6,167,155,254,51,233,91,24,189,208,98,244,196,188]], "victory by unchallenged hit count", "v28kog",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(41, [101,4], [[176,244,176,25,36,5,245,238,72,73,121,95,119,200,142,23,249,33,132,9,177,236,93,60,8,78,99,91,115,160,155,38],[181,187,75,183,79,179,136,13,35,50,215,195,13,47,111,155,118,226,39,138,235,175,214,249,105,214,37,163,217,39,138,32],[141,79,126,162,137,101,136,3,218,16,30,129,11,138,105,196,21,213,172,119,206,171,60,229,30,30,122,71,90,152,11,218],[196,199,99,251,90,82,69,203,199,19,251,62,118,211,44,195,91,122,48,25,82,167,253,91,117,129,115,157,120,228,207,251],[186,199,88,24,255,140,36,144,237,228,176,142,5,77,153,181,30,25,227,27,4,35,16,108,151,170,118,85,151,26,39,147],[175,233,108,217,254,168,85,44,170,110,46,3,253,243,16,33,42,55,6,167,155,254,51,233,91,24,189,208,98,244,196,188]], "victory by unchallenged hit count", "v28kog",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(100,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(100,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(100,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(100,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(99,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(99,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(48, ["v28kog","victory by abandonment","victory by unchallenged hit count","v28kog","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","victory by unanswered challenge","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","game resolved in an emergency","victory by unanswered challenge","v28kog","victory by unanswered challenge","v28kog","victory by abandonment","game resolved in an emergency","victory by unanswered challenge","victory by concession","victory by unanswered challenge","game resolved in an emergency","verified victory by hit count","v28kog","xn1vug","xn1vug","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","victory by unchallenged hit count","game resolved in an emergency","victory by concession","v28kog","wc9sz","v28kog","v28kog","victory by abandonment","victory by unanswered challenge","xn1vug","victory by abandonment","game resolved in an emergency","wc9sz","v28kog","xn1vug","victory by abandonment","victory by unanswered challenge","yq44qb","game resolved in an emergency","wc9sz","kzu4j6","kzu4j6","wc9sz","game resolved in an emergency","verified victory by hit count","kzu4j6","victory by concession","verified victory by hit count","victory by abandonment","susnzb","victory by unanswered challenge","verified victory by hit count","victory by abandonment","game resolved in an emergency","kzu4j6"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(48, ["v28kog","victory by abandonment","victory by unchallenged hit count","v28kog","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","victory by unanswered challenge","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","game resolved in an emergency","victory by unanswered challenge","v28kog","victory by unanswered challenge","v28kog","victory by abandonment","game resolved in an emergency","victory by unanswered challenge","victory by concession","victory by unanswered challenge","game resolved in an emergency","verified victory by hit count","v28kog","xn1vug","xn1vug","victory by unchallenged hit count","verified victory by hit count","game resolved in an emergency","victory by unchallenged hit count","game resolved in an emergency","victory by concession","v28kog","wc9sz","v28kog","v28kog","victory by abandonment","victory by unanswered challenge","xn1vug","victory by abandonment","game resolved in an emergency","wc9sz","v28kog","xn1vug","victory by abandonment","victory by unanswered challenge","yq44qb","game resolved in an emergency","wc9sz","kzu4j6","kzu4j6","wc9sz","game resolved in an emergency","verified victory by hit count","kzu4j6","victory by concession","verified victory by hit count","victory by abandonment","susnzb","victory by unanswered challenge","verified victory by hit count","victory by abandonment","game resolved in an emergency","kzu4j6"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(100,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("susnzb",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(100,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(65,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(65,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("xn1vug",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(11,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(11,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
