sudo fuser -k 8000/tcp
lsof -t -i tcp:8000 | xargs kill -9
