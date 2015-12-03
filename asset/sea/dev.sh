#!/bin/bash

gulp
echo gulp $?
sleep 1s
cp -fr src/main/webapp/asset/dist/* target/sea-1.0.0-SNAPSHOT/asset/dist
echo dist $?
cp -fr src/main/webapp/WEB-INF/view/* target/sea-1.0.0-SNAPSHOT/WEB-INF/view
echo view $?
cp -fr src/main/webapp/WEB-INF/jsp/* target/sea-1.0.0-SNAPSHOT/WEB-INF/jsp
echo jsp $?