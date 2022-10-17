import {useState} from 'react'
import axios from 'axios'
import WordBox from '../../components/WordBox/WordBox';
import Rhyme from '../../components/Rhyme/Rhyme'
import './WordPage.css'
import { createWord } from '../../utilities/users-api';
import { getWords } from '../../utilities/users-api';
import { getUser } from '../../utilities/users-service';


export default function WordPage( ) {
    // user input that goes into api url 
    const [parameter, setParameter] = useState("");

    // user input to check whether a word rhymes
    const [rhymeParameter, setRhymeParameter] = useState("");

    // information that gets sent to backend after word submission
    const [data, setData] = useState("empty");

    // list of words that rhyme with the word that is being searched
    const [rhymeData, setRhymeData] = useState("empty");

    // Says whether or not certain things should be displayed 
    const [display, setDisplay] = useState(false);

    // Says whether or not the rhyme result should be displayed 
    const [rhymeDisplay, setRhymeDisplay] = useState(false);

    // Checks if a wordbox is displayed
    const [rhymeCheckDisp, setRhymeCheckDisp] = useState(false);

    // Error message
    const [errorMsg, setErrorMsg] = useState("Word does not exist");
    
    // Displays above error message
    const [errorDisplay, setErrorDisplay] = useState(false);

    // User
    const [user, setUser] = useState(getUser());
    let error = ""


    //Endpoint to pull standard word data
    async function getAPI(parameter2){
            let options = {
                method: 'GET',
                url: `https://wordsapiv1.p.rapidapi.com/words/${parameter2}`,
                headers: {
                  'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                  'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
                }
              };

        axios.request(options).then(function (response) {
            createWord(response.data);
            setData(response.data);
            getWords();
            setDisplay(true);
            setRhymeCheckDisp(true);
            setErrorDisplay(false);

        }).catch(function (error) {
            if(error){
                setErrorDisplay(true);
            }
        });
    }


    //Seperate endpoint to pull rhymes
    async function getRhymes(parameter2){
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${parameter2}/rhymes`,
            headers: {
              'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
              'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            if(response.data){
                setRhymeData(response.data);
            }
          }).catch(function (error) {
              console.error(error);
          });
          setRhymeDisplay(true);
    }
    
    // What to do on form submission
    async function handleSubmit(evt){
        evt.preventDefault();
        try {
            getAPI(parameter);
        } catch {
            console.log("error");
        }
    }
    // Changes input box and stores value
    async function handleChange(evt){
        setParameter(evt.target.value);
        setDisplay(false);
        setRhymeCheckDisp(false);
        
    };

    // Submission for Rhyme form
    async function handleRhymeChange(evt){
        setRhymeParameter(evt.target.value);
        setRhymeDisplay(false);
    };

    // Changes Rhyme input box and stores value
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
        {/* Search form */}
        <h1>Search a Word!</h1>
        <form class="form"autoComplete="off" onSubmit={handleSubmit}>
            <div class="center">
                <input class= "text-input"type="text" value={parameter} onChange={handleChange} required></input>
            </div>
            <button type="submit">Search (Non-Plural Words)</button>
        </form>

        {/* Displaying error message if there is an error */}
        {errorDisplay &&
            <h2>
                {errorMsg}
            </h2>

        }

        {/* displays the wordbox (word information) after display is made true when word is inputed */}
        {display &&
            <h2>
                {}
                <WordBox data = {data}/>
            </h2>
        }

        {/* Rhyme input form */}
        {rhymeCheckDisp &&
            <form class="form"autoComplete="off" onSubmit={handleRhymeSubmit}>
                <input type="text" value={rhymeParameter} onChange={handleRhymeChange} required/>
                <button type="submit">Check Rhyme</button>
            </form>
        }
        
        {/* displays if something rhymes after searched */}
        {rhymeDisplay && rhymeCheckDisp &&
            <h2>
                <Rhyme rhymeData ={rhymeData} data ={data}/>
            </h2>
        }


        <img class="image" height="150" width="150" src= "https://i.imgur.com/u5GvLPu.png"/>

    </main>
  );
}