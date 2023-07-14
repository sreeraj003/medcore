import { useCallback, useEffect, useState } from "react"
import DataTables from "../dataTables"
import axios from "axios"
import { validateCapitalLetter } from "../validator"

function Medicines() {
  const [medicineList, setMedicineList] = useState([])
  const [newMed, setNewMed] = useState('')
  const [dose, setDose] = useState('')
  const [doseData, setDoseData] = useState([])
  const [cost, setCost] = useState('')
  const [createStatus, setStatus] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('')
  const [err,setErr] = useState('')

  const departmentData = useCallback(async () => {
    await axios.get(import.meta.env.VITE_BASE_URL + 'admin/medicines', {
      // headers: {
      //   Authorization: `Bearer ${adminToken}`,
      // }
    }).then(res => {
      if (res.data == 'exist') {
        setStatus('exist')
      } else {
        setMedicineList(res.data)
        setFilteredData(res.data)
      }
    })
  }, [])

  const handleSearch = useCallback((e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const filtered = medicineList.filter((med) =>
      med.name.toLowerCase().startsWith(searchValue)
    );
    setFilteredData(filtered);
  }, [medicineList])


  const deleteMedicine = useCallback(async (row) => {
    await axios.patch(import.meta.env.VITE_BASE_URL + `admin/deleteMedicine`, {
      id: row._id
    }, {
      // headers: {
      //   Authorization: `Bearer ${adminToken}`,
      // }
    }).then(res => {
      if (res.data === 'error') {
        setStatus('error');
        setTimeout(() => {
          setStatus('');
        }, 4000);
      } else {
        setMedicineList(prevMedicines =>
          prevMedicines.filter(medicine => medicine._id !== row._id)
        );

        setFilteredData(prevFilteredData =>
          prevFilteredData.filter(medicine => medicine._id !== row._id)
        );
      }
    });
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name
    },
    {
      name: 'Doses',
      selector: (row) => row.dose.toString()
    },

    {
      name: "Cost",
      selector: (row) => row.cost
    },
    {
      name: 'Created at',
      selector: (row) => row.createdAt
    },

    {
      name: "Action",
      cell: row => <button className="btn btn-success" onClick={() => deleteMedicine(row)}>{!row.isDeleted && "Delete"}</button>
    }
  ]


  const handleCreate = async () => {
    if (doseData.length == 0 || newMed == '' || cost == '') {
      setStatus('validate')
      return
    } else {

      console.log(doseData);
      const isValid = validateCapitalLetter(newMed)
      if (isValid) {
        if(cost.toString()<0){
          setErr('please enter proper cost')
          return
        }
        if(dose.toString()<0){
          setErr('please enter proper dose')
          return
        }
        await axios.post(import.meta.env.VITE_BASE_URL + 'admin/addMedicine', { newMed: newMed, cost: cost, doseData: doseData }, {
          // headers: {
          //   Authorization: `Bearer ${adminToken}`,
          // }
        }).then(res => {
          setStatus(res.data)
          setTimeout(() => {
            setStatus('')
          }, 4000)
          departmentData()
        })
      } else {
        setStatus("capLetter")
        setTimeout(() => {
          setStatus('')
        }, 4000)
      }
    }
  }

  const handleDoseData = useCallback(() => {
    console.log(doseData);
    setDoseData((prev) => [...prev, dose])
  }, [dose, doseData])

  useEffect(() => {
    departmentData()
  }, [departmentData])

  return (
    <>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create Department</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {
              err?
              <div className="alert">{err}</div>:''
            }
            <div className="modal-body">
              <label htmlFor="depName ">Medicine Name</label>
              <p style={{ opacity: '60%', fontSize: '10px' }} className="mb-0">Please note that the first letter should be capital</p>
              <input type="text" value={newMed} onChange={(e) => setNewMed(e.target.value)} className="form-control" name="medName" />

              <label htmlFor="depName ">Medicine Dose</label>
              <p style={{ opacity: '60%', fontSize: '10px' }} className="mb-0" >Please note that the first letter should be capital</p>
              <input type="number" value={dose} onChange={(e) => setDose(e.target.value)} className="form-control" name="medName" />
              <button className="mt-1 btn btn-success p-2" onClick={handleDoseData} style={{ fontSize: '15px' }}>Add</button><br />


              <div style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: '10px', maxHeight: '100px' }} className="mt-3 text-wrap">
                <span className="p-3 text-primary" >Selected medicine</span>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                  {doseData.map((el, index) => (
                    <div key={index} style={{ marginRight: '10px' }}>{el}</div>
                  ))}
                </div>
              </div>


              <label htmlFor="depName " className="mt-4">Medicine cost</label>
              <p style={{ opacity: '60%', fontSize: '10px' }} className="mb-0">Please note that the first letter should be capital</p>
              <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="form-control" name="medName" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button type="button" className="btn mb-2 ms-1 btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Create Medicine</button>
      </div>
      <div className="ms-1" style={{ zIndex: '0' }}>
        {
          createStatus == "error" ?
            <div className="alert alert-danger" role="alert">
              There was an error! cannot create depaprtment.
            </div>
            : createStatus == "success" ?
              <div className="alert alert-success" role="alert">
                Department created successfully.
              </div>
              : createStatus === 'exist' ?
                <div className="alert alert-danger" role="alert">
                  Department already exist.
                </div>
                : createStatus === 'capLetter' ?
                  <div className="alert alert-danger" role="alert">
                    First letter of department should be capital.
                  </div>
                  : createStatus === 'validate' ?
                    <div className="alert alert-danger" role="alert">
                      Please enter valid Details
                    </div>
                    : createStatus === 'exist' ?
                      <div className="alert alert-danger" role="alert">
                        Medicine already exist.
                      </div>
                      : ''

        }
        <h3>Departments</h3>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
          className="form-control w-25 mb-2"
        />
        <DataTables columns={columns} title='Departments' data={filteredData} />
      </div>
    </>
  )
}

export default Medicines