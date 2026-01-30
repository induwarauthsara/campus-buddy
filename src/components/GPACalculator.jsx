import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import './GPACalculator.css'

const GRADE_POINTS = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
}

const GPACalculator = () => {
    const { subjects, setSubjects, calculateGPA } = useApp()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        credits: 3,
        grade: 'A',
        semester: 1
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const gradePoint = GRADE_POINTS[formData.grade]
        setSubjects(prev => [...prev, {
            ...formData,
            id: Date.now(),
            gradePoint
        }])
        setFormData({ name: '', credits: 3, grade: 'A', semester: 1 })
        setShowModal(false)
    }

    const deleteSubject = (id) => {
        setSubjects(prev => prev.filter(s => s.id !== id))
    }

    // Group subjects by semester
    const semesters = subjects.reduce((acc, subject) => {
        const sem = subject.semester || 1
        if (!acc[sem]) acc[sem] = []
        acc[sem].push(subject)
        return acc
    }, {})

    const calculateSemesterGPA = (semesterSubjects) => {
        if (semesterSubjects.length === 0) return 0
        const totalPoints = semesterSubjects.reduce((acc, sub) => acc + (sub.gradePoint * sub.credits), 0)
        const totalCredits = semesterSubjects.reduce((acc, sub) => acc + sub.credits, 0)
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0
    }

    const totalCredits = subjects.reduce((acc, sub) => acc + sub.credits, 0)
    const gpa = calculateGPA()

    // GPA Analysis
    const getGPAStatus = (gpa) => {
        if (gpa >= 3.7) return { label: "Dean's List", color: '#00e676', icon: '🏆' }
        if (gpa >= 3.0) return { label: 'Good Standing', color: '#00d9ff', icon: '✨' }
        if (gpa >= 2.0) return { label: 'Satisfactory', color: '#ffab40', icon: '📖' }
        return { label: 'Needs Improvement', color: '#ff5252', icon: '⚠️' }
    }

    const status = getGPAStatus(gpa)

    return (
        <div className="gpa-page">
            <div className="page-header">
                <h1 className="page-title">📊 GPA Calculator</h1>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Add Subject
                </button>
            </div>

            {/* GPA Overview */}
            <div className="gpa-overview">
                <div className="gpa-main-card">
                    <div className="gpa-circle" style={{ borderColor: status.color }}>
                        <span className="gpa-value">{gpa}</span>
                        <span className="gpa-label">CGPA</span>
                    </div>
                    <div className="gpa-info">
                        <div className="status-badge" style={{ backgroundColor: status.color + '33', color: status.color }}>
                            {status.icon} {status.label}
                        </div>
                        <p className="credits-info">{totalCredits} Total Credits</p>
                        <p className="subjects-info">{subjects.length} Subjects</p>
                    </div>
                </div>

                <div className="gpa-scale">
                    <h3>Grade Scale</h3>
                    <div className="scale-grid">
                        {Object.entries(GRADE_POINTS).map(([grade, point]) => (
                            <div key={grade} className="scale-item">
                                <span className="scale-grade">{grade}</span>
                                <span className="scale-point">{point.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subjects by Semester */}
            {Object.keys(semesters).length > 0 ? (
                Object.entries(semesters).sort(([a], [b]) => a - b).map(([semester, semSubjects]) => (
                    <div key={semester} className="semester-section">
                        <div className="semester-header">
                            <h2>Semester {semester}</h2>
                            <span className="semester-gpa">
                                GPA: <strong>{calculateSemesterGPA(semSubjects)}</strong>
                            </span>
                        </div>
                        <div className="subjects-grid">
                            {semSubjects.map(subject => (
                                <div key={subject.id} className="subject-card">
                                    <div className="subject-info">
                                        <span className="subject-name">{subject.name}</span>
                                        <span className="subject-credits">{subject.credits} Credits</span>
                                    </div>
                                    <div className="subject-grade">
                                        <span className="grade-badge">{subject.grade}</span>
                                    </div>
                                    <button
                                        className="delete-subject-btn"
                                        onClick={() => deleteSubject(subject.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="empty-state">
                    <span className="empty-icon">📚</span>
                    <p>No subjects added yet. Add your first subject to calculate GPA!</p>
                </div>
            )}

            {/* Add Subject Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">Add Subject</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Subject Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Data Structures"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Credits</label>
                                    <select
                                        className="select"
                                        value={formData.credits}
                                        onChange={e => setFormData({ ...formData, credits: Number(e.target.value) })}
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(c => (
                                            <option key={c} value={c}>{c} Credits</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Grade</label>
                                    <select
                                        className="select"
                                        value={formData.grade}
                                        onChange={e => setFormData({ ...formData, grade: e.target.value })}
                                    >
                                        {Object.keys(GRADE_POINTS).map(g => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Semester</label>
                                <select
                                    className="select"
                                    value={formData.semester}
                                    onChange={e => setFormData({ ...formData, semester: Number(e.target.value) })}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                        <option key={s} value={s}>Semester {s}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Subject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GPACalculator
