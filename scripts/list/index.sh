#!/bin/sh

# API="http://localhost:4741"
API="https://foodbucket.herokuapp.com"
URL_PATH="/list"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
