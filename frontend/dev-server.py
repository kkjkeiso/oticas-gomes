import http.server
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / 'frontend' / 'html'
CLEAN_URL = re.compile(r'^/([a-z-]+)(/?)$')


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path, _, query = self.path.partition('?')
        match = CLEAN_URL.match(path)

        if match and (PAGES / f'{match[1]}.html').is_file():
            if not match[2]:
                self.send_response(301)
                self.send_header('Location', f'/{match[1]}/' + (f'?{query}' if query else ''))
                self.end_headers()
                return None
            self.path = f'/frontend/html/{match[1]}.html'

        if not Path(self.translate_path(self.path)).exists():
            return self.send_not_found()

        return super().send_head()

    def send_not_found(self):
        body = (PAGES / '404.html').read_bytes()
        self.send_response(404)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
        return None


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'Óticas Gomes rodando em http://localhost:{port} (Ctrl + C para parar)')
    http.server.ThreadingHTTPServer(('', port), Handler).serve_forever()
