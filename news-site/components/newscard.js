'use client'

import '../styles/styles.css'


export default function Newscard({title, description, date, image}) {
  
  
    return (
      <div className='newsCard'>
        <div style={{backgroundImage:`url(${image})`}} className="newsimg"></div>
        <div className='newsTitle'>{title}</div>
       <div className='newsShortDescr'>{description}</div>
       <div className='newsDate'>{date}</div>
       
      </div>
    );
  }
  