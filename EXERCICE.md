# Vue & Node exercice

## Getting Started

### Prequisites
- Node.JS 16+
- Mariadb Server (or Mysql Server), either [installed locally](https://mariadb.org/) or ran in a docker instance

### Recommended Tools
- Editor: Visual Studio Code with a vuejs extension (Vetur or Volar) and i18n Ally extensions
- SQL Browser: HeidiSql or Dbeaver
- (Optionnal) API Tester: Postman

### Create local database
- Open a SQL Browser
- Connect to your local server (by default 127.0.0.1:3306) with the root credentials (root and the password you set at installation time)
- Create the database (name: exercice, encoding: utf8mb4_general_ci, Engine: InnoDB)

### Backend Settings (Optionnal)
Default settings can be overrided by creating a `backend/.env.local` file. Example:
```
DB_CONNECTION_URI=mariadb://root:password@127.0.0.1:3306/exercice
PORT=3000
```

### Run backend
```
cd backend
npm install
npm start
```

### Run frontend
```
cd frontend
npm install
npm start
```

Open app in your browser: [http://localhost:8080/](http://localhost:8080/)

## App description

This app allow registered users to login to their event dashboard

The App is currently made of 2 screens:

- A login screen which allow registered users to connect
- A Home screen which display currently logged-in user data

Users can currently login using their phone number through the following workflow:

- User enter his phone number
- A random numeric code is generated and sent to the user by SMS (In this exercice **the message is not really sent but printed to the server console instead**)
- User enter the code

Some test data is inserted at first run in order to ease testing:

- John Doe (06 12 34 56 78)
- Jean Dupont (06 00 00 00 00)

## Tech stacks

- **Backend**: NodeJS + ExpressJS + [Sequelize](https://sequelize.org/)
- **Frontend**: Vue 2 + VueRouter + Vuex + Vue i18n + [Vuetify](https://vuetifyjs.com)

## Exercice

The purpose of the exercice is to extend the App with an alternative login method, using user's lastname and registration number to authenticate.
The registration number is a 5 to 8 digits number which is not yet available in the app model
TODO:

- [ ] Add registration number field in user model (and update test data with some sample registration numbers to be able to test)
- [ ] Add needed backend endpoint to login using lastname and registration number
- [ ] Add a link at the bottom of the login form to switch to the alternative login method
- [ ] Implement alternative login form
