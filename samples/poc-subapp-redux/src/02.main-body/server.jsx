import React from "react";
import subApp from "./main-body";
import { StaticRouter } from "react-router-dom/server";

module.exports = {
  prepare: async ({ request, context }) => {
    return new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 1000))
      .then({
        number: 100,
        items: [
          {
            heading: "BLACK FRIDAY DEAL",
            imageUrl:
              "https://i5.walmartimages.com/asr/eb17a965-39fc-4f78-9512-ed9e8535cb3f_2.a3bc9a314bb6bf1d7c323ea038f181b8.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
            footer: `VIZIO 50” Class 4K Ultra HD LED TV`,
            type: "danger"
          },
          {
            heading: "BLACK FRIDAY DEAL",
            imageUrl:
              "https://i5.walmartimages.com/asr/7da972fa-166b-4e32-a59e-eb99d932f97e_1.98742f6c14fb6ecc1feed8c1b2c7d340.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
            footer: `Sharp 40" Class FHD (1080p) LED TV`,
            type: "success"
          },
          {
            heading: "BLACK FRIDAY DEAL",
            imageUrl:
              "https://i5.walmartimages.com/asr/38ee580a-8e54-48fa-8f0d-4ca6be5b4c29_3.57548f072dc4d4eb3833b7b2837c5f35.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
            footer: `Sceptre 32" Class HD (720P) LED TV`
          },
          {
            heading: "BLACK FRIDAY DEAL",
            imageUrl: "https://placehold.it/150x80?text=IMAGE",
            footer: "Buy 50 mobiles and get a gift card",
            type: "success"
          },
          {
            heading: "BLACK FRIDAY DEAL",
            imageUrl: "https://placehold.it/150x80?text=IMAGE",
            footer: "Buy 50 mobiles and get a gift card"
          },
          {
            heading: "BLACK FRIDAY DEAL",
            imageUrl: "https://placehold.it/150x80?text=IMAGE",
            footer: "Buy 50 mobiles and get a gift card",
            type: "success"
          }
        ]
      })
      .then(initialState => {
        return { initialState };
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

console.log("hello from main-body server.jsx");
