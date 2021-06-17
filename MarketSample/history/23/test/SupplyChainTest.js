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
    let result = await contractSupplyChain.addItem("RevertWithReason", 9999,{from: accounts[0]});
  });
  it('Should execute buyItem(uint) WHEN msg.value>=sku', async () => {
    let result = await contractSupplyChain.buyItem(257,{from: accounts[0],value:1337});
  });
  it('Should fail buyItem(uint) when NOT comply with: msg.value >= sku', async () => {
    let result = await truffleAssert.fails(contractSupplyChain.buyItem(1338,{from: accounts[0],value:1337}),'revert');
  });
  it('Should execute shipItem(uint)', async () => {
    let result = await contractSupplyChain.shipItem(2,{from: accounts[0]});
  });
  it('Should execute receiveItem(uint)', async () => {
    let result = await contractSupplyChain.receiveItem(255,{from: accounts[0]});
  });
  it('Should execute fetchItem(uint)', async () => {
    let result = await contractSupplyChain.fetchItem(255,{from: accounts[0]});
  });
});
