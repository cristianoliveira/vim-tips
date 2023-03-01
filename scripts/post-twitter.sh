curl -XPOST $SERVICE_API_URL/twitter \
  -H "Content-Type: application/json" \
  -d '{"secret": "'"$VIM_TIPS_API_SECRET"'"}'
