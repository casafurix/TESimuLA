const carCanvas = document.getElementById("carCanvas");
// canvas.height = window.innerHeight;
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
// canvas.height = window.innerHeight;
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");

const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];

animate();

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();

  carCtx.translate(0, -car.y + carCanvas.height * 0.75);

  //draw road
  road.draw(carCtx);
  //draw traffic
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "blue");
  }
  car.draw(carCtx, "green");

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 60;

  Visualizer.drawNetwork(networkCtx, car.brain);
  requestAnimationFrame(animate);
}
