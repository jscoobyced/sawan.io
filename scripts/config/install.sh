#!/bin/sh
sudo cp sawanio.service /etc/systemd/system/sawanio.service
sudo chmod 664 /etc/systemd/system/sawanio.service
sudo systemctl daemon-reload
sudo systemctl start sawanio.service
sudo systemctl enable sawanio.service
sudo cp nginx/sawan-io /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/sawan-io /etc/nginx/sites-enabled/sawan-io
sudo nginx -t & sudo nginx -s reload