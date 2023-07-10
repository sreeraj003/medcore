import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
import { useState } from 'react'

BarChart.propTypes = {
    appoints: PropTypes.array
}

function BarChart({ appoints }) {

    const [year, setYear] = useState(new Date().getFullYear())

    let monthCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const distinctYears = Array.from(new Set(appoints.map(el => el.createdAt.split(' ')[0].split('-')[2])))

    appoints.forEach((el) => {
        if (el.createdAt.split(' ')[0].split('-')[2] == year) {
            if (el.createdAt.split(' ')[0].split('-')[1] == '1') {
                monthCount[0] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '2') {
                monthCount[1] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '3') {
                monthCount[2] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '4') {
                monthCount[3] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '5') {
                monthCount[4] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '6') {
                monthCount[5] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '7') {
                monthCount[6] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '8') {
                monthCount[7] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '9') {
                monthCount[8] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '10') {
                monthCount[9] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '11') {
                monthCount[10] += 1
            } else if (el.createdAt.split(' ')[0].split('-')[1] == '12') {
                monthCount[11] += 1
            }
        }
    })

    return (
        <>
            <div className="container-fluid mb-5">
                <div className="dropdown mb-4">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {year}
                    </button>
                    <ul className="dropdown-menu">
                        <li ><button className="dropdown-item btn" onClick={() => setYear('2022')}>2022</button></li>
                        {
                            distinctYears && distinctYears.map((el, index) => (
                                <li key={index}><button className="dropdown-item btn" onClick={() => setYear(el)}>{el}</button></li>
                            ))
                        }

                    </ul>
                </div>
                <Chart
                    type='bar'
                    width={'100%'}
                    height={500}

                    series={[
                        {
                            name: 'Revenue',
                            data: monthCount
                        }
                    ]}
                    options={{
                        title: {
                            text: "Revenue Chart",
                            style: { fontSize: 30 }
                        },
                        chart: {
                            background: '#ffffff',
                        },
                        colors: ["#00009F"],
                        theme: { mode: "light" },
                        xaxis: {
                            tickPlacement: 'on',
                            categories: [
                                'jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'
                            ],
                            title: {
                                text: 'Month',
                                style: { fontSize: 20 }
                            },
                        },
                        yaxis: {
                            labels: {
                                formatter: (val) => {
                                    return `${val}`
                                },
                                style: { fontSize: "15", colors: ['#f900000'] },
                            },
                            title: {
                                text: "No.of Appointments",
                                style: { fontSize: 20 }
                            }
                        },
                        legend: {
                            show: true,
                            position: 'right'
                        },
                        dataLabels: {
                            formatter: (val) => {
                                return `${val}`
                            },
                            style: {
                                colors: [`#f4f4f40`],
                                fontSize: 15
                            }
                        }
                    }}
                />
            </div>
        </>
    )
}

export default BarChart