FROM jscdroiddev/netcore-node-dev:latest AS build-env
WORKDIR /app

# Build client-side
COPY .git ./
COPY src/ClientApp ./ClientApp
COPY src/sawan ./sawan
RUN $HOME/.yarn/bin/yarn --cwd ClientApp install
RUN $HOME/.yarn/bin/yarn --cwd ClientApp build

# Build server-side
RUN cd sawan && dotnet restore
RUN cd sawan && dotnet publish -c Release -o ../out

# Package application
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "sawan.dll"]