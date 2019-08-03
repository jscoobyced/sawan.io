#!/bin/bash

BASENAME=$(dirname "$0")
. $BASENAME/env.sh

if [ ! -e ".codecov" ];
then
    echo "Downloading codecov script"
    wget -qO- https://codecov.io/bash > .codecov
    chmod +x .codecov
fi

echo "Executing client tests"
yarn --cwd ./$ClientApp --silent run test:coverage
./.codecov -t $CodecovToken -f ./$ClientApp/$TsCoverage

dotnet restore
pushd $AppTestPath
dotnet test /p:AltCover=true
popd
./.codecov -t $CodecovToken -f ./$AppTestPath/$CsCoverage

pushd $ClientApp
yarn install --silent --no-progress
yarn build --silent --no-progress
popd

pushd $AppRootPath
dotnet restore
dotnet build
popd