import arbitrum from './glyphs/arbitrum';
import bsc from './glyphs/bsc';
import ethereum from './glyphs/ethereum';
import loading from './glyphs/loading';
import optimism from './glyphs/optimism';
import polygon from './glyphs/polygon';
import clsx from 'clsx';
import { createElement, MemoExoticComponent } from 'react';

interface IconProps {
  glyph: glyph;
  size?: number;
  onClick?: any;
  fill?: string;
  rotate?: number;
  height?: number;
  isAbsolute?: boolean;
  secondaryFill?: string;
  text?: string;
  containerClass?: string;
}

export enum glyph {
  loading,
  arbitrum,
  bsc,
  ethereum,
  optimism,
  polygon,
}

export const GLYPH_MAPS: Record<glyph, MemoExoticComponent<any>> = {
  [glyph.loading]: loading,
  [glyph.arbitrum]: arbitrum,
  [glyph.bsc]: bsc,
  [glyph.ethereum]: ethereum,
  [glyph.optimism]: optimism,
  [glyph.polygon]: polygon,
};

function Icon(props: IconProps): JSX.Element {
  const { glyph, fill, rotate, size = 8, containerClass = '', ...res } = props;

  return (
    <span className={clsx(`w-${size} h-${size} inline-block`, containerClass)}>
      {createElement(GLYPH_MAPS[glyph], {
        fill: fill ? fill : 'currentColor',
        ...res,
        rotate,
      })}
    </span>
  );
}

export default Icon;

Icon.glyph = glyph;
