import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "../../src/styles/<%= projectName %>.css";
import "../../src/styles/raleway.css";
import Accordion from "./accordion";

export default class <%= componentName %> extends React.Component {
  render() {
    const data = {
      definition: "> Archetype",
      definitionDetails: "Electrode Component Archetype helps developers to quickly build react components.",
      structure: "> Structure",
      structureDetails: "We demo components through <repo>/demo-app where import components from <repo>/packages/<componentName>.",
      benefit: "> Benefit",
      benefitDetails: "With the new mono-repo structure, you can have multiple smaller components that complement each other in one repo.",
      others: "> More Info",
      othersDetails: "https://docs.electrode.io/chapter1/intermediate/component-archetype/"
    };

    return (
      <div className={styles.container}>
        <hr />
        <h4>New accordion component demo</h4>
        <Accordion summary={data.definition} details={data.definitionDetails} />
        <Accordion summary={data.structure} details={data.structureDetails} />
        <Accordion summary={data.benefit} details={data.benefitDetails} />
        <Accordion summary={data.others} details={data.othersDetails} />
      </div>
    );
  }
}

<%= componentName %>.displayName = "<%= componentName %>";

<%= componentName %>.propTypes = { };

<%= componentName %>.defaultProps = { };
