import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import './Timetable.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const COLORS = ['#6c63ff', '#00d9ff', '#00e676', '#ffab40', '#ff5252', '#e040fb', '#40c4ff']

const Timetable = () => {
    const { classes, setClasses } = useApp()
    const [showModal, setShowModal] = useState(false)
    const [editingClass, setEditingClass] = useState(null)
    const [formData, setFormData] = useState({
        subject: '',
        day: 'Monday',
        startTime: '08:00',
        endTime: '09:00',
        room: '',
        color: COLORS[0]
    })

    const handleSubmittt = (e) => {
        e.preventDefault()
        if (editingClass) {
            setClasses(prev => prev.map(c => c.id === editingClass.id ? { ...formData, id: c.id } : c))
        } else {
            setClasses(prev => [...prev, { ...formData, id: Date.now() }])
        }
        resetForm()
    }

    const resetForm = () => {
        setFormData({
            subject: '',
            day: 'Monday',
            startTime: '08:00',
            endTime: '09:00',
            room: '',
            color: COLORS[0]
        })
        setEditingClass(null)
        setShowModal(false)
    }

    const handleEdit = (classItem) => {
        setFormData(classItem)
        setEditingClass(classItem)
        setShowModal(true)
    }

    const handleDelete = (id) => {
        setClasses(prev => prev.filter(c => c.id !== id))
    }

    const getClassForSlot = (day, time) => {
        return classes.find(c => c.day === day && c.startTime === time)
    }

    return (
        <div className="timetable-page">
            <div className="page-header">
                <h1 className="page-title">📅 Weekly Timetable 16</h1>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Add Class
                </button>
            </div>

            <div className="timetable-container">
                <div className="timetable-grid">
                    {/* Header Row */}
                    <div className="grid-cell header-cell time-header">Time</div>
                    {DAYS.map(day => (
                        <div key={day} className="grid-cell header-cell">{day}</div>
                    ))}

                    {/* Time Slots */}
                    {TIME_SLOTS.map(time => (
                        <React.Fragment key={`row-${time}`}>
                            <div className="grid-cell time-cell">{time}</div>
                            {DAYS.map(day => {
                                const classItem = getClassForSlot(day, time)
                                return (
                                    <div
                                        key={`${day}-${time}`}
                                        className={`grid-cell slot-cell ${classItem ? 'has-class' : ''}`}
                                    >
                                        {classItem && (
                                            <div
                                                className="class-card"
                                                style={{ backgroundColor: classItem.color + '33', borderColor: classItem.color }}
                                                onClick={() => handleEdit(classItem)}
                                            >
                                                <span className="class-subject">{classItem.subject}</span>
                                                <span className="class-room">📍 {classItem.room}</span>
                                                <button
                                                    className="delete-btn"
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(classItem.id) }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => resetForm()}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">{editingClass ? 'Edit Class' : 'Add New Class'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Mathematics"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Day</label>
                                    <select
                                        className="select"
                                        value={formData.day}
                                        onChange={e => setFormData({ ...formData, day: e.target.value })}
                                    >
                                        {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Start Time</label>
                                    <select
                                        className="select"
                                        value={formData.startTime}
                                        onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                    >
                                        {TIME_SLOTS.map(time => <option key={time} value={time}>{time}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Room</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Room 101"
                                    value={formData.room}
                                    onChange={e => setFormData({ ...formData, room: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Color</label>
                                <div className="color-picker">
                                    {COLORS.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            className={`color-btn ${formData.color === color ? 'active' : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setFormData({ ...formData, color })}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingClass ? 'Update' : 'Add Class'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Timetable
