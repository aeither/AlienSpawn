# Alien Spawn

![Home](https://user-images.githubusercontent.com/36173828/205486476-b6bbd59b-0b84-4eb0-a904-e84a880f032a.png)

## DEMO

https://alien-spawn.vercel.app/

## Overview

Alien Spawn is a no-code, dynamic NFT battle game built on Evmos. Users can mint their NFT from the configurator. The users can change the background color of the character and edit the statistic with assignable points to health, stamina, or strength to fit their gaming style. The user can also choose to upload his own 1:1 image to mint a truly unique NFT. 

![Spawner](https://user-images.githubusercontent.com/36173828/205486499-6dd060ea-4662-4bfe-8ef7-30d769fd64e7.png)

Users can now explore a list of NFTs on the Station page, complete with statistics and transaction history, thanks to the Covalent API. The backend fetches all the token ids with /nft_token_ids and then uses them to get the nft transactions with /nft_transactions and metadata with /nft_metadata.

![Station](https://user-images.githubusercontent.com/36173828/205486624-776eeb97-8821-4807-b509-c05897087b1f.png)

![NFTDetails](https://user-images.githubusercontent.com/36173828/205486520-d8213735-3f5b-4c90-b69b-5d6fa1f49f89.png)

For the battle, the user can use the intuitive drag-and-drop page to select one of his aliens and an opponent to attack. If the user finished the incursion successfully, his NFT would gain improvement points.

![Space](https://user-images.githubusercontent.com/36173828/205486509-69ae3d14-4708-43a3-9d1a-91e605ca8106.png)

## Motivation

Increase user involvement in the creation process by encouraging customer participation and ownership through configurable options. Known as the "IKEA EFFECT," this not only increases user engagement but also leads to increased user satisfaction and loyalty. Help foster a sense of community and connection with the project by allowing users to contribute and feel invested in its success.


## Tech Stack

Frontend: Typescript, React, NextJS, TailwindCSS, Covalent

Smart Contract: Solidity, Remix

## Future plans
Making the NFTS configurator a tool for creators and projects to deploy their own contract and use it on their own dashboard.

Improve the game mechanics.

Add a 3 vs. 3 battle mode.

Add unique abilities to each NFT.
