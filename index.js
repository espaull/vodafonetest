const handleMessage = (title, code) => {
  let message = null;

  if (code) {
    switch (code) {
      case 'NO_STOCK':
        message = 'No stock has been found';
        break;
      case 'INCORRECT_DETAILS':
        message = 'Incorrect details have been entered';
        break;
      default:
        break;
    }
  }

  return { title, message };
};

const wait = () => new Promise(resolve => setTimeout(resolve, 2000));

const handleState = async item => {
  const { state, errorCode } = item;

  switch (state) {
    case 'processing':
      await wait();
      break;
    case 'error':
      return handleMessage('Error page', errorCode);
    case 'success':
      return handleMessage('Order complete');
    default:
      throw new Error('Something has gone terribly wrong!');
  }
};

const getProcessingPage = async data => {
  for (let i = 0; i < data.length; i++) {
    try {
      const result = await handleState(data[i]);

      if (result) {
        console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
};

getProcessingPage([{ state: 'processing' }, { state: 'error' }]);
getProcessingPage([
  { state: 'processing' },
  { state: 'error', errorCode: 'NO_STOCK' },
]);
getProcessingPage([
  { state: 'processing' },
  { state: 'error', errorCode: 'INCORRECT_DETAILS' },
]);
getProcessingPage([{ state: 'processing' }, { state: 'success' }]);
