# No need to edit this file -- instead look at the JS files!


# "bottle.py" is a simple Python framework for writing web-servers. It does
# the same sorts of things as Django, except its much simpler and is only
# in one file.
from bottle import route, run, request

import json
import io


# Posts saved as array
blog_posts = [
  {
    'title': "Peanut",
    'image': "https://i.imgur.com/b6jayEW.png",
    'content': [
      '''A peanut allergy is very common and could cause a serious and possibly
      fatal reaction. You should avoid any kind of nut, even artificial. Also
      be mindful of dishes that may be cooked in peanut oil.''',
      '''Some unexpected sources of peanuts: Chili, Egg rolls, Hot sauce, Pesto,
      Gravy, Salad dressing, Pancakes, Specialty pizzas, Some vegetarian food
      products advertised as meat substitutes''',
    ],
  },
  {
    'title': "Milk",
    'image': "https://i.imgur.com/Fy8H565.png",
    'content': [
      '''A milk allergy is different than lactose intolerance. Cow milk and
      products should be avoided, as reactions can be mild, such as hives, and
      sometimes life threatening. It is also wise to avoid milk from all other
      animals.''',
      '''Some unexpected sources of milk: Baked goods, Luncheon meat, hot dogs,
      sausages Nondairy products (look for casein), Shellfish is sometimes
      dipped in milk to mask the odor, Restaurants sometimes put butter on
      steaks for flavor''',
    ],
  },

  {
    'title': "Egg",
    'image': "https://i.imgur.com/ooZwiXv.jpg",
    'content': [
      '''Egg allergies are the second most common childhood allergy. Reactions
      can be mild, such as hives, and sometimes life threatening. Eggs from
      other birds should also be avoided.''',
      '''Some unexpected sources of eggs: Egg substitutes, Macaroni, Marzipan,
      Lecithin, Marshmallows, Pasta, Pretzels are sometimes dipped in egg wash
      before they are salted''',
    ],
  },
  {
    'title': "Wheat",
    'image': "https://i.imgur.com/1AjlwFU.png",
    'content': [
      '''Not to be confused with gluten intolerance. Many people with wheat
      allergies can tolerate other grains, but it's safe to stay away from them
      if you don't know for sure. ''',

      '''Some unexpected sources of wheat: Couscous, Cracker meal, Flour, Glucose
      syrup, Soy sauce, Starch, Beer, Processed meat, Salad dressing, Ice cream,
      Potato chips, Hot dogs, Imitation crabmeat''',
    ],
  },
  {
    'title': "Soy",
    'image': "https://i.imgur.com/lMf1tkp.png",
    'content': [
      '''Soy allergies can be mild or severe, though severe reactions are rare.''',
      '''Some unexpected sources of soy: Canned tuna and meat, Cereals, Cookies,
      Crackers, High-protein energy bars and snacks, Low-fat peanut butter,
      Processed meats, Sauces, Canned broths and soups''',
    ],
  },

  {
    'title': "Fish",
    'image': "https://i.imgur.com/O7pJVW8.png",
    'content': [
      '''People with fish allergies are most commonly allergic to salmon, tuna
      and halibut, although it is advised to avoid all fish. Many people who
      are allergic to finned fish are not allergic to shellfish. Be advised
      that fish protein can become airborne in the steam released while
      cooking.''',
      '''Some unexpected sources of fish: Caesar dressing, Worcestershire sauce,
      Bouillabaisse, Imitation fish or shellfish, Meatloaf, Barbecue sauce,
      Caponata (Sicilian eggplant relish''',
    ],
  },
]

@route('/api/all')
def api_all():
    # Add in "id" field before returning to better simulate DB
    for index, post in enumerate(blog_posts):
        post['id'] = index
    return {
        'posts': blog_posts,
    }

@route('/api/<article_id>')
def api_one(article_id):
    art_id = int(article_id)
    post = blog_posts[art_id]
    # Add in "id" field before returning to better simulate DB
    post['id'] = art_id
    return {
        'post': post,
    }

@route('/api/create/', method='POST')
def api_create():
    info = json.load(io.TextIOWrapper(request.body))
    info['content'] = [info['content']]
    info.setdefault('image', 'https://i.imgur.com/b6jayEW.png')
    blog_posts.append(info)
    return {
        'success': True,
    }

@route('/api/<article_id>/delete/', method='DELETE')
def api_delete(article_id):
    del blog_posts[int(article_id)]
    return {
        'success': True,
    }

@route('/api/<article_id>/update/', method='PUT')
def api_update(article_id):
    info = json.load(io.TextIOWrapper(request.body))
    blog_posts[int(article_id)] = info
    return {
        'success': True,
    }


@route('/api/search/<search_term>')
def api_search(search_term):
    search_term = search_term.lower()
    return {
        'results': [
            blog_post for blog_post in blog_posts
            if search_term in blog_post.get('name', '').lower()
        ],
    }

run(host='localhost', port=8080)
