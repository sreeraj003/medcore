import { useCallback, useEffect, useState } from "react"
import DataTables from "../dataTables"
import axios from "axios"
import { validateCapitalLetter } from "../validator"

function Departments() {
  const [departmentList, setDepartList] = useState([])
  const [newDep, setNewDep] = useState('')
  const adminToken = localStorage.getItem("adminToken")
  const [createStatus, setStatus] = useState('')
  const [image, setImage] = useState([])
  const [preview, setPreView] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('')

  const departmentData = useCallback(async () => {
    await axios.get(import.meta.env.VITE_BASE_URL + 'admin/departments', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      }
    }).then(res => {

      setDepartList(res.data)
      setFilteredData(res.data)
    })
  },[adminToken])

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const filtered = departmentList.filter((dep) =>
      dep.name.toLowerCase().startsWith(searchValue)
    );
    console.log(filtered);
    setFilteredData(filtered);
  };


  const blockDepartment = async (row) => {
    await axios.patch(import.meta.env.VITE_BASE_URL + `admin/manageDepartment`, {
      status: row.isBlocked,
      id: row._id
    }, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      }
    }).then(res => {
      if (res == 'error') {
        setStatus
        setTimeout(() => {
          setStatus('')
        }, 4000)
      } else {
        setDepartList((prevDepartments) =>
          prevDepartments.map((department) => {
            if (department._id === row._id) {
              return {
                ...department,
                isBlocked: !department.isBlocked,
              };
            }
            return department;
          })
        )
      }
    })
  }
  const columns = [
    {
      name: 'ID',
      selector: (row) => row._id
    },
    {
      name: 'name',
      selector: (row) => row.name
    },
    {
      name: 'Created at',
      selector: (row) => row.timeStamp
    },
    {
      name: "Image",
      selector: (row) => <img className="m-2 ms-0" width={'100px'} src={row.image} alt="" />
    },
    {
      name: "Action",
      cell: row => <button className="btn btn-success" onClick={() => blockDepartment(row)}>{row.isBlocked == false ? "Block" : "Unblock"}</button>
    }
  ]

  const handleImagechange = (e) => {
    setPreView(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])

  }

  const handleCreate = async () => {
    const isValid = validateCapitalLetter(newDep)
    if (isValid) {
      const formData = new FormData()
      formData.append("image", image),
        formData.append("newDep", newDep)
      await axios.post(import.meta.env.VITE_BASE_URL + 'admin/createDepartment', formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          
        }
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
            <div className="modal-body">
              <label htmlFor="depName ">Department Name</label>
              <p style={{ opacity: '60%', fontSize: '10px' }} >Please note that the first letter should be capital</p>
              <input type="text" value={newDep} onChange={(e) => setNewDep(e.target.value)} className="form-control" name="depName" />
              {

                preview ?

                  <img className="mt-2" src={preview} alt="img" width={'100px'} height={'120px'} />
                  :
                  <img className="mt-2" width={'100px'} height={'120px'} src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" alt="sf" />
              } <br />
              <label htmlFor="image" className="mt-2"> Upload image</label><br />
              <input type="file" onChange={handleImagechange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button type="button" className="btn mb-2 ms-1 btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Create Department</button>
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

export default Departments