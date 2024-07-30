import "dotenv/config";

import {
    Connection,
    clusterApiUrl,
} from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from '@solana-developers/helpers';
import {createMint} from '@solana/spl-token';

const connection = new Connection(clusterApiUrl("devnet"));
const sender = getKeypairFromEnvironment("SECRET_KEY");

createMint(connection, sender, sender.publicKey, null, 9).then((mint) => {
    const link = getExplorerLink("address", mint.toString(), "devnet");
    console.log({
        link
    })
})
