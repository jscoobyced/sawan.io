#!/bin/bash
cd /home/cedric/www/sawan.io/app
dotnet sawan.dll > ../logs/sawan.log & echo $! > ../sawan-io.pid
