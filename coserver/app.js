var express = require('express');
var request = require('request');
var app = express();
var co2Emissions = {};

var makerEmissions = {"TOYOTA":"121","DACIA":"116","JAGUAR":"292","MG MOTORS UK":"174","CHRYSLER":"200","JEEP":"276","MERCEDES BENZ":"226","MCLAREN":"279","ABARTH":"142","SSANGYONG":"196","SMART":"120","MORGAN MOTOR COMPANY":"256","SUBARU":"146","SKODA":"155","AUDI":"184","PERODUA":"137","BMW":"210","VOLKSWAGEN":"105","ROLLS ROYCE":"349","PORSCHE":"270","MINI":"169","FERRARI":"360","VOLKSWAGEN":"193","LAND ROVER":"322","SEAT":"108","LEXUS":"145","RENAULT":"150","LTI":"209","KIA":"117","VAUXHALL":"139","ALFA ROMEO":"98","HYUNDAI":"148","LOTUS":"236","HONDA":"129","FORD":"172","MAZDA":"181","VOLVO":"215","ASTON MARTIN":"388","FIAT":"183","PEUGEOT":"139","CHEVROLET":"27","MITSUBISHI":"216","CITROEN":"112","MASERATI":"274","CORVETTE":"342","NISSAN":"168","BENTLEY":"393","INFINITI":"159","SUZUKI":"139"}
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/esrequest', function (req, res) {
  
  res.send(co2Emissions);
  

});

var fs = require('fs');
app.get('/getCO2PerYear', function (req, res) {
	
	var maker = req.query.maker;
	var year = req.query.year;

	if(typeof maker == "undefined"){

		if(typeof year != "undefined"){
			var contents = fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/'+year+'.json', 'utf8');
			console.log(year);
			res.jsonp(contents);
		}
		/*if(year == "2013"){
			var contents = fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/emissions.json', 'utf8');
			console.log("2013");
			res.jsonp(contents);
			
		}
		else if(year == "2010"){
			//var contents = JSON.parse(fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/2010.json', 'utf8'));
			var contents = fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/2010.json', 'utf8');
			console.log(contents)
			console.log("2010");
			res.jsonp(contents);
			
		}	*/
	}
	else if(maker == "toyota"){
		//var contents = JSON.parse(fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/toyota.json', 'utf8'));

		var contents = fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/toyota.json', 'utf8');
		console.log(maker)
		res.jsonp(contents);
	}
	else if(maker == "ford"){
		//var contents = JSON.parse(fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/ford.json', 'utf8'));
		var contents = fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/ford.json', 'utf8');
		console.log(maker)
		res.jsonp(contents);
	}
	else if(maker == "seat"){
		//var contents = JSON.parse(fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/seat.json', 'utf8'));
		var contents = fs.readFileSync('/home/julio/Documents/programs/node-v5.1.1-linux-x64/coserver/seat.json', 'utf8');
		console.log(maker)
		res.jsonp(contents);
	}

	//console.log(contents);
    
    //res.jsonp(co2Emissions);

});


/*"query" : {
      "filtered" : { 
         "filter" : {
            "bool" : {
              "must" : [
                 { "term" : {"make" : "ford"}},
                 { "term" : { "postcode_area" : areaCodes[code].toLowerCase() }}
              ]
           }
         }
      }
   },

   "query" : {
	        	"term" : { 
	        		"postcode_area" : areaCodes[code].toLowerCase()}
	    	}*/

app.get('/getCDLData', function (req, res) {
  
  var areaCodes = ["AB","AL","B","BA","BB","BD","BH","BL","BN","BR","BS","BT","CA","CB","CF","CH","CM","CO","CR","CT","CV","CW","DA","DD","DE","DG","DH","DL","DN","DT","DY","E","EC","EH","EN","EX","FK","FY","G","GL","GU","HA","HD","HG","HP","HR","HS","HU","HX","IG","IP","IV","KA","KT","KW","KY","L","LA","LD","LE","LL","LN","LS","LU","M","ME","MK","ML","N","NE","NG","NN","NP","NR","NW","OL","OX","PA","PE","PH","PL","PO","PR","RG","RH","RM","S","SA","SE","SG","SK","SL","SM","SN","SO","SP","SR","SS","ST","SW","SY","TA","TD","TF","TN","TQ","TR","TS","TW","UB","W","WA","WC","WD","WF","WN","WR","WS","WV","YO","ZE"];
  var areaNames =   ["Aberdeen"," St Albans"," Birmingham"," Bath"," Blackburn"," Bradford"," Bournemouth"," Bolton"," Brighton"," Bromley"," Bristol"," Belfast"," Carlisle"," Cambridge"," Cardiff"," Chester"," Chelmsford"," Colchester"," Croydon"," Canterbury"," Coventry"," Crewe"," Dartford"," Dundee"," Derby"," Dumfries"," Durham"," Darlington"," Doncaster"," Dorchester"," Dudley"," East London"," East Central London"," Edinburgh"," Enfield"," Exeter"," Falkirk"," Blackpool"," Glasgow"," Gloucester"," Guildford"," Harrow"," Huddersfield"," Harrogate"," Hemel Hempstead"," Hereford"," Outer Hebrides"," Hull"," Halifax"," Ilford"," Ipswich"," Inverness"," Kilmarnock"," Kingston upon Thames"," Kirkwall"," Kirkcaldy"," Liverpool"," Lancaster"," Llandrindod Wells"," Leicester"," Llandudno"," Lincoln"," Leeds"," Luton"," Manchester"," Rochester"," Milton Keynes"," Motherwell"," North London"," Newcastle upon Tyne"," Nottingham"," Northampton"," Newport"," Norwich"," North West London"," Oldham"," Oxford"," Paisley"," Peterborough"," Perth"," Plymouth"," Portsmouth"," Preston"," Reading"," Redhill"," Romford"," Sheffield"," Swansea"," South East London"," Stevenage"," Stockport"," Slough"," Sutton"," Swindon"," Southampton"," Salisbury"," Sunderland"," Southend-on-Sea"," Stoke-on-Trent"," South West London"," Shrewsbury"," Taunton"," Galashiels"," Telford"," Tunbridge Wells"," Torquay"," Truro"," Cleveland"," Twickenham"," Southall"," West London"," Warrington"," Western Central London"," Watford"," Wakefield"," Wigan"," Worcester"," Walsall"," Wolverhampton"," York"," Lerwick"];

  for(code in areaCodes){

  	   //console.log(areaCodes[code].toLowerCase());
	  		//postcode_area
	  request.post({
	  	url:'http://elastic-motdata-1240169001.eu-west-1.elb.amazonaws.com:80/motdata/testresult/_search', 
	  	//host: 'elastic-motdata-1240169001.eu-west-1.elb.amazonaws.com:80',
	    json: { 
	    	"query" : {
	        	"term" : { 
	        		"postcode_area" : areaCodes[code].toLowerCase()}
	    	},
	    	"size":  1000
	    }}, 
	    function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        
	    	console.log("Lenght hits " + body.hits.hits.length);
	        for(hit in body.hits.hits){
	        	
	        	//console.log(body.hits.hits[hit])
	        	var test = body.hits.hits[hit]
	        	var postCode = test._source["postcode_area"];

	        	var todayDate = new Date("2012/12/31");	
				var testDate = new Date(test._source.test_date);
				//todayDate = testDate;
				var firstUseDate = new Date(test._source.first_use_date);

	        	if(todayDate.getTime()< testDate.getTime() && todayDate.getTime() >  firstUseDate.getTime()){
	        		
	        	}

	        	var diffTest = Math.abs(testDate.getTime() - firstUseDate.getTime());
				var diffToday = Math.abs(todayDate.getTime() - firstUseDate.getTime());
				var emissions = (test._source.test_mileage * 1.609344 * (diffToday / diffTest) * getCO2EmissionsManufacturer(test._source.make))/1000000;
				//console.log(getCO2EmissionsManufacturer(test._source.make));
	        	if(typeof co2Emissions[postCode] == 'undefined'){

	        		co2Emissions[postCode] = emissions;
	        		//console.log("Null" + test._source.test_mileage);
	        	}
	        	else{
	        		co2Emissions[postCode] += emissions;
	        		//console.log("Milage" + test._source.test_mileage)
	        	}
	        	
				
	        }
	        console.log(postCode + " " + co2Emissions[postCode]);
	        //res.send(body);
	    }
	    else{
	    	console.log(error)
	    }
	  });

		//res.send("Ready!");
  }
  
  

});
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



function getCO2EmissionsManufacturer(make){
	if(typeof makerEmissions[make]  == 'undefined'){
		return 200;
	}
	return parseInt(makerEmissions[make]);
}
