Write-Host -------------------------------------- Publish -------------------------------

if ( -Not $env:APPVEYOR_PULL_REQUEST_NUMBER )
{
    dotnet publish --output=$env:APPVEYOR_BUILD_FOLDER/publish
}
Write-Host -------------------------------------- Publish complete ----------------------