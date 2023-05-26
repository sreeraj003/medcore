import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from '../DoctorCard';

function PageStructure() {
    const [docData, setDocData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [department, setDepartments] = useState([]);


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BASE_URL + 'findDoctors');
                setDocData(res.data.docs);
                setDepartments(res.data.deps);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDoctors();
    }, []);

    const handleSearcch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
        const filtered = docData.filter((doc) =>
            doc.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        );
        setFilteredData(filtered);
        setIsSearch(true);
    };
    const handleCategory = (e) => {

        const filtered = docData.filter(
            (doc) => doc.doctorData[0].name === e.target.value);
        setFilteredData(filtered);
        setIsSearch(true);

    };


    return (
        <>
            <div className="row">
                <div className="col-4 col-md-3 bg-light p-1 text-center">
                    <div className="outline-success mt-5">
                        <h3>Departments</h3>
                        <div className="text-start m-auto " style={{ maxWidth: '300px' }}>
                            <ul class="list-group ms-auto ">
                                {department ? (
                                    department.map((dep) => (
                                        <li class="list-group-item ps-1  pt-2 pb-2 p-0    ">
                                            <input
                                                class="form-check-input me-1"
                                                type="radio"
                                                name="listGroupRadio"
                                                value={dep.name}
                                                onClick={(e) => handleCategory(e)}
                                                // onChange={(e) => handleCategory(e)}
                                                id={dep.name}
                                            />
                                            <label class="form-check-label" for={dep.name} >
                                                {dep.name}
                                            </label>
                                        </li>
                                    ))
                                ) : (
                                    <div>No departments available</div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-8 col-md-9">
                    <div className="d-flex p-4 pb-0">
                        <input
                            type="text"
                            className="my-auto  bg-light form-control"
                            style={{ maxWidth: '60%' }}
                            value={search}
                            onChange={(e) => handleSearcch(e)}
                            placeholder="Search doctors..."
                        />

                    </div>
                    {isSearch ? (
                        <DoctorCard docData={filteredData} />
                    ) : (
                        <DoctorCard docData={docData} />
                    )}
                </div>
            </div>
        </>
    );
}

export default PageStructure;
