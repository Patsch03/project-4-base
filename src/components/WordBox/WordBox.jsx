import { logOut } from '../../utilities/users-service';
import SynonymListItem from '../../components/SynonymListItem/SynonymListItem'
import SyllableList from '../SyllableList/SyllableList';
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import './WordBox.css'
import * as React from 'react';
export default function WordBox({data}) {

    let empty = "empty";
    let empty2 = {};
    let empty3 = [];
    const [word, setWord] = useState({});


    function load(){
      axios.get('http://localhost:3001/api/users/word-list').then((response) =>{
        setWord(response);
    })
    }

    useEffect(()=> {
      load();
    },[])

    function getIndex(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].word == data.word){
          return i;
        }
      }
    }

  return (
    <>

        {data.results ? 
        
        
        <div class="WordBox">
          <p class="info">Definition: {data.results !== undefined? <span class="font">{data.results[0].definition}</span> : <p>N/A</p>}</p>
          <div>
              <p class ="info">Synonyms:</p>
              <ul>
                  {data.results[0].synonyms == undefined ? <p>N/A</p> : data.results[0].synonyms.map((value, index) => <SynonymListItem value={value} index={index}/>) }
              </ul>
              <p class="info">Part of speech: {data.results !== undefined || data !== empty ? <span class="font">{data.results[0].partOfSpeech}</span> : console.log("error")}</p>
              <p class="info">Syllables: {data.syllables == undefined ? <p>N/A</p> : <span class="font">{data.syllables.count}</span> }</p>
              <p class="info">Individual Syllables: {data.syllables == undefined ? <p>N/A</p> : data.syllables.list.map((value, index) => <SyllableList value={value} index={index}/>) }</p>
              
          </div>

        </div>  

        
        : 
        
        <p>Plural word searched! Please only search singular words!</p>
        
        }
        

        

        {/* <div>
          <p>Word: {word.data == undefined ? console.log("error") : <span>{word.data[getIndex(word.data)].word}</span>}</p> {/* error might come from localhost:3001 not being refreshed because its fetching data from there. not the mongo database (Almost definitely this) */}
          {/* {console.log(word.data == undefined ? console.log("error") : console.log(word.data[0].results[0]))} }
          <p>Definition: {word.data == undefined ? console.log("error") : <span>{word.data[getIndex(word.data)].results[0].definition}</span>}</p>
          <p>Part of speech: {word.data == undefined ? console.log("error") : <span>{word.data[getIndex(word.data)].results[0].partOfSpeech}</span>}</p>
          <p>Synonyms: {word.data == undefined ? console.log("error") : <span>{word.data[getIndex(word.data)].results[0].synonyms}</span>}</p>
        </div> */}
        
    </>
  );
}

