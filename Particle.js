/**
 * Simple construction of particle class to enable display of bouncing ball parameters
 */


// Forces
var grav = 9.8;
var drag = 0.1;

// Bounce factor
var bouncing = 0.90;
// Time step
var tStep = 0.1;

/**
 * Update gravity, drag and bounce factors based on slider input
 */
function updateParameters() {
  gravity = parseFloat(document.getElementById("gravity").value);
  drag = parseFloat(document.getElementById("drag").value);
  bounce = parseFloat(document.getElementById("bounce").value);
}

class Particle {
  /**
   * The constructor
   */
  constructor() {
    // Initialize Position and Velociy as vec3s and randomize location
    this.position = glMatrix.vec3.create();
    this.velocity = glMatrix.vec3.create();
    glMatrix.vec3.random(this.position);
    glMatrix.vec3.random(this.velocity);
    // Acceleration
    this.accel = glMatrix.vec3.fromValues(0, -0.5 * grav, 0);
    // Radius of particle
    this.radius = (0.7 * Math.random() + 2.0) / 30;
    // Color initilization
    this.R = Math.random();
    this.G = Math.random();
    this.B = Math.random();
  }

  /**
   * Update the position using the current velocity and Euler integration
   */
  updatePosition() {
    // change is increment for position based on velocity and the time step
    var change = glMatrix.vec3.create();
    glMatrix.vec3.scale(change, this.velocity, tStep);
    glMatrix.vec3.add(this.position, this.position, change);

    // Identify bounds and update position/velocity accordingly
    for (var i = 0; i < this.position.length; i++) {
      if (this.position[i] < -1) {
        this.position[i] = -1;
        this.velocity[i] = -this.velocity[i] * bounce;
      }
      if (this.position[i] > 1) {
        this.position[i] = 1;
        this.velocity[i] = -this.velocity[i] * bounce;
      }
    }
  }

  /**
   * Update the velocity using the acceleration and Euler integration and drag
   */
  updateVelocity() {
    glMatrix.vec3.scale(this.velocity, this.velocity, Math.pow((drag), tStep));
    var change = glMatrix.vec3.create();
    glMatrix.vec3.scale(change, this.accel, tStep);
    glMatrix.vec3.add(this.velocity, this.velocity, change);
  }

  /**
   * Update the acceleration using the forces of gravity
   */
  updateAcceleration() {
    this.accel = [0, -0.5 * gravity, 0];
  }
}