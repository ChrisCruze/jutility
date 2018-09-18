function tableau_connector_run(tableua_dictionary,tablea_array_process){

    // Create the connector object
    var myConnector = tableau.makeConnector();
    //tableua_dictionary = table_info_get()

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var tableSchema = tableua_dictionary
        schemaCallback([tableSchema]);
    };

    //tableua_dictionary = tableau_meta_data_get()
    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON(tableua_dictionary['ur'], function(resp) {
            tableData = tablea_array_process(resp)
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName =tableua_dictionary['connectionName'] ; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
}