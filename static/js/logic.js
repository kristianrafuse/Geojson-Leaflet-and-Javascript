var map = L.map('map', {
  minZoom: 1,
  maxZoom: 10
}).setView([35.75, -90.89], 4);

var openStreetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18
});

var esriWorldImageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

openStreetMapLayer.addTo(map);

var baseLayers = {
  "OpenStreetMap": openStreetMapLayer,
  "Esri World Imagery": esriWorldImageryLayer
};

L.control.layers(baseLayers).addTo(map);

$.ajax({
  url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
  method: 'GET',
  dataType: 'json',
  success: function(data) {
    plotEarthquakes(data);
    createLegend();
  },
});

function plotEarthquakes(data) {
  data.features.forEach(function(feature) {
    var lat = feature.geometry.coordinates[1];
    var lon = feature.geometry.coordinates[0];
    var magnitude = feature.properties.mag;
    var depth = feature.geometry.coordinates[2];

    var marker = L.circleMarker([lat, lon], {
      radius: magnitude * 3,
      fillColor: getColor(depth),
      color: 'black',
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.6
    }).addTo(map);

    marker.bindPopup(
      '<strong>Location:</strong> ' + feature.properties.place + '<br>' +
      '<strong>Magnitude:</strong> ' + magnitude + '<br>' +
      '<strong>Depth:</strong> ' + depth + ' km'
    );
  });
}

function getColor(depth) {
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

function createLegend() {
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'legend');
    var depths = [0, 10, 20, 30, 40, 50, 60, 70, 80];
    var labels = ['<10 km', '10-20 km', '20-30 km', '30-40 km', '40-50 km', '50-60 km', '60-70 km', '70-80 km', '>80 km'];

    div.innerHTML += '<strong>Earthquake Depth</strong><br>';

    for (var i = 0; i < depths.length; i++) {
      div.innerHTML +=
        '<div class="legend-row">' +
        '<div class="legend-color" style="background:' + getColor(depths[i] + 1) + '"></div>' +
        '<div class="legend-label">' + labels[i] + '</div>' +
        '</div>';
    }

    return div;
  };

  legend.addTo(map);
}