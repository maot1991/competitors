from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^$','competitors.views.home',name = 'home'),
	url(r'^team/(?P<id>\d+)','competitors.views.team_page',name = 'team_page'),
	url(r'^player/(?P<id>\d+)','competitors.views.player_page',name = 'player_page'),
	url(r'^get_country_list','competitors.views.get_country_list',name = 'get_country_list'),
	url(r'^get_league_list','competitors.views.get_league_list',name = 'get_league_list'),
	url(r'^get_team_list','competitors.views.get_team_list',name = 'get_team_list'),
	url(r'^get_player_list','competitors.views.get_player_list',name = 'get_player_list'),
	url(r'^login$', 'django.contrib.auth.views.login', {'template_name':'registration/login.html'},name='login'),
	url(r'^logout$', 'django.contrib.auth.views.logout', name='logout'),
	url(r'^loginself','competitors.views.loginself'),
	url(r'^register$', 'competitors.views.register',name = 'register'),
	url(r'^search$', 'competitors.views.search',name = 'search'),
	url(r'^change_password$', 'competitors.views.change_password',name = 'change_password'),
	url(r'^add_post$', 'competitors.views.add_post',name = 'add_post'),
	url(r'^add_comment/([\s\S]*)$', 'competitors.views.add_comment',name = 'add_comment'),
	url(r'^get_post/([\s\S]*)$', 'competitors.views.get_post',name = 'get_post'),
	url(r'^get_news/([\s\S]*)$', 'competitors.views.get_news',name = 'get_news'),
	url(r'^live_page/([\s\S]*)$', 'competitors.views.live_page',name = 'live_page'),
	url(r'^change_password-done$', 'competitors.views.change_password_done',name = 'change_password_done'),
	url(r'^search_autocomplete/', 'competitors.views.search_autocomplete',name = 'search_autocomplete'),
	url(r'^confirm-registration/(?P<username>[a-zA-Z0-9_@\+\-]+)/(?P<token>[a-z0-9\-]+)$', 'competitors.views.confirm_registration', name='confirm'),
	url(r'^confirm_change/(?P<username>[a-zA-Z0-9_@\+\-]+)/(?P<token>[a-z0-9\-]+)$', 'competitors.views.confirm_change', name='confirm_change'),
	)