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
    let result = await contractMerkleShip.proposeGame(48, [192,32,5,225,249,49,14,128,154,63,37,16,13,227,16,77,247,252,133,3,4,150,109,99,221,68,162,117,248,221,190,84],{from: accounts[0],value:48});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(48, [192,32,5,225,249,49,14,128,154,63,37,16,13,227,16,77,247,252,133,3,4,150,109,99,221,68,162,117,248,221,190,84],{from: accounts[0],value:48}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(49, [192,32,5,225,249,49,14,128,154,63,37,16,13,227,16,77,247,252,133,3,4,150,109,99,221,68,162,117,248,221,190,84],{from: accounts[0],value:48}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(64, [82,119,170,114,14,109,52,207,92,106,144,95,189,166,115,29,6,41,231,86,34,185,186,114,204,228,136,219,57,195,32,227],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(64, [82,119,170,114,14,109,52,207,92,106,144,95,189,166,115,29,6,41,231,86,34,185,186,114,204,228,136,219,57,195,32,227],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(48,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(48,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(47, [181,39], [[69,157,15,27,44,11,222,125,99,166,121,18,213,1,45,145,96,10,208,243,172,64,132,120,170,120,229,252,193,238,12,207],[153,223,176,48,239,73,116,198,251,221,69,66,252,150,239,192,137,140,21,58,154,171,156,202,43,65,237,152,19,149,72,132],[201,79,76,84,106,85,191,130,68,207,16,76,154,175,245,210,139,221,5,246,196,82,41,32,13,135,25,65,211,219,20,119],[204,187,228,246,151,195,56,168,129,242,3,86,7,189,29,193,205,209,49,196,75,170,137,183,209,41,247,32,8,143,209,223],[24,165,127,85,176,132,87,54,74,27,215,245,207,189,119,188,54,173,234,168,206,149,71,77,215,217,46,200,199,209,66,208],[113,146,104,40,169,54,175,253,4,160,88,23,21,65,112,49,35,101,138,250,195,213,46,1,129,195,172,167,206,147,15,200]], "victory by abandonment", "verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("t35u8r",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(47, [181,39], [[69,157,15,27,44,11,222,125,99,166,121,18,213,1,45,145,96,10,208,243,172,64,132,120,170,120,229,252,193,238,12,207],[153,223,176,48,239,73,116,198,251,221,69,66,252,150,239,192,137,140,21,58,154,171,156,202,43,65,237,152,19,149,72,132],[201,79,76,84,106,85,191,130,68,207,16,76,154,175,245,210,139,221,5,246,196,82,41,32,13,135,25,65,211,219,20,119],[204,187,228,246,151,195,56,168,129,242,3,86,7,189,29,193,205,209,49,196,75,170,137,183,209,41,247,32,8,143,209,223],[24,165,127,85,176,132,87,54,74,27,215,245,207,189,119,188,54,173,234,168,206,149,71,77,215,217,46,200,199,209,66,208],[113,146,104,40,169,54,175,253,4,160,88,23,21,65,112,49,35,101,138,250,195,213,46,1,129,195,172,167,206,147,15,200]], "victory by abandonment", "verified victory by hit count",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(12,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(12,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(100,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(100,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(11,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(11,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(180, ["victory by unchallenged hit count","victory by concession","victory by concession","game resolved in an emergency","victory by abandonment","verified victory by hit count","t35u8r","victory by abandonment","verified victory by hit count","victory by unanswered challenge","t35u8r","6s5qvx","victory by concession","victory by abandonment","victory by abandonment","victory by concession","victory by concession","cvpxdbs","6s5qvx","game resolved in an emergency","victory by unanswered challenge","6s5qvx","game resolved in an emergency","verified victory by hit count","victory by unchallenged hit count","victory by abandonment","victory by concession","6s5qvx","6s5qvx","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","t35u8r","victory by abandonment","victory by unanswered challenge","6s5qvx","game resolved in an emergency","victory by unanswered challenge","verified victory by hit count","verified victory by hit count","t35u8r","victory by abandonment","victory by concession","victory by unchallenged hit count","cvpxdbs","victory by unanswered challenge","victory by unanswered challenge","verified victory by hit count","t35u8r","6s5qvx","victory by abandonment","cvpxdbs","victory by concession","game resolved in an emergency","6s5qvx","akcug8","victory by abandonment","game resolved in an emergency","victory by concession","victory by unanswered challenge","victory by concession","verified victory by hit count","6s5qvx","akcug8"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(180, ["victory by unchallenged hit count","victory by concession","victory by concession","game resolved in an emergency","victory by abandonment","verified victory by hit count","t35u8r","victory by abandonment","verified victory by hit count","victory by unanswered challenge","t35u8r","6s5qvx","victory by concession","victory by abandonment","victory by abandonment","victory by concession","victory by concession","cvpxdbs","6s5qvx","game resolved in an emergency","victory by unanswered challenge","6s5qvx","game resolved in an emergency","verified victory by hit count","victory by unchallenged hit count","victory by abandonment","victory by concession","6s5qvx","6s5qvx","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","t35u8r","victory by abandonment","victory by unanswered challenge","6s5qvx","game resolved in an emergency","victory by unanswered challenge","verified victory by hit count","verified victory by hit count","t35u8r","victory by abandonment","victory by concession","victory by unchallenged hit count","cvpxdbs","victory by unanswered challenge","victory by unanswered challenge","verified victory by hit count","t35u8r","6s5qvx","victory by abandonment","cvpxdbs","victory by concession","game resolved in an emergency","6s5qvx","akcug8","victory by abandonment","game resolved in an emergency","victory by concession","victory by unanswered challenge","victory by concession","verified victory by hit count","6s5qvx","akcug8"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(7,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(7,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(0,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("cvpxdbs",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(0,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("6s5qvx",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(1,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(1,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
