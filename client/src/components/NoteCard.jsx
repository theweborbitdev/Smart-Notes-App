function NoteCard({ note, onDelete, onEdit }) {
  return (
    <article className="note-card">
      <div className="note-card-header">
        <div>
          <h3>{note.title}</h3>
          <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
        </div>
      </div>

      {note.content && <p className="note-content">{note.content}</p>}

      <div className="note-actions">
        <button type="button" className="secondary-button" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button
          type="button"
          className="danger-button"
          onClick={() => onDelete(note._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));

export default NoteCard;

