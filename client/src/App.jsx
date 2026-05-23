import { useEffect, useMemo, useState } from "react";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote
} from "./api/notesApi";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const emptyForm = {
  title: "",
  content: ""
};

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return notes;
    }

    return notes.filter((note) =>
      note.title.toLowerCase().includes(normalizedSearch)
    );
  }, [notes, searchTerm]);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      setError("");
      const notesFromApi = await getNotes();
      setNotes(notesFromApi);
    } catch (apiError) {
      setError(getErrorMessage(apiError, "Unable to load notes."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      if (editingNoteId) {
        const updatedNote = await updateNote(editingNoteId, formData);
        setNotes((currentNotes) =>
          currentNotes.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
          )
        );
      } else {
        const createdNote = await createNote(formData);
        setNotes((currentNotes) => [createdNote, ...currentNotes]);
      }

      resetForm();
    } catch (apiError) {
      setError(getErrorMessage(apiError, "Unable to save note."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setFormData({
      title: note.title,
      content: note.content || ""
    });
    setError("");
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteNote(id);
      setNotes((currentNotes) =>
        currentNotes.filter((note) => note._id !== id)
      );

      if (editingNoteId === id) {
        resetForm();
      }
    } catch (apiError) {
      setError(getErrorMessage(apiError, "Unable to delete note."));
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingNoteId(null);
  };

  return (
    <main className="app-shell">
      <section className="header-section">
        <div>
          <p className="eyebrow">MERN Assessment Project</p>
          <h1>Smart Notes App</h1>
          <p className="subtitle">
            Capture notes, refine them later, and search by title instantly.
          </p>
        </div>
      </section>

      <section className="workspace">
        <NoteForm
          formData={formData}
          isEditing={Boolean(editingNoteId)}
          isSaving={isSaving}
          onCancel={resetForm}
          onChange={setFormData}
          onSubmit={handleSubmit}
        />

        <section className="notes-panel" aria-labelledby="notes-heading">
          <div className="notes-toolbar">
            <div>
              <h2 id="notes-heading">Notes</h2>
              <p>{notes.length} saved note{notes.length === 1 ? "" : "s"}</p>
            </div>

            <label className="search-field">
              <span>Search by title</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search notes..."
              />
            </label>
          </div>

          {error && <div className="alert">{error}</div>}

          <NoteList
            isLoading={isLoading}
            notes={filteredNotes}
            searchTerm={searchTerm}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </section>
      </section>
    </main>
  );
}

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || fallbackMessage;

export default App;

