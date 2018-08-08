'use strict';
console.log('js loaded');



var stores = [];
var storeHours = ['Location', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Total'];

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
    salesPerHours[i] = cookies;
    totalAmountOfCookies = totalAmountOfCookies + cookies;
  }

  salesPerHours[i] = totalAmountOfCookies;
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


//Display values of each array as table in the browser
function addInfo() {
  var table = document.getElementById('tableOfCookies');
  var trContainer = document.createElement('tr');



  for (var j = 0; j < storeHours.length; j++) {
    var thHours = document.createElement('th');
    thHours.textContent = storeHours[j];
    trContainer.appendChild(thHours);
  }
  table.appendChild(trContainer);

  for (var i = 0; i < stores.length; i++) {
    trContainer = document.createElement('tr');
    var thLocation = document.createElement('th');
    thLocation.textContent = stores[i].location;
    trContainer.appendChild(thLocation);


    stores[i].sales.forEach(sale => {
      var td = document.createElement('td');
      td.textContent = sale;
      trContainer.appendChild(td);
    });


    table.appendChild(trContainer);
  }
}
function forFooter () {
  var tfoot = document.getElementById('totalfooter');
  for (var i=0; i<storeHours.length-1; i++) {
    var thtotals = document.createElement('th');
    var storeHourlyTotal = 0;
    for (var j=0; j < stores.length; j++){
      var singleStoreCookies = stores[j].sales[i];
      storeHourlyTotal = storeHourlyTotal + singleStoreCookies;
    }
    thtotals.textContent = storeHourlyTotal;
    tfoot.appendChild(thtotals);
  }
}


calculateSales(stores);

addInfo();
forFooter();


//when a user submits the form, display that information in the table
// var formElt = document.getElementById('');
// formElt.addEventListener('submit', function(e){
//   e.preventDefault();
//   console.log ('they submitted the form');
//   var storeCreatedFromForm(, , ,);
//   //how to get them into the table, take "addinfo"
// });

