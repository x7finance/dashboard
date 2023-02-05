import { generateNativeQueryCommands } from '../../lib/utils/chainFormatters';
import CoinGecko from 'coingecko-api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const CoinGeckoClient = new CoinGecko();

  try {
    if (!req?.query?.chainId) {
      return res.status(400).send({ ok: false, message: 'Missing Chain Id' });
    }

    const { nativeCurrency } = generateNativeQueryCommands(
      parseInt(req?.query?.chainId as any)
    );

    const { data } = await CoinGeckoClient.simple.price({
      ids: [nativeCurrency],
      vs_currencies: ['usd'],
    });

    res.status(200).json({
      price: data[`${nativeCurrency}`]['usd'],
    });

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};
