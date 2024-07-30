import WalletContextProvider from '@/components/WalletContextProvider';
import {PingButton} from '@/components/PingButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WalletContextProvider>
          <PingButton />
      </WalletContextProvider >
    </main>
  );
}
