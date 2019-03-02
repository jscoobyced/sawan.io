Write-Host -------------------------------------- Run test ------------------------------

Write-Host --------------------------------- ClientApp Tests-----------------------------

yarn --cwd $env:ClientApp --silent run test:coverage
codecov -f $env:ClientApp\$env:TsCoverage

Write-Host -------------------------------- ClientApp Tests done ------------------------
Write-Host -------------------------------- Netcore Tests -------------------------------

& $env:USERPROFILE\.nuget\packages\opencover\4.6.519\tools\OpenCover.Console.exe `
-register:user `
-oldStyle `
-target:"dotnet.exe" `
-targetargs:"$env:CsTarget" `
-filter:"$env:CsFilter" `
-output:"$env:CsCoverage"

codecov -v -f $env:APPVEYOR_BUILD_FOLDER/$env:CsCoverage

Write-Host -------------------------------------- SQ Analysis start ---------------------

if ( $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "$env:MsBuildScanner\SonarScanner.MSBuild.dll" begin `
    /k:$env:SonarProjectKey `
    /v:$env:APPVEYOR_BUILD_VERSION `
    /o:$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    /d:sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    /d:sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    /d:sonar.typescript.tsconfigPath=$env:TsConfig `
    /d:sonar.exclusions="$env:SonarExclusions" `
    /d:sonar.coverage.exclusions="$env:SonarCoverageExclusions" `
    /d:sonar.pullrequest.base=master `
    /d:sonar.pullrequest.branch=$env:APPVEYOR_REPO_BRANCH `
    /d:sonar.pullrequest.key=$env:APPVEYOR_PULL_REQUEST_NUMBER `
    /d:sonar.pullrequest.provider=GitHub `
    /d:sonar.pullrequest.github.repository=$env:APPVEYOR_REPO_NAME
}
elseif ( $env:APPVEYOR_REPO_BRANCH -Eq "master" )
{
    dotnet "$env:MsBuildScanner\SonarScanner.MSBuild.dll" begin `
    /k:$env:SonarProjectKey `
    /v:$env:APPVEYOR_BUILD_VERSION `
    /o:$env:SonarOrg `
    /d:sonar.host.url=$env:SonarUrl `
    /d:sonar.login=$env:SonarKey `
    /d:sonar.cs.opencover.reportsPaths=$env:CsCoverage `
    /d:sonar.typescript.lcov.reportPaths=$env:LcovInfo `
    /d:sonar.testExecutionReportPaths=$env:APPVEYOR_BUILD_FOLDER/$env:ClientApp/$env:TsReportPath `
    /d:sonar.typescript.tsconfigPath=$env:TsConfig `
    /d:sonar.exclusions=$env:SonarExclusions `
    /d:sonar.coverage.exclusions="$env:SonarCoverageExclusions"
}

dotnet build

if ( ( $env:APPVEYOR_REPO_BRANCH -Eq "master" ) -Or $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet "C:\ProgramData\chocolatey\lib\sonarscanner-msbuild-netcoreapp2.0\tools\SonarScanner.MSBuild.dll" end /d:sonar.login=$env:SonarKey
}

Write-Host -------------------------------------- SQ Analysis done- ---------------------
Write-Host -------------------------------------- Netcore done --------------------------
Write-Host -------------------------------------- Run test complete ---------------------