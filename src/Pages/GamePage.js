import Phaser from "phaser";
import backgroundImg from "../assets/background.png";
import groundImg from "../assets/ground.png";
import dinoImg from "../assets/dino-idle.png";
import starImg from "../assets/star.png";
import bombImg from "../assets/bomb.png";

var player;
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
    this.load.image("bomb", bombImg);
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

    this.jump();
    // this.physics.add.collider(player, platforms);
  }

  jump() {
    this.input.keyboard.on("keydown_SPACE", () => {
      player.setVelocityY(-1000);
    });
  }

  update() {
    this.ground.tilePositionX += this.speed;
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
