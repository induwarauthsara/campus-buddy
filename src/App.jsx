import { useState } from 'react'
import { AppProvider } from './contexts/AppContext'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Timetable from './components/Timetable'
import Assignments from './components/Assignments'
import GPACalculator from './components/GPACalculator'
import ExpenseTracker from './components/ExpenseTracker'
import Notes from './components/Notes'
import StudyTimer from './components/StudyTimer'
import './App.css'

function App() {
    const [activeTab, setActiveTab] = useState('dashboard')

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard onNavigate={setActiveTab} />
            case 'timetable':
                return <Timetable />
            case 'assignments':
                return <Assignments />
            case 'gpa':
                return <GPACalculator />
            case 'expenses':
                return <ExpenseTracker />
            case 'notes':
                return <Notes />
            case 'timer':
                return <StudyTimer />
            default:
                return <Dashboard onNavigate={setActiveTab} />
        }
    }

    return (
        <AppProvider>
            <div className="app">
                <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="main-content">
                    {renderContent()}
                </main>
            </div>
        </AppProvider>
    )
}

export default App
