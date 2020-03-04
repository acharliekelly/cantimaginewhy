#!/bin/bash

curl \
  -H "Content-Type: application/json" \
  -d '{
        "expression": "context.album='${ALBUM}'",
        "with_field": ["context", "tags"],
        "sort_by": [{"public_id": "desc"}],
        "max_results":100
      }' \
  "https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/cantimaginewhy/resources/search"

  echo
