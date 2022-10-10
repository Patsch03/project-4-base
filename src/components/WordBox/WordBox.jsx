import { logOut } from '../../utilities/users-service';
import SynonymListItem from '../../components/SynonymListItem/SynonymListItem'
export default function WordBox({data}) {
    let empty = "empty";
  return (
    <>
        <p>Definition: {data != empty ? <span>{data.results[1].definition}</span> : console.log("empty-check")}</p>
        <div>
            Synonyms:
            <ul>
                {data != empty ? data.results[1].synonyms.map((value, index) => <SynonymListItem value={value} index={index}/>) : console.log("error")}
                
            </ul>

        </div>
        
    </>
  );
}

