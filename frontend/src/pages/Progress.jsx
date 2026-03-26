import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';
import './Progress.css';

/* ── Palette ── */
const COLORS = {
  primary: '#FF1744', // Pink/Red highlight
  progress: '#00E676', // Neon Green
  secondary: '#E91E63',
  text: '#E6EDF3',
  muted: '#9CA3AF',
  card: '#0a0a0c',
  border: 'rgba(255, 255, 255, 0.08)'
};

/* ── Mock Data ── */
const mainChartData = [
  { date: 'Dec 19', score: 350 }, { date: 'Dec 21', score: 380 }, { date: 'Dec 23', score: 320 }, 
  { date: 'Dec 25', score: 410 }, { date: 'Dec 27', score: 290 }, { date: 'Dec 30', score: 360 }, 
  { date: 'Jan 1', score: 450 }, { date: 'Jan 3', score: 310 }, { date: 'Jan 5', score: 480 }, 
  { date: 'Jan 2', score: 340 }, { date: 'Jan 9', score: 430 }, { date: 'Jan 11', score: 370 }, 
  { date: 'Jan 13', score: 460 }, { date: 'Jan 15', score: 320 }, { date: 'Jan 17', score: 470 },
];

const codingQuestionsData = [
  { day: 'Jan 1', solved: 3 }, { day: 'Jan 2', solved: 5 }, { day: 'Jan 3', solved: 2 }, 
  { day: 'Jan 4', solved: 1 }, { day: 'Jan 5', solved: 4 }, { day: 'Jan 6', solved: 0 }, 
  { day: 'Jan 2', solved: 2 },
];

const mcqData = [
  { day: 'Jan 1', solved: 4 }, { day: 'Jan 2', solved: 3 }, { day: 'Jan 3', solved: 2 }, 
  { day: 'Jan 4', solved: 5 }, { day: 'Jan 5', solved: 2 }, { day: 'Jan 6', solved: 1 }, 
  { day: 'Jan 2', solved: 3 },
];

const quizData = [
  { name: 'Quiz 1', score: 80 }, { name: 'Quiz 2', score: 75 }, { name: 'Quiz 3', score: 85 }, 
  { name: 'Quiz 4', score: 70 }, { name: 'Quiz 5', score: 90 }, { name: 'Quiz 6', score: 65 }, 
  { name: 'Quiz 7', score: 95 },
];

/* ── Components ── */
const AvatarRing = ({ pct }) => {
  const size = 200; // Increased size
  const stroke = 10; // Slightly thicker stroke
  const radius = (size / 2) - 5; // Positioning ring further out
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="avatar-ring-container">
      {/* Removed Background Circle */}
      
      {/* The Progress Ring (Behind the head) */}
      <svg height={size} width={size} className="avatar-ring-svg">
        <circle
          stroke="rgba(255,255,255,0.05)"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={COLORS.progress}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {/* The Avatar Image (Pop out effect) */}
      <div className="avatar-img-circle">
        <img src="/avatar.png" alt="User Avatar" />
      </div>
    </div>
  );
};

export default function Progress() {
  return (
    <div className="progress-dashboard">
      <div className="dashboard-top-row">
        {/* Main Chart Section */}
        <div className="main-chart-card">
          <div className="chart-header-row">
            <div className="title-group">
              <h2>Track Your Progress</h2>
              <p>Showing Daily Rank/Score for the last 30 days</p>
            </div>
            <div className="stat-boxes">
              <div className="mini-stat-box">
                <span className="label">Overall Rank</span>
                <span className="value">1</span>
              </div>
              <div className="mini-stat-box">
                <span className="label">Overall Score</span>
                <span className="value">500</span>
              </div>
            </div>
          </div>
          <div className="main-line-chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mainChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#000', border: '1px solid #333' }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke={COLORS.primary}
                  strokeWidth={3}
                  dot={{ fill: COLORS.primary, r: 4, strokeWidth: 2, stroke: COLORS.primary }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Profile Widget */}
        <div className="profile-widget">
          <AvatarRing pct={70} />
          <div className="sidebar-stats">
            <div className="sidebar-stat-box">
              <span className="label">Lectures Progress</span>
              <div className="val-row">
                <span className="current">35</span>
                <span className="total">/ 50</span>
                <span className="status">Completed</span>
              </div>
            </div>
            <div className="sidebar-stat-box">
              <span className="label">Coding Problems</span>
              <div className="val-row">
                <span className="current">150</span>
                <span className="total">/ 200</span>
                <span className="status">Solved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-bottom-row">
        {/* Daily Coding Bar Chart */}
        <div className="bottom-card">
          <h3>Daily Coding Questions Solved</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={codingQuestionsData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: COLORS.muted, fontSize: 10 }} />
              <YAxis hide />
              <Bar dataKey="solved" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily MCQ Line Chart */}
        <div className="bottom-card">
          <h3>Daily In-Video MCQs Solved</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mcqData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: COLORS.muted, fontSize: 10 }} />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="solved"
                stroke={COLORS.primary}
                strokeWidth={2}
                dot={{ fill: COLORS.primary, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Quiz Horizontal Bar Chart */}
        <div className="bottom-card">
          <h3>Recent Quiz Solved</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={quizData} layout="vertical" margin={{ left: 5, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: COLORS.muted, fontSize: 10 }} />
              <Bar dataKey="score" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={15}>
                {quizData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS.primary} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
