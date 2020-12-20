import b from "./b.js";

const result = b();
const p = document.createElement('p');

p.textContent = result;
document.querySelector('#moduleTest').appendChild(p);