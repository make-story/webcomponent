/*
<!-- 모듈 preload //-->
<link rel="modulepreload" href="/test/module/b.js">

<!-- type="module" 동일 파일 한번만 로드 //-->
<!-- 모듈은 기본적으로 지연(Deferred) - 기본적으로 HTML 파서를 지연 //-->
<!-- 구글에서는 .mjs확장자를 사용하길 권장 (모듈파일인지 식별, nodejs의 실험적 모듈 기능 지원은 오직 .mjs파일에서만 동작) //-->
<script type="module" src="/test/module/c.js"></script>
<script type="module" src="/test/module/c.js"></script>

<!-- module 미지원 브라우저 대응(safari 10.1 은 nomodule 속성외 추가적 대응 필요) //-->
<!-- https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc //-->
<script nomodule src="/test/module/c.js"></script>
*/