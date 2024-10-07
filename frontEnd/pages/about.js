export default class AboutPage extends HTMLElement {
    constructor() {
        super()
    }


    connectedCallback() {
        this._updateRendering();
    }

    _updateRendering() {
        if (this.shadowRoot) return;

        const shadow = this.attachShadow({mode: "open"});
        const div = document.createElement('div');
        div.textContent = 'about page';
        shadow.appendChild(div);
    }
}

customElements.define('about-page', AboutPage);
