import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/global.css'

// Проверяем что root элемент существует
const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('❌ Root element (#root) not found! Check index.html')
  document.body.innerHTML = `
    <div style="padding: 40px; font-family: Arial; text-align: center;">
      <h1 style="color: red;">❌ Error: Root element not found</h1>
      <p>Make sure index.html contains &lt;div id="root"&gt;&lt;/div&gt;</p>
      <p>Current URL: ${window.location.href}</p>
    </div>
  `
} else {
  try {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('✅ React app mounted successfully')
  } catch (error) {
    console.error('❌ Error mounting React app:', error)
    rootElement.innerHTML = `
      <div style="padding: 40px; font-family: Arial; color: red;">
        <h1>❌ React Error</h1>
        <p><strong>${error.name}:</strong> ${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `
  }
}
