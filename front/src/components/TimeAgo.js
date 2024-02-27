import { differenceInDays, formatDistanceToNow,differenceInHours, parseISO } from 'date-fns';
import { pl } from "date-fns/locale";
export function timeDifferenceInDays(timestamp){
    return differenceInDays(timestamp, new Date().getTime());
}
export function timeDifferenceInHours(timestamp){
    return differenceInHours(new Date().getTime(),parseISO(timestamp));
}
export function TimeAgo({ timestamp }) {
    let timePerios = ''
    if (timestamp) {
        const date = parseISO(timestamp);
        timePerios = formatDistanceToNow(date, { locale: pl });
       
    }
    return (<>
        <span title="timestamp">
            <i>{timePerios} temu</i>
        </span>

    </>)
}