# mongo-docker
These are files to build docker container for a simple js application, using mongo and mongo-express image from docker hub.

## Docker Commands

### To enter the interactive terminal

```bash
docker exec -it id /bin/bash
docker exec -it id /bin/sh
```

### Docker terminal commands are defined inside run.sh to be executed

```bash
bash run.sh
```

### To view current docker containers, network and logs

```bash
docker ps

docker network ls

docker logs id
```
