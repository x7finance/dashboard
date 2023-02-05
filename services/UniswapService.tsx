import axios from 'axios';

// import gql from 'graphql-tag';

// import { ApolloClient, InMemoryCache } from '@apollo/client';
// export const client = new ApolloClient({
//   uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
//   cache: new InMemoryCache(),
// });

// export const X7_ECOSYSTEM_PRICE_QUERY = gql`
// {
//   tokens(
//     where:{
//       id_in:[
//         "${Addresses.X7DAOv2}",
//         "${Addresses.X7R}",
//         "${Addresses.X7101}",
//         "${Addresses.X7102}",
//         "${Addresses.X7103}",
//         "${Addresses.X7104}",
//         "${Addresses.X7105}",
//       ]
//     }
//   )
//   {
//     id,
//     symbol,
//     name,
//     decimals,
//     txCount,
//     derivedETH
//   }
// }`;

export function getEthPrice(callback: Function) {
  axios
    .get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    )
    .then((response) => {
      const json = JSON.parse(JSON.stringify(response.data));
      callback(json.ethereum.usd);
    })
    .catch((err) => {
      console.error(err);
    });
}
