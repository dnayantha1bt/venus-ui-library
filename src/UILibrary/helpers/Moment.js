import moment from 'moment';

const DATE_FORMAT = 'DD-MM-YYYY';
const DATE_TIME_FORMAT = 'DD-MM-YYYY hh:mm:ss';
class Moment {
    static format(date) {
        if (typeof date === 'string') return date.replace(/-/g, '/');
        else return date;
    }

    static now() {
        return moment.utc().format();
    }

    static today() {
        return moment.utc().format(DATE_FORMAT);
    }

    static dateOnly(date, format) {
        date = Moment.format(date);

        if (format) return moment(new Date(date)).format(DATE_FORMAT);

        return moment(date, DATE_FORMAT);
    }

    static dateTime(timestamp, format) {
        if (format) return moment(new Date(timestamp)).format(DATE_TIME_FORMAT);

        return moment(timestamp, DATE_TIME_FORMAT);
    }

    static utc(timestamp) {
        return moment.utc(timestamp).format();
    }

    static substract(from, count, type, format = DATE_FORMAT) {
        return moment(from)
            .subtract(count, type)
            .format(format);
    }

    static add(to, count, type, format = DATE_FORMAT) {
        return moment(to)
            .add(count, type)
            .format(format);
    }

    static isBefore(time1, time2) {
        return moment(time1).isBefore(time2);
    }

    static isAfter(time1, time2) {
        return moment(time1).isAfter(time2);
    }
}

export default Moment;
