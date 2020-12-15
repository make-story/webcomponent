// 템플릿 리터럴 
let templateLiterals = ` 
<link rel="stylesheet" href="/test/css/test.css">
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
$('#shadowDomButton1').off('click').on('click', function() {
	let none = document.querySelector('#none-shadow'); 
	none.innerHTML = templateLiterals;
});

// 쉐도우돔을 통한 코드 적용
$('#shadowDomButton2').off('click').on('click', function() {
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
});