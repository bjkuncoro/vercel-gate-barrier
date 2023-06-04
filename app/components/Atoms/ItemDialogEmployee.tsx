import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, TextInput, SelectBox, SelectBoxItem } from '@tremor/react';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { isString, useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';

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

const ItemDialogEmployee = ({
  show,
  SetShowItemDialog,
  selectedData
}: {
  show: any;
  SetShowItemDialog: any;
  selectedData: any;
}) => {
  const { fetchCompany, loading, companyList, upsertEmployee } = useAuth();
  const [selectedCompany, setSelectedCompany] = React.useState<any>({});
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

  const formObject = {
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: false
      },
      {
        name: 'position',
        label: 'Position',
        type: 'text',
        required: false
      },
      {
        name: 'company_id',
        label: 'Company ID',
        type: 'text',
        required: true
      }
    ]
  };

  useEffect(() => {
    if (show) {
      fetchCompany();
    }
    if (show && !selectedData) {
      setSelectedCompany({});
    }
    if (selectedData) {
      setSelectedCompany(selectedData.company?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleSelectCompany = (e: any) => {
    setSelectedCompany(e);
    formik.setFieldValue('company_id', e);
  };

  const validationSchema = generateValidationSchema(formObject.fields);

  const formik = useFormik({
    initialValues: !selectedData
      ? generateInitialValues(formObject.fields)
      : selectedData,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(selectedCompany);
      const obj = values;
      delete obj.company;
      delete obj.createdAt;
      delete obj.updatedAt;
      console.log({ ...obj, company_id: selectedCompany });
      upsertEmployee({ ...obj, company_id: selectedCompany });
      SetShowItemDialog(false, {});
    },
    enableReinitialize: true
  });

  // setTimeout(() => {
  //   formik.setFieldValue('kode_rfid', '1234567890');
  // }, 3000);

  const error = formik.errors;
  return (
    <motion.div
      // initial="closed"
      animate={!show ? 'closed' : 'open'}
      variants={menuVariants}
      className="bg-gray-50 shadow-lg overflow-scroll fixed p-8 w-1/2 top-0 right-0 bottom-0 z-50"
    >
      <div className="flex justify-between">
        <span className="font-medium   text-2xl antialiased">
          {!selectedData ? 'Entry' : 'Edit'} Data Pengurus{' '}
          {selectedData?.kode_rfid}
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
      <form onSubmit={formik.handleSubmit}>
        {formObject.fields.map((field) => {
          const error: any = formik.errors[field.name];
          return (
            <div key={field.name}>
              <div className="my-4">
                <p className="text-sm mb-1 font-normal text-slate-500">
                  {field.label}
                </p>
                {field.name === 'company_id' ? (
                  <SelectBox
                    onValueChange={(value) => handleSelectCompany(value)}
                    value={selectedCompany}
                  >
                    {companyList.map((item: any) => (
                      <SelectBoxItem
                        value={item.id}
                        key={item.id}
                        text={item.name}
                        icon={BuildingOffice2Icon}
                      />
                    ))}
                  </SelectBox>
                ) : (
                  <TextInput
                    id={field.name}
                    name={field.name}
                    placeholder=""
                    error={
                      field.name !== 'company_id' &&
                      formik.touched[field.name] &&
                      error
                    }
                    errorMessage={formik.touched[field.name] && error}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                )}
              </div>
            </div>
          );
        })}
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

export default ItemDialogEmployee;
