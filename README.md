# Web Component  

> http://makeapi.net/test/webcomponents.html  
  
----------

> Template  
```html
<!-- 템플릿 엘리먼트 //-->
<template id="templateElement">
	<tr>
		<td class="js_td1"></td>
		<td class="js_td2"></td>
	</tr>
</template>
<div id="templateTest">
	<!-- 타겟 //-->
	<table>
		<thead>
			<tr>
				<th>test1</th>
				<th>test2</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>
```
  
```javascript
let target = document.querySelector('#templateTest');
let test1 = 'ysm';
let test2 = '유성민';
let documentFragment;

// 1. 템플릿 엘리먼트
/*
템플릿 엘리먼트는 자바스크립트 코드로 많은 양의 코드를 적지 않아도 되고, 조건에 따라 DOM의 변경도 가능하다. 
이러한 변경은 강력한 DOM API들을 그대로 사용할 수 있어 편리하다. 
템플릿 엘리먼트는 DOM에 한 번 정의되면 필요할 때마다 복사하여 붙여넣기 때문에 성능도 훌륭하다.

그러나, 템플릿 엘리먼트는 템플릿이 HTML로 작성되어야 한다는 것이 오히려 단점이 되기도 한다. 
컴포넌트의 컨트롤러에 해당하는 자바스크립트와 템플릿 뷰에 해당하는 HTML이 분리되어야 한다는 점이다. 
*/

let templateElement = document.querySelector('#templateElement');
documentFragment = templateElement.content.cloneNode(true); // document.importNode() : 현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣을 수 있도록 해줍니다.
documentFragment.querySelector('.js_td1').textContent = test1;
documentFragment.querySelector('.js_td2').textContent = test2;
target.querySelector('table tbody').appendChild(documentFragment);

// 2. 템플릿 리터럴 
let templateLiterals = `
	<td class="js_td1">${test1}</td>
	<td class="js_td2">${test2}</td>
`;
let tr = document.createElement('tr');
tr.innerHTML = templateLiterals;
documentFragment = document.createDocumentFragment();
documentFragment.appendChild(tr);
target.querySelector('table tbody').appendChild(documentFragment);

// 3. lit-html
/*
lit-html 템플릿 리터럴을 사용하여 JavaScript 로 HTML 템플릿을 작성할 수 있습니다.
lit-html 템플릿은 일반적인 JavaScript이며 HTML 작성의 친숙함과 JavaScript의 결합
*/
```

----------

> ShadowDOM  
```html
<div id="none-shadow" class="wrap-item">
	<!-- dom //-->
</div>
<div id="shadow-host" class="wrap-item">
	<!-- shadow dom //-->
</div>
<div class="wrap-item">
	<button class="button-normal" id="shadowDomButton1">ShadowDOM 미적용 코드 삽입</button>
	<button class="button-normal" id="shadowDomButton2">ShadowDOM 적용 코드 삽입</button>
</div>
```
  
```javascript
// 템플릿 리터럴 
let templateLiterals = ` 
	<link rel="stylesheet" href="../src/css/test.css">
	<style>
	* {
		padding: 3px;
		color: #FFF;
		background-color: #000;
	}
	</style>
	<span>안녕하세요. 유성민 입니다.</span>
`;
// 일반적인 기존 코드 적용
document.querySelector('#shadowDomButton1').onclick = event => {
	let none = document.querySelector('#none-shadow'); 
	none.innerHTML = templateLiterals;
};
// 쉐도우돔을 통한 코드 적용
document.querySelector('#shadowDomButton2').onclick = event => {
	/*
	Shadow DOM은 웹 개발의 공통 문제에 대한 솔루션을 제공
	격리된 DOM: 구성 요소의 DOM은 자체 포함됩니다 (예: document.querySelector()는 구성 요소의 Shadow DOM에 노드를 반환하지 않음).
	범위가 지정된 CSS: Shadow DOM 내부에 정의한 CSS는 범위가 Shadow DOM으로 지정되어 있습니다. 스타일 규칙은 누출되지 않으며 페이지 스타일은 스며들지 않습니다.
	CSS 단순화: 범위가 지정된 DOM이란 간단한 CSS 선택기와 훨씬 일반적인 ID/클래스 이름을 사용할 수 있으며 이름 충돌에 대해 걱정할 필요가 없음을 의미합니다.
	*/

	// shadow host
	let shadowHost = document.querySelector('#shadow-host'); 
	// shadow root - mode: open or closed
	let shadowRoot = shadowHost.attachShadow({mode: 'open'}); 
	// shadow tree
	shadowRoot.innerHTML = templateLiterals;
	// shadow root 접근 
	// attachShadow({mode: 'closed'}) 경우 접근 불가, null 반환
	console.log(document.querySelector('#shadow-host').shadowRoot); 
};
```

----------

> CustomElements  
```html
<div id="customelementsTest">
	<current-time>
		<!-- 6/11/2017, 11:55:49 -->
	</current-time>
</div>
```
   
```javascript
/*
새로운 요소 정의
사용자설정 요소를 정의하고 브라우저에 새로운 태그에 대해 알리는 데에는 전역적 customElements가 사용됩니다. 
생성하려는 태그 이름과 기본 HTMLElement를 확장하는 자바스크립트 class를 사용하여 customElements.define()을 호출합니다.

요소의 JavaScript API 정의
사용자설정 요소의 기능은 HTMLElement를 확장하는 ES2015 class를 사용하여 정의됩니다.

요소 확장 (기능 등의 추가)
Custom Elements API는 새로운 HTML 요소를 생성하는 데 유용하지만, 
다른 사용자설정 요소를 확장(기존 사용자 엘리먼트를 상속받아 추가확장)하거나 브라우저에서 기본 제공되는 HTML을 확장(기본 태그 상속하여 확장)하는 데도 유용합니다.

사용자설정 요소 반응 (특수한 수명 주기 후크를 정의)
Custom Elements 상태에 따라 자동 실행되는 콜백

사용자설정 요소는 해당 정의가 등록되기 전에 사용가능
페이지에 여러 <app-drawer> 요소를 선언해 두고 한참이 지날 때까지 customElements.define('app-drawer', ...)를 호출하지 않아도 됩니다.
define()을 호출하고 기존 요소에 클래스 정의를 부여하는 프로세스를 '요소 업그레이드'라고 합니다.
태그 이름이 언제 정의되었는지를 확인하려면 window.customElements.whenDefined()를 사용하면 됩니다. 

요소가 인스턴스
정의된 요소를 document.querySelector('current-time') 엘리먼트 자체를 통해 class 의 내부 접근이 가능합니다.
document.querySelector('current-time').start();

-
사용자설정 요소 생성 관련 규칙
1. 사용자설정 요소의 이름에는 대시(-)가 포함되어야 합니다. 
이에 따라 <x-tags>, <my-element> 및 <my-awesome-app>은 모두 유효한 이름이지만, <tabs> 및 <foo_bar>는 그렇지 않습니다.
이러한 요구사항은 HTML 파서가 일반 요소와 사용자설정 요소를 구별할 수 있도록 합니다. 
또한 새로운 태그가 HTML에 추가될 때 다음 버전과의 호환성도 보장되도록 합니다.

2. 동일한 태그를 두 번 이상 등록(요소확장/요소업그레이드)할 수 없습니다. 
그렇게 하려고 하면 DOMException이 발생합니다. 
새로운 태그에 대해 브라우저에 알리고 나면 그걸로 끝입니다. 취소할 수 없습니다.

3. HTML은 몇 가지 요소만 스스로 닫도록 허용하므로 사용자설정 요소는 스스로 닫을 수 없습니다. 
따라서 항상 닫는 태그를 작성해야 합니다(<app-drawer></app-drawer>).

-
"HTML은 사용하기가 까다롭지 않고 유연합니다."
예를 들어, 페이지에 <randomtagthatdoesntexist>를 선언하면 브라우저가 이를 완전히 수락합니다. 비표준 태그가 왜 작동할까요? 
그 해답은 HTML 사양이 이를 허용하기 때문입니다. 사양에 정의되지 않은 요소는 HTMLUnknownElement로 파싱됩니다.
// "tabs" is not a valid custom element name
document.createElement('tabs') instanceof HTMLUnknownElement === true
// "x-tabs" is a valid custom element name (사용자설정 요소는 유효한 이름('-' 포함)으로 생성된 경우 HTMLElement로 파싱)
document.createElement('x-tabs') instanceof HTMLElement === true
*/
class CurrentTimeElement extends HTMLElement { 
	constructor() {
		// 클래스 초기화. 속성이나 하위 노드는 접근할 수는 없다.
		super();
	}

	// 기본 스팩 
	// 커스텀 엘리먼트가 처음 document의 DOM에 연결될 때 호출
	connectedCallback() {
		// DOM에 추가되었다. 렌더링 등의 처리를 하자.
		this.start();
	}

	// 기본 스팩 
	// 사용자 정의 요소가 문서의 DOM과 연결되어 있지 않을 때 호출
	disconnectedCallback() {
		// DOM에서 제거되었다. 엘리먼트를 정리하는 일을 하자.
		this.stop();
	}

	// 기본 스팩 
	// 속성의 변화를 감시
	// 브라우저는 observedAttributes 배열의 허용 목록에 추가된 모든 속성에 대해 attributeChangedCallback()을 호출
	// 성능 최적화와 관련 높음 (사용자가 style 또는 class와 같은 일반적인 속성을 변경할 때 개발자는 쓸데없이 수많은 콜백을 받는 것을 원치 않음)
	static get observedAttributes() {
		// 모니터링 할 속성 이름
		return ['time'];
	}

	// 기본 스팩 
	// 속성의 변화에 반응
	// 사용자 정의 요소의 속성 중 하나가 추가, 제거 또는 변경되면 호출 (observedAttributes 속성에 나열된 특성만 이 콜백을 수신)
	attributeChangedCallback(attrName, oldValue, newValue) {
		//console.log('attributeChangedCallback', attrName);
		// 속성이 추가/제거/변경되었다.
		if(attrName === 'time') {
			this.textContent = newValue;
		}
	}

	// 기본 스팩 
	// 사용자 정의 요소를 새 문서로 이동할 때 호출 (해당 엘리먼트가 다른 Document에서 옮겨져 올 때 수행)
	// 사용자설정 요소가 새 document(예: document.adoptNode(el)라고도 함)로 이동된 경우
	adoptedCallback(oldDoc, newDoc) {
		// 다른 Document에서 옮겨져 왔음
		// 자주 쓸 일은 없을 것.
	}

	// 사용자 함수
	start() {
		// 필요에 따라 메서드를 추가할 수 있다.
		// 이 클래스 인스턴스는 HTMLElement이다.
		// 따라서 `document.querySelector('current-time').start()`로 호출할 수 있다.
		this.stop();
		this.timer = window.setInterval(() => {
			this.time = new Date().toLocaleString();
		}, 1000);
	}

	// 사용자 함수
	stop() {
		// 이 메서드 역시 CurrentTime클래스의 필요에 의해 추가했다.
		if(this.timer) {
			window.clearInterval(this.timer);
			this.timer = null;
		}
	}

	// getter / setter
	get time() {
		//console.log('get time', this.getAttribute('time'));
		return this.getAttribute('time');
	}
	set time(value) {
		//console.log('set time', value);
		this.setAttribute("time", value);
	}
}

// 요소 정의 (확장/업그레이드)
if(!customElements.get('current-time')) {
	customElements.define('current-time', CurrentTimeElement); // 정의 (확장/업그레이드)
	customElements.whenDefined('current-time')
	.then(() => {
		// 해당 커스텀앨리먼트 모두 적용(요소업데이트/요소확장)완료 
		console.log('current-time element ready!');
	});
}

// 이미 등록(요소확장/요소업데이트)된 요소를 또 다시 등록할 경우 DOMException 발생!
//customElements.define("current-time", CurrentTimeElement);
```
  
```javascript
// 라이프 사이클을 사용하지 않는 일반적인 방식 
// locale 속성은 new Date().toLocaleString(this.locale); 값으로 사용
class CurrentTime { // 기존 일반 앨리먼트 방식 
	constructor(el) {
		this._el = el;
		this._init();
		this.start();
	}
	_init() {
		// 속성 변경을 모니터
		this._localeChangedObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if(mutation.type === 'attributes' && mutation.attributeName === 'locale') {
					this.locale = this._el.getAttribute('locale');
				}
			});
		});
		this._localeChangedObserver.observe(this._el, {
			attributes: true,
			attributeFilter: ['locale']
		});
		// 엘리먼트가 DOM에서 제거되었는지 모니터
		this._disconnectedObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if(mutation.type === 'childList' &&
					Array.prototype.slice.call(mutation.removedNodes).indexOf(this._el) >= 0) {
					this.dispose();
				}
			});
		});
		this._disconnectedObserver.observe(this._el.parentNode, {
			childList: true
		});
	}
	start() {
		this.stop();
		this._timer = window.setInterval(() => {
			this._el.innerText = new Date().toLocaleString(this.locale);
		}, 1000);
	}
	stop() {
		if(this._timer) {
			window.clearInterval(this._timer);
			this._timer = null;
		}
	}
	dispose() {
		this.stop();
		this._localeChangedObserver.disconnect();
		this._disconnectedObserver.disconnect();
	}
	static create(el) {
		return new CurrentTime(el);
	}
}

// 요소 확인
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.current-time').forEach(el => {
		CurrentTime.create(el);
	});
}, false);
```
  
----------

> Module  
```html
<div id="moduleTest"></div>
  
<!-- 모듈 preload //-->
<link rel="modulepreload" href="../src/javascript/module/b.js">
<!-- type="module" 동일 파일 한번만 로드 //-->
<!--  
기본 스크립트(script tag)는 기본적으로 HTML 파서를 지연
모듈(script type="module")은 defer 속성을 추가한 것과 같은 script 다운로드와 html 파싱을 병행
기본적으로 모듈은 defer 되기 때문에 모듈간의 의존관계에 따라 문제가 생기지 않습니다.
-->
<!-- 구글에서는 .mjs확장자를 사용하길 권장 (모듈파일인지 식별, nodejs의 실험적 모듈 기능 지원은 오직 .mjs파일에서만 동작) //-->
<script type="module" src="../src/javascript/module/c.js"></script>
<script type="module" src="../src/javascript/module/c.js"></script>
<!-- module 미지원 브라우저 대응(safari 10.1 은 nomodule 속성외 추가적 대응 필요) //-->
<!-- https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc //-->
<script nomodule src="../src/javascript/module/c.js"></script>
```
  
----------

> Components  
```html
<div id="componentsTest">
	<module-1234></module-1234>
</div>

<!-- dynamic import (동적 import) //-->
<!-- static import를 사용하려면, 모든 모듈이 다운로드 된 뒤에 코드가 execution //-->
<!-- https://v8.dev/features/dynamic-import //-->
<script type="module">
// async, await ES8 스펙 (Promise는 ES6 스펙) - async/await는 Promise를 사용
// 동적으로 선언(커스텀엘리먼트 등)에 필요한 리소스(종속된 import 포함)만 동적 로드가 가능
if(document.querySelector('module-1234')) {
	(async () => { // async : 함수 내부에서 await 사용한다는 예약어
		let moduleSpecifier = '../src/javascript/module/module1234.js';
		let module = await import(moduleSpecifier); // await : 비동기 코드실행이 끝난 후 아래 코드 절차(순서)적 실행
		customElements.define('module-1234', module.default()); // module.default() : export default 호출
	})();
}
</script>
```
  

  