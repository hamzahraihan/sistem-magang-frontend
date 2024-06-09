import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../../../components/Table/Table';
import useFetchCategory from '../../../../features/category/useFetchCategory';
import _ from 'lodash';
import { useState } from 'react';
import { Modal } from 'flowbite-react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PrimaryButton from '../../../../components/PrimaryButton';
import { useCategoryContext } from '../../../../hooks/useCategoryContext';
import { Spinner } from '../../../../components/Icons';

const AdminPostCategory = () => {
  const [openModal, setOpenModal] = useState(false);
  const { category, loading } = useFetchCategory();
  const { handleCreateCategory, handleDeleteCategory, loadingCategory, loadingDelete } = useCategoryContext();
  const columnHelper = createColumnHelper();

  const formik = useFormik({
    initialValues: {
      category: '',
    },
    onSubmit: (values) => {
      handleCreateCategory(values);
    },
    validationSchema: yup.object().shape({
      category: yup.string().required(),
    }),
  });

  const handleInputForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const columns = [
    columnHelper.accessor('', {
      id: 'No.',
      cell: (info) => info.row.index + 1,
      header: 'No.',
      size: 20,
    }),
    columnHelper.accessor('category', {
      id: 'Kategori Unggahan',
      cell: (info) => _.capitalize(info.getValue()),
      header: () => <span>Kategori Unggahan</span>,
      size: 200,
    }),
    columnHelper.accessor('category_id', {
      id: 'Aksi',
      cell: (info) => {
        const id = info.getValue();
        return (
          <button
            type="button"
            className=" p-3 bg-red-600 text-white rounded-xl disabled:bg-red-300"
            onClick={() => {
              handleDeleteCategory(id);
            }}
            disabled={loadingDelete[id]}
          >
            {loadingDelete[id] ? <Spinner /> : 'Hapus'}
          </button>
        );
      },
      header: () => <span>Aksi</span>,
      size: 20,
    }),
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 h-fit">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">Kategori Unggahan</h1>
        <button onClick={() => setOpenModal(true)} className="border border-gray-300 p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 duration-150 font-bold">
          Tambah
        </button>
        <Modal show={openModal} size="lg" position="center" onClose={() => setOpenModal(false)}>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header>Tambah Kategori</Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-2">
                <label htmlFor="category">Kategori</label>
                <input name="category" id="category" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Kategori..." onChange={handleInputForm} required />
                <p className="text-xs text-red-800">{formik.errors.category}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="lg:w-fit w-full">
                <PrimaryButton text="Tambah" type="submit" loading={loadingCategory} />
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      <Table columns={columns} data={category} loading={loading} fileName={'daftar_kategori_unggahan'} />
    </div>
  );
};

export default AdminPostCategory;
