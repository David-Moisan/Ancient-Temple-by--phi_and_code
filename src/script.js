import './style.css'
import Experience from './Experience/Experience'
import { inject } from '@vercel/analytics'

inject()

// Experience modul
const experience = new Experience(document.querySelector('canvas.webgl'))