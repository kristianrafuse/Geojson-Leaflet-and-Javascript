Geojson, Leaflet, and Javascript
-------
In this example, I use data from The United States Geological Survey to visualize and plot earthquake data. I use Leaflet to create a map that plots all the earthquakes from the dataset based on their longitude and latitude. The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

Highlights:
-------
Create a Leaflet Maps with various layers an interactions.
Make an AJAX request to retrieve earthquake data from a GeoJSON source.
Function to plot earthquake data on the map.
Create a circle marker at the earthquake location with a radius based on magnitude and a fill color based on depth.
Bind a popup to the marker displaying information about the earthquake.
Included tectonic plate locations from https://github.com/fraxen/tectonicplatesLinks directly into my logic.js file
