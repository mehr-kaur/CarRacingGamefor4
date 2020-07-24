class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200);
    car1.addImage("car1", car1image);
    car1.scale = 2;
    
    car2 = createSprite(300, 200);
    car2.addImage("car2", car2image);
    car2.scale = 2;

    car3 = createSprite(500, 200);
    car3.addImage("car3", car3image);
    car3.scale = 2;

    car4 = createSprite(700, 200);
    car4.addImage("car4", car4image);
    car4.scale = 2;

    cars = [car1, car2, car3, car4]
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background("#464646");
    image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
      
     var index = 0;
     var x = 160;
     var y;

      for(var plr in allPlayers){
        index = index+1;
        x = x+450;
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if (index === player.index) {
          stroke(10);
          fill("red");          
          ellipse(x, y, 60, 160);
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y; 
        }
    }
  }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if (player.distance>7000) {
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }
  end() {
    console.log("game ended");
    console.log(player.rank);
    
  }
}

