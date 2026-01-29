from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Если запрос к корню, отдаём index.html
        if self.path == '/':
            self.path = '/index.html'
        # Если файл не существует, тоже отдаём index.html
        elif not os.path.exists('.' + self.path.split('?')[0]):
            self.path = '/index.html'
        return SimpleHTTPRequestHandler.do_GET(self)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        SimpleHTTPRequestHandler.end_headers(self)

PORT = 5600  # Изменяем порт
server = HTTPServer(('', PORT), CustomHandler)
print(f'========================================')
print(f'🌱 AgriEdu Frontend запущен!')
print(f'📂 Адрес: http://localhost:{PORT}')
print(f'📁 Автоматически открывает index.html')
print(f'========================================')
server.serve_forever()
