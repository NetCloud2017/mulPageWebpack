const dom = document.createElement('div');
import {add} from '@/utils'
dom.addEventListener('click', function() {
    
    dom.innerHTML = add(dom.innerHTML || 1 , 2 );

}, false)

document.body.appendChild(dom)

