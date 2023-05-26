import '@pnotify/core/dist/PNotify.css';
import {alert, Stack} from '@pnotify/core';


const myStack = new Stack({
    firstpos1: 10,
    firstpos2: 10,
    modal: false,
    maxOpen: Infinity
});

export function pnotifyNotice () {
    alert({ 
        text: 'This movie is already added!',
        width: '300px',
        delay: 700, 
        stack: myStack
        })
}
