import Phaser from "phaser";
import groundImg from "../assets/ground.png";
import dinoImg from "../assets/dino-idle.png";
import dinorunImg from "../assets/dino-run.png";
import dinoduckImg from "../assets/dino-duck.png";
import bigcactiOneImg from "../assets/bigcacti-1.png";
import bigcactiTwoImg from "../assets/bigcacti-2.png";
import bigcactiThreeImg from "../assets/bigcacti-3.png";
import smallcactiOneImg from "../assets/smallcacti-1.png";
import smallcactiTwoImg from "../assets/smallcacti-2.png";
import smallcactiThreeImg from "../assets/smallcacti-3.png";

var player;
var cursors;
var startBox;
var obstacles;
var runGame = false;
var firstTime = true;
var renderTime = 0;
const width = 1000;
const height = 300;
const scale = 0.5;

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    //**********LOAD IMAGES********//
    this.load.image("ground", groundImg);
    this.load.image("dino-idle", dinoImg);
    //**********LOAD SPRITEs********//
    this.load.spritesheet("dino-run", dinorunImg, {
      frameWidth: 88,
      frameHeight: 94,
    });
    this.load.spritesheet("dino-duck", dinoduckImg, {
      frameWidth: 118,
      frameHeight: 94,
    });
    //**********LOAD OBSTACLES********//
    this.load.image("cacti1", bigcactiOneImg);
    this.load.image("cacti2", bigcactiTwoImg);
    this.load.image("cacti3", bigcactiThreeImg);
    this.load.image("cacti4", smallcactiOneImg);
    this.load.image("cacti5", smallcactiTwoImg);
    this.load.image("cacti6", smallcactiThreeImg);
  }

  create() {
    //**********SET UP STATIC OBJECTS********//
    this.speed = 10;
    this.ground = this.add
      .tileSprite(0, height, 100, 26, "ground")
      .setOrigin(0, 1)
      .setScale(scale);

    startBox = this.physics.add
      .sprite(0, height - 200)
      .setOrigin(0, 1)
      .setImmovable();
    player = this.physics.add
      .sprite(0, height, "dino-idle")
      .setOrigin(0, 1)
      .setScale(scale);

    player.setCollideWorldBounds(true);
    player.setGravityY(3000);

    obstacles = this.physics.add.group();
    //**********ANIMATIONS********//

    this.anims.create({
      key: "dino-run-anim",
      frames: this.anims.generateFrameNumbers("dino-run", {
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "dino-duck-anim",
      frames: this.anims.generateFrameNumbers("dino-duck", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();

    //**********START GAME WITH SPACEBAR********//
    // prettier-ignore
    this.physics.add.overlap(startBox, player, () => {
      startBox.disableBody(true,true)
      const expandGround = this.time.addEvent({
        delay: 20,
        loop:true,
        callbackScope: this,
        callback: () =>{
          player.anims.play("dino-run-anim", true);
          if(this.ground.width<width/scale){
            if (player.body.deltaAbsY() == 0) {
              this.ground.width += width / 40;
              player.setVelocityX(60)
            }
          } else{
            this.ground.width = width/scale
            runGame = true
            player.setVelocityX(0);
            expandGround.remove()
          
          }
        }
      })
   
    }, null, this);
  }
  renderObstacles() {
    const obstacleNum = Math.floor(Math.random() * 6 + 1);
    const distanceBetween = Phaser.Math.Between(600, 900);
    console.log(obstacleNum);
    let obstacle;
    obstacle = obstacles.create(
      width + distanceBetween,
      height,
      `cacti${obstacleNum}`
    );
    obstacle.body.offset.y = 10;
    obstacle.setOrigin(0, 1).setImmovable().setScale(scale);
  }

  keyCommands() {
    if (cursors.down.isDown) {
      player.body.height = 58 * scale;
      player.body.offset.y = 34;
    }
    if (cursors.up.isDown) {
      player.body.height = 92 * scale;
      player.body.offset.y = 0;
    }

    if (player.body.deltaAbsY() > 0) {
      player.anims.stop();
      player.setTexture("dino-run");
    } else {
      if (player.body.height == 92 * scale) {
        player.anims.play("dino-run-anim", true);
      } else {
        player.anims.play("dino-duck-anim", true);
      }
    }
  }

  update(time, delta) {
    if (cursors.space.isDown && player.body.onFloor()) {
      player.body.height = 92 * scale;
      player.body.offset.y = 0;
      player.setVelocityY(-1000);
      console.log("jump");
    }
    //**********START GAME********//
    if (runGame) {
      this.ground.tilePositionX += this.speed;
      //**********OBSTACLES********//
      Phaser.Actions.IncX(obstacles.getChildren(), -this.speed * scale);
      renderTime += delta * this.speed * 0.08;
      console.log(renderTime);
      const timeBetweenObstacles = Math.floor(Math.random() * 1000 + 800);
      if (renderTime >= 1500 && firstTime) {
        this.renderObstacles();
        renderTime = 0;
        firstTime = false;
      } else if (renderTime >= timeBetweenObstacles && !firstTime) {
        this.renderObstacles();
        renderTime = 0;
        firstTime = false;
      }
      this.keyCommands();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  width: 1000,
  height: 300,
  scene: MyGame,
};

export default function Game() {
  const game = new Phaser.Game(config);
}
