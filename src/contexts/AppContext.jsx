import { useState, useEffect, createContext, useContext } from 'react'

// Create App Context
const AppContext = createContext()

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within AppProvider')
    }
    return context
}

// Local Storage Hook
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue]
}

// App Provider
export const AppProvider = ({ children }) => {
    const [classes, setClasses] = useLocalStorage('campus_classes', [])
    const [assignments, setAssignments] = useLocalStorage('campus_assignments', [])
    const [subjects, setSubjects] = useLocalStorage('campus_subjects', [])
    const [expenses, setExpenses] = useLocalStorage('campus_expenses', [])
    const [notes, setNotes] = useLocalStorage('campus_notes', [])
    const [studyTime, setStudyTime] = useLocalStorage('campus_study_time', 0)
    const [budget, setBudget] = useLocalStorage('campus_budget', 500)

    // Calculate GPA
    const calculateGPA = () => {
        if (subjects.length === 0) return 0
        const totalPoints = subjects.reduce((acc, sub) => acc + (sub.gradePoint * sub.credits), 0)
        const totalCredits = subjects.reduce((acc, sub) => acc + sub.credits, 0)
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0
    }

    // Calculate total expenses
    const getTotalExpenses = () => {
        return expenses.reduce((acc, exp) => acc + exp.amount, 0)
    }

    const value = {
        classes, setClasses,
        assignments, setAssignments,
        subjects, setSubjects,
        expenses, setExpenses,
        notes, setNotes,
        studyTime, setStudyTime,
        budget, setBudget,
        calculateGPA,
        getTotalExpenses
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
