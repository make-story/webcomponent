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