export const getRoleId = (data) => {
  if (data?.dosen_id == null && data?.admin_id == null) {
    return data?.Mahasiswa.mahasiswa_id;
  } else if (data?.mahasiswa_id == null && data?.admin_id == null) {
    return data?.Dosen.dosen_id;
  } else {
    return data?.Admin.admin_id;
  }
};
