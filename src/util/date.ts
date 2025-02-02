import dayjs, { Dayjs } from 'dayjs';

export const DATE_FORMAT_DIFFERENT_YEAR = 'MMM D, YYYY';
export const DATE_FORMAT_CURRENT_YEAR = 'MMM D';

export function getDate(date: string) {
    return dayjs(date).format(getDateFormat(date));
}

export function getDateFormat(date: string | Dayjs) {
    const year = ( typeof date === 'string' ) ? dayjs(date).get('year') : date.get('year');
    return dayjs().get('year') === year ? DATE_FORMAT_CURRENT_YEAR : DATE_FORMAT_DIFFERENT_YEAR;
}
