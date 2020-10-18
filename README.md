# google_script_qnet
#### this project is script for spreadsheet namelist

[Git Guide For TS](https://github.com/google/clasp/blob/master/docs/typescript.md)

[Clasp Guide Link](https://github.com/google/clasp)

# How to Share this feautre.
- Create a new google account (say account X)
- Follow Steps in account X
    - Sign in to Google Drive
    - Create a new spreadsheet
    - Share as editor to the specified person
    - Go to Tools -> Script Editor -> File -> Project Properties
    - Copy Script ID and share it with specified person
    - Close the script tab
    - Ask the specified person to setup the spreadsheet
    - Refresh the Spreadsheet.
    - Done!

# Setup Computer for pushing code for mac os (specified person)
- install node.js from [here](https://nodejs.org/en/download/current/)
- install clasp globally `npm install @google/clasp -g`
- clone this repository to a folder `git clone https://github.com/iitnmohit/google_script_qnet.git`
- go to project folder `cd google_script_qnet`
- login to google account `clasp login`
- open `.clasp.json` file and replace `scriptid`
- push the code `clasp push`
- Done!