#!/bin/bash

# API="http://localhost:4741"
API="https://foodbucket.herokuapp.com"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
      "restaurants": "'"${ID}"'"
  }'

echo
