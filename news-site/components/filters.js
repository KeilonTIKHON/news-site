'use client'

import '../styles/styles.css'
import { useState } from "react";

export default function Filters({ tags, categoryes, setCatarray, catarray, swtFilterednews,filternewss, tagarray, setTagarray, filttags, setFilterbytag, searchres1 }) {
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
    const [currcat, setCurrcat] = useState('Categories')
    const [filteredcategs, setFilteredcategs] = useState([])
    const [currtag, setCurrtag] = useState([])
    const [currcateg, setCurrcateg] = useState([])
    const [cat, setCat] = useState([])
    const [tagg, settagg] = useState([])
    
    
    function filtercategory(categname){
        
        if(catarray.includes(categname)){
            const newcatarray = catarray;
            newcatarray.splice((newcatarray.indexOf(categname)),1)
            
            setCatarray(newcatarray)
        }else{
           const newcatarray = catarray;
           newcatarray.push(categname)
           
           setCatarray(newcatarray)
           setCurrcateg(newcatarray) 
        }
    }
    function filtertag(taggname){
       
        if(tagarray.includes(taggname)){
            const newtagarray = tagarray;
            newtagarray.splice((newtagarray.indexOf(taggname)),1)
            
            setTagarray(newtagarray)
        }else{
           const newtagarray = tagarray;
           newtagarray.push(taggname)
           
           setTagarray(newtagarray)
           setCurrtag(newtagarray)
        }
    }

    return (
        <div className='filtercont'>
            
            <div className="dropdown">
                <button className='chosencategory'>{currcat}</button>
                <div className="categories">
                    {categorynames.map((categoryname, i)=>{
                         return <button className={currcateg.includes(categoryname)?'categoryyes':'categoryno'} key={i} onClick={()=>{
                            console.log(currcateg)
                            filtercategory(categoryname)
                            swtFilterednews(filternewss(searchres1))
                            setCat(filternewss(searchres1))
                        }}>{categoryname} </button>
                    })}
                </div>
            </div>
            <div className='tagbutscont'>
                {tagnames.map((tagname, i)=>{
                     return <div key={i} className='butpos'>
                        <button className={currtag.includes(tagname)?'active':'notactive'} key={i} onClick={()=>{
                        console.log(tagname)
                        console.log(currtag)
                        filtertag(tagname)
                        swtFilterednews(filternewss(searchres1))
                        settagg(filternewss(searchres1))
                     }}>{tagname}</button>
                     </div>
                     
                })}
            </div>
        </div>
    )
}