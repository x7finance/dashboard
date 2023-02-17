import { Heading } from '../components/heading';
import { SplittersOverview } from '../components/splittersOverview';

export default function LiveDashboardPage() {
  return (
    <>
      <div className="my-16 xl:max-w-none">
        <Heading level={2} id="live">
          Live Pairs
        </Heading>
        <div className="grid grid-cols-1 gap-8 pt-10 mt-4 border-t not-prose border-zinc-900/5 dark:border-white/5 sm:grid-cols-2">
          <div className="h-96">Coming soon</div>
        </div>
      </div>
      <div className="my-16 xl:max-w-none">
        <Heading level={2} id="splits">
          Live Ecosystem Splits
        </Heading>
        <div className="grid grid-cols-1 gap-8 pt-10 mt-4 border-t not-prose border-zinc-900/5 dark:border-white/5 xl:grid-cols-2">
          <SplittersOverview />
        </div>
      </div>
    </>
  );
}
