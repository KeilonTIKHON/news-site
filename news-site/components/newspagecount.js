'use client'

export default function Newspagecount({postcount, postsperpage, setCurrentpage}){
    const pagebuttons = [];
    for(let i=1; i<=Math.ceil(postcount/postsperpage); i++){
        pagebuttons.push(i);
        
    }
    return(
        <div>
            {
                pagebuttons.map((pagenum,index)=>{
                    return <button key={index} onClick={()=> setCurrentpage(pagenum)}>{pagenum}</button>
                })
            }
        </div>
    )
}