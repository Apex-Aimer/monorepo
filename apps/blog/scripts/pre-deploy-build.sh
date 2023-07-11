#!/bin/sh

BASEDIR=$(dirname $0)

cd $BASEDIR/..

npx dotenv -e ../../.env -- npx @cloudflare/next-on-pages@1