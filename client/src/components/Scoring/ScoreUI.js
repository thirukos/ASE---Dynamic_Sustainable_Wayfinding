import React, { useState,useEffect,useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'; 
import styles from '../../styles/scoreInterface.module.css'; 
import { getUserScore,updateUserscore } from '../../helper/helper';   

export default function ScoreInterface() {
    const [score, setScore] = useState(0) 
    const [wcheck, setWcheck] = useState(0) 
    //const [checktime,setChecktime] = useState(0)
    const ref = useRef(false)

    useEffect(()=>{ 
        const localusername = localStorage.getItem('username')
        getUserScore(localusername).then(function(result) {
            setScore(result)
          }).catch(function(error) {
            console.error(error);
          });
          
        ref.current.style.width = score*0.8 +"%"
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
                                <div>0 </div>
                            </li>
                            <li>
                                <div >50 </div>
                            </li>
                            <li>
                                <div >100 </div>
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