export const mockComplaints = [
  {
    id: 'CR-2841',
    title: 'Broken classroom projector',
    category: 'Infrastructure',
    location: 'Block A — Room 204',
    priority: 'High',
    department: 'IT Services',
    status: 'In Progress',
    date: '2026-09-20T08:30:00Z',
    description: 'The projector in room 204 is not turning on. It is showing a red blinking light. We have a presentation scheduled for the afternoon.',
    studentId: 'u1',
    timeline: [
      { status: 'Submitted', date: '2026-09-20T08:30:00Z', note: 'Complaint submitted by Alex Johnson' },
      { status: 'Reviewed', date: '2026-09-20T09:15:00Z', note: 'Reviewed by Campus Desk' },
      { status: 'Assigned', date: '2026-09-20T09:30:00Z', note: 'Assigned to IT Services' },
      { status: 'In Progress', date: '2026-09-20T10:00:00Z', note: 'Technician visit scheduled for today at 2:30 PM.' }
    ]
  },
  {
    id: 'CR-2842',
    title: 'Hostel water leakage',
    category: 'Hostel',
    location: 'Boys Hostel B - Floor 3',
    priority: 'Urgent',
    department: 'Maintenance',
    status: 'Submitted',
    date: '2026-09-20T10:15:00Z',
    description: 'There is a continuous water leak from the ceiling in the common washroom on the 3rd floor.',
    studentId: 'u1',
    timeline: [
      { status: 'Submitted', date: '2026-09-20T10:15:00Z', note: 'Complaint submitted by Alex Johnson' }
    ]
  },
  {
    id: 'CR-2843',
    title: 'Wi-Fi unavailable in library',
    category: 'Internet / Wi-Fi',
    location: 'Central Library - 2nd Floor',
    priority: 'Medium',
    department: 'IT Services',
    status: 'Resolved',
    date: '2026-09-18T14:20:00Z',
    description: 'The campus Wi-Fi network "CampusNet" is not appearing in the available networks list.',
    studentId: 'u1',
    timeline: [
      { status: 'Submitted', date: '2026-09-18T14:20:00Z', note: 'Complaint submitted by Alex Johnson' },
      { status: 'Reviewed', date: '2026-09-18T15:00:00Z', note: 'Reviewed by Campus Desk' },
      { status: 'Assigned', date: '2026-09-18T15:10:00Z', note: 'Assigned to IT Services' },
      { status: 'In Progress', date: '2026-09-19T09:00:00Z', note: 'Access point restarted' },
      { status: 'Resolved', date: '2026-09-19T10:30:00Z', note: 'Issue resolved. Network is stable.' }
    ]
  },
  {
    id: 'CR-2844',
    title: 'Broken corridor lights',
    category: 'Electrical',
    location: 'Block C - Ground Floor',
    priority: 'Low',
    department: 'Electrical',
    status: 'Assigned',
    date: '2026-09-19T18:45:00Z',
    description: 'Two tube lights are flickering and one is completely dead in the main corridor.',
    studentId: 'u3',
    timeline: [
      { status: 'Submitted', date: '2026-09-19T18:45:00Z', note: 'Complaint submitted' },
      { status: 'Reviewed', date: '2026-09-20T08:00:00Z', note: 'Reviewed by Campus Desk' },
      { status: 'Assigned', date: '2026-09-20T08:30:00Z', note: 'Assigned to Electrical Department' }
    ]
  }
];
