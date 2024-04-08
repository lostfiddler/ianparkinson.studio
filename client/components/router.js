import HomePage from '../pages/home.js';
import BlogPage from '../pages/blog.js';
import AboutPage from '../pages/about.js';
import PostPageTemplate from '../pages/post-template.js';
import getBlogPosts from '../components/getBlogPosts.js';

const routes = {
    '/': new HomePage,
    '/blog': new BlogPage,
    '/about': new AboutPage,
}

for (let post of await getBlogPosts()){
    routes['/blog/' + post.title] = new PostPageTemplate();
}

export default function Route() {
    const pageRoot = document.querySelector('main');

    if (routes[location.pathname] === undefined) {
        pageRoot.textContent = '404'; 
        return;
    }

    pageRoot.replaceChildren(routes[location.pathname]);
}

window.addEventListener('popstate', () => Route());
