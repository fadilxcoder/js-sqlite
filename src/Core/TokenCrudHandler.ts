import $ = require("jquery");
import { DatabaseService } from "../Utils/DatabaseService";

export class TokenCrudHandler
{
    // DB
    databaseService = new DatabaseService();
    db: Database = this.databaseService.getConnection();
    dataset: any = {};

    constructor() {
        this._init();
        this.start();
    }

    /**
     * Engine
     */
    start(): void {
        let thisObj = this;
        this.read();

        // Insert new token
        $(document).on('click', '#insert', function(e) {
            e.preventDefault();
            thisObj.create();
            thisObj.read();
        });

        // Load UI to update
        $(document).on('click', '.update', function(e) {
            let id: number = Number($(this).attr('data-idx'));
            e.preventDefault();
            thisObj._loadUpdateUI(id);
        });

        // Update token
        $(document).on('click', '#update', function(e) {
            e.preventDefault();
            thisObj.update();
            thisObj.read();
        });

        // Delete token
        $(document).on('click', '.delete', function(e) {
            let id: number = Number($(this).attr('data-idx'));
            e.preventDefault();
            if (confirm('Are you sure you want to delete this ?')) {
                thisObj.deleteRecord(id);
                thisObj.read();
            };
        });

        // Reset form
        $(document).on('click', '#reset', function(e) {
            e.preventDefault();
            thisObj._loadAndReset();
        });

        // Drop
        $(document).on('click', '#drop', function(e) {
            e.preventDefault();
            thisObj._tearDown();
            thisObj.read();
        });

        // Generate a random token
        $(document).on('click', '#generate', function(e) {
            e.preventDefault();
            $('#token').val(thisObj._generateRandomToken());
        });
    }

    /**
     * Select All
     */
    read(): void {
        let thisObj = this;
        let results: any = $('#results'); /* Targeting the HTML code */
        results.html("");
        thisObj.db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM tokens", [], function(tx, result) {
                thisObj.dataset = result.rows;
                let html: any = "";
                for (var i = 0, item = null; i < thisObj.dataset.length; i++) {
                    item = thisObj.dataset.item(i);
                    // Building UI
                    html += `
                        <tr>
                            <th scope="row">${item['id']}</th>
                            <td>${item['token']}</td>
                            <td>${item['datetime']}</td>
                            <td><a href="#" class="update" data-idx="${item['id']}">EDIT</a></td>
                            <td><a href="#" class="delete" data-idx="${item['id']}">X</a></td>
                        </tr>
                    `;
                }
                results.html(html);
            });
        });
    }

    /**
     * Insert
     */
    create(): void {
        let thisObj = this;
        let token = $('#token').val();

        if ("" === token) {
            return alert("Token is missing");
        }

        thisObj.db.transaction(function(tx) {
            tx.executeSql("INSERT INTO tokens (token, datetime) VALUES (?, ?)", [
                token,
                new Date()
            ]);
        });
    }

    /**
     * Update
     */
    update(): void {
        let thisObj = this;
        let token = $('#token').val();
        let id = $('#id').val();
        thisObj.db.transaction(function(tx) {
            tx.executeSql("UPDATE tokens SET token = ?, datetime = ? WHERE id = ?", [
                token,
                new Date(),
                id
            ]);
        });
    }

    /**
     * Delete
     */
    deleteRecord(id: number): void {
        let thisObj = this;
        thisObj.db.transaction(function(tx) {
            tx.executeSql("DELETE FROM tokens WHERE id = ?", [
                id
            ]);
        });
    }

    /**
     * Create DB table
     */
    _init(): void {
        this.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT, datetime DATE)");
        });
    };

    /**
     * Load UI
     */
    _loadUpdateUI(i: number): void {
        let idx: number = i - 1;
        var item = this.dataset.item(idx);
        $('#token').val(item['token']);
        $('#id').val(item['id']);
    }

    /**
     * Reset & load data
     */
    _loadAndReset(): void {
        this._resetForm();
        this.read();
    }

    /**
     * Reset input field
     */
    _resetForm(): void {
        $('#token').val('');
        $('#id').val('');
    }

    /**
     * Generate token randomly
     */
    _generateRandomToken(): number {
        let min = 100000;
        let max = 999999;
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        return randomNumber;
    }

    /**
     * Drop DB table
     */
    _tearDown(): void {
        let thisObj = this;
        thisObj.db.transaction(function(tx) {
            tx.executeSql("DROP TABLE tokens", []);
        });
        thisObj._resetForm();
    }
}
