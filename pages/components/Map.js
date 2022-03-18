import { useEffect } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmlvbG9naWNhbGx5dW5pcXVlIiwiYSI6ImNreDJub25ndzFrbGsyb3BodXZjaW0xNGgifQ.fbR8GLAly4zjMNifV3-g-g';

const Map = (props) => {

    useEffect(() => {
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
          center: [-58.4655, -34.6054],
          zoom: 11
        });
        if(props.pickUpCoordinates){
          addToMap(map, props.pickUpCoordinates)
        }
        
        if(props.DropOffCoordinates){
          addToMap(map, props.DropOffCoordinates)
        }

        if(props.pickUpCoordinates && props.DropOffCoordinates){
          map.fitBounds([
            props.DropOffCoordinates,
            props.pickUpCoordinates
          ],{
            padding: 60
          })
          getRoute(start);
        }

        // ****************** ESTO DE ACA ES COPIADO SI NO FUNCIONA CORREGIR *****************

        const start = [-123.069003, 45.395273];
        
        // create a function to make a directions request
        async function getRoute(end) {
          const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickUpCoordinates};${props.DropOffCoordinates}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
          );
          const json = await query.json();
          const data = json.routes[0];
          console.log(data)
          const route = data.geometry.coordinates;
          const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          };
          // if the route already exists on the map, we'll reset it using setData
          if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
          }
          // otherwise, we'll make a new request
          else {
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            });
          }
          // add turn instructions here at the end
        }
        
        // map.on('load', () => {
        //   // make an initial directions request that starts and ends at the same location
        //   getRoute(start);
        
        //   // Add starting point to the map
        //   map.addLayer({
        //     id: 'point',
        //     type: 'circle',
        //     source: {
        //       type: 'geojson',
        //       data: {
        //         type: 'FeatureCollection',
        //         features: [
        //           {
        //             type: 'Feature',
        //             properties: {},
        //             geometry: {
        //               type: 'Point',
        //               coordinates: start
        //             }
        //           }
        //         ]
        //       }
        //     },
        //     paint: {
        //       'circle-radius': 10,
        //       'circle-color': '#3887be'
        //     }
        //   });
        //   // this is where the code from the next step will go
        // });
    }, [props.pickUpCoordinates, props.DropOffCoordinates]);

    const addToMap = (map, coordinates) => {
      const marker1 = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
    }

    return <Wrapper id='map'></Wrapper>
}

//Build Wrapper and pass it as Map, then i call it from index as <Map/>

export default Map

//Give right styles to that part of the main Wrapper, this below is a second Wrapper

const Wrapper = tw.div`
h-screen
`