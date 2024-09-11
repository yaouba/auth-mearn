import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClent = new MailtrapClient({
  token: TOKEN,
  testInboxId: process.env.MAILTRAP_TEST_INBOX_ID,
});

export const sender = {
  email: "mailtrap@example.com",
  name: "Mailtrap Test",
};
