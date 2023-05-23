import React from 'react'

function ViewDoc({ doctor, setSelectedDoc }) {

    return (
        <>
            <div className='container' style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-12">
                        <div style={{ width: "90%", outline: "2px solid #28a745", borderRadius: '10px' }} className='m-auto p-3 bg-white'>
                            <button className='btn btn-outline-success bg-light' onClick={() => setSelectedDoc('')}>back</button>
                            <div className='text-center '>
                                {
                                    doctor.image ?
                                        <img width={'200px'} src={import.meta.env.VITE_BASE_URL + `images/${doctor.documents[0]}`} alt="sdf" />
                                        :
                                        <img width={'200px'} src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" alt="dedf" />
                                }
                                <h1>{doctor.name}</h1>
                                <div className="row">

                                    <div className="col-lg-6 text-start ">
                                        <b>Email</b>:{doctor.email} <br />
                                        <b>Contact</b>:{doctor.contact}<br />
                                        <b>Age</b>:{doctor.age}<br />
                                        <b>Gender</b>:{doctor.gender}<br />
                                    </div>
                                    <div className="col-lg-6 text-start">
                                        <b>Department</b>:{doctor.department}<br />
                                        <b>Qualification</b>:{doctor.qualification}<br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewDoc