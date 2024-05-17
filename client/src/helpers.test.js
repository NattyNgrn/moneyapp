
import { test, expect } from 'vitest';
import { formatDate, sortDates } from './helpers';

test('formatDate', () => {
    expect(formatDate('2021-10-31T00:00:00.000Z')).toBe('October 31, 2021');
    expect(formatDate('2021-10-01T00:00:00.000Z')).toBe('October 1, 2021');
    expect(formatDate('2021-10-15T00:00:00.000Z')).toBe('October 15, 2021');
});

test('sortDates', () => {
    expect(sortDates({ date: '2024-05-17' }, { date: '2024-05-16' })).toBe(-1);
    expect(sortDates({ date: '2024-05-15' }, { date: '2024-05-16' })).toBe(1);
    expect(sortDates({ date: '2024-05-16' }, { date: '2024-05-16' })).toBe(0);
});

test('sort array of dates based on sortDates', () => {
    const dates = [
        { date: '2024-05-16' },
        { date: '2024-05-15' },
        { date: '2024-05-17' }
    ];
    const sortedDates = dates.sort(sortDates);
    expect(sortedDates).toEqual([
        { date: '2024-05-17' },
        { date: '2024-05-16' },
        { date: '2024-05-15' }
    ]);
});
