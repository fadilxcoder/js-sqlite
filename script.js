var results = $('#results')[0]; /* Targeting the HTML code */

var createStatement = "CREATE TABLE IF NOT EXISTS Tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT)";
var selectAllStatement = "SELECT * FROM Tokens";
var insertStatement = "INSERT INTO Tokens (token) VALUES (?)";
var updateStatement = "UPDATE Tokens SET token = ? WHERE id = ?";
var deleteStatement = "DELETE FROM Tokens WHERE id=?";
var dropStatement = "DROP TABLE Tokens";

var db = openDatabase("TokenSqliteDB", "1.0", "Token SQLite Database", 200000);
var dataset;
createTable();

function onError(tx, error) {
    alert(error.message);
}

function showRecords() {
    results.innerHTML = '';
    db.transaction(function(tx) {
        tx.executeSql(selectAllStatement, [], function(tx, result) {
            dataset = result.rows;
            for (var i = 0, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
                results.innerHTML += '<span>' + item['token'] + ' <a href="#" onclick="loadRecord(' + i + ')">edit</a>  ' + '<a href="#" onclick="deleteRecord(' + item['id'] + ')">delete</a></span>';
            }
        });
    });
}

function createTable() {
    db.transaction(function(tx) {
        tx.executeSql(createStatement, [], showRecords, onError);
    });
}

function insertRecord() {
    db.transaction(function(tx) {
        tx.executeSql(insertStatement, [token.value], loadAndReset, onError);
    });
}

function loadRecord(i) {
    var item = dataset.item(i);
    token.value = item['token'];
    id.value = item['id'];
}

function updateRecord() {
    db.transaction(function(tx) {
        tx.executeSql(updateStatement, [token.value], loadAndReset, onError);
    });
}

function deleteRecord(id) {
    db.transaction(function(tx) {
        tx.executeSql(deleteStatement, [id], showRecords, onError);
    });
    resetForm();
}

function dropTable() {
    db.transaction(function(tx) {
        tx.executeSql(dropStatement, [], showRecords, onError);
    });
    resetForm();
}

function loadAndReset() {
    resetForm();
    showRecords();
}

function resetForm() {
    token.value = '';
    id.value = '';
}

$('#reset').on('click', resetForm);
$('#update').on('click', updateRecord);
$('#insert').on('click', insertRecord);
$('#drop').on('click', dropTable);