const getToken = async (identity: string) => {
  const response = await fetch(
    `http://localhost:3000/token?identity=${identity}`
  );
  const data = await response.json();
  return data.token;
};

export { getToken };
