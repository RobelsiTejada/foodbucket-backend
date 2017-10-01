#!/bin/bash

# API="http://localhost:4741"
API="${API_ORIGIN:-https://foodbucket.herokuapp.com}"
URL_PATH="/list"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \


echo
