import { useState } from 'react';
import './setProfile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SetProfile() {
    const navigate = useNavigate()
    const docData = useSelector(state=>state.doctor.data)

    const [name, setName] = useState(docData.name)
    const [age, setAge] = useState(docData.age)
    const [qualification, setQualification] = useState('')
    const [gender, setGender] = useState('')
    const [fee, setFee] = useState(0)
    const [contact, setContact] = useState(docData.contact)
    const [department, setDepartment] = useState('')
    const [address, setAddress] = useState('')
    const [selectedImages, setSelectedImages] = useState([]);
    const [errorMsg, setErrorMsg] = useState('')

  

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name || !age || !gender || !fee || !contact || !department || !address || !qualification || !selectedImages) {
            setErrorMsg('Please fill all the required fields...!')
            return
        }
        const formData = new FormData();
        // formData.append('name','name')
        formData.append('name', name);
        formData.append('age', age);
        formData.append('qualification', qualification)
        formData.append('gender', gender);
        formData.append('fee', fee);
        formData.append('contact', contact);
        formData.append('department', department);
        formData.append('address', address);

        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('images', selectedImages[i]);
        }
        try {
            const doctorToken = localStorage.getItem('doctorToken');
            await axios.post(
                import.meta.env.VITE_BASE_URL + 'doctor/setprofile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${doctorToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            ).then(res => {
                if (res.data === 'success') {
                    navigate('/doctor/')
                }
            })

        } catch (error) {
            console.error(error);
            console.log(error)
        }
    }

    const imageChange = (e) => {
        const images = e.target.files;
        setSelectedImages(images);
    };

    return (
        <div className="container">
            <div className="row">
                <form className="mx-auto w-75 setProfile" encType='multipart/form-data'>
                    <div className="text-center text-bold mb-3 mt-3">SET PROFILE</div>
                    <div className="row">
                        <div className="col-lg-6">
                            {errorMsg ?
                                <div className="alert alert-danger" role="alert">
                                    {errorMsg}
                                </div>: ''
                            }
                            <label htmlFor="name">Name<span className='text-danger'>*</span></label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control mb-2 form-control-sm" placeholder="Name..." />

                            <label htmlFor="age">Age<span className='text-danger'>*</span></label>
                            <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="form-control mb-2 form-control-sm" placeholder="Age..." />

                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="">Gender<span className='text-danger'>*</span></div>
                                    <div className="form-check form-check-inline">
                                        <input type="radio" value={"male"} checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className="form-check-input" id="male" />
                                        <label htmlFor="male" className="form-check-label">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input type="radio" value={"female"} checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className="form-check-input" id="female" />
                                        <label htmlFor="female" className="form-check-label">
                                            Female
                                        </label>
                                    </div><br />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="fee">Cons. Fee<span className='text-danger'>*</span></label>
                                    <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} id="fee" className="form-control w-50 mb-2 form-control-sm" placeholder="Cons. Fee..." />
                                </div>
                            </div>

                            <label htmlFor="contact">Contact<span className='text-danger'>*</span></label>
                            <input type="tel" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} className="form-control mb-2 form-control-sm" placeholder="Contact..." />

                            <label htmlFor="department">Department<span className='text-danger'>*</span></label>
                            <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="form-control mb-2 form-control-sm" placeholder="Department..." />

                            <label htmlFor="qualification">Qualification<span className='text-danger'>*</span></label>
                            <input type="text" id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} className="form-control mb-2 form-control-sm" placeholder="Qualification..." />

                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="address">Address<span className='text-danger'>*</span></label>
                            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control h-25  mb-2 form-control-sm" placeholder="Address..." />

                            <label htmlFor="doc" className='mt-2'>Documents<span className='text-danger'>*</span></label><br />
                            <input type="file" name='images' multiple onChange={imageChange} />

                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-12 text-center">
                            <button className='btn btn-outline-success mt-3 mb-3' onClick={handleSubmit} >Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SetProfile;
