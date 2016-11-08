import React, {PropTypes} from "react";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from "material-ui/Tabs";
import Electrify from './webpack-modules/electrify';
import ModulesByPkg from './webpack-modules/modules-by-pkg';
  
const WebpackModules = (props) => {
  console.log('webpack modules props', props);
  return(
  <Card initiallyExpanded={true}>
    <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Modules"/>
      <CardText expandable={true}>
        <Tabs>
          <Tab label="Electrify">
              <Electrify pureWebpackStats={props.pureWebpackStats} />
          </Tab>
          <Tab label="Modules By Pkg">
            <ModulesByPkg modulesByPkg={props.modulesByPkg} totalSize={props.totalSize}/>
          </Tab>
        </Tabs>
      </CardText>
  </Card>    
  );
}

export default WebpackModules;
