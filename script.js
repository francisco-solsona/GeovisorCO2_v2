mapboxgl.accessToken = 'pk.eyJ1IjoicGFjby1zb2xzb25hIiwiYSI6ImNseXJlcjN6bDA2M2kyaXB5d2NtYWJ3N2UifQ.s0HyJk7NLcV5ToGO-rLOew';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    projection: 'globe',
    zoom: 13, // Nivel de zoom inicial
    maxBounds: [
        [-100.66596, 20.37553], 
        [-100.13981, 20.86796]
    ],
    center: [-100.39279, 20.59246]
});



// Inicializa el Geocoder con límites (bbox)
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl, // Vincula el Geocoder al mapa
    placeholder: 'Buscar una dirección...', // Texto de placeholder
    marker: false, // No mostrar un marcador en el mapa
    bbox: [-100.66596, 20.37553, -100.13981, 20.86796], // Límites geográficos
});

// Agrega el Geocoder al contenedor con id "geocoder"
geocoder.addTo('#geocoder');

// Escucha el evento "result" para manejar la selección de una dirección
geocoder.on('result', (e) => {
    console.log('Dirección seleccionada:', e.result);
    // Aquí puedes hacer algo con la dirección seleccionada, como mover el mapa
    map.flyTo({
        center: e.result.center, // Centra el mapa en la ubicación seleccionada
        zoom: 15, // Ajusta el nivel de zoom
    });
});

// Escucha el evento "clear" para manejar cuando se borra la búsqueda
geocoder.on('clear', () => {
    console.log('Búsqueda borrada');
});


map.on('style.load', () => {
    map.setFog({});
    // Cargar las capas
    // loadGeoTIFF().then(() => {
    //     addCustomLayers();
    // });
});

////////////////////////////////////////////////////////////////////////////
////////////////// LOGICA PARA CARGAR LAS CAPAS DE INTERÉS//////////////////
////////////////////////////////////////////////////////////////////////////

// Variable de la capa de ANPs
const globalANPUrl = 'mapbox://paco-solsona.6h0rbo3e';
const globalANPLayer = 'C22014_ANP_CONABIO_2024-1pmkfx';
// Variable de la capa de POEREQ
const globalPOEREQUrl = 'mapbox://paco-solsona.d2k9inif';
const globalPOEREQLayer = 'C22014_POEREQ_2022-4yad5v';
// Variable de la capa de POEL
const globalPOELUrl = 'mapbox://paco-solsona.0vfo0rbn';
const globalPOELLayer = 'C22014_POEL_2014-2h0ocl';
// Variable de la capa de Distrito Qro
const globalDQROUrl = 'mapbox://paco-solsona.9k5b84q3';
const globalDQROLayer = 'C22014_DISTRITO_QRO_2024-7j1h8u';

////////////////////////////////////////////
/////// CARGAMOS LAS CAPAS A UTILIZAR //////
////////////////////////////////////////////

// Función para volver a cargar la capa personalizada
function addCustomLayers() {

    // Primero vamos a llamar todos los sources
    if (!map.getSource('anp')) {
        map.addSource('anp', {
            type: 'vector',
            url: globalANPUrl 
        });
    }
    if (!map.getLayer('anp-line-layer')) {
        map.addLayer({
            'id': 'anp-line-layer',
            'type': 'line',  
            'source': 'anp',  
            'source-layer': globalANPLayer, 
            'slot': 'top',
            'minzoom': 0,
            'maxzoom': 22,
            'paint': {
                'line-color': '#000000',  
                'line-width': 2,  
                'line-opacity': 0.7  
            },
            'layout': {
                'visibility': 'none' // Invisible al inicio
            }
        });
    }
    if (!map.getLayer('anp-fill-layer')) {
        map.addLayer({
            'id': 'anp-fill-layer',
            'type': 'fill',  
            'source': 'anp',  
            'source-layer': globalANPLayer, 
            'paint': {
                'fill-color': '#000000', // Color de relleno (puede ser cualquiera)
                'fill-opacity': 0 // Relleno 100% transparente
            },
            'layout': {
                'visibility': 'none' // Visible al inicio
            }
        });
    }


    // Primero vamos a llamar todos los sources
    if (!map.getSource('poereq')) {
        map.addSource('poereq', {
            type: 'vector',
            url: globalPOEREQUrl 
        });
    }
    if (!map.getLayer('poereq-line-layer')) {
        map.addLayer({
            'id': 'poereq-line-layer',
            'type': 'line', 
            'source': 'poereq',
            'source-layer': globalPOEREQLayer,
            'slot': 'top',
            'minzoom': 0,
            'maxzoom': 22,
            'paint': {
                'line-color': '#000000',  
                'line-width': 2,  
                'line-opacity': 0.7  
            },
            'layout': {
                'visibility': 'none' // Invisible al inicio
            }
        });
    }
    if (!map.getLayer('poereq-fill-layer')) {
        map.addLayer({
            'id': 'poereq-fill-layer',
            'type': 'fill',  
            'source': 'poereq',  
            'source-layer': globalPOEREQLayer, 
            'paint': {
                'fill-color': '#000000', // Color de relleno (puede ser cualquiera)
                'fill-opacity': 0 // Relleno 100% transparente
            },
            'layout': {
                'visibility': 'none' // Visible al inicio
            }
        });
    }


    // Primero vamos a llamar todos los sources
    if (!map.getSource('poel')) {
        map.addSource('poel', {
            type: 'vector',
            url: globalPOELUrl 
        });
    }
    if (!map.getLayer('poel-line-layer')) {
        map.addLayer({
            'id': 'poel-line-layer',
            'type': 'line',  
            'source': 'poel', 
            'source-layer': globalPOELLayer, 
            'slot': 'top',
            'minzoom': 0,
            'maxzoom': 22,
            'paint': {
                'line-color': '#000000',  
                'line-width': 2, 
                'line-opacity': 0.7  
            },
            'layout': {
                'visibility': 'none' // Invisible al inicio
            }
        });
    }
    if (!map.getLayer('poel-fill-layer')) {
        map.addLayer({
            'id': 'poel-fill-layer',
            'type': 'fill',  
            'source': 'poel',  
            'source-layer': globalPOELLayer, 
            'paint': {
                'fill-color': '#000000', // Color de relleno (puede ser cualquiera)
                'fill-opacity': 0 // Relleno 100% transparente
            },
            'layout': {
                'visibility': 'none' // Visible al inicio
            }
        });
    }


    // Primero vamos a llamar todos los sources
    if (!map.getSource('dqro')) {
        map.addSource('dqro', {
            type: 'vector',
            url: globalDQROUrl 
        });
    }
    if (!map.getLayer('dqro-line-layer')) {
        map.addLayer({
            'id': 'dqro-line-layer',
            'type': 'line',  
            'source': 'dqro', 
            'source-layer': globalDQROLayer, 
            'slot': 'top',
            'minzoom': 0,
            'maxzoom': 22,
            'paint': {
                'line-color': '#000000',  
                'line-width': 2, 
                'line-opacity': 0.7  
            },
            'layout': {
                'visibility': 'none' // Invisible al inicio
            }
        });
    }
    if (!map.getLayer('dqro-fill-layer')) {
        map.addLayer({
            'id': 'dqro-fill-layer',
            'type': 'fill',  
            'source': 'dqro',  
            'source-layer': globalDQROLayer, 
            'paint': {
                'fill-color': '#000000', // Color de relleno (puede ser cualquiera)
                'fill-opacity': 0 // Relleno 100% transparente
            },
            'layout': {
                'visibility': 'none' // Visible al inicio
            }
        });
    }
}


async function loadGeoTIFF() {
    try {
        const url = 'layers/raster/R22014_CAS_32bit_up.tif';
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
        const image = await tiff.getImage();
        const raster = await image.readRasters();

        // Obtener los datos de la primera banda
        const data = raster[0];

        // Calcular el valor mínimo y máximo de los píxeles, omitiendo -99999
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0; i < data.length; i++) {
            if (!isNaN(data[i]) && data[i] !== -99999) { // Ignorar NaN y -99999
                if (data[i] < min) min = data[i];
                if (data[i] > max) max = data[i];
            }
        }
        console.log("Valor mínimo:", min);
        console.log("Valor máximo:", max);
        
        // Normalizar los valores de los píxeles entre 0 y 1, omitiendo -99999
        const normalizedData = data.map(value => {
            if (isNaN(value) || value === -99999) return null; // Omitir NaN y -99999
            return (value - min) / (max - min); // Normalizar
        });

        // Crear una imagen PNG a partir de los datos raster
        const canvas = document.createElement('canvas');
        canvas.width = image.getWidth();
        canvas.height = image.getHeight();
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(canvas.width, canvas.height);

        // Definir la paleta de colores
        const colorPalette = [
            { value: 0.0, color: [0, 0, 0, 0] },        // Transparente
            { value: 0.00001, color: [34, 139, 34, 255] }, // Verde oscuro (bajo)
            { value: 0.2, color: [152, 251, 152, 255] }, // Verde claro
            { value: 0.4, color: [255, 255, 0, 255] },   // Amarillo
            { value: 0.5, color: [255, 165, 0, 255] },   // Naranja
            { value: 0.6, color: [255, 69, 0, 255] },    // Rojo anaranjado
            { value: 0.8, color: [255, 0, 0, 255] },     // Rojo
            { value: 1.0, color: [139, 0, 0, 255] }      // Rojo oscuro (alto)
        ];

        // Función para asignar colores basados en la paleta
        function getColor(value) {
            if (value === null) return [0, 0, 0, 0]; // Transparente para -99999

            // Encontrar el rango de colores correspondiente al valor normalizado
            for (let i = 1; i < colorPalette.length; i++) {
                if (value <= colorPalette[i].value) {
                    const lower = colorPalette[i - 1];
                    const upper = colorPalette[i];
                    const ratio = (value - lower.value) / (upper.value - lower.value);

                    // Interpolar entre los colores inferior y superior
                    const r = Math.round(lower.color[0] + (upper.color[0] - lower.color[0]) * ratio);
                    const g = Math.round(lower.color[1] + (upper.color[1] - lower.color[1]) * ratio);
                    const b = Math.round(lower.color[2] + (upper.color[2] - lower.color[2]) * ratio);
                    const a = Math.round(lower.color[3] + (upper.color[3] - lower.color[3]) * ratio);

                    return [r, g, b, a];
                }
            }

            // Si el valor es mayor que el último en la paleta, usar el último color
            return colorPalette[colorPalette.length - 1].color;
        }

        // Asignar colores a los píxeles
        for (let i = 0; i < normalizedData.length; i++) {
            const color = getColor(normalizedData[i]);
            imageData.data[i * 4] = color[0]; // Rojo
            imageData.data[i * 4 + 1] = color[1]; // Verde
            imageData.data[i * 4 + 2] = color[2]; // Azul
            imageData.data[i * 4 + 3] = color[3]; // Transparencia
        }

        // Dibujar la imagen en el canvas
        ctx.putImageData(imageData, 0, 0);

        // Convertir el canvas a una URL de imagen
        const imageUrl = canvas.toDataURL();

        // Obtener las coordenadas de la imagen
        const bbox = image.getBoundingBox();
        console.log("Bounding box:", bbox); // [minX, minY, maxX, maxY
        const coordinates = [
            [bbox[0], bbox[3]], // Esquina superior izquierda
            [bbox[2], bbox[3]], // Esquina superior derecha
            [bbox[2], bbox[1]], // Esquina inferior derecha
            [bbox[0], bbox[1]]  // Esquina inferior izquierda
        ];

        // Agregar la imagen como una capa en Mapbox
        map.addLayer({
            id: 'raster-layer',
            type: 'raster',
            source: {
                type: 'image',
                url: imageUrl,
                coordinates: coordinates
            },
            paint: {
                'raster-opacity': 0.5 // Ajusta el valor entre 0 (totalmente transparente) y 1 (totalmente opaco)
            }
        });
    } catch (error) {
        console.error("Error al cargar la capa .tif:", error);
    }
}


////////////////////////////////////////////////////////////////////////////
// ASIGNAMOS FUNCIONES A BOTONES DE PUNTO Y DIBUJO //
////////////////////////////////////////////////////////////////////////////

// Selecciona los botones
const pointButton = document.getElementById("point-button");
const drawButton = document.getElementById("draw-button");

// Inicializa los toasts
const liveToast = document.getElementById("liveToast");
const toast = new bootstrap.Toast(liveToast);

const drawToast = document.getElementById("drawToast");
const toastDraw = new bootstrap.Toast(drawToast);

// Función para manejar el estado activo de los botones
function setActiveButton(activeButton) {
    // Si el botón ya está activo, desactívalo
    if (activeButton.classList.contains("active")) {
        activeButton.classList.remove("active");
    } else {
        // Remueve la clase "active" de ambos botones
        pointButton.classList.remove("active");
        drawButton.classList.remove("active");

        // Agrega la clase "active" al botón clickeado
        activeButton.classList.add("active");
    }
}

// Asigna eventos de clic a los botones
pointButton.addEventListener("click", function () {
    setActiveButton(pointButton);
    toast.show(); // Muestra el toast para "Coloca un point"

    addPointMode = !addPointMode; // Alternar entre activado y desactivado

    if (!addPointMode) {
        // Si la herramienta se desactiva, eliminar el marcador actual
        if (currentMarker) {
            currentMarker.remove(); // Eliminar el marcador anterior
            currentMarker = null; // Limpiar la referencia
        }
    }
});

drawButton.addEventListener("click", function () {
    setActiveButton(drawButton);
    toastDraw.show(); // Muestra el toast para "Dibuja un trazo"
});

////////////////////////////////////////////////////////////////////////////
// LOGICA PARA ASIGNAR LOS PUNTOS //
////////////////////////////////////////////////////////////////////////////


let addPointMode = false; // Variable para almacenar el estado de la herramienta
let currentMarker = null; // Variable para almacenar el marcador actual



// Evento de clic en el mapa para agregar puntos
map.on('click', async function (e) {
    if (addPointMode) { // Solo agregar puntos si la herramienta está activa
        const coordinates = e.lngLat;

        console.log(coordinates)
        // Obtener el valor del raster en las coordenadas del clic
        const rasterValue = await getRasterValueAtCoordinates(coordinates);

        // Eliminar el marcador anterior si existe
        if (currentMarker) {
            currentMarker.remove(); // Eliminar el marcador anterior
            currentMarker = null; // Limpiar la referencia
        }

        // Crear un nuevo marcador en el mapa
        currentMarker = new mapboxgl.Marker({ color: '#FF0000' })
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`CO2 en el suelo (toneladas): ${rasterValue}`))
            .addTo(map);

        // Mostrar el popup automáticamente
        currentMarker.togglePopup();
    }
});

// Función para obtener el valor del raster en las coordenadas dadas
async function getRasterValueAtCoordinates(coordinates) {
    try {
        const url = 'layers/raster/R22014_CAS_32bit_up.tif'; // Ruta al archivo .tif
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
        const image = await tiff.getImage();

        // Obtener las coordenadas del clic en el sistema de referencia del raster
        const [minX, minY, maxX, maxY] = image.getBoundingBox();
        const width = image.getWidth();
        const height = image.getHeight();

        // Convertir las coordenadas geográficas a píxeles
        const x = Math.floor(((coordinates.lng - minX) / (maxX - minX)) * width);
        const y = Math.floor(((maxY - coordinates.lat) / (maxY - minY)) * height);

        // Leer el valor del píxel en las coordenadas
        const raster = await image.readRasters({ window: [x, y, x + 1, y + 1] });
        const value = raster[0][0]; // Obtener el valor del primer canal (banda)

        // Si el valor es -99999 (NoData), devolver un mensaje
        if (value === -99999) return 'Sin datos';

        return value.toFixed(2); // Redondear a 2 decimales
    } catch (error) {
        console.error("Error al obtener el valor del raster:", error);
        return 'Error';
    }
}
////////////////////////////////////////////
// FUNCION PARA ESCONDER/DESPLEGAR RESUMEN //
////////////////////////////////////////////
// Variable global con el nombre descriptivo de los atributos 
let attributeNames = {};
// Función para cargar el archivo JSON
async function loadAttributeNames() {
    try {
        const response = await fetch('datos/titulos-tablas.json');
        attributeNames = await response.json();
        console.log('Nombres de atributos cargados:', attributeNames);
    } catch (error) {
        console.error('Error al cargar los nombres de atributos:', error);
    }
}

// Llamar a la función para cargar los nombres de atributos al iniciar el visor
loadAttributeNames();



// Crear un popup
const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false
});

// Función para formatear números con 2 decimales
function formatNumber(value) {
    if (typeof value === 'number') {
        return value.toFixed(2); // Redondear a 2 decimales
    }
    return value; // Devolver el valor original si no es un número
}

function toggleLayer(layerId, isVisible) {
    // Lista de todas las capas disponibles
    const allLayers = ['anp-line-layer', 'anp-fill-layer', 'poereq-line-layer', 'poereq-fill-layer', 'poel-line-layer', 'poel-fill-layer', 'dqro-line-layer', 'dqro-fill-layer'];

    // Desactivar todas las capas primero
    allLayers.forEach(layer => {
        map.setLayoutProperty(layer, 'visibility', 'none');
        document.querySelector(`[data-layer="${layer.replace('-line-layer', '')}"]`)?.classList.remove('active');
    });

    // Si se proporciona un valor explícito para isVisible, úsalo
    if (isVisible !== undefined) {
        map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
        document.querySelector(`[data-layer="${layerId.replace('-line-layer', '')}"]`)?.classList.toggle('active', isVisible);
    } else {
        // Si no se proporciona, alterna la visibilidad
        const visibility = map.getLayoutProperty(layerId, 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(layerId, 'visibility', 'none');
            document.querySelector(`[data-layer="${layerId.replace('-line-layer', '')}"]`)?.classList.remove('active');
        } else {
            map.setLayoutProperty(layerId, 'visibility', 'visible');
            document.querySelector(`[data-layer="${layerId.replace('-line-layer', '')}"]`)?.classList.add('active');
        }
    }
}

// Selecciona todos los elementos de la lista con el atributo data-layer
const layerButtons = document.querySelectorAll('.btn-toggle-nav [data-layer]');

// Asigna eventos de clic a los botones
layerButtons.forEach(button => {
    button.addEventListener('click', function () {
        const layerId = this.getAttribute('data-layer'); // Obtiene el valor de data-layer
        toggleLayer(`${layerId}-line-layer`); // Alterna la capa correspondiente
        console.log('Botones encontrados:', layerId);
    });
});

// Event listener para el dropdown
document.getElementById('layer-select').addEventListener('click', function (e) {
    const selectedLayer = e.target.value;

    console.log('Botones encontrados:', selectedLayer);
    // Desactivar todas las capas primero
    toggleLayer('anp-line-layer', false);
    toggleLayer('anp-fill-layer', false);
    toggleLayer('poereq-line-layer', false);
    toggleLayer('poereq-fill-layer', false);
    toggleLayer('poel-line-layer', false);
    toggleLayer('poel-fill-layer', false);
    toggleLayer('dqro-line-layer', false);
    toggleLayer('dqro-fill-layer', false);

    // Activar la capa seleccionada
    if (selectedLayer === 'anp') {
        toggleLayer('anp-line-layer', true);
        toggleLayer('anp-fill-layer', true);
    } else if (selectedLayer === 'poereq') {
        toggleLayer('poereq-line-layer', true);
        toggleLayer('poereq-fill-layer', true);
    } else if (selectedLayer === 'poel') {
        toggleLayer('poel-line-layer', true);
        toggleLayer('poel-fill-layer', true);
    } else if (selectedLayer === 'dqro') {
        toggleLayer('dqro-line-layer', true);
        toggleLayer('dqro-fill-layer', true);
    }

    console.log('Botones encontrados:', selectedLayer);
});


// Evento para manejar la selección de capas desde el dropdown
document.getElementById('layer-select').addEventListener('change', function (e) {
    activeLayer = e.target.value; // Actualiza la capa activa
    console.log('Capa activa seleccionada desde el dropdown:', activeLayer);
});



// map.on('click', (e) => {
//     console.log('Coordenadas del clic:', e.lngLat);

//     // Verificar si hay una capa activa
//     if (!activeLayer) {
//         console.log('No hay ninguna capa activa.');
//         return;
//     }

//     // Determinar las capas fill-layer correspondientes a la capa activa
//     let activeLayers = [];
//     if (activeLayer === 'anp') {
//         activeLayers = ['anp-fill-layer'];
//     } else if (activeLayer === 'poereq') {
//         activeLayers = ['poereq-fill-layer'];
//     } else if (activeLayer === 'poel') {
//         activeLayers = ['poel-fill-layer'];
//     } else if (activeLayer === 'dqro') {
//         activeLayers = ['dqro-fill-layer'];
//     }

//     console.log('Capas activas:', activeLayers);
//     console.log('Coordenadas del clic:', e.point);

//     // Buscar features en las capas activas
//     const clickedFeatures = map.queryRenderedFeatures(e.point, {
//         layers: activeLayers
//     });
//     console.log('Features detectadas:', clickedFeatures);

//     // Si se hizo clic en una feature de la capa activa, mostrar un popup con los atributos
//     if (clickedFeatures.length > 0) {
//         const properties = clickedFeatures[0].properties;
//         const layerId = clickedFeatures[0].layer.id; // Obtener el ID de la capa
//         const coordinates = e.lngLat;

//         let popupContent = '<h3>Atributos</h3>';
//         const layerAttributes = attributeNames[layerId.replace('-fill-layer', '-table')] || {};

//         // Recorrer los atributos en el orden definido en el JSON
//         for (const [key, value] of Object.entries(layerAttributes)) {
//             if (value !== null) { // Omitir atributos con valor null
//                 const attributeValue = properties[key];
//                 if (attributeValue !== undefined && attributeValue !== null) {
//                     // Formatear atributos específicos
//                     let displayValue = attributeValue;
//                     if (
//                         key === 'AREA' || key === 'AREA_HA' || key === 'HECTARES' || // Superficie (ha)
//                         key === 'SUM' || // Total de CO₂ almacenado en el suelo (ton)
//                         key === 'MEAN_HA' // Promedio CO₂ en el suelo (ton/ha)
//                     ) {
//                         displayValue = formatNumber(parseFloat(attributeValue));
//                     }
//                     popupContent += `<p><strong>${value}</strong>: ${displayValue}</p>`;
//                 }
//             }
//         }

//         console.log('Contenido del popup:', popupContent);

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(popupContent)
//             .addTo(map);
//     } else {
//         console.log('No se detectaron features en el clic.');
//     }
// });