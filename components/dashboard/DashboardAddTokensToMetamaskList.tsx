import MetaMaskService from '../../services/MetaMaskService';

interface DashboardAddTokensToMetamaskListProps {
  tokenData: TokenListDataV1 | TokenListDataV2;
  setTokenListData: Function;
  title: string;
}

export interface TokenListDataV1 {
  X7M105: TokenData;
  X7: TokenData;
  X7DAO: TokenData;
  X7001: TokenData;
  X7002: TokenData;
  X7003: TokenData;
  X7004: TokenData;
  X7005: TokenData;
}
export interface TokenListDataV2 {
  X7R: TokenData;
  X7DAO: TokenData;
  X7D: TokenData;
  X7101: TokenData;
  X7102: TokenData;
  X7103: TokenData;
  X7104: TokenData;
  X7105: TokenData;
}

export interface TokenData {
  status: boolean;
  function: Function;
  disabled: boolean;
}

export default function DashboardAddTokensToMetamaskList({
  tokenData,
  setTokenListData,
  title,
}: DashboardAddTokensToMetamaskListProps) {
  const elementSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    var tokens = { ...tokenData };
    Object.entries(tokens).forEach(([key, value]) => {
      if (key === event.target.name) {
        value.status = !value.status;
      }
    });

    setTokenListData(tokens);
  };

  const addSelectedTokensToMetaMask = () => {
    // @ts-ignore
    if (window.ethereum?.isConnected && window.ethereum.isMetaMask) {
      Object.entries(tokenData).forEach(([_, value]) => {
        if (value.status) {
          value.function();
        }
      });
    } else {
      if (!window.ethereum?.isMetaMask) {
        MetaMaskService.warnUserToInstallMetaMask();
        // @ts-ignore
      } else if (!window.ethereum?.isConnected) {
        MetaMaskService.warnUserToConnectMetaMask();
      }
    }
  };

  return (
    <div>
      <h4>{title}</h4>
      <div>
        Select all the X7 tokens you
        <br /> want to add to metamask.
      </div>
      <form>
        {Object.entries(tokenData).map(([key, value]) => {
          return (
            <label key={key}>
              <input
                checked={value.status}
                onChange={elementSelected}
                name={key}
                // icon={<FavoriteBorder />}
                // checkedIcon={<Favorite />}
                color="error"
              />
            </label>
          );
        })}
      </form>
      <button color="inherit" onClick={addSelectedTokensToMetaMask}>
        Add selected to MetaMask
      </button>
    </div>
  );
}
