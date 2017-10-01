#!/bin/bash

# API="http://localhost:4741"
API="https://foodbucket.herokuapp.com"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
      "restaurants": "'"${ID}"'"
  }'

echo
