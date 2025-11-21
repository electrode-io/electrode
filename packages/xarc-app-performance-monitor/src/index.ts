/**
 * Client-side performance monitoring utility
 * Automatically tracks and reports performance metrics
 *
 * @packageDocumentation
 */

export interface PerformanceMetrics {
  startTime: number;
  domContentLoaded?: number;
  windowLoad?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  bundleLoadTimes: Array<{
    name: string;
    duration: number;
    size: number | string;
  }>;
  totalBundleSize?: number;
  totalBundleCount?: number;
  timing?: {
    dns: number;
    tcp: number;
    ttfb: number;
    domProcessing: number;
    pageLoad: number;
    domContentLoaded: number;
    totalLoadTime: number;
  };
  errors: Array<{
    message: string;
    filename?: string;
    lineno?: number;
    colno?: number;
  }>;
}

declare global {
  interface Window {
    __appLoadStart?: number;
    performanceMetrics?: PerformanceMetrics;
  }
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    startTime: Date.now(),
    bundleLoadTimes: [],
    errors: []
  };

  constructor() {
    // Set app load start time
    if (typeof window !== 'undefined') {
      window.__appLoadStart = window.__appLoadStart || Date.now();
      window.performanceMetrics = this.metrics;
    }

    this.setupListeners();
  }

  private setupListeners() {
    if (typeof document === 'undefined') {
      return; // SSR context
    }

    // DOM Content Loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.metrics.domContentLoaded = Date.now() - this.metrics.startTime;
        console.log('✅ DOM Content Loaded:', this.metrics.domContentLoaded + 'ms');
      });
    } else {
      this.metrics.domContentLoaded = 0;
    }

    // Window Load
    if (document.readyState === 'complete') {
      this.captureLoadMetrics();
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.captureLoadMetrics();
      });
    }

    // Error tracking
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (e) => {
        console.error('❌ Error:', e.message);
        this.metrics.errors.push({
          message: e.message,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno
        });
      });
    }
  }

  private captureLoadMetrics() {
    this.metrics.windowLoad = Date.now() - this.metrics.startTime;

    // Performance Timing API
    if (typeof performance !== 'undefined' && performance.timing) {
      const timing = performance.timing;
      this.metrics.timing = {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        ttfb: timing.responseStart - timing.navigationStart,
        domProcessing: timing.domComplete - timing.domLoading,
        pageLoad: timing.loadEventEnd - timing.navigationStart,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        totalLoadTime: Date.now() - (typeof window !== 'undefined' && window.__appLoadStart ? window.__appLoadStart : this.metrics.startTime)
      };

      console.log('📊 Performance Metrics:');
      console.log('  DNS Lookup:', this.metrics.timing.dns + 'ms');
      console.log('  TCP Connection:', this.metrics.timing.tcp + 'ms');
      console.log('  Time to First Byte:', this.metrics.timing.ttfb + 'ms');
      console.log('  DOM Processing:', this.metrics.timing.domProcessing + 'ms');
      console.log('  DOM Content Loaded:', this.metrics.timing.domContentLoaded + 'ms');
      console.log('  Page Load:', this.metrics.timing.pageLoad + 'ms');
      console.log('  Total Load Time:', this.metrics.timing.totalLoadTime + 'ms');
    }

    // Paint Metrics
    this.capturePaintMetrics();

    // Resource Timing
    this.captureResourceMetrics();

    // Largest Contentful Paint
    this.captureLCP();

    // First Input Delay
    this.captureFID();

    // Export instructions
    console.log('\n💾 To export metrics, run: copy(JSON.stringify(window.performanceMetrics, null, 2))');
  }

  private capturePaintMetrics() {
    if (typeof performance === 'undefined' || !performance.getEntriesByType) {
      return;
    }

    const paintEntries = performance.getEntriesByType('paint') as PerformanceEntry[];
    paintEntries.forEach(entry => {
      console.log('🎨', entry.name + ':', Math.round(entry.startTime) + 'ms');
      if (entry.name === 'first-contentful-paint') {
        this.metrics.firstContentfulPaint = Math.round(entry.startTime);
      }
    });
  }

  private captureResourceMetrics() {
    if (typeof performance === 'undefined' || !performance.getEntriesByType) {
      return;
    }

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const jsResources = resources.filter(r =>
      r.name.endsWith('.js') || r.name.includes('.bundle.')
    );

    console.log('\n📦 JavaScript Bundle Load Times:');
    jsResources.forEach(resource => {
      const bundleName = resource.name.split('/').pop() || resource.name;
      const loadTime = Math.round(resource.duration);
      const size = resource.transferSize || 'cached';

      console.log(
        '  ' + bundleName + ':',
        loadTime + 'ms',
        '(' + (size !== 'cached' ? (size / 1024).toFixed(2) + ' KB' : 'cached') + ')'
      );

      this.metrics.bundleLoadTimes.push({
        name: bundleName,
        duration: loadTime,
        size: size
      });
    });

    // Calculate total bundle size
    const totalSize = jsResources.reduce((acc, r) => acc + (r.transferSize || 0), 0);
    console.log('\n📊 Total JS Bundle Size:', (totalSize / 1024).toFixed(2) + ' KB');
    console.log('📊 Total JS Resources:', jsResources.length);

    this.metrics.totalBundleSize = totalSize;
    this.metrics.totalBundleCount = jsResources.length;
  }

  private captureLCP() {
    if (typeof PerformanceObserver === 'undefined' ||
        !PerformanceObserver.supportedEntryTypes ||
        !PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        if (lastEntry) {
          console.log('🖼️ Largest Contentful Paint:', Math.round(lastEntry.startTime) + 'ms');
          this.metrics.largestContentfulPaint = Math.round(lastEntry.startTime);
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observation failed:', e);
    }
  }

  private captureFID() {
    if (typeof PerformanceObserver === 'undefined' ||
        !PerformanceObserver.supportedEntryTypes ||
        !PerformanceObserver.supportedEntryTypes.includes('first-input')) {
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = Math.round(entry.processingStart - entry.startTime);
          console.log('⚡ First Input Delay:', fid + 'ms');
          this.metrics.firstInputDelay = fid;
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observation failed:', e);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return this.metrics;
  }

  public exportMetrics(): string {
    return JSON.stringify(this.metrics, null, 2);
  }

  public async sendMetrics(endpoint: string = '/api/performance-metrics'): Promise<void> {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: this.exportMetrics()
      });
      console.log('✅ Performance metrics sent to server');
    } catch (error) {
      console.error('❌ Failed to send performance metrics:', error);
    }
  }
}

// Auto-initialize singleton for browser context
let defaultMonitor: PerformanceMonitor | null = null;

if (typeof window !== 'undefined') {
  defaultMonitor = new PerformanceMonitor();
}

// Export server-side utilities
export {
  generatePerfMonitorScript,
  injectPerfMonitorScript,
  extractNonce,
  type InjectScriptOptions
} from './server-utils';

export default defaultMonitor;
