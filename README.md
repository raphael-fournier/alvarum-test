# Alvarum test

## Run the project


### Prequisites
- [Docker engine](https://mariadb.org/)

</br>

### With docker
```
$ docker-compose up -d
```

This will start all the services needed to run the project:
- mariadb (port 3306)
- backend (port 3000)
- frontend (port 8080)

Open app in your browser: [http://localhost:8080/](http://localhost:8080/)

Note: The frontend service entrypoint command may take a while to finish, the app won't be directly accessible even if the container is up and green.
You can check the logs with `docker-compose logs -f frontend` to see when it's done. 

</br>

### Localy with node

 - Install node 16

#### Run db
```
docker-compose up -d mariadb
```

#### Run backend
```
cd backend
npm install
npm start
```

#### Run frontend
```
cd frontend
npm install
npm start
```

Open app in your browser: [http://localhost:8080/](http://localhost:8080/)

</br>

## Description

According to the exercise requierements, there is now a new form to login as a user using the last name and a registration number.

Here are the credentials for the test users:
- John Doe (registration number: 12345)
- Jean Dupont (registration number: 123456)
- Louis Dubois (registration number: 1234567)
- Louise Morel (registration number: 12345678)


This is accessible at [http://localhost:8080/signin/registrationNumber](http://localhost:8080/signin/registrationNumber)

or directly from an http request to the new endpoint:
```
 $ curl --location --request POST 'http://localhost:3000/api/auth/loginWithRegistrationNumber' \
--header 'Content-Type: application/json' \
--data-raw '{
    "last_name": "dubois",
    "registration_number": "1234567"
}'
```

## Notes

- I decided to split the two forms using differents routes (/signin/:type). I could also have used a query parameter (/signin?type=registrationNumber) and parse the url, or simply keep everything on the exact same route (/signin) and switch between the two forms using javascript. I was not sure which one was the best practice but I thought it was better to have a route for each form in order to easily share a specific link to the users.

- There are many deprecation warnings due to vuetify even with the latest version, I did not dig into it because I don't think it was the point of this exercise and it can be due to my local node version.