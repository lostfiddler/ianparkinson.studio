const host = document.querySelector('post-page-template')
const canvas = host.shadowRoot.querySelector('canvas')
const ctx = canvas.getContext("2d");

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
})

ctx.strokeStyle = 'red'
ctx.strokeRect(0,0,canvas.width, canvas.height)
