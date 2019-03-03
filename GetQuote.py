import json

def getQuote():
    url = "http://quotes.rest/qod.json"
    response = urllib.request.urlopen(url)
    contentString = response.read().decode()
    content = json.loads(contentString)
    return content["quote"] + "," + content["author"]