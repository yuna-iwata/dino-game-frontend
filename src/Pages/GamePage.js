import Phaser from "phaser";
import backgroundImg from "../assets/background.png";
import groundImg from "../assets/ground.png";
import dinoImg from "../assets/dino-idle.png";
import starImg from "../assets/star.png";

var player;
var cursors;
const width = 800;
const height = 600;

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("background", backgroundImg);
    this.load.image("ground", groundImg);
    this.load.image("star", starImg);
    this.load.image("dino-idle", dinoImg);
  }

  create() {
    this.speed = 10;
    this.ground = this.add
      .tileSprite(0, height, width, 26, "ground")
      .setOrigin(0, 1);
    // platforms.create(200, 200, "ground").setScale(2).refreshBody();

    player = this.physics.add.sprite(0, height, "dino-idle").setOrigin(0, 1);

    player.setCollideWorldBounds(true);
    player.setGravityY(3000);

    cursors = this.input.keyboard.createCursorKeys();

    // this.physics.add.collider(player, platforms);
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    this.ground.tilePositionX += this.speed;
    if (cursors.space.isDown) {
      player.setVelocityY(-330);
      console.log("jump");
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
      debug: false,
    },
  },
  width: 800,
  height: 600,
  scene: MyGame,
};

export default function GamePage() {
  const game = new Phaser.Game(config);
}
