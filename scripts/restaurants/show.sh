#!/bin/sh

# API="http://localhost:4741"
API="https://foodbucket.herokuapp.com"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
