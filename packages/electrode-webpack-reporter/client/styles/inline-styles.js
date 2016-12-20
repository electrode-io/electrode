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
      paddingLeft: 15,
      paddingBottom: 0,
      paddingTop: 0,
      paddingRight: 0
    },
    error: {
      marginBottom: 10,
      marginTop: 10,
      display: "inline-block"
    },
    expandCodeButton: {
      display: "block",
      float: "right",
      marginRight: 30,
      marginTop: 10
    }
  };
};
