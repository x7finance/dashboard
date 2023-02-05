import { CustomToaster } from '../components/customToaster';
import { Layout } from '../components/layout';
import SEO from '../next-seo.config';
import '../styles/tailwind.css';
import { Space_Mono } from '@next/font/google';
import { slugifyWithCounter } from '@sindresorhus/slugify';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import 'focus-visible';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { createClient, WagmiConfig } from 'wagmi';
import { arbitrum, bsc, mainnet, optimism, polygon } from 'wagmi/chains';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
});

function getNodeText(node: any) {
  let text = '';
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child;
    }
    text += getNodeText(child);
  }
  return text;
}

function collectHeadings(nodes: any, slugify = slugifyWithCounter()): any {
  let sections = [];

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node);
      if (title) {
        let id = slugify(title);
        node.attributes.id = id;
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            );
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          });
        } else {
          sections.push({ ...node.attributes, title, children: [] });
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify));
  }

  return sections;
}

const client = createClient(
  getDefaultClient({
    appName: 'x7financeorg',
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    chains: [mainnet, optimism, polygon, bsc, arbitrum],
  })
);

export default function App({ Component, pageProps }: AppProps) {
  let title = pageProps.markdoc?.frontmatter.title;
  let tags = pageProps.markdoc?.frontmatter.tags;
  let date = pageProps.markdoc?.frontmatter.date;

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : [];

  return (
    <>
      <style jsx global>
        {`
          :root {
            --space-font: ${spaceMono.style.fontFamily};
          }
          #__next {
            height: 100%;
          }
        `}
      </style>
      <WagmiConfig client={client}>
        <ConnectKitProvider theme="rounded">
          <DefaultSeo {...SEO} />
          <Layout
            title={title}
            tags={tags}
            date={date}
            tableOfContents={tableOfContents}
          >
            <Component {...pageProps} />
          </Layout>
          <CustomToaster />
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  );
}
