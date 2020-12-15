// class
class ModuleElement extends HTMLElement { 
    constructor() {
        super();
    }
    connectedCallback() {
        // shadow root - mode: open or closed
        let shadowRoot = this.attachShadow({mode: 'open'}); 
        // shadow tree
        shadowRoot.innerHTML = `
            <p>유성민 모듈</p>
        `;
    }
}

// export
export default function() {
    return ModuleElement;
};

/*
// dynamic import (동적 import)
// async, await ES8 스펙 (Promise는 ES6 스펙) - async/await는 Promise를 사용
// 동적으로 선언(커스텀엘리먼트 등)에 필요한 리소스(종속된 import 포함)만 동적 로드가 가능
if($('module-1234').length) {
	(async function() { // async : 함수 내부에서 await 사용한다는 예약어
		let moduleSpecifier = '/test/module/module1234.js';
		let module = await import(moduleSpecifier); // await : 비동기 코드실행이 끝난 후 아래 코드 절차(순서)적 실행
		customElements.define('module-1234', module.default()); // module.default() : export default 호출
	})();
}
*/