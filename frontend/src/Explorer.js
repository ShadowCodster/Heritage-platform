import { useEffect, useState } from "react";
import { API } from "./config";

export default function Explorer({ monumentId }) {
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${API}/checkpoints/${monumentId}`)
      .then(res => res.json())
      .then(setSteps);
  }, [monumentId]);

  if (!steps.length) return <p>Loading...</p>;

  const step = steps[index];

  return (
    <div>
      <h2>{step.title}</h2>
      <img src={step.image_url} width="400" alt="heritage" />
      <div style={{background:"#fff8dc", padding:"10px"}}>
        🤖 {step.fact}
      </div>
      <button onClick={() => setIndex(i => i + 1)}>Next</button>
    </div>
  );
}
