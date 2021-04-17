#!/bin/ash
set -e

cd $APP_ROOT
echo APP_ROOT: $APP_ROOT
echo BASE_URL: $BASE_URL
echo BROWSER_BASE_URL: $BROWSER_BASE_URL
echo FIREBASE_AUTH_KEY: $FIREBASE_AUTH_KEY
echo FIREBASE_ADMIN_KEY: $FIREBASE_ADMIN_KEY
cd /app/hairsalon_bayashi_front
npm run start
