# seng513-202401-group-14

# VoyageVista

Time to find a new destination to fall in love with, with VoyageVista! VoyageVista is a web application that allows users to search for travel destinations and view information about them. Users can also create an account and save their favorite destinations to their profile. 

VoyageVista is built using React, Django, and Postgres.

## Getting started

#### Downloading the repository
1. Clone the repository `git clone git@csgit.ucalgary.ca:karl.winkler/seng513-202401-group-14.git`
2. cd into the repository `cd seng513-202401-group-14`

#### Starting the app
3. run the following commands to start the app:

    `make build`

    `make up`

#### Setting up the database
5. in a new terminal window, run `make migrate`
6. you can either run `make loaddata` to load the initial data, additionally you can run 
`make createsuperuser` to create a superuser and then log in to the admin interface to add data manually

#### Viewing the app
7. Open your browser and navigate to http://localhost:3000

## Deveopment Process
### Git
  - When making changes to the code, create a new branch and make a pull request to merge the changes into the main branch
  - follow the naming convention `feature/feature-name` for feature branches and `bugfix/bug-name` for bug branches
  - follow the naming convention `feat: feature-name` for feature commit messages and `fix: bug-name` for bug commit messages
### Backend
  - When making changes to models run `make makemigrations` and `make migrate` to apply changes to the database

