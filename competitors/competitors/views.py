from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from competitors.models import *
from competitors.forms import *
from django.core import serializers
from django.http import HttpResponse,Http404
from django.contrib.auth import login,authenticate
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect,HttpResponse,HttpResponseForbidden
from django.shortcuts import render_to_response,redirect,get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
import json
from django.core.mail import send_mail
from django.core.urlresolvers import reverse
from django.db import transaction
from django.contrib.auth.tokens import default_token_generator

# Create your views here.

def home(request):
	context = []
	return render(request,'competitors/index.html',context)

def loginself(request):
	context = []
	username = request.POST.get('username')
	password = request.POST.get('password')
	user = authenticate(username=username, password=password)
	print user                                                                              
	# if login_form.is_valid():                                                                                                           
	#     if request.is_ajax:                                                                                                             
	#         user = django_login(request, login_form.get_user())                                                                         
	if user is not None: #Verify form's content existence
	    if user.is_active: #Verify validity
	        login(request, user)
	        print True
	        data = json.dumps({ 'next' : request.REQUEST.get('next', '/') , 'success' : 'True'})    
	        return HttpResponse(data,content_type='application/json')  #It's ok, so go to index
	    else:
	    	print False
	        return HttpResponseForbidden()  #call the login view
	print "FFFFFalse"                                                                                                        
	data = json.dumps({ 'next' : request.REQUEST.get('next', '/') , 'success' : 'False'})    
	return HttpResponse(data,content_type='application/json')   #It's ok, so go to index          
	# catch invalid ajax and all non ajax 
  
	# context = []
	# # print request
	# print request.POST['username']
	# print "uuuunext="+request.REQUEST.get('username')

	# # return render(request,'competitors/index.html',context)
	# # return render_to_response('login.html', c, context_instance=RequestContext(request))
	# return HttpResponse(request.REQUEST.get('next', '/')) 

# def getCountryList(request):


@transaction.atomic
def register(request):
    context = {}

    if request.method == 'GET':
        context['form'] = RegistrationForm()
        return render(request, 'registration/register.html', context)

    # Creates a bound form from the request POST parameters and makes the 
    # form available in the request context dictionary.
    form = RegistrationForm(request.POST)
    context['form'] = form

    # Validates the form.
    if not form.is_valid():
        return render(request, 'registration/register.html', context)
    

  
    new_user = User.objects.create_user(username = form.cleaned_data['username'], 
                                        password = form.cleaned_data['password1'],
                                        first_name = form.cleaned_data['first_name'],
                                        email = form.cleaned_data['email'],
                                        last_name=form.cleaned_data['last_name']
                                      )
    
    # # new_user.UserInfo.age=form.cleaned_data['age']

    new_user.is_active = False

    new_user.save()

    user = UserProfile(user = new_user)

    user.save()   

    new_user = authenticate(username = request.POST['username'], \
                          password = request.POST['password1'])

    # follow = Follow(hostuser = request.POST['username'])
    # follow.save()

    token = default_token_generator.make_token(new_user)

    email_body = """
Welcome to COMPETITORS.  Please click the link below to
verify your email address and complete the registration of your account:

  http://%s%s
""" % (request.get_host(), 
       reverse('confirm', args=(new_user.username, token)))

    send_mail(subject="Verify your email address",
              message= email_body,
              from_email="maot@andrew.cmu.edu",
              recipient_list=[new_user.email])

    context['email'] = form.cleaned_data['email']

    print new_user.is_active
 
    return render(request, 'registration/needs-confirmation.html', context)

@transaction.atomic
def confirm_registration(request, username, token):
    user = get_object_or_404(User, username=username)

    # Send 404 error if token is invalid
    if not default_token_generator.check_token(user, token):
        raise Http404

    # Otherwise token was valid, activate the user.
    user.is_active = True
    user.save()
    return render(request, 'registration/confirmed.html', {})

@transaction.atomic
def change_password(request):
	context = {}
	email = []
	if request.method == 'GET':
		return render(request, 'registration/change_password.html', context)

	if 'email' in request.POST and request.POST['email']:
		email = request.POST['email']
	else:
		context['errors'] = "Please input your email address"
		return render(request, 'registration/change_password.html', context)

	try:
		new_user = User.objects.get(email=email)
	except ObjectDoesNotExist:
		context['errors'] = "This email has not been registered."
		return render(request, 'registration/change_password.html', context)

	token = default_token_generator.make_token(new_user)

	email_body = """Your username is:"""+ new_user.username+""".
	If you would like to reset your password, please click the link below to change your password:
	http://%s%s
""" % (request.get_host(), 
	reverse('confirm_change', args=(new_user.username,token)))

	send_mail(subject="Password Change",
			message= email_body,
			from_email="maot@andrew.cmu.edu",
			recipient_list=[new_user.email])

	context['email'] = new_user.email


	return render(request, 'registration/password_change_request_sent.html', context)

@transaction.atomic
def confirm_change(request, username, token):
    user = get_object_or_404(User, username=username)

    # Send 404 error if token is invalid
    if not default_token_generator.check_token(user, token):
        raise Http404

    form = ChangePasswordForm(initial={'username': username})
    context = {}
    context['form'] = form
    context['username'] = user.username
    # Otherwise token was valid, activate the user.
    # user.is_active = True
    # user.save()
    return render(request, 'registration/change_password_form.html', context)

@transaction.atomic
def change_password_done(request):
	context = {}
	username = {}
	if "username" in request.POST and request.POST['username'] :
		username = request.POST['username']
	else:
		return render(request, 'competitors/index.html')
	user = User.objects.get(username = username)

# Send 404 error if token is invalid
	# if not default_token_generator.check_token(user, token):
	# 	raise Http404
	form = ChangePasswordForm(request.POST)
	if not form.is_valid():
		context['errors'] = "Please input two same passwords"
		form = ChangePasswordForm(initial={'username': username})
		context['form'] = form
		return render(request, 'registration/change_password_form.html', context)
	
	user.set_password(request.POST['password1'])
	user.save()
	
	

	return render(request, 'competitors/index.html', context)



def team_page(request,id):
	context = []
	team = []
	errors = []
	matches = []
	try:
		team = Team.objects.get(id=id)
		matcheshome = Match.objects.filter(home = team)
		matchesaway = Match.objects.filter(away = team)
		matches = matcheshome | matchesaway
	except ObjectDoesNotExist:
		errors.append('This team does not exist')
	form = PostForm()
	news = News.objects.filter(team__id=id)
	posts = Post.objects.filter(team__id=id).order_by("-time")
	context = {'team':team,'form':form,'matches':matches,'news':news,'posts':posts}
	return render(request,'competitors/team.html',context)

def player_page(request,id):
	context = []
	player = []
	errors = []
	posts = []
	try:
		player = Player.objects.get(id=id)
	except ObjectDoesNotExist:
		errors.append('This team does not exist')
	form = PostForm()
	news = News.objects.filter(player__id=id)
	posts = Post.objects.filter(player__id=id).order_by("-time")
	

	context = {'player':player,'form':form,'posts':posts}
	return render(request,'competitors/player.html',context)

def get_country_list(request):
	
	countries = Country.objects.all();
	response_text = serializers.serialize('json',countries)
	return HttpResponse(response_text,content_type='application/json')

def get_league_list(request):
	cat =[]
	country=[]
	if 'data' in request.POST and request.POST['data']:
		cat = request.POST['data']
	if 'country' in request.POST and request.POST['country']:
		country = request.POST['country']
	leagues = League.objects.filter(category__name=cat,country__id=country);
	response_text = serializers.serialize('json',leagues)
	return HttpResponse(response_text,content_type='application/json')

def get_team_list(request):
	leagueid = []
	if 'league' in request.POST and request.POST['league']:
		leagueid = request.POST['league'];
	teams = Team.objects.filter(league__id=leagueid);
	response_text = serializers.serialize('json',teams)
	return HttpResponse(response_text,content_type='application/json')	

def get_player_list(request):
	teamid = []
	if 'team' in request.POST and request.POST['team']:
		teamid = request.POST['team'];
	players = Player.objects.filter(team__id=teamid);
	response_text = serializers.serialize('json',players)
	return HttpResponse(response_text,content_type='application/json')


@login_required
@transaction.atomic
def add_post(request):
    errors = []
    context = {}
    # user = UserInfo.objects.get(user__user__username=request.user.username)
    # Creates a new item if it is present as a parameter in the request
    form = PostForm(request.POST)
    context['form'] = form
    next = request.POST['redirecturl']
    if not form.is_valid():
        return render(request, 'registration/register.html', context)
    else:
    	new_post = Post(title = form.cleaned_data['title'], 
    					content = form.cleaned_data['content'],
    					user=request.user)
    	new_post.save()
    	if 'cat' in request.POST and request.POST['cat']:
    		if request.POST['cat'] == 'team':
	    		id = request.POST['id']
	    		team = Team.objects.get(id=id)
	    		team.posts.add(new_post)
	    		team.save()
	    	elif request.POST['cat'] == 'player':
	    		id = request.POST['id']
	    		player = Player.objects.get(id=id)
	    		player.posts.add(new_post)
	    		player.save()
	    	else:
	    		context['errors'] = "errors"
    return redirect(next)

@login_required
@transaction.atomic
def add_comment(request,id):
    
    post = Post.objects.get(id = id)
    errors = []
    comments = {}
    form = CommentForm(request.POST)
    next = request.POST['redirecturl']
    if not form.is_valid():
        error="please write your comment"
        context={'errors':error}
        return render(request, 'competitors/index.html', context)
    else:
        new_comment = Comment( 
    					content = form.cleaned_data['content'],
    					user=request.user)
        new_comment.save()
        post.comments.add(new_comment)
        post.save()
    return redirect(next)
    

def get_post(request,id):
	context = {}
	post = []
	form = CommentForm()
	context['form'] = form
	comments = Comment.objects.filter(post__id = id)
	print comments
	context['comments'] = comments
	try:
		post = Post.objects.get(id=id)
		context['post'] = post
	except ObjectDoesNotExist:
		context['errors'] = "errors"
	return render(request,'competitors/post.html',context)

def get_news(request,id):
	context = {}
	try:
		news = News.objects.get(id=id)
		context['news'] = news
	except ObjectDoesNotExist:
		context['errors'] = "news does not exist"
	return render(request,'competitors/news.html',context)

def live_page(request,id):
	context = {}
	try:
		match = Match.objects.get(id=id)
		context['match'] = match
	except ObjectDoesNotExist:
		context['errors'] = "news does not exist"
	return render(request,'competitors/match.html',context)	
def search(request):
	context = {}
	print request.POST
	if 'search' in request.POST and request.POST['search']:
		name = request.POST['search'].strip()
		teams = Team.objects.filter(name__contains=name)
		players = Player.objects.filter(name__contains=name)
		number = teams.count() + players.count()
		if number == 0:
			context['errors'] = "Can not find what you want"
			return render(request,'competitors/searchresult.html',context)
		elif number == 1:
			if teams.count() == 1:
				for team in teams:
					return redirect('team/'+str(teams.id))
			else:
				for player in players:
					return redirect('player/'+str(player.id))
				
		else:
			context['teams'] = teams
			context['players'] = players
			return render(request,'competitors/searchresult.html',context)
	else:
		context['errors'] = 'request fault'
		return render(request,'competitors/index.html',context)
def search_autocomplete(request):
	q = request.GET.get('term', '')
	team = []
	player = []
	items = []
	teams = Team.objects.filter(name__contains=q)
	players = Player.objects.filter(name__contains=q)
	resultlist = {}
	results = []
	for team in teams:
		resultlist={}
		resultlist['label'] = team.name
		resultlist['value'] = team.name
		results.append(resultlist)
	for player in players:
		resultlist['label'] = player.name
		resultlist['value'] = player.name
		results.append(resultlist)
	data = json.dumps(results)
	return HttpResponse(data, content_type='application/json')


