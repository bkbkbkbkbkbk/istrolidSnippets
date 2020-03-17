// https://pastebin.com/QD3ce7Bn

Engine.prototype.preDraw = function() {
    var ref;
    if (v2.mag(this.unit.vel) > 1) {
      if (!this.trail) {
        this.trail = new Trail(this.unit.id, this.trailSize, this.trailTime / 10, this.unit.color, this.unit.z);
      }
      if ((ref = this.trail) != null) {
        ref.grow(this.worldPos);
      }
      this.trail.color = this.unit.color;
      return this.trail.z = this.unit.z - 0.0001;
    }
  };

StraightMissile.prototype.draw = function() {
    if (!this.trail) {
      this.trail = new Trail(this.id, this.trailSize, this.trailTime / 10, this.color, this.z);
    }
    this.trail.grow(this.pos);
    this.trail.z = this.z - 0.0001;
    return StraightMissile.__super__.draw.call(this);
  };

TrackingMissile.prototype.draw = function() {
    if (!this.trail) {
      this.trail = new Trail(this.id, this.trailSize, this.trailTime / 10, this.color, this.z);
    }
    this.trail.grow(this.pos);
    this.trail.z = this.z - 0.0001;
    return TrackingMissile.__super__.draw.call(this);
  };
