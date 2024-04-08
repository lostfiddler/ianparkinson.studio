export default class Todo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const label = document.createElement('span');
        label.setAttribute('class', 'todo-label');
        label.textContent = 'todo'

        const todo = document.createElement('span');
        todo.setAttribute('class', 'todo-text')

        const text = this.getAttribute('data-text');
        todo.textContent = ' ' + text;

        const style = document.createElement('style');
        style.textContent = `
            .todo-label {
                padding: 0 4px 2px;
                background: #7fdbff;
                color: #222;
                border-radius: 2px;
            }
        `

        shadow.appendChild(style);
        shadow.appendChild(label);
        shadow.appendChild(todo);
    }
}

customElements.define('todo-component', Todo);