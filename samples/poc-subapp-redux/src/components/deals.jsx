import { React, dynamicLoadSubApp, xarc } from "subapp-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SubApp extends React.Component {
  constructor() {
    super();
    this.state = { ready: false };
  }

  render() {
    // is subapp loaded?
    // TODO: handle SSR
    if (typeof window === "undefined") {
      return "";
    }
    const { name, ...rest } = this.props;

    const subapp = xarc.getSubApp(name);
    if (xarc.getBundle(name) && subapp) {
      return (
        <div className="col-sm-4">
          <div className="panel panel-primary">
            <div className="panel-body">{subapp.start(null, { props: rest })}</div>
          </div>
        </div>
      );
    } else {
      const onLoad = () => this.setState({ ready: true });
      dynamicLoadSubApp({
        name: "Deal",
        onLoad,
        props: rest
      });

      // if not, return loadingComponent
      return "";
    }
  }
}

const DealSubApp = props => {
  const { id, ...rest } = props;

  dynamicLoadSubApp({ name: "Deal", id, props: rest });

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
      <div>
        <SubApp name="Deal" deal="hello" />
      </div>
    </div>
  );
};

Deals.propTypes = {
  value: PropTypes.number
};

const mapStateToProps = state => {
  return { value: state.number };
};

const ReduxDeals = connect(mapStateToProps, dispatch => ({ dispatch }))(Deals);

export { ReduxDeals as Deals };
