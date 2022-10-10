import {useState} from 'react'
import axios from 'axios'
import WordBox from '../../components/WordBox/WordBox';
export default function WordPage( ) {
    // const axios = require("axios");
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const [parameter, setParameter] = useState("");
    const [data, setData] = useState("empty");
    const [rhymeData, setRhymeData] = useState("empty");
    let error = "";
    const [display, setDisplay] = useState(false);


    //Endpoint to pull standard word data
    function getAPI(parameter2){
            let options = {
                method: 'GET',
                url: `https://wordsapiv1.p.rapidapi.com/words/${parameter2}`,
                headers: {
                  'X-RapidAPI-Key': 'a21d70600cmsh186ccfce56852d2p117012jsn405975b2a5c1',
                  'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
                }
              };
        axios.request(options).then(function (response) {
            setData(response.data);
            // console.log(data);
            // console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
        setDisplay(true);
    }


    //Seperate endpoint to pull rhymes
    function getRhymes(){
        const options = {
            method: 'GET',
            url: 'https://wordsapiv1.p.rapidapi.com/words/%7Bword%7D/rhymes',
            headers: {
              'X-RapidAPI-Key': 'a21d70600cmsh186ccfce56852d2p117012jsn405975b2a5c1',
              'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }
    
    async function handleSubmit(evt){
        evt.preventDefault();
        try {
            getAPI(parameter);
        } catch {
            error = 'error'
        }
    }

    async function handleChange(evt){
        setParameter(evt.target.value);
        setDisplay(false);
    };


  return (
    <main>
      <h1>Home Page Search</h1>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <input type="text" value={parameter} onChange={handleChange} required/>
            <button type="submit">Search</button>
        </form>

        {display &&
            <h2>
            <WordBox data = {data}/>
            </h2>
        }

        {display &&
            <h2>
                <Rhyme data ={data}/>
            </h2>
        }
    </main>
  );
}