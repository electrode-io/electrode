export function startSubApp() {
  return {
    process(context) {
      const { scriptNonceAttr = "" } = context.user;
      //
      return `<!-- Starting SubApp -->
<script${scriptNonceAttr}>window.xarcV2.start()</script>
`;
    }
  };
}
