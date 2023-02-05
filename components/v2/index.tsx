import * as Addresses from '../../lib/EthereumAddresses';

function ResourcesComponentTableRow({
  name,
  contract,
  description,
  path,
}: any) {
  return (
    <div>
      <div>
        <b>{name}</b>
      </div>
      <div style={{ wordBreak: 'break-word' }}>{description}</div>
      <div style={{ wordBreak: 'break-word', maxWidth: '15em' }}>
        {contract}
      </div>
      <div>
        <button
          onClick={() => {
            window.open(path);
          }}
        >
          name
        </button>
      </div>
    </div>
  );
}

export function V2Resources() {
  return (
    <>
      <ResourcesComponentTableRow
        name="X7DAO"
        contract={Addresses.X7DAOv2}
        description="V2 Governance token"
        path={`https://etherscan.io/token/${Addresses.X7DAOv2}`}
      />
      <ResourcesComponentTableRow
        name="X7R"
        contract={Addresses.X7R}
        description="Merged Reward token"
        path={`https://etherscan.io/token/${Addresses.X7R}`}
      />
      {/* <ResourcesComponentTableRow name="X7D" contract={Addresses.X7D} description="Pegged token" path={`https://etherscan.io/token/${Addresses.X7D}`} /> */}
      <ResourcesComponentTableRow
        name="X7101"
        contract={Addresses.X7101}
        description="V2 First of price consistent collection"
        path={`https://etherscan.io/token/${Addresses.X7101}`}
      />
      <ResourcesComponentTableRow
        name="X7102"
        contract={Addresses.X7102}
        description="V2 Second of price consistent collection"
        path={`https://etherscan.io/token/${Addresses.X7102}`}
      />
      <ResourcesComponentTableRow
        name="X7103"
        contract={Addresses.X7103}
        description="V2 Third of price consistent collection"
        path={`https://etherscan.io/token/${Addresses.X7103}`}
      />
      <ResourcesComponentTableRow
        name="X7104"
        contract={Addresses.X7104}
        description="V2 Fourth of price consistent collection"
        path={`https://etherscan.io/token/${Addresses.X7104}`}
      />
      <ResourcesComponentTableRow
        name="X7105"
        contract={Addresses.X7105}
        description="V2 Fifth of price consistent collection"
        path={`https://etherscan.io/token/${Addresses.X7105}`}
      />
      <ResourcesComponentTableRow
        name="X7R"
        contract={Addresses.LiquidityHub_X7R}
        description="Liquidity hub for X7R - reward token"
        path={`https://etherscan.io/address/${Addresses.LiquidityHub_X7R}`}
      />
      <ResourcesComponentTableRow
        name="X7DAO"
        contract={Addresses.LiquidityHub_X7DAOv2}
        description="Liquidity hub for X7DAO - governance token"
        path={`https://etherscan.io/address/${Addresses.LiquidityHub_X7DAOv2}`}
      />
      <ResourcesComponentTableRow
        name="X7100"
        contract={Addresses.LiquidityHub_X7100}
        description="Liquidity hub for X7100 constellation tokens"
        path={`https://etherscan.io/address/${Addresses.LiquidityHub_X7100}`}
      />
      <ResourcesComponentTableRow
        name="X7R"
        contract={Addresses.Discount_X7R}
        description="Smart contract for X7R fee discounts"
        path={`https://etherscan.io/address/${Addresses.Discount_X7R}`}
      />
      <ResourcesComponentTableRow
        name="X7DAO"
        contract={Addresses.Discount_X7DAOv2}
        description="Smart contract for X7DAO fee discounts"
        path={`https://etherscan.io/address/${Addresses.Discount_X7DAOv2}`}
      />
      <ResourcesComponentTableRow
        name="X7100"
        contract={Addresses.Discount_X7100}
        description="Smart contract for X7100 series token fee discounts"
        path={`https://etherscan.io/address/${Addresses.Discount_X7100}`}
      />
      <ResourcesComponentTableRow
        name="X7V1toV2Migration"
        contract={Addresses.MigrationContract}
        description="Smart Contract for orchestrating the X7 Finance V1 to V2 Migration"
        path={`https://etherscan.io/address/${Addresses.MigrationContract}`}
      />
      <ResourcesComponentTableRow
        name="X7TokenBurner"
        contract={Addresses.TokenBurner_X7100}
        description="Smart contract for burning tokens"
        path={`https://etherscan.io/address/${Addresses.TokenBurner_X7100}`}
      />
      <ResourcesComponentTableRow
        name="X7TokenTimeLock"
        contract={Addresses.TokenTimeLock_X7}
        description="ERC-20 Token Time Lock"
        path={`https://etherscan.io/address/${Addresses.TokenTimeLock_X7}`}
      />
      <ResourcesComponentTableRow
        name="X7EcosystemSplitter"
        contract={Addresses.EcoSystemSplitter}
        description="Smart contract for balancing revenue across all revenue streams in the X7 system"
        path={`https://etherscan.io/address/${Addresses.EcoSystemSplitter}`}
      />
      <ResourcesComponentTableRow
        name="X7TreasurySplitter"
        contract={Addresses.TreasurySplitter}
        description="Smart contract representing the treasury"
        path={`https://etherscan.io/address/${Addresses.TreasurySplitter}`}
      />
    </>
  );
}
