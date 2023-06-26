import { PDFDownloadLink } from '@react-pdf/renderer';
import MyPdf from './myPdf';
import { FiDownload } from 'react-icons/fi'
import PropTypes from 'prop-types'

DownloadButton.propTypes = {
    el: PropTypes.object,
    user: PropTypes.object
}

function DownloadButton({ el, user }) {

    return (
        <>
            <PDFDownloadLink document={<MyPdf data={el} user={user} />} fileName="Prescription.pdf">
                {({ loading }) =>
                    loading ? 'Loading document...' : <button className='btn btn-success' ><FiDownload /></button>
                }
            </PDFDownloadLink>
        </>
    )
}

export default DownloadButton