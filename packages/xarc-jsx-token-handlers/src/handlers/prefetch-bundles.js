"use strict";

module.exports = context => {
  const content = context.user.content;
  if (!content || !content.prefetch) return "";

  // allow user to include the <script> tag manually for their prefetch content
  if (!content.prefetch.startsWith("<script")) {
    return `<script${context.user.scriptNonce}>${content.prefetch}</script>`;
  } else {
    return content.prefetch;
  }
};
