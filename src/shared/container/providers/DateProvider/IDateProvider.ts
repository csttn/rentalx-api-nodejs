import dayjs from 'dayjs';

interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  addTimeToDate(value: number, type: dayjs.OpUnitType): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
