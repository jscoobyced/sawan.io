#!/bin/bash

echo Installing dependencies

yarn --cwd ClientApp install --silent --no-progress
export NODE_PATH=ClientApp/node_modules
ls -l /root/.dotnet/tools
ls -l ~/.dotnet/tools

export PATH="${PATH}:/root/.dotnet/tools"

echo Initializing tests

if [ "${BRANCH}" != "master" ]
then
    dotnet sonarscanner begin \
        /k:${PROJECTKEY} \
        /v:${VERSION} \
        /o:${ORG} \
        /d:sonar.host.url=${SONARURL} \
        /d:sonar.login=${SonarToken} \
        /d:sonar.cs.opencover.reportsPaths=${CSCOVERAGE} \
        /d:sonar.typescript.lcov.reportPaths=${LCOVINFO} \
        /d:sonar.testExecutionReportPaths="./${CLIENTPATH}/${TSCOVERAGE}" \
        /d:sonar.typescript.tsconfigPath=${TSCONFIG} \
        /d:sonar.exclusions="${EXCLUSIONS}" \
        /d:sonar.coverage.exclusions="${COVEXCLUSIONS}" \
        /d:sonar.pullrequest.base=master \
        /d:sonar.pullrequest.branch=${BRANCH} \
        /d:sonar.pullrequest.key=${PRNUMBER} \
        /d:sonar.pullrequest.provider=GitHub \
        /d:sonar.pullrequest.github.repository=${REPONAME}
else
    dotnet sonarscanner begin \
        /k:${PROJECTKEY} \
        /v:${VERSION} \
        /o:${ORG} \
        /d:sonar.host.url=${SONARURL} \
        /d:sonar.login=${SonarToken} \
        /d:sonar.cs.opencover.reportsPaths=${CSCOVERAGE} \
        /d:sonar.typescript.lcov.reportPaths=${LCOVINFO} \
        /d:sonar.testExecutionReportPaths="./${CLIENTPATH}/${TSCOVERAGE}" \
        /d:sonar.typescript.tsconfigPath=${TSCONFIG} \
        /d:sonar.exclusions="${EXCLUSIONS}" \
        /d:sonar.coverage.exclusions="${COVEXCLUSIONS}" 
fi

dotnet build

dotnet sonarscanner end /d:sonar.login=${SonarToken}