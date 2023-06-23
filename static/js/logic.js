// Create a Leaflet map with specified min and max zoom levels, and set the initial view to a specific latitude and longitude with a zoom level of 4
var map = L.map('map', {
  minZoom: 1,
  maxZoom: 10
}).setView([35.75, -90.89], 4);

// Create a tile layer using OpenStreetMap as the source, with attribution information and a maximum zoom level of 18
var openStreetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18
});

// Create a tile layer using Esri World Imagery as the source, with attribution information
var esriWorldImageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Add the OpenStreetMap layer to the map as the default layer
openStreetMapLayer.addTo(map);

// Create a base layer control with two options: OpenStreetMap and Esri World Imagery
var baseLayers = {
  "OpenStreetMap": openStreetMapLayer,
  "Esri World Imagery": esriWorldImageryLayer
};

// Add the base layer control to the map
L.control.layers(baseLayers).addTo(map);

// Make an AJAX request to retrieve earthquake data from a GeoJSON source
$.ajax({
  url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
  method: 'GET',
  dataType: 'json',
  success: function(data) {
    // Call the plotEarthquakes function with the retrieved data
    plotEarthquakes(data);
    // Call the createLegend function to create a legend for the map
    createLegend();
  },
});

// Function to plot earthquake data on the map
function plotEarthquakes(data) {
  // Iterate over each earthquake feature in the data
  data.features.forEach(function(feature) {
    // Extract latitude, longitude, magnitude, and depth information from the feature
    var lat = feature.geometry.coordinates[1];
    var lon = feature.geometry.coordinates[0];
    var magnitude = feature.properties.mag;
    var depth = feature.geometry.coordinates[2];

    // Create a circle marker at the earthquake location with a radius based on magnitude and a fill color based on depth
    var marker = L.circleMarker([lat, lon], {
      radius: magnitude * 3,
      fillColor: getColor(depth),
      color: 'black',
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.6
    }).addTo(map);

    // Bind a popup to the marker displaying information about the earthquake
    marker.bindPopup(
      '<strong>Location:</strong> ' + feature.properties.place + '<br>' +
      '<strong>Magnitude:</strong> ' + magnitude + '<br>' +
      '<strong>Depth:</strong> ' + depth + ' km'
    );
  });
}

// Function to determine the fill color based on the depth of an earthquake
function getColor(depth) {
  // Assign a specific color based on the depth range of the earthquake
  if (depth < 10) {
    return '#e5f5e0';
  } else if (depth < 20) {
    return '#e5f5e0';
  } else if (depth < 30) {
    return '#c7e9c0';
  } else if (depth < 40) {
    return '#a1d99b';
  } else if (depth < 50) {
    return '#74c476';
  } else if (depth < 60) {
    return '#41ab5d';
  } else if (depth < 70) {
    return '#238b45';
  } else if (depth < 80) {
    return '#006d2c';
  } else {
    return '#00441b';
  }
}

// Function to create a legend for the map
function createLegend() {
  // Create a control element for the legend and position it at the bottom right corner of the map
  var legend = L.control({ position: 'bottomright' });

  // Define the behavior of the legend control
  legend.onAdd = function() {
    // Create a div element with the 'legend' class
    var div = L.DomUtil.create('div', 'legend');
    // Define the depth ranges and corresponding labels for the legend
    var depths = [0, 10, 20, 30, 40, 50, 60, 70, 80];
    var labels = ['<10 km', '10-20 km', '20-30 km', '30-40 km', '40-50 km', '50-60 km', '60-70 km', '70-80 km', '>80 km'];

    // Add a title to the legend
    div.innerHTML += '<strong>Earthquake Depth</strong><br>';

    // Iterate over the depth ranges and labels to create the legend rows
    for (var i = 0; i < depths.length; i++) {
      div.innerHTML +=
        '<div class="legend-row">' +
        '<div class="legend-color" style="background:' + getColor(depths[i] + 1) + '"></div>' +
        '<div class="legend-label">' + labels[i] + '</div>' +
        '</div>';
    }

    return div;
  };

  // Add the legend control to the map
  legend.addTo(map);
}
