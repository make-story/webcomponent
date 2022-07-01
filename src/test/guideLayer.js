/*
검사 가이드 레이어 생성 
(커스텀 태그 생성)
(커스텀 태그 내부 쉐도우돔 적용)
*/
module.exports = () => {
	const guideLayerTagName = 'guide-layer';
	if(!customElements.get(guideLayerTagName)) {
		customElements.define(guideLayerTagName, class extends HTMLElement {
			constructor() {
				super(); 
				this.attachShadow({mode: 'open'});
				this.shadowRoot.innerHTML = `
					<style>
					.wrap {
						position: fixed; 
						top: 0; 
						left: 0; 
						box-sizing: border-box;
						padding: 1.2rem;
						max-height: 200px; 
						overflow-y: scroll;
						z-index: 99999; 
						background: rgba(253, 254, 255, .8); 
						border-bottom: 1px solid #eee;
					}
					.wrap.show {
						width: 100%; 
					}
					.wrap.hide {

					}
					.wrap ._layer_toggle {
						margin-top: 10px;
					}
					.wrap.show ._layer_toggle {
						display: block;
					}
					.wrap.hide ._layer_toggle {
						display: none;
					}
					</style>
					
					<div class="wrap show">
						<button class="_layer_toggle_button" data-toggle="">-</button>
						<div class="_layer_toggle">
							<b>프론트 검사...</b>
							<ul>
								<li>
									이미지 레이지로드 적용 상태
									<div class="_validator_lazy_images"></div>
								</li>
								<li>
									이미지 썸네일 적용 상태
									<div class="_validator_thumb_images"></div>
								</li>
								<li>
									클릭코드 적용 상태
									<div class="_validator_empty_clickcode"></div>
									<div class="_validator_inner_clickcode"></div>
									<div class="_validator_split_clickcode"></div>
								</li>
							</ul>
						</div>
					</div>
				`;
			}

			// 커스텀태그 기본 라이프사이클 - DOM에 추가되었을 때 콜백
			connectedCallback() {
				const wrap = this.shadowRoot.querySelector('.wrap');
				const _layer_toggle_button = this.shadowRoot.querySelector('._layer_toggle_button');
				const _layer_toggle_button_show_text = '보이기';
				const _layer_toggle_button_hide_text = '숨기기';
				const _layer_toggle = this.shadowRoot.querySelector('._layer_toggle');
				const _validator_empty_clickcode = this.shadowRoot.querySelector('._validator_empty_clickcode');
				const _validator_inner_clickcode = this.shadowRoot.querySelector('._validator_inner_clickcode');
				const _validator_split_clickcode = this.shadowRoot.querySelector('._validator_split_clickcode');

				// 셀렉터 또는 전역변수로 접근가능하도록 설정 
				this.setAttribute('id', '_validator_layer');
				window._validator_layer = this.shadowRoot;

				// 보이기 / 숨기기 관련 
				if(wrap.className.includes('show')) {
					_layer_toggle_button.setAttribute('data-toggle', 'true');
					_layer_toggle_button.innerHTML = _layer_toggle_button_hide_text;
				}else {
					_layer_toggle_button.setAttribute('data-toggle', 'false');
					_layer_toggle_button.innerHTML = _layer_toggle_button_show_text;
				}

				// 이벤트
				_layer_toggle_button.addEventListener('click', e => {
					const toggle = _layer_toggle_button.getAttribute('data-toggle');
					if(toggle === 'true') {
						wrap.classList.remove('show');
						wrap.classList.add('hide');
						_layer_toggle_button.setAttribute('data-toggle', 'false');
						_layer_toggle_button.innerHTML = _layer_toggle_button_show_text;
					}else {
						wrap.classList.remove('hide');
						wrap.classList.add('show');
						_layer_toggle_button.setAttribute('data-toggle', 'true');
						_layer_toggle_button.innerHTML = _layer_toggle_button_hide_text;
					}
				});
			}
			
			// 커스텀태그 기본 라이프사이클 - DOM에서 제거되었을 때 콜백
			disconnectedCallback() {
				
			}
		});
	}
	document.body.appendChild(document.createElement(guideLayerTagName));
};