import { ContractsEnum } from '../lib/types';

const decimals = 18;
interface WatchListInterface {
  method: string;
  params: {
    type: string;
    options: {
      address: string;
      symbol: string;
      decimals: number;
      image?: string;
    };
  };
}

class MetaMaskService {
  actionRejectedErrorNotification: Function = () => {
    console.error('Not yet initialized');
  };
  actionSuccessNotification: Function = () => {
    console.error('Not yet initialized');
  };

  setActionRejectedErrorNotification(
    userRejectedActionErrorNotification: Function,
    userSuccessfullyAddedATokenNotification: Function
  ) {
    this.actionRejectedErrorNotification = userRejectedActionErrorNotification;
    this.actionSuccessNotification = userSuccessfullyAddedATokenNotification;
  }

  connectToMetaMask(callback: Function) {
    if (window.ethereum?.isMetaMask) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
        callback((res as Array<string>)[0]);
      });
    } else {
      alert('You need metamask for this');
    }
  }

  getAlreadyConnectedAccounts(callback: Function) {
    window.ethereum
      ?.request({ method: 'eth_accounts' })
      .then((data) => {
        callback((data as Array<string>)[0]);
      })
      .catch(console.error);
  }

  addATokenToWatchList(
    address: string,
    symbol: string,
    decimals: number,
    imageUrl: string = ''
  ) {
    const requestData: WatchListInterface = {
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: address,
          symbol: symbol,
          decimals: decimals,
        },
      },
    };

    if (imageUrl !== '') requestData.params.options.image = imageUrl;

    // @ts-expect-error
    window.ethereum
      // @ts-expect-error
      ?.request(requestData)
      .then((success: any) => {
        if (success) {
          this.actionSuccessNotification(
            'Token(s) have been successfully added to your MetaMask account!'
          );
        } else console.error("Couldn't add token(s) to your MetaMask account.");
      })
      .catch((error: any) => {
        if (error.code === 4001) {
          this.actionRejectedErrorNotification(
            'Action did not succeed, because you rejected the action.'
          );
        } else {
          console.error(error);
        }
      });
  }

  addX7RToWatchList = () => {
    this.addATokenToWatchList(ContractsEnum.X7R, 'X7R', decimals);
  };
  addX7DAOv2ToWatchList = () => {
    this.addATokenToWatchList(ContractsEnum.X7DAO, 'X7DAO', decimals);
  };
  addX7DToWatchList = () => {
    this.addATokenToWatchList(ContractsEnum.X7D, 'X7D', decimals);
  };
  addX7101ToWatchList = () => {
    this.addATokenToWatchList(ContractsEnum.X7101, 'X7101', decimals);
  };
  addX7102ToWatchList = () => {
    this.addATokenToWatchList(ContractsEnum.X7102, 'X7102', decimals);
  };
  addX7103ToWatchList = () => {
    this.addATokenToWatchList(ContractsEnum.X7103, 'X7103', decimals);
  };
  addX7104ToWatchList = () => {
    this.addATokenToWatchList(ContractsEnum.X7104, 'X7104', decimals);
  };
  addX7105ToWatchList = () => {
    this.addATokenToWatchList(ContractsEnum.X7105, 'X7105', decimals);
  };

  warnUserToInstallMetaMask() {
    this.actionRejectedErrorNotification(
      'You need to install MetaMask to use this.'
    );
  }
  warnUserToConnectMetaMask() {
    this.actionRejectedErrorNotification(
      'You need to connect MetaMask to use this.'
    );
  }
}

const instance = new MetaMaskService();
Object.seal(instance);
export default instance;
