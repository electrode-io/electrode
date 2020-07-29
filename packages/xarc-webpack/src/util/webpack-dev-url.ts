export function devServerBaseUrl(config) {
  const devProtocol = config.https ? "https://" : "http://";
  return `${devProtocol}${config.devHostname}:${config.devPort}`;
}
