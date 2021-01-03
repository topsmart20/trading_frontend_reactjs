import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { openModal } from '../../../Redux/Actions/modalActions';
import { fetchTrades } from '../../../Redux/Actions/tradeActions';
import { selectStrategy } from '../../../Redux/Reducers/strategy';

import TradeList from '../TradeList';
import Loading from '../../Shared/Loading';

const Strategy = () => {
  const { strategyId } = useParams();
  const { isLoading } = useSelector(state => state.control);
  const { token } = useSelector(state => state.auth);
  const strategy =
    useSelector(state => selectStrategy(state, strategyId)) || {};
  const { trades } = useSelector(state => state.trade);
  const { strategy_name, description } = strategy;

  const dispatch = useDispatch();

  const openDeleteModal = () => {
    dispatch(openModal('deleteStrategy', { strategy, token }));
  };

  const openEditModal = () => {
    dispatch(openModal('editStrategy', { strategy, token }));
  };

  useEffect(() => {
    const fetchTradesByStrategy = async (token, strategy) => {
      try {
        const response = await dispatch(
          fetchTrades({
            url: `${process.env.REACT_APP_API}/api/trades/strategy/${strategy.strategy_id}`,
            auth: { Authorization: `Bearer ${token}` },
          }),
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    fetchTradesByStrategy(token, strategy);
  }, [token, strategy, dispatch, fetchTrades]);

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1>{strategy_name}</h1>
            <p>{description}</p>
            <div>
              <button onClick={openEditModal}>Edit Strategy</button>
              <button onClick={openDeleteModal}>Delete Strategy</button>
            </div>
          </div>
          <TradeList trades={trades}/>
        </div>
      )}
    </React.Fragment>
  );
};

export default Strategy;
