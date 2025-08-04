const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map(p => (
      <div key={p.id}>
        {p.name} {p.number}
        <button onClick={() => onDelete(p.id)}>delete</button>
      </div>
    ))}
  </div>
)

export default Persons
