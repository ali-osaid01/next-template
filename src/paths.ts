const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
} as const;

export const paths = {
  root: "/",

  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    resetPassword: (token: string) => `${ROOTS.AUTH}/reset-password/${token}`,
  },

  dashboard: {
    root: ROOTS.DASHBOARD,

    // ── Add feature paths below as you build them ──
    //
    // users: {
    //   root:   `${ROOTS.DASHBOARD}/users`,
    //   create: `${ROOTS.DASHBOARD}/users/create`,
    //   detail: (id: string) => `${ROOTS.DASHBOARD}/users/${id}`,
    //   edit:   (id: string) => `${ROOTS.DASHBOARD}/users/${id}/edit`,
    // },
  },
} as const;
