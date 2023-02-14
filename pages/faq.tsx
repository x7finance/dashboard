import { Heading } from '../components/heading';

const faqs = [
  {
    question: 'How does the X7 DAO work?',
    slug: 'x7-dao-mechanics',
    answer: (
      <>
        <b>Proposals and Voting</b>
        <div className="mb-4">
          Voting will occur in multiple phases, each of which has either a
          minimum or maximum time phase duration.
        </div>
        <div className="mb-4">
          <b>Phase 1: Quorum-seeking </b>
          <div>
            X7DAO token holders will be able to stake their tokens as X7sDAO, a
            non-transferrable staked version of X7DAO. A quorum is reached when
            more than 50% of circulating X7DAO has been staked as X7sDAO. Once a
            quorum is reached and a minimum quorum-seeking time period has
            passed, the X7sDAO tokens are temporarily locked (and no more X7DAO
            tokens may be staked until the next Quorum seeking period) and the
            governance process moves to the next phase
          </div>
        </div>
        <div className="mb-4">
          <b>Phase 2: Proposal creation</b>
          <div>
            A proposal is created by running a transaction on the governance
            contract which specifies a specific transaction on a specific
            contract (e.g. setFeeNumerator(0) on the X7R token contract).
            Proposals are ordered, and any proposals that are passed/adopted
            must be run in the order that they were created. Proposals can be
            made by X7sDAO stakes of 500,000 tokens or more. Additionally,
            holders of Magister tokens may make proposals. Proposals may require
            a refundable proposal fee to prevent process griefing.
          </div>
        </div>
        <div className="mb-4">
          <b>Phase 3: Proposal voting</b>
          <div>
            Each proposal may be voted on once by each address. The voter may
            specify the weight of their vote between 0 and the total amount of
            X7sDAO they have staked. Proposals pass by a majority vote of the
            quorum of X7sDAO tokens. A parallel voting process will occur with
            Magister tokens, where each Magister token carries one vote. If a
            majority of magister token holders vote against a proposal, the
            proposal must reach an X7sDAO vote of 75% of the quorum of X7sDAO
            tokens.
          </div>
        </div>
        <div className="mb-4">
          <b>Phase 4: Proposal adoption</b>
          <div>
            During this phase, proposals that have passed will be enqueued for
            execution. This step ensures proper ordering and is a guard against
            various forms of process griefing.
          </div>
        </div>
        <div className="mb-4">
          <div>
            <b>Phase 5: Proposal execution</b> After proposal adoption, all
            passed proposals must be executed before a new Quorum Seeking phase
            may commence.
          </div>
        </div>
      </>
    ),
  },
];

export default function FaqsPage() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="nfts">
        FAQs
      </Heading>

      <div className="not-prose border-t border-zinc-900/5 dark:border-white/5">
        <div className="p-6 lg:px-8">
          <div className="mx-auto divide-y divide-white/10">
            <dl className="mt-10 space-y-6 divide-y divide-white/10">
              {faqs.map((faq, idx) => (
                <div
                  key={`faq-${idx}`}
                  className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
                >
                  <dt className="text-base font-semibold leading-7 text-slate-900 dark:text-slate-100 lg:col-span-5">
                    <Heading level={3} id={faq?.slug}>
                      {faq.question}
                    </Heading>
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <div className="text-base leading-7 text-slate-700/80 dark:text-slate-300/80">
                      {faq.answer}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
