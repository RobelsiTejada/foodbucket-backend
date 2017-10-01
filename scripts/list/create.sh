#!/bin/bash

# API="http://localhost:4741"
API="https://foodbucket.herokuapp.com"
URL_PATH="/list"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "list": {
      "restaurants": "'"${ID}"'"
    }
  }'

echo
