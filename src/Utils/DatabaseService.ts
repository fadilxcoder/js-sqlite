export class DatabaseService
{
    readonly db: Database = window.openDatabase("InMemoryAppDatabase", "1.0", "In Memeory SQLite Database", 200000);

    getConnection(): Database {
        return this.db;
    }
}