import { React, ReactSubApp, AppContext } from "@xarc/react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import custom from "../styles/bootstrap.css";

const DealItem = props => {
  const { item } = props;
  const panelClass = custom[`panel panel-${item.type || "primary"}`];
  return (
    <div className={custom["col-sm-4"]}>
      <div className={panelClass}>
        <div className={custom["panel-heading"]}>{item.heading}</div>
        <div className={custom["panel-body"]}>
          <img
            src={item.imageUrl}
            className={custom["img-responsive"]}
            style={{ width: "100%" }}
            alt="Image"
          />
        </div>
        <div className={custom["panel-footer"]}>{item.footer}</div>
      </div>
    </div>
  );
};

const DealRow = props => {
  const { items, index } = props;
  const elements = [];
  for (let i = 0; i < 3 && index + i < items.length; i++) {
    elements.push(<DealItem key={i} item={items[index + i]} />);
  }
  return <div className={custom.row}>{elements}</div>;
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

const Products = props => {
  const { items, value, dispatch } = props;
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push(<DealRow key={i} items={items} index={i} />);
  }

  return (
    <div className={custom.container}>
      <p>Products</p>
      <div>
        Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        &nbsp;{value}&nbsp;
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      </div>
      {rows}
    </div>
  );
};

Products.propTypes = {
  items: PropTypes.array,
  value: PropTypes.number
};

const mapStateToProps = state => {
  return { items: state.items, value: state.number.value };
};

const ReduxProducts = connect(mapStateToProps, dispatch => ({ dispatch }))(Products);

export { ReduxProducts as Products };
