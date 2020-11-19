# HR

A simple HR application based on 3-Tier architecture built on PHP and React. 

## Installation

Ensure your system matches the following dependencies
- yarn version: 1.16.0
- node version: 10.15.0
- PHP version: 7.1.16
- MySQL version: 5.0
- httpd (apache): 2.4.33

Create a new database on your local MySQL, it can be named “hr”. Then run the “create-tables.sql” file located at the root of the git repository. After running it ensure that two tables are created. The SQL query already contain data entries for application to consume.

To set up the backend application you must point your localhost to the API directory.

Once the backend application is accessible via localhost, modify the “.env” file on the root of the “UI” folder. The variable “REACT_APP_API_DOMAIN_URL” should point to the backend application URL set up on the previous step.

Run the following commands to start the React application:
```bash
yarn install
yarn start
```

Test can be run on both projects using:
```bash
./vendor/bin/phpunit test
yarn test
```