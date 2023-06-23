var map = L.map('map', {
    minZoom: 1,
    maxZoom: 10
  }).setView([35.75, -90.89], 4);
  
  // Add a tile layer to the map (you can choose a different tile provider if needed)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  
  $.ajax({
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      plotEarthquakes(data);
    },
  });
  
  function plotEarthquakes(data) {
    data.features.forEach(function(feature) {
      var lat = feature.geometry.coordinates[1];
      var lon = feature.geometry.coordinates[0];
      var magnitude = feature.properties.mag;
      var depth = feature.geometry.coordinates[2];
  
      var marker = L.circleMarker([lat, lon], {
        radius: magnitude * 2,
        fillColor: getColor(depth),
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);
  
      marker.bindPopup(
        '<strong>Place:</strong> ' + feature.properties.place + '<br>' +
        '<strong>Magnitude:</strong> ' + magnitude + '<br>' +
        '<strong>Depth:</strong> ' + depth + ' km'
      );
    });
  }
  
  function getColor(depth) {
    if (depth < 10) {
      return '#FF0000'; // Red
    } else if (depth < 30) {
      return '#FFA500'; // Orange
    } else if (depth < 50) {
      return '#FFFF00'; // Yellow
    } else {
      return '#008000'; // Green
    }
  }
  
