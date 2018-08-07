'use strict';
console.log('js loaded');



var stores = [];
var storeHours = [' ', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

//loops through each store to get cookie location per store
function calculateSales(stores) {
  stores.forEach(store => {
    store.sales = cookiesPerLocation(storeHours, store.avgCookies, store.minCust, store.maxCust);
  });
}
//simulated cookies per hour from 6am-8pm
function cookiesPerLocation(storeHours, avgCookies, mincust, maxCust) {
  var salesPerHours = [];
  var totalAmountOfCookies = 0;
  for (var i = 0; i < (storeHours.length - 2); i++) {
    var cookies = simulatedCookies(avgCookies, mincust, maxCust);
    salesPerHours[i] = { hours: storeHours[i], storedCookies: cookies };
    totalAmountOfCookies = totalAmountOfCookies + cookies;
  }

  salesPerHours[storeHours.length] = { hours: 'Total', storedCookies: totalAmountOfCookies };
  return salesPerHours;
}
//number of simulated cookies (using average cookies purchased and the random number of customers generated)
function simulatedCookies(avgCookies, minCust, maxCust) {
  return Math.floor(getRandomCustomer(minCust, maxCust) * avgCookies);
}

//generates random number of customers
function getRandomCustomer(minCust, maxCust) {
  return Math.floor(Math.random() * (maxCust - minCust) + minCust);
}


//Display values of each array as unordered lists in the browser
function cookiesPerTime() {
  var table = document.getElementById('tableOfCookies');
  var tableHours = document.createElement('th');
  var trContainer = document.createElement('tr');
  var thLocation = document.createElement('th');

  for (var j = 0; j < storeHours.length; j++) {
    var thHours = document.createElement('th');
    thHours.textContent = storeHours[j];
    trContainer.appendChild(thHours);
  }
  table.appendChild(trContainer);

  for (var i = 0; i < stores.length; i++) {
    trContainer = document.createElement('tr');
    thLocation = document.createElement('th');
    thLocation.textContent = stores[i].location;

    trContainer.appendChild(thLocation);




    stores[i].sales.forEach(sale => {
      var td = document.createElement('td');
      td.textContent = sale.storedCookies;
      trContainer.appendChild(td);
    });


    table.appendChild(trContainer);
  }
}
function Stores(location, minCust, maxCust, avgCookies) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  stores.push(this);
}

var pike = new Stores('1st and Pike', 23, 65, 6.3);
var seaTac = new Stores('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Stores('Seattle Center', 11, 38, 3.7);
var capitolHill = new Stores('Capitol Hill', 20, 38, 2.3);
var alki = new Stores('Alki', 2, 16, 4.6);



calculateSales(stores);

cookiesPerTime();


