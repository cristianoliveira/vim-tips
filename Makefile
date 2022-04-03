.PHONY: deploy watch-logs

deploy:
	git push heroku main

watch-logs:
	heroku logs --tails
