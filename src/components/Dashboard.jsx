import { useApp } from '../contexts/AppContext'
import './Dashboard.css'

const Dashboard = ({ onNavigate }) => {
    const {
        classes,
        assignments,
        calculateGPA,
        getTotalExpenses,
        budget,
        notes,
        studyTime,
        subjects
    } = useApp()

    // Get today's day name
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const todayClasses = classes.filter(c => c.day === today)

    // Get upcoming assignments (not completed, sorted by due date)
    const upcomingAssignments = assignments
        .filter(a => !a.completed)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 3)

    // Check if assignment is overdue
    const isOverdue = (dueDate) => new Date(dueDate) < new Date()

    // Format study time
    const formatStudyTime = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
    }

    const cards = [
        {
            id: 'timetable',
            icon: '📅',
            title: 'Today\'s Classes',
            value: todayClasses.length,
            subtitle: todayClasses.length > 0 ? `Next: ${todayClasses[0]?.subject}` : 'No classes today',
            color: 'primary'
        },
        {
            id: 'assignments',
            icon: '✅',
            title: 'Pending Tasks',
            value: assignments.filter(a => !a.completed).length,
            subtitle: upcomingAssignments[0] ? `Due: ${upcomingAssignments[0].title}` : 'All caught up!',
            color: 'warning'
        },
        {
            id: 'gpa',
            icon: '📊',
            title: 'Current GPA',
            value: calculateGPA(),
            subtitle: `${subjects.length} subjects`,
            color: 'success'
        },
        {
            id: 'expenses',
            icon: '💰',
            title: 'Budget Left',
            value: `$${(budget - getTotalExpenses()).toFixed(0)}`,
            subtitle: `of $${budget} monthly`,
            color: getTotalExpenses() > budget ? 'danger' : 'success'
        },
        {
            id: 'notes',
            icon: '📝',
            title: 'Notes',
            value: notes.length,
            subtitle: 'Quick notes saved',
            color: 'secondary'
        },
        {
            id: 'timer',
            icon: '⏰',
            title: 'Study Time',
            value: formatStudyTime(studyTime),
            subtitle: 'Total time today',
            color: 'primary'
        }
    ]

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    Welcome back! <span className="wave">👋</span>
                </h1>
                <p className="dashboard-subtitle">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            <div className="dashboard-grid">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`dashboard-card card-${card.color}`}
                        onClick={() => onNavigate(card.id)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="card-icon">{card.icon}</div>
                        <div className="card-content">
                            <span className="card-title">{card.title}</span>
                            <span className="card-value">{card.value}</span>
                            <span className="card-subtitle">{card.subtitle}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h2 className="section-title">Quick Actions</h2>
                <div className="action-buttons">
                    <button className="btn btn-primary" onClick={() => onNavigate('assignments')}>
                        ➕ Add Task
                    </button>
                    <button className="btn btn-secondary" onClick={() => onNavigate('notes')}>
                        📝 New Note
                    </button>
                    <button className="btn btn-success" onClick={() => onNavigate('timer')}>
                        ⏱️ Start Timer
                    </button>
                </div>
            </div>

            {/* Upcoming Tasks Preview */}
            {upcomingAssignments.length > 0 && (
                <div className="upcoming-section">
                    <h2 className="section-title">Upcoming Deadlines</h2>
                    <div className="upcoming-list">
                        {upcomingAssignments.map(task => (
                            <div
                                key={task.id}
                                className={`upcoming-item ${isOverdue(task.dueDate) ? 'overdue' : ''}`}
                            >
                                <div className="task-info">
                                    <span className="task-title">{task.title}</span>
                                    <span className="task-subject">{task.subject}</span>
                                </div>
                                <div className="task-due">
                                    {isOverdue(task.dueDate) ? '⚠️ Overdue' : new Date(task.dueDate).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
