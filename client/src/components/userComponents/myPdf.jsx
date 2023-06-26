import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types'
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  prescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: "20px"
  }
});

MyPDF.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object
}

function MyPDF({ data, user }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.label}>Name : {user.userName}</Text>
            <Text style={styles.label}>Age : {user.age}</Text>
            <Text style={styles.label}>Gender : {user.gender}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Doctor : {data.docData[0].name}</Text>
            <Text style={styles.label}>Date : {data.date}</Text>
            <Text style={styles.label}>Time : {data.time}</Text>
          </View>
        </View>

        <View>
          <hr />
          <Text style={styles.prescription}>Prescription</Text>
          {
            Object.entries(data.medicines) &&
            Object.entries(data.medicines).map((el, index) => (
              <Text style={styles.label} key={index}>
                {el[0] && el[0]}:{el[1] && el[1]}<br />
              </Text>
            ))
          }
        </View>
      </Page>
    </Document>
  );

}

export default MyPDF;
