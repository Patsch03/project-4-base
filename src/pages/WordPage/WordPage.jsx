import {useState} from 'react'
import axios from 'axios'
import WordBox from '../../components/WordBox/WordBox';
import Rhyme from '../../components/Rhyme/Rhyme'
import './WordPage.css'
export default function WordPage( ) {
    const [parameter, setParameter] = useState("");
    const [rhymeParameter, setRhymeParameter] = useState("");
    const [data, setData] = useState("empty");
    const [rhymeData, setRhymeData] = useState("empty");
    const [display, setDisplay] = useState(false);
    let error = ""
    const [rhymeDisplay, setRhymeDisplay] = useState(false);
    const [rhymeCheckDisp, setRhymeCheckDisp] = useState(false);


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
        setRhymeCheckDisp(true);
    }


    //Seperate endpoint to pull rhymes
    function getRhymes(parameter2){
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${parameter2}/rhymes`,
            headers: {
              'X-RapidAPI-Key': 'a21d70600cmsh186ccfce56852d2p117012jsn405975b2a5c1',
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
            error = 'error'
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
            error = 'error'
        }
    }

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