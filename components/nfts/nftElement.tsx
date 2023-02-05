export interface NFTCardProps {
  name: string;
  contract: string;
  description?: string;
  objective?: string;
  benefits: string[];
  path: string;
  icon: string;
}

export function NftElement(props: NFTCardProps) {
  return (
    <div>
      <div>
        <div>
          <div>
            <video
              autoPlay
              loop
              muted
              width={'100%'}
              style={{
                boxShadow:
                  '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
              }}
            >
              <source src={props.icon} type="video/mp4" />
            </video>
          </div>
          <div>
            <div>{props.objective}</div>
            <div>
              <div>{props.description}</div>
            </div>
            <ul>
              {props.benefits.map((benefit) => {
                return (
                  <li key={benefit.substring(0, 10)}>
                    <div>
                      <span style={{ maxWidth: '100%' }}>
                        <span>{benefit}</span>
                      </span>
                    </div>
                    <div />
                  </li>
                );
              })}
            </ul>

            <div>{props.contract}</div>
          </div>
          <div>
            <button
              color="inherit"
              onClick={() => {
                makeCardClickable(props.path);
              }}
              style={{ padding: 10 }}
            >
              OpenSea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const makeCardClickable = (link: string) => {
  if (link !== '') window.open('https://' + link);
};
