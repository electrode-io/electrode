const number = (number = 1000, action = {}) => {
  if (action.type === "INC_NUMBER") {
    return number + 1;
  }
  if (action.type === "DEC_NUMBER") {
    return number - 1;
  }

  return number;
};

const items = s => {
  return s || { items: [] };
};

export default {
  number,
  items
};

// Action function for easy of use.
export const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};
export const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};