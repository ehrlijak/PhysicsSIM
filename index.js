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

function resolveCollisions() {
    for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
            let a = entities[i];
            let b = entities[j];

            let overlapX = (a.x + a.w / 2) - (b.x + b.w / 2);
            let overlapY = (a.y + a.h / 2) - (b.y + b.h / 2);
            let halfWidths = (a.w + b.w) / 2;
            let halfHeights = (a.h + b.h) / 2;

            if (Math.abs(overlapX) < halfWidths && Math.abs(overlapY) < halfHeights) {
                let dx = halfWidths - Math.abs(overlapX);
                let dy = halfHeights - Math.abs(overlapY);

                if (dx < dy) {
                    let push = dx / 2 * Math.sign(overlapX);
                    a.x += push; b.x -= push;
                    let v1 = ((a.mass - b.mass) * a.vx + 2 * b.mass * b.vx) / (a.mass + b.mass);
                    let v2 = ((b.mass - a.mass) * b.vx + 2 * a.mass * a.vx) / (a.mass + b.mass);
                    a.vx = v1; b.vx = v2;
                } else {
                    let push = dy / 2 * Math.sign(overlapY);
                    a.y += push; b.y -= push;
                    let v1 = ((a.mass - b.mass) * a.vy + 2 * b.mass * b.vy) / (a.mass + b.mass);
                    let v2 = ((b.mass - a.mass) * b.vy + 2 * a.mass * a.vy) / (a.mass + b.mass);
                    a.vy = v1; b.vy = v2;
                }
            }
        }
    }
}

// let state = {
//     x: 100,
//     y: 50,
//     w: 50,
//     h: 50,
//     mass: 10,
//     vx: 0,
//     vy: 0
// };

let entities = [
    { x: 100, y: 50, w: 50, h: 50, mass: 10, vx: 0, vy: 0, color: "red", isPlayer: true },

    { x: 300, y: 100, w: 60, h: 60, mass: 8, vx: 0, vy: 0, color: "blue" },
    { x: 500, y: 200, w: 40, h: 40, mass: 5, vx: 0, vy: 0, color: "green" },
];

bg.onload = () => {
    loop();
};

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(loop);
}

// function draw() {
//     ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
//
//     ctx.fillStyle = "red";
//     ctx.fillRect(state.x, state.y, state.w, state.h);
// }

function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    for (let e of entities) {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.w, e.h);
    }
}

function update() {
    let gravityForce = 1;
    let friction = 0.9;

    for (let e of entities) {
        let ay = gravityForce / e.mass;
        e.vy += ay;
        e.x += e.vx;
        e.y += e.vy;

        if (e.y + e.h > floor) { e.y = floor - e.h; e.vy *= -friction; e.vx *= 0.9; }
        if (e.x + e.w >= wall) { e.x = wall - e.w; e.vx *= -1; }
        if (e.x < 0) { e.x = 0; e.vx *= -0.6; }
    }

    let p = entities[0];
    if (keys["d"]) p.vx += 0.1;
    if (keys["a"]) p.vx -= 0.1;
    if (keys["w"]) p.vy -= 0.1;
    if (keys["s"]) p.vy += 0.1;

    resolveCollisions();
}

loop();