export const warningsErrorsStyles = () => {
  return {
    container: {
      border: "2px solid black",
      marginBottom: 20
    },
    title: {
      borderBottom: 0,
      height: 50,
      backgroundColor: "#999999"
    },
    titleText: {
      display: "inline-block",
      marginLeft: 15
    },
    icon: {
      height: 50,
      display: "inline-block",
      borderRight: "2px solid black",
      padding: 10
    },
    errorContainer: {
      paddingBottom: 10
    },
    error: {
      marginBottom: 10,
      marginTop: 10,
      marginRight: 90,
      display: "inline-block",
      whiteSpace: "normal"
    },
    expandCodeButton: {
      display: "block",
      float: "right",
      marginRight: 30,
      marginTop: 10
    }
  };
};

export const homeStyles = () => {
  return {
    inkbar: {
      marginBottom: 30
    },
    tabItem: {
      width: 300,
      backgroundColor: "grey"
    },
    legacy: {
      background: "black",
      color: "gray",
      padding: "10px"
    }
  };
};
