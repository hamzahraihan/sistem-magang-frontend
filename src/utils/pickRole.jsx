export const pickRole = (data) => {
  if (data?.dosen_id == null && data?.admin_id == null) {
    return data?.Mahasiswa;
  } else if (data?.mahasiswa_id == null && data?.admin_id == null) {
    return data?.Dosen;
  } else {
    return data?.Admin;
  }
};
