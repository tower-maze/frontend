// get api response - copy-paste
let textInput = document.getElementById("input")
textInput.addEventListener("input", (e) => {
  data = e.target.value
  if (data) {
    mazeData = JSON.parse(data)
    drawMaze()
  }
})

let mazeData = {};

// get canvas
let maze = document.getElementById("maze");
let mazeContext = maze.getContext("2d", { alpha: false });

// sprites
const sprites = document.createElement("img");
sprites.src = "assets/sprites.png";
sprites.onload = drawMaze

// draw to canvas
function drawMaze() {
  // Display maze data
  if (mazeData.rooms) {
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const room = mazeData.rooms[y][x];
        const connectionCount = room.n + room.e + room.s + room.w
        if (connectionCount === 1) {
          if (room.n) mazeContext.drawImage(sprites, 16 * 0, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.e) mazeContext.drawImage(sprites, 16 * 1, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.s) mazeContext.drawImage(sprites, 16 * 2, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.w) mazeContext.drawImage(sprites, 16 * 3, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        }
        if (connectionCount === 2) {
          if (room.n && room.s) mazeContext.drawImage(sprites, 16 * 4, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.e && room.w) mazeContext.drawImage(sprites, 16 * 5, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.s && room.e) mazeContext.drawImage(sprites, 16 * 6, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.e && room.n) mazeContext.drawImage(sprites, 16 * 7, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.n && room.w) mazeContext.drawImage(sprites, 16 * 8, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.s && room.w) mazeContext.drawImage(sprites, 16 * 9, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        }
        if (connectionCount === 3) {
          if (room.w && room.s && room.e) mazeContext.drawImage(sprites, 16 * 10, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.s && room.e && room.n) mazeContext.drawImage(sprites, 16 * 11, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.e && room.n && room.w) mazeContext.drawImage(sprites, 16 * 12, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.n && room.w && room.s) mazeContext.drawImage(sprites, 16 * 13, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        }
        if (connectionCount === 4) {
          mazeContext.drawImage(sprites, 16 * 14, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        }
        if (room.id == mazeData.start_room) mazeContext.drawImage(sprites, 16 * 15, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        if (room.id == mazeData.exit_room) mazeContext.drawImage(sprites, 16 * 16, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
      }
    }
  }
}
