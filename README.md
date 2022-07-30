# Retailer rewards
Sample requets are in folder - requests

## Tech
* Docker v20.10.17
* Nodejs v16.15.0
* Nestjs v9.0.0
* Typeorm v9.0.0
* PostgreSQL v14.0.0 

## Running the app
The project requires [Docker](https://www.docker.com/)
By default, the Docker will expose port 3000

You need to create .env.development file with following enviroment variables:

###### Note: This is for development purpose and please use this config
* POSTGRES_HOST=retailer-rewards-db
* POSTGRES_PORT=5432
* POSTGRES_USER=postgres
* POSTGRES_PASSWORD=postgres
* POSTGRES_DATABASE=retailer_rewards
* POSTGRES_DATABASE_test=retailer_rewards_test

```sh
$ docker-compose up
```

## Migrations

```sh
docker exec -it retailer-rewards-server sh
npm run migration:generate --migration=<migration_name>
npm run migration:run
```

## Seed data

```sh
docker exec -it retailer-rewards-server sh
npm run seed
```

## Test

Todo

## Datasets
### Users
![N|Solid](https://i.postimg.cc/WzQNq7WB/users-data-set.png)

### Payments
![N|Solid](https://i.postimg.cc/P5dxWSrH/paymente-data-set.png)

### Monthly reports
![N|Solid](https://i.postimg.cc/c4xyT2YF/monthly-report-data-set.png)

### Monthly reports by quarter
![N|Solid](https://i.postimg.cc/Rhv8sJ3W/quarters-data-set.png)