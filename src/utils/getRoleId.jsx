export const getRoleId = (data) => {
  if (data?.dosen_id == null && data?.admin_id == null) {
    return data?.mahasiswa_id;
  } else if (data?.mahasiswa_id == null && data?.admin_id == null) {
    return data?.dosen_id;
  } else {
    return data?.admin_id;
  }
};
