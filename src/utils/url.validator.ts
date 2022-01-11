const ValidateUrl = (message: string): Boolean => {
  const regex = new RegExp(
    "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
  );
  return regex.test(message);
};

export default ValidateUrl;
