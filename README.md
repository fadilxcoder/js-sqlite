# Notes

- DB PATH : `C:\Users\<USER>\AppData\Local\Google\Chrome\User Data\Default\databases\<FOLDER_OF_DB>`
- Surge auto deploy Github Action
- - `surge token`
- - Enter email : `ud.....`
- - Enter password : `xxxxxx`
- - Copy token `3344XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX91d`
- Github secret
- - `SURGE_TOKEN` : `3344XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX91d`
- - `SURGE_DOMAIN` : `https://js-sqlite.surge.sh/`

# URL

- https://fadilxcoder.github.io/js-sqlite/ - Default GA
- https://js-sqlite.surge.sh/ - Personalize GA

# Surge.sh Docs

- https://surge.sh/help/getting-started-with-surge (Documentation)
- `.surgeignore` to ignore file
- `surge list` listing all projects
- `surge teardown xxxxxxx.surge.sh` - Remove a project

# Developer 

- `tsc --init`
- `npm init`
- `touch webpack.config.js`
- `npm i`
- `npm run compile`
- Use `npm i @types/websql` in order to be able to `db: Database = window.openDatabase("TokenSqliteDB", "1.0", "Token SQLite Database", 200000);`