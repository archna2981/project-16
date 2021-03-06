//decalaring varibles.
var monkey , monkey_running;

var bananaGroup,banana,bananaImage;
var obstacleGroup,obstacle,obstacleImage;
var ground;

var score;

var PLAY=1;
var END=0;
var gameState = PLAY; 

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyCollide = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400)
 
  //create obstacle and banana Group
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  //creating monkey 
  monkey=createSprite(80,200,20,20);
  monkey.scale=0.16;
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collide",monkeyCollide);
  
  //creating ground
  ground = createSprite(300,280,600,10);
  ground.scale=1;
  
  
  //ground.addAnimation("ground", groundImage);
  //invisiGround = createSprite(300,278,600,7);
  //invisiGround.visible = false;
  
  score=0;   

}


function draw() {
background("green");
  fill("pink");
  textSize(15);
  text("SURVIVAL TIME:"+score,440,20);  

if (gameState === PLAY){
    obstacle();
    banana();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
  //Condition for entering in PLAY state
   if(keyDown("space")){
     gameState=PLAY;
   }
  
    //jump when space is preesed
    if(keyDown("space")&& monkey.y>235) {
      monkey.velocityY = -13; 
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x <300){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){  
      bananaGroup.destroyEach();
    } 
}
  
if (monkey.isTouching(obstacleGroup)){
    gameState = END;
}
  
if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(50);
    text("GAMEOVER!!!", 170, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("moving",monkey_running);
      //monkey.changeAnimation("collide",monkeyCollide);
      score = 0;
      bananaScore = 0;
      gameState = PLAY;       
 } 
}
    drawSprites();
    monkey.collide(ground);
}

function banana() {
if (frameCount%80 === 0){    
    var banana = createSprite(620,120, 50, 50 )
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
  
    bananaGroup.add(banana);
 }    
}

function obstacle() {
if (frameCount%200 === 0){
    var obstacle = createSprite(620,253,50,50);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
  
    obstacleGroup.add(obstacle);  
  }
}







