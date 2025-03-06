'use client'

export default function Newspagecount({postcount, postsperpage, setCurrentpage}){
    const pagebuttons = [];
    for(let i=1; i<=Math.ceil(postcount/postsperpage); i++){
        pagebuttons.push(i);
        
    }
    return(
        <div className="pages">
            {
                pagebuttons.map((pagenum,index)=>{
                    return <button className="page_buttons" key={index} onClick={()=> setCurrentpage(pagenum)}>{pagenum}</button>
                })
            }
        </div>
    )
}