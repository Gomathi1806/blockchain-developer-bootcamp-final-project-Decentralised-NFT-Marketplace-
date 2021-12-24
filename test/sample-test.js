const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('NFTMarket - Should create and execute market sales', function () {
  it('Should create and execute market sales', async function () {
    const Market = await ethers.getContractFactory('NFTMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await nft.createToken('https://www.mytokenlocation.com')
    await nft.createToken('https://www.mytokenlocation2.com')

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice
    })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice
    })

    const [_, buyerAddress] = await ethers.getSigners()

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice })
  })
})

describe('NFTMarket - After sales only one item should be left', function () {
  it('Only one item should be left', async function () {
    const Market = await ethers.getContractFactory('NFTMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await nft.createToken('https://www.mytokenlocation.com')
    await nft.createToken('https://www.mytokenlocation2.com')

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice
    })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice
    })

    const [_, buyerAddress] = await ethers.getSigners()

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice })

    let items = await market.fetchMarketItems()

    expect(items).with.length(1)
  })
})

describe('NFTMarket - After sales only one item should be left with sold as FALSE', function () {
  it('Sold Flag should be FALSE', async function () {
    const Market = await ethers.getContractFactory('NFTMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await nft.createToken('https://www.mytokenlocation.com')
    await nft.createToken('https://www.mytokenlocation2.com')

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice
    })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice
    })

    const [_, buyerAddress] = await ethers.getSigners()

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice })

    let items = await market.fetchMarketItems()

    items = await Promise.all(
      items.map(async i => {
        const tokenUri = await nft.tokenURI(i.tokenId)
        let item = {
          sold: i.sold.toString()
        }
        expect(item)
          .to.have.property('sold')
          .with.equal('false')
        return item
      })
    )
  })
})

describe('NFTMarket - After sales only one item should be left And its tokenId should be 2', function () {
  it('tokenId should be 2', async function () {
    const Market = await ethers.getContractFactory('NFTMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await nft.createToken('https://www.mytokenlocation.com')
    await nft.createToken('https://www.mytokenlocation2.com')

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice
    })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice
    })

    const [_, buyerAddress] = await ethers.getSigners()

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice })

    let items = await market.fetchMarketItems()

    items = await Promise.all(
      items.map(async i => {
        const tokenUri = await nft.tokenURI(i.tokenId)
        let item = {
          tokenId: i.tokenId
        }
        expect(item)
          .to.have.property('tokenId')
          .to.equal(2)
        return item
      })
    )
  })
})

describe('NFTMarket - Should create and execute market sales', function () {
  it('Should deploy marketsales Contract', async function () {
    const Market = await ethers.getContractFactory('NFTMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    expect(marketAddress).to.not.equal(0x0)
    expect(marketAddress).to.not.equal('')
    expect(marketAddress).to.not.equal(null)
    expect(marketAddress).to.not.equal(undefined)
  })
})
