#!/bin/bash

curl "https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/cantimaginewhy/resources/search" \
  -H "Content-Type: application/json" \
  -d '{
        "expression": "resource_type:image AND tags=acrylic",
        "sort_by": [{"public_id": "desc"}],
        "max_results":30
      }'
  
