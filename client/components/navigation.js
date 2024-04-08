import Route from '../components/router.js'

export default class NavComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        const pages = ['Ian Parkinson', 'blog', 'about'];
        pages.forEach((page) => {
            const li = document.createElement('li')
            const link = document.createElement('a');
            link.textContent = page;

            if (page === 'Ian Parkinson'){ 
                link.setAttribute('href', '/');
            } else {
                link.href = '/' + page;
            }

            link.addEventListener('click', (event) => {
                event.preventDefault();
                history.pushState({}, "", event.target.getAttribute('href'));
                Route();
            });

            li.appendChild(link);
            ul.appendChild(li);
        });
        nav.appendChild(ul);

        const style = document.createElement('style');
        style.textContent = `
            nav {
                display: flex;
                justify-content: center;
            }
            ul {
                padding: 0;
                list-style-type: none;
            }
            li {
                margin: 0 1em;
                float: left;
            }
            a {
                text-decoration: none;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(nav);
    }
}

customElements.define('nav-component', NavComponent)
