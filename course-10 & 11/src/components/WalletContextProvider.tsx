'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import {clusterApiUrl} from '@solana/web3.js';
import {useMemo} from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');

const network = WalletAdapterNetwork.Devnet;

export default function WalletContextProvider({ children }: Readonly<{
    children: React.ReactNode;
}>)  {
    const endpoint = useMemo(() => clusterApiUrl(network), []);
    const wallets = [new walletAdapterWallets.PhantomWalletAdapter()]

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    { children }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
