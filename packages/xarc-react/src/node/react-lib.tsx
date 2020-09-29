import { FrameworkLib } from "@xarc/subapp";
import { renderToString } from "react-dom/server";
/**
 *
 */
export class SSRReactLib implements FrameworkLib {
  constructor() {
    //
  }

  renderToString(element: React.ReactElement) {
    return renderToString(element);
  }
}
