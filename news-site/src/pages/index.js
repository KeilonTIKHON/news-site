
import { getContentByType } from "./lib/contentful";
import Newscolumn from "../../components/newscolumn";

export default function Home({ posts, tags, categoryes }) {
  console.log(posts)
  return (
    
      
      <div>
        <Newscolumn newsposts={posts} tags={tags} categoryes={categoryes}></Newscolumn>
      </div>
        
      
    
        
  );

}


export async function getStaticProps() {
  const posts = await getContentByType('news');
  const tags = await getContentByType('tag');
  const categoryes = await getContentByType('categoty');
  console.log(posts)
  return {
    props: { posts, tags, categoryes },
    
    revalidate: 3600, // Опционально: обновление раз в 3600 сек
  };
}
