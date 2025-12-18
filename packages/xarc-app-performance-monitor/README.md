# @xarc/app-performance-monitor

Client-side performance monitoring utility for tracking bundle loads, paint metrics, and web vitals (LCP, FID, FCP).

## Features

- **Web Vitals**: Track Largest Contentful Paint (LCP), First Input Delay (FID), First Contentful Paint (FCP)
- **Bundle Metrics**: Monitor JavaScript bundle load times and sizes
- **Timing Metrics**: DNS, TCP, TTFB, DOM processing, page load times
- **Error Tracking**: Capture runtime errors
- **Zero Configuration**: Auto-initializes and starts tracking
- **SSR Safe**: Works in both browser and server-side rendering contexts
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JavaScript
- **Type Safe**: Written in TypeScript with full type definitions
- **Tree Shakeable**: ESM and CJS builds with no side effects

## Installation

```bash
npm install @xarc/app-performance-monitor --save
```

## Usage

### Basic Usage (Auto-initialization)

Simply import the package and it will automatically start tracking:

```javascript
import '@xarc/app-performance-monitor';

// Metrics are automatically collected and logged to console
// Access metrics via: window.performanceMetrics
```

### Advanced Usage (Manual Control)

```javascript
import { PerformanceMonitor } from '@xarc/app-performance-monitor';

// Create a custom instance
const monitor = new PerformanceMonitor();

// Get current metrics
const metrics = monitor.getMetrics();
console.log(metrics);

// Export metrics as JSON
const json = monitor.exportMetrics();

// Send metrics to your analytics endpoint
await monitor.sendMetrics('/api/analytics');
```

### TypeScript

```typescript
import { PerformanceMonitor, PerformanceMetrics } from '@xarc/app-performance-monitor';

const monitor = new PerformanceMonitor();
const metrics: PerformanceMetrics = monitor.getMetrics();

// Access metrics globally
declare global {
  interface Window {
    performanceMetrics?: PerformanceMetrics;
  }
}

const globalMetrics = window.performanceMetrics;
```

### React Integration

```jsx
import { useEffect } from 'react';
import { PerformanceMonitor } from '@xarc/app-performance-monitor';

function App() {
  useEffect(() => {
    const monitor = new PerformanceMonitor();

    // Send metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        monitor.sendMetrics('/api/performance');
      }, 1000);
    });
  }, []);

  return <div>Your App</div>;
}
```

## Metrics Collected

### Web Vitals

- **LCP** (Largest Contentful Paint): Time when the largest content element becomes visible
- **FID** (First Input Delay): Time from first user interaction to browser response
- **FCP** (First Contentful Paint): Time when the first content is painted

### Timing Metrics

- DNS lookup time
- TCP connection time
- Time to First Byte (TTFB)
- DOM processing time
- DOM Content Loaded time
- Page load time
- Total load time

### Bundle Metrics

- Individual bundle load times
- Bundle sizes (or "cached" indicator)
- Total JavaScript size
- Total number of bundles

### Error Tracking

- Runtime error messages
- File names and line numbers
- Error stack traces

## API

### `PerformanceMonitor`

#### Constructor

```typescript
const monitor = new PerformanceMonitor();
```

Creates a new performance monitor instance and starts tracking.

#### Methods

##### `getMetrics(): PerformanceMetrics`

Returns the current metrics object.

```javascript
const metrics = monitor.getMetrics();
console.log(metrics.largestContentfulPaint); // e.g., 1234
```

##### `exportMetrics(): string`

Returns metrics as a JSON string.

```javascript
const json = monitor.exportMetrics();
localStorage.setItem('performance', json);
```

##### `sendMetrics(endpoint?: string): Promise<void>`

Sends metrics to a server endpoint via POST request.

```javascript
await monitor.sendMetrics('/api/performance-metrics');
```

Default endpoint: `/api/performance-metrics`

### `PerformanceMetrics` Interface

```typescript
interface PerformanceMetrics {
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
```

## Browser Console

When running, metrics are automatically logged to the console:

```
✅ DOM Content Loaded: 245ms
📊 Performance Metrics:
  DNS Lookup: 0ms
  TCP Connection: 4ms
  Time to First Byte: 19ms
  DOM Processing: 663ms
  ...
🎨 first-contentful-paint: 536ms
📦 JavaScript Bundle Load Times:
  main.bundle.js: 114ms (218.58 KB)
  ...
🖼️ Largest Contentful Paint: 636ms
💾 To export metrics, run: copy(JSON.stringify(window.performanceMetrics, null, 2))
```

## Exporting Metrics

From the browser console, you can export metrics:

```javascript
// Copy to clipboard
copy(JSON.stringify(window.performanceMetrics, null, 2));

// Save to file
const blob = new Blob([JSON.stringify(window.performanceMetrics, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'performance-metrics.json';
a.click();
```

## Server-Side Rendering (SSR)

The package is SSR-safe and will not throw errors when imported in Node.js:

```javascript
// This works fine in SSR context (Next.js, Remix, etc.)
import '@xarc/app-performance-monitor';
```

The monitor automatically detects browser vs. server context and only initializes in the browser.

## Performance Impact

The monitor has minimal performance impact:
- **Initialization**: <1ms
- **Tracking**: Uses browser APIs (no polling)
- **Memory**: <100KB

## Browser Support

Works in all modern browsers that support:
- Performance API
- PerformanceObserver
- Performance Timing API

Gracefully degrades in older browsers - unsupported metrics are simply not collected.

## License

Apache-2.0
