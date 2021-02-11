import { React, ReactSubApp, xarcV2, AppContext } from "@xarc/react";
import { connect, reduxFeature } from "@xarc/react-redux";

const Deal = props => {
  return (
    <AppContext.Consumer>
      {({ isSsr, ssr }) => {
        return <div>SPECIAL DEAL - SPECIAL DEAL - {props.deals}</div>;
      }}
    </AppContext.Consumer>
  );
};

const mapStateToProps = state => {
  return { deals: state.deals.value };
};

const ReduxDeals = connect(mapStateToProps, dispatch => ({ dispatch }))(Deal);

export { ReduxDeals as Component };

export const subapp: ReactSubApp = {
  Component: ReduxDeals,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true,
      prepare: async initialState => {
        xarcV2.debug("Deal (deal.tsx) subapp redux prepare, initialState:", initialState);
        if (initialState) {
          return { initialState };
        } else {
          return { initialState: { deal: { value: "My Special Deals" } } };
        }
      }
    })
  ]
};
