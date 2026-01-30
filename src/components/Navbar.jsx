import './Navbar.css'

const Navbar = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'timetable', label: 'Timetable', icon: '📅' },
        { id: 'assignments', label: 'Tasks', icon: '✅' },
        { id: 'gpa', label: 'GPA', icon: '📊' },
        { id: 'expenses', label: 'Expenses', icon: '💰' },
        { id: 'notes', label: 'Notes', icon: '📝' },
        { id: 'timer', label: 'Timer', icon: '⏰' }
    ]

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="brand-icon">🎓</span>
                    <span className="brand-text">CampusBuddy</span>
                </div>

                <div className="navbar-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="navbar-mobile">
                    {tabs.slice(0, 5).map(tab => (
                        <button
                            key={tab.id}
                            className={`mobile-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
