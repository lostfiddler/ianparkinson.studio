import Route from '../components/router.js';
import getBlogPosts from '../components/getBlogPosts.js';

export default class BlogPage extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this._updateRendering();
    }

    async _updateRendering() {
        if (this.shadowRoot) return;

        const shadow = this.attachShadow({mode: 'open'});
        const ul = document.createElement('ul');

        const posts = await getBlogPosts();
        posts.forEach(post => {
            const li = document.createElement('li');
            const link = document.createElement('a');

            link.href = `/blog/${post.title}`
            link.textContent =  post.title;

            link.onclick = (e) => {
                e.preventDefault();
                history.pushState({postBody: post.body}, '', e.target.href);
                Route();
            }

            li.appendChild(link);
            ul.appendChild(li);
        });

        shadow.appendChild(ul);
    }

}

customElements.define('blog-page', BlogPage);
