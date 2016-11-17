import React, {PropTypes} from "react";
import {List, ListItem} from "material-ui/List";
import formatSize from "../../../lib/format-size.js";

/* eslint-disable max-statements, react/jsx-indent-props */

const listPkg = (totalSize, pkg, key) => {
  const nestModules = (modules) => Object.keys(modules).map((name, i) => {
    const m = modules[name];
    const pt = `${name} [${formatSize(m.size)}]`;
    return <ListItem key={i} primaryText={pt}/>;
  });

  const parentsStr = (parents) => parents.substr(1).split(":").join("/");

  const byParents = Object.keys(pkg).filter((k) => k.startsWith("$"));
  const $ = pkg[byParents[0]];
  let dups = "";
  let nestedItems;
  let size = 0;
  if (byParents.length > 1) {
    dups = <span> [{byParents.length} dups] </span>;
    size = byParents.reduce((acc, k) => acc + pkg[k].size, 0);
    nestedItems = byParents.sort().map((p, i) => {
      const pt = p === "$" ? "at top level" : `under ${parentsStr(p)}`;
      return (<ListItem
        key={i}
        primaryText={pt}
        primaryTogglesNestedList={true}
        nestedItems={nestModules(pkg[p].modules)}/>);
    });
  } else {
    nestedItems = nestModules($.modules);
    size = $.size;
  }
  const pct = (size / totalSize) * 100;
  const name = $.name === "." ? "under app CWD" : $.name;
  const primaryText = (<div>
    <span>{name}</span>
    {dups}
    <span> [{formatSize(size)}]</span>
    <span> [{pct.toFixed(2)}%]</span>
  </div>);
  return (<ListItem
    key={key}
    primaryText={primaryText}
    primaryTogglesNestedList={true}
    nestedItems={nestedItems}/>);
};

const ModulesByPkg = (props) => {
  return (<List>
    {Object.keys(props.modulesByPkg).sort().map((name, key) =>
      listPkg(props.totalSize, props.modulesByPkg[name], key))}
  </List>);
};

ModulesByPkg.propTypes = {
  totalSize: PropTypes.number,
  modulesByPkg: PropTypes.object
};

export default ModulesByPkg;
