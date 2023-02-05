import clsx from 'clsx';
import Link from 'next/link';

const styles = {
  primary:
    'rounded-full bg-purple-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-purple-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300/50 active:bg-purple-500',
  secondary:
    'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
};

export function Button({
  variant = 'primary',
  className,
  href,
  ...props
}: any) {
  // @ts-expect-error
  className = clsx(styles[variant], className);

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
}
