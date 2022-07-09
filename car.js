class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }

  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
  }

  //private method
  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed) {
      this.speed = -this.maxSpeed / 2;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    // to stop it from continuously moving even at very low speed
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    //to flip right and left directions according to forward and backward movement
    //also the car doesn't rotate standing at one place anymore, as it cannot rotate without any speed (translation)
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    //picture unit circle in mind
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(
      //   this.x - this.width / 2,
      //   this.y - this.height / 2,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.fillStyle = "blue";
    ctx.fill();
    //otherwise we would be translating and rotating on each frame of the animation
    ctx.restore();

    this.sensor.draw(ctx);
  }
}
