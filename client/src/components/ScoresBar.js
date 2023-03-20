// import React, { useState,useEffect,useRef } from 'react'
// import toast, { Toaster } from 'react-hot-toast';
// import styles from '../styles/clickbar.module.css';

// export default function ScoreInterface() {
//     const [score, setScore] = useState(0)
//     // const ref = useRef(null);
//     const progressBarRef = useRef(null);
//     const [level, setLevel] = useState(0);
//     // if(score >= 10 && score <= 100){
//     //     level = 1;
//     // }
//     // if(score >= 100){
//     //     level = 2;
//     // }
//     // if (score >= 10 && score <= 100) {
//     //     setLevel(1);
//     //   } else if (score >= 100) {
//     //     setLevel(2);
//     //   }
//     // }, [score]);

      
//     useEffect(() => {
//       const progressWidth = `${score}%`;
//       progressBarRef.current.style.width = progressWidth;
//     }, [score]);
//     if (score >= 10 && score <= 100) {
//         setLevel(1);
//       } else if (score >= 100) {
//         setLevel(2);}
//     // const load = score / 100;
//     // useEffect(()=>{
//     //     ref.current.width = '90%'

    
//     // })

//     return (
//         <div className="container mx-auto">
//             <Toaster position='top-center' reverseOrder={false}></Toaster>
//             <div className='flex justify-center items-center' style={{ marginTop: "3rem", marginBottom: "3rem" }}>
//                 <div className={styles.glass} style={{ width: "45%", paddingTop: '2em' }}>
//                     <h5 className={styles.title} >{score}</h5>
//                     <div className={styles.glass2} onClick={() => setScore(score + 1)}>
//                         <h5>check-in</h5>
//                     </div>
//                     <div className={styles.bar}>
//                         <ul>
//                             <li>
//                                 <div>0 </div>
//                             </li>
//                             <li>
//                                 <div >50 </div>
//                             </li>
//                             <li>
//                                 <div >100 </div>
//                             </li>
//                         </ul>
//                         <levelbar>
//                             <li>
//                                 <div>User Level: {level}</div>
//                             </li>
//                         </levelbar>
//                         <div className={styles.progressBar}>
//                           <div className={styles.progress} ref={progressBarRef}></div>

//                         </div>
                      
//                     </div>
//                 </div>

//             </div>


//         </div>

//     )

// }

import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/clickbar.module.css';
import axios from 'axios';

export default function ScoreInterface() {
  const [score, setScore] = useState(0);
  const progressBarRef = useRef(null);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const progressWidth = `${score}%`;
    progressBarRef.current.style.width = progressWidth;
    if (score >= 10 && score <= 100) {
      setLevel(1);
    } 
    else if (score >= 100) {
      setLevel(2);
    }
  }, [score]);
  const updateScore = async () => {
    try {
      const response = await axios.post('/api/score', { score });
      console.log(response.data);
      toast.success('Score updated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update score');
    }
  };


  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <div className={styles.glass} style={{ width: '45%', paddingTop: '2em' }}>
          <h5 className={styles.title}>{score}</h5>
          <div className={styles.glass2} onClick={() => setScore(score + 1)}>
            <h5>Check-in</h5>
          </div>
          <div className={styles.bar}>
            <ul>
              <li>
                <div>0</div>
              </li>
              <li>
                <div>50</div>
              </li>
              <li>
                <div>100</div>
              </li>
            </ul>
            <div className={styles.progressBar}>
              <div className={styles.progress} ref={progressBarRef}></div>
            </div>
            <levelbar>
              <li>
                <div>User Level: {level}</div>
              </li>
            </levelbar>
          </div>
        </div>
      </div>
    </div>
  );
}
