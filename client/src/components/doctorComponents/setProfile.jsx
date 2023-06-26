import { useEffect, useState } from 'react';
import './setProfile.css';
import axios from 'axios';
import { setDoctorData } from '../../redux/doctorData';
import { useDispatch, useSelector } from 'react-redux';


function SetProfile() {

    const docData = useSelector((state) => state.doctor.data);

    const [name, setName] = useState(docData.name);
    const [age, setAge] = useState(docData.age);
    const [qualification, setQualification] = useState(docData.qualification);
    const [gender, setGender] = useState(docData.gender);
    const [fee, setFee] = useState(docData.fee);
    const [contact, setContact] = useState(docData.contact);
    const [department, setDepartment] = useState(docData.department);
    const [address, setAddress] = useState(docData.address);
    const [selectedImages, setSelectedImages] = useState(docData.documents);
    const [profile, setProfile] = useState(docData.image);
    const [preview, setPreview] = useState('');
    const [msg, setMsg] = useState('');
    const [prChange, setPrChange] = useState(false);
    const [docChange, setDocChange] = useState(false);
    const [departments, setDepartments] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchDepartments = async () => {
            const doctorToken = localStorage.getItem('doctorToken');
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BASE_URL + 'doctor/departments',
                    {
                        headers: {
                            Authorization: `Bearer ${doctorToken}`,
                        },
                    }
                );
                setDepartments(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDepartments();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('qualification', qualification);
        formData.append('gender', gender);
        formData.append('fee', fee);
        formData.append('contact', contact);
        formData.append('department', department);
        formData.append('address', address);
        formData.append('images', profile);
        formData.append('prChange', prChange);

        if (docChange) {
            for (let i = 0; i < selectedImages.length; i++) {
                formData.append('images', selectedImages[i]);
            }
        }

        if (!name || !age || !gender || !fee || !contact || !department || !address || !selectedImages) {
            setMsg('Please fill all the required fields...!');
            return;
        }

        const doctorToken = localStorage.getItem('doctorToken');
        try {
            const response = await axios.post(
                import.meta.env.VITE_BASE_URL + 'doctor/setprofile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${doctorToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data != 'error') {
                dispatch(setDoctorData(response.data))
                setMsg("Profile updated successfully")
                setTimeout(() => {
                    setMsg('')
                }, 4000)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (e) => {
        const images = e.target.files;
        setDocChange(true);
        setSelectedImages(images);
    };

    const deleteImage = async (e) => {
        e.preventDefault();
        const doctorToken = localStorage.getItem('doctorToken');
        try {
            const response = await axios.delete(
                import.meta.env.VITE_BASE_URL + `doctor/deleteImage/${e.target.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${doctorToken}`,
                    },
                }
            );
            dispatch(setDoctorData(response.data[0]));
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="container">
            <div className="row">
                <form className="mx-auto w-75 setProfile" encType="multipart/form-data">
                    <div className="text-center text-bold mb-3 mt-3">SET PROFILE</div>
                    <div className="text-center  mb-3 mt-3">
                        {preview ? (
                            <img width={'200px'} src={preview} alt="" />
                        ) : docData.image ? (
                            <img
                                width={'200px'}
                                src={import.meta.env.VITE_BASE_URL + `images/${docData.image}`}
                                alt="profile"
                            />
                        ) : (
                            <img
                                width={'200px'}
                                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                                alt="default"
                            />
                        )}
                        <br />
                        <input
                            className="form-control w-25 m-auto mt-3"
                            type="file"
                            onChange={(e) => {
                                setProfile(e.target.files[0]);
                                setPrChange(true);
                                setPreview(URL.createObjectURL(e.target.files[0]));
                            }}
                        />
                        {msg == "Profile updated successfully" ?
                            <div className="alert mt-3 alert-success" role="alert">
                                Profile updated successfully
                            </div>
                            : msg ?
                                <div className="alert mt-3 alert-danger" role="alert">
                                    {msg}
                                </div>
                                : ''
                        }
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="name">Name<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control mb-2 form-control-sm"
                                placeholder="Name..."
                            />
                            <label htmlFor="age">Age<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="form-control mb-2 form-control-sm"
                                placeholder="Age..."
                            />
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="">Gender<span className="text-danger">*</span></div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            value="male"
                                            checked={gender === 'male'}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="form-check-input"
                                            id="male"
                                        />
                                        <label htmlFor="male" className="form-check-label">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            value="female"
                                            checked={gender === 'female'}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="form-check-input"
                                            id="female"
                                        />
                                        <label htmlFor="female" className="form-check-label">
                                            Female
                                        </label>
                                    </div>
                                    <br />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="fee">Cons. Fee<span className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                        value={fee}
                                        onChange={(e) => setFee(e.target.value)}
                                        id="fee"
                                        className="form-control w-50 mb-2 form-control-sm"
                                        placeholder="Cons. Fee..."
                                    />
                                </div>
                            </div>
                            <label htmlFor="contact">Contact<span className="text-danger">*</span></label>
                            <input
                                type="tel"
                                id="contact"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="form-control mb-2 form-control-sm"
                                placeholder="Contact..."
                            />
                            <label htmlFor="department">Department<span className="text-danger">*</span></label>
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-success text-dark p-1 text-start dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ fontSize: "15px" }}
                                >
                                    {
                                        department ?
                                            departments.find((el) => el._id == department)?.name || "Department"
                                            : "Department"
                                    }
                                </button>
                                <ul className="dropdown-menu">

                                    {departments.map((dep, index) => (

                                        <li onClick={() => setDepartment(dep._id)} key={index} >{dep.name}</li>

                                    ))}
                                </ul>
                            </div>
                            <label htmlFor="qualification">Qualification<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                className="form-control mb-2 form-control-sm"
                                placeholder="Qualification..."
                            />
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="address">Address<span className="text-danger">*</span></label>
                            <textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control h-25  mb-2 form-control-sm"
                                placeholder="Address..."
                            />
                            <br />
                            <br />
                            <p>Please upload your medical qualifications so that your profile can be verified</p>
                            <label htmlFor="doc" className="mt-2">
                                Documents
                            </label>
                            <br />
                            <input type="file" name="images" multiple onChange={handleImageChange} />
                            <br />
                            <div className='d-flex flex-wrap horizontal-scroll-container'>


                                <div className='horizontal-scroll-content flex-raw d-flex'>
                                    {docData ? docData.documents.map((doc, index) => (

                                        <div key={0 - index} className='d-flex flex-column'>
                                            <img key={index}
                                                className='me-2 mt-2'
                                                width={'100px'}
                                                height={'80px'}
                                                src={import.meta.env.VITE_BASE_URL + `images/${doc}`}
                                                alt=''
                                            />
                                            <button key={index + '.' + index}
                                                className='me-2 mt-1 btn btn-outline-success p-0' value={doc} onClick={deleteImage}
                                                style={{ fontSize: '10px' }}>
                                                Delete
                                            </button>

                                        </div>
                                    ))
                                        : "Ooopsie..!No data found."
                                    }

                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 text-center">
                            <button className="btn btn-outline-success mb-3" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SetProfile;
