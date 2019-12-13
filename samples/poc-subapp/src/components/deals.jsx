import React from "react";
import { dynamicLoadSubApp } from "subapp-web";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const DealSubApp = props => {
  const { id } = props;

  dynamicLoadSubApp({ name: "Deal", id });

  return (
    <div className="col-sm-4">
      <div className="panel panel-primary">
        <div className="panel-body">
          <div id={id} />
        </div>
      </div>
    </div>
  );
};

const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

const Deals = props => {
  const { value, dispatch } = props;

  return (
    <div>
      <div>
        Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        &nbsp;{value}&nbsp;
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      </div>

      <div>
        <DealSubApp {...props} id="deal_1" />
        <DealSubApp {...props} id="deal_2" />
        <DealSubApp {...props} id="deal_3" />
      </div>
    </div>
  );
};

Deals.propTypes = {
  value: PropTypes.number
};

const mapStateToProps = state => {
  return { value: state.number.value };
};

const ReduxDeals = connect(mapStateToProps, dispatch => ({ dispatch }))(Deals);

export { ReduxDeals as Deals };
