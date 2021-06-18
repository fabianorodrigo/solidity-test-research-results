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
    let result = await contractSupplyChain.addItem("IsLibrary", 5,{from: accounts[0]});
  });
  it('Should execute buyItem(uint) WHEN msg.value>=sku', async () => {
    let result = await contractSupplyChain.buyItem(6,{from: accounts[0],value:1336});
  });
  it('Should fail buyItem(uint) when NOT comply with: msg.value >= sku', async () => {
    let result = await truffleAssert.fails(contractSupplyChain.buyItem(1337,{from: accounts[0],value:1336}),'revert');
  });
  it('Should execute shipItem(uint)', async () => {
    let result = await contractSupplyChain.shipItem(255,{from: accounts[0]});
  });
  it('Should execute receiveItem(uint)', async () => {
    let result = await contractSupplyChain.receiveItem(256,{from: accounts[0]});
  });
  it('Should execute fetchItem(uint)', async () => {
    let result = await contractSupplyChain.fetchItem(9999,{from: accounts[0]});
  });
});
