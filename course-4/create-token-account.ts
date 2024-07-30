import "dotenv/config";

import {
    Connection,
    clusterApiUrl, PublicKey,
} from "@solana/web3.js";
import {getKeypairFromEnvironment} from '@solana-developers/helpers';
import {getOrCreateAssociatedTokenAccount} from '@solana/spl-token';

const connection = new Connection(clusterApiUrl("devnet"));
const sender = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintPublicKey = new PublicKey("UMgcrX9qm7H4JS7seEvWjqRMHiN6dDD5yFpkkSfoJyX");
getOrCreateAssociatedTokenAccount(connection, sender, tokenMintPublicKey, sender.publicKey).then((tokenAccount) => {
    console.log({
        tokenAccount
    })
});
