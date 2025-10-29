import promBundle from "express-prom-bundle";

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  promClient: { collectDefaultMetrics: {} },
});

export default metricsMiddleware;
