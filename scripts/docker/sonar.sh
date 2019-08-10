#!/bin/bash

echo Installing dependencies

apt-get update
apt-get install -y openjdk-11-jre
dotnet tool install --global dotnet-sonarscanner --version 4.6.2

echo Initializing tests

dotnet sonarscanner begin
    /k:${PROJECTKEY} \
    /v:${VERSION} \
    /o:${ORG} \
    /d:sonar.host.url=${SONARURL} \
    /d:sonar.login=${SonarKey} \
    /d:sonar.cs.opencover.reportsPaths=${CSCOVERAGE} \
    /d:sonar.typescript.lcov.reportPaths=${LCOVINFO} \
    /d:sonar.testExecutionReportPaths=./${CLIENTPATH}/${TSCOVERAGE} \
    /d:sonar.typescript.tsconfigPath=${TSCONFIG} \
    /d:sonar.exclusions="${EXCLUSIONS}" \
    /d:sonar.coverage.exclusions="${COVEXCLUSIONS}" \
    /d:sonar.pullrequest.base=master \
    /d:sonar.pullrequest.branch=${BRANCH} \
    /d:sonar.pullrequest.key=${PRNUMBER} \
    /d:sonar.pullrequest.provider=GitHub \
    /d:sonar.pullrequest.github.repository=${REPONAME}

dotnet build

dotnet sonarscanner end /d:sonar.login=${SonarKey}

#      - typescript_test
#      - csharp_test
#      - typescript
#      - codeanalysis
#      - publish:
#          requires:
#            - typescript
#          filters:
#            branches:
#              only: master
#      - release:
#          requires:
#            - publish
#          filters:
#            branches:
#              only: master
