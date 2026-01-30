import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import './Assignments.css'

const PRIORITIES = [
    { value: 'low', label: 'Low', color: '#00e676' },
    { value: 'medium', label: 'Medium', color: '#ffab40' },
    { value: 'high', label: 'High', color: '#ff5252' }
]

const Assignments = () => {
    const { assignments, setAssignments } = useApp()
    const [showModal, setShowModal] = useState(false)
    const [filter, setFilter] = useState('all')
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        dueDate: '',
        priority: 'medium',
        description: '',
        completed: false
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setAssignments(prev => [...prev, { ...formData, id: Date.now() }])
        setFormData({
            title: '',
            subject: '',
            dueDate: '',
            priority: 'medium',
            description: '',
            completed: false
        })
        setShowModal(false)
    }

    const toggleComplete = (id) => {
        setAssignments(prev => prev.map(a =>
            a.id === id ? { ...a, completed: !a.completed } : a
        ))
    }

    const deleteAssignment = (id) => {
        setAssignments(prev => prev.filter(a => a.id !== id))
    }

    const filteredAssignments = assignments.filter(a => {
        if (filter === 'active') return !a.completed
        if (filter === 'completed') return a.completed
        return true
    }).sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        return new Date(a.dueDate) - new Date(b.dueDate)
    })

    const isOverdue = (dueDate, completed) => {
        return !completed && new Date(dueDate) < new Date()
    }

    const getDaysUntil = (dueDate) => {
        const diff = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24))
        if (diff < 0) return 'Overdue'
        if (diff === 0) return 'Today'
        if (diff === 1) return 'Tomorrow'
        return `${diff} days`
    }

    const stats = {
        total: assignments.length,
        completed: assignments.filter(a => a.completed).length,
        pending: assignments.filter(a => !a.completed).length,
        overdue: assignments.filter(a => isOverdue(a.dueDate, a.completed)).length
    }

    return (
        <div className="assignments-page">
            <div className="page-header">
                <h1 className="page-title">✅ Assignments & Tasks</h1>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Add Task
                </button>
            </div>

            {/* Stats */}
            <div className="stats-bar">
                <div className="stat-item">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value text-success">{stats.completed}</span>
                    <span className="stat-label">Done</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value text-warning">{stats.pending}</span>
                    <span className="stat-label">Pending</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value text-danger">{stats.overdue}</span>
                    <span className="stat-label">Overdue</span>
                </div>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                {['all', 'active', 'completed'].map(f => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Task List */}
            <div className="task-list">
                {filteredAssignments.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">📋</span>
                        <p>No tasks yet. Add your first assignment!</p>
                    </div>
                ) : (
                    filteredAssignments.map(task => (
                        <div
                            key={task.id}
                            className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue(task.dueDate, task.completed) ? 'overdue' : ''}`}
                        >
                            <button
                                className={`check-btn ${task.completed ? 'checked' : ''}`}
                                onClick={() => toggleComplete(task.id)}
                            >
                                {task.completed ? '✓' : ''}
                            </button>

                            <div className="task-content">
                                <div className="task-header">
                                    <span className="task-title">{task.title}</span>
                                    <span
                                        className="priority-badge"
                                        style={{ backgroundColor: PRIORITIES.find(p => p.value === task.priority)?.color + '33' }}
                                    >
                                        {task.priority}
                                    </span>
                                </div>
                                <div className="task-meta">
                                    <span className="task-subject">📚 {task.subject}</span>
                                    <span className={`task-due ${isOverdue(task.dueDate, task.completed) ? 'overdue' : ''}`}>
                                        📅 {getDaysUntil(task.dueDate)}
                                    </span>
                                </div>
                                {task.description && (
                                    <p className="task-description">{task.description}</p>
                                )}
                            </div>

                            <button
                                className="delete-task-btn"
                                onClick={() => deleteAssignment(task.id)}
                            >
                                🗑️
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Add Task Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">Add New Task</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Task Title</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Complete Lab Report"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="e.g., Physics"
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Due Date</label>
                                    <input
                                        type="date"
                                        className="input"
                                        value={formData.dueDate}
                                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Priority</label>
                                <div className="priority-selector">
                                    {PRIORITIES.map(p => (
                                        <button
                                            key={p.value}
                                            type="button"
                                            className={`priority-btn ${formData.priority === p.value ? 'active' : ''}`}
                                            style={{
                                                backgroundColor: formData.priority === p.value ? p.color + '33' : 'transparent',
                                                borderColor: p.color
                                            }}
                                            onClick={() => setFormData({ ...formData, priority: p.value })}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Description (Optional)</label>
                                <textarea
                                    className="input textarea"
                                    placeholder="Add notes or details..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Assignments
