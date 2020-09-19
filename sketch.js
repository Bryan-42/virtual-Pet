var dog,dogImg,dogHappy; 
var canvas;
var database;
var foodStock;
var foodS;
var Food;
var x = 0;

function preload(){
  dogIMG = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  canvas = createCanvas(800, 700);	
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {
  rectMode(CENTER);
  background(46, 139, 87);
  dog = createSprite(430,500);
  dog.addImage("images/dogImg.png",dogIMG);
  dog.scale = 0.3
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("images/dogImg1.png",dogHappy);
  }
  drawSprites();
  textSize(20);
  fill("black");
  text("Note: Press UP_AROW Key To Feed Drago Milk!",200,100);
  textSize(20);
  fill("black");
  text("Food Remaning: "+foodStock,350,200);
}
function readStock(data){
  foodStock = data.val();
}
function writeStock(x){
  if (x<0){
    console.log(x);
  }
  else{
    x = x -1;
    console.log(x);
  }
  database.ref('/').update({
    Food : x
  });
}
