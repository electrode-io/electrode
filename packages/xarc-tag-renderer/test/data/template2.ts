import { TagTemplate, createTemplateTags, Token, TokenInvoke, RegisterTokenIds } from "../../src";

const nullTokenProcess = () => {
  return null;
};

const templateTags = createTemplateTags`<html>
<head>
  ${Token("ssr-content")}
  ${Token("webapp-header-bundles")}
  ${Token("webapp-body-bundles")}
  ${Token("prefetch-bundles")}
  ${RegisterTokenIds(() => {
    return {
      NULL_ID: null
    };
  })}
  ${Token("NULL_ID")}
  <div>test null id</div>
  <script>
    console.log("test")
  </script>
  ${Token("webapp-body-bundles")}
  ${Token("meta-tags")}
  ${TokenInvoke(nullTokenProcess)}
  <div>test</div>
</head>
</html>
${Token("page-title")}
`;

export const template = new TagTemplate({ templateTags, templateDir: __dirname });
