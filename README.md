Welcome to NotionMail!

NotionMail is a Node.js CLI that uses the Notion API to let you send, read and delete “mail” pages (with sender, recipient, message and timestamp properties) in your personal Notion database; it loops until you type exit so you can run multiple commands or retry invalid input.

<img width="986" alt="Screenshot 2025-06-08 at 19 12 21" src="https://github.com/user-attachments/assets/874eaf88-cc2d-4c91-8796-e27c75515b80" />

Install Node.js version 18 or higher (check by running node -v; you should see v18.x.x or above).

Download or clone the NotionMail project and change into its folder (cd NotionMail).

Install its dependencies by running 

npm install

In the project root, create a file called .env and add two lines:

APIKEY=<your Notion integration secret>
DATABASEID=<your Notion database ID>

Start the CLI with 

node notionmail.js
