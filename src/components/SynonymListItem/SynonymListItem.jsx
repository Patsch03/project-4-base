export default function OrderDetail({value, index}) {
  return (
    <li class="list" key={index}>{value}</li>
  );
}