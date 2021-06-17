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
    let result = await contractMerkleShip.proposeGame(179, [135,230,101,12,137,40,86,88,91,133,33,45,116,233,233,96,159,69,190,213,152,229,71,87,28,106,8,22,208,192,194,22],{from: accounts[0],value:179});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(179, [135,230,101,12,137,40,86,88,91,133,33,45,116,233,233,96,159,69,190,213,152,229,71,87,28,106,8,22,208,192,194,22],{from: accounts[0],value:179}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(180, [135,230,101,12,137,40,86,88,91,133,33,45,116,233,233,96,159,69,190,213,152,229,71,87,28,106,8,22,208,192,194,22],{from: accounts[0],value:179}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(39, [208,200,121,23,42,154,62,0,140,4,211,82,151,72,157,38,222,134,249,79,175,97,86,111,11,225,60,49,39,66,153,160],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(39, [208,200,121,23,42,154,62,0,140,4,211,82,151,72,157,38,222,134,249,79,175,97,86,111,11,225,60,49,39,66,153,160],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(13,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(13,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(101, [179,3], [[148,195,114,191,20,237,121,101,70,85,115,221,32,81,149,142,176,118,57,85,50,64,66,187,241,219,235,183,202,73,61,133],[151,37,98,127,7,169,255,171,113,246,186,231,255,107,47,173,141,21,86,184,238,141,200,96,198,160,16,57,252,86,95,168],[123,203,116,93,126,186,78,214,232,106,13,36,32,144,41,33,50,96,63,52,79,83,183,30,200,17,6,217,60,59,95,240],[124,207,90,67,128,254,179,158,61,255,178,192,233,236,84,95,187,205,16,110,1,89,29,3,207,108,112,253,100,40,134,235],[234,104,132,66,222,162,22,118,0,12,140,77,145,79,70,168,180,30,185,226,91,202,119,70,186,245,28,4,245,138,232,226],[192,201,109,146,39,40,59,184,89,160,127,69,22,28,7,38,67,128,233,182,75,57,171,167,93,38,16,65,137,188,96,125]], "v8jl6", "victory by unanswered challenge",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(101, [179,3], [[148,195,114,191,20,237,121,101,70,85,115,221,32,81,149,142,176,118,57,85,50,64,66,187,241,219,235,183,202,73,61,133],[151,37,98,127,7,169,255,171,113,246,186,231,255,107,47,173,141,21,86,184,238,141,200,96,198,160,16,57,252,86,95,168],[123,203,116,93,126,186,78,214,232,106,13,36,32,144,41,33,50,96,63,52,79,83,183,30,200,17,6,217,60,59,95,240],[124,207,90,67,128,254,179,158,61,255,178,192,233,236,84,95,187,205,16,110,1,89,29,3,207,108,112,253,100,40,134,235],[234,104,132,66,222,162,22,118,0,12,140,77,145,79,70,168,180,30,185,226,91,202,119,70,186,245,28,4,245,138,232,226],[192,201,109,146,39,40,59,184,89,160,127,69,22,28,7,38,67,128,233,182,75,57,171,167,93,38,16,65,137,188,96,125]], "v8jl6", "victory by unanswered challenge",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(49,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(49,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(0,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(0,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(39,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(39,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(39, ["verified victory by hit count","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","victory by abandonment","26dzg","victory by unchallenged hit count","victory by unchallenged hit count","victory by unanswered challenge","v8jl6","of2uhg","of2uhg","verified victory by hit count","verified victory by hit count","victory by abandonment","v8jl6","victory by unchallenged hit count","victory by concession","verified victory by hit count","game resolved in an emergency","victory by unchallenged hit count","victory by unanswered challenge","nwljt","victory by unanswered challenge","v8jl6","nwljt","victory by unanswered challenge","victory by abandonment","victory by abandonment","v8jl6","26dzg","v8jl6","victory by concession","game resolved in an emergency","game resolved in an emergency","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","game resolved in an emergency","of2uhg","26dzg","nwljt","of2uhg","nwljt","v8jl6","victory by unchallenged hit count","26dzg","nwljt","victory by unchallenged hit count","verified victory by hit count","of2uhg","verified victory by hit count","victory by abandonment","of2uhg","victory by unchallenged hit count","v8jl6","6ng76s","game resolved in an emergency","l6vrt","6ng76s","of2uhg","v8jl6","victory by unanswered challenge","victory by unanswered challenge"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(39, ["verified victory by hit count","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","victory by abandonment","26dzg","victory by unchallenged hit count","victory by unchallenged hit count","victory by unanswered challenge","v8jl6","of2uhg","of2uhg","verified victory by hit count","verified victory by hit count","victory by abandonment","v8jl6","victory by unchallenged hit count","victory by concession","verified victory by hit count","game resolved in an emergency","victory by unchallenged hit count","victory by unanswered challenge","nwljt","victory by unanswered challenge","v8jl6","nwljt","victory by unanswered challenge","victory by abandonment","victory by abandonment","v8jl6","26dzg","v8jl6","victory by concession","game resolved in an emergency","game resolved in an emergency","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","game resolved in an emergency","of2uhg","26dzg","nwljt","of2uhg","nwljt","v8jl6","victory by unchallenged hit count","26dzg","nwljt","victory by unchallenged hit count","verified victory by hit count","of2uhg","verified victory by hit count","victory by abandonment","of2uhg","victory by unchallenged hit count","v8jl6","6ng76s","game resolved in an emergency","l6vrt","6ng76s","of2uhg","v8jl6","victory by unanswered challenge","victory by unanswered challenge"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(181,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(181,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(64,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("26dzg",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(64,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("l6vrt",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(99,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(99,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
