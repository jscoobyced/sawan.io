#!/bin/bash

TOKEN="${GitHubReleaseToken}"
VERSION=1.1.${CIRCLE_BUILD_NUM}
REPONAME=${CIRCLE_PROJECT_REPONAME}
USER=${CIRCLE_PROJECT_USERNAME}
BRANCH=${CIRCLE_BRANCH}
DESCRIPTION=$1
REPOURL="https://api.github.com/repos/${USER}/${REPONAME}"

generate_post_data()
{
  cat <<EOF
{
  "tag_name": "${VERSION}",
  "target_commitish": "${BRANCH}",
  "name": "${VERSION}",
  "body": "${DESCRIPTION}",
  "draft": false,
  "prerelease": false
}
EOF
}

echo $(generate_post_data)

wget -q --post-data="$(generate_post_data)" ${REPOURL}/releases?access_token=${TOKEN} -O release.json