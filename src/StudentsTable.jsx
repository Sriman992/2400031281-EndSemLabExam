import React, { useMemo, useState } from 'react'

export default function StudentsTable({ students = [] }) {
  const [minScore, setMinScore] = useState('')
  const [maxScore, setMaxScore] = useState('')
  const [sortAsc, setSortAsc] = useState(true) // ascending by default

  const parsedMin = minScore === '' ? -Infinity : Number(minScore)
  const parsedMax = maxScore === '' ? Infinity : Number(maxScore)

  const visible = useMemo(() => {
    const filtered = students.filter(s => {
      const sc = Number(s.score)
      return sc >= parsedMin && sc <= parsedMax
    })
    const sorted = filtered.sort((a, b) => (a.score - b.score) * (sortAsc ? 1 : -1))
    return sorted
  }, [students, parsedMin, parsedMax, sortAsc])

  function resetFilters() {
    setMinScore('')
    setMaxScore('')
    setSortAsc(true)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
        <label>
          Min score:
          <input
            type="number"
            value={minScore}
            onChange={e => setMinScore(e.target.value)}
            style={{ marginLeft: 6, width: 80 }}
            placeholder="e.g. 50"
          />
        </label>

        <label>
          Max score:
          <input
            type="number"
            value={maxScore}
            onChange={e => setMaxScore(e.target.value)}
            style={{ marginLeft: 6, width: 80 }}
            placeholder="e.g. 100"
          />
        </label>

        <button onClick={() => setSortAsc(s => !s)}>
          Sort: {sortAsc ? 'Ascending ▲' : 'Descending ▼'}
        </button>

        <button onClick={resetFilters}>Reset</button>

        <div style={{ marginLeft: 'auto', color: '#666' }}>
          Showing {visible.length} of {students.length}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>#</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Score</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((s, idx) => (
            <tr key={s.id ?? idx}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{idx + 1}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{s.name}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{s.score}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{
                s.score >= 90 ? 'A' : s.score >= 80 ? 'B' : s.score >= 70 ? 'C' : s.score >= 60 ? 'D' : 'F'
              }</td>
            </tr>
          ))}
        </tbody>
      </table>

      {visible.length === 0 && (
        <div style={{ marginTop: '1rem', color: '#666' }}>No students match the score range.</div>
      )}
    </div>
  )
}
