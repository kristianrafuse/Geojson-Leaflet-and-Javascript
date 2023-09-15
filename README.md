Geojson, Leaflet, and Javascript
-------
In this example, I use data from The United States Geological Survey to visualize and plot earthquake data. I use Leaflet to create a map that plots all the earthquakes from the dataset based on their longitude and latitude. The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color. In addition, I use GeoJSON data to plot the tectonic plates dataset on the map in addition to the earthquakes.

Deployment:
-------
https://kristianrafuse.github.io/Geojson-Leaflet-and-Javascript/

Highlights:
-------
* TileLayer loads without error
* Connects to geojson API using D3 without error
* Markers with size corresponding to earthquake magnitude
* A legend showing the depth and their corresponding color
* Data points scale with magnitude level
* Data points colors change with depth level
* Each point has a tooltip with the Magnitude, the location and depth
* All data points load in the correct locations
