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
    let result = await contractSupplyChain.addItem("RevertWithReason", 6,{from: accounts[0]});
  });
  it('Should execute buyItem(uint) WHEN msg.value>=sku', async () => {
    let result = await contractSupplyChain.buyItem(1336,{from: accounts[0],value:1338});
  });
  it('Should fail buyItem(uint) when NOT comply with: msg.value >= sku', async () => {
    let result = await truffleAssert.fails(contractSupplyChain.buyItem(1339,{from: accounts[0],value:1338}),'revert');
  });
  it('Should execute shipItem(uint)', async () => {
    let result = await contractSupplyChain.shipItem(9999,{from: accounts[0]});
  });
  it('Should execute receiveItem(uint)', async () => {
    let result = await contractSupplyChain.receiveItem(10000,{from: accounts[0]});
  });
  it('Should execute fetchItem(uint)', async () => {
    let result = await contractSupplyChain.fetchItem(1336,{from: accounts[0]});
  });
});
