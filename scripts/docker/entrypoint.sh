#!/bin/bash

# make sure we can write to stdout and stderr as "mongodb"
chown --dereference mongodb "/proc/$$/fd/1" "/proc/$$/fd/2" || :

# TODO: import files from /data/scripts/*.json and rename to .json.done

exec "$@"