import WebpackLogo from './webpack-logo.jpg'
import './index.scss'

// Create SVG logo node
const logo = document.createElement('img')
logo.src = WebpackLogo

// Create heading node
const greeting = document.createElement('h1')
greeting.textContent = "Hello World"

// Append SVG and heading nodes to the DOM
const app = document.querySelector('#root')
app.append(logo, greeting)