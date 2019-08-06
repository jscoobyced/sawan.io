CircleCI build: [![CircleCI](https://circleci.com/gh/jscoobyced/sawan.io.svg?style=svg)](https://circleci.com/gh/jscoobyced/sawan.io)  
Codecov C# code coverage: [![codecov](https://codecov.io/gh/jscoobyced/sawan.io/branch/master/graph/badge.svg)](https://codecov.io/gh/jscoobyced/sawan.io)  
SonarCloud statuses: [![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=sawan.io&metric=alert_status&v=11)](https://sonarcloud.io/dashboard?id=sawan.io)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sawan.io&metric=bugs&v=11)](https://sonarcloud.io/dashboard?id=sawan.io)
[![Code Smell](https://sonarcloud.io/api/project_badges/measure?project=sawan.io&metric=code_smells&v=11)](https://sonarcloud.io/dashboard?id=sawan.io)
[![Code Coverage](https://sonarcloud.io/api/project_badges/measure?project=sawan.io&metric=coverage&v=11)](https://sonarcloud.io/dashboard?id=sawan.io)

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
wget https://raw.githubusercontent.com/jscoobyced/sawan.io/master/scripts/docker/start.sh -O start.sh
chmod u+x start.sh
GoogleSecret=123456789 JwtSecret="Your encryption key to secure JWT" ./start.sh
```

Note you might need to run as sudo if you haven't added your user to the docker group.  

IMPORTANT NOTES: have a look at the above script and make sure you're happy with what it does.

## Update - 2019-08-06

Moved CI to [CircleCI](https://circleci.com). It's faster, using docker. I also needed to change the C# code coverage to [AltCover](https://github.com/SteveGilham/altcover) because it supports linux. I will probably test [Coverlet](https://github.com/tonerdo/coverlet) in some near future.