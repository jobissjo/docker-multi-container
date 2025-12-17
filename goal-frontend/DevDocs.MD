### FOR BUILD APP
```shell
docker build -t goals-react .
```

### FOR RUN APP
```shell
docker run --name goals-frontend --rm -v D:/Deployment/Learning/Multi-container/goal-frontend/src:/app/src  -it -p  5173:5173 goals-react
```

