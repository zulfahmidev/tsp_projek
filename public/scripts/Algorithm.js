var waypoints = [];

var nwps = [];

var order = [];

var recordDistance;
var totalPermutations;
var count = 1;
let bestEver;

var stopLoop = false;
var percent = 0;

let da = 0;
let directionService;
let directionRederer;

async function getRoute() {
  directionService = new google.maps.DirectionsService();
  directionRederer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });
  let broken_towers = Towers.getBrokenTowers();
  let office = Offices.getNearOffice(broken_towers);
  office.setVisible(true);
  waypoints = []
  waypoints.push({
    location: office.getPosition(),
    stopover: true,
  });
  for (let twr of broken_towers) {
    waypoints.push({
      location: twr.getPosition(),
      stopover: true,
    });
  }

  // Init Order Way Points
  waypoints.slice(1).forEach((v, i) => {
    order[i] = i;
  });
  bestEver = order;

  totalPermutations = factorial(waypoints.length);
  let result;
  while (da < 10) {
    await directionService.route({
      origin: waypoints[0].location, destination: waypoints[0].location, waypoints: getWayPoints(),
      travelMode: google.maps.TravelMode['DRIVING'],
    }).then(res => {
      nwps = res.routes[0].legs; // new way points
    
      // Calculating Distance
      var d = calcDistance(nwps, order);
  
      if (d < recordDistance) {
        recordDistance = d;
        bestEver = order.slice();
      }
      percent = 100 * (count / totalPermutations);
      nextOrder();
      da++;
      result = res;
    })
  }
  Towers.setVisibleTowers(false, broken_towers);
  directionRederer.setDirections(result);
  directionRederer.setMap(map.getMap());
}

function resetRoute() {
  directionRederer.setMap(null);
  Offices.setVisible(false);
  dataTable.rows().deselect();
}

function getWayPoints() {
  let row = [];
  order.forEach((v) => {
    row.push(waypoints[v]);
  })
  return row;
}

function swap(i, j) {
  var temp = order[i];
  order[i] = order[j];
  order[j] = temp;
}

function factorial(n) {
  if (n == 1) {
      return 1;
  } else{
      return n * factorial(n - 1);
  }
}

// this is my lexical order algoritma
function nextOrder() {
  count ++;
  var largestI = -1;
  for (let i = 0; i < order.length - 1; i++) {
      if(order[i] < order[i + 1]) {
          largestI = i;
      }
  }
  if (largestI == -1) {
      stopLoop = true;
  }

  //step 2
  var largestJ = -1;
  for (let j = 0; j < order.length; j++) {
      if (order[largestI] < order[j]) {
          largestJ = j;
      }
  }

  //step 3
  swap(largestI, largestJ);
  // console.log(largestI, largestJ)

  //step: reverse from largestI + 1 to the end
  var endArray = order.splice(largestI + 1);
  endArray.reverse();

  order = order.concat(endArray);
}

function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
      var pointAIndex = order[i];
      var pointA = points[pointAIndex];
      sum += pointA.distance.value;
  }
  return sum;
}