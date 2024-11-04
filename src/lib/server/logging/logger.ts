import { dev } from '$app/environment';
import * as winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { services: 'user-service' },
	transports: []
});

if (dev) {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
				winston.format.printf(({ level, message, label, timestamp }) => {
					return `${timestamp} [${level}]: ${message}`;
				})
			)
		})
	);
}
