# Deploying on AWS

| Piece | AWS service | Roughly costs |
|---|---|---|
| Hosting (Next.js pages + `/api/contact`) | **Amplify Hosting** (SSR) | Free tier, then a few dollars a month at most for a portfolio |
| Domain + DNS | **Route 53** | Domain ~$15/yr for `.com`; hosted zone $0.50/month |
| HTTPS certificate | **ACM** (created by Amplify) | Free |
| Contact email | **SES** | ~$0.10 per 1,000 emails |
| Form spam limit | **DynamoDB** (on-demand) | Pennies |

Use one region for everything below; `us-east-1` (N. Virginia) is assumed.

## 1. DynamoDB table (rate limit)
DynamoDB → Create table
- Name: `portfolio-contact-rate-limit`
- Partition key: `pk` (String) · no sort key · capacity: **On-demand**
After creation: table → *Additional settings* → **Time to Live** → enable with attribute `expiresAt`.

## 2. SES (email)
SES → Identities → Create identity
- Until you own a domain: **Email address** → your inbox (e.g. `denizbes46@gmail.com`) and click the verification link. Use it as both `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`. (Mail “from” a Gmail address sent by SES may land in spam; step 6 fixes that.)
- New SES accounts are in the **sandbox**: they can only send to verified addresses. That's fine here, because the form only ever emails you.

## 3. IAM compute role (lets the site call SES and DynamoDB)
IAM → Roles → Create role → **Custom trust policy** → paste `docs/aws-compute-role-trust.json`.
- Skip managed policies, name it `portfolio-amplify-compute-role`, create.
- Open the role → *Add permissions → Create inline policy → JSON* → paste `docs/aws-compute-role-policy.json` with `ACCOUNT_ID` replaced by your 12-digit account ID.

## 4. Amplify app
Amplify → Create new app → **GitHub** → authorize → repo `kdy34/CareerPortfolio`, branch `main`.
- Amplify detects Next.js and uses `amplify.yml` from the repo.
- *App settings → IAM roles → Compute role*: choose `portfolio-amplify-compute-role`.
- *Hosting → Environment variables*:

```
CONTACT_PROVIDER=ses
CONTACT_AWS_REGION=us-east-1
CONTACT_FROM_EMAIL=Portfolio <denizbes46@gmail.com>
CONTACT_TO_EMAIL=denizbes46@gmail.com
RATE_LIMIT_TABLE=portfolio-contact-rate-limit
NEXT_PUBLIC_SITE_URL=https://main.<app-id>.amplifyapp.com
NEXT_PUBLIC_SITE_INDEXABLE=false
```
- Deploy. Then send yourself a message from `/contact`.

## 5. Domain (Route 53)
Route 53 → Registered domains → **Register domain** (e.g. `kutaydeniz.com`). Registration takes minutes to a few hours.
Amplify → *Hosting → Custom domains* → Add domain → pick the Route 53 domain → Amplify creates the DNS records and the HTTPS certificate.

## 6. After the domain is live
- SES → Create identity → **Domain** → your domain, with Easy DKIM. With Route 53 it adds the DNS records automatically.
- Change `CONTACT_FROM_EMAIL` to `Portfolio <hello@your-domain.com>`.
- Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` and `NEXT_PUBLIC_SITE_INDEXABLE=true`, then redeploy.

## Troubleshooting
- Form says “couldn't be sent”: Amplify → *Monitoring → Hosting compute logs*, look for lines starting with `[contact]`.
  - `provider rejected message 403` → compute role missing `ses:SendEmail`, or `CONTACT_FROM_EMAIL` isn't a verified identity.
  - `rate limit check failed` → table name/region wrong, or role missing `dynamodb:UpdateItem`.
