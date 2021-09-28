
import Head from 'next/head'


import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import { useWallet } from "@solana/wallet-adapter-react";

import {
  shortenAddress,
} from "../utils/candy-machine";
import useCandyMachine from '../hooks/use-candy-machine';
import useWalletBalance from '../hooks/use-wallet-balance';
import Countdown from 'react-countdown';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';




const Home = () => {
  const [balance] = useWalletBalance()
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const wallet = useWallet();

  const { isSoldOut, mintStartDate, isMinting, onMint, nftsData } = useCandyMachine()

  return (
    <main className="p-5 text-white flex flex-col justify-center items-center h-screen text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-green-200">
      <Toaster />
      <Head>
        <title> Mint BoredAI </title>
        <meta name="description" content="Solana Candy Machine is an open-source project using NextJS, 
          Metaplex protocol which serve as an example app for a NFT candy machine app." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
      </Head>



      <h1 className=" text-4xl text-white font-bold"> MINT BOREDAI </h1>

      <br />
      <img alt="team" className="flex-shrink-0 rounded-lg w-96 h-96 object-cover object-center mb-4" src="https://boredai-files.fra1.cdn.digitaloceanspaces.com/GIfs/GIfs/main.gif" />
      <br />
      <p className=" text-xl text-white "> <b>Mint Cost: </b>2.22 SOL </p>
      {wallet.connected &&
        <p className="p-2"><b>Address: </b> {shortenAddress(wallet.publicKey?.toBase58() || "")} </p>
      }

      {wallet.connected &&
        <>
          <p className="p-2"><b>Balance:</b> {(balance || 0).toLocaleString()} SOL</p>
          <p className="p-3"> <b>Available/Minted/Total:</b> {nftsData.itemsRemaining}/{nftsData.itemsRedeemed}/{nftsData.itemsAvailable}</p>
        </>
      }

      <div>
        {wallet.connected &&
          <button className=" p-4 ring-4 ring-opacity-90 ring-pink-100 animate-pulse  ml-3 inline-flex text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 hover:text-white rounded text-lg" type="button"
            disabled={isSoldOut || isMinting || !isActive}
            onClick={onMint}
          >
            {isSoldOut ? (
              "SORRY, WE ARE SOLD OUT"
            ) : isActive ?
              <span>MINT {isMinting && 'MINTING...'}</span> :
              <Countdown
                date={mintStartDate}
                onMount={({ completed }) => completed && setIsActive(true)}
                onComplete={() => setIsActive(true)}
                renderer={renderCounter}
              />
            }
          </button>
        }
      </div>

      <div className=" p-5 flex float-right border-solid space-x-5">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
    </main>
  );
};

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <span>
      {hours} hours, {minutes} minutes, {seconds} seconds
    </span>
  );
};

export default Home;



