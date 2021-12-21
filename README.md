## Full stack NFT marketplace built with Polygon, Solidity, IPFS, & Next.js

### Run this project

The chain ID should be 1337. If you have a localhost rpc set up, you may need to overwrite it.


#### Local setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

git clone: git@github.com:Gomathi1806/blockchain-developer-bootcamp-final-project-Decentralised-NFT-Marketplace-.git

install using NPM or Yarn

npm install

yarn
```
2. Start the local Hardhat node

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
npm run dev
```
The project will run in local. local host: 3000

5. Testing the app

To run the tests please use the below commands to build the project and run the tests

```shell
npm install
npx hardhat test
```

Note: I have created .secret file to store the privatekey and created fundtion for project id.
used polygon

My ether wallet address to recieve the certificate as NFTs
Ether address : 0x74d1Fc02Bf8166dD97dE4d1659DE9c3eaF6f0D02 

