// @ts-ignore
import nodemailer from "nodemailer"
import { logAction } from "@/lib/audit"
import type { EmailCategory, EmailNotificationResult } from "@/lib/types"

const smtpHost = process.env.MAILCOW_SMTP_HOST || ""
const smtpPort = Number(process.env.MAILCOW_SMTP_PORT || 587)
const smtpUser = process.env.MAILCOW_SMTP_USER || ""
const smtpPass = process.env.MAILCOW_SMTP_PASS || ""
const smtpFrom = process.env.MAILCOW_SMTP_FROM || "operator@localhost"
const alertRecipients = (process.env.MAILCOW_ALERT_RECIPIENTS || "").split(",").map((r) => r.trim()).filter(Boolean)

const canSend = Boolean(smtpHost && smtpUser && smtpPass)

const transporter = canSend
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })
  : null

export async function sendEmail(options: {
  to?: string | string[]
  subject: string
  text: string
  html?: string
  category: EmailCategory
  context?: Record<string, unknown>
}): Promise<EmailNotificationResult> {
  const recipients = options.to && options.to.length > 0 ? options.to : alertRecipients
  const hasRecipients = Array.isArray(recipients) ? recipients.length > 0 : Boolean(recipients)

  if (!canSend || !transporter || !hasRecipients) {
    const msg = !hasRecipients ? "No recipients configured" : "SMTP not configured; email not sent"
    logAction({ actionType: "email-failed", risk: "low", message: `${options.category}: ${msg}` })
    return { sent: false, reason: msg }
  }

  try {
    const info = await transporter.sendMail({
      from: smtpFrom,
      to: recipients,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })

    logAction({ actionType: "email-sent", risk: "low", message: `${options.category}: ${options.subject}` })
    return { sent: true, messageId: info.messageId }
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown email error"
    logAction({ actionType: "email-failed", risk: "low", message: `${options.category}: ${reason}` })
    return { sent: false, reason }
  }
}

export function defaultEmailRecipients() {
  return alertRecipients
}
