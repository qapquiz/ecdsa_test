const SimpleECDSA = artifacts.require('./SimpleECDSA.sol');
module.exports = function(deployer) {
  deployer.deploy(SimpleECDSA);
}