import React from "react";
import { connect } from "react-redux";

const Products = (props) => {
  const { items } = props;
  
    return (
      <div className="container text-center">
        <h2>Products</h2>
        <div className="row">
        <React.Suspense fallback={<div>Spinner...</div>}>
          {items.map((item, i) => (
            <div key={i} className="col-sm-4 card">
              <img src={item.imageUrl} className="card-img-top" alt={item.heading}></img>
              <div className="card-body">
                <h5 className="card-title">{item.heading}</h5>
                <p className="card-text">{item.footer}</p>
              </div>
            </div>
          ))}
          </React.Suspense>
        </div>
      </div>
    )
};

const mapStateToProps = (state) => {
  return { items: state.items, number: state.number };
};

const ReduxProducts = connect(mapStateToProps, (dispatch) => ({ dispatch }))(Products);

export { ReduxProducts as Products };
