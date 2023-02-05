import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import fs from 'fs';
import { globby } from 'globby';
import matter from 'gray-matter';

dotenv.config();

async function init() {
  const pages = await globby(['pages/onchains', 'pages/docs']);
  console.warn(`found ${pages?.length} pages to index: `, pages);

  const objects = pages.map((page) => {
    const fileContents = fs.readFileSync(page, 'utf8');
    const { data, content } = matter(fileContents);

    const initpath = page.replace('.md', '');
    const path = initpath.replace('pages', '');

    const slug = cleanPath(path);

    return {
      slug,
      content,
      frontmatter: {
        ...data,
      },
    };
  });

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID,
    process.env.DOCSEARCH_ADMIN_API_KEY
  );
  const index = client.initIndex(process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME);
  index.saveObjects(objects, {
    autoGenerateObjectIDIfNotExist: true,
  });
}

function cleanPath(path) {
  switch (path) {
    case '/onchains/index':
      return '/onchains';
    case '/docs/index':
      return '/docs';
    default:
      return path;
  }
}

init()
  .then(() => {
    console.warn('Finished indexing docs! 🎉');
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit();
  });

export {};
