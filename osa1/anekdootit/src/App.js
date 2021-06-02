import React, { useState } from "react";

const AnecdoteOfTheDay = ({selected, votes, anecdotes}) => {
  return (
    <>
      <h1>Anecdote of the day<br /></h1>
      <p>{anecdotes[selected]}{"\n"}has {votes[selected]} votes</p>
      <p>has {votes[selected]} votes</p>
    </>
  )
}

const MostVoted = ({ votes, anecdotes }) => {
  if (Math.max(...votes) === 0) {
    return <p>No votes given</p>;
  } else {
    return (
      <>
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        <p>has {Math.max(...votes)} votes</p>
      </>
    );
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];
  const [votes, setVotes] = useState(Array.from(anecdotes).fill(0));
  const [selected, setSelected] = useState(0);
  const getRandomNum = (num) => Math.floor(Math.random() * num);
  const getNewAnecdote = () => setSelected(getRandomNum(anecdotes.length));
  const addVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  return (
    <div>
      <AnecdoteOfTheDay selected={selected} votes={votes} anecdotes={anecdotes} />
      <button onClick={addVote}>vote</button>
      <button onClick={getNewAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
