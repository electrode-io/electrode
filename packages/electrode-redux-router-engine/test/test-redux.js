/* eslint-disable */
const createStore = require("redux").createStore;

module.exports = function (req, match) {
    const reducer = (state, action) => {
        if (action.type === "INC_NUMBER") {
            return state + 1;
        }

        return 0;
    }
    const initialState = 0;
    return Promise.resolve(createStore(reducer, initialState));
};
