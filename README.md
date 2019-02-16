AppVeyor build: [![Build status](https://ci.appveyor.com/api/projects/status/l1c7qjueue6rxulx?svg=true)](https://ci.appveyor.com/project/jscoobyced/sawan-io)  
Codecov C# code coverage: [![codecov](https://codecov.io/gh/jscoobyced/sawan.io/branch/master/graph/badge.svg)](https://codecov.io/gh/jscoobyced/sawan.io)  
SonarCloud statuses: [![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=sawan&metric=alert_status&v=11)](https://sonarcloud.io/dashboard?id=sawan)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sawan&metric=bugs&v=11)](https://sonarcloud.io/dashboard?id=sawan)
[![Code Smell](https://sonarcloud.io/api/project_badges/measure?project=sawan&metric=code_smells&v=11)](https://sonarcloud.io/dashboard?id=sawan)
[![Code Coverage](https://sonarcloud.io/api/project_badges/measure?project=sawan&metric=coverage&v=11)](https://sonarcloud.io/dashboard?id=sawan)

# SAWAN.IO
Home of the https://sawan.io website.

# Setup

## Dependencies

You will need the following to be pre-installed on your machine:
- dotnet core with SDK 2.2.x
- docker

## Application

In a CMD or TERMINAL window, follow those steps:
- To prepare the client-side assets:
```
pushd ClientApp
yarn install
yarn webpack
popd
```

- To run a mock version (and hot-reload)
```
pushd ClientApp
yarn dev-server
```

Then you can open a browser on http://localhost:9000 to browse the mocked application.

- To build the dotnet core application
```
dotnet restore
dotnet build
```

- Then to run it locally:
```
sudo ./scripts/docker/start-local.sh
dotnet run --project sawan
```

Then you can open your browser on http://localhost:5000 to browse the application.

## Tests

- To run the unit tests
```
dotnet test
```

## Update - 2019-02-16

Moved to a docker environment. To run this website on production without downloading the whole repo:
```
wget -O - https://raw.githubusercontent.com/jscoobyced/sawan.io/master/scripts/docker/start.sh | sudo sh
```

You can do it in several steps:
```
wget https://raw.githubusercontent.com/jscoobyced/sawan.io/master/scripts/docker/start.sh -O start.sh
chmod u+x start.sh
sudo ./start.sh
```

IMPORTANT NOTES: have a look at the above script and make sure you're happy with what it does.