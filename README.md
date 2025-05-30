Welcome to NotionMail!

I implemented a mini email app in Javascript called "NotionMail" that is to be used inside the Notion application. It allows you to email things such as files, notes, and reminders to yourself as well as other people within Notion itself. It supports send, read and delete for your all of your emailing needs! The program is designed to run until exit, so you will need to enter "exit" in your command line interface of choice to exit out of NotionMailI also added an 'exit' command to prevent the user from getting stuck in an infinite loop, as I designed the program to run until exit. I implemented the program this way because it allows the user to be able to run multiple commands in one program and to try typing a command again if their input was invalid.

Installation:

Ensure you have Node Version 18 or up :)

Check node version:

node -v

Get unique database ID and API key from Notion and put in .env file.

Go to Notionmail Directory:

cd Notionmail

To Run:

node notionmail.js
