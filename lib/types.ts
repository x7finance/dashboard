export enum ChainEnum {
  erc = 1,
  bsc = 56,
  polygon = 137,
  optimism = 10,
  arbitrum = 42161,
  offline = -1,
}

export enum ChainNameEnum {
  erc = 'erc',
  bsc = 'bsc',
  optimism = 'optimism',
  arbitrum = 'arbitrum',
  polygon = 'polygon',
  offline = 'offline',
}

export type BlockchainType =
  | ChainEnum.erc
  | ChainEnum.bsc
  | ChainEnum.arbitrum
  | ChainEnum.optimism
  | ChainEnum.polygon
  | ChainEnum.offline;

export enum SocialsEnum {
  twitter = 'https://twitter.com/X7_Finance',
  github = 'https://github.com/x7finance',
  telegram = 'https://t.me/X7m105portal',
  medium = 'https://medium.com/@X7Finance',
  discord = 'https://discord.gg/x7finance',
  website = 'https://x7.finance',
  youtube = 'https://youtube.com/channel/UCYnIyBwiomfUUAnjCbNFkqw',
  announcements = 'https://t.me/X7announcements',
  media = 'https://t.me/X7MediaChannel',
}
