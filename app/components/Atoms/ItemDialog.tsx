import React from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  TextInput,
  SelectBox,
  SelectBoxItem,
  Divider
} from '@tremor/react';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { isString, useFormik } from 'formik';
import * as Yup from 'yup';
import Datepicker from 'react-tailwindcss-datepicker';
import { useAuth } from '../../context/AuthContext';
import { BuildingOffice2Icon, QrCodeIcon } from '@heroicons/react/24/outline';
import Switch from 'react-switch';

const generateInitialValues = (fields: any[]) => {
  return fields.reduce((values, field) => {
    values[field.name] = '';
    return values;
  }, {});
};

const generateValidationSchema = (fields: any[]) => {
  const validationSchema: any = {};

  fields.forEach((field) => {
    if (field.required) {
      validationSchema[field.name] = Yup.string().required(
        `${field.label} is required`
      );
    }
    // Add additional validation rules for each field as needed
  });

  return Yup.object().shape(validationSchema);
};

const ItemDialog = ({
  show = false,
  SetShowItemDialog,
  selectedData
}: {
  show: any;
  SetShowItemDialog: any;
  selectedData: any;
}) => {
  const {
    loading,
    upsertVehicle,
    companyList,
    employeeList,
    fetchEmployeeByCompanyId,
    setVehicleStatus
  } = useAuth();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [selectedDate, setSelectedDate] = React.useState({
    startDate: null,
    endDate: null
  });
  const [selectedCompany, setSelectedCompany] = React.useState('');
  const [selectedEmployee, setSelectedEmployee] = React.useState('');
  const [additionalData, setAdditionalData] = React.useState<any>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isActive, setIsActive] = React.useState<any>(false);
  const [statusLoading, setstatusLoading] = React.useState<any>(false);

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0
    },
    closed: {
      opacity: 0,
      x: '100%'
    }
  };

  type optionsType = {
    [key: string]: any;
  };

  const options: optionsType = {
    lokasi_ft: [
      { value: 'FT SINTANG', label: 'FT SINTANG' },
      { value: 'JOBBER SANGGAU', label: 'JOBBER SANGGAU' }
    ],
    jenis_produk: [
      { value: 'Pertalite', label: 'Pertalite' },
      { value: 'B30', label: 'B30' },
      { value: 'Pertadex', label: 'Pertadex' },
      { value: 'Pertamax', label: 'Pertamax' },
      { value: 'Multiproduk', label: 'Multiproduk' }
    ],
    jumlah_kompartemen: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' }
    ],
    kap_liter: [
      { value: '5000', label: '5000' },
      { value: '7000', label: '7000' },
      { value: '8000', label: '8000' },
      { value: '12000', label: '12000' },
      { value: '16000', label: '16000' },
      { value: '24000', label: '24000' }
    ],
    kategori: [
      { value: 'SPBU', label: 'SPBU' },
      { value: 'INDUSTRI', label: 'INDUSTRI' },
      { value: 'APMS', label: 'APMS' }
    ]
  };

  const formObject = {
    fields: [
      {
        name: 'kode_rfid',
        label: 'KODE RFID',
        type: 'text',
        required: true
      },
      {
        name: 'nopol_kendaraan',
        label: 'Nopol Kendaraan',
        type: 'text',
        required: true
      },
      {
        name: 'lokasi_ft',
        label: 'Lokasi FT',
        type: 'select',
        required: false
      },
      {
        name: 'ket',
        label: 'Keterangan',
        type: 'text',
        required: false
      },
      {
        name: 'kategori',
        label: 'Kategori',
        type: 'select',
        required: false
      },
      {
        name: 'jumlah_kompartemen',
        label: 'Jumlah Kompartemen',
        type: 'select',
        required: false
      },
      {
        name: 'kap_liter',
        label: 'Kap (Liter)',
        type: 'select',
        required: false
      },
      {
        name: 'nama_pemilik_perusahaan',
        label: 'Nama Pemilik/Perusahaan',
        type: 'text',
        required: false
      },
      {
        name: 'jenis_produk',
        label: 'Jenis Produk',
        type: 'select',
        required: false
      },
      {
        name: 'merk_kendaraan',
        label: 'Merk Kendaraan',
        type: 'text',
        required: false
      },
      {
        name: 'tahun_pembuatan',
        label: 'Tahun Pembuatan',
        type: 'number',
        required: false
      },
      {
        name: 'umur',
        label: 'Umur',
        type: 'number',
        required: false
      },
      {
        name: 'no_mesin',
        label: 'No Mesin',
        type: 'text',
        required: false
      },
      {
        name: 'no_type_seri_head_truck',
        label: 'No Type Seri Head Truck',
        type: 'text',
        required: false
      },
      {
        name: 'no_rangka',
        label: 'No Rangka',
        type: 'text',
        required: false
      },
      {
        name: 'no_dok_uji_emisi',
        label: 'No Dok Uji Emisi',
        type: 'text',
        required: false
      },
      {
        name: 'hasil_uji_emisi',
        label: 'Hasil Uji Emisi',
        type: 'text',
        required: false
      },
      {
        name: 'masa_berlaku_uji_emisi',
        label: 'Masa Berlaku Uji Emisi',
        type: 'text',
        required: false
      },
      {
        name: 'no_stnk',
        label: 'No STNK',
        type: 'text',
        required: false
      },
      {
        name: 'masa_berlaku_stnk',
        label: 'Masa Berlaku STNK',
        type: 'text',
        required: false
      },
      {
        name: 'no_keur',
        label: 'No Keur',
        type: 'text',
        required: false
      },
      {
        name: 'masa_berlaku_keur',
        label: 'Masa Berlaku Keur',
        type: 'text',
        required: false
      },
      {
        name: 'no_skt_spb',
        label: 'No SKT/SPB',
        type: 'text',
        required: false
      },
      {
        name: 'masa_berlaku_skt_spb',
        label: 'Masa Berlaku SKT/SPB',
        type: 'text',
        required: false
      },
      {
        name: 'no_ijin_masuk',
        label: 'No Ijin Masuk',
        type: 'text',
        required: false
      },
      {
        name: 'nama_amt_i',
        label: 'Nama AMT I',
        type: 'text',
        required: false
      },
      {
        name: 'nama_amt_ii',
        label: 'Nama AMT II',
        type: 'text',
        required: false
      },
      {
        name: 'masa_berlaku_id_card_amt_1',
        label: 'Masa Berlaku ID Card AMT 1',
        type: 'text',
        required: false
      },
      {
        name: 'masa_berlaku_id_card_amt_2',
        label: 'Masa Berlaku ID Card AMT 2',
        type: 'text',
        required: false
      },
      {
        name: 'masa_berlaku_ijin_masuk',
        label: 'Masa Berlaku Ijin Masuk',
        type: 'text',
        required: false
      },
      {
        name: 'no_ijin_prinsip',
        label: 'No Ijin Prinsip',
        type: 'text',
        required: false
      },
      {
        name: 'no_surat_tera',
        label: 'No Surat Tera',
        type: 'text',
        required: false
      },
      {
        name: 'masa_berlaku_tera',
        label: 'Masa Berlaku Tera',
        type: 'text',
        required: false
      },
      {
        name: 'penanggung_jawab',
        label: 'Penanggung Jawab',
        type: 'text',
        required: false
      }
    ]
  };

  React.useEffect(() => {
    if (show && !selectedData) {
      setSelectedCompany('');
    }
    if (selectedData) {
      setSelectedCompany(selectedData.company_id);
      setSelectedEmployee(selectedData.employee_id);
      setIsActive(selectedData.is_active === 1);
      setAdditionalData(selectedData.additional_data);
    }
    if (show) {
      // inputRef.current?.focus();

      const handleCardScan = async (event: any) => {
        if (event.key === 'Enter') {
          formik.setFieldValue('kode_rfid', '');
          const cardData = event.target.value.slice(0, 10);
          console.log('RFID scanned:', cardData);
          formik.setFieldValue('kode_rfid', cardData);
          inputRef.current?.blur();
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        }
      };

      // Attach the event listener to the appropriate input field or card reader
      const cardInput = document.getElementById('cardInput');
      cardInput?.addEventListener('keydown', handleCardScan);
      // Clean up the event listener when the component unmounts
      return () => {
        cardInput?.removeEventListener('keydown', handleCardScan);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  React.useEffect(() => {
    if (selectedCompany) {
      // console.log(selectedCompany);
      fetchEmployeeByCompanyId(selectedCompany);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  const handleClickScan = () => {
    return inputRef.current?.focus();
  };

  const handleSelect = (field: any, value: any) => {
    if (field === 'nama_pemilik_perusahaan') {
      setSelectedCompany(value);
      formik.setFieldValue('company_id', value);
    }
    if (field === 'penanggung_jawab') {
      setSelectedEmployee(value);
      formik.setFieldValue('employee_id', value);
    }
  };

  const handleToggle = async (val: any) => {
    setIsActive(val);

    try {
      setstatusLoading(true);
      const resp = await setVehicleStatus(selectedData.id, val ? '1' : '0');
      console.log(resp);
    } catch (err) {
    } finally {
      setstatusLoading(false);
    }
  };

  const handleAdditionalDataForm = (field: string, value: any) => {
    setAdditionalData({ ...additionalData, [field]: value });
  };

  const validationSchema = generateValidationSchema(formObject.fields);

  const formik = useFormik({
    initialValues: !selectedData
      ? generateInitialValues(formObject.fields)
      : selectedData,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      // console.log({
      //   ...values,
      //   company_id: selectedCompany,
      //   additional_data: additionalData
      // });
      upsertVehicle({
        ...values,
        company_id: selectedCompany,
        additional_data: additionalData
      });
      SetShowItemDialog(false, {});
    },
    enableReinitialize: true
  });

  const error = formik.errors;
  return (
    <motion.div
      initial="closed"
      animate={!show ? 'closed' : 'open'}
      variants={menuVariants}
      className="bg-gray-50 shadow-lg overflow-scroll fixed p-8 w-1/2 top-0 right-0 bottom-0 z-50"
    >
      <div className="flex justify-between">
        <span className="font-medium text-2xl antialiased">
          {!selectedData ? 'Entry' : 'Edit'} Data Kendaraan{' '}
          {selectedData?.nopol_kendaraan}
        </span>
        <Button
          variant="secondary"
          icon={XCircleIcon}
          size="sm"
          color="rose"
          onClick={() => SetShowItemDialog(false, {})}
        >
          Close
        </Button>
      </div>
      <div className="p-4 flex justify-between items-center flex-row border-2 border-slate-200 rounded-lg mt-8">
        {!statusLoading ? (
          <>
            <div className="flex flex-col">
              <span className="text-md">Status</span>
              <span
                className={`text-2xl font-semibold font-mono text-${
                  isActive ? 'green-400' : 'red-500'
                }`}
              >
                {isActive ? 'AKTIF' : 'NONAKTIF'}
              </span>
            </div>
            <div>
              <Switch
                uncheckedIcon={false}
                checkedIcon={false}
                draggable={false}
                offColor="#ecc7f9"
                onColor="#8a4af3"
                onChange={handleToggle}
                checked={isActive}
              />
            </div>
          </>
        ) : (
          <div className="text-slate-400">Mengupdate Data. . .</div>
        )}
      </div>
      <input
        ref={inputRef}
        id="cardInput"
        defaultValue={formik.values['kode_rfid']}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        style={{ height: 0 }}
      />
      <form onSubmit={formik.handleSubmit}>
        {formObject.fields.map((field) => {
          const error: any = formik.errors[field.name];

          return (
            <div key={field.name}>
              <div className="my-4">
                <p className="text-sm mb-1 font-normal text-slate-500">
                  {field.label}
                </p>
                {field.name.includes('masa_berlaku') ? (
                  <Datepicker
                    asSingle
                    inputClassName="border-2 border-gray-300 rounded-md px-3 py-2 w-full bg-white"
                    useRange={false}
                    value={{
                      startDate: formik.values[field.name],
                      endDate: formik.values[field.name]
                    }}
                    onChange={(date) =>
                      formik.setFieldValue(field.name, date?.startDate)
                    }
                  />
                ) : field.name === 'nama_pemilik_perusahaan' ||
                  field.name === 'penanggung_jawab' ? (
                  <SelectBox
                    onValueChange={(value) => handleSelect(field.name, value)}
                    value={
                      field.name === 'nama_pemilik_perusahaan'
                        ? selectedCompany
                        : selectedEmployee
                    }
                  >
                    {(field.name === 'nama_pemilik_perusahaan'
                      ? companyList
                      : employeeList
                    ).map((item: any) => (
                      <SelectBoxItem
                        value={item.id}
                        key={item.id}
                        text={item.name}
                        icon={BuildingOffice2Icon}
                      />
                    ))}
                  </SelectBox>
                ) : field.type === 'select' ? (
                  <SelectBox
                    onValueChange={(value) =>
                      formik.setFieldValue(field.name, value)
                    }
                    value={formik.values[field.name]?.toString()}
                  >
                    {options[field.name].map(
                      (item: { value: string; label: string }) => (
                        <SelectBoxItem
                          value={item.value}
                          key={item.value}
                          text={item.label}
                          icon={BuildingOffice2Icon}
                        />
                      )
                    )}
                  </SelectBox>
                ) : (
                  <div className="flex flex-row gap-2">
                    <TextInput
                      id={field.name}
                      name={field.name}
                      disabled={
                        field.name === 'kode_rfid' || field.name === 'umur'
                      }
                      placeholder=""
                      error={formik.touched[field.name] && error}
                      errorMessage={formik.touched[field.name] && error}
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {field.name === 'kode_rfid' &&
                      (!isFocused ? (
                        <Button
                          // variant="secondary"
                          icon={QrCodeIcon}
                          size="lg"
                          onClick={handleClickScan}
                          type="button"
                        >
                          Scan Kartu
                        </Button>
                      ) : (
                        <span className="text-blue-600">
                          Scan kartu Anda Sekarang
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <Divider />
        <div className="pa-0 mb-4">
          <span className="text-xl font-medium antialiased text-gray-500">
            Data Tambahan
          </span>
          <p className="text-sm mb-1 mt-3 font-normal text-slate-500">
            Relaksasi ( Tahun )
          </p>
          <TextInput
            disabled={false}
            placeholder="relaksasi"
            value={additionalData ? additionalData?.relaksasi : ''}
            onChange={(e) =>
              handleAdditionalDataForm('relaksasi', e.target.value)
            }
          />
        </div>
        <div className="flex justify-between">
          {error && (
            <div>
              {isString(error) ? (
                <div className="text-red-600">*{error}</div>
              ) : (
                Object.values(error).map((errMsg: any) => (
                  <div className="text-red-600" key={errMsg}>
                    *{errMsg}
                  </div>
                ))
              )}
            </div>
          )}
          <Button
            variant="secondary"
            icon={CheckCircleIcon}
            size="lg"
            type="submit"
          >
            Simpan Data
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ItemDialog;
