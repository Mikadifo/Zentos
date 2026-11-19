import { useParams } from "react-router-dom";

function Balances() {
  const { year } = useParams();

  return (
    <div>
      <p>Body</p>
    </div>
  );
}

export default Balances;
