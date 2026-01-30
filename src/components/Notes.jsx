import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import './Notes.css'

const SUBJECTS = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'Other']

const Notes = () => {
    const { notes, setNotes } = useApp()
    const [showModal, setShowModal] = useState(false)
    const [editingNote, setEditingNote] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('All')
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        subject: 'Other'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingNote) {
            setNotes(prev => prev.map(n => n.id === editingNote.id ? {
                ...formData,
                id: n.id,
                updatedAt: new Date().toISOString()
            } : n))
        } else {
            setNotes(prev => [...prev, {
                ...formData,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }])
        }
        resetForm()
    }

    const resetForm = () => {
        setFormData({ title: '', content: '', subject: 'Other' })
        setEditingNote(null)
        setShowModal(false)
    }

    const handleEdit = (note) => {
        setFormData({ title: note.title, content: note.content, subject: note.subject })
        setEditingNote(note)
        setShowModal(true)
    }

    const deleteNote = (id) => {
        setNotes(prev => prev.filter(n => n.id !== id))
    }

    // Filter notes
    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject
        return matchesSearch && matchesSubject
    }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getSubjectColor = (subject) => {
        const colors = {
            'Mathematics': '#6c63ff',
            'Physics': '#00d9ff',
            'Chemistry': '#00e676',
            'Computer Science': '#ffab40',
            'English': '#e040fb',
            'Other': '#ff5252'
        }
        return colors[subject] || '#6c63ff'
    }

    return (
        <div className="notes-page">
            <div className="page-header">
                <h1 className="page-title">📝 Notes</h1>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ New Note
                </button>
            </div>

            {/* Search and Filter */}
            <div className="notes-toolbar">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="subject-filter">
                    {SUBJECTS.map(subject => (
                        <button
                            key={subject}
                            className={`filter-chip ${selectedSubject === subject ? 'active' : ''}`}
                            onClick={() => setSelectedSubject(subject)}
                        >
                            {subject}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notes Grid */}
            {filteredNotes.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">📓</span>
                    <p>{notes.length === 0 ? 'No notes yet. Create your first note!' : 'No notes match your search.'}</p>
                </div>
            ) : (
                <div className="notes-grid">
                    {filteredNotes.map(note => (
                        <div
                            key={note.id}
                            className="note-card"
                            onClick={() => handleEdit(note)}
                        >
                            <div
                                className="note-subject-tag"
                                style={{ backgroundColor: getSubjectColor(note.subject) + '33', color: getSubjectColor(note.subject) }}
                            >
                                {note.subject}
                            </div>
                            <h3 className="note-title">{note.title}</h3>
                            <p className="note-preview">{note.content.substring(0, 100)}...</p>
                            <div className="note-footer">
                                <span className="note-date">{formatDate(note.updatedAt)}</span>
                                <button
                                    className="delete-note-btn"
                                    onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Note Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal note-modal" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">{editingNote ? 'Edit Note' : 'New Note'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Note title..."
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Subject</label>
                                <select
                                    className="select"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    {SUBJECTS.filter(s => s !== 'All').map(subject => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Content</label>
                                <textarea
                                    className="input note-content-input"
                                    placeholder="Write your note here..."
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    required
                                    rows={10}
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingNote ? 'Save Changes' : 'Create Note'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notes
