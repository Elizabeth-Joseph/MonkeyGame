//HEARTY WELCOME TO MY PROJECT 16, HOPE YOU WILL ENJOY IT 

//declaring the variables(global variables)
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey;
var ground;
var bananaGroup; 
var obstacleGroup;
var score=0;
var survivalTime =0;

function preload(){
  
  //preloading the images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  appleImg = loadImage("circle-cropped.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImg=loadImage("forest.jpg");
  gameOverImg= loadImage("game.jpg");
  
}

function setup() {
  //creating the canvas
  createCanvas(400, 400);
  
  //creating the forest background
  forestbackground= createSprite(200,200,400,400);
  forestbackground.addImage(backgroundImg);
  forestbackground.scale = 1;
  
  //creating the monkey
  monkey= createSprite(40,350,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating an invisible ground
  invisibleGround = createSprite(400,380,900,10);
  invisibleGround.visible = false;
  console.log(invisibleGround.x);
  
  //creating gameover
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale=1.30;
  
  //creating obstacles group and banana group
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  
}


function draw() {
  background("white");
  
  //making the functions to be excecuted when gameState is PLAY
  if(gameState === PLAY){
    
    gameOver.visible = false;
    
   // moving the ground
    forestbackground.velocityX = -3 
  
  //placing the forestbackground symmetrically on the screen 
  if (forestbackground.x < 0){
      forestbackground.x = forestbackground.width/2;
    }
  
  //making the monkey jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  
  //spawing the bananas
  spawnBanana();
  
  //spawing the apples
  spawnApple();
  
  //spawning the obstacles
  spawnObstacles();
  
  //adding gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.5;

  //increasing the survival time
  survivalTime = Math.ceil(frameCount/frameRate());
    
    //scoring
    if(bananaGroup.isTouching(monkey)){
        
      score=score+1;
     bananaGroup.destroyEach();
        
    }
    
    //changing the gamestate to end when the monkey touches any obstacles
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      bananaGroup.destroyEach();
        
    }
    
    //making the functions to be excecuted when gameState is END
  }else if (gameState === END) {
    
    gameOver.visible = true;
    
    //changing the background when game is over
      forestbackground.visible=false;
    background("black");
  
    //stopping the game
     forestbackground.velocityX = 0;
    invisibleGround.velocityX=0;
      monkey.velocityY = 0;
    
     //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
    
  }
  
  //making the monkey collide with the invisible ground
   monkey.collide(invisibleGround);
  
   fill("yellow");
    textFont("Comic Sans MS");
    textSize(15);
  
  
  drawSprites();
  
  //Displaying score and survival time
  text("Score : "+ score,100,30);
  text("Survival Time : "+ survivalTime,200,30);
  
}

function spawnBanana() {
  
  //creating bananas after every 80 frames
if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assigning lifetime to the variable
    banana.lifetime = 200;
    
    //adjusting the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
   //adding banana to the banana group
    bananaGroup.add(banana);
  
  }
}

function spawnApple() {
  
  //creating apples after every 207 frames
if (frameCount % 207 === 0) {
    var apple = createSprite(600,120,40,10);
    apple.y = Math.round(random(100,180));
    apple.addImage(appleImg);
    apple.scale = 0.150;
    apple.velocityX = -3;
    
     //assigning lifetime to the variable
    apple.lifetime = 200;
    
    //adjusting the depth
    apple.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
   //adding apple to the banana group
    bananaGroup.add(apple);
  
  }
}

function spawnObstacles() {
  
  //creating obstacles after every 300 frames
if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,350,40,10);
    obstacle.y = Math.round(random(350,370));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assigning lifetime to the variable
    obstacle.lifetime = 300;
    
    //adjusting the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
  //adding obstacle to the obstacle group
    obstaclesGroup.add(obstacle);
  
  }
}
//THANK YOU 