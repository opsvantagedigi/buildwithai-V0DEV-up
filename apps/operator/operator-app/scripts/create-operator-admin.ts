import fs from "fs/promises"
import path from "path"
import readline from "readline"
import bcrypt from "bcryptjs"

const USER_FILE = path.join(process.cwd(), "data", "operator-users.json")
const EMAIL = "admin@buildwithai.digital"

async function ensureDir(filePath: string) {
  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
}

async function readUsers(): Promise<Array<{ email: string; passwordHash: string; role: string; createdAt: string }>> {
  try {
    const raw = await fs.readFile(USER_FILE, "utf8")
    return JSON.parse(raw)
  } catch (err) {
    return []
  }
}

async function writeUsers(users: Array<{ email: string; passwordHash: string; role: string; createdAt: string }>) {
  await ensureDir(USER_FILE)
  await fs.writeFile(USER_FILE, JSON.stringify(users, null, 2), "utf8")
}

async function promptPassword(): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const question = (q: string) => new Promise<string>((resolve) => rl.question(q, resolve))
  const pwd = await question("Enter admin password: ")
  rl.close()
  return pwd.trim()
}

async function main() {
  const password = await promptPassword()
  if (!password) {
    console.error("Password is required")
    process.exit(1)
  }

  const users = await readUsers()
  const now = new Date().toISOString()
  const passwordHash = await bcrypt.hash(password, 10)
  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === EMAIL.toLowerCase())
  const record = { email: EMAIL, passwordHash, role: "admin", createdAt: now }
  if (existingIdx >= 0) {
    users[existingIdx] = record
  } else {
    users.push(record)
  }
  await writeUsers(users)
  console.log(`Admin user created: ${EMAIL}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
