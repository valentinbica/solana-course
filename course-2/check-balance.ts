import "dotenv/config";

import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import {getKeypairFromEnvironment} from '@solana-developers/helpers';
import bs58 from 'bs58';

const connection = new Connection(clusterApiUrl("devnet"));

console.log({
    url: connection.rpcEndpoint
})

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log({
    keypair: bs58.encode(keypair.secretKey),
    publicKey: keypair.publicKey.toBase58()
})

connection.getBalance(keypair.publicKey).then((balance) => {
    const balanceInSol = balance / LAMPORTS_PER_SOL;

    console.log({
        balance,
        balanceInSol
    });
});
