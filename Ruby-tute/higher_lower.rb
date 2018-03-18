#!/usr/bin/env ruby

print "I'm thinking of a number between 1 and 100. Try to guess it! > "

correct_answer = rand(1..100)

while true do
    
    user_guess = Integer(gets.chomp)

    if user_guess == correct_answer
        puts "YOU GOT IT!"
        break
    end

    if user_guess < 0 || user_guess > 100
        print "I said between 1 and 100 :| Try again! > "
        next
    end
    
    if user_guess < correct_answer
        print "Higher > "
        next
    end

    if user_guess > correct_answer
        print "Lower > "
        next
    end

end

