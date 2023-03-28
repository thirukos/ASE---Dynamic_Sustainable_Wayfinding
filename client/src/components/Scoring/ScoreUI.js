import React, { useState, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import styles from '../../styles/scoreInterface.module.css';
import { getUserScore, updateUserscore } from '../../helper/helper';

export default function ScoreInterface() {
    const [score, setScore] = useState(0)
    const [isHovering1, setIsHovering1] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    const ref = useRef(false)
    function handleMouseEnter1() {
        setIsHovering1(true)
    }
    function handleMouseLeave1() {
        setIsHovering1(false)
    }
    function handleMouseEnter2() {
        setIsHovering2(true)
    }
    function handleMouseLeave2() {
        setIsHovering2(false)
    }

    useEffect(() => {
        const localusername = localStorage.getItem('username')
        getUserScore(localusername).then(function (result) {
            setScore(result)
        }).catch(function (error) {
            console.error(error);
        });
        if (score > 100) setScore(100)

        ref.current.style.width = score * 0.8 + "%"
    })

    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center' style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className={styles.glass} style={{ width: "45%", paddingTop: '2em' }}>
                    <h5 className={styles.title} >{score}</h5>
                    <div className={styles.bar}>
                        <ul>
                            <li>
                                <div>0
                                </div>
                            </li>
                            <li>
                                <div onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>50
                                    {isHovering1 && (
                                        <div style={{ position: 'relative', top: '20px', left: '20px', top: 0 }}>
                                            Sports Tracker
                                        </div>
                                    )} </div>
                            </li>
                            <li>
                                <div onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>100 
                                {isHovering2 && (
                                        <div style={{ position: 'relative', top: '20px', left: '20px', top: 0 }}>
                                            Weather Detection
                                        </div>
                                    )}</div>
                            </li>
                        </ul>
                        <div className={styles.progressBar} ref={ref}>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    )

}