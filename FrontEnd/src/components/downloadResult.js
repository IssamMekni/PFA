import axios from 'axios';

const downloadLabResult = async (id) => {
  try {
    const response = await axios({
      url: `${location.origin}/api/lab-results/${id}/download`,
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if required
      },
    });

    // Create a URL and trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lab_result_${id}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading result PDF:', error);
    alert('Failed to download the file. Please try again.');
  }
};

export default downloadLabResult;
