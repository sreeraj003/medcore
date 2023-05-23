import React from 'react'
import DataTable from "react-data-table-component"
import PropTypes from 'prop-types'

DataTables.proppTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
}

function DataTables(props) {
    return (
        <DataTable
            columns={props.columns}
            data={props.data}
            title="Doctors"
            fixedHeader
            highlightOnHover
            pagination
        />
    )
}

export default DataTables