import a from "./a.js";

let result = a();
$('#moduleTest').append($('<p />').text(result));

export default function() {
    return 'b 모듈 export 값';
};