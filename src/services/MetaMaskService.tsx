class MetaMaskService {
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
}


const instance = new MetaMaskService();
Object.seal(instance);
export default instance;