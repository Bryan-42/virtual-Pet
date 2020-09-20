var dog,dogImg,dogHappy; 
var database;
var foodStock;
var foodS;
var Food;

function preload(){
  dogIMG = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 700);	
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(430,500);
  dog.scale = 0.3;
}


function draw() {
  rectMode(CENTER);
  background(46, 139, 87);

  if (keyDown(UP_ARROW)){
    dog.addImage(dogHappy);
  }
  else{
    dog.addImage(dogIMG);
  }
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
  }
  drawSprites();
  textSize(20);
  fill("black");
  text("Note: Press UP_AROW Key To Feed Drago Milk!",200,100);
  textSize(20);
  fill("black");
  text("Food Remaning: "+foodS,350,200);
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if (x<=0){
    x=0;
    console.log(x);
  }
  else{
    x = x-1;
    console.log(x);
  }
  database.ref('/').update({
    Food : x
  });
}
