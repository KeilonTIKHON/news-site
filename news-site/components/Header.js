'use client'
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import '../styles/styles.css'
import useDebounce from '@/hooks/Usedebounce';
import Link from 'next/link';

export default function Header({ swtFilterednews, filterednews, setSearchres, filternewss, newsposts }) {
    //const searchInput = document.querySelector(".headersearch")swtFilterednews
    const [name, setName] = useState(null);
    const [searchtext, setSearchtext] = useState('');
    const [savedFiltNews, setSavednews] = useState(filterednews)
    const debouncedSearchTerm = useDebounce(searchtext, 1000);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [timeout, settimeout] = useState()
    const { data: session, status } = useSession();
    const scrollThreshold = 50; // Minimum scroll distance to trigger re-render
    const debounceDelay = 40; // Debounce delay in milliseconds
    let debounceTimer;
    const router = useRouter();
    //let timeout
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                //const res = await fetch(`/api/profile`);
                //const data = await res.json();


                //setName(data.user.name['en-US'])


            } catch (error) {
                console.error('Profile Fetch Error:', error.message);

            }
        };

        fetchProfile();
    }, [router]);
    useEffect(() => {
        const handleScroll = () => {
            clearTimeout(debounceTimer); // Clear the previous timer
            debounceTimer = setTimeout(() => {
                const currentScrollY = window.scrollY;

                // Only proceed if the scroll difference exceeds the threshold
                if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;

                if (currentScrollY < lastScrollY) {
                    setShowHeader(true); // Show header on scroll up
                } else {
                    setShowHeader(false); // Hide header on scroll down
                }

                setLastScrollY(currentScrollY);
            }, debounceDelay);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(debounceTimer); // Clean up the timer on component unmount
        };
    }, [lastScrollY]);
    let filteredPosts
    if (!newsposts) {

    } else {
        filteredPosts =
            newsposts.filter((post, i) => {


                return post.fields.title.toLowerCase().includes(searchtext.toLowerCase()) ||
                    post.fields.body.toLowerCase().includes(searchtext.toLowerCase())
            }

            );
    }

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


            } else {
                if (!filternewss) {
                    return;
                }
                //setSearchres(filteredPosts)
                smtt = filternewss(filteredPosts)

                swtFilterednews(smtt);
                swtFilterednews(smtt);

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
    console.log(session)
    return (
    
        <div className={showHeader ? "header" : "headerhide"}>
            
            <Link href={'/'} >
                <div className='LOgo'>
                    NEWS
                </div>
            </Link>
            {
                router.pathname === '/' ? <form className="formmax">
                    <input type='text' placeholder='SEARCH HERE' className='headersearch' onChange={e => {
                        setSearchtext(e.target.value);
                        updatedebounce(e.target.value)

                    }} value={searchtext}></input>
                    <div className="searchicon">
                        <AiOutlineSearch />
                    </div>

                </form>
                    : ''
            }


            {router.pathname !== '/profile/indexx' ? <div className='profile_button'>
                <Link href={`/profile/indexx`} >
                    <div className='profile_button_text'>
                        {session ? session.user.name : 'Guest'}
                    </div>


                </Link>

            </div> : ''}
            <div className='login_button'>
                <Link href={`/auth/login`} >
                    LOG IN
                </Link>
            </div>
        </div>
    )
}

