rm -Rf ./deploy;
echo 'folder deleted';
yarn tsc;
git add deploy/;
git commit -m 'feat: udpate deploy';