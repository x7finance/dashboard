import Web3 from 'web3';
import { Contract } from "web3-eth-contract"
import * as Addresses from '../EthereumAddresses';
import * as abis from '../ABIs';


interface UserMigrationStatusResponse {
    status: boolean,
    tokenName: string,
}

export interface BalanceResponse {
    tokenName: string,
    balance: number,
    address: string
}


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

    mappingKeyToContract = {
        x7dao: this.x7dao,
        x7m105: this.x7m105,
        x7: this.x7,
        x7001: this.x7001,
        x7002: this.x7002,
        x7003: this.x7003,
        x7004: this.x7004,
        x7005: this.x7005,
    }
    migrationContract = new this.web3.eth.Contract(abis.MigrationContractABI, Addresses.MigrationContract);

    getBalance = (contract: Contract, address: string, callback: Function, error: Function) => {
        contract.methods.balanceOf(address).call(function (err: any, balance: BigInt) {
            if (err) {
                error();
                console.error(err);
                return;
            }
            callback(balance)
        });
    }

    getBalance2(tokenName: string, address: string, callback: Function, error: Function) {
        Object.entries(this.mappingKeyToContract).forEach(([key, value]) => {
            if (key.toLowerCase() === tokenName.toLowerCase()) {
                value.methods.balanceOf(address).call(function (err: any, balance: BigInt) {
                    if (err) {
                        error();
                        console.error(err);
                        return;
                    }
                    callback(balance)
                });
            }
        });
    }

    async getBalance3(tokenName: string, address: string): Promise<BalanceResponse> {
        const value = this.findCorrectContract(tokenName);
        const balance = await value?.methods.balanceOf(address).call();
        return { tokenName: tokenName, balance: balance, address:address };
    }

    findCorrectContract(tokenName: string): Contract | undefined {
        var contract = undefined;
        Object.entries(this.mappingKeyToContract).find(([key, value]) => {
            if (key === tokenName) {
                contract = value;
                return true;
            }
            return false;
        });
        return contract;
    }


    async getUserMigrationStatus(tokenName: string, tokenAddress: string, address: string): Promise<UserMigrationStatusResponse> {
        const status = await this.migrationContract.methods.isAv1TokenHolder(tokenAddress, address).call();
        return { status: status, tokenName: tokenName };
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
        this.getBalance(this.x7dao, address, callback, error);
    }

    getX7M105Balance(address: string, callback: Function, error: Function) {
        this.getBalance(this.x7m105, address, callback, error);
    }

    getX7Balance(address: string, callback: Function, error: Function) {
        this.getBalance(this.x7, address, callback, error);
    }

    getX7001Balance(address: string, callback: Function, error: Function) {
        this.getBalance(this.x7001, address, callback, error);
    }

    getX7002Balance(address: string, callback: Function, error: Function) {
        this.getBalance(this.x7002, address, callback, error);
    }

    getX7003Balance(address: string, callback: Function, error: Function) {
        this.getBalance(this.x7003, address, callback, error);
    }

    getX7004Balance(address: string, callback: Function, error: Function) {
        this.getBalance(this.x7004, address, callback, error);
    }

    getX7005Balance(address: string, callback: Function, error: Function) {
        this.getBalance(this.x7005, address, callback, error);
    }

    getMigrationStatus(callback: Function, error: Function) {
        this.migrationContract.methods.postMigration().call(function (err: any, status: any) {
            if (err) {
                error();
                console.error(err);
                return;
            }
            callback(status)
        });
    }
}

export default SmartContractService;