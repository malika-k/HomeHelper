import json
import urllib.request


def getQuote():
    url = "http://quotes.rest/qod.json"
    response = urllib.request.urlopen(url)
    contentString = response.read().decode()
    content = json.loads(contentString)
    content2 = content.get("contents", {}).get("quotes")
    content3 = content2[0]
    return content3["quote"] + "  " + content3["author"]



