/* @jsx createElement */
import { createElement, Require } from "subapp-server/template"
import Template from "./template"

export default (
  <Template>
    <Require
      _id="subapp-web/lib/load"
      _concurrent
      timestamp
      elementId="products-subapp"
      name="Products"
    />
  </Template>
)
