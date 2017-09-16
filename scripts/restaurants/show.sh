#!/bin/sh

API="https://api.yelp.com/v3"
URL_PATH="/businesses"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer NHG0larijXXaQKiCWF1D7zz_vpxcnFDPMoIz-i1tRcxdx3Af18IVCYYLXfQGes0o_0R-2TiXKv3qHYs981_sNJiE3yjYZJAkDGEuqNKmzBpZuaxeaBnjF_PtQWC9WXYx" \
  --header "Authorization: Token token=$TOKEN"
  --data '{
    "businesses": [
      {
        "rating": "'"${RATING}"'",
        "price": "'"${PRICE}"'",
        "phone": "'"${PHONE}"'",
        "id": "'"${ID}"'",
        "is_closed": "'"${IS_CLOSED}"'",
        "categories": [
          {
            "alias": "'"${ALIAS}"'",
            "title": "'"${TITLE}"'"
          }
        ],
        "review_count": "'"${REVIEW_COUNT}"'",
        "name": "'"${NAME}"'",
        "url": "'"${URL}"'",
        "coordinates": {
          "latitude": "'"${LATITUDE}"'",
          "longitude": "'"${LONGITUDE}"'"
        },
        "image_url": "'"${IMAGE_URL}"'",
        "location": {
          "city": "'"${CITY}"'",
          "country": "'"${COUNTRY}"'",
          "address2": "'"${ADDRESS2}"'",
          "address3": "'"${ADDRESS3}"'",
          "state": "'"${STATE}"'",
          "address1": "'"${ADDRESS1}"'",
          "zip_code": "'"${ZIP_CODE}"'"
        },
        "distance": "'"${DISTANCE}"'",
        "transactions": ["'"${TRANSACTIONS}"'"]
      },
    ],
    "region": {
      "center": {
        "latitude": "'"${LATITUDE}"'",
        "longitude": "'"${LONGITUDE}"'"
      }
    }
  }'

echo
