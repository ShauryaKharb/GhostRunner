var sound;
var gameState="play";
var ghost,ghostImage;
var tower,towerImage;
var invisibleBlock,invisibleBlockG;
var door,doorImage,doorG;
var climber,climberImage,climberG;
var edge;

function preload(){
  
  ghostImage=loadImage("ghost-standing.png");
  
  towerImage=loadImage("tower.png");
  
  doorImage=loadImage("door.png");
  
  climberImage=loadImage("climber.png");
  
  sound=loadSound("spooky.wav");
  
}
function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300,30,30);
  tower.addImage("castle",towerImage);
  tower.velocityY=2;
  tower.scale=1.05
  
  ghost=createSprite(300,400,30,30);
  ghost.addImage("stanging",ghostImage);
  ghost.scale=0.5;
  
  doorG=createGroup();
  climberG=createGroup();
  invisibleBlockG=createGroup();
  
  //sound.addSound(soundS);
  sound.play();
  
}

function draw(){
  background(0);
  
  edge=createEdgeSprites();
  
  if (gameState==="play"){
    
  
  
  if (tower.y>600){
    tower.y=0;
  }
  
  ghost.velocityY+=0.5;
  
  if (keyDown("SPACE")){
    ghost.velocityY=-10;
  }
  
  if (keyDown("RIGHT_ARROW")){
    ghost.velocityX=5;
  }
  
  if (keyDown("LEFT_ARROW")){
    ghost.velocityX=-5;
  }
  
  if (climberG.isTouching(ghost) || ghost.isTouching(edge[3])){
    ghost.destroy();
    gameState="end";
  }  
  spawn_doors_climbers();
  
  drawSprites();
  }
  if (gameState==="end"){
    sound.stop();
    fill("yellow");
    textSize(30);
    strokeWeight(3);
    stroke("red");
    text("GAME OVER",230,250);
  }
}

function spawn_doors_climbers(){
  if (frameCount%240===0){
    door=createSprite(50,-80,30,30);
    door.addImage("window",doorImage);
    door.velocityY=2;
    door.lifetime=320;
    door.depth=ghost.depth;
    ghost.depth+=1;
    doorG.add(door);
    
    climber=createSprite(200,-10,20,20);
    climber.addImage("Climbers",climberImage);
    climber.velocityY=2;
    climber.lifetime=320;
    climber.depth=ghost.depth;
    ghost.depth+=1;
    climberG.add(climber);    
    
    invisibleBlock=createSprite(200,-17,climber.width,2);
    invisibleBlock.velocityY=2;
    invisibleBlock.debug=true;
    invisibleBlockG.add(invisibleBlock);
    
    door.x=Math.round(random(150,400));
    
    climber.x=door.x;
    invisibleBlock.x=door.x;
    
  }
}