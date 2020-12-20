import a from "./a.js";

const result = a();
const p = document.createElement('p');

p.textContent = result;
document.querySelector('#moduleTest').appendChild(p);

export default function() {
    return 'b 모듈 export 값';
};