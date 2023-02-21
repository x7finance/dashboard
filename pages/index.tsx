import { Heading } from '../components/heading';
import PairsGrid from '../components/pairsGrid';
import { SplittersOverview } from '../components/splittersOverview';

export default function LiveDashboardPage() {
  return (
    <>
      <div className="my-16 xl:max-w-none">
        <Heading level={2} id="live">
          Live Pairs
        </Heading>
        <PairsGrid />
      </div>
      <div className="my-16 xl:max-w-none">
        <Heading level={2} id="splits">
          Live Ecosystem Splits
        </Heading>
        <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 xl:grid-cols-2">
          <SplittersOverview />
        </div>
      </div>
    </>
  );
}
