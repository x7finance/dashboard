import { RequestArguments } from '@metamask/providers/dist/BaseProvider';
import { decimals } from '../ABIs';
import * as Addresses from '../EthereumAddresses'

interface WatchListInterface extends RequestArguments {
    method: string,
    params: {
        type: string,
        options: {
            address: string,
            symbol: string,
            decimals: number,
            image?: string
        }
    }
}

class MetaMaskService {
    actionRejectedErrorNotification: Function = () => { console.error('Not yet initialized') };
    actionSuccessNotification: Function = () => {
        console.error('Not yet initialized');
    }

    setActionRejectedErrorNotification(userRejectedActionErrorNotification: Function, userSuccessfullyAddedATokenNotification: Function) {
        this.actionRejectedErrorNotification = userRejectedActionErrorNotification;
        this.actionSuccessNotification = userSuccessfullyAddedATokenNotification;
    }

    connectToMetaMask(callback: Function) {
        if (window.ethereum?.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(res => {
                    callback((res as Array<string>)[0]);
                })
        }
        else {
            alert("You need metamask for this");
        }
    }

    getAlreadyConnectedAccounts(callback: Function) {
        window.ethereum?.request({ method: 'eth_accounts' })
            .then((data) => {
                callback((data as Array<string>)[0])
            })
            .catch(console.error);
    }

    addATokenToWatchList(address: string, symbol: string, decimals: number, imageUrl: string = '') {
        const requestData: WatchListInterface = {
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: address,
                    symbol: symbol,
                    decimals: decimals,
                },
            }
        };

        if (imageUrl !== '')
            requestData.params.options.image = imageUrl;

        window.ethereum?.request(requestData)
            .then((success: any) => {
                if (success) {
                    this.actionSuccessNotification('Token(s) have been successfully added to your MetaMask account!');
                }
                else
                    console.log('Couldn\'t add it MetMask, Please contact @WoxieX on Telegram if you found this problem!');
            })
            .catch((error: any) => {
                if (error.code === 4001) {
                    this.actionRejectedErrorNotification("Action did not succeed, because you rejected the action.");
                }
                else {
                    console.error(error);
                }
            });
    }

    addX7M105ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7m105, 'X7M105', decimals);
    }
    addX7ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7, 'X7', decimals);
    }
    addX7DAOToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7DAO, 'X7DAO', decimals);
    }
    addX7001ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7001, 'X7001', decimals);
    }
    addX7002ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7002, 'X7002', decimals);
    }
    addX7003ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7003, 'X7003', decimals);
    }
    addX7004ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7004, 'X7004', decimals);
    }
    addX7005ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7005, 'X7005', decimals);
    }
    addX7RToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7R, 'X7R', decimals);
    }
    addX7DAOv2ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7DAOv2, 'X7DAO', decimals);
    }
    addX7DToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7D, 'X7D', decimals);
    }
    addX7101ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7101, 'X7101', decimals);
    }
    addX7102ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7102, 'X7102', decimals);
    }
    addX7103ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7103, 'X7103', decimals);
    }
    addX7104ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7104, 'X7104', decimals);
    }
    addX7105ToWatchList = () => {
        this.addATokenToWatchList(Addresses.X7105, 'X7105', decimals);
    }

    warnUserToInstallMetaMask() {
        this.actionRejectedErrorNotification("You need to install MetaMask to use this.")
    }
    warnUserToConnectMetaMask() {
        this.actionRejectedErrorNotification("You need to connect MetaMask to use this.")
    }
}

const instance = new MetaMaskService();
Object.seal(instance);
export default instance;