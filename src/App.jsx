import React from 'react'
import StudentsTable from './StudentsTable'

const sampleStudents = [
  { id: 1, name: 'Alice', score: 95 },
  { id: 2, name: 'Bob', score: 82 },
  { id: 3, name: 'Carlos', score: 76 },
  { id: 4, name: 'Dana', score: 64 },
  { id: 5, name: 'Eve', score: 58 },
  { id: 6, name: 'Frank', score: 88 },
]

export default function App(){
  return (
    <div className="app">
      <h1>Students</h1>
      <p>Use the inputs to filter by score range and toggle ascending sort by score.</p>
      <StudentsTable students={sampleStudents} />
    </div>
  )
}

