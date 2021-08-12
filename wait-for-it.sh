#!/usr/bin/env bash
# Use this script to test if a given TCP host/port are available
while ! curl -o - gromo_db:3306 ; do
  echo "waiting"
  sleep 1
done
echo "DB connected"
npm run dev
