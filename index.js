const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const keys = {};
const bg = new Image();
bg.src = "pictures/beach.jpg";

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let floor = canvas.height;
let wall = canvas.width;

let state = {
    x: 100,
    y: 50,
    w: 50,
    h: 50,
    mass: 10,
    vx: 0,
    vy: 0
};

bg.onload = () => {
    loop();
};

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(loop);
}

function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(state.x, state.y, state.w, state.h);
}

function update() {
    let gravityForce = 1;
    let ay = gravityForce / state.mass;
    let wind = 0.01;
    let friction = 0.9;

    state.vy += ay;
    state.vx += wind;

    state.x += state.vx;
    state.y += state.vy;

    if (state.y + state.h > floor) {
        state.y = floor - state.h;
        state.vy *= -friction;
        state.vx *= 0.9;
    }

    if (state.x + state.w > wall) {
        state.x = wall - state.w;
        state.vx *= -2;
    }

    if (state.x < 0) {
        state.x = 0;
        state.vx *= -0.6;
    }

    if (keys["d"]) {
        state.vx += 0.1;
    }

    if (keys["a"]) {
        state.vx -= 0.1;
    }
}

loop();