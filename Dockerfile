FROM jscdroiddev/netcore-node-dev:latest AS build-env
WORKDIR /app

# Build application
## Build client-side
COPY .git ./
COPY ClientApp ./ClientApp
COPY sawan ./sawan
RUN yarn --cwd ClientApp install
RUN yarn --cwd ClientApp build

## Build server-side
RUN cd sawan && dotnet restore
RUN cd sawan && dotnet publish -c Release -o ../out

# Setup system
FROM jscdroiddev/mynn:latest
COPY scripts/docker/mariadb.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/mariadb.sh
COPY scripts/docker/entrypoint.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/entrypoint.sh

# Install application
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3306 5000 5001

