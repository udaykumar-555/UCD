import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'
import { join, extname, normalize } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const port = Number(process.env.PORT) || 8788
const root = join(process.cwd(), 'dist')
const dataDirectory = join(process.cwd(), 'data')
if (!existsSync(dataDirectory)) mkdirSync(dataDirectory, { recursive: true })
const db = new DatabaseSync(join(dataDirectory, 'ucd.db'))
db.exec(`CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL,
  email TEXT NOT NULL, project_type TEXT, project_interest TEXT, message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`)

const projects = [
  { id: 1, category: 'Residential', title: 'Aurum Villa Court', location: 'Bengaluru', year: '2025', status: 'In progress', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', description: 'A private villa community with courtyard living, warm natural materials, and a considered relationship to landscape.' },
  { id: 2, category: 'Commercial', title: 'Uday High Street', location: 'Hyderabad', year: '2024', status: 'Completed', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85', description: 'A street-facing retail destination designed for visibility, flexible tenancy, and confident urban presence.' },
  { id: 3, category: 'Development', title: 'Greenline Enclave', location: 'Telangana', year: '2025', status: 'In progress', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85', description: 'A plotted community plan centred on access, landscape buffers, and practical phased delivery.' },
]
const contentTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' }
const send = (res, status, payload) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(payload)) }
const readBody = (req) => new Promise((resolve, reject) => { let body=''; req.on('data', chunk => { body += chunk; if (body.length > 1_000_000) reject(new Error('Request too large')) }); req.on('end', () => resolve(body)); req.on('error', reject) })

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  if (url.pathname === '/api/health') return send(res, 200, { ok: true, service: 'ucd-api' })
  if (url.pathname === '/api/projects' && req.method === 'GET') return send(res, 200, { projects })
  if (url.pathname === '/api/enquiries' && req.method === 'POST') {
    try {
      const { name, phone, email, projectType = '', projectInterest = '', message } = JSON.parse(await readBody(req))
      if (![name, phone, email, message].every(value => typeof value === 'string' && value.trim())) return send(res, 400, { error: 'Please complete your name, phone, email, and project details.' })
      if (!/^\S+@\S+\.\S+$/.test(email)) return send(res, 400, { error: 'Please enter a valid email address.' })
      const result = db.prepare('INSERT INTO enquiries (name, phone, email, project_type, project_interest, message) VALUES (?, ?, ?, ?, ?, ?)').run(name.trim(), phone.trim(), email.trim().toLowerCase(), projectType, projectInterest, message.trim())
      return send(res, 201, { ok: true, enquiryId: Number(result.lastInsertRowid) })
    } catch { return send(res, 400, { error: 'We could not process that enquiry. Please try again.' }) }
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, { error: 'Method not allowed' })
  try {
    const requested = normalize(url.pathname === '/' ? '/index.html' : url.pathname).replace(/^\.\.(?:\/|\\|$)/, '')
    const file = join(root, requested)
    const safeFile = existsSync(file) ? file : join(root, 'index.html')
    const data = await readFile(safeFile)
    res.writeHead(200, { 'Content-Type': contentTypes[extname(safeFile)] || 'application/octet-stream' }); res.end(data)
  } catch { send(res, 404, { error: 'Not found' }) }
}).listen(port, () => console.log(`UCD server running at http://localhost:${port}`))
