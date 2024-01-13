let numpParticles = 500;
let particles = [];
let slider;


function setup() {

  let canvas = createCanvas((7 * windowWidth) / 8, (7 * windowHeight) / 8);
  canvas.parent('canvas-container');

  for(i = 0; i < numpParticles; i++) {
    
    let x = random(width)
    let y = random(height )
    particles[i] = new Particle(x , y);
  }
  
}

function draw() {
  noStroke();
  background(0);

  //updateSpatialLookup();

  for (let p of particles) {
    p.getGravitationalForce(particles);
    p.update();
    //p.checkCollision(particles);
    p.show();
  }

}

function updateSpatialLookup() {
  
}


function mousePressed() {
  fixedParticle = new Particle(mouseX , mouseY, 1000)
  particles.push(fixedParticle)
  
}