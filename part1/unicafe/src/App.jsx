import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistic = ({good, bad, neutral}) => {

  const total = good + neutral + bad;

  if(total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={total/3} />
        <StatisticLine text='positive' value={(good/total)*100 + ' %'} />
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (type) => {
    if (type === 'good') setGood(good + 1)
    if (type === 'neutral') setNeutral(neutral + 1)
    if (type === 'bad') setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>handleClick('good')} text={'good'} />
      <Button handleClick={()=>handleClick('neutral')} text={'neutral'} />
      <Button handleClick={()=>handleClick('bad')} text={'bad'} />

      <h1>statistics</h1>

      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
