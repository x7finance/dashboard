import * as Addresses from './EthereumAddresses';

interface TokenBalanceData {
  balance: number;
}

export interface TokenBalanceV1 {
  x7dao: TokenBalanceData;
  x7m105: TokenBalanceData;
  x7: TokenBalanceData;
  x7001: TokenBalanceData;
  x7002: TokenBalanceData;
  x7003: TokenBalanceData;
  x7004: TokenBalanceData;
  x7005: TokenBalanceData;
}

export interface TokenBalanceV2 {
  x7dao: TokenBalanceData;
  x7r: TokenBalanceData;
  // x7d?: TokenBalanceData,
  x7101: TokenBalanceData;
  x7102: TokenBalanceData;
  x7103: TokenBalanceData;
  x7104: TokenBalanceData;
  x7105: TokenBalanceData;
}

interface AlreadyMigratedArrayData {
  address: string;
  value: number;
}

interface AlreadyMigratedTokensData {
  contract: string;
  alreadyMigrated: Array<AlreadyMigratedArrayData>;
}

export interface AlreadyMigratedTokens {
  x7m105: AlreadyMigratedTokensData;
  x7: AlreadyMigratedTokensData;
  x7dao: AlreadyMigratedTokensData;
  x7001: AlreadyMigratedTokensData;
  x7002: AlreadyMigratedTokensData;
  x7003: AlreadyMigratedTokensData;
  x7004: AlreadyMigratedTokensData;
  x7005: AlreadyMigratedTokensData;
}

export interface MigratedTokensData {
  amount: number;
  percentage: number;
  formattedAmount: number;
}

export interface MigratedTokens {
  x7m105: MigratedTokensData;
  x7: MigratedTokensData;
  x7daoV1: MigratedTokensData;
  x7001: MigratedTokensData;
  x7002: MigratedTokensData;
  x7003: MigratedTokensData;
  x7004: MigratedTokensData;
  x7005: MigratedTokensData;
}

export const initialStatus = {
  x7r: { balance: 0, address: Addresses.X7R },
  x7dao: { balance: 0, address: Addresses.X7DAOv2 },
  x7101: { balance: 0, address: Addresses.X7101 },
  x7102: { balance: 0, address: Addresses.X7102 },
  x7103: { balance: 0, address: Addresses.X7103 },
  x7104: { balance: 0, address: Addresses.X7104 },
  x7105: { balance: 0, address: Addresses.X7105 },
};

export const initialUserMigratedTokens = {
  x7m105: { amount: 0, percentage: 0, formattedAmount: 0, status: false },
  x7: { amount: 0, percentage: 0, formattedAmount: 0, status: false },
  x7dao: { amount: 0, percentage: 0, formattedAmount: 0, status: false },
  x7001: { amount: 0, percentage: 0, formattedAmount: 0, status: false },
  x7002: { amount: 0, percentage: 0, formattedAmount: 0, status: false },
  x7003: { amount: 0, percentage: 0, formattedAmount: 0, status: false },
  x7004: { amount: 0, percentage: 0, formattedAmount: 0, status: false },
  x7005: { amount: 0, percentage: 0, formattedAmount: 0, status: false },
};

export const initialMigratedTokens = {
  x7m105: { amount: 0, percentage: 0, formattedAmount: 0 },
  x7: { amount: 0, percentage: 0, formattedAmount: 0 },
  x7daoV1: { amount: 0, percentage: 0, formattedAmount: 0 },
  x7001: { amount: 0, percentage: 0, formattedAmount: 0 },
  x7002: { amount: 0, percentage: 0, formattedAmount: 0 },
  x7003: { amount: 0, percentage: 0, formattedAmount: 0 },
  x7004: { amount: 0, percentage: 0, formattedAmount: 0 },
  x7005: { amount: 0, percentage: 0, formattedAmount: 0 },
};

export const initialAlreadyMigratedTokens = {
  x7m105: {
    contract: Addresses.X7m105,
    alreadyMigrated: [
      {
        address: '0x000000000000000000000000000000000000dead',
        value: 0,
      },
      {
        address: '0x8bb2361bbb59c5956af2e4dee2b58dd202c606c1',
        value: 0,
      },
    ],
  },
  x7: {
    contract: Addresses.X7,
    alreadyMigrated: [
      {
        address: '0x5b15a4a040e7a6f24f14898eac6efefbe807ec01',
        value: 0,
      },
    ],
  },
  x7dao: {
    contract: Addresses.X7DAO,
    alreadyMigrated: [
      {
        address: '0x3238d3d9a1d21f1786cb1c732382e0c8658a7ad0',
        value: 0,
      },
    ],
  },
  x7001: {
    contract: Addresses.X7001,
    alreadyMigrated: [
      {
        address: '0x4e3da394d5f4e8c161fe91a236563caeec2b093d',
        value: 0,
      },
      {
        address: '0x0755b4690912e154ab6e70bf511970311941af81',
        value: 0,
      },
      {
        address: '0xfcba812cd7a18a4a73b282a835a672cca5c294c0',
        value: 0,
      },
      {
        address: '0xb1ee2974def469a62ecce25ea9323ec3330b339e',
        value: 0,
      },
      {
        address: '0x0367ee0eee4f36241af8c22c53253cbe6e92637a',
        value: 0,
      },
    ],
  },
  x7002: {
    contract: Addresses.X7002,
    alreadyMigrated: [
      {
        address: '0x4e3da394d5f4e8c161fe91a236563caeec2b093d',
        value: 0,
      },
      {
        address: '0xa0f6ea8e8df140146e0595f90e8c0d32823c9435',
        value: 0,
      },
      {
        address: '0x4005cb4fc7cc01de8675c6703dd1ec2e2174f4b1',
        value: 0,
      },
      {
        address: '0xfe55eb5239e3f956e40586917143e541028f6f06',
        value: 0,
      },
      {
        address: '0x4073597b2bad443d94247ae9dd6011f43088fee1',
        value: 0,
      },
    ],
  },
  x7003: {
    contract: Addresses.X7003,
    alreadyMigrated: [
      {
        address: '0x0755b4690912e154ab6e70bf511970311941af81',
        value: 0,
      },
      {
        address: '0x4005cb4fc7cc01de8675c6703dd1ec2e2174f4b1',
        value: 0,
      },
      {
        address: '0xae3069c6cfbee71bca61696c87681a4c2df131c8',
        value: 0,
      },
      {
        address: '0x26331f4c80f84068529d13d5cb64e38f0158c30a',
        value: 0,
      },
      {
        address: '0x6537a62e884c55894ae6d93dfc9b428730a0580a',
        value: 0,
      },
    ],
  },
  x7004: {
    contract: Addresses.X7004,
    alreadyMigrated: [
      {
        address: '0xfcba812cd7a18a4a73b282a835a672cca5c294c0',
        value: 0,
      },
      {
        address: '0xfe55eb5239e3f956e40586917143e541028f6f06',
        value: 0,
      },
      {
        address: '0xed7a3910d42c069c32add88f83f608f39ecbcd98',
        value: 0,
      },
      {
        address: '0x26331f4c80f84068529d13d5cb64e38f0158c30a',
        value: 0,
      },
      {
        address: '0x8ef34625aec17541b6147a40a3840c918263655e',
        value: 0,
      },
    ],
  },
  x7005: {
    contract: Addresses.X7005,
    alreadyMigrated: [
      {
        address: '0xb1ee2974def469a62ecce25ea9323ec3330b339e',
        value: 0,
      },
      {
        address: '0xa0f6ea8e8df140146e0595f90e8c0d32823c9435',
        value: 0,
      },
      {
        address: '0xed7a3910d42c069c32add88f83f608f39ecbcd98',
        value: 0,
      },
      {
        address: '0xae3069c6cfbee71bca61696c87681a4c2df131c8',
        value: 0,
      },
      {
        address: '0xac0a75c270809b7af6cf02277a17c17e27074577',
        value: 0,
      },
    ],
  },
};
