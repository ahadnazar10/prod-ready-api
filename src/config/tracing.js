import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";

const metricsExporter = new PrometheusExporter(
  { port: 9464, startServer: true },
  () =>
    console.log(
      "✅ Prometheus exporter started at http://localhost:9464/metrics"
    )
);

// ✅ optional: export traces to console (for now)
const traceExporter = new ConsoleSpanExporter();

const sdk = new NodeSDK({
  metricReader: metricsExporter,
  spanProcessor: new SimpleSpanProcessor(traceExporter),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
