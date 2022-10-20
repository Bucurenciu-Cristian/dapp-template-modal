import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account/useGetAccountInfo';
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import useGetNetworkConfig from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query
} from '@elrondnetwork/erdjs';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { contractAddress } from 'config';
import {
  contextualArray,
  contextualRouteNames,
  routeNames
} from '../../../routes';

const Actions = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const [secondsLeft, setSecondsLeft] = React.useState<number>();
  const [hasPing, setHasPing] = React.useState<boolean>();
  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);
  const [openFirst, setOpenFirst] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  const mount = () => {
    if (secondsLeft) {
      const interval = setInterval(() => {
        setSecondsLeft((existing) => {
          if (existing) {
            return existing - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(mount, [hasPing]);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractAddress),
      func: new ContractFunction('getTimeToPong'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setHasPing(true);
            break;
          case '':
            setSecondsLeft(0);
            setHasPing(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setSecondsLeft(parseInt(decoded, 16));
            setHasPing(false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  const sendPingTransaction = async () => {
    const pingTransaction = {
      value: '1000000000000000000',
      data: 'ping',
      receiver: contractAddress,
      gasLimit: '60000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendPongTransaction = async () => {
    const pongTransaction = {
      value: '0',
      data: 'pong',
      receiver: contractAddress
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pongTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const pongAllowed = secondsLeft === 0 && !hasPendingTransactions;
  const notAllowedClass = pongAllowed ? '' : 'not-allowed disabled';

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft || 0)
    .format('mm:ss');
  const location = useLocation();
  return (
    <div className='d-flex mt-4 justify-content-center'>
      {hasPing !== undefined && (
        <>
          {hasPing && !hasPendingTransactions ? (
            <div>
              <div className='action-btn' onClick={sendPingTransaction}>
                <button className='btn'>
                  <FontAwesomeIcon icon={faArrowUp} className='text-primary' />
                </button>
                <a href='/' className='text-white text-decoration-none'>
                  Ping
                </a>
              </div>
              <div className='action-btn'>
                <Link
                  to={contextualRouteNames.modalActivation}
                  state={{ background: location }}
                  className='btn btn-secondary mt-3 text-white'
                  data-testid='modalBtn'
                >
                  Modal Route
                </Link>
              </div>
              <div className=''>
                <Button
                  onClick={() => setOpenFirst(true)}
                  className='btn btn-secondary mt-3 text-white'
                  data-testid='modalBtn'
                >
                  Modal Normal
                </Button>
                <Modal
                  show={openFirst}
                  aria-labelledby='modal-1-label'
                  onHide={() => setOpenFirst(false)}
                  renderBackdrop={(props: any) => (
                    <div
                      {...props}
                      className='fixed inset-0 bg-black/30 z-[300]'
                    />
                  )}
                  centered
                  className='fixed z-[301] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 shadow-lg p-5'
                >
                  <div>
                    <Modal.Header>
                      <h4 id='modal-1-label'>Alert!</h4>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Some important content!</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={() => setOpenFirst(false)}
                        className='float-right'
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </div>
                </Modal>
              </div>
            </div>
          ) : (
            <>
              <div className='d-flex flex-column'>
                <div
                  {...{
                    className: `action-btn ${notAllowedClass}`,
                    ...(pongAllowed ? { onClick: sendPongTransaction } : {})
                  }}
                >
                  <button className={`btn ${notAllowedClass}`}>
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      className='text-primary'
                    />
                  </button>
                  <span className='text-white'>
                    {pongAllowed ? (
                      <a href='/' className='text-white text-decoration-none'>
                        Pong
                      </a>
                    ) : (
                      <>Pong</>
                    )}
                  </span>
                </div>
                {!pongAllowed && !hasPendingTransactions && (
                  <span className='opacity-6 text-white'>
                    {timeRemaining} until able to Pong
                  </span>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Actions;
