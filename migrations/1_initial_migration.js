const Migrations = artifacts.require("Migrations");
const Registry = artifacts.require("Registry");
const Resolver = artifacts.require("Resolver");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Registry);
  deployer.deploy(Resolver);
};
