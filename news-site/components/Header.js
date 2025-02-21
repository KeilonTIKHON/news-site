'use client'

import { useState, useEffect } from 'react'
import '../styles/styles.css'
import useDebounce from '@/hooks/Usedebounce';

export default function Header({ swtFilterednews, filterednews, setSearchres, filternewss, newsposts }) {
    //const searchInput = document.querySelector(".headersearch")swtFilterednews
    const [searchtext, setSearchtext] = useState('');
    const [savedFiltNews, setSavednews] = useState(filterednews)
    const debouncedSearchTerm = useDebounce(searchtext, 1000);

    const filteredPosts = newsposts.filter((post) =>
        post.fields.title.toLowerCase().includes(searchtext.toLowerCase()) ||
        post.fields.body.toLowerCase().includes(searchtext.toLowerCase())
    );
    let smtt;
    let searchdebounce
    useEffect(
        () => {

            if (debouncedSearchTerm) {
                //setSearchres(filteredPosts)
                smtt = filternewss(filteredPosts)
                console.log(smtt)
                swtFilterednews(smtt);
                swtFilterednews(smtt);
                console.log('done')

            } else {
                //setSearchres(filteredPosts)
                smtt = filternewss(filteredPosts)
                console.log(smtt)
                swtFilterednews(smtt);
                swtFilterednews(smtt);
                console.log('empty')
            }
        },

        [debouncedSearchTerm]
    );

    const updatedebounce = debouncesearch(text => {

    }, 0)

    function debouncesearch(cb, delay = 1000) {

        return (...args) => {

            clearTimeout(searchdebounce)

            searchdebounce = setTimeout(() => {
                cb(...args)
            }, delay)

        }

    }
    return (
        <div className="header">
            
            <form>
                <input type='text' placeholder='SEARCH HERE' className='headersearch' onChange={e => {
                    setSearchtext(e.target.value);
                    updatedebounce(e.target.value)

                }} value={searchtext}></input>
            </form>

        </div>
    )
}

