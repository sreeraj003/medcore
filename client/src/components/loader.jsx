import { Dna } from 'react-loader-spinner'

function Loader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: '15%', marginBottom: '20%' }}>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  )
}

export default Loader