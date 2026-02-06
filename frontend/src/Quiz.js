import { useState } from "react";
import { API } from "./config";

const questions = [
  { q: "Khajuraho was built in which period?", options:["500 AD","950 AD","1500 AD"], ans:1 },
  { q: "Khajuraho is famous for?", options:["Forts","Sculptures","Paintings"], ans:1 }
];

export default function Quiz({ userId }) {
  const [score, setScore] = useState(0);

  const answer = async (i, a) => {
    if (a === questions[i].ans) setScore(s => s + 10);
    if (i === questions.length - 1) {
      await fetch(`${API}/quiz`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ user_id:userId, monument_id:1, score })
      });
    }
  };

  return (
    <div>
      {questions.map((q,i)=>(
        <div key={i}>
          <p>{q.q}</p>
          {q.options.map((o,j)=>(
            <button key={j} onClick={()=>answer(i,j)}>{o}</button>
          ))}
        </div>
      ))}
    </div>
  );
}
