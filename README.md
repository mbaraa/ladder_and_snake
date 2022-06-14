# game_task

### Tech Stack:
- Backend: NodeJS
- Frontend: ReactJS
- Database: MySQL
- CSS Framework: Tailwind CSS
- Database ORM: Sequelize

--- 

### Run:
1. Create the games database
```sql
    DROP DATABASE the_game;
    CREATE DATABASE the_game;
```

2. Modify the database creditials in the backend's config file `/src/config.ts`
```ts
    const config = {
      db_user: "DBUSER",
      db_password: "DBPASSWORD",
      db_host: "localhost",
      jwt_secret: "MUCHSECRETKEY",
      port: 8080,
    }
```

3. Fetch projet's dependencies
Run
```sh
    make fetch
```

If you don't have `make` run
```sh
    cd ./server && npm install
    cd ../client && npm install
```

4. Run the backend's server
```sh
   make runb 
```

If you don't have `make` run
```sh
    cd ./server && npm start
```

5. Run the frontend's server
```sh
   make runf
```

If you don't have `make` run
```sh
    cd ./client && npm start
```

6. Or visit this site
```url
    https://game-task.vercel.app
```
