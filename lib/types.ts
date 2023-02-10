export enum ChainEnum {
  erc = 1,
  bsc = 56,
  polygon = 137,
  optimism = 10,
  arbitrum = 42161,
  offline = -1,
}

export type BlockchainType =
  | ChainEnum.erc
  | ChainEnum.bsc
  | ChainEnum.arbitrum
  | ChainEnum.optimism
  | ChainEnum.polygon
  | ChainEnum.offline;

export enum ChainNameEnum {
  erc = 'Ethereum',
  bsc = 'BSC',
  optimism = 'Optimism',
  arbitrum = 'Arbitrum',
  polygon = 'Polygon',
  offline = 'offline',
}

export enum ChainIdentifierEnum {
  erc = 'ether',
  bsc = 'bnb',
  optimism = 'optimism',
  arbitrum = 'arbitrum',
  polygon = 'polygon',
  offline = 'offline',
}

export enum ChainScannerEnum {
  erc = 'etherscan',
  bsc = 'bscscan',
  optimism = 'optiscan',
  arbitrum = 'arbiscan',
  polygon = 'polygonscan',
  offline = 'offline',
}

export enum ChainScannerLinksEnum {
  erc = 'https://etherscan.io',
  bsc = 'https://bscscan.com',
  optimism = 'https://optimistic.etherscan.io',
  arbitrum = 'https://arbiscan.io',
  polygon = 'https://polygonscan.com',
  offline = 'offline',
}

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

export enum ContractsEnum {
  // Main Contracts
  X7R = '0x70008f18fc58928dce982b0a69c2c21ff80dca54',
  X7DAO = '0x7105e64bf67eca3ae9b123f0e5ca2b83b2ef2da0',
  X7D = '0x7D000a1B9439740692F8942A296E1810955F5000',
  X7101 = '0x7101a9392eac53b01e7c07ca3baca945a56ee105',
  X7102 = '0x7102dc82ef61bfb0410b1b1bf8ea74575bf0a105',
  X7103 = '0x7103ebdbf1f89be2d53eff9b3cf996c9e775c105',
  X7104 = '0x7104d1f179cc9cc7fb5c79be6da846e3fbc4c105',
  X7105 = '0x7105faa4a26ed1c67b8b2b41bec98f06ee21d105',

  // Liquidity Hubs
  X7R_LiquidityHub = '0x712e87520f35a0a17a49bcca4d87c201f0a46ebb',
  X7DAO_LiquidityHub = '0x7da0e45ce7fd8359544be00a6618215770851ebb',
  X7100_LiquidityHub = '0x7102407afa5d6581aab694feb03feb0e7cf69ebb',

  // Discount Authorities
  X7R_DiscountAuthority = '0x712bC6ddcd97A776B2482531058C629456B93eda',
  X7DAO_DiscountAuthority = '0x7da05D75f51056f3B83b43F397668Cf6A5051cDa',
  X7100_DiscountAuthority = '0x7100AAcC6047281b105201cb9e0DEcF9Ae5431DA',

  // Splitter Contracts
  TreasurySplitter = '0x70006B785AA87821331a974C3d5af81CdE5BB999',
  EcosystemSplitter = '0x70001BA1BA4d85739E7B6A7C646B8aba5ed6c888',

  // Misc Contracts
  TokenTimeLock = '0x7000f4cddca46fb77196466c3833be4e89ab810c',
  X7100_TokenBurner = '0x70008F0B06060A31515733DB6dCB515c64f3DeAd',
  X7_LendingPool = '0x740015c39da5d148fca25a467399d00bce10c001',

  // NFT Contracts
  EcosystemMaxi = '0x7000cae2c1016e7de45ec9b54f1835b966bca4f7',
  LiquidityMaxi = '0x7000f8270b955377e047da8202ae3c408186b4f7',
  DexMaxi = '0x7000b3B5e4e126610A7b7d1Af2D2DE8685c7C4f7',
  BorrowingMaxi = '0x7000D5d7707Bf86b317deC635e459E47b9aBD4F7',
  Magister = '0x7dA0bb55E4097FC2d78a1822105057F36C5F360d',
}

export const MigrationContract = '0x710515Bf543fDb6834144F9269BBf0D1d32B1702';

// V1 deprecated
export const X7DAO = '0x7105aa393b9cf9b2497b460837313ea3dba67da0';
export const X7m105 = '0x06d5ca7c9accd15a87d4993a421b7e702bdbab20';
export const X7 = '0x33dad834eca1290a330c4c4634bc3b64a0197120';
export const X7001 = '0x7001629b8bf9a5d5f204b6d464a06f506fbfa105';
export const X7002 = '0x70021e5eda64e68f035356ea3dce14ef87b6f105';
export const X7003 = '0x70036ddf2f2850f6d1b9d78d652776a0d1cab105';
export const X7004 = '0x70041db5acdf2f8aa648a000fa4a87067abae105';
export const X7005 = '0x7005d9011f4275747d5cb38bc3deb0c46edbd105';
export const V1Tokens = [X7DAO, X7m105, X7, X7001, X7002, X7003, X7004, X7005];
export const V1TokensObjects = {
  x7DAO: { address: X7DAO, tokenName: 'X7DAO' },
  X7M105: { address: X7m105, tokenName: 'X7M105' },
  X7: { address: X7, tokenName: 'X7' },
  X7001: { address: X7001, tokenName: 'X7001' },
  X7002: { address: X7002, tokenName: 'X7002' },
  X7003: { address: X7003, tokenName: 'X7003' },
  X7004: { address: X7004, tokenName: 'X7004' },
  X7005: { address: X7005, tokenName: 'X7005' },
};
