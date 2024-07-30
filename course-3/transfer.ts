import "dotenv/config";

import {
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    PublicKey,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { createMemoInstruction } from "@solana/spl-memo";

const connection = new Connection(clusterApiUrl("devnet"));
const sender = getKeypairFromEnvironment("SECRET_KEY");

const receiver = new PublicKey('8nhHkQjD9L9rVc1dSN5SGSQBZTN4tc3pu3dFBvAVcD82');

connection.getBalance(sender.publicKey).then(async (balance) => {
    const balanceInSolBefore = balance / LAMPORTS_PER_SOL;

    console.log({
        balanceInSolBefore
    });

    const tx = new Transaction();

    const transferInstruction = SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: receiver,
        lamports: 0.1 * LAMPORTS_PER_SOL
    });

    const memo = "Dă dublu înapoi";
    const memoInstruction = createMemoInstruction(memo);

    tx.add(memoInstruction, transferInstruction);

    const confirmedTx = await sendAndConfirmTransaction(connection, tx, [sender]);

    console.log({
        confirmedTx
    })
});
