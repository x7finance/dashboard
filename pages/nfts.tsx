import { Heading } from '../components/heading';
import { UtitlityNfts } from '../components/utilityNfts';

export default function DashboardPage() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="dashboard">
        Nfts
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        <UtitlityNfts />
      </div>
    </div>
  );
}
