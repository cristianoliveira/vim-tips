CONTENT="#!/bin/sh
cd /var/www/vim-tips/
sh ./scripts/restart-docker.sh"

echo CONTENT > ./.git/hooks/post-receive
chmod +x ./.git/hooks/post-receive
