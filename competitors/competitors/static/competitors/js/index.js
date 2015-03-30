var cat;
var country;
var message;
var token = $('input[name="csrfmiddlewaretoken"]').prop('value');

$(function() {
  	$("#search").autocomplete({
    source: "/search_autocomplete/",
    minLength: 2,
    autoFill: true,
    mustMatch: true,
    matchContains: true,
    scrollHeight: 220,
  });
});

function createSub_all(name,category){
	console.log(category+"  "+name);
	if (category)
		cat = category;
	var listname = name.toLowerCase();
	var method = "POST";
	if (listname=="country"){
		method = "GET";
		cat = category;
		$("#search_area_league").css("display","none");
		$("#search_area_team").css("display","none");
		$("#search_area_player").css("display","none");
	}
	else if (listname=="league"){
		var country = parseInt($("#search_area_country_scroll").val());
		if (country <=0 ){
			$('#search_area_country').prepend("<p>please select sth</p>");
			return;
		}else{
			$('#search_area_country p').remove();
		}
		message = "&country="+country;
		console.log(typeof(country));
	}
	else if (listname=="team"){
		var league = parseInt($("#search_area_league_scroll").val());
		if (league <=0 ){
			$('#search_area_league').prepend("<p>please select sth</p>");
			return;
		}else{
			$('#search_area_league p').remove();
		}
		message = "&league="+league;
	}
	else if (listname=="player"){
		var team = parseInt($("#search_area_team_scroll").val());
		if (team <=0 ){
			$('#search_area_team').prepend("<p>please select sth</p>");
			return;
		}else{
			$('#search_area_team p').remove();
		}
		message = "&team="+team;
	}
	var select = document.getElementById("search_area_"+listname+"_scroll");
	while (select.firstChild){
		select.removeChild(select.firstChild);
	}
	token = $('input[name="csrfmiddlewaretoken"]').prop('value');
	$("#search_area_"+listname).css("display","inline-block");
	
	$.ajax({
		type: method,
	    url: "/get_"+listname+"_list",
	    data:"data="+cat+message+"&csrfmiddlewaretoken="+token,
	    dataType : "json",
	    success: function(countries) {
    		option = document.createElement("option")
        	option.value = 0;
        	text = document.createTextNode("----please select---");
        	option.appendChild(text);
        	$("#search_area_"+listname+"_scroll").append(option);
	        $(countries).each(function(){
	        	console.log(listname);
	        	var display = this.fields.name;
	        	if (listname=="team"){
		    		change_link(listname);
		    	}
		    	if (listname=="player"){
		    		change_link(listname);
		    		display = this.fields.name;		    	
		    	}
	        	option = document.createElement("option")
	        	option.value = this.pk;
	        	text = document.createTextNode(display);
	        	option.appendChild(text);
	        	$("#search_area_"+listname+"_scroll").append(option);
	        })
	        
	    }
	})
	
};

function change_link(name){
	var str = name.toLowerCase();
	if (str == "team"){
		$("#search_area_player").css("display","none");
	}
	if (str == "league"){
		$("#search_area_team").css("display","none");
		$("#search_area_player").css("display","none");
	}
	if (str == "country"){
		$("#search_area_league").css("display","none");
		$("#search_area_team").css("display","none");
		$("#search_area_player").css("display","none");
	}

	if(str=="player" || str =="team"){
		var id = $('#search_area_'+str+'_scroll').val();
		console.log(id);
		if (id>0){
			var link = document.getElementById(str+"_link");
			link.setAttribute("href",str+'/'+id);
			link.setAttribute("style","display:inline")
		}
	}
}


