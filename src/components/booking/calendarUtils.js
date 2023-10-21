export const calendarUtils = {
    
    getMonthString(monthInt) {
        if ( monthInt < 0 || monthInt > 12 ) return 'Invalid Month Int.'
        const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
        }
        return months[monthInt]
    },

    getDayString(dayInt) {
        if ( dayInt < 0 || dayInt > 6 ) return 'Invalid Day Int.'
        const days = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
        }
        return days[dayInt]
    },

    getLocalizedDayPostfix(dayOfMonthInt) {
        if ( dayOfMonthInt < 1 || dayOfMonthInt > 31 ) return 'Invalid Month Day Int.'
        let postfix = ''
        switch (dayOfMonthInt) {
        case 1:
            postfix = 'st'
            break;
        case 2:
            postfix = 'nd'
            break;
        case 3:
            postfix = 'rd'
            break;
        default:
            postfix = 'th'
        }
        return postfix
    },
}