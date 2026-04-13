# GitHub Branch Protection Setup

Configure these settings in GitHub → Settings → Branches → Add branch ruleset
for each protected branch: `main`, `dev`, `staging`, `uat`.

## Required settings

| Setting                                                          | Value                         |
| ---------------------------------------------------------------- | ----------------------------- |
| Require a pull request before merging                            | ✅ Enabled                    |
| Required approvals                                               | **1**                         |
| Dismiss stale pull request approvals when new commits are pushed | ✅ Enabled                    |
| Require review from Code Owners                                  | ✅ Enabled                    |
| Require status checks to pass                                    | ✅ Enabled                    |
| Required status checks                                           | `Lint`, `Type Check`, `Build` |
| Require branches to be up to date before merging                 | ✅ Enabled                    |
| Do not allow bypassing the above settings                        | ✅ Enabled                    |

## Senior dev bypass (no approval needed)

GitHub offers two approaches depending on your plan:

### Option A — GitHub Enterprise (recommended)

In the branch ruleset → **Bypass list**, add the `@your-org/senior-devs` team.
Members of that team can merge without any approval.

### Option B — CODEOWNERS self-approval (all plans)

1. Add senior devs to `.github/CODEOWNERS` as global owners (`*`).
2. Enable **"Allow specified actors to bypass required pull requests"** is NOT
   available on the free plan — but CODEOWNERS owners _can_ approve their own
   PRs on most plans if the "Require review from Code Owners" rule is satisfied
   by the owner themselves.

The practical result: a senior dev opens a PR → GitHub sees they are a code
owner → their own review satisfies the required-reviewer rule → they can merge.

### Option C — Team-based permissions (all plans)

Create two GitHub Teams:

- `junior-devs` — Write permission
- `senior-devs` — Maintain permission (Maintain role can bypass required reviews)

## Local enforcement (Husky)

The `.husky/pre-push` hook blocks direct pushes to protected branches for
developers whose git email is **not** listed in `.senior-devs`.
This is a convenience guard — it does not replace GitHub Branch Protection.
