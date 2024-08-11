'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js'
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";

const PROGRAM_ID = `ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa`
const DATA_ACCOUNT_PUBKEY = `Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod`

export const PingButton = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, connected, connect, select } = useWallet();

    const onClick = () => {
        console.log({
            connection,
            publicKey,
            connected
        })
        if (!connection || !publicKey) { return }

        const programId = new web3.PublicKey(PROGRAM_ID)
        const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY)
        const transaction = new web3.Transaction()

        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: programDataAccount,
                    isSigner: false,
                    isWritable: true
                },
            ],
            programId
        });

        transaction.add(instruction)
        sendTransaction(transaction, connection).then(sig => {
            console.log(sig)
        })
    }

    return <div>
        {connected ? `Connected: ${connected}` : 'Wallet not connected'}
        <br/>
        <button className="btn btn-blue" onClick={() => {
            select(PhantomWalletName);
            connect();
        }}>Connect!</button>
        <br/>
        <button className="btn btn-blue" onClick={onClick}>Ping!</button>
    </div>
}
