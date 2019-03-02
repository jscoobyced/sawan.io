#!/bin/bash

BASENAME=$(dirname "$0")
. $BASENAME/env.sh

if [ ! -e ".codecov" ];
then
    echo "Downloading codecov script"
    wget -qO- https://codecov.io/bash > .codecov
    chmod +x .codecov
fi

curl -v > /dev/null 2>&1 || { echo "Installing curl"; sudo apt -y install curl; }

echo "Executing client tests"
yarn --cwd ./$ClientApp --silent run test:coverage
./.codecov -t $CodecovToken -f ./$ClientApp/$TsCoverage

pushd tools
dotnet minicover instrument --workdir .. --assemblies sawan-tests/bin/Debug/netcoreapp2.2/sawan*.dll
dotnet test --no-build ../sawan-tests/sawan-tests.csproj 
dotnet minicover uninstrument --workdir ..
dotnet minicover xmlreport --workdir ..
../.codecov -t $CodecovToken -f ../$CsCoverage
popd

