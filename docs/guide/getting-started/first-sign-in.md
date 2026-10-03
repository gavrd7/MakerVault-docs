# First sign-in

**Goal:** check your account and make the application ready for everyday use.


<figure markdown>
  ![MakerVault sign-in screen with password and passkey options.](../assets/screenshots/account-login.png)
  <figcaption>The MakerVault sign-in screen.</figcaption>
</figure>

<figure markdown>
  ![MakerVault local account sign-up page with username, email and password fields.](../assets/screenshots/account-sign-up.png)
  <figcaption>When local self-registration is enabled, new users can create an account from the Sign Up page.</figcaption>
</figure>

If your administrator has enabled local self-registration, choose **Sign up** from the sign-in page, enter a username, email address and password, then follow any email-verification instructions for the installation. If self-registration is disabled, the administrator must create or provision your account instead.

<figure markdown>
  ![MakerVault security page showing authenticator app, security key and recovery-code options.](../assets/screenshots/account-mfa.png)
  <figcaption>MFA and recovery options are managed from Account & Security.</figcaption>
</figure>

<figure markdown>
  ![Change Password page showing current and new password fields and password requirements.](../assets/screenshots/account-password.png)
  <figcaption>Local-account passwords can be changed from Account & Security.</figcaption>
</figure>

1. Open the address supplied by your administrator and sign in. If you installed it yourself, use the superuser created during installation.
2. Check the username, timezone and currency in the page header. The displayed currency is not an automatic currency-conversion service.
3. Open **Account & Security**. Review your password and the available MFA options. An authenticator adds a second sign-in step; save any recovery codes somewhere safe before depending on it. Passkey availability depends on a suitable secure browser origin, normally HTTPS.
4. Open **Board Catalogue** and **Components**. Starter records should be present. Missing images do not mean installation failed: image discovery is a separate background task.
5. If you are an administrator, open **Settings → Library updates** and review the 24-hour default schedule. Save any changes.
6. Create a small example project using the next chapter before importing a large collection.

## Missing buttons or empty pages?

A new account does not automatically gain editing rights. An administrator can assign the **Editor** group. Viewer accounts can read the records available to their own account but cannot create or edit them. The Settings menu is shown to staff, and **Users & storage** requires a superuser.

Private inventory, projects, files, printers and spools belong to their creator. Signing in with a second account normally gives you a separate workspace, even when the shared catalogues contain the same products.

## Things you can leave until later

You do not need Spoolman, SimplyPrint, a printer connection, OIDC or a reverse proxy to begin organising your own local workshop. Add integrations only when there is existing data or equipment you want to connect.

**Next:** [Your first project](first-project.md).
