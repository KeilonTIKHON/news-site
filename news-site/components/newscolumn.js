'use client'

import { useState } from "react";
import Newscard from "./newscard";
import Newspagecount from "./newspagecount";
import Filters from "./filters";
import Header from "./Header";

export default function Newscolumn({ newsposts, tags, categoryes }) {
    const includesAll = (arr, values) => values.every(v => arr.includes(v));
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [currentpage, setCurrentpage] = useState(1);
    const [filters, setFilters] = useState(

    )
    const [test, setTest] = useState(0)
    const [searchres1, setSearchres] = useState(newsposts)
    const [catarray, setCatarray] = useState([])
    const [tagarray, setTagarray] = useState([])
    const [filterednews, swtFilterednews] = useState(
        filternewss()
    )
    const [filterbytag, setFilterbytag] = useState(
        filttags()
    )
    function filternewss(searchres) {
        let smth1
        if (searchres) {
            setSearchres(searchres)
            smth1 = newsposts.filter((filt_post) => {
                
                //console.log(filt_post)
                
                return searchres.includes(filt_post) //|| searchres[0]===undefined
                //return ((tagarray[0]==undefined) || (includesAll(smth,tagarray)))
            })
        } else {
            smth1 = newsposts;
        }

        const smth2 = smth1.filter((news_post) => {
            const smth = news_post.fields.category.map((npost) => {
                return npost.fields.name
            })

            return ((catarray[0] == undefined) || (includesAll(smth, catarray)))
        })
        const smth3 = smth2.filter((filt_post) => {
            const smth = filt_post.fields.tags.map((npost) => {
                return npost.fields.name
            })

            return ((tagarray[0] == undefined) || (includesAll(smth, tagarray)))
        })

        
        return smth3
    }
    function filttags() {
        const smth2 = filterednews.filter((filt_post) => {
            const smth = filt_post.fields.tags.map((npost) => {
                return npost.fields.name
            })

            return ((tagarray[0] == undefined) || (includesAll(smth, tagarray)))
        })
        return smth2
    }

    const lastpostindex = currentpage * postsPerPage;
    const firstpostindex = lastpostindex - postsPerPage;
    const newspostspage = filterednews.slice(firstpostindex, lastpostindex)



    let postcategs
    return (
        <div>

            <Header newsposts={newsposts} swtFilterednews={swtFilterednews} filterednews={filterednews} filternewss={filternewss}></Header>
            <div className="underheader"></div>
            <div className="newscolumn">
                <Filters tags={tags} categoryes={categoryes} setCatarray={setCatarray} catarray={catarray} swtFilterednews={swtFilterednews} filternewss={filternewss} tagarray={tagarray} setTagarray={setTagarray} filttags={filttags} setFilterbytag={setFilterbytag} searchres1={searchres1}></Filters>
                <div className="newscardcont">
                    {
                        newspostspage.map((post) => {
                            postcategs = post.fields.category.map((catg) => {
                                return catg.fields.name

                            })

                            return <Newscard key={post.sys.id} title={post.fields.title} description={post.fields.short_description} date={post.fields.publishedDate} image={post.fields.image.fields.file.url} slug={post.fields.slug}></Newscard>
                        })

                    }
                </div>

                <Newspagecount postcount={filterednews.length} postsperpage={postsPerPage} setCurrentpage={setCurrentpage}></Newspagecount>
            </div>

        </div>
    );
}