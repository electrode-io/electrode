import winston from "winston";
import { makeWinstonLogger } from "./winston-logger";

export const logger = makeWinstonLogger(winston);
