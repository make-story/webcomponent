/*
UIT 클릭코드 검사
*/
module.exports = (layer=window._validator_layer) => {
	const empty = [];
	const inner = [];
	const split = [];
	const isClickCode = function($target) {
		//return $target.is('[spcid]') || $target.is('[data-spcid]') ? true : false;
		return $target.attr('spcid') || $target.attr('data-spcid') || false;
	};
	
	const clickCodeTagName = 'clickcode-layer';
	if(!customElements.get(clickCodeTagName)) {
		customElements.define(clickCodeTagName, class extends HTMLElement {
			constructor() {
				super(); 
				this.attachShadow({mode: 'open'}); 
				this.shadowRoot.innerHTML = `
					<style>
					.wrap {
						position: absolute;
						left: 0;
						top: 0;
						box-sizing: border-box;
						padding: 1.2rem;
						z-index: 99999; 
						background: rgba(253, 254, 255, .8); 
						border: 1px solid #eee;
						font-size: 1.4rem;
						color: #333;
					}
					</style>
					<div class="wrap">

					</div>
				`;
				this.wrap = this.shadowRoot.querySelector('.wrap');
			}

			// 커스텀태그 기본 라이프사이클 - DOM에 추가되었을 때 콜백
			connectedCallback() {
				// style
				this.style.cssText = `
					position: relative;
				`;
			}
			
			// 커스텀태그 기본 라이프사이클 - DOM에서 제거되었을 때 콜백
			disconnectedCallback() {
				
			}

			set left(value) {
				this.style.left = value;
			}
			get left() {
				return this.style.left;
			}
			set top(value) {
				this.style.top = value;
			}
			get top() {
				return this.style.top;
			}
			set position(value) {
				this.style.position = value;
			}
			get position() {
				return this.style.position;
			}
			set content(value) {
				if(this.wrap) {
					this.wrap.innerHTML = value;
				}
			}
			get content() {
				if(this.wrap) {
					return this.wrap.innerHTML;
				}
			}
		});
	}

	$('a').each(function() {
		let $a = $(this);
		let href = $a.attr('href');
		let spcid = '';

		// 유효성 검사 
		if(!href || $.trim(href) === '#') {
			return true; // continue;
		}
		spcid = isClickCode($a);

		// 클릭코드 정보 레이어 
		if(spcid) {
			let layer = document.createElement(clickCodeTagName);
			layer.content = spcid;
			$a.before(layer);
		}

		// 검사 
		if(!spcid) {
			// 클릭코드 없음 
			empty.push(href);
		}else if($a.find('*').filter(() => !isClickCode($(this))).length) {
			// 내부 검사
			inner.push(href);
		}else if(spcid.split('_').length < 10) {
			// 댑스 검사
			split.push(href);
		}

		empty.length && $(layer).find('._validator_empty_clickcode').text(`클릭코드 확인필요 ${empty.length}`);
		inner.length && $(layer).find('._validator_inner_clickcode').text(`링크내부 확인필요 ${inner.length}`);
		split.length && $(layer).find('._validator_split_clickcode').text(`'_' 확인필요 ${split.length}`);
	});
	return {
		empty,
		inner,
		split
	};
};