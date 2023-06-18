'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, TextInput, SelectBox, SelectBoxItem } from '@tremor/react';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
const ImportDialog = ({
  show = false,
  SetShowImportDialog
}: {
  show: Boolean;
  SetShowImportDialog: any;
}) => {
  const { sendImport, loadingImport, downloadTemplate } = useAuth();
  const [file, setFile] = useState<any>(null);

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

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    // Handle the uploaded file
  };

  const download = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_SERVICE}/api/vehicles/template-download`;
    if (typeof window !== 'undefined') {
      window.open(url);
    }
    // await downloadTemplate('vehicles');
  };

  const sendUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const resp: any = sendImport(formData, 'vehicles');
    } catch (error) {}
  };

  return (
    <motion.div
      initial="closed"
      animate={!show ? 'closed' : 'open'}
      variants={menuVariants}
      className="bg-gray-50 shadow-lg overflow-scroll fixed p-8 w-1/3 top-0 right-0 bottom-0 z-50"
    >
      <div className="flex justify-between">
        <span className="font-medium   text-2xl antialiased">
          Import Data Perusahaan
        </span>
        <Button
          variant="secondary"
          icon={XCircleIcon}
          size="sm"
          disabled={loadingImport}
          color="rose"
          onClick={() => SetShowImportDialog(false, {})}
        >
          Close
        </Button>
      </div>
      <div className="mt-12">
        <span>Pilih file excel yang akan diimport</span>
        <input
          type="file"
          accept=".xls, .xlsx"
          onChange={handleFileUpload}
          className="p-6 w-full mt-4 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full mt-8">
        <Button
          variant="primary"
          icon={ArrowUpCircleIcon}
          size="md"
          loading={loadingImport}
          loadingText="Uploading Data..."
          color="blue"
          style={{ width: '100%' }}
          onClick={() => sendUpload()}
        >
          UPLOAD
        </Button>
      </div>
      <div className="bottom-4 absolute">
        <span>
          Jika ingin mendownload template excel, silahkan klik tombol dibawah
          ini
        </span>
        <Button
          className="mt-2"
          variant="secondary"
          icon={ClipboardDocumentCheckIcon}
          size="sm"
          color="blue"
          onClick={() => download()}
        >
          Download Template
        </Button>
      </div>
    </motion.div>
  );
};

export default ImportDialog;
