import { logOut } from '../../utilities/users-service';
import SynonymListItem from '../../components/SynonymListItem/SynonymListItem' 
export default function Rhyme({rhymeData, data}) {
    let empty = "empty";
  return (
    <>
        {rhymeData != empty ? rhymeData.rhymes.all.includes(data.word) ? <span>It does rhyme</span> : <span>It does not rhyme</span> : console.log("error")}
    </>
  );
}

