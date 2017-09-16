#!/bin/bash

# API="http://localhost:4741"
API="https://foodbucket.herokuapp.com/"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"

echo
