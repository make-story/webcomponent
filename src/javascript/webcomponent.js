/**
 * 웹 컴포넌트
 * 컴포넌트 > 커스텀엘리먼트 > 쉐도우돔 > 템플릿 리터럴 
 */

// class
// 실행순서 : observedAttributes > attributeChangedCallback > connectedCallback
export default class WebComponent extends HTMLElement {
    constructor() {
        super();

        // shadow root - mode: open or closed
        this.attachShadow({ mode: 'open' });
    }

    // 기본 스팩
    // 커스텀 엘리먼트가 처음 document의 DOM에 연결될 때 호출
    // 커스텀 엘리먼트 태그를 선언하면 호출
    connectedCallback() {
        console.log('connectedCallback');

        // shadow tree
        this.shadowRoot.innerHTML = `
            <p>유성민 모듈</p>
        `;
    }

    // 기본 스팩
    // 사용자 정의 요소가 문서의 DOM과 연결되어 있지 않을 때 호출
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }

    // 기본 스팩 (constructor 보다 먼저 실행됨)
    // 속성의 변화를 감시
    // 브라우저는 observedAttributes 배열의 허용 목록에 추가된 모든 속성에 대해 attributeChangedCallback()을 호출
    // 성능 최적화와 관련 높음 (사용자가 style 또는 class와 같은 일반적인 속성을 변경할 때 개발자는 쓸데없이 수많은 콜백을 받는 것을 원치 않음)
    static get observedAttributes() {
        console.log('observedAttributes');

        // 모니터링 할 속성 이름
        // 예: return ['local'];  ->  <custom-element locale=""></custom-element>
        return ['locale'];
    }

    // 기본 스팩
    // 속성의 변화에 반응 (속성이 추가/제거/변경)
    // 사용자 정의 요소의 속성 중 하나가 추가, 제거 또는 변경되면 호출 (observedAttributes 속성에 나열된 특성만 이 콜백을 수신)
    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('attributeChangedCallback');
        console.log([attrName, oldValue, newValue].join(' / '));

        // 속성이 추가/제거/변경되었다.
        if (attrName === 'locale') {
        this.setAttribute(`${attrName}-new`, `Hello, ${newValue}`);
        //this.shadowRoot.innerHTML = `Hello, ${newValue}`;
        //this.textContent = `Hello, ${newValue}`;
        } else {
        this[attrName] = newValue;
        }
    }

    // 기본 스팩
    // 사용자 정의 요소를 새 문서로 이동할 때 호출 (해당 엘리먼트가 다른 Document에서 옮겨져 올 때 수행)
    // 사용자설정 요소가 새 document(예: document.adoptNode(el)라고도 함)로 이동된 경우
    adoptedCallback(oldDoc, newDoc) {
        console.log('adoptedCallback');
    }
}

// export
export const tagName = 'web-component';
export const setDefine = () => {
    // 이미 등록(요소확장/요소업데이트)된 요소를 또 다시 등록할 경우 DOMException 발생!
    // define(tagName, constructor, options)
    if (!customElements.get(tagName)) {
        // 컴포넌트 클래스 프리징(Freezing)
        // 만약 컴포넌트 클래스를 누군가에 의해 수정할 수 없도록 프리징하고자 한다면 Object.freeze()를 사용
        //const FrozenCurrentTimeElement = Object.freeze(CurrentTimeElement);
        //customElements.define("current-time", FrozenCurrentTimeElement);

        customElements.define(tagName, WebComponent);
        customElements.whenDefined(tagName).then(() => {
        // 해당 커스텀앨리먼트 모두 적용(요소업데이트/요소확장)완료
        console.log(`${tagName} ready!`);
        });
    }
};

/*
// dynamic import (동적 import)
// async, await ES8 스펙 (Promise는 ES6 스펙) - async/await는 Promise를 사용
// 동적으로 선언(커스텀엘리먼트 등)에 필요한 리소스(종속된 import 포함)만 동적 로드가 가능
const tagName = 'web-component';
if(document.querySelector(tagName)) {
    (async function() { // async : 함수 내부에서 await 사용한다는 예약어
        let moduleSpecifier = '/test/module/module1234.js';
        let module = await import(moduleSpecifier); // await : 비동기 코드실행이 끝난 후 아래 코드 절차(순서)적 실행
        customElements.define(tagName, module.default); // export default 호출
    })();
}
*/
  