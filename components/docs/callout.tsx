import { Icon } from './docsIcon';
import clsx from 'clsx';

const styles: any = {
  note: {
    container:
      'bg-purple-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-purple-900 dark:text-purple-100',
    body: 'text-purple-800 [--tw-prose-background:theme(colors.purple.50)] prose-a:text-purple-900 prose-code:text-purple-900 dark:text-slate-300 dark:prose-code:text-slate-300',
  },
  warning: {
    container:
      'bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.purple.700)] dark:prose-code:text-slate-300',
  },
};

const icons = {
  note: (props: any) => <Icon icon="lightbulb" {...props} />,
  warning: (props: any) => <Icon icon="warning" color="amber" {...props} />,
};

export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: string;
  title: string;
  children: any;
}) {
  // @ts-expect-error
  let IconComponent: any = icons[type];

  return (
    <div className={clsx('my-8 flex rounded-3xl p-6', styles[type].container)}>
      <IconComponent className="h-8 w-8 flex-none" />
      <div className="ml-4 flex-auto">
        <p className={clsx('font-display m-0 text-xl', styles[type].title)}>
          {title}
        </p>
        <div className={clsx('prose mt-2.5', styles[type].body)}>
          {children}
        </div>
      </div>
    </div>
  );
}
