import { useState, useEffect } from 'react'

const initialVisits = [
  {
    id: 1,
    visitorName: 'John Smith',
    visitorEmail: 'john.smith@email.com',
    visitorPhone: '+1-555-0101',
    hostName: 'Sarah Johnson',
    purpose: 'Business Meeting',
    visitDate: '2024-01-15',
    visitTime: '10:00',
    status: 'approved',
    notes: 'Discussing Q1 project roadmap'
  },
  {
    id: 2,
    visitorName: 'Emily Davis',
    visitorEmail: 'emily.davis@email.com',
    visitorPhone: '+1-555-0102',
    hostName: 'Michael Brown',
    purpose: 'Interview',
    visitDate: '2024-01-16',
    visitTime: '14:30',
    status: 'pending',
    notes: 'Software Engineer position'
  },
  {
    id: 3,
    visitorName: 'Robert Wilson',
    visitorEmail: 'robert.wilson@email.com',
    visitorPhone: '+1-555-0103',
    hostName: 'Lisa Anderson',
    purpose: 'Delivery',
    visitDate: '2024-01-17',
    visitTime: '09:00',
    status: 'completed',
    notes: 'Office supplies delivery'
  },
  {
    id: 4,
    visitorName: 'Jennifer Martinez',
    visitorEmail: 'jennifer.m@email.com',
    visitorPhone: '+1-555-0104',
    hostName: 'David Lee',
    purpose: 'Client Meeting',
    visitDate: '2024-01-18',
    visitTime: '11:00',
    status: 'pending',
    notes: 'New client onboarding'
  },
  {
    id: 5,
    visitorName: 'William Taylor',
    visitorEmail: 'will.taylor@email.com',
    visitorPhone: '+1-555-0105',
    hostName: 'Sarah Johnson',
    purpose: 'Maintenance',
    visitDate: '2024-01-14',
    visitTime: '15:00',
    status: 'rejected',
    notes: 'HVAC inspection - rescheduled'
  }
]

function App() {
  const [visits, setVisits] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showForm, setShowForm] = useState(false)
  const [editingVisit, setEditingVisit] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [alert, setAlert] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [formData, setFormData] = useState({
    visitorName: '',
    visitorEmail: '',
    visitorPhone: '',
    hostName: '',
    purpose: '',
    visitDate: '',
    visitTime: '',
    notes: ''
  })

  useEffect(() => {
    const savedVisits = localStorage.getItem('visits')
    if (savedVisits) {
      setVisits(JSON.parse(savedVisits))
    } else {
      setVisits(initialVisits)
      localStorage.setItem('visits', JSON.stringify(initialVisits))
    }
  }, [])

  useEffect(() => {
    if (visits.length > 0) {
      localStorage.setItem('visits', JSON.stringify(visits))
    }
  }, [visits])

  const showAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingVisit) {
      setVisits(visits.map(visit => 
        visit.id === editingVisit.id 
          ? { ...formData, id: editingVisit.id, status: editingVisit.status }
          : visit
      ))
      showAlert('Visit updated successfully!', 'success')
    } else {
      const newVisit = {
        ...formData,
        id: Date.now(),
        status: 'pending'
      }
      setVisits([newVisit, ...visits])
      showAlert('Visit request submitted successfully!', 'success')
    }
    
    resetForm()
    setShowForm(false)
  }

  const resetForm = () => {
    setFormData({
      visitorName: '',
      visitorEmail: '',
      visitorPhone: '',
      hostName: '',
      purpose: '',
      visitDate: '',
      visitTime: '',
      notes: ''
    })
    setEditingVisit(null)
  }

  const handleEdit = (visit) => {
    setFormData({
      visitorName: visit.visitorName,
      visitorEmail: visit.visitorEmail,
      visitorPhone: visit.visitorPhone,
      hostName: visit.hostName,
      purpose: visit.purpose,
      visitDate: visit.visitDate,
      visitTime: visit.visitTime,
      notes: visit.notes
    })
    setEditingVisit(visit)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this visit record?')) {
      setVisits(visits.filter(visit => visit.id !== id))
      showAlert('Visit deleted successfully!', 'success')
    }
  }

  const handleStatusChange = (id, newStatus) => {
    setVisits(visits.map(visit =>
      visit.id === id ? { ...visit, status: newStatus } : visit
    ))
    showAlert(`Visit ${newStatus}!`, 'success')
    setShowModal(false)
  }

  const handleViewDetails = (visit) => {
    setSelectedVisit(visit)
    setShowModal(true)
  }

  const filteredVisits = visits.filter(visit => {
    const matchesStatus = filterStatus === 'all' || visit.status === filterStatus
    const matchesSearch = 
      visit.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: visits.length,
    pending: visits.filter(v => v.status === 'pending').length,
    approved: visits.filter(v => v.status === 'approved').length,
    completed: visits.filter(v => v.status === 'completed').length
  }

  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status}`
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>🏢 Visit Management System</h1>
          <p>Streamline your visitor management process</p>
        </div>
      </header>

      <main className="container">
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Visits</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab ${activeTab === 'new-visit' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('new-visit')
              resetForm()
              setShowForm(true)
            }}
          >
            New Visit Request
          </button>
          <button 
            className={`tab ${activeTab === 'visits' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('visits')
              setShowForm(false)
            }}
          >
            All Visits
          </button>
        </div>

        {/* New Visit Form */}
        {showForm && activeTab === 'new-visit' && (
          <div className="card">
            <h2>{editingVisit ? 'Edit Visit' : 'New Visit Request'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Visitor Name *</label>
                <input
                  type="text"
                  value={formData.visitorName}
                  onChange={(e) => setFormData({...formData, visitorName: e.target.value})}
                  required
                  placeholder="Enter visitor's full name"
                />
              </div>
              
              <div className="form-group">
                <label>Visitor Email *</label>
                <input
                  type="email"
                  value={formData.visitorEmail}
                  onChange={(e) => setFormData({...formData, visitorEmail: e.target.value})}
                  required
                  placeholder="visitor@email.com"
                />
              </div>
              
              <div className="form-group">
                <label>Visitor Phone *</label>
                <input
                  type="tel"
                  value={formData.visitorPhone}
                  onChange={(e) => setFormData({...formData, visitorPhone: e.target.value})}
                  required
                  placeholder="+1-555-0100"
                />
              </div>
              
              <div className="form-group">
                <label>Host Name *</label>
                <input
                  type="text"
                  value={formData.hostName}
                  onChange={(e) => setFormData({...formData, hostName: e.target.value})}
                  required
                  placeholder="Employee being visited"
                />
              </div>
              
              <div className="form-group">
                <label>Purpose of Visit *</label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="Business Meeting">Business Meeting</option>
                  <option value="Interview">Interview</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Client Meeting">Client Meeting</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Visit Date *</label>
                <input
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Visit Time *</label>
                <input
                  type="time"
                  value={formData.visitTime}
                  onChange={(e) => setFormData({...formData, visitTime: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows="3"
                  placeholder="Additional information..."
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                {editingVisit ? 'Update Visit' : 'Submit Request'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Visits List */}
        {(activeTab === 'dashboard' || activeTab === 'visits') && (
          <div className="card">
            <h2>Visit Records</h2>
            
            {/* Filters */}
            <div className="filter-section">
              <div className="form-group">
                <label>Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, host, or purpose..."
                />
              </div>
              <div className="form-group">
                <label>Status Filter</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Visitor</th>
                    <th>Host</th>
                    <th>Purpose</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '40px'}}>
                        No visits found
                      </td>
                    </tr>
                  ) : (
                    filteredVisits.map(visit => (
                      <tr key={visit.id}>
                        <td>
                          <div><strong>{visit.visitorName}</strong></div>
                          <div style={{fontSize: '0.85rem', color: '#666'}}>{visit.visitorEmail}</div>
                        </td>
                        <td>{visit.hostName}</td>
                        <td>{visit.purpose}</td>
                        <td>
                          <div>{visit.visitDate}</div>
                          <div style={{fontSize: '0.85rem', color: '#666'}}>{visit.visitTime}</div>
                        </td>
                        <td>
                          <span className={getStatusBadgeClass(visit.status)}>
                            {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-primary" 
                            style={{padding: '8px 16px', marginRight: '5px'}}
                            onClick={() => handleViewDetails(visit)}
                          >
                            View
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{padding: '8px 16px', marginRight: '5px'}}
                            onClick={() => handleEdit(visit)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleDelete(visit.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal for viewing/approving visits */}
        {showModal && selectedVisit && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Visit Details</h3>
              <div style={{marginBottom: '20px'}}>
                <p><strong>Visitor:</strong> {selectedVisit.visitorName}</p>
                <p><strong>Email:</strong> {selectedVisit.visitorEmail}</p>
                <p><strong>Phone:</strong> {selectedVisit.visitorPhone}</p>
                <p><strong>Host:</strong> {selectedVisit.hostName}</p>
                <p><strong>Purpose:</strong> {selectedVisit.purpose}</p>
                <p><strong>Date:</strong> {selectedVisit.visitDate}</p>
                <p><strong>Time:</strong> {selectedVisit.visitTime}</p>
                <p><strong>Status:</strong> 
                  <span className={getStatusBadgeClass(selectedVisit.status)} style={{marginLeft: '10px'}}>
                    {selectedVisit.status.charAt(0).toUpperCase() + selectedVisit.status.slice(1)}
                  </span>
                </p>
                {selectedVisit.notes && (
                  <p><strong>Notes:</strong> {selectedVisit.notes}</p>
                )}
              </div>
              
              {selectedVisit.status === 'pending' && (
                <div className="modal-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleStatusChange(selectedVisit.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleStatusChange(selectedVisit.id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
              
              {selectedVisit.status === 'approved' && (
                <div className="modal-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleStatusChange(selectedVisit.id, 'completed')}
                  >
                    Mark as Completed
                  </button>
                </div>
              )}
              
              <div className="modal-actions" style={{marginTop: '15px'}}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
