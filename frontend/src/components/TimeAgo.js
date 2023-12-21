import React from "react";
import {parseISO,formatDistanceToNow} from 'date-fns'
export function TimeAgo({timestamp}){
let timeAgo=''
if(timestamp){
    const date = parseISO(timestamp);
    const timePerios=formatDistanceToNow(date);
    timeAgo=`${timePerios} temu`
}
    return (<>
    <span title="timestamp">
        <i>{timeAgo}</i>
    </span>
    
    </>)
}