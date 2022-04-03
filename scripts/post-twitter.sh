curl -XPOST https://vim-tips.herokuapp.com/twitter \
  -H "Content-Type: application/json" \
  -d '{"secret": "'"$VIM_TIPS_API_SECRET"'"}'
