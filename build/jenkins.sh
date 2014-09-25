
START_TIME=$(date '+%s')
CURRENT_BRANCH=$(hg branch)

hg up --clean $CURRENT_BRANCH

rm -rf node_modules

sh setup.sh

grunt build --no-color --stack

END_TIME=$(date '+%s')

echo ">> built in `expr $END_TIME - $START_TIME` s"
