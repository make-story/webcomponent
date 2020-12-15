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