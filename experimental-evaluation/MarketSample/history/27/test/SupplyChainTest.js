const truffleAssert = require('truffle-assertions');
const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain",(accounts)=>{
  let trace = false;
  let contractSupplyChain = null;
  beforeEach(async () => {
    contractSupplyChain = await SupplyChain.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: SupplyChain.new({from:accounts[0]}');
  });
  
  it('Should execute addItem(string,uint)', async () => {
    let result = await contractSupplyChain.addItem("PayableExample", 1336,{from: accounts[0]});
  });
  it('Should execute buyItem(uint) WHEN msg.value>=sku', async () => {
    let result = await contractSupplyChain.buyItem(5,{from: accounts[0],value:257});
  });
  it('Should fail buyItem(uint) when NOT comply with: msg.value >= sku', async () => {
    let result = await truffleAssert.fails(contractSupplyChain.buyItem(258,{from: accounts[0],value:257}),'revert');
  });
  it('Should execute shipItem(uint)', async () => {
    let result = await contractSupplyChain.shipItem(1337,{from: accounts[0]});
  });
  it('Should execute receiveItem(uint)', async () => {
    let result = await contractSupplyChain.receiveItem(0,{from: accounts[0]});
  });
  it('Should execute fetchItem(uint)', async () => {
    let result = await contractSupplyChain.fetchItem(6,{from: accounts[0]});
  });
});
