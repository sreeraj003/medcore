import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()
    const [mor, setMor] = useState(false)
    const [aft, setAft] = useState(false)
    const [evg, setEvg] = useState(false)

    console.log(userData);
    useEffect(() => {
        if(!userData.userData){
            navigate('/doctor/consult')
        }
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
    }, [dose, navigate, selectedMed, userData])

    const handleUpload = useCallback(async () => {
        const id = userData._id
        const payload = Array.from(medDetails).map(([medicine, selectedDose]) => ({
            medicine,
            selectedDose,
            id
        }));
        await axios.patch(import.meta.env.VITE_BASE_URL + 'doctor/addPrescription', payload, {
            headers: {
                Authorization: `Bearer ${doctorToken}`,
            }
        }).then(res => {
            if (res.data == 'done') {
                history('/doctor/consult')
            }
        })
    }, [doctorToken, history, medDetails, userData._id])

    const handleAddClick = useCallback(() => {
        let med = ''
        if (mor) {
            med = '1'
        } else {
            med = '0'
        }
        if (aft) {
            med = med + '-' + '1'
        } else {
            med = med + '-' + '0'
        }
        if (evg) {
            med = med + '-' + '1'
        } else {
            med = med + '-' + '0'
        }

        if (selectedMed && dose) {
            setMedDetails(prev => {
                const updated = new Map(prev)
                updated.set(selectedMed.name, dose + 'mg ' + med + ' ' + descriptionRef.current.value)
                return updated
            })
            setSelectedMed('');
            setDose('');
        }
    }, [aft, dose, evg, mor, selectedMed])

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
                        <h4>Patient : {userData.userData?userData?.userData[0]?.userName:''}</h4>
                        <h5>Date : {userData?.date}</h5>
                        <h5>Time : {userData?.time}</h5>
                    </div>
                    <div className="col-md-6">
                        <h5>Health issue :</h5>
                        <p>{userData?.issues}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="dropdown">
                            <button className="mt-2     btn btn-white btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <b ref={medicineRef}>Medicine</b>
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    medicines ? (medicines.map((med, index) => <li key={index}><Link className="dropdown-item" onClick={() => setSelectedMed(med)}>{med?.name}</Link></li>)) : ''
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="dropdown">
                            <button className="mt-2 btn btn-white btn-outline-dark  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <b ref={doseRef}>Dose</b>
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    selectedMed ? (selectedMed.dose.map((med) => <li key={med} className='w-25'><Link  className="dropdown-item" onClick={() => setDose(med)}>{med}</Link></li>)) : ''
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                            <div className='mt-3'>
                                <input className="form-check-input" onChange={() => setMor(!mor)} type="checkbox" value="" id="" />
                                <label className="form-check-label" htmlFor="">
                                    Mor
                                </label>
                            </div>
                            <div className='mt-3'>

                                <input className="form-check-input" onChange={() => setAft(!aft)} type="checkbox" value="" id="" />
                                <label className="form-check-label" htmlFor="">
                                    Aft
                                </label>
                            </div>
                            <div className='mt-3'>

                                <input className="form-check-input" onChange={() => setEvg(!evg)} type="checkbox" value="" id="" />
                                <label className="form-check-label" htmlFor="">
                                    Evg
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-3">
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