import app from "./app.js";
import config from "./config/index.js";
import { logInfo } from "./utils/logger.js";

app.listen(config.port, () => {
  logInfo(`✅ Server running on http://localhost:${config.port}`);
});
