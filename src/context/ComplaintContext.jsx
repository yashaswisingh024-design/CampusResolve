import React, { createContext, useContext, useState } from 'react';
import { mockComplaints as initialComplaints } from '../data/mockComplaints';

const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(initialComplaints);

  const addComplaint = (complaint) => {
    setComplaints([
      {
        ...complaint,
        id: `CR-${2848 + complaints.length}`, // Generating fake ID
        date: new Date().toISOString(),
        timeline: [
          { status: 'Submitted', date: new Date().toISOString(), note: 'Complaint submitted successfully' }
        ]
      },
      ...complaints
    ]);
  };

  const updateComplaintStatus = (id, newStatus, department, note) => {
    setComplaints(complaints.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          department: department || c.department,
          timeline: [
            ...c.timeline,
            { status: newStatus, date: new Date().toISOString(), note: note || `Status updated to ${newStatus}` }
          ]
        };
      }
      return c;
    }));
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint, updateComplaintStatus }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintContext);
