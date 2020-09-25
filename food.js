class Food{
    constructor(x,y){
        this.foodStock;
        this.lastFed;
    }
    preload(){
        this.image = loadImage("Milk.png");
    }
    getFoodStock(){
    var foodRef = database.ref('playerCount');
    foodRef.on("value",(data)=>{
      foodS = data.val();
    })
    }
    updateFoodStock(food){
    database.ref('/').update({
        foodS: food
      });
    }
    deductFood(){
    }
    display(){
        var x=80,y=100;

        image(CENTER);
        image(this.image,720,220,70,70);

        if (this.foodStock!=0){
            for(var i = 0; 1<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}