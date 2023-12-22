import React from "react";
import {parseISO,formatDistanceToNow} from 'date-fns'
import { pl } from "date-fns/locale";
export function TimeAgo({timestamp}){
let timePerios=''
if(timestamp){
    const date = parseISO(timestamp);
    timePerios=formatDistanceToNow(date,{locale:pl});
}
    return (<>
    <span title="timestamp">
        <i>{timePerios} temu</i>
    </span>
    
    </>)
}