// @flow

import React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import natureJpg from "../../images/nature-600-337.jpg";
import avatarJpg from "../../images/jchip-128.jpg";
import { FormattedMessage } from "react-intl";
import messages from "../lang/default-messages";

const CardExampleWithAvatar = () => {
  return (
    <Card>
      <CardHeader title="URL Avatar" subtitle="Subtitle" avatar={avatarJpg} />
      <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
        <img src={natureJpg} />
      </CardMedia>
      <CardTitle title="Card title" subtitle="Card subtitle" />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam
        erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor
        quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.<p />
        <FormattedMessage {...messages.editMe} />
      </CardText>
      <CardActions>
        <FlatButton label="Action1" />
        <FlatButton label="Action2" />
      </CardActions>
    </Card>
  );
};

export default CardExampleWithAvatar;
