var dog,dogImg,dogHappy; 
var database;
var foodStock;
var foodS;
var milk;
var af,gf;
var fedTime,lastFed,foodObj;
var tooMuchFood,lazy,sick;

function preload(){
  dogIMG = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
  milk = loadImage("Milk.png");
  tooMuchFood = loadImage("virtual pet images/deadDog.png");
  lazy = loadImage("virtual pet images/lazy.png");
  sick = loadImage("virtual pet images/Injection.png");
}

function setup() {
  createCanvas(800, 700);	
  database = firebase.database();

  gf = createButton("Feed the dog");
  gf.position(700,95);
  gf.mousePressed(feedDog);

  af = createButton("Add Food");
  af.position(800,95);
  af.mousePressed(addFoods);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(430,500);
  dog.addImage(dogIMG);
  dog.scale = 0.3;
}


function draw() {
  rectMode(CENTER);
  background(46, 139, 87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  if(foodS > 0){
    foodObj = createSprite(370,600,70,70);
    foodObj.addImage("Milk.png",milk);
    foodObj.scale = 0.2;
  }

  drawSprites();
  textSize(20);
  fill("black");
  textSize(20);
  fill("black");
  text("Food Remaning: "+foodS,350,200);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : " + lastFed%12 + " PM",350,30);
  }
  else if(lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }
  else{
    text("Last Feed : " + lastFed + " AM",350,30);
  }
  if(foodS == 0){
    dog.addImage(tooMuchFood);
  }
  if (foodS == 30 ){
    dog.addImage(lazy);
  }
  if(foodS == 10){
    dog.addImage(sick);
  }   
}
function readStock(data){
  foodS = data.val();
}
function feedDog(){
  dog.addImage(dogHappy);

  if (foodS == 0){
    foodS = 0;
    dog.addImage(dogImg);
  }
  else{

  foodS--;
  database.ref('/').update({
    food:foodS
  })
}

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    fedTime:hour()
  })
} 
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}