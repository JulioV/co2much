var map = {}
var geojson = {}
var info = {};
var legend = null;

var areaNames = {AB:"Aberdeen",AL:"St Albans",B:"Birmingham",BA:"Bath",BB:"Blackburn",BD:"Bradford",BH:"Bournemouth",BL:"Bolton",BN:"Brighton",BR:"Bromley",BS:"Bristol",BT:"Northern Ireland",CA:"Carlisle",CB:"Cambridge",CF:"Cardiff",CH:"Chester",CM:"Chelmsford",CO:"Colchester",CR:"Croydon",CT:"Canterbury",CV:"Coventry",CW:"Crewe",DA:"Dartford",DD:"Dundee",DE:"Derby",DG:"Dumfries and Galloway",DH:"Durham",DL:"Darlington",DN:"Doncaster",DT:"Dorchester",DY:"Dudley",E:"East London",EC:"Central London",EH:"Edinburgh",EN:"Enfield",EX:"Exeter",FK:"Falkirk and Stirling",FY:"Blackpool",G:"Glasgow",GL:"Gloucester",GU:"Guildford",HA:"Harrow",HD:"Huddersfield",HG:"Harrogate",HP:"Hemel Hempstead",HR:"Hereford",HS:"Outer Hebrides",HU:"Hull",HX:"Halifax",IG:"Ilford",IP:"Ipswich",IV:"Inverness",KA:"Kilmarnock",KT:"Kingston upon Thames",KW:"Kirkwall",KY:"Kirkcaldy",L:"Liverpool",LA:"Lancaster",LD:"Llandrindod Wells",LE:"Leicester",LL:"Llandudno",LN:"Lincoln",LS:"Leeds",LU:"Luton",M:"Manchester",ME:"Rochester",MK:"Milton Keynes",ML:"Motherwell",N:"North London",NE:"Newcastle upon Tyne",NG:"Nottingham",NN:"Northampton",NP:"Newport",NR:"Norwich",NW:"North West London",OL:"Oldham",OX:"Oxford",PA:"Paisley",PE:"Peterborough",PH:"Perth",PL:"Plymouth",PO:"Portsmouth",PR:"Preston",RG:"Reading",RH:"Redhill",RM:"Romford",S:"Sheffield",SA:"Swansea",SE:"South East London",SG:"Stevenage",SK:"Stockport",SL:"Slough",SM:"Sutton",SN:"Swindon",SO:"Southampton",SP:"Salisbury",SR:"Sunderland",SS:"Southend-on-Sea",ST:"Stoke-on-Trent",SW:"South West London",SY:"Shrewsbury",TA:"Taunton",TD:"Galashiels",TF:"Telford",TN:"Tonbridge",TQ:"Torquay",TR:"Truro",TS:"Cleveland",TW:"Twickenham",UB:"Southall",W:"West London",WA:"Warrington",WC:"Central London",WD:"Watford",WF:"Wakefield",WN:"Wigan",WR:"Worcester",WS:"Walsall",WV:"Wolverhampton",YO:"York",ZE:"Lerwick"}

function loadMap(){
	console.log("hi map");
	map = L.map('map').setView(new L.LatLng(54.3, -3.7),6);

	L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
	}).addTo(map);

	loadSlider();
	loadEmissions("http://localhost:3000/getCO2PerYear?year=2013");

	loadInfoControl();
	
	geojson = L.geoJson(areasUK, {
	    style: style,
	    onEachFeature: onEachFeature
	}).addTo(map);

	

}



var responseAreas;
var minEmission = 99999999999;
var maxEmission = 0;
function loadEmissions(url){


	$.ajax({
	    url: url,
	    async: false,
	    dataType: "jsonp",
	    success: function( response ) {
	        //console.log( response ); // server response
	        responseAreas = JSON.parse(response);
	        for(area in areasUK.features){

	        	var co2Level = responseAreas[areasUK.features[area].properties.name]==null?0:responseAreas[areasUK.features[area].properties.name];
	        	if(area == 0){
	        		maxEmission = 0;
	        		minEmission = co2Level;
	        	}
	        	areasUK.features[area].properties.co2 = co2Level;
	        	if(co2Level < minEmission)
	        		minEmission = co2Level
	        	if(co2Level> maxEmission)
	        		maxEmission = co2Level;

	        }
	        geojson.setStyle(style);
	        //minEmission = 0;
	        //maxEmission = 778204403.488512;
	        LoadLegendControl(minEmission,maxEmission);

	        
	        console.log(minEmission + " " + maxEmission);

	    }

	});

	var i = 0;
	for(area in areasUK.features){
		//areasUK.features[area].properties.co2 = i++;
	}
	//areasUK.features[0].properties

}


$( document ).ready(function() {
    console.log( "ready!" );
    loadMap();
});


function getColor(d) {

	d = (d - minEmission) / (maxEmission - minEmission );
    return d > 0.9 ? '#800026' :
           d > 0.8  ? '#BD0026' :
           d > 0.7  ? '#E31A1C' :
           d > 0.6  ? '#FC4E2A' :
           d > 0.5   ? '#FD8D3C' :
           d > 0.4   ? '#FEB24C' :
           d > 0.3   ? '#FED976' :
           d > 0.2   ? '#ffeda0' :
                      '#ffffcc';
}

['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026']

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    e.target.setStyle(style);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.co2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function loadInfoControl(){
	info = L.control();

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	    this.update();
	    return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function (props) {
	    this._div.innerHTML = '<div style="font-size:20px;"> <br><h4 style="font-size:25px;">CO2 Emissions</h4>' +  (props ?
	        '<br><br><b>' + areaNames[props.name] + '</b><br><br>' + props.co2.toLocaleString() + ' ton / km <p>Or '+(props.co2/180).toLocaleString()+' whales <img src="whale.png" alt="Whale" style="width:50px;height:50px;"></p></div>'
	        : 'Hover over an area');
	};

	info.addTo(map);
}

function LoadLegendControl(min, max){
	var diff = max - min;

	if(legend != null)
		map.removeControl(legend);

	legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

	    var div = L.DomUtil.create('div', 'info legend'),
	        grades = [],
	        labels = [];

	    for(i =0; i <= 10; i++){
	    	grades.push(min + diff * (i/10));
	    }

	    // loop through our density intervals and generate a label with a colored square for each interval
	    for (var i = 0; i < grades.length; i++) {
	        div.innerHTML +=
	            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
	            grades[i].toLocaleString() + (grades[i + 1] ? '' + "" + '<br>' : '+');
	    }

	    return div;
	};

	legend.addTo(map);
}

function selectModel(){
	var maker = $("#maker option:selected").val();
	if(maker =="toyota" || maker == "ford" || maker ==  "seat"){
		console.log(maker);
		loadEmissions("http://localhost:3000/getCO2PerYear?maker="+maker);
		//loadInfoControl();
	}

}

function loadSlider(){
	$( "#slider" ).slider({
      value:2013,
      min: 2008,
      max: 2013,
      step: 1,
      slide: function( event, ui ) {
        console.log(ui.value);
        //if(ui.value == 2010 || ui.value == 2013){
        	loadEmissions("http://localhost:3000/getCO2PerYear?year="+ui.value);
        	//loadInfoControl();
        //}
        
      }
	})
}