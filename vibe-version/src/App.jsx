import React, { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: inputValue.trim(), completed: false }
    ]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Task Manager</h1>
      <p style={{ color: '#666' }}>Start by adding your first task below.</p>

      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#4A5568', color: '#fff', cursor: 'pointer' }}>
          Add
        </button>
      </form>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              background: filter === f ? '#0F172A' : '#E2E8F0',
              color: filter === f ? '#FFF' : '#334155',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ border: '1px dashed #CBD5E1', padding: '20px', borderRadius: '8px', minHeight: '100px' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94A3B8' }}>No tasks found.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredTasks.map((task) => (
              <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94A3B8' : '#0F172A' }}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}