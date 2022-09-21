import Web3 from 'web3';
import * as Addresses from '../SmartContractAddresses';
import * as abis from '../ABIs';

class SmartContractService {
    web3: Web3 = new Web3();
    x7dao = new this.web3.eth.Contract(abis.x7daoABI, Addresses.X7DAO);
    x7m105 = new this.web3.eth.Contract(abis.x7m105ABI, Addresses.X7m105);
    x7 = new this.web3.eth.Contract(abis.x7ABI, Addresses.X7);
    x7001 = new this.web3.eth.Contract(abis.x7000ABI, Addresses.X7001);
    x7002 = new this.web3.eth.Contract(abis.x7000ABI, Addresses.X7002);
    x7003 = new this.web3.eth.Contract(abis.x7000ABI, Addresses.X7003);
    x7004 = new this.web3.eth.Contract(abis.x7000ABI, Addresses.X7004);
    x7005 = new this.web3.eth.Contract(abis.x7000ABI, Addresses.X7005);

    handleTheCall = (contract: typeof this.web3.eth.Contract.prototype, address: string, callback: Function, error: Function) => {
        contract.methods.balanceOf(address).call(function (err: any, balance: BigInt) {
            if (err) {
                error();
                console.error(err);
                return;
            }
            callback(balance)
        });
    }

    constructor(nodeUrl: string) {
        this.web3.setProvider(nodeUrl);
    }

    readSelectedNode(): string {
        const selectedNode = localStorage.getItem("selectedNode");

        if (selectedNode) {
            return selectedNode;
        }
        return "https://cloudflare-eth.com";
    }

    switchNode(nodeURL: string) {
        this.web3 = new Web3(nodeURL);
    }

    getX7DAOBalance(address: string, callback: Function, error: Function) {
        this.handleTheCall(this.x7dao, address, callback, error);
    }


    getX7M105Balance(address: string, callback: Function, error: Function) {
        this.handleTheCall(this.x7m105, address, callback, error);

    }

    getX7Balance(address: string, callback: Function, error: Function) {
        this.handleTheCall(this.x7, address, callback, error);

    }

    getX7001Balance(address: string, callback: Function, error: Function) {
        this.handleTheCall(this.x7001, address, callback, error);

    }

    getX7002Balance(address: string, callback: Function, error: Function) {
        this.handleTheCall(this.x7002, address, callback, error);

    }

    getX7003Balance(address: string, callback: Function, error: Function) {
        this.handleTheCall(this.x7003, address, callback, error);

    }

    getX7004Balance(address: string, callback: Function, error: Function) {
        this.handleTheCall(this.x7004, address, callback, error);

    }

    getX7005Balance(address: string, callback: Function, error: Function) {
        this.handleTheCall(this.x7005, address, callback, error);

    }
}

export default SmartContractService;