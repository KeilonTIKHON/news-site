

import Image from "next/image";
import { client } from "./lib/contentful";


export default function Home() {
  function getNews() {

    client.getEntries({ content_type: "news" })
      .then((response) => console.log(response.items))
      .catch(console.error)
    console.log('hi1')
  }
  function getCategoryAndTagData() {
    client.getEntries({ content_type: "tag" })
    .then((response) => response.items.forEach(entry => {
      console.log(entry.fields); 
    }))
    .catch(console.error)
    client.getEntries({ content_type: "categoty" })
    .then((response) => response.items.forEach(entry => {
      console.log(entry.fields); 
    }))
    .catch(console.error)
  console.log('hi2')
  }
  return (
    <div>
      <button onClick={getNews()}>getNews</button>
      <button onClick={getCategoryAndTagData()}>getCategoryAndTagData</button>
      </div>
  );
}
