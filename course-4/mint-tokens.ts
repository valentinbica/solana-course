import "dotenv/config";

import {
    Connection,
    clusterApiUrl, PublicKey,
} from "@solana/web3.js";
import {getKeypairFromEnvironment} from '@solana-developers/helpers';
import {mintTo} from '@solana/spl-token';

const connection = new Connection(clusterApiUrl("devnet"));
const sender = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintPublicKey = new PublicKey("UMgcrX9qm7H4JS7seEvWjqRMHiN6dDD5yFpkkSfoJyX");
const associatedTokenAccount = new PublicKey("G1Xu1gLjtS2R2gzUijrRTYgByKQmfJPiCuLTsLgWCTXE");

mintTo(connection, sender, tokenMintPublicKey, associatedTokenAccount, sender, 100 * 10 ** 2).then((result) => {
    console.log({
        result
    })
});
