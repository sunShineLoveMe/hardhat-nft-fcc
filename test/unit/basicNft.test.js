const { ethers, deployments } = require('hardhat');
const { developmentChains } = require('../../helper-hardhat-config');
const { assert } = require('chai');

!developmentChains.includes(network.name) ? 
    describe.skip
    : describe("Basic NFT Unit Tets", function() {
        let deployer, basicNft

        beforeEach(async() => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            await deployments.fixture(["basicnft"])
            basicNft = await ethers.getContract("BasicNft")
        })

        describe("Constructor", function() {
            it("Initializes NFT correctly", async function() {
                const name = await basicNft.name()
                const symbol = await basicNft.symbol()
                const tokenCounter = await basicNft.getTokenCounter()
                assert.equal(name, "Dogie")
                assert.equal(symbol, "DOG")
                assert.equal(tokenCounter.toString(), "0")
            })
        })
    })
