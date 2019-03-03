import json
import urllib.request
import random


def getRecipes():
    url = "https://api.wegmans.io/meals/recipes?api-version=2018-10-18&subscription-key=d1cef5a8c3434b71a0ddfc4ee471c7cc"
    response = urllib.request.urlopen(url)
    contentString = response.read().decode()
    content = json.loads(contentString)
    content2 = content["recipes"]
    randomRecipe = random.choice(content2)
    return randomRecipe

dict = getRecipes()

def getIngredients(object):
    ingredientsList = []
    url = object.get("_links", {}).get("href")
    response = urllib.request.urlopen(url)
    contentString = response.read().decode()
    content = json.loads(contentString)
    content2 = content["ingredients"]
    for i in content2:
        for key in i:
            ingredientsList.append(key["name"])
    return ingredientsList


print(getIngredients(dict))