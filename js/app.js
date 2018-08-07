'use strict';
console.log ('js loaded');

var pike = {
  location: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  avgCookies: 6.3

};

var seaTac= {
  location: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  avgCookies: 1.2
};

var seattleCenter= {
  location:'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCookies: 3.7


};

var capitolHill= {
  location:'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookies: 2.3

};

var alki= {
  location: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookies: 4.6
};

var stores = [ pike, seaTac, seattleCenter, capitolHill, alki ];
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

//loops through each store to get cookie location per store
function calculateSales(stores) {
  stores.forEach ( store => {
    store.sales = cookiesPerLocation(storeHours, store.avgCookies, store.minCust, store.maxCust);
  });
}
//simulated cookies per hour from 6am-8pm
function cookiesPerLocation(storeHours, avgCookies, mincust, maxCust){
  var salesPerHours = [];
  var totalAmountOfCookies = 0;
  for (var i = 0; i < storeHours.length; i++) {
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

calculateSales(stores);

//Display values of each array as unordered lists in the browser
function cookiesPerTime() {
  var locationHeading = document.getElementById('location-heading');

  for (var i = 0; i < stores.length; i++) {
    var liTitle = document.createElement('li');

    var h1 = document.createElement('h1');
    h1.textContent = stores[i].location;

    liTitle.appendChild(h1);

    var ul = document.createElement('ul');
    stores[i].sales.forEach( sale => {
      var li = document.createElement('li');
      li.textContent = sale.hours + ': ' + sale.storedCookies + ' cookies';
      ul.appendChild(li);
    });
    liTitle.appendChild(ul);

    locationHeading.appendChild(liTitle);
  }
}

cookiesPerTime()();