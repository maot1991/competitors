$("#id_title").attr('placeholder','Post Title')
$("#id_content").attr('placeholder','Post Content')
$( "#tabs" ).tabs({
  active: $("#cid").val()
});

$('#tabs').tabs({
    activate: function(event ,ui){
    	// window.location.replace()
    	history.pushState(null, "A new title!", 'http://localhost:8000/team/2?cid='+ui.newTab.index())
    }
});