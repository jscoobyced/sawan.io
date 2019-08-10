#!/bin/bash

TOKEN="ABCDEF123456"
VERSION=${CIRCLE_BUILD_NUM}
REPONAME=${CIRCLE_PROJECT_REPONAME}
USER=${CIRCLE_PROJECT_USERNAME}
BRANCH=${CIRCLE_BRANCH}
DESCRIPTION=$1
REPOURL="https://github.com/${USER}/${REPONAME}/"

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
echo "Create release ${VERSION} for branch: ${BRANCH}"
echo ${REPOURL}/releases?access_token=${TOKEN}