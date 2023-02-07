import { Button } from '../components/button';
import { X7Logo } from '../components/svgs/x7';
import clsx from 'clsx';

export default function DashboardPage() {
  return (
    <div className="my-16 xl:max-w-none">
      <InitialLiquidityLoans />
    </div>
  );
}

const loans = [
  {
    id: 'X7ILL001',
    name: 'Simple Loan',
    description:
      'Loan Origination Fee is 25% of borrowed capital. There is a 0% loan retention premium',
    button: {
      label: 'View Contract',
      href: 'https://etherscan.io/token/0x7400165e167479a3c81c8fc8cc3df3d2a92e9017#code',
    },
    features: [
      ['Min Loan', '0.5 ETH'],
      ['Max Loan', '5 ETH'],
      ['Leverage', '4x'],
      ['Repayment periods', '1'],
      ['Premium periods', '0'],
      ['Min Loan Duration', '1'],
      ['Min Loan Duration', '7'],
    ],
    liquidation:
      'Failure to pay the principal by the end of the loan will result in liquidation',
    logomarkClassName: 'fill-green-500/40',
  },
  {
    id: 'X7ILL002',
    name: 'Amortizing Loan',
    subTitle: 'with interest',
    description:
      'Loan Retention Premium: 6.25% in premiums due by the end of each quarter of the loan term',
    button: {
      label: 'View Contract',
      href: 'https://etherscan.io/address/0x740019a6b3a9cf3bd193986a560b05726143b217#code',
    },
    features: [
      ['Min Loan', '0.5 ETH'],
      ['Max Loan', '5 ETH'],
      ['Leverage', '10x'],
      ['Repayment periods', '4'],
      ['Premium periods', '4'],
      ['Min Loan Duration', '1'],
      ['Min Loan Duration', '7'],
    ],
    liquidation:
      'Failure to pay the principal or premium on time will result in full liquidation up to the liability amount',
    logomarkClassName: 'fill-fuchsia-500/40',
  },
  {
    id: 'X7ILL003',
    name: 'Interest Only Loan',
    description:
      'Loan Retention Premium: 6.25% in premiums due by the end of each quarter of the loan term',
    button: {
      label: 'View Contract',
      href: 'https://etherscan.io/address/0x74001c747b6cc9091ee63bc9424dff633fbac617#code',
    },
    features: [
      ['Min', '0.5 ETH'],
      ['Max', '5 ETH'],
      ['Leverage', '6.66x'],
      ['Repayment periods', '1'],
      ['Premium periods', '4'],
      ['Min Loan Duration', '1'],
      ['Min Loan Duration', '7'],
    ],
    liquidation:
      'Failure to pay the principal or premium on time will result in full liquidation up to the liability amount',
    logomarkClassName: 'fill-orange-500/40',
  },
];

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Loan({
  id,
  name,
  liquidation,
  description,
  button,
  features,
  logomarkClassName,
}: any) {
  return (
    <section className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-50 bg-zinc-900/5 p-6 shadow-lg">
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 group-hover:ring-zinc-900/10 dark:bg-white/2.5 dark:ring-white/10 dark:hover:shadow-black/5 dark:group-hover:ring-white/20"></div>
      <h3
        className={clsx(
          'flex items-center text-sm font-semibold text-slate-900'
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full  ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25  dark:ring-white/15 dark:group-hover:bg-sky-300/10 dark:group-hover:ring-sky-400">
          <X7Logo
            className={clsx(
              'h-5 w-5  stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900  dark:stroke-zinc-400 dark:group-hover:fill-sky-300/10 dark:group-hover:stroke-sky-400',
              logomarkClassName
            )}
          />
        </div>
        <span className="ml-4 leading-7 text-slate-500">{id}</span>
      </h3>
      <p
        className={clsx(
          'relative mt-5 flex text-2xl tracking-tight text-slate-900 dark:text-slate-100'
        )}
      >
        {name}
      </p>
      <p className={clsx('mt-3 text-sm text-slate-700 dark:text-slate-400')}>
        {description}
      </p>
      <div className="order-last mt-6">
        <ul
          role="list"
          className={clsx(
            '-my-2 divide-y divide-slate-200 text-sm text-slate-700 dark:divide-slate-800 dark:text-slate-300'
          )}
        >
          {features.map((feature: any) => (
            <li key={feature} className="flex w-full py-2">
              <CheckIcon className={clsx('h-6 w-6 flex-none text-sky-500')} />
              <span className="ml-4 text-slate-600 dark:text-slate-400">
                {feature[0]}
              </span>
              <span className="ml-auto ">{feature[1]}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col items-center text-sm ">
          <div className="text-sky-400 dark:text-sky-700">
            Liquidation Conditions
          </div>
          <div className="text-center text-slate-500 dark:text-slate-400">
            {liquidation}
          </div>
        </div>
      </div>
      <Button
        href={button.href}
        target="_blank"
        variant="primary"
        className="mt-6"
        aria-label={`Get started with the ${name} loan`}
      >
        <span className="absolute inset-0 rounded-2xl" />
        {button.label}
      </Button>
    </section>
  );
}

function InitialLiquidityLoans() {
  return (
    <section id="loans" aria-labelledby="loans-title">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="loan-title"
            className="text-3xl font-medium tracking-tight text-slate-900 dark:text-slate-100"
          >
            Initial Liquidity Loans
          </h2>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            These are the options X7 Finance is going to market with for initial
            liquidity. You also have the option to launch a non leveraged pair
            on Xchange at any point.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {loans.map((plan) => (
            <Loan key={plan.name} {...plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Container({
  className,
  ...props
}: {
  className?: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}
