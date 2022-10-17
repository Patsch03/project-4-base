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
    const [word, setWord] = useState({});

    // loads the 3001 word list json with all the word information
    function load(){
      axios.get('http://localhost:3001/api/users/word-list').then((response) =>{
        setWord(response);
    })
    }

    // loads once
    useEffect(()=> {
      load();
    },[])

  return (
    
    <>
        {/* makes sure that there is data to be checked */}
        {data.results ? 
        
        
        <div class="WordBox">

          {/* displays definition */}
          <p class="info">Definition: {data.results !== undefined? <span class="font">{data.results[0].definition}</span> : <p>N/A</p>}</p>
          <div>

              <p class ="info">Synonyms:</p>
              {/* Synonym list */}
              <ul>
                  {data.results[0].synonyms == undefined ? <p>N/A</p> : data.results[0].synonyms.map((value, index) => <SynonymListItem value={value} index={index}/>) }
              </ul>

              {/* part of speech display */}
              <p class="info">Part of speech: {data.results !== undefined || data !== empty ? <span class="font">{data.results[0].partOfSpeech}</span> : console.log("error")}</p>

              {/* Displays syllable count */}
              <p class="info">Syllables: {data.syllables == undefined ? <p>N/A</p> : <span class="font">{data.syllables.count}</span> }</p>

              {/* displays individual syllables. */}
              <p class="info">Individual Syllables: {data.syllables == undefined ? <p>N/A</p> : data.syllables.list.map((value, index) => <SyllableList value={value} index={index}/>) }</p>
              
          </div>

        </div>  

        
        : 
        // if data didnt have data
        <p>Word doesnt exist, or plural word searched! Please only search singular words!</p>
        
        }
    </>
  );
}

