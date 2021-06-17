const truffleAssert = require('truffle-assertions');
const ERC165InterfaceCaller = artifacts.require("ERC165InterfaceCaller");
const ERC165InterfaceImplementer = artifacts.require("ERC165InterfaceImplementer");
const ERC165Checker = artifacts.require("openzeppelin-solidity/contracts/introspection/ERC165Checker.sol");

contract("ERC165InterfaceCaller",(accounts)=>{
  let trace = false;
  let contractERC165Checker = null;
  let contractERC165InterfaceCaller = null;
  let contractERC165InterfaceImplementer = null;
  beforeEach(async () => {
    contractERC165Checker = await ERC165Checker.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC165Checker.new({from: accounts[0]}');
    ERC165InterfaceCaller.link("ERC165Checker",contractERC165Checker.address);
    contractERC165InterfaceCaller = await ERC165InterfaceCaller.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC165InterfaceCaller.new({from: accounts[0]}');
    contractERC165InterfaceImplementer = await ERC165InterfaceImplementer.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC165InterfaceImplementer.new({from:accounts[0]}');
  });
  
  it('Should execute callImplementation(address) WHEN FunctionCall==true', async () => {
    let result = await contractERC165InterfaceCaller.callImplementation(contractERC165InterfaceImplementer.address,{from: accounts[0]});
  });
  it('Should execute callImplementation(address) WHEN FunctionCall!=true', async () => {
    let result = await contractERC165InterfaceCaller.callImplementation(contractERC165InterfaceImplementer.address,{from: accounts[0]});
  });
  it('Should execute callImplementationUsingLib(address) WHEN FunctionCall==true', async () => {
    let result = await contractERC165InterfaceCaller.callImplementationUsingLib(contractERC165InterfaceImplementer.address,{from: accounts[0]});
  });
  it('Should execute callImplementationUsingLib(address) WHEN FunctionCall!=true', async () => {
    let result = await contractERC165InterfaceCaller.callImplementationUsingLib(contractERC165InterfaceImplementer.address,{from: accounts[0]});
  });
});
