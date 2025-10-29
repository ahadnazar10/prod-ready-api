import "./config/tracing.js"; // OpenTelemetry must load first
import app from "./app.js";
import config from "./config/index.js";
import logger from "./utils/logger.js";

const PORT = config.port || 3000;

app.listen(PORT, () => {
  logger.info(`✅ Server running on http://localhost:${PORT}`);
});
