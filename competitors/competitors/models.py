from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class News(models.Model):
	title = models.CharField(max_length=100)
	content = models.CharField(max_length=1000)
	time = models.DateTimeField(auto_now_add=True)
	def __unicode__(self):
		return self.title

class Event(models.Model):
	content = models.CharField(max_length=500)
	time = models.CharField(max_length=100)
	def __unicode__(self):
		return self.content

class Comment(models.Model):
	content = models.CharField(max_length=160)
	user = models.ForeignKey(User)
	time = models.DateTimeField(auto_now_add=True)
	def __unicode__(self):
		return self.content

class Post(models.Model):
	title = models.CharField(max_length=100)
	content = models.CharField(max_length=1000)
	user = models.ForeignKey(User)
	time = models.DateTimeField(auto_now_add=True)
	comments = models.ManyToManyField(Comment)
	def __unicode__(self):
		return self.title

class UserProfile(models.Model):
	user = models.ForeignKey(User)
	age = models.DecimalField(max_digits=3,decimal_places=0,null=True)
	def __unicode__(self):
		return self.user.username

class Category(models.Model):
	name = models.CharField(max_length=40)
	def __unicode__(self):
		return self.name

class Country(models.Model):
	name = models.CharField(max_length=40)
	def __unicode__(self):
		return self.name

class League(models.Model):
	name = models.CharField(max_length=40)
	country = models.ForeignKey(Country,null=True)
	category = models.ForeignKey(Category)
	def __unicode__(self):
		return self.name

class Team(models.Model):
	name = models.CharField(max_length=256)
	league = models.ForeignKey(League,null=True)
	icon_url = models.CharField(max_length=256,default='url')
	posts = models.ManyToManyField(Post,blank=True)
	news = models.ManyToManyField(News,blank=True)
	def __unicode__(self):
		return self.name

class Player(models.Model):
	name = models.CharField(max_length=20)
	role = models.CharField(max_length=20)
	team = models.ForeignKey(Team,null=True,blank=True)
	icon_url = models.CharField(max_length=256,default='url')
	posts = models.ManyToManyField(Post,blank=True)
	news = models.ManyToManyField(News,blank=True)
	def __unicode__(self):
		return self.name



class Match(models.Model):
	home = models.ForeignKey(Team,related_name='home')
	away = models.ForeignKey(Team,related_name='away')
	time = models.DateTimeField(auto_now_add=False,auto_now=False)
	score = models.CharField(max_length=100,blank=True)
	events = models.ManyToManyField(Event,blank=True)
	comments = models.ManyToManyField(Comment,blank=True)
	def __unicode__(self):
		return self.home.name + " vs "+self.away.name









