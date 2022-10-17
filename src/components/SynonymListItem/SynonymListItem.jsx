export default function OrderDetail({value, index}) {
  return (
    // List synonyms
    <li class="list" key={index}>{value}</li>
  );
}