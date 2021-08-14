export const PATH_URL = {
  BASE: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  KUISIONER: "/kuisioner",
  IJAZAH: "/tambah-ijazah",
  UPLOAD_IJAZAH: "/e-legalisir",
  DOWNLOAD_IJAZAH: "/download",
  ALUMNI_REGISTRATION: "/alumni-registration",
  APPRAISER_REGISTRATION: "/appraiser-registration",
  KUISIONER_FORM: "/kuisioner-form",
  CDC: "/cdc",
  TENTANG_KAMI: "/tentang-kami",
  SAPA_ALUMNI: "/sapa-alumni",
  ADMIN_ALUMNI: "/admin/list-alumni",
  ADMIN_E_LEGALISIR: "/admin/e-legalisir",
  ADMIN_ALUMNI_DETAIL: "/admin/alumni-detail",
  ADMIN_LEGALISIR_DETAIL: "/admin/legalisir-detail",

  IMAGES: "/images",
};

export const SIDEBAR_ADMIN = [
  {
    path: PATH_URL.ADMIN_ALUMNI,
    label: 'List Alumni',
    icon: 'fa-user-circle',
    key: 'list-alumni'
  },
  {
    path: PATH_URL.ADMIN_E_LEGALISIR,
    label: 'List e-legalisir',
    icon: 'fa-address-card',
    key: 'e-legalisir'
  }
];

export const SIDEBAR_USER = [
  {
    path: PATH_URL.UPLOAD_IJAZAH,
    label: "e-legalisir",
    icon: "fa-file-invoice",
    key: "e-legalisir",
  },
  {
    path: PATH_URL.IJAZAH,
    label: "tambah-ijazah",
    icon: "fa-file-invoice",
    key: "tambah-ijazah",
  },
  {
    path: PATH_URL.CDC,
    label: "cdc",
    icon: "fa-chart-line",
    key: "cdc",
  },
  {
    path: PATH_URL.SAPA_ALUMNI,
    label: "sapa alumni",
    icon: "fa-child",
    key: "hi-alumni",
  },
  {
    path: PATH_URL.TENTANG_KAMI,
    label: "tentang kami",
    icon: "fa-users",
    key: "about-us",
  },
];
