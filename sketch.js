var dog,dogHappu; 
var canvas;
var database;
var foodStock;
var foodS;

function preload(){
  dog = loadImage("images/dogImg.png");
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
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
}
function readStock(data){
  foodStock = data.val();
}
function writeStock(x){
  if (x<0){
    x = 0;
  }
  else{
    x = x -1;
  }
  database.ref('/').update({
    Food : x
  })
}