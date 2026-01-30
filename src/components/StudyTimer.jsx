import { useState, useEffect, useRef } from 'react'
import { useApp } from '../contexts/AppContext'
import './StudyTimer.css'

const TIMER_MODES = {
    work: { duration: 25 * 60, label: 'Focus Time', color: '#6c63ff' },
    shortBreak: { duration: 5 * 60, label: 'Short Break', color: '#00e676' },
    longBreak: { duration: 15 * 60, label: 'Long Break', color: '#00d9ff' }
}

const StudyTimer = () => {
    const { studyTime, setStudyTime } = useApp()
    const [mode, setMode] = useState('work')
    const [timeLeft, setTimeLeft] = useState(TIMER_MODES.work.duration)
    const [isRunning, setIsRunning] = useState(false)
    const [sessions, setSessions] = useState(0)
    const [todayMinutes, setTodayMinutes] = useState(studyTime)
    const intervalRef = useRef(null)
    const audioRef = useRef(null)

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1)
                if (mode === 'work') {
                    setTodayMinutes(prev => {
                        const newTime = prev + (1 / 60)
                        setStudyTime(Math.floor(newTime))
                        return newTime
                    })
                }
            }, 1000)
        } else if (timeLeft === 0) {
            handleTimerComplete()
        }

        return () => clearInterval(intervalRef.current)
    }, [isRunning, timeLeft, mode])

    const handleTimerComplete = () => {
        setIsRunning(false)
        playNotification()

        if (mode === 'work') {
            setSessions(prev => prev + 1)
            // After 4 work sessions, take a long break
            if ((sessions + 1) % 4 === 0) {
                switchMode('longBreak')
            } else {
                switchMode('shortBreak')
            }
        } else {
            switchMode('work')
        }
    }

    const playNotification = () => {
        // Play a simple beep using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.value = 800
            oscillator.type = 'sine'
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.5)
        } catch (e) {
            console.log('Audio not supported')
        }
    }

    const switchMode = (newMode) => {
        setMode(newMode)
        setTimeLeft(TIMER_MODES[newMode].duration)
    }

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }

    const resetTimer = () => {
        setIsRunning(false)
        setTimeLeft(TIMER_MODES[mode].duration)
    }

    const skipTimer = () => {
        setIsRunning(false)
        if (mode === 'work') {
            switchMode('shortBreak')
        } else {
            switchMode('work')
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const formatStudyTime = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const mins = Math.floor(minutes % 60)
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
    }

    const progress = ((TIMER_MODES[mode].duration - timeLeft) / TIMER_MODES[mode].duration) * 100

    return (
        <div className="timer-page">
            <div className="page-header">
                <h1 className="page-title">⏰ Study Timer</h1>
            </div>

            {/* Mode Selector */}
            <div className="mode-selector">
                {Object.entries(TIMER_MODES).map(([key, value]) => (
                    <button
                        key={key}
                        className={`mode-btn ${mode === key ? 'active' : ''}`}
                        style={{
                            '--mode-color': value.color,
                            backgroundColor: mode === key ? value.color + '33' : 'transparent'
                        }}
                        onClick={() => { if (!isRunning) switchMode(key) }}
                    >
                        {value.label}
                    </button>
                ))}
            </div>

            {/* Timer Display */}
            <div className="timer-container">
                <div className="timer-circle" style={{ '--progress': progress, '--color': TIMER_MODES[mode].color }}>
                    <svg className="progress-ring" viewBox="0 0 200 200">
                        <circle className="progress-ring-bg" cx="100" cy="100" r="90" />
                        <circle
                            className="progress-ring-fill"
                            cx="100"
                            cy="100"
                            r="90"
                            style={{
                                strokeDasharray: `${2 * Math.PI * 90}`,
                                strokeDashoffset: `${2 * Math.PI * 90 * (1 - progress / 100)}`
                            }}
                        />
                    </svg>
                    <div className="timer-content">
                        <span className="timer-mode-label">{TIMER_MODES[mode].label}</span>
                        <span className="timer-display">{formatTime(timeLeft)}</span>
                        <span className="session-count">{sessions} sessions today</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="timer-controls">
                <button className="control-btn secondary" onClick={resetTimer}>
                    🔄 Reset
                </button>
                <button
                    className={`control-btn primary ${isRunning ? 'running' : ''}`}
                    onClick={toggleTimer}
                >
                    {isRunning ? '⏸️ Pause' : '▶️ Start'}
                </button>
                <button className="control-btn secondary" onClick={skipTimer}>
                    ⏭️ Skip
                </button>
            </div>

            {/* Stats */}
            <div className="timer-stats">
                <div className="stat-card">
                    <span className="stat-icon">🎯</span>
                    <div className="stat-info">
                        <span className="stat-value">{sessions}</span>
                        <span className="stat-label">Sessions Today</span>
                    </div>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">⏱️</span>
                    <div className="stat-info">
                        <span className="stat-value">{formatStudyTime(todayMinutes)}</span>
                        <span className="stat-label">Total Study Time</span>
                    </div>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">🔥</span>
                    <div className="stat-info">
                        <span className="stat-value">{Math.floor(sessions * 25)}</span>
                        <span className="stat-label">Focus Minutes</span>
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="timer-tips">
                <h3>💡 Pomodoro Technique Tips</h3>
                <ul>
                    <li>Work for 25 minutes with full focus</li>
                    <li>Take a 5-minute break after each session</li>
                    <li>After 4 sessions, take a longer 15-minute break</li>
                    <li>Stay hydrated and stretch during breaks</li>
                </ul>
            </div>
        </div>
    )
}

export default StudyTimer
