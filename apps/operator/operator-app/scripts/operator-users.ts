#!/usr/bin/env node
import fs from "fs/promises"
import path from "path"
import readline from "readline"
import bcrypt from "bcryptjs"
import { readUsers, writeUsers, OperatorRole, OperatorUser } from "../lib/operator-auth-node"

const USER_STORE = path.join(process.cwd(), "data", "operator-users.json")

async function promptHidden(question: string) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise<string>((resolve) => {
    const handleData = (chunk: Buffer) => {
      const char = chunk.toString()
      if (char === "\n" || char === "\r" || char === "\u0004") {
        process.stdout.write("\n")
        process.stdin.off("data", handleData)
        return
      }
      process.stdout.clearLine(0)
      readline.cursorTo(process.stdout, 0)
      process.stdout.write(question + "*".repeat(rl.line.length))
    }
    process.stdin.on("data", handleData)
    rl.question(question, (value) => {
      process.stdin.off("data", handleData)
      rl.close()
      resolve(value)
    })
  })
}

function usage() {
  console.log("Usage: pnpm operator-users <command> [options]")
  console.log("Commands:")
  console.log("  list")
  console.log("  add --email <email> --role <admin|operator|auditor>")
  console.log("  set-role --email <email> --role <admin|operator|auditor>")
  console.log("  delete --email <email>")
}

function parseArgs() {
  const [, , cmd, ...rest] = process.argv
  const args: Record<string, string> = {}
  for (let i = 0; i < rest.length; i += 2) {
    const key = rest[i]
    const val = rest[i + 1]
    if (key?.startsWith("--") && val) {
      args[key.slice(2)] = val
    }
  }
  return { cmd, args }
}

async function ensureDataDir() {
  await fs.mkdir(path.dirname(USER_STORE), { recursive: true })
}

async function listUsers() {
  const users = await readUsers()
  console.table(users.map(({ email, role, createdAt }) => ({ email, role, createdAt })))
}

async function addUser(email: string, role: OperatorRole) {
  await ensureDataDir()
  const users = await readUsers()
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    console.error("User already exists")
    process.exit(1)
  }
  const password = await promptHidden("Password: ")
  const passwordHash = await bcrypt.hash(password, 10)
  const user: OperatorUser = { email, passwordHash, role, createdAt: new Date().toISOString() }
  users.push(user)
  await writeUsers(users)
  console.log("User added")
}

async function setRole(email: string, role: OperatorRole) {
  const users = await readUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user) {
    console.error("User not found")
    process.exit(1)
  }
  user.role = role
  await writeUsers(users)
  console.log("Role updated")
}

async function deleteUser(email: string) {
  const users = await readUsers()
  const next = users.filter((u) => u.email.toLowerCase() !== email.toLowerCase())
  if (next.length === users.length) {
    console.error("User not found")
    process.exit(1)
  }
  await writeUsers(next)
  console.log("User deleted")
}

async function main() {
  const { cmd, args } = parseArgs()
  if (!cmd) {
    usage()
    process.exit(1)
  }

  switch (cmd) {
    case "list":
      await listUsers()
      break
    case "add": {
      const email = args.email
      const role = args.role as OperatorRole
      if (!email || !role) {
        usage()
        process.exit(1)
      }
      await addUser(email, role)
      break
    }
    case "set-role": {
      const email = args.email
      const role = args.role as OperatorRole
      if (!email || !role) {
        usage()
        process.exit(1)
      }
      await setRole(email, role)
      break
    }
    case "delete": {
      const email = args.email
      if (!email) {
        usage()
        process.exit(1)
      }
      await deleteUser(email)
      break
    }
    default:
      usage()
      process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
