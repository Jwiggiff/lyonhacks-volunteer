import { storageRef } from "./firebase.js";

L.mapbox.accessToken =
  "pk.eyJ1Ijoib3A4IiwiYSI6ImNrbmkzbHQ2ajJjc2oybm9vNmxhdzZ3MXgifQ.jRjbm1goeIQ5XeiHZpaZZQ";
const geocoder = L.mapbox.geocoder("mapbox.places");

async function getCoords(address) {
  return new Promise((resolve, reject) => {
    geocoder.query(address, function (err, data) {
      if (err) reject(err);
      resolve([data.latlng[1], data.latlng[0]]);
    });
  });
}

export async function loadMap(opps, postal_code) {
  let data = await Promise.all(
    opps.map(async (opp) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: await getCoords(opp.location),
        },
        properties: {
          organization: opp.organization.name,
          position: opp.position,
          address: opp.location,
          icon: {
            iconUrl: await storageRef
              .child(opp.organization.logo)
              .getDownloadURL(),
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: "dot",
          },
        },
      };
    })
  );

  var geojson = [
    {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: await getCoords(postal_code),
          },
          properties: {
            organization: "HOME",
            position: "",
            address: "",
            icon: {
              iconUrl: "/assets/img/home.png",
              iconSize: [50, 50], // size of the icon
              iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
              popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
              className: "dot",
            },
          },
        },
        ...data,
      ],
    },
  ];
  var geocoder2 = L.mapbox.geocoder("mapbox.places");
  geocoder2.query(postal_code, showMap); // USER POSTAL CODE
  function showMap(err, data) {
    if (data.lbounds) {
      map.fitBounds(data.lbounds);
    } else if (data.latlng) {
      map.setView([data.latlng[0], data.latlng[1]], 13);
    }
  }
  var map = L.mapbox
    .map("map")
    .addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/light-v10"));
  map.scrollWheelZoom.enable();
  var listings = document.getElementById("listings");
  var locations = L.mapbox.featureLayer().addTo(map);
  locations.on("layeradd", function (e) {
    var marker = e.layer,
      feature = marker.feature;
    marker.setIcon(L.icon(feature.properties.icon));
  });
  locations.setGeoJSON(geojson);
  function setActive(el) {
    var siblings = listings.getElementsByTagName("div");
    for (var i = 0; i < siblings.length; i++) {
      siblings[i].className = siblings[i].className
        .replace(/active/, "")
        .replace(/\s\s*$/, "");
    }
    el.className += " active";
  }
  locations.eachLayer(function (locale) {
    var prop = locale.feature.properties;
    var popup = `<h3>${prop.organization}</h3><div>` + prop.position;
    var listing = listings.appendChild(document.createElement("div"));
    listing.className = "item";
    var link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.innerHTML = prop.organization;
    if (prop.address) {
      link.innerHTML +=
        '<br /><small class="quiet">' + prop.address + "</small>";
      popup += '<br /><small class="quiet">' + prop.address + "</small>";
    }
    var details = listing.appendChild(document.createElement("div"));
    details.innerHTML = prop.position;
    link.onclick = function () {
      setActive(listing);
      map.setView(locale.getLatLng(), 16);
      locale.openPopup();
      return false;
    };
    locale.on("click", function (e) {
      map.panTo(locale.getLatLng());
      setActive(listing);
    });
    popup += "</div>";
    locale.bindPopup(popup);
  });
}
