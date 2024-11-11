import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DownloadResult = () => {
  const { id } = useParams();

  useEffect(() => {
    // تنزيل ملف الـ PDF
    const downloadResult = async () => {
      try {
        const response = await axios({
          url: `${location.origin}/api/lab-results/${id}/download`,
          method: 'GET',
          responseType: 'blob', // نوع الملف
        });
        // إنشاء رابط لتنزيل الملف
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `lab_result_${id}.pdf`); // اسم الملف
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error downloading result PDF:', error);
      }
    };

    downloadResult();
  }, [id]);

  return <div>Downloading your result...</div>;
};

export default DownloadResult;
