import {useState} from 'react'
import axios from 'axios'
import WordBox from '../../components/WordBox/WordBox';
import Rhyme from '../../components/Rhyme/Rhyme'
import './WordPage.css'
import { createWord } from '../../utilities/users-api';
export default function WordPage( ) {
    const [parameter, setParameter] = useState("");
    const [rhymeParameter, setRhymeParameter] = useState("");
    const [data, setData] = useState("empty");
    const [rhymeData, setRhymeData] = useState("empty");
    const [display, setDisplay] = useState(false);
    const [rhymeDisplay, setRhymeDisplay] = useState(false);
    const [rhymeCheckDisp, setRhymeCheckDisp] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Word does not exist");
    const [errorDisplay, setErrorDisplay] = useState(false);
    let error = ""


    //Endpoint to pull standard word data
    function getAPI(parameter2){
            let options = {
                method: 'GET',
                url: `https://wordsapiv1.p.rapidapi.com/words/${parameter2}`,
                headers: {
                  'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                  'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
                }
              };
        axios.request(options).then(function (response) {
            setData(response.data);
            setDisplay(true);
            setRhymeCheckDisp(true);
            createWord(response.data);
            console.log("word created ran")
            setErrorDisplay(false);
        }).catch(function (error) {
            if(error){
                setErrorDisplay(true);
            }
        });
        
        
        
    }


    //Seperate endpoint to pull rhymes
    function getRhymes(parameter2){
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${parameter2}/rhymes`,
            headers: {
              'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
              'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              setRhymeData(response.data);
          }).catch(function (error) {
              console.error(error);
          });
          setRhymeDisplay(true);
    }
    
    async function handleSubmit(evt){
        evt.preventDefault();
        try {
            getAPI(parameter);
        } catch {
            console.log("error");
        }
    }

    async function handleChange(evt){
        setParameter(evt.target.value);
        setDisplay(false);
        setRhymeCheckDisp(false);
        
    };

    async function handleRhymeChange(evt){
        setRhymeParameter(evt.target.value);
        setRhymeDisplay(false);
    };

    async function handleRhymeSubmit(evt){
        evt.preventDefault();
        try {
            getRhymes(rhymeParameter);
        } catch {
            console.log("error")
        }
    }

  return (
    <main>
      <h1>Home Page Search</h1>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <input type="text" value={parameter} onChange={handleChange} required/>
            <button type="submit">Search</button>
        </form>


        {errorDisplay &&
            <h2>
                {errorMsg}
            </h2>

        }

        {display &&
            <h2>
                <WordBox data = {data}/>
            </h2>
        }


        {/* DONT WANT ANYTHING BELOW THIS TO DISPLAY UNLESS WORD IS ALREADY RENDERED ON PAGE */}
        {rhymeCheckDisp &&

            <form autoComplete="off" onSubmit={handleRhymeSubmit}>
                <input type="text" value={rhymeParameter} onChange={handleRhymeChange} required/>
                <button type="submit">Check Rhyme</button>
            </form>
        }
        

        {rhymeDisplay && rhymeCheckDisp &&
            <h2>
                <Rhyme rhymeData ={rhymeData} data ={data}/>
            </h2>
        }
    </main>
  );
}