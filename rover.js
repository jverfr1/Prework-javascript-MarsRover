
var myRover = {
  position: [numeroAleatorio(), numeroAleatorio()], 
  //position: [0,0],
  direction: 'N'
};

var myRover1 = {
	position: [numeroAleatorio(), numeroAleatorio()],
	direction: 'N'
};
var grid = []
var coordenada;
var obs1 = {
  position: [numeroAleatorio(), numeroAleatorio()]
   //position: [3,0]
};
var obs2 = {
  position: [numeroAleatorio(), numeroAleatorio()]
};
var obstaculos = [];
var rovers = [];
var size = 100;
var ctx;

window.onload = function() {
  var crearButton = document.getElementById("crear-button");
  //Enlaza acción con el click sobre el botón crearButton.
  crearButton.addEventListener("click", ejecutar, false);
  //Función que ejecuta al clickerar el botón crear-button
  function ejecutar () {
    var myCanvas;  
    myCanvas = document.createElement("canvas");

    var newDiv = document.createElement("div");
    document.getElementById("johnny").appendChild(newDiv).setAttribute("width","100%");
    newDiv.setAttribute("id","johnny1");
    document.getElementById("johnny1").appendChild(myCanvas);
    myCanvas.setAttribute("width","1000px");
    myCanvas.setAttribute( "height","1000px");
    myCanvas.setAttribute("id","canvas");
    ctx = myCanvas.getContext("2d");
  
    createGrid(10,10);
    printGrid();
    addObstaculos(obs1, obs2);
    moverRover(grid,myRover,"fffrfflffbbb","blue");
    addRovers(myRover, myRover1);
    moverRover(grid,myRover1,"fffrfflffbbb","red")
  }

}
//Traza línes dentro del canvas. Tiene como parámetros las coordenadas x,y y el color deseado para la línea. 
function dibujarRuta(x,y,color) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  //ctx.beginPath();
  ctx.strokeStyle=color;
  ctx.lineWidth="3";
  //ctx.moveTo(0,0);
  ctx.lineTo(x*size,y*size);
  ctx.stroke();
}
function createGrid(x,y) {
  for (i = 0; i<=x; i++) {
  	for (j= 0; j<=y; j++) {
  	  grid.push([i,j]);
  	}
  }
}
function printGrid() {
  for (i in grid) {
  	var coordX = grid[i][0];
  	var coordY = grid[i][1];
  	if ((coordX != 10) && (coordY != 10)) {
      ctx.strokeRect(coordX*size,coordY*size,size,size);
  	}
  }
}
// Método para moverse hacia delante. Recibe como parámetro el objeto que se quiere mover.

function goForward(grid,rover) {
	
  switch(rover.direction) {
	case 'N':
	  if (comparaMaxX(grid,rover) != true) {
	    rover.position[0]++;
		  	    
	  }else {
		 rover.position[0] = minX(grid);
	   }
    break;
	case 'E':
	  if (comparaMaxY(grid,rover) != true) {
	   rover.position[1]++;
		  	
	  }else {
		 rover.position[1] = minY(grid);
	   }
	break;
    case 'S':
	  if (comparaMinX(grid,rover) != true) {
		rover.position[0]--;
		    	
	  }else {
		 rover.position[0] = maxX(grid);
	   }
	break;
    case 'W':
      if (comparaMinY(grid,rover) != true) {
		rover.position[1]--;
		    	
	  }else {
		rover.position[1] = maxY(grid);
	   }
	break;
  }
}

//Devuelve la posición. Recibe como parámertro el objeto del que se quiere saber la posición. 
function getPosition(rover) {

  return rover.position;

}

// Mëtodo para moverse hacia atrás. Recibe como parámetro el objeto que se quiere mover. 

function goBack(grid,rover) {
  switch(rover.direction) {
    case 'N':
  	  if (comparaMinX(grid, rover) != true) {
  		rover.position[0]--;
  		    	  
  	  }else {
  	     rover.position[0] = maxX(grid);
  	   }
    break;
    case 'E':
      if (comparaMinY(grid, rover) != true) {
  		rover.position[1]--;
  		    	  
  	  }else {
  		 rover.position[1] = maxY(grid);
  	   }
    break;
    case 'S': 
  	  if (comparaMaxX(grid, rover) != true) {
  		rover.position[0]++;
  		    	  
  	  }else {
  	     rover.position[0] = minX(grid);
  	   }
    break;
    case "W":
      if (comparaMaxY(grid, rover) != true) {
  		rover.position[1]++;
  		    	  
  	  }else {
  		 rover.position[1] = minY(grid);
  	   }
  }
}
//Método para girar a la derecha. Recibe como parámetro el objeto que se quiere mover. 
function turnRight (rover) {
  switch(rover.direction) {
    case "N": 
	  rover.direction = "E"
    break;
	case "E":
	  rover.direction = "S"
	break;
    case "S":
	  rover.direction = "W"
	break;
	case "W":
      rover.direction = "N"
	break;
  };
}
// Método para girar a la izquierda. Recibe como parámetro el objeto que se quiere mover.
function turnLeft (rover) {
  switch(rover.direction) {
    case "N": 
	  rover.direction = "W"
    break;
	case "E":
	  rover.direction = "N"
    break;
	case "S":
	  rover.direction = "E"
	break;
	case "W":
	  rover.direction = "S"
	break;
  };
}

//Devuelve el límite superior del grid. Recibe como parámetro el grid que se quiere verificar. 
function maxX(array) {
  var a=0;
  for (i in array) {
  		
  	if (array[i][0] > a) {
  	  //console.log("max X " + array[i][0]);
  	  a = array[i][0];
    }
  }
  return a;
}
//Devuelve el límite inferior del grid. Recibe como parámetro el grid que se quiere verificar.
function minX(array) {
  var a = 0;
  for (i in array) {
  	if (array[i][0] < a) {
  	  //console.log("min X " + array[i][0]);
  	  a = array[i][0];
    }
  }
  return a;
}
  //Devuelve el límite superior del grid. Recibe como parámetro el grid que se quiere verificar. 
function maxY(array) {
  var a=0;
  for (i in array) {
    if (array[i][1] > a) {
      a = array[i][1];
    }
   }
  return a;
}
//Devuelve el límite inferior del grid. Recibe como parámetro el grid que se quiere verificar.
function minY(array) {
  var a=0;
  for (i in array) {
  	if (array[i][1] < a) {
  	  a = array[i][1];
  	}
  }
  return a;
}
//Compara la coordenada x del rover con la min coord x del grid 
function comparaMinX(grid, rover) {
  if (rover.position[0] <= minX(grid)) {
  	return true;
  }
}
//Compara la coordenada x del rover con la max coord x del grid
function comparaMaxX(grid,rover) {
  if (rover.position[0] >= maxX(grid)) {
    return true;
  }
}
//Compara la coordenada y del rover con la min coord y del grid 
function comparaMinY(grid, rover) {
  if (rover.position[1] <= minY(grid)) {
  	return true;
  }
}
//Compara la coordenada y del rover con la max coord y del grid 
function comparaMaxY(grid, rover) {
  if (rover.position[1] >= maxY(grid)) {
    return true;
  }
}
//Método que ejectuta las órdenes de movimiento.
function moverRover(grid, rover, ordenes,color) {
  console.log("****** Posición inicial: " + getPosition(rover) + "****************** " + rover.position[0]*size);
  
  
  ctx.beginPath();
  ctx.moveTo(rover.position[0]*size,rover.position[1]*size);
  var imgSalida = document.getElementById("salida");
  ctx.drawImage(imgSalida,rover.position[0]*size,rover.position[1]*size);
  //ctx.arcTo(rover.position[0],rover.position[1],10,0,0);
  for (i in ordenes) {
    switch(ordenes[i]) {
	  case "f":
			
		console.log("++++++++++++++ ADELANTE ++++++++++++++"); 
        goForward(grid,rover);
        dibujarRuta(rover.position[0],rover.position[1],color);

        if (verificarObstaculo(rover,obstaculos) == true) {
		  goBack(grid,rover);
		  console.log("Posición actual tras obstaculo" + getPosition(rover));			  	
          return
        }
	    if (verificarRovers(rover,rovers) == true) {
		  goBack(grid,rover);
		  console.log("Posición actual " +  getPosition(rover));
        }
        console.log("Posición actual: " + getPosition(rover) + " Direccion: " + rover.direction);
        break;
	  case "b":
	    console.log("++++++++++++++ ATRÁS +++++++++++++++++");
        goBack(grid,rover);
        dibujarRuta(rover.position[0],rover.position[1],color);
        if (verificarObstaculo(rover,obstaculos) == true) {
		  goForward(grid,rover);
		  console.log("Posición actual " + getPosition(rover));
          return;
		}
	    if (verificarRovers(rover,rovers) == true) {
		  goForward(grid,rover);
		  console.log("Posición actual " +  getPosition(rover));
        }
		console.log("Posición actual: " + getPosition(rover) + " Direccion: " + rover.direction);
        break;
      case "r": 
	    console.log("++++++++++++++ DERECHA +++++++++++++++");
        turnRight(rover)
        console.log("Posición actual: " + getPosition(rover) + " Direccion: " + rover.direction);
        break;
	  case "l":
	    console.log("++++++++++++++ IZQUIERDA +++++++++++++");
        turnLeft(rover);
        console.log("Posición actual: " + getPosition(rover) + " Direccion: " + rover.direction);
        break;
	}
  }
  console.log("************ Posición final: " + getPosition(rover) + "**************");
  var img= document.getElementById("coche");
  ctx.drawImage(img,rover.position[0]*size,rover.position[1]*size);
}
//Método que convierte un string en un array. Recibe como parámetro el string a convertir. 
function toArray(string) {
  array = [];
  for (i in string) {
    array.push(string.charAt(i).toLowerCase());
  }
  console.log(array);
  //ocument.writeln(array);
  //document.writeln("");
  return array;
}
//Método que devuelve un número entero aleatorio entre 0 y 10
function numeroAleatorio() {
  return Math.floor(Math.random() * 11);
 }
//Método que añade obstáculos al array con dicho nombre
function addObstaculos() {
  for (i in arguments) {		
    obstaculos.push(arguments[i]);
  }
}	
//Método para añadir Rovers al array con dicho nombre
function addRovers() {
  for (i in arguments) {
	rovers.push(arguments[i]);
  }
}
//Método para comprobar si hay obstáculos. Si los hay, lanza un mensaje indicándolo. 
function verificarObstaculo(rover, array) {
  for (i in array) {
		
	if (((rover.position[0]) == array[i].position[0]) && ((rover.position[1]) == array[i].position[1])) {
	  alert("Obstáculo encontrado en las coordenadas: " + array[i].position);
	  return true;
	}
  }
}
//Método que comprueba si dos rovers se encuentran en la misma posición. 
function verificarRovers(rover, arrayRovers) {
  for (i in arrayRovers) {
	if (rover != arrayRovers[i]) {
	  if ((rover.position[0] == arrayRovers[i].position[0]) && (rover.position[1] == arrayRovers[i].position[1])) {
		return true;
	  }
	}
  }	
}
function printObstaculos(array) {
  for (i in obstaculos) {
    return obstaculos[i];
  }
}
function prueba() {
  var position = getPosition(rover);
}
//alert(obstaculos);
//addObstaculos(obs1, obs2);
//addRovers(myRover, myRover1);
//verificarRovers(myRover, rovers);
console.log("*************************************************");
//moverRover(grid, myRover, toArray("fffrfflfffbb"))