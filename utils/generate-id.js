module.exports = (prefix = 'USR') => {
    const uniqueId = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${uniqueId}${randomPart}`;
  };