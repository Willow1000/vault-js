#!/bin/bash

ls -la 1>file0.txt 2> file3.txt

while read line
do
	echo $line
done<"${1:-/dev/stdin}"
niaje=(food shelter clothing healthcare)
echo ${#niaje}

