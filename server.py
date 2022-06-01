import http.server
import socketserver

PORT = 80

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("10.0.0.148", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()