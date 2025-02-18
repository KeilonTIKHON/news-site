'use client'

import { useState } from "react";
import Newscard from "./newscard";
import Newspagecount from "./newspagecount";
import Filters from "./filters";

export default function Newscolumn({ newsposts, tags, categoryes }) {
    const includesAll = (arr, values) => values.every(v => arr.includes(v));
    const [postsPerPage, setPostsPerPage] = useState(2);
    const [currentpage, setCurrentpage] = useState(1);
    const [filters, setFilters] = useState(

    )
    
    const [catarray, setCatarray] = useState([])
    const [tagarray, setTagarray] = useState([])
    function filternewss(){
        const smth1 = newsposts.filter((news_post)=>{
            const smth = news_post.fields.category.map((npost)=>{
                return npost.fields.name
            })
            console.log(smth)
            return ((catarray[0]==undefined) || (includesAll(smth,catarray)))
        })
        const smth2 = smth1.filter((filt_post)=>{
            const smth = filt_post.fields.tags.map((npost)=>{
                return npost.fields.name
            })
            console.log(smth)
            return ((tagarray[0]==undefined) || (includesAll(smth,tagarray)))
        })
        return smth2
    }
    function filttags(){
        const smth2 = filterednews.filter((filt_post)=>{
            const smth = filt_post.fields.tags.map((npost)=>{
                return npost.fields.name
            })
            console.log(smth)
            return ((tagarray[0]==undefined) || (includesAll(smth,tagarray)))
        })
        return smth2
    }
    const [filterednews, swtFilterednews] = useState(
        filternewss()
    )
    const [filterbytag, setFilterbytag] = useState(
        filttags()
    )
    const lastpostindex = currentpage * postsPerPage;
    const firstpostindex = lastpostindex - postsPerPage;
    const newspostspage = filterednews.slice(firstpostindex, lastpostindex)

    
    console.log(newsposts)
    let postcategs
    return (
        <div>
            <button onClick={()=>{
                console.log(filterednews)
            }}>TESTTEST</button>
            <h1>Новости</h1>
            <Filters tags={tags} categoryes={categoryes} setCatarray={setCatarray} catarray={catarray} swtFilterednews={swtFilterednews} filternewss={filternewss} tagarray={tagarray} setTagarray={setTagarray} filttags={filttags} setFilterbytag={setFilterbytag}></Filters>
            {
                newspostspage.map((post) => {
                    postcategs = post.fields.category.map((catg)=>{
                        return catg.fields.name
                        
                    })
                    console.log(postcategs)
                return  <Newscard key={post.sys.id} title={post.fields.title} description={post.fields.body} date={post.fields.publishedDate} image={post.fields.image.fields.file.url}></Newscard>
})

            }
            <Newspagecount postcount={filterednews.length} postsperpage={postsPerPage} setCurrentpage={setCurrentpage}></Newspagecount>
        </div>
    );
}