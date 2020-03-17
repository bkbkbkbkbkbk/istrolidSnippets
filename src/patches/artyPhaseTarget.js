
    types.ArtilleryBullet.prototype.draw = function() {
        var color, dist, size;
        types.ArtilleryBullet.__super__.draw.call(this);
        if (this.hitPos) {
          dist = Math.min(v2.distance(this.pos, this.hitPos), 1000);
          size = Math.pow(1.003, -dist) * this.aoe / 162;
          color = [255, 0, 0, 80];
          if (this.side === 'beta')
              color = [0, 66, 200, 130];
  // if(this.origin && this.origin.color)
  //     {
  //         color = this.origin.color.slice();
  //         color[3] = 80;
  //     }
  // else 
  //       color = [255, 0, 0, 80];
          baseAtlas.drawSprite("img/point02.png", this.hitPos, [this.aoe / 256, this.aoe / 256], 0, color);
          baseAtlas.drawSprite("img/fire02.png", this.hitPos, [size * 2, size * 2], 0, color);
        }
      };
  
  
  
     types.Bomb.prototype.draw = function() {
        var color, dist, size;
        if (!this.trail) {
          this.trail = new Trail(this.id, this.trailSize, this.trailTime, this.color, this.z);
        }
        this.trail.grow(this.pos);
        types.Bomb.__super__.draw.call(this);
        this.z = 1;
        this.trail.z = 1 - 0.0001;
        if (this.life === 28) {
          this.image = "parts/bombActive.png";
          playSound("sounds/weapons/wizzzz.wav");
        }
        if (this.hitPos) {
          dist = Math.min(v2.distance(this.pos, this.hitPos), 1000);
          size = Math.pow(1.003, -dist) * this.aoe / 162;
          color = [255, 0, 0, 80];
          if (this.side === 'beta')
              color = [0, 66, 200, 130];
  // if(this.origin && this.origin.color)
  //      {
  //         color = this.origin.color.slice();
  //         color[3] = 80;
  //     }
  // else 
  //       color = [255, 0, 0, 80];
          baseAtlas.drawSprite("img/point02.png", this.hitPos, [this.aoe / 256, this.aoe / 256], 0, color);
          baseAtlas.drawSprite("img/fire02.png", this.hitPos, [size * 2, size * 2], 0, color);
        }
      };
  