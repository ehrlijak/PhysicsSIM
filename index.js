const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let floor = canvas.height;

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();

    requestAnimationFrame(loop);
}
let state = {
    x: 100,
    y: 50,
    w: 50,
    h: 50,
    mass: 10,

    vy: 0
};
function draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(state.x, state.y, state.w, state.h);
}
function update() {
    let friction = 7
    let gravityForce = 1;
    let ay = gravityForce / state.mass;

    state.vy += ay;

    state.y += state.vy;

    if (state.y + state.h > floor) {
        state.y = floor - state.h;
        state.vy = -state.vy + friction;
    }


}

loop();