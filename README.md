# hackathon

fork of this beautiful repo https://github.com/ChangoMan/nextjs-ethereum-starter tailored more towards what I do at hackathons
## Getting Started

we're using yarn

yarn install

# Start up the Hardhat Network
yarn chain
```

Here we just install the npm project's dependencies, and by running `yarn chain` we spin up an instance of Hardhat Network that you can connect to using MetaMask. In a different terminal in the same directory, run:

```bash
yarn deploy
```

This will deploy the contract to Hardhat Network. After this completes run:

```bash
cd frontend
yarn install
```

This will install the frontend packages

This will start up the Next.js development server. Your site will be available at http://localhost:3000/
