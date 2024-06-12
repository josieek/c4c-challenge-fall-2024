## How to Start the Application
1. In a terminal, run `npm install` **at the root of this project** to install the required packages
2. Run `npm run dev` **at the root of this project** to start the app locally
3. Visit `http://localhost:3000` to view the website

## High Level Overview

In the frontend, I added to the PartnerTile.jsx starter code and created a new AddPartner.jsx file. These are responsible for visual rendering and expecting user input.

I added the 'addNewPartner' and 'deletePartner' functions to Dashboard.jsx. 'addNewPartner' is passed into the function AddPartner as a parameter and 'deletePartner' is passed into the function PartnerTile. When the 'submit' button is clicked, the user entered data is passed into 'addNewPartner' and this change is reflected in Dashboard. When a delete button is clicked, the name of that respective partner is passed as a parameter in 'deletePartner' and the Dashboard removes this from the list of partners.

Dashboard includes filtering partners by name and whether or not c4c is active with them.

The AddPartner.jsx file returns a container with a display prompting the user to enter information about a new partner. When the 'submit' button is pressed, a post request is made to the backend server at the endpoint '/add-partner', , sending a JSON string with the name of the partner.
In the backend I added two post requests with end points 'del-partner' and 'add-partner' which receives new partner data from the frontend and either adds or deletes the partner to the list. This is unneccessary for the current functionality but would be useful in potential further applicaitons, such as permanently storing the database for future access.

## Design Decisions

# Frontend

1. Seperate Responsibilities.
   Frontend handles visual rendering and user interactions, while backend handles data storage and manipulation.

2. State Management
   useState was used to manage the state of partner data that is visually renderd by Dashboard, so actions such as adding a new partner or searching is immediately reflected on the UI.

3. Error Handling
   I send specific error messages to both the frontend and backend whenever there is an issue with receiving or sending data. 

4. Frontend Design
   Whether or not the partner is active toggles between green and red, allowing users to quickly scan through the database to find active partners.
   The delete button was moved to the top right of the tile where delete buttons are conventionally placed, rather than the bottom as was in the example. 

## Reflection
This project was my introduction to jsx and http requests. The task I had the most difficulty with was sending data from the frontend to the backend. It was not intuitive to me to use http requests, so at first I was trying to return the data from the jsx components in a function and call that function from an object of that jsx class within server.js. I was getting nowhere where this but some YouTube tutorials helped me realize http requests were a much simpler solution. So I made post requests in the AddPartner and PartnerTile files to send data which was received in a post request in server.js where it was saved. However, this required refreshing the browser to see the reflected changes. It wasn't until I started looking up how to add a search bar that I found tutorials on utilizing state management to see instant visual changes. I then used a similar process, changing the state in Dashboard, for adding and deleting partners.

Overall I had a lot of fun with this project though! My greatest regret is starting the project as late as I did (Monday afternoon), otherwise I would've had time to implement additional features. I've been especially busy with co-op, an online class, and preparing for a robotics competition. I'll have more time this fall though, especially when robotics is no longer in grindtime mode.

This is the starter code for Code4Community's technical challenge for Fall 2024. 
For more detailed information about each of the parts of this starter code, check out the [`INFO.md`](INFO.md) file

## Prerequisites

If you don't have them already, you'll need to install Node.js/NPM and Git:
- Node.js + NPM - install [here](https://nodejs.org/en/download/package-manager) (we highly recommend using at least Node 18.0.0 + NPM 8.6.0)
   - You can choose to install via the command line under "Package Manager", or download an installer under "Prebuilt Installer"
   - Node and NPM are installed together
- Git - install [here](https://git-scm.com/downloads)

## Setup Instructions

1. Clone this repo on to your computer. You can do so with the [desktop app](https://desktop.github.com/), or in a terminal with the following:
```
git clone https://github.com/huang0h/c4c-challenge-fall-2024.git
```
2. In a terminal, run `npm install` **at the root of this project** to install the required packages
3. Run `npm run dev` **at the root of this project** to start the app locally
4. Visit `http://localhost:3000` to view the website
    
    4a. The backend will be available at `http://localhost:4000`
