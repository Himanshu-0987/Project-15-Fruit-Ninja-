var knife,knifeimage,gamover,oversound;
var
   fruit,f1,f2,f3,f4,fruitgroup,r,position,position2;
var alien,a,alienimage,aliengroup;
var gameState=1;
var END=0;
var PLAY=1;
var score;
var fruitcutsound,oversound;
function preload(){
  knifeimage=loadImage("sword.png");
  gameover=loadImage("gameover.png");
  f1=loadImage("fruit1.png");
  f2=loadImage("fruit2.png");
  f3=loadImage("fruit3.png");
  f4=loadImage("fruit4.png");
  a=loadAnimation("alien1.png","alien2.png");
  oversound=loadSound("gameover.mp3");
  fruitcutsound=loadSound("knifeSwooshSound.mp3");
  oversound=loadSound("gameover.mp3");
}
function setup(){
  createCanvas(500,500);
  knife=createSprite(200,300,10,10);
  knife.addImage(knifeimage);
  knife.scale=0.5;
  fruitgroup=new Group();
  aliengroup=new Group();
  score=0;
}

function draw(){
background("lightgrey");
  if(gameState===PLAY){
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    spawnfruits();
    spawnmonsters();
    text("Score : "+ score,400,30);
  if(fruitgroup.isTouching(knife)){
    fruitgroup.destroyEach();
    fruitcutsound.play();
    score=score+2;
    }
  if(aliengroup.isTouching(knife)){
    gameState=END;
    oversound.play();
    knife.addImage(gameover);
    knife.scale=1.5;
    knife.x=250;
    knife.y=250;
    aliengroup.destroyEach();
    fruitgroup.destroyEach();
    aliengroup.setVelocityXEach(0);
    fruitgroup.setVelocityXEach(0);
   }
    
  }
  drawSprites();
}

function spawnfruits(){
  if(World.frameCount%50===0){
    fruit=createSprite(400,200,20,20);
    position=Math.round(random(1,2));
    if(position===1){
      fruit.x=500;
      fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
        fruit.x=0;
        fruit.velocityX=(7+(score/4));
      }
    }
  
    fruit.scale=0.2
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(f1);
    }else if (r==2){
      fruit.addImage(f2);
    }else if (r==3){
      fruit.addImage(f3);
    }else if (r==4){
      fruit.addImage(f4);
    }
    fruit.y=Math.round(random(40,440));
    //fruit.velocityX=-8
    //fruit.velocityX=-(8+(score/4));
    fruit.setLifetime=100;
    fruitgroup.add(fruit);
  }
  
  
}
function spawnmonsters(){
    if(World.frameCount%150===0){
    alien=createSprite(400,200,20,20);
          position2=Math.round(random(1,2));
    if(position2===1){
      alien.x=500
      alien.velocityX=-(8+(score/10));
    }
    else
    {
      if(position2==2){
        alien.x=0;
        alien.velocityX=(8+(score/10));
      }
    }
    alien.scale=1
      alien.addAnimation("moving",a);
    alien.y=Math.round(random(70,470));
    //alien.velocityX=-6
    //alien.velocityX=-(8+(score/10));
    alien.setLifetime=100;
    aliengroup.add(alien);
      
    }
}

