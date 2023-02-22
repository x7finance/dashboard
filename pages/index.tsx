import { Heading } from '../components/heading';
import { SplittersOverview } from '../components/splittersOverview';
import dynamic from 'next/dynamic';

const PairsTable = dynamic(
  () => import('../components/pairsTable').then((mod) => mod.PairsTable),
  {
    ssr: false,
  }
);

export default function LiveDashboardPage() {
  return (
    <>
      <div className="my-16 xl:max-w-none">
        <Heading
          className="not-prose mt-12 mb-10 border-b border-zinc-900/5 text-xl font-semibold text-slate-900 dark:border-white/5 dark:text-slate-100"
          level={1}
          id="pairs"
          subHeader="The latest pairs created on Xchange"
        >
          Live Pairs
        </Heading>
        <PairsTable />
      </div>
      <div className="mt-32 mb-16 xl:max-w-none">
        <Heading
          className="not-prose mt-24 mb-10 border-b border-zinc-900/5 text-xl font-semibold text-slate-900 dark:border-white/5 dark:text-slate-100"
          level={2}
          id="splits"
          subHeader="A detailed breakdown of where liquidity and funds are being moved through the ecosystem"
        >
          Live Ecosystem Splits
        </Heading>
        <div className="not-prose mt-4 grid grid-cols-1 gap-8 xl:grid-cols-2">
          <SplittersOverview />
        </div>
      </div>
    </>
  );
}
