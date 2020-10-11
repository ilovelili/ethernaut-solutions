require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraUri = process.env.INFURA_URI;
const privKey = process.env.PRIVATE_KEY;

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1", // Localhost (default: none)
			port: 7545, // Standard Ethereum port (default: none)
			network_id: "*", // Any network (default: none)
		},

		ropsten: {
			provider: () => new HDWalletProvider(privKey, infuraUri),
			network_id: 3, // Ropsten's id
			gas: 5500000, // Ropsten has a lower block limit than mainnet
			confirmations: 2, // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
		},
	},
};
