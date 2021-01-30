import { describe, it } from "mocha";
import { logger } from "../../src/logger";

describe("logger", function() {
  it("should log to console", () => {
    logger.debug("test");
    logger.info("test");
    logger.error("test error");
    logger.warn("test warn");
  });
});
