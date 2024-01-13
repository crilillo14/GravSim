let grav = 50;
let dampingFactor = 0.99;
let smoothingRadius = 1000;
let G = 0.00000001;

class Particle {
    constructor(x, y, mass) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-.1 , .1) , random(-.1 , .1));
      this.acceleration = createVector(0, 0);
      this.radius = random(0.5 , 10);
      this.color = [0 , 212 , 255]
      this.alpha = 255
      this.force = createVector(0,0);
      if (mass) {
        this.mass = mass;
        this.radius = sqrt(mass)
      } else this.mass = pow(this.radius , 2);
    }

    update() {

        let AccDueToGravity = this.force.copy().mult(1/this.mass)
        // Universal force, F = GMm / r^2 = ma , F / m = a
        this.acceleration.add(AccDueToGravity).mult(1/deltaTime);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.force.mult(0); 
        this.velocity.mult(dampingFactor)
        // reseting force

        this.color[0] = this.velocity.mag() *   (1 / 255); // darker blue for faster particles
    }

    getGravitationalForce (particles) {

        

        
        for(let other of particles) {

            if(other == this) {
                continue;
            }

            else if(this.position.dist(other.position) < smoothingRadius){
                // calculating force with newtons universal law of graviation
                let segment = p5.Vector.sub(other.position, this.position);
                //let distSq = segment.magSq();
                // let forceMagnitude = (1 / (distSq + 0.05)) * G * this.mass * other.mass
                let forceMagnitude = this.getInfluence(this, other) * G * this.mass * other.mass;
                let force = segment.setMag(forceMagnitude)
                this.force.add(force)
            }

        }
    }

    getInfluence(particle, otherParticle) {
        let dist = particle.position.dist(otherParticle.position)
        let influence = max(0 , smoothingRadius - dist);
        return influence * influence ;
    }

    show() {
        fill(this.color[0] , this.color[1], this.color[2], this.alpha)
        circle(this.position.x, this.position.y , this.radius * 2)
    }



    checkCollision() {
        if(this.position.y + this.radius > height) {
            this.velocity.y *= -1 * dampingFactor;
            this.position.y = height - this.radius; 
        } else if(this.position.y - this.radius < 0) {
            this.velocity.y *= -1 * dampingFactor;
            this.position.y = this.radius; 
        }
        if(this.position.x + this.radius > width) {
            this.velocity.x *= -1 * dampingFactor;
            this.position.x = width - this.radius; 
        } else if(this.position.x - this.radius < 0) {
            this.velocity.x *= -1 * dampingFactor;
            this.position.x = this.radius; 
        }

        
    }
  }
  