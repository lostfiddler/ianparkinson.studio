import NavComponent from './navigation.js';

const Header = document.querySelector('header');

Header.appendChild(new NavComponent());

for(let theme of ['OS Default', 'light', 'dark']) {
    const butt = document.createElement('button');
    const [className, meta] = {
        'OS Default': ['', 'light dark'],
        'light': ['light', 'only light'],
        'dark': ['dark', 'only dark']
    }[theme]

    butt.onclick = () => {
        document.documentElement.className = className;
        document.querySelector('meta[name="color-scheme"]').content = meta;
    }
    butt.textContent = theme;

    Header.appendChild(butt);
}
