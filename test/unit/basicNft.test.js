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

        describe("Mint NFT", function() {
            beforeEach(async() => {
                const txResponse = await basicNft.mintNft()
                await txResponse.wait(1)
            })
            it("Allows users to mint an NFT, and updates appropriately", async() => {
                const tokenURI = await basicNft.tokenURI(0)
                const tokenCounter = await basicNft.getTokenCounter()

                assert.equal(tokenCounter.toString(), "1")
                assert.equal(tokenURI, await basicNft.tokenURI(0))
            })
            it("show the correct balance and owner of an NFT", async() => {
                const balance = await basicNft.balanceOf(deployer.address)
                const owner = await basicNft.ownerOf(0)
                assert.equal(balance.toString(), "1")
                assert.equal(owner, deployer.address)
            })
        })
    })
