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
    let result = await contractMerkleShip.emergencyStop("victory by concession",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by concession",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(7, [79,127,10,161,122,95,231,100,200,136,121,9,16,205,63,30,92,177,47,9,227,41,176,225,109,113,207,80,24,104,93,0],{from: accounts[0],value:7});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(7, [79,127,10,161,122,95,231,100,200,136,121,9,16,205,63,30,92,177,47,9,227,41,176,225,109,113,207,80,24,104,93,0],{from: accounts[0],value:7}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(8, [79,127,10,161,122,95,231,100,200,136,121,9,16,205,63,30,92,177,47,9,227,41,176,225,109,113,207,80,24,104,93,0],{from: accounts[0],value:7}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(40, [218,128,217,95,101,52,36,93,59,196,218,203,53,82,248,241,155,56,124,140,177,95,40,210,245,192,135,145,134,146,67,132],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(40, [218,128,217,95,101,52,36,93,59,196,218,203,53,82,248,241,155,56,124,140,177,95,40,210,245,192,135,145,134,146,67,132],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(65,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(65,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(181, [63,48], [[171,214,129,111,138,169,149,225,118,73,103,39,136,37,24,1,193,196,240,40,252,254,29,14,109,14,239,108,161,50,106,30],[149,235,113,131,137,62,188,192,152,1,139,3,91,71,215,242,181,152,254,253,235,70,118,22,196,79,108,50,210,175,144,48],[170,20,39,32,45,10,233,171,198,118,110,132,64,225,228,237,59,212,76,172,180,198,22,94,68,42,251,29,108,37,17,191],[130,213,118,214,98,121,78,107,131,161,114,235,250,15,65,123,151,193,134,35,163,164,137,133,182,53,12,192,245,1,145,136],[27,238,228,46,108,31,18,200,27,235,77,171,88,200,118,72,161,125,168,104,255,43,103,53,173,35,39,238,165,17,57,28],[17,105,30,14,216,163,77,225,170,53,226,47,216,113,100,181,205,107,173,156,45,94,243,4,147,66,241,16,208,90,218,202]], "game resolved in an emergency", "game resolved in an emergency",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(181, [63,48], [[171,214,129,111,138,169,149,225,118,73,103,39,136,37,24,1,193,196,240,40,252,254,29,14,109,14,239,108,161,50,106,30],[149,235,113,131,137,62,188,192,152,1,139,3,91,71,215,242,181,152,254,253,235,70,118,22,196,79,108,50,210,175,144,48],[170,20,39,32,45,10,233,171,198,118,110,132,64,225,228,237,59,212,76,172,180,198,22,94,68,42,251,29,108,37,17,191],[130,213,118,214,98,121,78,107,131,161,114,235,250,15,65,123,151,193,134,35,163,164,137,133,182,53,12,192,245,1,145,136],[27,238,228,46,108,31,18,200,27,235,77,171,88,200,118,72,161,125,168,104,255,43,103,53,173,35,39,238,165,17,57,28],[17,105,30,14,216,163,77,225,170,53,226,47,216,113,100,181,205,107,173,156,45,94,243,4,147,66,241,16,208,90,218,202]], "game resolved in an emergency", "game resolved in an emergency",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(181,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("cmr3k5",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(181,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(65,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("dg4ehk",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(65,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(101,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("dg4ehk",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(101,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(39, ["victory by concession","jfpjun","victory by abandonment","victory by unchallenged hit count","victory by abandonment","v4rutr","victory by unchallenged hit count","game resolved in an emergency","victory by concession","dg4ehk","7f378g","cmr3k5","7f378g","victory by unanswered challenge","victory by abandonment","v4rutr","verified victory by hit count","v4rutr","victory by unchallenged hit count","bwsew","victory by unanswered challenge","7f378g","victory by unchallenged hit count","jfpjun","dg4ehk","victory by unchallenged hit count","cmr3k5","verified victory by hit count","v4rutr","dg4ehk","dg4ehk","dg4ehk","victory by unchallenged hit count","game resolved in an emergency","2err9d","victory by concession","verified victory by hit count","cmr3k5","verified victory by hit count","cmr3k5","jfpjun","victory by concession","game resolved in an emergency","victory by concession","f89nqk","sk6lar","v4rutr","victory by unanswered challenge","cmr3k5","jfpjun","7enj66","7enj66","7enj66","f89nqk","cmr3k5","victory by unchallenged hit count","victory by unchallenged hit count","sk6lar","igfsmj","7enj66","7enj66","dg4ehk","dg4ehk","igfsmj"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("2err9d",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(39, ["victory by concession","jfpjun","victory by abandonment","victory by unchallenged hit count","victory by abandonment","v4rutr","victory by unchallenged hit count","game resolved in an emergency","victory by concession","dg4ehk","7f378g","cmr3k5","7f378g","victory by unanswered challenge","victory by abandonment","v4rutr","verified victory by hit count","v4rutr","victory by unchallenged hit count","bwsew","victory by unanswered challenge","7f378g","victory by unchallenged hit count","jfpjun","dg4ehk","victory by unchallenged hit count","cmr3k5","verified victory by hit count","v4rutr","dg4ehk","dg4ehk","dg4ehk","victory by unchallenged hit count","game resolved in an emergency","2err9d","victory by concession","verified victory by hit count","cmr3k5","verified victory by hit count","cmr3k5","jfpjun","victory by concession","game resolved in an emergency","victory by concession","f89nqk","sk6lar","v4rutr","victory by unanswered challenge","cmr3k5","jfpjun","7enj66","7enj66","7enj66","f89nqk","cmr3k5","victory by unchallenged hit count","victory by unchallenged hit count","sk6lar","igfsmj","7enj66","7enj66","dg4ehk","dg4ehk","igfsmj"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(13,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(13,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(9,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("igfsmj",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(9,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("jfpjun",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(41,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(41,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
