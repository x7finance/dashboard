import { Hero } from './hero';
import { Navigation } from './navigation';
import { Prose } from './prose';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const onchainsNavigation = [
  {
    title: 'February 2023',
    links: [
      {
        title: 'Feb-06-2023-100135-PM',
        href: '/onchains/929-Feb-06-2023-052259-AM-+UTC',
      },
      {
        title: 'Feb-03-2023-064611-PM',
        href: '/onchains/930-Feb-03-2023-064611-PM-+UTC',
      },
      {
        title: 'Feb-02-2023-112347-PM',
        href: '/onchains/931-Feb-02-2023-112347-PM-+UTC',
      },
      {
        title: 'Feb-02-2023-100135-PM',
        href: '/onchains/932-Feb-02-2023-100135-PM-+UTC',
      },
      {
        title: 'Feb-01-2023-073047-AM',
        href: '/onchains/933-Feb-01-2023-073047-AM-+UTC',
      },
      {
        title: 'Feb-01-2023-035835-PM',
        href: '/onchains/934-Feb-01-2023-035835-PM-+UTC',
      },
    ],
  },
  {
    title: 'January 2023',
    links: [
      {
        title: 'Jan-31-2023-063823-PM',
        href: '/onchains/935-Jan-31-2023-063823-PM-+UTC',
      },
      {
        title: 'Jan-29-2023-092159-PM',
        href: '/onchains/936-Jan-29-2023-092159-PM-+UTC',
      },
      {
        title: 'Jan-27-2023-073311-PM',
        href: '/onchains/937-Jan-27-2023-073311-PM-+UTC',
      },
      {
        title: 'Jan-26-2023-085811-PM',
        href: '/onchains/938-Jan-26-2023-085811-PM-+UTC',
      },
      {
        title: 'Jan-24-2023-112311-PM',
        href: '/onchains/939-Jan-24-2023-112311-PM-+UTC',
      },
      {
        title: 'Jan-19-2023-085835-PM',
        href: '/onchains/940-Jan-19-2023-085835-PM-+UTC',
      },
      {
        title: 'Jan-16-2023-012223-PM',
        href: '/onchains/941-Jan-16-2023-012223-PM-+UTC',
      },
      {
        title: 'Jan-10-2023-055123-AM',
        href: '/onchains/942-Jan-10-2023-055123-AM-+UTC',
      },
      {
        title: 'Jan-03-2023-053423-AM',
        href: '/onchains/943-Jan-03-2023-053423-AM-+UTC',
      },
      {
        title: 'Jan-02-2023-105811-PM',
        href: '/onchains/944-Jan-02-2023-105811-PM-+UTC',
      },
    ],
  },
  {
    title: 'December 2022',
    links: [
      {
        title: 'Dec-30-2022-115323-PM',
        href: '/onchains/945-Dec-30-2022-115323-PM-+UTC',
      },
      {
        title: 'Dec-16-2022-123223-AM',
        href: '/onchains/946-Dec-16-2022-123223-AM-+UTC',
      },
      {
        title: 'Dec-14-2022-065059-PM',
        href: '/onchains/947-Dec-14-2022-065059-PM-+UTC',
      },
      {
        title: 'Dec-06-2022-081159-AM',
        href: '/onchains/948-Dec-06-2022-081159-AM-+UTC',
      },
      {
        title: 'Dec-02-2022-034459-AM',
        href: '/onchains/949-Dec-02-2022-034459-AM-+UTC',
      },
    ],
  },
  {
    title: 'November 2022',
    links: [
      {
        title: 'Nov-11-2022-011811-AM',
        href: '/onchains/950-Nov-11-2022-011811-AM-+UTC',
      },
      {
        title: 'Nov-10-2022-033259-AM',
        href: '/onchains/951-Nov-10-2022-033259-AM-+UTC',
      },
      {
        title: 'Nov-09-2022-071947-PM',
        href: '/onchains/952-Nov-09-2022-071947-PM-+UTC',
      },
      {
        title: 'Nov-08-2022-100935-PM',
        href: '/onchains/953-Nov-08-2022-100935-PM-+UTC',
      },
      {
        title: 'Nov-08-2022-012623-AM',
        href: '/onchains/954-Nov-08-2022-012623-AM-+UTC',
      },
    ],
  },
  {
    title: 'October 2022',
    links: [
      {
        title: 'Oct-31-2022-064923-AM',
        href: '/onchains/955-Oct-31-2022-064923-AM-+UTC',
      },
      {
        title: 'Oct-22-2022-061011-AM',
        href: '/onchains/956-Oct-22-2022-061011-AM-+UTC',
      },
      {
        title: 'Oct-16-2022-055223-PM',
        href: '/onchains/957-Oct-16-2022-055223-PM-+UTC',
      },
      {
        title: 'Oct-14-2022-061747-PM',
        href: '/onchains/958-Oct-14-2022-061747-PM-+UTC',
      },
      {
        title: 'Oct-13-2022-075135-AM',
        href: '/onchains/959-Oct-13-2022-075135-AM-+UTC',
      },
      {
        title: 'Oct-07-2022-100759-PM',
        href: '/onchains/960-Oct-07-2022-100759-PM-+UTC',
      },
      {
        title: 'Oct-06-2022-084123-AM',
        href: '/onchains/961-Oct-06-2022-084123-AM-+UTC',
      },
      {
        title: 'Oct-03-2022-072111-AM',
        href: '/onchains/962-Oct-03-2022-072111-AM-+UTC',
      },
      {
        title: 'Oct-01-2022-070111-AM',
        href: '/onchains/963-Oct-01-2022-070111-AM-+UTC',
      },
    ],
  },
  {
    title: 'September 2022',
    links: [
      {
        title: 'Sep-29-2022-125135-PM',
        href: '/onchains/964-Sep-29-2022-125135-PM-+UTC',
      },
      {
        title: 'Sep-28-2022-090211-AM',
        href: '/onchains/965-Sep-28-2022-090211-AM-+UTC',
      },
      {
        title: 'Sep-28-2022-050511-AM',
        href: '/onchains/966-Sep-28-2022-050511-AM-+UTC',
      },
      {
        title: 'Sep-28-2022-020547-AM',
        href: '/onchains/967-Sep-28-2022-020547-AM-+UTC',
      },
      {
        title: 'Sep-27-2022-021523-PM',
        href: '/onchains/968-Sep-27-2022-021523-PM-+UTC',
      },
      {
        title: 'Sep-27-2022-035535-AM',
        href: '/onchains/969-Sep-27-2022-035535-AM-+UTC',
      },
      {
        title: 'Sep-26-2022-092347-PM',
        href: '/onchains/970-Sep-26-2022-092347-PM-+UTC',
      },
      {
        title: 'Sep-26-2022-044647-PM',
        href: '/onchains/971-Sep-26-2022-044647-PM-+UTC',
      },
      {
        title: 'Sep-26-2022-033035-AM',
        href: '/onchains/972-Sep-26-2022-033035-AM-+UTC',
      },
      {
        title: 'Sep-26-2022-023011-AM',
        href: '/onchains/973-Sep-26-2022-023011-AM-+UTC',
      },
      {
        title: 'Sep-25-2022-035347-AM',
        href: '/onchains/974-Sep-25-2022-035347-AM-+UTC',
      },
      {
        title: 'Sep-24-2022-093123-PM',
        href: '/onchains/975-Sep-24-2022-093123-PM-+UTC',
      },
      {
        title: 'Sep-24-2022-103711-AM',
        href: '/onchains/976-Sep-24-2022-103711-AM-+UTC',
      },
      {
        title: 'Sep-24-2022-023335-AM',
        href: '/onchains/977-Sep-24-2022-023335-AM-+UTC',
      },
      {
        title: 'Sep-22-2022-090935-PM',
        href: '/onchains/978-Sep-22-2022-090935-PM-+UTC',
      },
      {
        title: 'Sep-19-2022-080259-AM',
        href: '/onchains/979-Sep-19-2022-080259-AM-+UTC',
      },
      {
        title: 'Sep-13-2022-105207-AM',
        href: '/onchains/980-Sep-13-2022-105207-AM-+UTC',
      },
      {
        title: 'Sep-12-2022-095341-AM',
        href: '/onchains/981-Sep-12-2022-095341-AM-+UTC',
      },
      {
        title: 'Sep-07-2022-082157-AM',
        href: '/onchains/982-Sep-07-2022-082157-AM-+UTC',
      },
      {
        title: 'Sep-04-2022-083900-AM',
        href: '/onchains/983-Sep-04-2022-083900-AM-+UTC',
      },
      {
        title: 'Sep-01-2022-051839-AM',
        href: '/onchains/984-Sep-01-2022-051839-AM-+UTC',
      },
    ],
  },
  {
    title: 'August 2022',
    links: [
      {
        title: 'Aug-31-2022-092227-PM',
        href: '/onchains/985-Aug-31-2022-092227-PM-+UTC',
      },
      {
        title: 'Aug-31-2022-055456-AM',
        href: '/onchains/986-Aug-31-2022-055456-AM-+UTC',
      },
      {
        title: 'Aug-30-2022-032405-AM',
        href: '/onchains/987-Aug-30-2022-032405-AM-+UTC',
      },
      {
        title: 'Aug-29-2022-044830-PM',
        href: '/onchains/988-Aug-29-2022-044830-PM-+UTC',
      },
      {
        title: 'Aug-29-2022-114635-AM',
        href: '/onchains/989-Aug-29-2022-114635-AM-+UTC',
      },
      {
        title: 'Aug-28-2022-020448-AM',
        href: '/onchains/990-Aug-28-2022-020448-AM-+UTC',
      },
      {
        title: 'Aug-26-2022-091751-PM',
        href: '/onchains/991-Aug-26-2022-091751-PM-+UTC',
      },
      {
        title: 'Aug-25-2022-104049-PM',
        href: '/onchains/992-Aug-25-2022-104049-PM-+UTC',
      },
      {
        title: 'Aug-25-2022-045900-AM',
        href: '/onchains/993-Aug-25-2022-045900-AM-+UTC',
      },
      {
        title: 'Aug-24-2022-043226-AM',
        href: '/onchains/994-Aug-24-2022-043226-AM-+UTC',
      },
      {
        title: 'Aug-24-2022-030749-AM',
        href: '/onchains/995-Aug-24-2022-030749-AM-+UTC',
      },
      {
        title: 'Aug-23-2022-062730-PM',
        href: '/onchains/996-Aug-23-2022-062730-PM-+UTC',
      },
      {
        title: 'Aug-22-2022-092218-AM',
        href: '/onchains/997-Aug-22-2022-092218-AM-+UTC',
      },
      {
        title: 'Aug-21-2022-072625-AM',
        href: '/onchains/998-Aug-21-2022-072625-AM-+UTC',
      },
      {
        title: 'Aug-19-2022-073411-PM',
        href: '/onchains/999-Aug-19-2022-073411-PM-+UTC',
      },
    ],
  },
];

const docsNavigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Intro', href: '/docs' },
      { title: 'Integrating', href: '/docs/integrating' },
    ],
  },
];

function useTableOfContents(tableOfContents: any) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id);

  let getHeadings = useCallback((tableOfContents: any) => {
    return tableOfContents
      .flatMap((node: any) => [
        node.id,
        ...node.children.map((child: any) => child.id),
      ])
      .map((id: string) => {
        let el = document.getElementById(id);
        if (!el) return;

        let style = window.getComputedStyle(el);
        let scrollMt = parseFloat(style.scrollMarginTop);

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
        return { id, top };
      });
  }, []);

  useEffect(() => {
    if (tableOfContents.length === 0) return;
    let headings = getHeadings(tableOfContents);
    function onScroll() {
      let top = window.scrollY;
      let current = headings[0].id;
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id;
        } else {
          break;
        }
      }
      setCurrentSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      // @ts-expect-error
      window.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, [getHeadings, tableOfContents]);

  return currentSection;
}

export function DocsBase({
  children,
  title,
  date,
  tags,
  tableOfContents,
  docsType,
}: any) {
  let router = useRouter();
  const navigation =
    docsType === 'onchains' ? onchainsNavigation : docsNavigation;

  let isHomePage = router.pathname === '/';
  let allLinks = navigation.flatMap((section) => section.links);
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname);
  let previousPage = allLinks[linkIndex - 1];
  let nextPage = allLinks[linkIndex + 1];
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  );
  let currentSection = useTableOfContents(tableOfContents);

  function isActive(section: any) {
    if (section.id === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
    return section.children.findIndex(isActive) > -1;
  }

  return (
    <>
      {isHomePage && <Hero />}

      <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
          <div className="scrollbar sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
            <Navigation
              navigation={navigation}
              className="w-64 pr-8 xl:w-72 xl:pr-16"
            />
          </div>
        </div>
        <div className="min-h-screen min-w-0 max-w-2xl flex-auto overflow-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <div className="font-display text-sm font-medium">
                    <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
                      {section.title}
                    </span>
                  </div>
                )}
                {!!tags?.length &&
                  tags.map((tag: string, key: number) => {
                    return (
                      <span
                        key={`${tag}-${key}`}
                        className="mr-1 inline-flex justify-center gap-0.5 overflow-hidden rounded-full bg-sky-600/80 py-0.5 px-3 text-xs font-medium text-white ring-1 ring-inset ring-sky-700 transition hover:bg-sky-700 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/20 dark:hover:bg-sky-400/10 dark:hover:text-sky-300 dark:hover:ring-sky-300"
                      >
                        {tag}
                      </span>
                    );
                  })}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
                {date && (
                  <h2 className="font-display text-xl tracking-tight text-slate-900 dark:text-white">
                    {date}
                  </h2>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
            {previousPage && (
              <div>
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    href={previousPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span aria-hidden="true">&larr;</span> {previousPage.title}
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nextPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {nextPage.title} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section: any) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection: any) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-purple-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
