import os, re, datetime, logging

ORDER = 999
RESTAURANTS_PATH = 'restaurants/'
RESTAURANTS = []

from django.template import Context
from django.template.loader import get_template
from django.template.loader_tags import BlockNode, ExtendsNode

def getNode(template, context=Context(), name='subject'):
	"""
	Get django block contents from a template.
	http://stackoverflow.com/questions/2687173/
	django-how-can-i-get-a-block-from-a-template
	"""
	for node in template:
		if isinstance(node, BlockNode) and node.name == name:
			return node.render(context)
		elif isinstance(node, ExtendsNode):
			return getNode(node.nodelist, context, name)
	raise Exception("Node '%s' could not be found in template." % name)


def preBuild(site):

	global RESTAURANTS

	# Build all the posts
	for page in site.pages():
		if page.path.startswith(RESTAURANTS_PATH):

			# Skip non html posts for obious reasons
			if not page.path.endswith('.html'):
				continue

			# Find a specific defined variable in the page context,
			# and throw a warning if we're missing it.
			def find(name):
				c = page.context()
				if not name in c:
					logging.info("Missing info '%s' for post %s" % (name, page.path))
					return ''
				return c.get(name, '')

			# Build a context for each post
			postContext = {}
			postContext['name'] = find('name')
			postContext['tags'] = find('tags')
			postContext['blurb'] = find('blurb')
			postContext['hours_mon'] = find('hours_mon')
			postContext['hours_tue'] = find('hours_tue')
			postContext['hours_wed'] = find('hours_wed')
			postContext['hours_thu'] = find('hours_thu')
			postContext['hours_fri'] = find('hours_fri')
			postContext['hours_sat'] = find('hours_sat')
			postContext['hours_sun'] = find('hours_sun')
			postContext['address'] = find('address')
			postContext['telephone'] = find('telephone')
			postContext['url'] = find('url')
			postContext['image'] = find('image')

			# make clickable telephone number
			postContext['clickable_tel'] = re.sub('[^a-zA-Z]', '', postContext['telephone']);

			print postContext['clickable_tel'];

			RESTAURANTS.append(postContext)

	# Sort the posts by date
	# RESTAURANTS = sorted(RESTAURANTS, key=lambda x: x['date'])
	# RESTAURANTS.reverse()


def preBuildPage(site, page, context, data):
	"""
	Add the list of restaurants to every page context so we can
	access them from wherever on the site.
	"""
	context['restaurants'] = RESTAURANTS

	return context, data