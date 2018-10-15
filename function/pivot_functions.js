







function count_function(data, rowKey, colKey) {
    return {
        count: 0,
        push: function(record) {
            this.count++;
        },
        value: function() {
            return this.count;
        },
        format: function(x) {
            return x;
        },
    };
}

function rows_column_dictionary_create_instance(data) {
    row_key_name = 'row_number'
    col_key_name = 'col_number'
    row_dict = _.groupBy(data, row_key_name);
    rows = Object.keys(row_dict)
    rows.forEach(function(row) {
        subli = row_dict[row]
        row_dict[row] = _.groupBy(subli, col_key_name);
    })
    return row_dict
}

function parent_element_create_from_row_dict_div(row_dict) {
    row_keys = Object.keys(row_dict)
    col_keys = Object.keys(row_dict[row_keys[0]])
    parent_element = $("<span>", {})
    row_keys.forEach(function(row, i) {
        row_html = $("<div>", {
            "row": row,
            "class": "row row-eq-height show-grid nopadding tower-row"
        })
        col_keys.forEach(function(col) {
            cell_dict = row_dict[row][col][0]
            cell_text = cell_dict.cell_value
            row_html.append($("<div>", cell_dict).html(cell_text))
        })
        parent_element.append(row_html)
    })
    return parent_element[0].innerHTML
}

function render_function(pivot_data_object) {
    tree_data = pivot_data_object['tree']
    row_keys = Object.keys(tree_data) //servicing, originations, etc.
    col_keys = Object.keys(tree_data[row_keys[0]])
    full_array = []
    row_keys.forEach(function(row_key, row_number) {
        col_keys.forEach(function(col_key, col_number) {



            cell_class = " table-cell-value col-md-2 nopadding "



            try {
                cell_value = tree_data[row_key][col_key]['count']
            } catch (err) {
                cell_value = "-"
            }
            try {
                if (row_key == "Total" && col_key != "Total") {
                    cell_value = pivot_data_object['colTotals'][col_key]['count']
                    cell_class = "total-cell " + cell_class
                }
                if (row_key != "Total" && col_key == "Total" && row_key != "Percentage") {
                    cell_value = pivot_data_object['rowTotals'][row_key]['count']
                    cell_class = "total-cell " + cell_class
                }
                if (row_key == "Total" && col_key == "Total") {
                    cell_value = pivot_data_object['allTotal']['count']
                    cell_class = "total-cell " + cell_class
                }
            } catch (err) {
                cell_value = "-"
            }
            new_dictionary = {
                row_name: row_key,
                column_name: col_key,
                row_number: row_number + 1,
                col_number: col_number + 2,
                class: cell_class,
                style: "background-color:white",
                cell_value: cell_value
            }
            full_array.push(new_dictionary)
        })
    })
    row_dict = rows_column_dictionary_create_instance(full_array)
    table_html = parent_element_create_from_row_dict_div(row_dict)
    return table_html
}

// callback_array = [
//     {color: "blue", shape: "circle", value: 1},
//     {color: "red", shape: "triangle", value: 2},
//     {color: "blue", shape: "circle", value: 3},
//     {color: "red", shape: "triangle", value: 4}
// ]
// $(table_selector).pivot(callback_array, {
//     rows: [row_field],
//     cols: [col_field],
//     aggregator: count_function,
//     renderer: render_function
// })