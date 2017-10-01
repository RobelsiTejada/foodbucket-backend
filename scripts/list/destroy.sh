#!/bin/bash

# API="http://localhost:4741"
API="https://foodbucket.herokuapp.com"
URL_PATH="/list"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"


echo
