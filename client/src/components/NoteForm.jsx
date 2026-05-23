function NoteForm({
  formData,
  isEditing,
  isSaving,
  onCancel,
  onChange,
  onSubmit
}) {
  const updateField = (field, value) => {
    onChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <section className="form-panel" aria-labelledby="form-heading">
      <h2 id="form-heading">{isEditing ? "Edit note" : "Create note"}</h2>

      <form onSubmit={onSubmit}>
        <label>
          <span>Title</span>
          <input
            type="text"
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Meeting notes"
            maxLength="120"
          />
        </label>

        <label>
          <span>Content</span>
          <textarea
            value={formData.content}
            onChange={(event) => updateField("content", event.target.value)}
            placeholder="Write the details here..."
            rows="8"
            maxLength="5000"
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : isEditing ? "Update note" : "Add note"}
          </button>

          {isEditing && (
            <button type="button" className="secondary-button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default NoteForm;

