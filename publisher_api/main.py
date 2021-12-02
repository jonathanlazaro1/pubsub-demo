import logging
import os

import uvicorn

from app.main import build_api

logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.DEBUG)

app = build_api()

if __name__ == '__main__':
    port = int(os.getenv('PUBLISHER_API_PORT', '5000'))
    uvicorn.run(app, port=port, log_level="error")
