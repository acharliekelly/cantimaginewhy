#!/bin/bash

curl \
  -H "Content-Type: application/json" \
  -d '{
        "expression": "folder=photos AND context.ref='${REF}'",
        "with_field": ["context", "tags"],
        "sort_by": [{"public_id": "desc"}],
        "max_results": 10
      }' \
  "https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/cantimaginewhy/resources/search"

  echo
