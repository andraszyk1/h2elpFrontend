import { useEffect, useState } from 'react';

export const getScreenWidth = () => {
    return document.addEventListener('onresize', () => {
        console.log(window.innerWidth);
       return window.innerWidth;
    })
}