/**
 * @packageDocumentation
 * @module @xarc/jsx-renderer
 */

/* eslint-disable filenames/match-regex */

/**
 *
 */
export class Component {
  props: any;
  context: any;

  constructor(props: any = {}, context = {}) {
    this.props = props;
    this.context = context;
  }

  isComponent() {
    return true;
  }

  render() {
    return "component";
  }
}
