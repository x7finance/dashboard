import { SocialsEnum } from '../../lib/types';

const navigation = [
  {
    name: 'Telegram',
    href: SocialsEnum.telegram,
  },
  {
    name: 'Main Site',
    href: SocialsEnum.website,
  },
  {
    name: 'Twitter',
    href: SocialsEnum.twitter,
  },
  {
    name: 'Discord',
    href: SocialsEnum.discord,
  },
  {
    name: 'Medium',
    href: SocialsEnum.medium,
  },
  {
    name: 'GitHub',
    href: SocialsEnum.github,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto py-2 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-xs text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500"
            >
              <span>{item.name}</span>
            </a>
          ))}
        </div>
        <div className="mt-2 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400 dark:text-gray-500">
            built & maintained by X7DAO
            <span className="ml-1 hidden sm:inline-block">
              - special thank you to [Woxie, Adz, MikeMurpher, d0c]
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
