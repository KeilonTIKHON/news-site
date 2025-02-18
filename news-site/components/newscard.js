'use client'

import '../styles/styles.css'


export default function Newscard({title, description, date, image}) {
  
  
    return (
      <div className='newsCard'>
        <div className='newsTitle'>{title}</div>
       <div className='newsShortDescr'>{description}</div>
       <div className='newsDate'>{date}</div>
       <img src={image} className="newsimg"></img><br></br><br></br>
      </div>
    );
  }
  