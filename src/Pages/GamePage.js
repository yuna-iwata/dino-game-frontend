import Phaser from "phaser";
import backgroundImg from "../assets/background.png";
import groundImg from "../assets/ground.png";
import dinoImg from "../assets/dino-idle.png";
import dinorunImg from "../assets/dino-run.png";
import dinoduckImg from "../assets/dino-duck.png";
import starImg from "../assets/star.png";

var player;
var cursors;
var startBox;
var runGame = false;
const width = 1000;
const height = 300;

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("background", backgroundImg);
    this.load.image("ground", groundImg);
    this.load.image("star", starImg);
    this.load.image("dino-idle", dinoImg);
    this.load.spritesheet("dino-run", dinorunImg, {
      frameWidth: 88,
      frameHeight: 94,
    });
    this.load.spritesheet("dino-duck", dinoduckImg, {
      frameWidth: 118,
      frameHeight: 94,
    });
  }

  create() {
    this.speed = 10;
    this.ground = this.add
      .tileSprite(0, height, 100, 26, "ground")
      .setOrigin(0, 1);
    // platforms.create(200, 200, "ground").setScale(2).refreshBody();

    startBox = this.physics.add
      .sprite(0, height - 200)
      .setOrigin(0, 1)
      .setImmovable();
    player = this.physics.add.sprite(0, height, "dino-idle").setOrigin(0, 1);

    player.setCollideWorldBounds(true);
    player.setGravityY(3000);

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

    // prettier-ignore
    this.physics.add.overlap(startBox, player, () => {
      startBox.disableBody(true,true)
      const expandGround = this.time.addEvent({
        delay: 20,
        loop:true,
        callbackScope: this,
        callback: () =>{
          player.anims.play("dino-run-anim", true);
          if(this.ground.width<width){
            if (player.body.deltaAbsY() == 0) {
              this.ground.width += width / 40;
              player.setVelocityY(300)
            }
          } else{
            this.ground.width = width
            runGame = true
            player.setVelocityY(0);
            expandGround.remove()
          
          }
        }
      })
   
    }, null, this);

    // this.physics.add.collider(player, platforms);
  }

  update() {
    if (cursors.space.isDown && player.body.onFloor()) {
      player.body.height = 92;
      player.body.offset.y = 0;
      player.setVelocityY(-1000);
      console.log("jump");
    }
    if (runGame) {
      this.ground.tilePositionX += this.speed;

      if (cursors.down.isDown) {
        player.body.height = 58;
        player.body.offset.y = 34;
      }
      if (cursors.up.isDown) {
        player.body.height = 92;
        player.body.offset.y = 0;
      }

      if (player.body.deltaAbsY() > 0) {
        player.anims.stop();
        player.setTexture("dino-run");
      } else {
        if (player.body.height == 92) {
          player.anims.play("dino-run-anim", true);
        } else {
          player.anims.play("dino-duck-anim", true);
        }
      }
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

export default function GamePage() {
  const game = new Phaser.Game(config);
}
