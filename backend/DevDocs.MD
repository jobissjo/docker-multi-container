### FOR BUILD APP
```shell
docker build -t goals-app .
```

### FOR RUN APP
```shell
docker run --name goals-backend -v D:/Deployment/Learning/Multi-container/backend:/app -v logs:/app/logs --rm -d -p 8000:8000 --network goals-network  goals-app
```