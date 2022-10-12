import { logOut } from '../../utilities/users-service';
import SynonymListItem from '../../components/SynonymListItem/SynonymListItem'
import SyllableList from '../SyllableList/SyllableList';
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
export default function WordBox({data}) {
    let empty = "empty";
    let empty2 = {};
    let empty3 = [];
    const [word, setWord] = useState({});
    useEffect(()=> {
      axios.get('http://localhost:3001/api/users/word-list').then((response) =>{
        // console.log(typeof response)
        setWord(response);
      })
    },[])

  return (
    <>
        {/* <p>Definition: {data !== empty? <span>{data.results[1].definition}</span> : console.log("error")}</p>
        <div>
            Synonyms:
            <ul>
                {data !== empty ? data.results[1].synonyms.map((value, index) => <SynonymListItem value={value} index={index}/>) : console.log("error")}
            </ul>
            <p>Part of speech: {data !== empty ? data.results[1].partOfSpeech : console.log("error")}</p>
            <p>Syllables: {data != empty ? data.syllables.count : console.log("error")}</p>
            <p>Individual Syllables: {data !== empty ? data.syllables.list.map((value, index) => <SyllableList value={value} index={index}/>) : console.log("error")}</p>
            
        </div> */}

        <div>
          <p>Word: {word.data == undefined ? console.log("error") : <span>{word.data[0].word}</span>}</p>
          {/* {console.log(word.data == undefined ? console.log("error") : console.log(word.data[0].results[0]))} */}
          <p>Definition: {word.data == undefined ? console.log("error") : <span>{word.data[0].results[0].definition}</span>}</p>
          <p>Part of speech: {word.data == undefined ? console.log("error") : <span>{word.data[0].results[0].partOfSpeech}</span>}</p>
          <p>Synonyms: {word.data == undefined ? console.log("error") : <span>{word.data[0].results[0].synonyms}</span>}</p>

        </div>
    
    </>
  );
}

