import React, { useEffect, useState } from 'react'

const Index = () => {

    const [users, setUsers] = useState([]);



    const getUsers = async () => {
        const response = await fetch("https://6695337a4bd61d8314ca77fe.mockapi.io/jobs/list");
        const FinalData = await response.json();
        setUsers(FinalData)
    }



    useEffect(() => {
        getUsers();
    }, [])


    return (

        <div className="container">

            {
                users.map((curElem) => {
                    return (

                        <div className="card_item" key={curElem.id}>
                            <div className="card_inner">
                                <img src={curElem.imgurl} alt="" />
                                <div className="userName">{curElem.role}</div>
                                <div className="userUrl">{curElem.company}</div>
                                <div className="detail-box">

                                    <div className="gitDetail"><span>Eligiblity: {curElem.eligiblity}</span></div>

                                </div>
                                <a href={curElem.url}> <button className="seeMore">See More</button></a>
                            </div>

                        </div>
                    )
                })
            }

        </div>


    )
}

export default Index;

