AppVeyor build: [![Build status](https://ci.appveyor.com/api/projects/status/l1c7qjueue6rxulx?svg=true)](https://ci.appveyor.com/project/jscoobyced/sawan-io)  
Codecov C# code coverage: [![codecov](https://codecov.io/gh/jscoobyced/sawan.io/branch/master/graph/badge.svg)](https://codecov.io/gh/jscoobyced/sawan.io)  
SonarCloud statuses: [![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=sawan&metric=alert_status&v=11)](https://sonarcloud.io/dashboard?id=sawan)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sawan&metric=bugs&v=11)](https://sonarcloud.io/dashboard?id=sawan)
[![Code Smell](https://sonarcloud.io/api/project_badges/measure?project=sawan&metric=code_smells&v=11)](https://sonarcloud.io/dashboard?id=sawan)
[![Code Coverage](https://sonarcloud.io/api/project_badges/measure?project=sawan&metric=coverage&v=11)](https://sonarcloud.io/dashboard?id=sawan)

# SAWAN.IO
Home of the https://sawan.io website.

# Setup

## Application

In a CMD or TERMINAL window, follow those steps:
- To prepare the client-side assets:
```
pushd src/ClientApp
yarn install
yarn webpack
popd
```

- To run a mock version (and hot-reload)
```
pushd src/ClientApp
yarn dev-server
```

Then you can open a browser on http://localhost:9000 to browse the mocked application.

- To build the dotnet core application
```
pushd src
dotnet restore
dotnet build
dotnet run --project sawan
popd
```

Then you can open your browser on http://localhost:5000 to browse the application.

## Tests

- To run the unit tests
```
cd src/sawan-tests
dotnet test
popd
```

## News - 2018-12-02

Now this application can auto-deploy it's new version when a tag is created and a GitHub webhook is set
 to `<server>/api/Data/github` and the webhook token set in `appsettings.json`