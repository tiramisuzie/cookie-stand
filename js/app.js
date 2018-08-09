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

Stores.prototype.addStoreInfo = function (){
  var trContainer = document.createElement('tr');
  var thLocation = document.createElement('th');
  thLocation.textContent = this.location;
  trContainer.appendChild(thLocation);

  this.sales.forEach(sale => {
    var td = document.createElement('td');
    td.textContent = sale;
    trContainer.appendChild(td);
  });
  var table = document.getElementById('tableOfCookies');
  table.appendChild(trContainer);
};

new Stores('1st and Pike', 23, 65, 6.3);
new Stores('SeaTac Airport', 3, 24, 1.2);
new Stores('Seattle Center', 11, 38, 3.7);
new Stores('Capitol Hill', 20, 38, 2.3);
new Stores('Alki', 2, 16, 4.6);

//loops through each store to get cookie location per store
function calculateSales(store) {
  store.sales = cookiesPerLocation(storeHours, store.avgCookies, store.minCust, store.maxCust);
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
function addTableHeader() {
  var table = document.getElementById('tableOfCookies');
  var trContainer = document.createElement('tr');

  for (var j = 0; j < storeHours.length; j++) {
    var thHours = document.createElement('th');
    thHours.textContent = storeHours[j];
    trContainer.appendChild(thHours);
  }
  table.appendChild(trContainer);
}
//protype for it's own store add content to the table

function forFooter () {
  var tr = document.createElement('tr');
  var thTotal = document.createElement('th');
  thTotal.textContent = 'Total';
  tr.appendChild(thTotal);
  var tfoot = document.getElementById('totalfooter');
  for (var i=0; i<storeHours.length-1; i++) {
    var thtotals = document.createElement('th');
    var storeHourlyTotal = 0;
    for (var j=0; j < stores.length; j++){
      var singleStoreCookies = stores[j].sales[i];
      storeHourlyTotal = storeHourlyTotal + singleStoreCookies;
    }
    thtotals.textContent = storeHourlyTotal;
    tr.appendChild(thtotals);

  }
  if (tfoot.firstChild) {
    tfoot.removeChild(tfoot.firstChild);
  }
  tfoot.appendChild(tr);
}
for (var m = 0 ; m < stores.length ; m++) {
  calculateSales(stores[m]);
}
addTableHeader();
for (var i=0 ; i<stores.length ; i++) {
  stores[i].addStoreInfo();
}
forFooter();


//when a user submits the form, display that information in the table
var formElt = document.getElementById('storeForm');
formElt.addEventListener('submit', function(e){
  e.preventDefault();
  console.log ('they submitted the form');
  var storeCreatedFromForm = new Stores (e.target.locationName.value, parseInt(e.target.minCust.value), parseInt(e.target.maxCust.value), parseInt(e.target.avgCookies.value));
  calculateSales(storeCreatedFromForm);
  storeCreatedFromForm.addStoreInfo();
  forFooter();
});

