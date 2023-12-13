rm -r /Users/apple/Desktop/STAnnotation/django/static
rm /Users/apple/Desktop/STAnnotation/django/asset-manifest.json
rm /Users/apple/Desktop/STAnnotation/django/index.html
# rm /Users/apple/Desktop/STAnnotation/django/favicon.ico
echo "Delete original static files"
cp -r build/static /Users/apple/Desktop/STAnnotation/django/static
cp build/asset-manifest.json /Users/apple/Desktop/STAnnotation/django/asset-manifest.json
# cp build/favicon.ico /Users/apple/Desktop/STAnnotation/django/favicon.ico
cp build/index.html /Users/apple/Desktop/STAnnotation/django/index.html
echo "Finish Copy"