//Amy Gonzalez
//NotionMail

require('dotenv').config();
const { Client } = require('@notionhq/client');
const readline = require('readline');

//Initialize Notion client
const notion = new Client({ auth: process.env.APIKEY });
//Initialize Database ID
const databaseID = process.env.DATABASEID;
//Stdin and Stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Send Mail
async function sendMail() 
{
  rl.question('Sender: ', (sender) => 
    {
    rl.question('Recipient: ', (recipient) => 
      {
      rl.question('Message: ', async (message) => 
        {
        try 
        {
          const response = await notion.pages.create({
            parent: { database_id: databaseID },
            properties: 
            {
              Message: 
              {
                title: [
                  {
                    text: 
                    {
                      content: message
                    }
                  }
                ]
              },
              Sender: 
              {
                rich_text: [
                  {
                    text: 
                    {
                      content: sender
                    }
                  }
                ]
              },
              Recipient: 
              {
                rich_text: [
                  {
                    text: 
                    {
                      content: recipient
                    }
                  }
                ]
              },
              Timestamp: 
              {
                date: 
                {
                  start: new Date().toISOString()
                }
              }
            }
          });
          console.log('Message sent successfully!');
        } catch (error) 
        {
          console.error('Error sending message:', error);
        } finally 
        {
          main();
        }
      });
    });
  });
}

// Read Mail
async function readMail() 
{
  rl.question('User: ', async (user) => {
    try 
    {
      const response = await notion.databases.query({
        database_id: databaseID,
        filter: 
        {
          property: 'Recipient',
          rich_text: 
          {
            equals: user
          }
        }
      });

      if (response.results.length === 0) 
      {
        console.log('No messages found.');
      } else 
      {
        console.log(`Messages (${response.results.length}):`);
        response.results.forEach((page, index) => {
          const sender = page.properties.Sender.rich_text[0]?.text?.content || 'Unknown';
          const message = page.properties.Message.title[0]?.text?.content || 'No message';
          const timestamp = page.properties.Timestamp.date?.start || 'No timestamp';

          console.log(`\nMessage ${index + 1}:`);
          console.log(`From: ${sender}`);
          console.log(`At: ${timestamp}`);
          console.log(`${message}`);
        });
      }
    } catch (error) 
    {
      console.error('Error reading messages:', error);
    } finally 
    {
      main();
    }
  });
}

// Delete Mail by Unique ID
async function deleteMail() 
{
  rl.question('Enter the unique message ID to delete: ', async (messageID) => {
    try 
    {
      //parse the messageID as a number
      const numericID = Number(messageID);
      if (isNaN(numericID)) 
      {
        console.log('Please enter a valid numeric ID.');
        main();
        return;
      }
      
      const findResponse = await notion.databases.query({
        database_id: databaseID,
        filter: 
        {
          property: 'ID', // Make sure this matches the property name in your database
          formula: 
          {
            number: 
            {
              equals: numericID
            }
          }
        }
      });

      if (findResponse.results.length === 0) 
      {
        console.log('No message found with that ID.');
      } else 
      {
        const pageToDelete = findResponse.results[0];
        await notion.pages.update({
          page_id: pageToDelete.id,
          archived: true
        });
        console.log('Message deleted successfully!');
      }
    } catch (error) 
    {
      console.error('Error deleting message:', error);
    } finally 
    {
      main();
    }
  });
}

//Main function
function main() 
{
  console.log('Welcome to NotionMail!');
  console.log('Please select an option:');
  console.log('- send: Send mail to a user.');
  console.log('- read: Check a user\'s mail.');
  console.log('- delete: Delete a message by its unique ID.');
  console.log('- exit: Exit NotionMail.');
  rl.question('> ', (option) => {
    switch (option.toLowerCase()) 
    {
      case 'send':
        sendMail();
        break;
      case 'read':
        readMail();
        break;
      case 'delete':
        deleteMail();
        break;
      case 'exit':
        rl.close();
        process.exit(0);
      default:
        console.log('Invalid option. Please try again.');
        main();
    }
  });
}
main();
