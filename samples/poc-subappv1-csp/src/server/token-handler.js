module.exports = function setup() {
  const CUSTOM_TOKEN_HANDLER = "CUSTOM_TOKEN_HANDLER";
  const INLINE_CSS = "INLINE_CSS";

  return {
    [CUSTOM_TOKEN_HANDLER]: (context) => {
      const nonce = context?.user?.scriptNonce ? context?.user?.scriptNonce : "";
      return `<script${nonce}>console.log('custom token handler');</script>`;
    },
    [INLINE_CSS]: (context) => {
      const nonce = context?.user?.styleNonce ? context?.user?.styleNonce : "";
      return `<style${nonce}>
        #inline-style {
          color: red;
        }
      </style>`;
    }

  };
};
