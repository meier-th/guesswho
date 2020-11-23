from http.server import BaseHTTPRequestHandler, HTTPServer
import sys
import json
import random
from urllib.parse import urlparse, parse_qs
from lxml import html
import requests

class DataBean:
  names = []
  correct = ''
  img_url = ''
  def __init__(self, names, correct, img_url):
    self.names = names
    self.correct = correct
    self.img_url = img_url

names = []

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        complexity = int(parse_qs(self.path)['/api?difficulty'][0])
        self.wfile.write(json.dumps(generate_bean(complexity).__dict__).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=RequestHandler):
    server_address = ('', 8080)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

def generate_bean(complexity):
  global names
  bean = {}
  img_url = ''
  if complexity == 1:
    correct = names[random.randint(0, 9)]
    img_url = get_img_url(correct)
    bean = DataBean(names[0:10], correct, img_url)
  elif complexity == 2:
    correct = names[random.randint(0, 50)]
    img_url = get_img_url(correct)
    bean = DataBean(names[0:50], correct, img_url)
  else:
    correct = names[random.randint(0, 99)]
    img_url = get_img_url(correct)
    bean = DataBean(names, correct, img_url)
  return bean

def get_img_url(name):
  google_url = 'https://www.google.com/search?tbm=isch&q=' + name.replace(' ', '+')
  page = requests.get(google_url)
  tree = html.fromstring(page.content)
  img = tree.xpath('//img/@src')
  return img[1]

def read_names(filename):
  global names
  names_file = open(filename, 'r')
  names = [name[:-2] for name in names_file.readlines()]

def main():
  args = sys.argv[1:]
  if not args:
    print ('use: python3 guesswho.py file')
    sys.exit(1)
  read_names(sys.argv[1])
  run()

if __name__ == '__main__':
  main() 