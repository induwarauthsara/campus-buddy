import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import './ExpenseTracker.css'

const CATEGORIES = [
    { id: 'food', label: 'Food & Drinks', icon: '🍔', color: '#ff5252' },
    { id: 'transport', label: 'Transport', icon: '🚌', color: '#ffab40' },
    { id: 'books', label: 'Books & Supplies', icon: '📚', color: '#00e676' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎮', color: '#e040fb' },
    { id: 'utilities', label: 'Utilities', icon: '⚡', color: '#00d9ff' },
    { id: 'other', label: 'Other', icon: '📦', color: '#6c63ff' }
]

const ExpenseTracker = () => {
    const { expenses, setExpenses, budget, setBudget, getTotalExpenses } = useApp()
    const [showModal, setShowModal] = useState(false)
    const [showBudgetModal, setShowBudgetModal] = useState(false)
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0]
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setExpenses(prev => [...prev, {
            ...formData,
            id: Date.now(),
            amount: parseFloat(formData.amount)
        }])
        setFormData({
            description: '',
            amount: '',
            category: 'food',
            date: new Date().toISOString().split('T')[0]
        })
        setShowModal(false)
    }

    const deleteExpense = (id) => {
        setExpenses(prev => prev.filter(e => e.id !== id))
    }

    const totalExpenses = getTotalExpenses()
    const remaining = budget - totalExpenses
    const percentSpent = Math.min((totalExpenses / budget) * 100, 100)

    // Group expenses by category
    const expensesByCategory = CATEGORIES.map(cat => ({
        ...cat,
        total: expenses
            .filter(e => e.category === cat.id)
            .reduce((sum, e) => sum + e.amount, 0)
    })).filter(cat => cat.total > 0)

    // Recent expenses
    const recentExpenses = [...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)

    return (
        <div className="expense-page">
            <div className="page-header">
                <h1 className="page-title">💰 Expense Tracker</h1>
                <div className="header-actions">
                    <button className="btn btn-secondary" onClick={() => setShowBudgetModal(true)}>
                        ⚙️ Set Budget
                    </button>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        ➕ Add Expense
                    </button>
                </div>
            </div>

            {/* Budget Overview */}
            <div className="budget-overview">
                <div className="budget-card main-budget">
                    <div className="budget-progress-container">
                        <div
                            className="budget-progress"
                            style={{
                                width: `${percentSpent}%`,
                                background: remaining < 0 ? 'var(--accent-danger)' : 'var(--gradient-primary)'
                            }}
                        />
                    </div>
                    <div className="budget-stats">
                        <div className="stat">
                            <span className="stat-label">Budget</span>
                            <span className="stat-value">${budget.toFixed(0)}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Spent</span>
                            <span className="stat-value text-warning">${totalExpenses.toFixed(2)}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Remaining</span>
                            <span className={`stat-value ${remaining < 0 ? 'text-danger' : 'text-success'}`}>
                                ${remaining.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            {expensesByCategory.length > 0 && (
                <div className="category-breakdown">
                    <h2 className="section-title">Spending by Category</h2>
                    <div className="category-grid">
                        {expensesByCategory.map(cat => (
                            <div key={cat.id} className="category-card" style={{ borderColor: cat.color }}>
                                <span className="category-icon">{cat.icon}</span>
                                <div className="category-info">
                                    <span className="category-label">{cat.label}</span>
                                    <span className="category-amount" style={{ color: cat.color }}>
                                        ${cat.total.toFixed(2)}
                                    </span>
                                </div>
                                <div
                                    className="category-bar"
                                    style={{
                                        width: `${(cat.total / totalExpenses) * 100}%`,
                                        backgroundColor: cat.color
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Expenses */}
            <div className="recent-expenses">
                <h2 className="section-title">Recent Expenses</h2>
                {recentExpenses.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">💸</span>
                        <p>No expenses recorded yet. Start tracking your spending!</p>
                    </div>
                ) : (
                    <div className="expense-list">
                        {recentExpenses.map(expense => {
                            const category = CATEGORIES.find(c => c.id === expense.category)
                            return (
                                <div key={expense.id} className="expense-item">
                                    <span className="expense-icon" style={{ backgroundColor: category?.color + '33' }}>
                                        {category?.icon}
                                    </span>
                                    <div className="expense-info">
                                        <span className="expense-desc">{expense.description}</span>
                                        <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                                    </div>
                                    <span className="expense-amount">-${expense.amount.toFixed(2)}</span>
                                    <button
                                        className="delete-expense-btn"
                                        onClick={() => deleteExpense(expense.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Add Expense Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">Add Expense</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Lunch at cafeteria"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Amount ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="input"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="input"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Category</label>
                                <div className="category-selector">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            className={`category-btn ${formData.category === cat.id ? 'active' : ''}`}
                                            style={{
                                                borderColor: cat.color,
                                                backgroundColor: formData.category === cat.id ? cat.color + '33' : 'transparent'
                                            }}
                                            onClick={() => setFormData({ ...formData, category: cat.id })}
                                        >
                                            <span>{cat.icon}</span>
                                            <span>{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Expense
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Set Budget Modal */}
            {showBudgetModal && (
                <div className="modal-overlay" onClick={() => setShowBudgetModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">Set Monthly Budget</h2>
                        <form onSubmit={(e) => { e.preventDefault(); setShowBudgetModal(false) }}>
                            <div className="input-group">
                                <label>Monthly Budget ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="input"
                                    value={budget}
                                    onChange={e => setBudget(parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="btn btn-primary">
                                    Save Budget
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExpenseTracker
