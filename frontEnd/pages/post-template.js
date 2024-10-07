export default class PostPageTemplate extends HTMLElement {
    constructor() {
        super();
    }
    
    get postDocument() {
        return new DOMParser().parseFromString(history.state.postBody, 'text/html');
    }

    get postElements() {
        return Array.from(this.postDocument.body.children);
    }

    async connectedCallback() {
        this._updateRendering();
        
        this.myJavascript();
    }

    _updateRendering() {
        if(Object.keys(history.state).length === 0) return;
        if(this.shadowRoot) return;
        
        const shadow = this.attachShadow({mode: 'open'});
        const article = document.createElement('article');

        for(let i = 0; i < this.postElements.length; i++) {
            const node = this.postElements[i];

            if(node.nodeName === 'SCRIPT') {
                continue;
            }

            article.appendChild(node);
        }
        const style = document.createElement('style');
        style.textContent = `
            canvas {
                display: block;
                width: 100%;
                margin: 2rem auto;
            }
            pre {
                max-width: 800px;
                margin: 0 auto;
                padding: 1.2rem;
                background: var(--bg0);
                border: 1px solid var(--fg0);
                border-radius: 3px;
            }
        `

        shadow.appendChild(style);
        shadow.appendChild(article);
    }

    async myJavascript() {
        const scriptElem = this.postElements.pop();
        if (scriptElem.nodeName != "SCRIPT") return;
        
        const response = await fetch(scriptElem.src);
        const script = await response.text();
        new Function(script)();
    }
}

customElements.define('post-page-template', PostPageTemplate);
