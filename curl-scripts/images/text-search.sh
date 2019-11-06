#!/bin/bash

curl \
  -H "Content-Type: application/json" \
  -d '{
        "expression": "folder=art AND '${SEARCH}'",
        "with_field": ["context", "tags"],
        "max_results": 50
      }' \
  "https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/cantimaginewhy/resources/search"

  echo
