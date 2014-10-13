// YouTube Age Gate V 1.02
// Coded by Jason Leyanna
// http://www.jasonleyanna.com
// webmaster@realmofgaming.com
// http://www.realmofgaming.com

// New in 1.02
// - Updated YouTube Iframe Code Embed
// - changed div id name - random gen

//Features
// - Cookies
// - Width and Height (optional)
// - Under Age mades it go black
// - ageGate() - "url to video"
// - ageGate2() - "url to video", "width", "height"
/*
<script type="text/javascript">ageGate("http://www.youtube.com/watch?v=4q4vD6UrB30");</script>
<script type="text/javascript">ageGate2("http://www.youtube.com/watch?v=4q4vD6UrB30","600","335");</script>
*/

function readCookie()
{
var name = "age";
var ca = document.cookie.split(';');
var nameEQ = name + "=";
  for(var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1, c.length); //delete spaces
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
return null;
}

function setCookie()
{
	var name = "age";
	var value = "true";
	var date = new Date();
	var days = 1;
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";	
}
function displayAgeForm(video, divname, width, height)
{	
	var thecontent = "";
	var currentTime = new Date();
	var currentYear = currentTime.getFullYear();
	var i;
	
	thecontent = thecontent + '<center><br /><br /><br /><br /><br /><br />Please Enter Your Birth Date:<br />';
	thecontent = thecontent + '	<select id="Month">';
	thecontent = thecontent + '		<option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option>';
	thecontent = thecontent + '	</select>';
	thecontent = thecontent + '	<select id="Day">';
				
	for (j = 1;j <= 31;j++)
	{			
		thecontent = thecontent + '<option value="' + j + '">' + j +'</option>';	
	}
		
	thecontent = thecontent + '	</select>';
	thecontent = thecontent + '	<select id="Year">';						
			
	for (i = currentYear;i >= (currentYear - 100);i--)
	{			
		thecontent = thecontent + '<option value="' + i + '">' + i +'</option>';					
	}
				
	thecontent = thecontent + '	</select>';
				
	var passedvars = "\'" + video + "\',\'" + divname + "\',\'" + width + "\',\'" + height + "\'";
				
	thecontent = thecontent + "	<input type=\"submit\" value=\"Submit\" onClick=\"doAge(" +  passedvars +  ")\">";
	thecontent1 = "	<input type=\"submit\" value=\"Submit\" onClick=\"doAge(" +  passedvars +  ")\">";
				
	document.getElementById(divname).innerHTML = thecontent;
				
}
function showContent(video, divname, width, height)
{
	var video2 = video.substring(video.indexOf('=') + 1, video.length);	
	
	var thecode = '<iframe width="' + width + '" height="'+ height +'" src="//www.youtube.com/embed/' + video2 +  '" frameborder="0" allowfullscreen></iframe>';
	
	document.getElementById(divname).innerHTML = thecode;	
}
function ageGate(video)
{
	ageGate2(video, "560", "315");
}
function underAge(divname){
	document.getElementById(divname).innerHTML = "";
}
function ageGate2(video, width, height)
{	
	// generate name of div
	var divname = 'video_' + new Date().getTime().toString();

	document.write('<div id="' + divname + '" style="background-color: #000000;color: #ffffff;width: '+ width +'px;height: '+ height +'px;"><form name="age"></form></div>');
				
	if (readCookie() != null)
	{
		// old enough
		showContent(video, divname, width, height);
	}
	else{
		displayAgeForm(video, divname, width, height);
	}				
}
function doAge(video, divname, width, height)
{
	var minAge = 18;
	var inputMonth = document.getElementById('Month').value;
	var inputDay = document.getElementById('Day').value;
	var inputYear = document.getElementById('Year').value;

	var currentTime = new Date();
	var currentMonth = currentTime.getMonth() + 1;
	var currentDay = currentTime.getDate();
	var currentYear = currentTime.getFullYear();

	if(inputYear > currentYear - minAge){
		// NOT of age
		underAge(divname);
	}
	else if(inputYear < currentYear - minAge)
	{
		// of age
		setCookie();
		showContent(video, divname, width, height);	
	}
	else if(inputYear == currentYear - minAge)
	{
		if(inputMonth > currentMonth)
		{
			// of age
			setCookie();
			showContent(video, divname, width, height);		
		}
		else if(inputMonth == currentMonth && inputDay >= currentDay)
		{
			// of age
			setCookie();
			showContent(video, divname, width, height);	
		}
		else
		{
			// NOT of age
			underAge(divname);
		}
	}	
}	
