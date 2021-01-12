import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../Redux/Actions/modalActions';

import { fetchAccountStats } from '../../Redux/Actions/accountActions';
import AccountCardList from './AccountCardList';
import LoadingGroup from '../Shared/LoadingGroup';

const Accounts = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);
  const { accounts } = useSelector(state => state.account);
  const openNewAccountModal = () => {
    dispatch(openModal('newAccount', {}));
  };

  useEffect(() => {
    const loadAccountStats = async token => {
      try {
        const response = await dispatch(
          fetchAccountStats({
            url: `${process.env.REACT_APP_API}/api/account/stats`,
            auth: { Authorization: `Bearer ${token}` },
          }),
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    loadAccountStats(token);
  }, [dispatch, token]);

  return (
    <LoadingGroup>
      <div className='accounts'>
        <div className='accounts__header'>
          <h2 className='accounts__title'>Welcome, {user.userName}!</h2>
          {accounts.length > 0 && (
            <p className='accounts__paragraph'>
              Manage your trading accounts to keep track of your gains, losses,
              and over-all trade statistics. Click on cards to see your trades
              and stragegies!
            </p>
          )}
          <div className='accounts__button-container'>
            <button className='btn btn--primary' onClick={openNewAccountModal}>
              Create Account
            </button>
          </div>
        </div>
        <AccountCardList accounts={accounts} user={user} />
      </div>
    </LoadingGroup>
  );
};

export default Accounts;
