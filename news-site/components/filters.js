'use client'

import '../styles/styles.css'
import { useState } from "react";

export default function Filters({ tags, categoryes, setCatarray, catarray, swtFilterednews,filternewss, tagarray, setTagarray, filttags, setFilterbytag }) {
    const [tagnames, setTagnames] = useState(
        tags.map((taginfo)=>{
            return taginfo.fields.name
         })
    )
    const [categorynames, setCategorynames] = useState(
        categoryes.map((category)=>{
            return category.fields.name
         })
    )
    const [currcat, setCurrcat] = useState('None')
    const [filteredcategs, setFilteredcategs] = useState([])
    
    
    console.log(categorynames);
    console.log(tagnames)
    function filtercategory(categname){
        console.log(catarray)
        console.log(categname + ' ppp')
        if(catarray.includes(categname)){
            const newcatarray = catarray;
            newcatarray.splice((newcatarray.indexOf(categname)),1)
            console.log(newcatarray)
            setCatarray(newcatarray)
        }else{
           const newcatarray = catarray;
           newcatarray.push(categname)
           console.log(newcatarray)
           setCatarray(newcatarray) 
        }
    }
    function filtertag(taggname){
       
        if(tagarray.includes(taggname)){
            const newtagarray = tagarray;
            newtagarray.splice((newtagarray.indexOf(taggname)),1)
            console.log(newtagarray)
            setTagarray(newtagarray)
        }else{
           const newtagarray = tagarray;
           newtagarray.push(taggname)
           console.log(newtagarray)
           setTagarray(newtagarray) 
        }
    }

    return (
        <div>
            <div>
                <div></div>
                <div></div>
            </div>
            <div className="dropdown">
                <button className='chosencategory'>{currcat}</button>
                <div className="categories">
                    {categorynames.map((categoryname, i)=>{
                         return <button key={i} onClick={()=>{
                            filtercategory(categoryname)
                            swtFilterednews(filternewss())
                        }}>{categoryname} </button>
                    })}
                </div>
            </div>
            <div className='tagbutscont'>
                {tagnames.map((tagname, i)=>{
                     return <button key={i} onClick={()=>{
                        filtertag(tagname)
                        swtFilterednews(filternewss())
                     }}>{tagname}</button>
                })}
            </div>
        </div>
    )
}