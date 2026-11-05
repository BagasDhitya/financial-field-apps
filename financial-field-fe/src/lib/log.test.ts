import { describe, expect, it } from 'vitest';

import { createLogger, formatLogLine } from './log';

describe('log (W3)', () => {
	it('uses the webReader prefix format', () => {
		expect(formatLogLine('cms::cmsFetch', '403 on /articles')).toBe(
			'cms::cmsFetch- 403 on /articles',
		);
	});

	it('filters below the minimum level', () => {
		const lines: string[] = [];
		const logger = createLogger('warn', (level, line) => lines.push(`${level}:${line}`));
		logger.info('a::b', 'hidden');
		logger.warn('a::b', 'shown');
		logger.error('a::b', 'shown too');
		expect(lines).toEqual(['warn:a::b- shown', 'error:a::b- shown too']);
	});
});
