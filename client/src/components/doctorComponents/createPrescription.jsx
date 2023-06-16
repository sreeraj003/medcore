import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreatePrescription() {
    const userData = useSelector(state => state.prescription.data)
    const medicineRef = useRef()
    const descriptionRef = useRef()
    const doseRef = useRef()
    const history = useNavigate()
    const [medicines, setMedicines] = useState()
    const doctorToken = localStorage.getItem('doctorToken')
    const [selectedMed, setSelectedMed] = useState('')
    const [dose, setDose] = useState('')
    const [medDetails, setMedDetails] = useState(new Map())

    useEffect(() => {
        if (selectedMed) {
            medicineRef.current.innerHTML = selectedMed.name
        } else {
            medicineRef.current.innerHTML = 'Medicine'
        }
        if (dose) {
            doseRef.current.innerHTML = dose
        } else {
            doseRef.current.innerHTML = "Dose"
        }
    }, [dose, selectedMed])

    const handleUpload = useCallback(async () => {
        const id = userData._id
        const payload = Array.from(medDetails).map(([medicine, selectedDose]) => ({
            medicine,
            selectedDose,
            id
          }));
        await axios.patch(import.meta.env.VITE_BASE_URL + 'doctor/addPrescription',payload, {
            headers: {
                Authorization: `Bearer ${doctorToken}`,
                // "Content-Type":"application/json"
            }
        }) .then(res=>{
            if(res.data=='done'){
                history('/doctor/consult')
            }
        }) 
    }, [doctorToken, medDetails, userData._id])

    const handleAddClick = useCallback(() => {
        if (selectedMed && dose) {
            setMedDetails(prev => {
                const updated = new Map(prev)
                updated.set(selectedMed.name, dose + 'mg ' + descriptionRef.current.value)
                return updated
            })
            setSelectedMed('');
            setDose('');
        }
    }, [dose, selectedMed])

    const datacall = useCallback(async () => {
        await axios.get(import.meta.env.VITE_BASE_URL + 'doctor/medicines', {
            headers: {
                Authorization: `Bearer ${doctorToken}`
            }
        }).then(res => {
            setMedicines(res.data)
        })
    }, [doctorToken])

    useEffect(() => {
        datacall()
    }, [datacall])

    return (
        <>
            <div className='bg-white p-4'>
                <div className="row ">
                    <div className="col-md-6">
                        <h4>Patient : {userData.userData[0].userName}</h4>
                        <h5>Date : {userData.date}</h5>
                        <h5>Time : {userData.time}</h5>
                    </div>
                    <div className="col-md-6">
                        <h5>Health issue :</h5>
                        <p>{userData.issues}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <div className="dropdown">
                            <button className="mt-2     btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <b ref={medicineRef}>Medicine</b>
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    medicines ? (medicines.map((med, index) => <li key={index}><a className="dropdown-item" onClick={() => setSelectedMed(med)}>{med.name}</a></li>)) : ''
                                }


                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="dropdown">
                            <button className="mt-2 btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <b ref={doseRef}>Dose</b>
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    selectedMed ? (selectedMed.dose.map((med) => <li key={med}><a className="dropdown-item" onClick={() => setDose(med)}>{med}</a></li>)) : ''
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <input className='form-control mt-2 ' ref={descriptionRef} placeholder='Description...' type="text" />
                    </div>
                    <button className='mx-auto mt-3 btn btn-success' onClick={handleAddClick} style={{ maxWidth: "100px" }}>Add</button>
                </div>
                <h4>Prescription</h4>
                {Array.from(medDetails).map(([medicine, selectedDose]) => (
                    <div key={medicine}>
                        <p>{medicine}: {selectedDose}</p>
                    </div>
                ))}
                <div className="row">
                    <button className='btn btn-outline-success mx-auto' onClick={handleUpload} style={{ maxWidth: '200px' }}>Upload</button>
                </div>
            </div>
        </>
    )
}

export default CreatePrescription