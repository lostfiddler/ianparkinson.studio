window.onload = () => {
    app();
}

function app() {
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    const x_position = 102;
    const y_position = 102;
    const radius = 100;

    const slider = document.getElementById('slider');

    canvas.width = x_position * 2;
    canvas.height = y_position * 2;

    window.requestAnimationFrame(draw);

    function draw() {
        const degree = slider.value;
        const toRadian = degree * Math.PI / 180; // Convert to radian for easier calculations
        const theta = 2 * Math.PI - toRadian; // Change rotation of terminalSide to counterclockwise

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        circle();
        initialSide();
        terminalSide(theta);

        window.requestAnimationFrame(draw);
    }

    function circle() {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(x_position, y_position, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    function initialSide() {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeStyle = "#000000"
        ctx.moveTo(x_position, y_position);
        ctx.lineTo(200, y_position);
        ctx.stroke();
    }

    function terminalSide(theta) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000"
        ctx.moveTo(x_position, y_position);
        ctx.lineTo(x_position + radius * Math.cos(theta), y_position + radius * Math.sin(theta));
        ctx.stroke();
    }
}