Installation:

Ensure you have Node Version 18 or up.

Check node version:

node -v

Get unique database ID and API key from notion and put in .env file.

Go to Notionmail Directory:

cd Notionmail

To Run:

node notionmail.js

Hello and welcome to NotionMail!
My name is Amy Gonzalez and I implemented the simple mail app in Javascript.
It supports send and read as well as deletion. I also added an 'exit' command to prevent the user from getting stuck in an infinite loop, as I designed the program to run until exit. 
I did it this way because it allows the user to be able to run multiple commands in one program and to try typing a command again if their input was invalid.
I designed the 'delete' command to take in the unique ID of a certain message and delete the corresponding message. To do this, I added an 'ID' property in the database that increments by one each time a new message is sent.
