/**
 * Server-side utilities for injecting performance monitoring scripts
 * @packageDocumentation
 */

export interface InjectScriptOptions {
  /**
   * CSP nonce for script tag (required for Content Security Policy compliance)
   */
  nonce?: string;

  /**
   * Whether to minify the injected script (default: true in production)
   */
  minify?: boolean;
}

/**
 * Generates the inline performance monitoring initialization script
 * This script must run before any other scripts to accurately track load times
 *
 * @param options - Configuration options for script generation
 * @returns The complete script tag as a string
 */
export function generatePerfMonitorScript(options: InjectScriptOptions = {}): string {
  const { nonce = '', minify = process.env.NODE_ENV === 'production' } = options;

  const nonceAttr = nonce ? ` nonce="${nonce}"` : '';

  // This initialization script sets up the performance tracking globals
  // before any bundles load, ensuring we capture accurate timing data
  const script = minify
    ? `(function(){window.__appLoadStart=Date.now();window.performanceMetrics={startTime:Date.now(),scriptLoadTimes:{},bundleLoadTimes:[],errors:[]};})();`
    : `(function() {
  window.__appLoadStart = Date.now();
  window.performanceMetrics = {
    startTime: Date.now(),
    scriptLoadTimes: {},
    bundleLoadTimes: [],
    errors: []
  };
})();`;

  return `<script${nonceAttr}>
// Performance monitoring - tracks app load time
${script}
</script>`;
}

/**
 * Injects the performance monitoring script into HTML string
 * Automatically extracts nonce from existing script tags if not provided
 *
 * @param html - The HTML string to inject the script into
 * @param options - Configuration options (nonce will be auto-detected if not provided)
 * @returns The modified HTML with performance monitoring script injected
 */
export function injectPerfMonitorScript(
  html: string,
  options: InjectScriptOptions = {}
): string {
  // Auto-detect nonce from first script tag if not explicitly provided
  let { nonce, minify } = options;

  if (!nonce) {
    const nonceMatch = html.match(/nonce="([^"]+)"/);
    nonce = nonceMatch ? nonceMatch[1] : '';
  }

  const perfMonitorScript = generatePerfMonitorScript({ nonce, minify });

  // Inject at the beginning of <head> to ensure it runs first
  if (html.includes('<head>')) {
    return html.replace('<head>', `<head>${perfMonitorScript}`);
  }

  // Fallback: inject at the beginning of the HTML if no <head> tag found
  return perfMonitorScript + html;
}

/**
 * Extracts nonce value from HTML string
 * Useful when you need to get the nonce separately
 *
 * @param html - The HTML string to extract nonce from
 * @returns The nonce value or empty string if not found
 */
export function extractNonce(html: string): string {
  const nonceMatch = html.match(/nonce="([^"]+)"/);
  return nonceMatch ? nonceMatch[1] : '';
}
