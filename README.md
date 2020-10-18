# google_script_qnet
#### this project is script for spreadsheet namelist

[Git Guide For TS](https://github.com/google/clasp/blob/master/docs/typescript.md)

[Clasp Guide Link](https://github.com/google/clasp)

# How to Share this feautre.
- Create a new google account (say account X)
- Follow Steps in account X
    - Sign in to Google Drive
    - Create a new spreadsheet
    - Share as edior to below person
    - Go to Tools -> Script Editor -> File -> Project Properties
    - Copy Script ID and share below person
    - Close the script tab
    - ask below person to push code
    - Refresh the Spreadsheet.
    - Done!

# Setup Computer for pushing code for mac os
- install node.js from [here](https://nodejs.org/en/download/current/)
- install clasp globally `npm install @google/clasp -g`
- clone this reposatory to a folder `git clone https://github.com/iitnmohit/google_script_qnet.git`
- go to project folder `cd google_script_qnet`
- login to google account `clasp login`
- open `.clasp.json` file and replace `scriptid`
- push the code `clasp push`
- Done!