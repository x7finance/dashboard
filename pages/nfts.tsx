import { Heading } from '../components/heading';
import dynamic from 'next/dynamic';

const UtilityNftsComponent = dynamic(
  () => import('../components/utilityNfts').then((mod) => mod.UtitlityNfts),
  {
    ssr: false,
  }
);

export default function NftsPage() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="nfts">
        Nfts
      </Heading>
      <div className="not-prose border-t border-zinc-900/5 pt-10 dark:border-white/5">
        <UtilityNftsComponent />
      </div>
    </div>
  );
}
