import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Index = () => {

    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://docs.google.com/spreadsheets/d/1zNXUMhBpCzx4aG6aW2ZW0RxoSgK2tX6saEN_5bxz8PQ/edit?usp=sharing");
                const buffer = await response.arrayBuffer();
                const workbook = XLSX.read(buffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Get used range (excluding headers if present)
                const usedRange = XLSX.utils.decode_range(worksheet['!ref']);
                const usedRangeStartRow = usedRange.s.r + 1; // Skip header row (if present)

                // Convert the sheet data to JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1, // Include header row (if present)
                    defval: '', // Set default value for empty cells to empty string
                });

                // Filter out non-empty rows
                const filteredData = jsonData.slice(usedRangeStartRow).filter((row) => {
                    // Filter rows with at least one non-empty cell

                    return row.slice(1).some((cell) => cell !== '');
                });

                // Now you have the filtered non-empty rows in the 'filteredData' array
                console.log('Filtered data:', filteredData.slice(-10));


                setData(filteredData.slice(-10));
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data.length) {
        return <div>Loading data...</div>;
    }
    console.log(data.length)
    console.log(data)
    return (

        <div className="container">

            {
                data.slice(1).map((row, index) => {
                    return (

                        <div className="card_item" key={index}>
                            <div className="card_inner">

                                <img src={row[6]} alt="" />
                                <div className="userName">{row[2]}</div>
                                <div className="detail-box">

                                    <div className="gitDetail"><span>{row[3]}</span></div>
                                    <div className="gitDetail"><span>{row[4]}</span></div>

                                </div>
                                <a href={row[5]}><button className="seeMore">See More</button></a>
                            </div>

                        </div>
                    )
                })
            }

        </div>


    )
}

export default Index;

