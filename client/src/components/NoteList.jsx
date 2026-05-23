import NoteCard from "./NoteCard";

function NoteList({ isLoading, notes, searchTerm, onDelete, onEdit }) {
  if (isLoading) {
    return <p className="state-message">Loading notes...</p>;
  }

  if (!notes.length) {
    return (
      <p className="state-message">
        {searchTerm
          ? "No notes match your search."
          : "No notes yet. Create your first note."}
      </p>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default NoteList;

