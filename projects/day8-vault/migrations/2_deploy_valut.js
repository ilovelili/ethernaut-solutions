const Valut = artifacts.require("Vault.sol");
const ethers = require("ethers");

module.exports = async function (deployer) {
	const password = "my password";
	await deployer.deploy(Valut, ethers.utils.formatBytes32String(password));
};
