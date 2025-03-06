'use client'

import '../styles/styles.css'

import Link from 'next/link';

export default function Newscard({ title, description, date, image, slug }) {

const dateout = new Date(date)
  return (
    <div className='newsCard'>
      <Link href={`./news/${slug}`}>

        <div style={{ backgroundImage: `url(${image})` }} className="newsimg"></div>
        <div className='newsTitle'>{title}</div>
        <div className='newsShortDescr'>{description}</div>
        <div className='newsDate'>{dateout.toLocaleDateString()}</div>


      </Link>
    </div>
  );
}
