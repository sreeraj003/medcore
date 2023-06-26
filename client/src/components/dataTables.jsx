import { Suspense } from 'react'
import DataTable from "react-data-table-component"
import PropTypes from 'prop-types'
import './dt.css'
import Loader from './loader'

DataTables.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
}

function DataTables(props) {


    return (

        <Suspense fallback={<Loader />}>
            <DataTable
                style={{ zIndex: '-1' }}
                columns={props.columns}
                data={props.data}
                fixedHeader
                highlightOnHover
                pagination

            />
        </Suspense>
    )
}

export default DataTables