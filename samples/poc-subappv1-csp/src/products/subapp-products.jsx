import { React } from "subapp-react";
import { useContext } from "react";
import { useDispatch, useSelector, ReactReduxContext } from "react-redux";
import { reduxLoadSubApp } from "subapp-redux";
import { productsReducers } from "./reducers";
import "./styles.css";

const Products = (props) => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { store } = useContext(ReactReduxContext)
    
    console.log('Store >> ', store)
    console.log('Store >> State >> ', store.getState())
    console.log("products state", state);

    return (
        <>
            <h2 className="header">Products</h2>
        </>
    )
}

export default reduxLoadSubApp({
    name: "Products",
    Component: Products,
    reduxReducers: productsReducers,
    reduxShareStore: 'productsStore',
    prepare: () => {
        // A new store is created, so we can set initial state here.
        // TODO: sample api call to get data and return as initial state
        const initialState = {
         products: [
          {
            id: `124232213`,
            name: 'item 1',
            description: 'sample cart item'
          }
         ]
        }
        return Promise.resolve(initialState)
      }
  })