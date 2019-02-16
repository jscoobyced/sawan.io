Write-Host -------------------------------------- Build start ---------------------------
Write-Host -------------------------------------- ClientApp -----------------------------

Set-Location $env:APPVEYOR_BUILD_FOLDER/$env:ClientApp
yarn install --silent --no-progress
yarn build --silent --no-progress
Set-Location $env:APPVEYOR_BUILD_FOLDER

Write-Host -------------------------------------- ClientApp done ------------------------
Write-Host -------------------------------------- Netcore -------------------------------

dotnet restore
dotnet build

Write-Host -------------------------------------- Netcore done --------------------------
Write-Host -------------------------------------- Build complete ------------------------