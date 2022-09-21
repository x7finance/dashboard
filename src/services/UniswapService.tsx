import { ApolloClient, InMemoryCache } from '@apollo/client'
import axios from 'axios'

export const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    cache: new InMemoryCache(),
})


export function getEthPrice(callback: Function) {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then((response) => {
        const json = JSON.parse(JSON.stringify(response.data));
        callback(json.ethereum.usd);
    }).catch((err) => {
        console.error(err);
    })
}
class UniswapService {



}

const instance = new UniswapService();
Object.seal(instance);
export default instance;