# #!/bin/bash

# until [[ $choice == "coffee" ]]
# do
# 	echo "What is beverage would you like to drink? TEA || COFFESS: "
# 	read choice
# done

# echo Excellent choice your $choice will be ready shortly

# sleep 2

# echo When is today? 
# read day

# case in $day;
# 	(1
# 		it="Monday"
# 		;;
# 	(2
# 		it="Tuesday"
# 		;;
# esac

# echo $it

# number=82

# for i in {1..89}	
# do
# if (( $((i%2 == 0)) ));then
# echo $i
# fi
# done
# if   (( (( $number%2 )) == 1 ));then
# 	echo EVEN
# else
# 	echo ODD
# fi		

# sleep 2

echo ENTER THE NUMBER:
read number
count=0
while (( $number != 1 ))
do
	if (( $(( number%2 )) ==0 ));then
		number=$(( ((number/2 )) ))
		(( count++ ))
		echo $number
	else
		number=$(( ((number*3))  + 1 ))
		(( count++ ))
		echo $number
	fi
done	

echo $count
