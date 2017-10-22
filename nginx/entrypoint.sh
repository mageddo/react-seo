#!/bin/bash

echo "> setup dns server $NAMESERVER"
export NAMESERVER=`cat /etc/resolv.conf | grep "^nameserver" | awk '{print $2}' | tr '\n' ' '`
echo "resolver $NAMESERVER ipv6=off valid=5s;" > /etc/nginx/conf.d/dnsserver.conf

echo "> starting nginx server"
nginx -g 'daemon off;'
