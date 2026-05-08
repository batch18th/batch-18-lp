# Email Setup

The form sends all submissions to:

`batch18th1990@gmail.com`

Create a `.env.local` file in the project root with these values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-gmail-address@gmail.com
```

For Gmail, `SMTP_PASS` should be a Gmail App Password, not your normal Gmail password.

The email includes:

- Name
- Phone number
- Email address
- Business name
- Website / Facebook URL, if provided
- Message or requirements

If SMTP is not configured, the app falls back to FormSubmit and sends the
submission to `batch18th1990@gmail.com`.

You can also use Formspree by adding this to `.env.local`:

```env
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```
