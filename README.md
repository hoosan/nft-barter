# NFTBarter

[![Build and run tests](https://github.com/Japan-DfinityInfoHub/nft-barter/actions/workflows/test.yml/badge.svg)](https://github.com/Japan-DfinityInfoHub/nft-barter/actions/workflows/test.yml)

Welcome to your new NFTBarter project and to the internet computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with NFTBarter, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd NFTBarter/
dfx help
dfx config --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
https://github.com/Japan-DfinityInfoHub/nft-barter.git
cd nft-barter/

# Starts the replica, running in the background
dfx start --background
```

Then install a local Internet Identity (II) canister.

(i) Clone [the Internet Identity repo](https://github.com/dfinity/internet-identity) locally, adjacent to this project.

```
cd ..
git clone https://github.com/dfinity/internet-identity.git

cd ./internet-identity
rm -rf .dfx/local
II_FETCH_ROOT_KEY=1 II_DUMMY_CAPTCHA=1 dfx deploy --argument '(null)'
```

(ii) To check the canister ID of local II, run:

```
dfx canister id internet_identity
```

(iii) Visit the local II on your browser and create at least one local internet identity. The URL is the combination of the canister ID and `.localhost:8000`, for example:

```
http://rkp4c-7iaaa-aaaaa-aaaca-cai.localhost:8000/
```

Next, install a local [generative-art-nft](https://github.com/Japan-DfinityInfoHub/generative-art-nft) canister and upload nft images.

```
cd ..
git clone https://github.com/Japan-DfinityInfoHub/generative-art-nft.git
cd generative-art-nft/

# Deploy the canister locally
./scripts/install_local.sh

# Generate generative art images with token index 0~5
npm i
npm run generate:images -start=0 -end=5

# Upload the images to the canister
./scripts/update_token_image_setter.sh
npm run upload:images -start=0 -end=5
```

Check the canister ID of the local generative-art-nft canister, because you'll need it for the following step.

```
dfx canister id GenerativeArtNFT
# Ex) qaa6y-5yaaa-aaaaa-aaafa-cai
```

Go back to our project:

```
cd ../nft-barter
```

Create `.env` file in the root directory and define `LOCAL_II_CANISTER_ID` and `LOCAL_NFT_CANISTER_ID`:

```
LOCAL_II_CANISTER_ID=rkp4c-7iaaa-aaaaa-aaaca-cai
LOCAL_NFT_CANISTER_ID=qaa6y-5yaaa-aaaaa-aaafa-cai
```

Deploy canisters locally:

```
sh ./scripts/install_local.sh
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

Additionally, if you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 8000.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`NODE_ENV` to `production` if you are using Webpack
- use your own preferred method to replace `process.env.NODE_ENV` in the autogenerated declarations
- Write your own `createActor` constructor

## Running tests
To run tests:
```bash
# Run canister e2e tests
npm run test
```
