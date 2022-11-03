import React from "react";
import subApp from "./bottom";
import { StaticRouter } from "react-router-dom/server";
import Promise from "bluebird";
import Fs from "fs";

let filterImages;

export default {
  initialize: () => {
    if (!filterImages) {
      const natureImages = JSON.parse(Fs.readFileSync("static/nature-images.json"));
      filterImages = natureImages.value.map(x => {
        return {
          contentUrl: x.contentUrl,
          featured: x.featured,
          thumbnail: x.thumbnail,
          thumbnailUrl: x.thumbnailUrl,
          name: x.name
        };
      });
    }
  },
  prepare: (request, context) => {
    const initialState = {
      imagesData: filterImages
    };
    const store = subApp.reduxCreateStore(initialState);
    return Promise.delay(50 + Math.random() * 500).return({
      initialState,
      store
    });
  },
  StartComponent: props => {
    return (
      <StaticRouter {...props}>
        <subApp.Component />
      </StaticRouter>
    );
  }
};
