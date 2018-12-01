#!/bin/bash
cd /home/cedric/www/sawan.io/app
GitHub__WebHookToken="YOUR GITHUB TOKEN" dotnet sawan.dll > ../logs/sawan.log & echo $! > ../sawan-io.pid
