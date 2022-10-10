import { logOut } from '../../utilities/users-service';
import SynonymListItem from '../../components/SynonymListItem/SynonymListItem'
import SyllableList from '../SyllableList/SyllableList';
export default function WordBox({data}) {
    let empty = "empty";
  return (
    <>
        <p>Definition: {data !== empty? <span>{data.results[1].definition}</span> : console.log("error")}</p>
        <div>
            Synonyms:
            <ul>
                {data !== empty ? data.results[1].synonyms.map((value, index) => <SynonymListItem value={value} index={index}/>) : console.log("error")}
            </ul>
            <p>Part of speech: {data !== empty ? data.results[1].partOfSpeech : console.log("error")}</p>
            <p>Syllables: {data !== empty ? data.syllables.count : console.log("error")}</p>
            <p>Individual Syllables: {data !== empty ? data.syllables.list.map((value, index) => <SyllableList value={value} index={index}/>) : console.log("error")}</p>
            
        </div>
    
    </>
  );
}

