#!/bin/bash

docker run --rm -it -t --link my-mongo:mongo jscdroiddev/mongodb:latest bash
