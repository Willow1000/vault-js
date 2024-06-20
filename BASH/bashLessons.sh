# age=34
# if (( ($age >= 10) && ($age <= 50) ));then
# echo correct
# else
# echo incorrect
# fi

# for (( i=0;i<=10;i++ ))
# do
#     echo $i
# done    

# arg=(1,2,3,4,5)
# echo $#

# while read line
# do
#     echo $line
# done <"${1:-/dev/stdin}"

# ls +la  1>file1.txt 2>file2.txt #stdout and stderror stored in different files

# ls -la >& file.txt #stdoutn and std error stored in the same file

string1="niaje"
string2="poa"

if (( $string1 \> $string2 ));then
echo yes
else
echo no
fi
